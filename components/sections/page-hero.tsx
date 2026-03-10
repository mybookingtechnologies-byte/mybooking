import type { ReactNode } from "react";

export function PageHero({ title, subtitle, actions }: { title: string; subtitle: string; actions?: ReactNode }) {
  return (
    <section className="bg-hero-radial">
      <div className="mx-auto max-w-7xl px-6 py-20">
        <h1 className="font-display text-4xl font-bold md:text-5xl">{title}</h1>
        <p className="mt-4 max-w-2xl text-slate-600">{subtitle}</p>
        {actions ? <div className="mt-6 flex gap-3">{actions}</div> : null}
      </div>
    </section>
  );
}