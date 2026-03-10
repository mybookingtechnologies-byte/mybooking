import Link from "next/link";
import { Card } from "@/components/ui/card";
import { PageHero } from "@/components/sections/page-hero";

export function IndustryTemplate({
  title,
  description,
  capabilities,
}: {
  title: string;
  description: string;
  capabilities: string[];
}) {
  return (
    <div>
      <PageHero title={title} subtitle={description} actions={<Link className="rounded-xl bg-brand-gradient px-5 py-3 text-sm font-semibold text-white" href="/contact">Get Consultation</Link>} />
      <section className="mx-auto max-w-7xl px-6 py-14">
        <h2 className="font-display text-3xl font-bold">Core Capabilities</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {capabilities.map((item) => (
            <Card key={item}>
              <p className="font-medium">{item}</p>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}