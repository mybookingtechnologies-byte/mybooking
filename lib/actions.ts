"use server";

import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { createSession, clearSession, getSession, getActiveOrganizationId, switchOrganization as switchOrgAction } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { isRateLimited } from "@/lib/rate-limit";
import { loginSchema, signupSchema, createOrgSchema, leadSchema } from "@/lib/validations";
import bcrypt from "bcryptjs";

export type ActionResult = {
  success: boolean;
  message: string;
};

function assertOrigin() {
  const incomingHeaders = headers();
  const origin = incomingHeaders.get("origin");
  const host = incomingHeaders.get("x-forwarded-host") ?? incomingHeaders.get("host");

  if (origin && host && !origin.includes(host)) {
    throw new Error("Invalid request origin");
  }
}

export async function submitLeadAction(_prevState: ActionResult, formData: FormData): Promise<ActionResult> {
  try {
    assertOrigin();

    const headerStore = headers();
    const ip =
      headerStore.get("x-forwarded-for")?.split(",")[0]?.trim() ??
      headerStore.get("x-real-ip") ??
      "unknown";

    if (isRateLimited(`lead:${ip}`)) {
      return { success: false, message: "Too many requests. Please try again shortly." };
    }

    const leadSource = String(formData.get("leadSource") ?? "website").slice(0, 80);
    const leadInterest = String(formData.get("leadInterest") ?? "").slice(0, 120);
    const userMessage = String(formData.get("message") ?? "").trim();
    const contextualMessage = [
      `Source: ${leadSource}`,
      leadInterest ? `Interest: ${leadInterest}` : null,
      userMessage,
    ]
      .filter(Boolean)
      .join(" | ");

    const parsed = leadSchema.safeParse({
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      businessType: formData.get("businessType"),
      message: contextualMessage,
    });

    if (!parsed.success) {
      return { success: false, message: "Please check all form fields and try again." };
    }

    // Note: Public leads are default-assigned to a system org or need manual handling in multi-tenant
    // For this audit, we will assume a "Default" org or handle it via a required orgId if specified
    // Finding first org as fallback for public leads in this demo context
    const defaultOrg = await prisma.organization.findFirst();
    if (!defaultOrg) {
        return { success: false, message: "System error: No organization found." };
    }

    await prisma.lead.create({ 
        data: {
            ...parsed.data,
            organizationId: defaultOrg.id
        } 
    });
    
    revalidatePath("/dashboard/leads");

    return { success: true, message: "Thank you. Our team will contact you soon." };
  } catch (err) {
    console.error(err);
    return { success: false, message: "Unable to submit right now. Please try again later." };
  }
}

export async function loginAction(_prevState: ActionResult, formData: FormData): Promise<ActionResult> {
  try {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const user = await prisma.user.findUnique({
      where: { email },
      include: { memberships: true }
    });

    if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
      return { success: false, message: "Invalid email or password." };
    }

    const defaultOrgId = user.memberships[0]?.organizationId;
    await createSession(user.id, defaultOrgId);
    
    redirect("/dashboard/overview");
  } catch (err: any) {
    if (err.message === "NEXT_REDIRECT") throw err;
    return { success: false, message: "Login failed." };
  }
}

export async function signupAction(_prevState: ActionResult, formData: FormData): Promise<ActionResult> {
  try {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const name = formData.get("name") as string;
    const orgName = formData.get("orgName") as string;

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) return { success: false, message: "User already exists." };

    const passwordHash = await bcrypt.hash(password, 10);
    const slug = orgName.toLowerCase().replace(/ /g, "-").replace(/[^\w-]/g, "");

    const user = await prisma.user.create({
      data: {
        email,
        passwordHash,
        name,
        memberships: {
          create: {
            role: "OWNER",
            organization: {
              create: {
                name: orgName,
                slug,
              }
            }
          }
        }
      },
      include: { memberships: true }
    });

    await createSession(user.id, user.memberships[0].organizationId);
    redirect("/dashboard/overview");
  } catch (err: any) {
    if (err.message === "NEXT_REDIRECT") throw err;
    return { success: false, message: "Signup failed." };
  }
}

export async function logoutAction() {
  clearSession();
  redirect("/login");
}

export async function createOrganizationAction(_prevState: ActionResult, formData: FormData): Promise<ActionResult> {
  const session = await getSession();
  if (!session?.userId) throw new Error("Unauthorized");

  const name = formData.get("name") as string;
  const slug = name.toLowerCase().replace(/ /g, "-").replace(/[^\w-]/g, "");

  const org = await prisma.organization.create({
    data: {
      name,
      slug,
      memberships: {
        create: {
          userId: session.userId,
          role: "OWNER",
        }
      }
    }
  });

  await createSession(session.userId, org.id);
  revalidatePath("/dashboard/organizations");
  return { success: true, message: "Organization created." };
}

export async function switchOrgActionClient(orgId: string) {
  await switchOrgAction(orgId);
  revalidatePath("/dashboard");
  redirect("/dashboard/overview");
}
