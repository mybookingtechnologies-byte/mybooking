"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { TrackedLink } from "@/components/analytics/tracked-link";
import { navItems } from "@/lib/content";
import { cn } from "@/lib/utils";

export function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-white/40 bg-white/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-3 font-display text-xl font-bold text-slate-900">
          <Image
            src="/logo.png"
            alt="MyBooking Technologies"
            width={40}
            height={40}
            className="rounded-lg"
            priority
          />
          <span>MyBooking Technologies</span>
        </Link>
        <nav className="hidden items-center gap-5 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "text-sm font-medium text-slate-600 transition hover:text-slate-900",
                pathname === item.href && "text-primary-600",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <TrackedLink
          href="/contact?source=header-cta&interest=Consultation&type=General"
          eventName="consultation_click"
          eventParams={{ source: "header" }}
          className="rounded-xl bg-brand-gradient px-4 py-2 text-sm font-semibold text-white shadow-soft"
        >
          Get Consultation
        </TrackedLink>
      </div>
    </header>
  );
}