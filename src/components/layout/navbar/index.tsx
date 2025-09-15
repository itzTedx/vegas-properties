import Link from "next/link";

import { Button } from "@/components/ui/button";

import { IconBrandWhatsapp } from "@/assets/icons";
import { Logo } from "@/assets/logo";

import { DesktopNavbar } from "./desktop";
import { MobileNavbar } from "./mobile";
import { MobileSearch } from "./mobile-search";

export function Navbar() {
  return (
    <header className="z-999 border-b bg-card py-2.5 max-md:sticky max-md:top-0">
      <nav className="container flex items-center justify-between gap-8">
        <div className="flex items-center gap-8">
          <Link href="/">
            <Logo className="h-7 w-auto sm:h-8" />
          </Link>

          <DesktopNavbar />
        </div>

        <ul className="flex items-center gap-2 md:gap-4">
          <li className="hidden md:block">
            <Button asChild variant="ghost">
              <Link href="/">
                <IconBrandWhatsapp />
                Whatsapp
              </Link>
            </Button>
          </li>

          <li>
            <Button asChild variant="secondary">
              <Link href="/contact">Get in touch</Link>
            </Button>
          </li>
          <li className="md:hidden">
            <MobileSearch />
          </li>
          <li>
            <MobileNavbar />
          </li>
        </ul>
      </nav>
    </header>
  );
}
