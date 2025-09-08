import Link from "next/link";

import { Button } from "@/components/ui/button";

import { IconBookmark, IconBrandWhatsapp } from "@/assets/icons";
import { Logo } from "@/assets/logo";

import { DesktopNavbar } from "./desktop";
import { MobileNavbar } from "./mobile";

export function Navbar() {
  return (
    <header className="sticky top-0 z-999 bg-background/80 py-2.5 backdrop-blur-2xl">
      <nav className="container flex items-center justify-between gap-8">
        <div className="flex items-center gap-8">
          <Link href="/">
            <Logo className="h-7 w-auto sm:h-8" />
          </Link>

          <DesktopNavbar />
        </div>

        <ul className="flex items-center gap-4">
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
          <li>
            <Button
              asChild
              className="bg-brand-500/10 text-brand-600 hover:text-brand-500"
              size="icon"
              variant="outline"
            >
              <Link href="/contact">
                <IconBookmark />
              </Link>
            </Button>
          </li>
          <li>
            <MobileNavbar />
          </li>
        </ul>
      </nav>
    </header>
  );
}
