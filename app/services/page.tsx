import Link from "next/link";
import { Card } from "@/components/ui/card";
import { LeadCaptureStrip } from "@/components/sections/lead-capture-strip";
import { PageHero } from "@/components/sections/page-hero";
import { services } from "@/lib/content";

export default function ServicesPage() {
  const deliveryModel = [
    "Business discovery and scope freeze",
    "UX and architecture blueprint",
    "Sprint-based implementation",
    "Quality assurance and performance testing",
    "Launch, training, and optimization support",
  ];

  const industries = ["Restaurants", "Hotels", "Gyms", "Clinics", "Schools"];
  const caseStudies = [
    {
      title: "Restaurant Ordering Platform",
      result: "Reduced order processing time by 32% for a multi-branch food brand.",
    },
    {
      title: "Clinic Appointment Automation",
      result: "Improved appointment completion rate with reminder workflows.",
    },
    {
      title: "Hotel Ops Dashboard",
      result: "Consolidated occupancy, billing, and housekeeping operations in one panel.",
    },
  ];

  const pricing = [
    "Website Development: INR 15k+",
    "Mobile App Development: INR 60k+",
    "Custom Software: INR 80k+",
  ];

  return (
    <div>
      <PageHero
        title="Technology Services Built for Scale"
        subtitle="From websites to enterprise SaaS products, we deliver measurable outcomes with secure and maintainable code."
      />
      <section className="mx-auto max-w-7xl px-6 py-14">
        <div className="mb-10 grid gap-5 md:grid-cols-5">
          {deliveryModel.map((item, index) => (
            <Card key={item} className="bg-primary-50/60">
              <p className="text-xs font-semibold uppercase tracking-widest text-primary-700">Step {index + 1}</p>
              <p className="mt-2 text-sm font-medium text-slate-800">{item}</p>
            </Card>
          ))}
        </div>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <Card key={service.title} className="flex h-full flex-col">
              <service.icon className="h-8 w-8 text-primary-600" />
              <h2 className="mt-4 text-xl font-semibold">{service.title}</h2>
              <p className="mt-2 text-sm text-slate-600">{service.description}</p>
              <Link href={service.href} className="mt-5 text-sm font-semibold text-primary-700">
                See related offerings
              </Link>
            </Card>
          ))}
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          <Card>
            <h3 className="text-lg font-semibold text-slate-900">Industries We Serve</h3>
            <div className="mt-4 grid grid-cols-2 gap-2 text-sm text-slate-700">
              {industries.map((item) => (
                <p key={item} className="rounded-lg bg-slate-100 px-3 py-2">
                  {item}
                </p>
              ))}
            </div>
          </Card>
          <Card>
            <h3 className="text-lg font-semibold text-slate-900">Pricing Range</h3>
            <div className="mt-4 space-y-2 text-sm text-slate-700">
              {pricing.map((item) => (
                <p key={item} className="rounded-lg bg-slate-100 px-3 py-2">
                  {item}
                </p>
              ))}
            </div>
          </Card>
        </div>

        <div className="mt-10">
          <h3 className="text-2xl font-bold text-slate-900">Case Studies</h3>
          <div className="mt-5 grid gap-5 md:grid-cols-3">
            {caseStudies.map((item) => (
              <Card key={item.title} className="bg-white">
                <div className="mb-3 h-28 rounded-lg bg-gradient-to-br from-primary-100 to-secondary-100" />
                <h4 className="text-lg font-semibold text-slate-900">{item.title}</h4>
                <p className="mt-2 text-sm text-slate-600">{item.result}</p>
              </Card>
            ))}
          </div>
        </div>

        <Card className="mt-10 bg-brand-gradient text-white">
          <h3 className="text-2xl font-bold">Ready to launch your next digital product?</h3>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link href="/contact?source=services-cta&interest=Consultation&type=Technology%20Services" className="rounded-xl bg-white px-5 py-3 text-sm font-semibold text-slate-900">
              Book Consultation
            </Link>
            <Link href="/contact?source=services-cta&interest=Demo%20Request&type=Technology%20Services" className="rounded-xl bg-slate-900/30 px-5 py-3 text-sm font-semibold text-white ring-1 ring-white/50">
              Request Demo
            </Link>
          </div>
        </Card>
      </section>

      <LeadCaptureStrip
        title="Need a Custom Service Plan?"
        subtitle="Share your business goals and get a proposed scope with delivery timeline, stack recommendation, and budget guidance."
        leadSource="services-strip"
        defaultBusinessType="Technology Services"
        defaultMessage="We need a custom development service package for our business."
      />
    </div>
  );
}