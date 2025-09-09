import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

import { getBookmarkByPropertyId } from "@/actions/bookmarks";

import { PropertyNavType } from "../types";
import { BackButton } from "./ui/back-button";
import { BookmarkButton } from "./ui/bookmark-button";
import { ShareButton } from "./ui/share-button";

interface Props {
  id: number;
  data: PropertyNavType;
}

export const PropertyNavbar = async ({ id, data }: Props) => {
  const isBookmarked = await getBookmarkByPropertyId(id);
  return (
    <nav className="sticky top-0 z-999 mb-6 border-b bg-card py-2">
      <div className="container grid grid-cols-4 items-center gap-2 md:flex md:justify-between">
        <div className="col-span-3">
          <ScrollArea>
            <ul className="flex items-center gap-2 whitespace-nowrap">
              <li>
                <BackButton />
              </li>
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
            <ScrollBar />
          </ScrollArea>
        </div>
        <ul className="flex shrink-0 items-center gap-2">
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
