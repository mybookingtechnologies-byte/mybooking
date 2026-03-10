import { PageHero } from "@/components/sections/page-hero";
import { Card } from "@/components/ui/card";

const projects = [
  "Restaurant POS + Ordering App",
  "Hotel Multi-Property PMS",
  "Gym Subscription and Access Control",
  "Clinic Appointment and EHR Portal",
  "Cinema Ticketing + Seat Engine",
  "School ERP and Parent App",
];

export default function PortfolioPage() {
  return (
    <div>
      <PageHero title="Portfolio" subtitle="Selected web, mobile and SaaS projects delivered for high-growth businesses." />
      <section className="mx-auto max-w-7xl px-6 py-14">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <Card key={project} className="bg-gradient-to-br from-white to-secondary-50">
              <h2 className="text-lg font-semibold">{project}</h2>
              <p className="mt-2 text-sm text-slate-600">Architecture, UX, and deployment optimized for speed and reliability.</p>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}