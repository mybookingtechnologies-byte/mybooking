import { prisma } from "@/lib/prisma";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getActiveOrganizationId } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function LeadsPage({
  searchParams,
}: {
  searchParams: { q?: string; status?: string };
}) {
  const activeOrgId = await getActiveOrganizationId();
  if (!activeOrgId) redirect("/dashboard/organizations");

  const query = searchParams.q || "";

  let leads: any[] = [];
  try {
    leads = await prisma.lead.findMany({
      where: {
        organizationId: activeOrgId,
        OR: [
          { name: { contains: query, mode: "insensitive" } },
          { email: { contains: query, mode: "insensitive" } },
          { businessType: { contains: query, mode: "insensitive" } },
        ],
      },
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    console.warn("Database connection issue when fetching leads:", error);
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-display font-bold text-slate-900">Leads Management</h1>
          <p className="text-slate-500 text-sm">Manage and track your business inquiries.</p>
        </div>
        <div className="flex items-center gap-2">
           <form className="flex gap-2">
              <input 
                name="q"
                defaultValue={query}
                placeholder="Search leads..." 
                className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20"
              />
              <Button type="submit" variant="secondary" className="py-2 px-4">Search</Button>
           </form>
        </div>
      </div>

      <Card className="overflow-hidden p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50 border-b border-slate-100 text-slate-900 font-semibold uppercase text-[11px] tracking-wider">
              <tr>
                <th className="px-6 py-4">Lead Info</th>
                <th className="px-6 py-4">Business</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {leads.length > 0 ? (
                leads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-semibold text-slate-900">{lead.name}</div>
                      <div className="text-xs text-slate-500">{lead.email}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center rounded-lg bg-slate-100 px-2 py-1 text-[11px] font-medium text-slate-600 uppercase">
                        {lead.businessType}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center rounded-lg bg-secondary-50 px-2 py-1 text-[11px] font-medium text-secondary-700">
                        {lead.status.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-500">
                      {new Date(lead.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Button variant="ghost" className="h-8 w-8 p-0">?</Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-slate-500">
                    No leads matching your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
