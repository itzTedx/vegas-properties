import type { Route } from "next";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContainer,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { IconMenu } from "@/assets/icons";
import { Logo } from "@/assets/logo";

import { NAV_LINKS } from "@/data/constants";

export function MobileNavbar() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="md:hidden" size="icon" variant="outline">
          <IconMenu />
          <span className="sr-only">Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>
            <Logo />
          </SheetTitle>
          <SheetDescription className="sr-only">
            Professional Property Management for your dubai investment
          </SheetDescription>
        </SheetHeader>
        <SheetContainer>
          <ul className="flex flex-col gap-2">
            {NAV_LINKS.map(({ href, label }) => (
              <li key={href}>
                <Link className="font-medium text-lg" href={href as Route}>
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </SheetContainer>
      </SheetContent>
    </Sheet>
  );
}
