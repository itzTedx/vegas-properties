import Link from "next/link";

import { Button, buttonVariants } from "@/components/ui/button";

import { IconBookmark, IconShare } from "@/assets/icons";

import { BackButton } from "./ui/back-button";

export const PropertyNavbar = () => {
  return (
    <nav className="sticky top-0 z-999 mb-6 border-b bg-card py-2">
      <div className="container flex items-center justify-between">
        <ul className="flex items-center gap-2">
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
        <ul className="flex items-center gap-2">
          <li>
            <Button variant="ghost">
              <IconBookmark />
              Bookmark
            </Button>
          </li>
          <li>
            <Button variant="ghost">
              <IconShare />
              Share
            </Button>
          </li>
        </ul>
      </div>
    </nav>
  );
};
