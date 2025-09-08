import Link from "next/link";

import { Button, buttonVariants } from "@/components/ui/button";

import { IconBookmark, IconShare } from "@/assets/icons";

import { BackButton } from "./ui/back-button";
import { ScrollArea } from "@/components/ui/scroll-area";

export const PropertyNavbar = () => {
  return (
    <nav className="sticky top-0 z-999 mb-6 border-b bg-card py-2">
      <div className="container flex items-center justify-between gap-2">
        <ScrollArea className="flex-1">
          <ul className="flex items-center gap-2 whitespace-nowrap">
            <li>
              <BackButton />
            </li>
            <li>
              <Link className={buttonVariants({ variant: "ghost" })} href="#overview">
                Overview
              </Link>
            </li>
            <li>
              <Link className={buttonVariants({ variant: "ghost" })} href="#about">
                Property Details
              </Link>
            </li>
            <li>
              <Link className={buttonVariants({ variant: "ghost" })} href="#gallery">
                Gallery
              </Link>
            </li>
            <li>
              <Link className={buttonVariants({ variant: "ghost" })} href="#features">
                Features
              </Link>
            </li>
            <li>
              <Link className={buttonVariants({ variant: "ghost" })} href="#amenities">
                Amenities
              </Link>
            </li>
          </ul>
        </ScrollArea>
        <ul className="flex items-center gap-2 shrink-0">
          <li>
            <Button variant="ghost">
              <IconBookmark />
              <span className="hidden md:block">

              Bookmark
              </span>
            </Button>
          </li>
          <li>
            <Button variant="ghost">
              <IconShare />
              <span className="hidden md:block">Share</span>
            </Button>
          </li>
        </ul>
      </div>
    </nav>
  );
};
