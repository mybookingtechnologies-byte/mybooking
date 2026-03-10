import { Star } from "lucide-react";
import { Card } from "@/components/ui/card";
import { SectionShell } from "@/components/sections/section-shell";
import { testimonials } from "@/lib/content";

export default function TestimonialsSection() {
  return (
    <SectionShell>
      <div className="text-center mb-16">
        <p className="text-sm font-bold uppercase tracking-widest text-primary-600 mb-3">Testimonials</p>
        <h2 className="font-display text-3xl font-bold text-slate-900 sm:text-5xl">What Our Partners Say</h2>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
          {testimonials.map((item) => (
            <Card key={item.name}>
              <div className="mb-3 flex gap-1">
                {Array.from({ length: item.rating }).map((_, idx) => (
                  <Star key={`${item.name}-${idx}`} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-sm text-slate-700">{item.message}</p>
              <p className="mt-4 text-sm font-semibold">{item.name}</p>
              <p className="text-xs text-slate-500">{item.company}</p>
            </Card>
          ))}
      </div>
    </SectionShell>
  );
}
