import Link from "next/link";
import { Card } from "@/components/ui/card";
import { PageHero } from "@/components/sections/page-hero";
import { industries } from "@/lib/content";

const requiredIndustrySlugs = new Set(["restaurant", "hotel", "gym", "clinic", "cinema", "school"]);

export default function IndustriesPage() {
  return (
    <div>
      <PageHero
        title="Solutions Across Every Industry"
        subtitle="Purpose-built software for restaurants, hotels, gyms, clinics, cinemas, schools, salons and real estate teams."
      />
      <section className="mx-auto max-w-7xl px-6 py-14">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {industries.map((industry) => (
            <Link
              key={industry.slug}
              href={requiredIndustrySlugs.has(industry.slug) ? `/industries/${industry.slug}` : "/contact"}
            >
              <Card className="h-full">
                <industry.icon className="h-8 w-8 text-secondary-600" />
                <h2 className="mt-3 font-semibold">{industry.title}</h2>
                <p className="mt-2 text-sm text-slate-600">{industry.summary}</p>
              </Card>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}