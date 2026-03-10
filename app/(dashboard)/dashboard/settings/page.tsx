import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import TeamManagement from "./team-page-client";

export default function SettingsPage() {
  return (
    <div className="space-y-12 max-w-5xl">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-display font-bold text-slate-900 tracking-tight">Platform Settings</h1>
        <p className="text-slate-500 text-sm">Manage your platform identity, team, and company preferences.</p>
      </div>

      <div className="grid gap-12">
        {/* TEAM MANAGEMENT SECTION */}
        <section id="team">
          <TeamManagement />
        </section>

        <hr className="border-slate-100" />

        {/* COMPANY INFORMATION SECTION */}
        <section id="company" className="grid gap-8">
          <div>
            <h2 className="text-xl font-bold text-slate-900 mb-1">Company Information</h2>
            <p className="text-sm text-slate-500">Update your public business profile.</p>
          </div>
          <Card>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Company Name</label>
                <input 
                  defaultValue="MyBooking SaaS" 
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Support Email</label>
                <input 
                  defaultValue="support@mybooking.io" 
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Business Address</label>
                <textarea 
                  rows={3}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                  defaultValue={"123 Tech Avenue, Suite 400\nBangalore, KA 560001"}
                />
              </div>
            </div>
            <div className="mt-8 flex justify-end">
              <Button>Save Changes</Button>
            </div>
          </Card>
        </section>

        <hr className="border-slate-100" />

        {/* SOCIAL LINKS SECTION */}
        <section id="social" className="grid gap-8">
          <div>
            <h2 className="text-xl font-bold text-slate-900 mb-1">Social Links</h2>
            <p className="text-sm text-slate-500">Connect your brand's social presence.</p>
          </div>
          <Card>
            <div className="space-y-4">
              {["LinkedIn", "Twitter", "Instagram", "GitHub"].map((platform) => (
                <div key={platform} className="flex items-center gap-4">
                  <span className="w-24 text-sm font-medium text-slate-600">{platform}</span>
                  <input 
                    placeholder={`https://${platform.toLowerCase()}.com/username`}
                    className="flex-1 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                  />
                </div>
              ))}
            </div>
            <div className="mt-8 flex justify-end">
              <Button>Save Links</Button>
            </div>
          </Card>
        </section>

        <section id="danger" className="grid gap-8">
          <Card className="border-red-100 bg-red-50/10">
            <h3 className="text-lg font-bold text-red-900 mb-2">Danger Zone</h3>
            <p className="text-sm text-red-600 mb-6">Actions here are permanent and cannot be undone.</p>
            <Button variant="ghost" className="text-red-600 border border-red-200 hover:bg-red-50">Reset Analytics Data</Button>
          </Card>
        </section>
      </div>
    </div>
  );
}
