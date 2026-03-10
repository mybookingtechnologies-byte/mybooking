import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function DashboardOverview() {
  let totalLeads = 0;
  let recentLeads: any[] = [];

  try {
    const results = await Promise.all([
      prisma.lead.count(),
      prisma.lead.findMany({
        take: 5,
        orderBy: { createdAt: "desc" },
      }),
    ]);
    totalLeads = results[0];
    recentLeads = results[1];
  } catch (error) {
    console.warn("Prisma failed to fetch overview stats at build time, using defaults.", error);
  }

  const stats = [
    { label: "Total Leads", value: totalLeads, icon: "🤝", change: "+12%" },
    { label: "Product Views", value: "1,284", icon: "👁️", change: "+5.4%" },
    { label: "Active Users", value: "42", icon: "👥", change: "+2%" },
    { label: "Conv. Rate", value: "3.2%", icon: "⚡", change: "+0.8%" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-display font-bold text-slate-900">Dashboard Overview</h1>
        <p className="text-slate-500 text-sm">Welcome back, here is what's happening today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label} className="p-5 flex items-center gap-4">
            <div className="h-12 w-12 rounded-xl bg-primary-50 flex items-center justify-center text-2xl">
              {stat.icon}
            </div>
            <div>
              <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">{stat.label}</p>
              <div className="flex items-baseline gap-2">
                <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
                <span className="text-xs font-medium text-secondary-600">{stat.change}</span>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Recent Leads */}
        <Card className="lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900">Recent Leads</h2>
            <Link href="/dashboard/leads">
              <Button variant="ghost" className="text-xs">View all</Button>
            </Link>
          </div>
          <div className="space-y-4">
            {recentLeads.length > 0 ? (
              recentLeads.map((lead) => (
                <div key={lead.id} className="flex items-center justify-between border-b border-slate-50 pb-4 last:border-0 last:pb-0">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-500">
                      {lead.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-900">{lead.name}</p>
                      <p className="text-xs text-slate-500">{lead.email}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-medium text-slate-900">{lead.businessType}</p>
                    <p className="text-[10px] text-slate-400">{new Date(lead.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-slate-500 py-8 text-center">No leads found.</p>
            )}
          </div>
        </Card>

        {/* Quick Actions */}
        <Card>
          <h2 className="text-lg font-bold text-slate-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 gap-3">
            <Link href="/dashboard/products">
              <Button variant="secondary" className="w-full justify-start text-xs font-medium">📦 Manage Products</Button>
            </Link>
            <Link href="/dashboard/leads">
              <Button variant="secondary" className="w-full justify-start text-xs font-medium">🤝 Review Inquiries</Button>
            </Link>
            <Link href="/dashboard/settings">
              <Button variant="secondary" className="w-full justify-start text-xs font-medium">⚙️ System Settings</Button>
            </Link>
            <Link href="/blog" target="_blank">
               <Button variant="ghost" className="w-full justify-start text-xs font-medium text-slate-500 italic">🌐 View Public Site</Button>
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
}
