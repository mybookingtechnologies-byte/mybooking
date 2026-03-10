import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { TrackedLink } from "@/components/analytics/tracked-link";
import { Card } from "@/components/ui/card";
import { getProductBySlug, productCatalog } from "@/lib/content";

type Props = {
  params: { slug: string };
};

export function generateStaticParams() {
  return productCatalog.map((item) => ({ slug: item.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const product = getProductBySlug(params.slug);

  if (!product) {
    return {
      title: "Product Not Found",
    };
  }

  return {
    title: `${product.title} | MyBooking Technologies`,
    description: product.summary,
    openGraph: {
      title: product.title,
      description: product.summary,
      images: ["/logo.png"],
    },
    twitter: {
      card: "summary_large_image",
      title: product.title,
      description: product.summary,
      images: ["/logo.png"],
    },
  };
}

export default function ProductDetailPage({ params }: Props) {
  const product = getProductBySlug(params.slug);

  if (!product) {
    notFound();
  }

  return (
    <div className="bg-hero-radial">
      <section className="mx-auto max-w-7xl px-6 py-16">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary-700">SaaS Product</p>
        <h1 className="mt-3 max-w-3xl font-display text-4xl font-bold md:text-5xl">{product.title}</h1>
        <p className="mt-4 max-w-2xl text-lg text-slate-600">{product.tagline}</p>
        <p className="mt-3 max-w-2xl text-sm text-slate-500">Best fit: {product.audience}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <TrackedLink
            href={`/contact?source=product-detail&interest=${encodeURIComponent(product.title)}&type=${encodeURIComponent(product.audience)}`}
            eventName="demo_request_click"
            eventParams={{ source: "product-detail", product: product.title }}
            className="rounded-xl bg-brand-gradient px-6 py-3 text-sm font-semibold text-white shadow-soft"
          >
            Book Product Demo
          </TrackedLink>
          <Link href="/products" className="rounded-xl bg-white px-6 py-3 text-sm font-semibold text-slate-700 ring-1 ring-slate-200">
            Back to Products
          </Link>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-6 pb-16 md:grid-cols-2">
        <Card>
          <h2 className="text-xl font-semibold text-slate-900">Key Modules</h2>
          <ul className="mt-4 space-y-3 text-sm text-slate-700">
            {product.keyModules.map((module) => (
              <li key={module}>- {module}</li>
            ))}
          </ul>
        </Card>
        <Card>
          <h2 className="text-xl font-semibold text-slate-900">Business Outcomes</h2>
          <ul className="mt-4 space-y-3 text-sm text-slate-700">
            {product.outcomes.map((outcome) => (
              <li key={outcome}>- {outcome}</li>
            ))}
          </ul>
        </Card>
      </section>
    </div>
  );
}
