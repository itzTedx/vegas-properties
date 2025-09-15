import Link from "next/link";

import { Button, buttonVariants } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

import { IconArrowRight } from "@/assets/icons/arrows";

import { getBookmarkByPropertyId } from "@/actions/bookmarks";

import { PropertyNavType } from "../types";
import { BookmarkButton } from "./ui/bookmark-button";
import { ShareButton } from "./ui/share-button";

interface Props {
  id: number;
  data: PropertyNavType;
}

export const PropertyNavbar = async ({ id, data }: Props) => {
  const isBookmarked = await getBookmarkByPropertyId(id);
  return (
    <nav className="sticky top-[calc(3.5rem+1px)] z-999 mb-6 border-b bg-card py-2 md:top-0">
      <div className="container grid grid-cols-6 items-center gap-2 md:flex md:justify-between">
        <div className="col-span-4 flex items-center">
          <Button asChild className="max-md:px-1" variant="ghost">
            <Link href="/properties">
              <IconArrowRight className="rotate-180" />
              <span className="hidden md:block">Properties</span>
            </Link>
          </Button>
          <ScrollArea className="w-full">
            <ul className="flex items-center gap-1 whitespace-nowrap md:gap-2">
              <li>
                <Link className={buttonVariants({ variant: "ghost", className: "max-md:px-2" })} href="#overview">
                  Overview
                </Link>
              </li>
              <li>
                <Link className={buttonVariants({ variant: "ghost", className: "max-md:px-2" })} href="#about">
                  Property Details
                </Link>
              </li>
              <li>
                <Link className={buttonVariants({ variant: "ghost", className: "max-md:px-2" })} href="#gallery">
                  Gallery
                </Link>
              </li>
              <li>
                <Link className={buttonVariants({ variant: "ghost", className: "max-md:px-2" })} href="#features">
                  Features
                </Link>
              </li>
              <li>
                <Link className={buttonVariants({ variant: "ghost", className: "max-md:px-2" })} href="#amenities">
                  Amenities
                </Link>
              </li>
            </ul>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </div>
        <ul className="col-span-2 flex items-center justify-end gap-2">
          <li>
            <BookmarkButton hideLabel={false} id={id} isBookmarked={isBookmarked} size="default" variant="ghost" />
          </li>
          <li>
            <ShareButton data={data} />
          </li>
        </ul>
      </div>
    </nav>
  );
};
