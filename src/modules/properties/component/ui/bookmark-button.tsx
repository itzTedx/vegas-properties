"use client";

import { useTransition } from "react";

import { Button } from "@/components/ui/button";

import { IconBookmark } from "@/assets/icons";

import { toggleBookmark } from "@/actions/bookmarks";

interface Props {
  id: number;
}

export const BookmarkButton = ({ id }: Props) => {
  const [isPending, startTransition] = useTransition();

  function handleBookmark() {
    startTransition(async () => {
      toggleBookmark(id);
    });
  }
  return (
    <Button className="relative z-50" disabled={isPending} onClick={handleBookmark} size="icon" variant="outline">
      <IconBookmark className="text-secondary" />
    </Button>
  );
};
