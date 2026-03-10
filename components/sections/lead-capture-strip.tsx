import { ContactForm } from "@/components/sections/contact-form";
import { Card } from "@/components/ui/card";

type LeadCaptureStripProps = {
  title: string;
  subtitle: string;
  leadSource: string;
  defaultBusinessType?: string;
  defaultMessage?: string;
};

export function LeadCaptureStrip({
  title,
  subtitle,
  leadSource,
  defaultBusinessType = "Business Website",
  defaultMessage = "We need a consultation to discuss our software requirements and timeline.",
}: LeadCaptureStripProps) {
  return (
    <section className="bg-slate-50 py-20">
      <div className="mx-auto max-w-7xl px-6">
        <Card className="grid gap-10 overflow-hidden border-none bg-brand-gradient p-8 text-white md:grid-cols-[1fr_0.8fr] md:p-12">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/80">Lead Accelerator</p>
            <h2 className="mt-4 font-display text-3xl font-bold md:text-4xl">{title}</h2>
            <p className="mt-4 max-w-xl text-lg text-white/90">{subtitle}</p>
            <div className="mt-8 space-y-4 text-white/90">
              <div className="flex items-center gap-3">
                <div className="h-1.5 w-1.5 rounded-full bg-white" />
                <p>Response from our consulting team within one business day</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-1.5 w-1.5 rounded-full bg-white" />
                <p>Product, service, and pricing recommendations tailored to your goals</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-1.5 w-1.5 rounded-full bg-white" />
                <p>No-obligation architecture and implementation roadmap</p>
              </div>
            </div>
          </div>
          <Card className="border-none bg-white p-8 text-slate-900 shadow-xl">
            <ContactForm
              formId={`lead-capture-${leadSource}`}
              leadSource={leadSource}
              defaultBusinessType={defaultBusinessType}
              defaultMessage={defaultMessage}
              submitLabel="Get Proposal"
              showMessageField={false}
              compact
            />
          </Card>
        </Card>
      </div>
    </section>
  );
}
