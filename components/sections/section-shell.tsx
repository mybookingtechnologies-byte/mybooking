import type { PropsWithChildren } from "react";

export function SectionShell({ children, className }: PropsWithChildren & { className?: string }) {
  return (
    <section className={`py-16 md:py-20 ${className || ""}`}>
      <div className="mx-auto max-w-7xl px-6">
        {children}
      </div>
    </section>
  );
}