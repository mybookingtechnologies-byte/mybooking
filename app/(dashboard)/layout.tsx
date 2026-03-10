import { redirect } from "next/navigation";
import { getCurrentUser, getActiveOrganizationId } from "@/lib/auth";
import DashboardLayout from "@/components/layout/dashboard-layout";

export default async function RootDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const activeOrgId = await getActiveOrganizationId();
  if (!activeOrgId && user.memberships.length > 0) {
    // This should ideally be handled in auth.ts but as a fallback:
    redirect("/dashboard/organizations");
  }

  return <DashboardLayout user={user} activeOrgId={activeOrgId}>{children}</DashboardLayout>;
}
