import { PageHero } from "@/components/sections/page-hero";
import { Card } from "@/components/ui/card";

export default function AboutPage() {
  return (
    <div>
      <PageHero
        title="About MyBooking Technologies"
        subtitle="We help businesses modernize operations through secure software, AI automation, and scalable SaaS platforms."
      />
      <section className="mx-auto grid max-w-7xl gap-5 px-6 py-14 md:grid-cols-3">
        <Card>
          <h2 className="text-lg font-semibold">Mission</h2>
          <p className="mt-2 text-sm text-slate-600">Build software that creates durable competitive advantages for growing businesses.</p>
        </Card>
        <Card>
          <h2 className="text-lg font-semibold">Approach</h2>
          <p className="mt-2 text-sm text-slate-600">Product-first execution, rapid iteration, and transparent engineering collaboration.</p>
        </Card>
        <Card>
          <h2 className="text-lg font-semibold">Commitment</h2>
          <p className="mt-2 text-sm text-slate-600">Enterprise security, maintainable code quality, and long-term platform scalability.</p>
        </Card>
      </section>
    </div>
  );
}