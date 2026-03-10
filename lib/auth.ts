import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { prisma } from "./prisma";

const cookieName = "session";

function getSecret() {
  const secret = process.env.JWT_SECRET || "default-secret-change-me";
  return new TextEncoder().encode(secret);
}

interface SessionPayload {
  userId: string;
  organizationId?: string;
}

export async function createSession(userId: string, organizationId?: string) {
  const token = await new SignJWT({ userId, organizationId })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(getSecret());

  cookies().set(cookieName, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
}

export function clearSession() {
  cookies().set(cookieName, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    expires: new Date(0),
  });
}

export async function getSession(): Promise<SessionPayload | null> {
  const token = cookies().get(cookieName)?.value;
  if (!token) return null;

  try {
    const { payload } = await jwtVerify(token, getSecret());
    return payload as unknown as SessionPayload;
  } catch {
    return null;
  }
}

export async function getCurrentUser() {
  const session = await getSession();
  if (!session?.userId) return null;

  return prisma.user.findUnique({
    where: { id: session.userId },
    include: {
      memberships: {
        include: {
          organization: true,
        },
      },
    },
  });
}

export async function getActiveOrganizationId() {
  const session = await getSession();
  return session?.organizationId || null;
}

export async function switchOrganization(organizationId: string) {
  const session = await getSession();
  if (!session?.userId) throw new Error("Unauthorized");

  // Verify user is member of this org
  const membership = await prisma.membership.findUnique({
    where: {
      userId_organizationId: {
        userId: session.userId,
        organizationId,
      },
    },
  });

  if (!membership) throw new Error("Not a member of this organization");

  await createSession(session.userId, organizationId);
}
