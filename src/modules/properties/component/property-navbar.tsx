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
      <div className="container grid grid-cols-[1fr_96px] items-center gap-2 md:flex md:justify-between">
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
          <ScrollBar />
        </ScrollArea>
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
