import Link from "next/link";
import { PageHero } from "@/components/sections/page-hero";
import { SectionShell } from "@/components/sections/section-shell";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { productCatalog, whyChooseUs } from "@/lib/content";
import { CheckCircle2 } from "lucide-react";

export const metadata = {
  title: "SaaS Products | MyBooking",
  description: "Industry-specific software built to scale modern businesses.",
};

export default function ProductsPage() {
  return (
    <main className="space-y-20 pb-20">
      {/* 1. Hero Section */}
      <PageHero
        title="Explore MyBooking SaaS Products"
        subtitle="Industry-specific software built to scale modern businesses."
        actions={
          <Link href="/contact">
            <Button>Request Demo</Button>
          </Link>
        }
      />

      {/* 2. Product Grid */}
      <SectionShell>
        <div className="grid gap-8 md:grid-cols-2">
          {productCatalog.map((product) => (
            <Link key={product.slug} href={`/products/${product.slug}`} className="group">
              <Card className="h-full transition-all duration-300 group-hover:-translate-y-1 group-hover:border-primary-500/30 group-hover:shadow-lg">
                <h3 className="font-display text-2xl font-bold">{product.title}</h3>
                <p className="mt-2 text-slate-600">{product.summary}</p>
                <div className="mt-6 flex items-center text-sm font-semibold text-primary-600">
                  Learn More
                  <span className="ml-1 transition-transform group-hover:translate-x-1">→</span>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </SectionShell>

      {/* 3. Product Features */}
      <SectionShell>
        <div className="rounded-3xl bg-slate-50 p-8 md:p-12">
          <div className="mb-10 text-center">
            <h2 className="font-display text-3xl font-bold">Why Choose MyBooking?</h2>
            <p className="mt-4 text-slate-600">Core benefits across all our enterprise solutions.</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {whyChooseUs.map((feature) => (
              <div key={feature.title} className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white shadow-sm">
                  <feature.icon className="h-5 w-5 text-primary-500" />
                </div>
                <span className="font-semibold text-slate-800">{feature.title}</span>
              </div>
            ))}
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white shadow-sm">
                <CheckCircle2 className="h-5 w-5 text-primary-500" />
              </div>
              <span className="font-semibold text-slate-800">24/7 Priority Support</span>
            </div>
          </div>
        </div>
      </SectionShell>

      {/* 4. CTA Section */}
      <SectionShell>
        <div className="rounded-3xl bg-brand-gradient py-16 px-8 text-center text-white">
          <h2 className="font-display text-3xl font-bold md:text-4xl">Ready to get started?</h2>
          <p className="mx-auto mt-4 max-w-xl opacity-90">
            Join hundreds of businesses that use MyBooking to automate their operations and grow faster.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link href="/contact">
              <Button variant="secondary" className="px-8">Book Free Consultation</Button>
            </Link>
            <Link href="/contact">
              <Button variant="ghost" className="bg-white/10 text-white hover:bg-white/20 ring-1 ring-white/30 px-8">
                Request Demo
              </Button>
            </Link>
          </div>
        </div>
      </SectionShell>
    </main>
  );
}