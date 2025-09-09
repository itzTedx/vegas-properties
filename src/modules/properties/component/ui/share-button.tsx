"use client";

import { useRef, useState } from "react";
import { SendIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetClose,
  SheetContainer,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { IconShare } from "@/assets/icons";
import { LogoIcon } from "@/assets/logo";

import { env } from "@/lib/env/client";

import { PropertyNavType } from "../../types";

interface Props {
  data: PropertyNavType;
}

export const ShareButton = ({ data }: Props) => {
  const [copied, setCopied] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleCopy = () => {
    if (inputRef.current) {
      navigator.clipboard.writeText(inputRef.current.value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  };
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost">
          <IconShare />
          <span className="hidden md:block">Share</span>
        </Button>
      </SheetTrigger>
      <SheetContent className="top-2 bottom-auto">
        <SheetHeader>
          <LogoIcon />
          <SheetTitle>Share {data.title}</SheetTitle>
          <SheetDescription className="sr-only">
            Professional Property Management for your dubai investment
          </SheetDescription>
        </SheetHeader>
        <SheetContainer>
          <h3>Share link</h3>
          <div className="relative">
            <Input
              ref={inputRef}
              className="pe-9"
              readOnly
              type="text"
              defaultValue={`${env.NEXT_PUBLIC_BASE_URL}/properties/hello-long-test/${data.slug}`}
            />
            <button
              aria-label="Copy Link"
              className="absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md text-muted-foreground/80 outline-none transition-[color,box-shadow] hover:text-foreground focus:z-10 focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
            >
              <SendIcon aria-hidden="true" size={16} />
            </button>
          </div>
        </SheetContainer>
        <SheetFooter>
          <SheetClose asChild>
            <Button>Done</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
