import { ContactForm } from "@/components/sections/contact-form";
import { PageHero } from "@/components/sections/page-hero";
import { Card } from "@/components/ui/card";

type ContactPageProps = {
  searchParams?: {
    source?: string;
    interest?: string;
    type?: string;
  };
};

export default function ContactPage({ searchParams }: ContactPageProps) {
  const source = searchParams?.source || "contact-page";
  const interest = searchParams?.interest || "General Consultation";
  const businessType = searchParams?.type || "Business Software";

  return (
    <div>
      <PageHero
        title="Book a Strategy Call"
        subtitle="Tell us your goals and we will send a practical roadmap with scope, timeline, and budget direction."
      />
      <section className="mx-auto grid max-w-7xl gap-6 px-6 py-14 md:grid-cols-[1.1fr_1fr]">
        <Card className="h-fit">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary-700">Why teams choose us</p>
          <h2 className="mt-3 font-display text-3xl font-bold text-slate-900">From idea to production, faster.</h2>
          <div className="mt-6 space-y-3 text-sm text-slate-700">
            <p>- Dedicated product strategist for your requirements and priorities</p>
            <p>- Architecture recommendations tailored to your business model</p>
            <p>- Clear milestone plan with delivery estimates</p>
            <p>- Support for web, mobile, automation, and industry SaaS</p>
          </div>
        </Card>
        <Card>
          <ContactForm
            formId="contact-page-form"
            leadSource={source}
            leadInterest={interest}
            defaultBusinessType={businessType}
            defaultMessage={`We are interested in ${interest}. Please share your recommendation, timeline, and pricing model.`}
            submitLabel="Request Consultation"
          />
        </Card>
      </section>
    </div>
  );
}