import {
  AppWindow,
  BookOpenText,
  Building2,
  Clapperboard,
  Dumbbell,
  GraduationCap,
  Hotel,
  LayoutDashboard,
  Salad,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Stethoscope,
  WandSparkles,
  Workflow,
} from "lucide-react";
import type { IndustryItem, NavItem, ProductItem, ServiceItem, TestimonialItem } from "@/types";

export type ProductDetail = {
  slug: string;
  title: string;
  summary: string;
  tagline: string;
  audience: string;
  keyModules: string[];
  outcomes: string[];
};

export const navItems: NavItem[] = [
  { label: "Services", href: "/services" },
  { label: "Industries", href: "/industries" },
  { label: "Products", href: "/products" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Pricing", href: "/pricing" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const services: ServiceItem[] = [
  {
    title: "Website Development",
    description: "High-performance business websites with conversion-first UX and scalable architecture.",
    href: "/services",
    icon: AppWindow,
  },
  {
    title: "Mobile App Development",
    description: "Android and iOS applications with smooth experiences and robust backend integrations.",
    href: "/services",
    icon: Smartphone,
  },
  {
    title: "Custom Business Software",
    description: "Process automation and workflow systems built for your exact operations.",
    href: "/services",
    icon: Workflow,
  },
  {
    title: "SaaS Platforms",
    description: "Multi-tenant cloud platforms designed for growth, security, and analytics.",
    href: "/products",
    icon: LayoutDashboard,
  },
  {
    title: "AI Automation Solutions",
    description: "AI-powered assistants, reporting, and intelligent automation to cut operational overhead.",
    href: "/services",
    icon: WandSparkles,
  },
];

export const industries: IndustryItem[] = [
  {
    title: "Restaurant Software",
    slug: "restaurant",
    summary: "POS, table, kitchen and delivery workflows in one system.",
    icon: Salad,
  },
  {
    title: "Hotel Management System",
    slug: "hotel",
    summary: "Reservations, housekeeping, billing and multi-property reports.",
    icon: Hotel,
  },
  {
    title: "Gym Management",
    slug: "gym",
    summary: "Membership billing, attendance, trainers and class scheduling.",
    icon: Dumbbell,
  },
  {
    title: "Clinic Software",
    slug: "clinic",
    summary: "Appointments, patient records, prescriptions and reminders.",
    icon: Stethoscope,
  },
  {
    title: "Cinema Booking",
    slug: "cinema",
    summary: "Seat maps, online tickets, counters and concession analytics.",
    icon: Clapperboard,
  },
  {
    title: "School ERP",
    slug: "school",
    summary: "Admissions, attendance, fees, communication and academic records.",
    icon: GraduationCap,
  },
  {
    title: "Salon Booking",
    slug: "salon",
    summary: "Online appointments, staff rosters, invoicing and loyalty programs.",
    icon: Sparkles,
  },
  {
    title: "Real Estate CRM",
    slug: "real-estate",
    summary: "Lead pipeline, site visits, brokerage reporting and client lifecycle tracking.",
    icon: Building2,
  },
];

export const productCatalog: ProductDetail[] = [
  {
    slug: "restaurant-pos",
    title: "Restaurant POS",
    summary: "Fast billing and inventory intelligence for restaurants and retail businesses.",
    tagline: "Built for high-volume counters, kitchens, and retail checkout speed.",
    audience: "Restaurants, cafes, cloud kitchens, and retail stores.",
    keyModules: ["Live order queue", "Multi-counter billing", "Inventory sync", "Role-based dashboards"],
    outcomes: ["Reduce billing errors", "Cut wait time", "Track fast-moving stock", "Increase repeat orders"],
  },
  {
    slug: "hotel-pms",
    title: "Hotel PMS",
    summary: "Centralized property operations with occupancy, front-office and billing automation.",
    tagline: "One dashboard for reservations, housekeeping, guest services, and finance.",
    audience: "Hotels, resorts, serviced apartments, and hostels.",
    keyModules: ["Front-desk operations", "Channel management", "Housekeeping board", "Night audit reports"],
    outcomes: ["Improve occupancy visibility", "Speed up check-in", "Reduce booking conflicts", "Automate daily audits"],
  },
  {
    slug: "gym-manager",
    title: "Gym Manager",
    summary: "Membership lifecycle, trainer tracking and recurring payment automation.",
    tagline: "Fitness operations with renewals, attendance, and trainer productivity in one flow.",
    audience: "Gyms, fitness clubs, yoga studios, and wellness centers.",
    keyModules: ["Membership plans", "Attendance tracking", "Trainer schedule", "Renewal automation"],
    outcomes: ["Reduce membership churn", "Improve trainer utilization", "Automate renewals", "Track member activity"],
  },
  {
    slug: "clinic-manager",
    title: "Clinic Manager",
    summary: "Digital patient workflows with appointments, clinical notes and follow-up reminders.",
    tagline: "Streamline patient journeys from booking to consultation and follow-up.",
    audience: "Clinics, diagnostic centers, and specialty practices.",
    keyModules: ["Appointment calendar", "Patient profile", "Consultation notes", "SMS reminders"],
    outcomes: ["Reduce no-shows", "Faster front-desk flow", "Better patient records", "Consistent follow-ups"],
  },
];

export const products: ProductItem[] = productCatalog.map((item) => ({
  title: item.title,
  summary: item.summary,
  href: `/products/${item.slug}`,
}));

export function getProductBySlug(slug: string) {
  return productCatalog.find((item) => item.slug === slug);
}

export const whyChooseUs = [
  { title: "Modern Technology", icon: Sparkles },
  { title: "AI Powered Systems", icon: WandSparkles },
  { title: "Custom Software", icon: Workflow },
  { title: "Fast Delivery", icon: BookOpenText },
  { title: "Secure Architecture", icon: ShieldCheck },
];

export const testimonials: TestimonialItem[] = [
  {
    name: "Neha Kapoor",
    company: "Urban Dine Restaurants",
    message: "MyBooking transformed our entire order and kitchen process in under six weeks.",
    rating: 5,
  },
  {
    name: "Arjun Menon",
    company: "PrimeCare Clinics",
    message: "Appointment automation and reminder workflows helped us reduce no-shows drastically.",
    rating: 5,
  },
  {
    name: "Sonal Rao",
    company: "CoreFit Gyms",
    message: "The dashboard, renewals and trainer scheduling tools are exactly what we needed.",
    rating: 5,
  },
];