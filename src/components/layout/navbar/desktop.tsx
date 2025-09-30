"use client";

import type { Route } from "next";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { NAV_LINKS } from "@/data/constants";
import { cn } from "@/lib/utils";

export function DesktopNavbar() {
  const pathname = usePathname();
  const isActive = (href: string) => pathname.endsWith(href) || (href.includes(pathname) && pathname !== "/");

  return (
    <ul className="hidden items-center gap-3 md:flex">
      {NAV_LINKS.map(({ href, label }) => (
        <li key={href}>
          <Link
            className={cn(
              "rounded-lg px-3 py-2 font-medium leading-none tracking-tight hover:bg-background/5 data-[active=true]:bg-card/80 data-[active=true]:text-brand-900 data-[active=true]:shadow-md"
            )}
            data-active={isActive(href)}
            href={href as Route}
          >
            {label}
          </Link>
        </li>
      ))}
    </ul>
  );
}
