import Link from "next/link";

import { Button } from "@/components/ui/button";

import { IconBrandWhatsapp } from "@/assets/icons";
import { Logo } from "@/assets/logo";

import { DesktopNavbar } from "./desktop";
import { MobileNavbar } from "./mobile";
import { MobileSearch } from "./mobile-search";

export function Navbar() {
  return (
    <header className="sticky top-2 z-999 mx-2 mt-2 rounded-lg bg-card py-2.5">
      <nav className="container flex items-center justify-between gap-8">
        <div className="flex items-center gap-8">
          <Link href="/">
            <Logo className="h-7 w-auto brightness-150 sm:h-12" />
          </Link>

          <DesktopNavbar />
        </div>

        <ul className="flex items-center gap-2 md:gap-4">
          <li className="hidden md:block">
            <Button asChild className="text-emerald-500 hover:bg-background/10 hover:text-emerald-400" variant="ghost">
              <Link href="https://wa.me/971505691218" rel="noopener noreferrer" target="_blank">
                <IconBrandWhatsapp />
                Whatsapp
              </Link>
            </Button>
          </li>

          <li>
            <Button asChild variant="default">
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
