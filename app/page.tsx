import dynamic from "next/dynamic";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Star, Zap, Shield, Globe, Users } from "lucide-react";
import { TrackedLink } from "@/components/analytics/tracked-link";
import { LeadCaptureStrip } from "@/components/sections/lead-capture-strip";
import { Card } from "@/components/ui/card";
import { SectionShell } from "@/components/sections/section-shell";
import { industries, products, services, whyChooseUs } from "@/lib/content";
import { Button } from "@/components/ui/button";

const TestimonialsSection = dynamic(() => import("@/components/sections/testimonials-section"), {
  loading: () => <div className="mx-auto max-w-7xl px-6 py-10 text-sm text-slate-500 text-center">Loading testimonials...</div>,
});

export default function Home() {
  const impactStats = [
    { label: "Client Results", value: "10x ROI" },
    { label: "SaaS Products", value: "5 Live" },
    { label: "Expert Engineers", value: "24/7" },
    { label: "Avg. Launch", value: "14 Days" },
  ];

  return (
    <div className="flex flex-col">
      {/* 1. HERO SECTION */}
      <section className="relative py-24 md:py-32 bg-white flex items-center">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(30,102,245,0.05),transparent_50%),radial-gradient(circle_at_80%_70%,rgba(24,185,122,0.05),transparent_50%)]" />
        <div className="mx-auto max-w-7xl px-6 relative z-10 w-full">
          <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary-100 bg-primary-50 px-4 py-1.5 text-sm font-semibold text-primary-700 mb-8">
              <Zap className="h-4 w-4 fill-primary-700" />
              <span>SaaS Development Partner for Forward-Thinking Brands</span>
            </div>
            <h1 className="font-display text-5xl font-bold tracking-tight text-slate-900 sm:text-7xl">
              Ship Software That <span className="text-transparent bg-clip-text bg-brand-gradient">Drives Growth</span>
            </h1>
            <p className="mt-8 text-xl text-slate-600 leading-relaxed">
              We engineer revenue-focused digital products. From custom SaaS platforms to enterprise-grade mobile apps, we turn complex business challenges into seamless software solutions.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center gap-4">
              <TrackedLink
                href="/contact?source=home-hero"
                eventName="demo_request_click"
                className="w-full sm:w-auto rounded-xl bg-brand-gradient px-8 py-4 text-lg font-bold text-white shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all text-center"
              >
                Work With Us
              </TrackedLink>
              <Link
                href="/products"
                className="w-full sm:w-auto rounded-xl bg-white px-8 py-4 text-lg font-bold text-slate-900 border border-slate-200 hover:bg-slate-50 transition-all text-center"
              >
                See Our Products
              </Link>
            </div>
          </div>

          <div className="mt-24 grid grid-cols-2 lg:grid-cols-4 gap-8 border-t border-slate-100 pt-16">
            {impactStats.map((stat) => (
              <div key={stat.label} className="text-center group">
                <p className="text-4xl font-bold text-slate-900 group-hover:text-primary-600 transition-colors uppercase">{stat.value}</p>
                <p className="mt-2 text-sm font-bold uppercase tracking-widest text-slate-500">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2. TRUSTED BY / SOCIAL PROOF */}
      <section className="bg-white py-12 border-y border-slate-100 italic">
        <div className="mx-auto max-w-7xl px-6">
          <p className="text-center text-xs font-bold uppercase tracking-[0.2em] text-slate-400 mb-8">
            Powers leading companies worldwide
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-8 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
             {["UrbanDine", "PrimeCare", "CoreFit", "Bluewave", "CityCinema", "NorthStar"].map(b => (
               <span key={b} className="text-xl font-display font-black tracking-tighter text-slate-900">{b}</span>
             ))}
          </div>
        </div>
      </section>

      {/* 3. SERVICES SECTION */}
      <SectionShell className="bg-slate-50/50">
        <div className="text-center mb-16">
          <p className="text-sm font-bold uppercase tracking-widest text-primary-600 mb-3">Capabilities</p>
          <h2 className="font-display text-3xl font-bold text-slate-900 sm:text-5xl">Engineering Excellence</h2>
          <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">We provide full-lifecycle software development to help you scale faster and smarter.</p>
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {services.map((item) => (
            <Card key={item.title} className="p-8 group hover:border-primary-200">
              <div className="h-12 w-12 rounded-xl bg-primary-50 flex items-center justify-center text-primary-600 mb-6 group-hover:bg-primary-600 group-hover:text-white transition-colors">
                <item.icon className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">{item.title}</h3>
              <p className="mt-3 text-slate-600 leading-relaxed text-sm lg:text-base">{item.description}</p>
              <Link href={item.href} className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-primary-600 hover:gap-3 transition-all">
                The Details <ArrowRight className="h-4 w-4" />
              </Link>
            </Card>
          ))}
        </div>
      </SectionShell>

      {/* 4. SAAS PRODUCTS */}
      <SectionShell>
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <p className="text-sm font-bold uppercase tracking-widest text-secondary-600 mb-3">Our Lab</p>
            <h2 className="font-display text-3xl font-bold text-slate-900 sm:text-5xl">Ready-to-Deploy <span className="text-primary-600">SaaS Engines</span></h2>
            <p className="mt-4 text-lg text-slate-600">Accelerate your time-to-market with our industry-specific software frameworks, fully customizable to your unique business needs.</p>
          </div>
          <Link href="/products" className="hidden lg:block">
            <Button variant="secondary" className="px-8 font-bold">View All Products</Button>
          </Link>
        </div>
        <div className="grid gap-8 md:grid-cols-2">
          {products.slice(0, 2).map((item) => (
            <Card key={item.title} className="p-0 overflow-hidden group">
              <div className="grid md:grid-cols-2 h-full">
                <div className="p-8 flex flex-col justify-center">
                   <div className="rounded-full bg-secondary-50 text-secondary-600 text-[10px] font-bold uppercase tracking-widest w-fit px-3 py-1 mb-4">Live Product</div>
                   <h3 className="text-2xl font-bold text-slate-900">{item.title}</h3>
                   <p className="mt-4 text-slate-600 text-sm leading-relaxed">{item.summary}</p>
                   <div className="mt-8 flex gap-4">
                     <Link href={item.href} className="text-sm font-bold text-slate-900 underline underline-offset-4 hover:text-primary-600 transition-colors">Learn More</Link>
                     <TrackedLink
                        href={`/contact?interest=${encodeURIComponent(item.title)}`}
                        eventName="demo_request_click"
                        className="text-sm font-bold text-primary-600"
                      >Request Demo</TrackedLink>
                   </div>
                </div>
                <div className="bg-slate-100 min-h-[240px] relative group-hover:scale-105 transition-transform duration-700 flex items-center justify-center p-8">
                   <Zap className="h-16 w-16 text-slate-300 transform -rotate-12" />
                   <div className="absolute inset-x-8 bottom-0 top-12 bg-white rounded-t-xl shadow-2xl border-x border-t border-slate-200/50 p-4 transform translate-y-4 group-hover:translate-y-0 transition-transform">
                      <div className="space-y-2">
                        <div className="h-2 w-1/2 bg-slate-100 rounded" />
                        <div className="h-2 w-full bg-slate-50 rounded" />
                        <div className="h-2 w-full bg-slate-50 rounded" />
                        <div className="grid grid-cols-2 gap-2 mt-4">
                           <div className="aspect-video bg-primary-50 rounded" />
                           <div className="aspect-video bg-secondary-50 rounded" />
                        </div>
                      </div>
                   </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </SectionShell>

      {/* 5. INDUSTRIES */}
      <SectionShell className="bg-slate-900 border-y border-slate-800">
        <div className="text-center mb-16">
          <p className="text-sm font-bold uppercase tracking-widest text-primary-400 mb-3">Sectors We Transform</p>
          <h2 className="font-display text-3xl font-bold text-white sm:text-5xl">Deep Domain Expertise</h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {industries.map((item) => (
            <Link key={item.slug} href={`/industries/${item.slug}`}>
              <Card className="h-full bg-slate-800/50 border-slate-700 hover:bg-slate-800 hover:border-primary-500 p-6 transition-all group">
                <item.icon className="h-8 w-8 text-primary-400 mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-lg font-bold text-white">{item.title}</h3>
                <p className="mt-2 text-sm text-slate-400 leading-relaxed">{item.summary}</p>
                <div className="mt-4 flex items-center gap-2 text-xs font-bold text-primary-400 opacity-0 group-hover:opacity-100 transition-opacity">
                  Explore Hub <ArrowRight className="h-3 w-3" />
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </SectionShell>

      {/* 6. WHY CHOOSE US */}
      <SectionShell>
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-sm font-bold uppercase tracking-widest text-primary-600 mb-3">Our Philosophy</p>
            <h2 className="font-display text-3xl font-bold text-slate-900 sm:text-5xl mb-8">Performance-Driven <span className="text-primary-600">Product Engineering</span></h2>
            <div className="space-y-6">
               {[
                 { title: "Agile Execution", desc: "No endless planning cycles. We ship usable increments every week.", icon: Zap },
                 { title: "Commercial Focus", desc: "We build for business outcomes, not just technical specifications.", icon: Star },
                 { title: "Scalable Architecture", desc: "Cloud-native systems designed to handle growth from day one.", icon: Globe },
               ].map((item, i) => (
                 <div key={i} className="flex gap-4 p-4 border border-transparent hover:border-slate-100 hover:bg-slate-50/50 rounded-2xl transition-all">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-white shadow-sm flex items-center justify-center text-primary-600">
                      <item.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900">{item.title}</h4>
                      <p className="text-slate-600 text-sm mt-1">{item.desc}</p>
                    </div>
                 </div>
               ))}
            </div>
          </div>
          <Card className="p-2 bg-slate-100 border-none aspect-square relative overflow-hidden group">
             <div className="absolute inset-0 bg-brand-gradient opacity-10" />
             <div className="relative z-10 h-full w-full bg-white rounded-lg shadow-2xl p-8 flex flex-col justify-between">
                <div>
                   <div className="flex gap-1 mb-4">
                     {[1,2,3,4,5].map(i => <Star key={i} className="h-4 w-4 fill-secondary-500 text-secondary-500" />)}
                   </div>
                   <p className="text-2xl font-display font-medium text-slate-800 leading-snug">
                     "The speed at which they translated our complex workflow into a high-performance dashboard was incredible. A true engineering partner."
                   </p>
                </div>
                <div className="flex items-center gap-4 border-t border-slate-100 pt-8">
                   <div className="h-12 w-12 rounded-full bg-slate-200" />
                   <div>
                     <p className="font-bold text-slate-900">David Henderson</p>
                     <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">CTO, Bluewave Hotels</p>
                   </div>
                </div>
             </div>
          </Card>
        </div>
      </SectionShell>

      {/* 7. TESTIMONIALS */}
      <TestimonialsSection />

      {/* 8. LEAD CAPTURE SECTION */}
      <LeadCaptureStrip
        title="Ready to Ship Your Product?"
        subtitle="Transform your vision into a production-ready system. Receive a comprehensive implementation roadmap and cost estimate within 24 hours."
        leadSource="home-footer-cta"
      />

      {/* 9. CONTACT / FINAL FOOTER CTA */}
      <SectionShell>
        <div className="bg-slate-900 rounded-[2rem] p-8 md:p-16 text-center text-white relative overflow-hidden group">
          <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 h-64 w-64 rounded-full bg-primary-600/20 blur-[80px]" />
          <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 h-64 w-64 rounded-full bg-secondary-600/20 blur-[80px]" />
          
          <div className="relative z-10 max-w-3xl mx-auto">
            <h2 className="font-display text-4xl font-bold mb-6">Let's Build Something <span className="text-primary-400 italic">Exceptional</span></h2>
            <p className="text-xl text-slate-400 mb-10 leading-relaxed">Whether you're starting from scratch or scaling an existing platform, our team of expert architects is ready to help.</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/contact" className="w-full sm:w-auto bg-white text-slate-900 px-8 py-4 rounded-xl font-bold hover:bg-slate-50 transition-colors">Start a Project</Link>
              <Link href="/services" className="w-full sm:w-auto bg-slate-800 border border-slate-700 text-white px-8 py-4 rounded-xl font-bold hover:bg-slate-700 transition-colors">Browse Capabilities</Link>
            </div>
          </div>
        </div>
      </SectionShell>
    </div>
  );
}
