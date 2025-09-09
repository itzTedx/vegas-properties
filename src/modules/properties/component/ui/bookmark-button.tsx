"use client";

import { useTransition } from "react";

import { VariantProps } from "class-variance-authority";

import { Button, buttonVariants } from "@/components/ui/button";
import { LoadingSwap } from "@/components/ui/loading-swap";

import { IconBookmark } from "@/assets/icons";

import { toggleBookmark } from "@/actions/bookmarks";

interface Props {
  id: number;
  isBookmarked?: boolean;
  variant?: VariantProps<typeof buttonVariants>["variant"];
  hideLabel?: boolean;
  size?: VariantProps<typeof buttonVariants>["size"];
}

export const BookmarkButton = ({
  id,
  isBookmarked = false,
  variant = "outline",
  hideLabel = true,
  size = "icon",
}: Props) => {
  const [isPending, startTransition] = useTransition();

  function handleBookmark() {
    startTransition(async () => {
      toggleBookmark(id);
    });
  }
  return (
    <Button
      className="relative z-50"
      disabled={isPending}
      onClick={handleBookmark}
      size={size}
      variant={isBookmarked ? "destructive" : variant}
    >
      <LoadingSwap className="flex items-center gap-2" isLoading={isPending}>
        <IconBookmark className={isBookmarked ? "text-secondary-50" : "text-secondary"} />
        {!hideLabel && <span className="hidden md:block">Bookmark</span>}
      </LoadingSwap>
    </Button>
  );
};
