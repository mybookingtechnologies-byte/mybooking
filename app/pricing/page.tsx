import { prisma } from "@/lib/prisma";
import { SectionShell } from "@/components/sections/section-shell";
import { PageHero } from "@/components/sections/page-hero";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Pricing Plans | SaaS",
  description: "Simple, transparent pricing for teams of all sizes.",
};

async function getPlans() {
  try {
    const plans = await prisma.plan.findMany({
      orderBy: { createdAt: "asc" },
    });
    if (plans && plans.length > 0) return plans;
  } catch (error) {
    console.warn("Prisma failed to fetch plans, using fallback pricing.", error);
  }

  return [
    {
      id: "starter",
      name: "Starter",
      description: "Perfect for small teams and startups.",
      priceId: "price_starter",
      maxLeads: 100,
      maxBlogs: 10,
    },
    {
      id: "pro",
      name: "Pro",
      description: "Advanced features for growing businesses.",
      priceId: "price_pro",
      maxLeads: 1000,
      maxBlogs: 50,
    },
    {
      id: "enterprise",
      name: "Enterprise",
      description: "Full-scale solution for large organizations.",
      priceId: "price_enterprise",
      maxLeads: 10000,
      maxBlogs: 500,
    }
  ];
}

const planFeatures = {
  starter: ["100 Leads / month", "10 Blog posts", "Email Support", "Core Analytics"],
  pro: ["1,000 Leads / month", "50 Blog posts", "Priority Support", "Advanced Analytics", "Team Members (up to 5)"],
  enterprise: ["Unlimited Leads", "Unlimited Blogs", "24/7 Dedicated Support", "Custom Integration", "Unlimited Team Members"],
};

const priceMap: Record<string, string> = {
  starter: "$29",
  pro: "$99",
  enterprise: "Custom",
};

export default async function PricingPage() {
  const plans = await getPlans();

  return (
    <div className="pb-24 text-slate-900">
      <PageHero
        title="Simple, Transparent Pricing"
        subtitle="Choose the plan that's right for your business. No hidden fees."
      />

      <SectionShell>
        <div className="grid gap-8 lg:grid-cols-3">
          {plans.map((plan: any) => {
            const planKey = (plan.name.toLowerCase() as keyof typeof planFeatures) || "starter";
            const currentFeatures = planFeatures[planKey] || planFeatures.starter;
            const displayPrice = priceMap[planKey] || "$0";

            return (
              <Card key={plan.id} className={`flex flex-col p-8 ${planKey === 'pro' ? 'border-primary-500 ring-1 ring-primary-500' : ''}`}>
                {planKey === 'pro' && (
                  <div className="mb-4 inline-block rounded-full bg-primary-100 px-3 py-1 text-xs font-bold text-primary-700 w-fit">
                    Most Popular
                  </div>
                )}
                <h3 className="text-2xl font-bold">{plan.name}</h3>
                <p className="mt-2 text-slate-500 text-sm h-10">{plan.description}</p>
                <div className="mt-6 flex items-baseline gap-1">
                  <span className="text-4xl font-bold">{displayPrice}</span>
                  {planKey !== 'enterprise' && <span className="text-slate-500 font-medium">/month</span>}
                </div>

                <div className="mt-8 space-y-4 flex-1">
                  {currentFeatures.map((feature, i) => (
                    <div key={i} className="flex items-center gap-3 text-sm text-slate-600">
                      <Check className="h-4 w-4 text-emerald-500 flex-shrink-0" />
                      {feature}
                    </div>
                  ))}
                </div>

                <div className="mt-10">
                  <Link href={planKey === 'enterprise' ? '/contact' : `/api/stripe/checkout?priceId=${plan.priceId}`}>
                    <Button className="w-full" variant={planKey === 'pro' ? 'primary' : 'secondary'}>
                      {planKey === 'enterprise' ? 'Contact Sales' : 'Get Started'}
                    </Button>
                  </Link>
                </div>
              </Card>
            );
          })}
        </div>
      </SectionShell>
    </div>
  );
}
