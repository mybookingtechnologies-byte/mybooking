import { prisma } from "@/lib/prisma";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getActiveOrganizationId } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function TeamPage() {
  const activeOrgId = await getActiveOrganizationId();
  if (!activeOrgId) redirect("/dashboard/organizations");

  let members: any[] = [];
  try {
    members = await prisma.membership.findMany({
      where: { organizationId: activeOrgId },
      include: { user: true },
    });
  } catch (error) {
    console.error("Failed to fetch team members:", error);
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display font-bold">Team Management</h1>
          <p className="text-slate-500 text-sm">Manage your organization members and roles.</p>
        </div>
        <Button>Invite Member</Button>
      </div>

      <Card className="overflow-hidden p-0">
        <table className="w-full text-left text-sm text-slate-600">
          <thead className="bg-slate-50 border-b border-slate-100 text-slate-900 font-semibold text-[11px] uppercase tracking-wider">
            <tr>
              <th className="px-6 py-4">User</th>
              <th className="px-6 py-4">Role</th>
              <th className="px-6 py-4">Joined</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {members.length > 0 ? (
              members.map((member: any) => (
                <tr key={member.id}>
                  <td className="px-6 py-4 font-medium text-slate-900">{member.user.email}</td>
                  <td className="px-6 py-4">{member.role}</td>
                  <td className="px-6 py-4 text-slate-500">{new Date(member.createdAt).toLocaleDateString()}</td>
                  <td className="px-6 py-4 text-right">
                    <Button variant="ghost">Edit</Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="px-6 py-20 text-center text-slate-500 italic">
                  No team members found or database connection error.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
