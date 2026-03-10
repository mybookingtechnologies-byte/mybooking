import type { LucideIcon } from "lucide-react";

export type NavItem = {
  label: string;
  href: string;
};

export type ServiceItem = {
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
};

export type IndustryItem = {
  title: string;
  slug: string;
  summary: string;
  icon: LucideIcon;
};

export type ProductItem = {
  title: string;
  summary: string;
  href: string;
};

export type TestimonialItem = {
  name: string;
  company: string;
  message: string;
  rating: number;
};