import { prisma } from "@/lib/prisma";
import { Card } from "@/components/ui/card";
import { Users, Building2, CreditCard, LayoutDashboard, Database, Activity } from "lucide-react";

export const metadata = {
  title: "Super Admin | Platform Metrics",
};

export default async function AdminDashboardPage() {
  let stats = {
    totalUsers: 0,
    totalOrganizations: 0,
    totalSubscriptions: 0,
    totalLeads: 0,
    totalBlogs: 0,
  };

  try {
    const [u, o, s, l, b] = await Promise.all([
      prisma.user.count(),
      prisma.organization.count(),
      prisma.subscription.count({ where: { status: "ACTIVE" } }),
      prisma.lead.count(),
      prisma.blog.count(),
    ]);
    stats = {
      totalUsers: u,
      totalOrganizations: o,
      totalSubscriptions: s,
      totalLeads: l,
      totalBlogs: b,
    };
  } catch (err) {
    console.error("Admin stats failed", err);
  }

  const metricCards = [
    { label: "Total Users", value: stats.totalUsers, icon: Users, color: "text-blue-600", bg: "bg-blue-50" },
    { label: "Total Organizations", value: stats.totalOrganizations, icon: Building2, color: "text-purple-600", bg: "bg-purple-50" },
    { label: "Active Subscriptions", value: stats.totalSubscriptions, icon: CreditCard, color: "text-emerald-600", bg: "bg-emerald-50" },
    { label: "Total Platform Leads", value: stats.totalLeads, icon: Database, color: "text-orange-600", bg: "bg-orange-50" },
    { label: "Blog Content", value: stats.totalBlogs, icon: Activity, color: "text-rose-600", bg: "bg-rose-50" },
  ];

  return (
    <div className="space-y-10 p-10 bg-slate-50 min-h-screen">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">Super Admin Hub</h1>
          <p className="text-slate-500 font-medium">Global platform overview and health metrics.</p>
        </div>
        <div className="flex items-center gap-3 rounded-2xl bg-white border border-slate-200 px-6 py-3 shadow-sm">
           <div className="h-3 w-3 rounded-full bg-emerald-500 animate-pulse" />
           <span className="text-sm font-bold text-slate-700">System Online</span>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-5">
        {metricCards.map((card, i) => (
          <Card key={i} className="p-6 border-none shadow-md hover:shadow-lg transition-all">
            <div className={`h-12 w-12 rounded-2xl ${card.bg} flex items-center justify-center ${card.color} mb-4`}>
              <card.icon className="h-6 w-6" />
            </div>
            <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">{card.label}</p>
            <p className="text-3xl font-black text-slate-900 mt-1">{card.value}</p>
          </Card>
        ))}
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <Card className="p-8">
           <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
             <LayoutDashboard className="h-5 w-5 text-primary-600" />
             Recent Organizations
           </h3>
           <div className="space-y-4">
             <p className="text-sm text-slate-400 italic">No recent organizations registered.</p>
           </div>
        </Card>

        <Card className="p-8">
           <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
             <Activity className="h-5 w-5 text-rose-600" />
             Global Activity Log
           </h3>
           <div className="space-y-4">
              <p className="text-sm text-slate-400 italic text-center py-10">Waiting for events...</p>
           </div>
        </Card>
      </div>
    </div>
  );
}
