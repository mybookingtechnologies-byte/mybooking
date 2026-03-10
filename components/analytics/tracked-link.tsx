"use client";

import Link, { type LinkProps } from "next/link";
import type { PropsWithChildren } from "react";
import { trackEvent } from "@/lib/analytics";

type TrackedLinkProps = PropsWithChildren<
  LinkProps & {
    className?: string;
    eventName: string;
    eventParams?: Record<string, unknown>;
  }
>;

export function TrackedLink({ children, eventName, eventParams, ...props }: TrackedLinkProps) {
  return (
    <Link
      {...props}
      onClick={() => {
        trackEvent(eventName, eventParams);
      }}
    >
      {children}
    </Link>
  );
}