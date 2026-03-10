import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SimpleChart } from "@/components/ui/chart-stub";

export default function AnalyticsPage() {
  const metrics = [
    { title: "Lead Volume", value: "128", trend: "+14%", data: [20, 35, 25, 45, 30, 60, 50, 80] },
    { title: "Conversations", value: "42", trend: "+5%", data: [10, 15, 12, 25, 20, 30, 25, 35], color: "stroke-secondary-500" },
    { title: "Engagement", value: "84%", trend: "+2%", data: [80, 82, 81, 85, 83, 86, 84, 88], color: "stroke-blue-500" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-display font-bold text-slate-900">Performance Analytics</h1>
        <p className="text-slate-500 text-sm">Real-time engagement and growth metrics.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {metrics.map((m) => (
          <Card key={m.title} className="p-0 overflow-hidden">
            <div className="p-6">
              <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">{m.title}</p>
              <div className="flex items-baseline gap-2">
                <p className="text-2xl font-bold text-slate-900">{m.value}</p>
                <span className="text-xs font-medium text-secondary-600">{m.trend}</span>
              </div>
            </div>
            <div className="bg-slate-50/50 p-4">
              <SimpleChart data={m.data} color={m.color} />
            </div>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <h3 className="text-lg font-bold text-slate-900 mb-6">Top Product Interest</h3>
          <div className="space-y-4">
             {[
               { name: "Restaurant POS", views: 420, pct: 85 },
               { name: "Hotel PMS", views: 310, pct: 65 },
               { name: "Gym Manager", views: 240, pct: 45 },
               { name: "Clinic Manager", views: 180, pct: 35 },
             ].map(item => (
               <div key={item.name} className="space-y-1">
                 <div className="flex justify-between text-sm">
                   <span className="font-medium text-slate-700">{item.name}</span>
                   <span className="text-slate-500">{item.views} views</span>
                 </div>
                 <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden">
                   <div 
                    className="h-full bg-primary-500 transition-all duration-1000" 
                    style={{ width: `${item.pct}%` }} 
                   />
                 </div>
               </div>
             ))}
          </div>
        </Card>

        <Card>
          <h3 className="text-lg font-bold text-slate-900 mb-6">Traffic Sources</h3>
           <div className="space-y-4">
             {[
               { name: "Organic Search", val: "54%", color: "bg-blue-500" },
               { name: "Direct Traffic", val: "22%", color: "bg-emerald-500" },
               { name: "Social Media", val: "14%", color: "bg-purple-500" },
               { name: "Referrals", val: "10%", color: "bg-amber-500" },
             ].map(item => (
               <div key={item.name} className="flex items-center gap-4">
                 <div className={`h-3 w-3 rounded-full ${item.color}`} />
                 <span className="flex-1 text-sm text-slate-600">{item.name}</span>
                 <span className="text-sm font-bold text-slate-900">{item.val}</span>
               </div>
             ))}
           </div>
           <div className="mt-8 pt-8 border-t border-slate-50 text-center">
             <Button variant="ghost" className="text-xs text-primary-600">Download Full Report (PDF)</Button>
           </div>
        </Card>
      </div>
    </div>
  );
}
