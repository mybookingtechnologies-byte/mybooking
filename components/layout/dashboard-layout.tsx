"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { logoutAction, switchOrgActionClient } from "@/lib/actions";

const NAV_ITEMS = [
  { label: "Overview", href: "/dashboard/overview", icon: "??" },
  { label: "Products", href: "/dashboard/products", icon: "??" },
  { label: "Leads", href: "/dashboard/leads", icon: "??" },
  { label: "Analytics", href: "/dashboard/analytics", icon: "??" },
  { label: "Team", href: "/dashboard/team", icon: "??" },
  { label: "Settings", href: "/dashboard/settings", icon: "??" },
];

export default function DashboardLayout({
  children,
  user,
  activeOrgId,
}: {
  children: React.ReactNode;
  user: any;
  activeOrgId: string | null;
}) {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const activeOrg = user.memberships.find((m: any) => m.organizationId === activeOrgId)?.organization;

  return (
    <div className="flex min-h-screen bg-slate-50/50">
      {/* Sidebar - Desktop */}
      <aside className="hidden w-64 flex-col border-r border-slate-200 bg-white lg:flex">
        <div className="flex h-16 items-center px-6 border-b border-slate-100">
          <Link href="/" className="flex items-center gap-2 font-display text-xl font-bold text-primary-600">
            <span className="h-8 w-8 rounded-lg bg-brand-gradient flex items-center justify-center text-white">B</span>
            <span>{activeOrg?.name || "MyBooking"}</span>
          </Link>
        </div>
        
        {/* Org Switcher placeholder */}
        <div className="p-4">
          <select 
            className="w-full text-xs border rounded-md p-1 bg-slate-50"
            value={activeOrgId || ""}
            onChange={(e) => switchOrgActionClient(e.target.value)}
          >
            {user.memberships.map((m: any) => (
              <option key={m.organizationId} value={m.organizationId}>
                {m.organization.name}
              </option>
            ))}
            <option value="new">+ Create Organization</option>
          </select>
        </div>

        <nav className="flex-1 space-y-1 p-4 pt-0">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors",
                pathname === item.href
                  ? "bg-primary-50 text-primary-600"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              )}
            >
              <span>{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-slate-100 italic text-xs text-slate-400">
          Logged in as {user.email}
        </div>
        <div className="p-4 border-t border-slate-100">
          <Button variant="ghost" className="w-full justify-start gap-3 text-slate-500" onClick={() => logoutAction()}>
            <span>??</span> Logout
          </Button>
        </div>
      </aside>

      {/* ... rest of the layout (mobile) ... */}
      <div className="flex flex-1 flex-col">
        {/* Mobile Header */}
        <header className="flex h-16 items-center justify-between border-b border-slate-100 bg-white px-4 lg:hidden">
          <Link href="/" className="font-display text-xl font-bold text-primary-600">
            {activeOrg?.name || "MyBooking"}
          </Link>
          <button onClick={() => setIsSidebarOpen(true)} className="text-slate-500 p-2">?</button>
        </header>

        <main className="flex-1 overflow-auto p-6 lg:p-10">
          {children}
        </main>
      </div>
    </div>
  );
}
