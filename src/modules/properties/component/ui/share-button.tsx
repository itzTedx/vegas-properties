"use client";

import { useRef, useState } from "react";
import { CheckIcon, } from "lucide-react";

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

import { IconBrandFacebook, IconBrandInstagram, IconBrandX, IconEmail, IconShare } from "@/assets/icons";
import { LogoIconMono } from "@/assets/logo";

import { env } from "@/lib/env/client";

import { PropertyNavType } from "../../types";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { IconCopy, } from "@/assets/icons/copy";
import {
  shareViaEmail,
  shareViaFacebook,
  shareViaInstagram,
  shareViaTwitter,
} from "../../utils";

interface Props {
  data: PropertyNavType;
}

export const ShareButton = ({ data }: Props) => {
  const [copied, setCopied] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const { title, description, slug: link } = data;

  const handleCopy = () => {
    if (inputRef.current) {
      navigator.clipboard.writeText(inputRef.current.value);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  const handleEmailShare = () => {
    shareViaEmail(title, `${description}\n\n${link}`);
  };

  const handleFacebookShare = () => {
    shareViaFacebook(link, description);
  };

  const handleTwitterShare = () => {
    shareViaTwitter(link, description);
  };

  const handleInstagramShare = () => {
    shareViaInstagram(link);
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost">
          <IconShare />
          <span className="hidden md:block">Share</span>
        </Button>
      </SheetTrigger>
      <SheetContent className="top-2 bottom-auto overflow-hidden bg-accent">
        <div className="rounded-b-xl border-b bg-card pb-6">
          <SheetHeader className="items-center">
            <div className="flex size-11 items-center justify-center rounded-lg border border-brand-400 bg-gradient-to-b from-brand-500 to-brand-600 shadow-brand-lg">
              <LogoIconMono className="size-7 text-brand-50" />
            </div>
            <SheetTitle>Share {data.title}</SheetTitle>
            <SheetDescription className="sr-only">
              Professional Property Management for your dubai investment
            </SheetDescription>
          </SheetHeader>
          <SheetContainer>
            <div>
              <h3 className="mb-1 font-medium text-muted-foreground text-sm">Share link</h3>
              <div className="relative">
                <Input
                  ref={inputRef}
                  className="pe-8"
                  readOnly
                  type="text"
                  defaultValue={`${env.NEXT_PUBLIC_BASE_URL}/properties/hello-long-test/${data.slug}`}
                />
                <TooltipProvider delayDuration={0}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button
                        onClick={handleCopy}
                        className="absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md text-muted-foreground outline-none transition-[color,box-shadow] hover:text-brand-500 focus:z-10 focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed"
                        aria-label={copied ? "Copied" : "Copy to clipboard"}
                        disabled={copied}
                      >
                        <div className={cn("transition-all", copied ? "scale-100 opacity-100" : "scale-0 opacity-0")}>
                          <CheckIcon className="stroke-emerald-600" size={16} aria-hidden="true" />
                        </div>
                        <div
                          className={cn(
                            "absolute transition-all",
                            copied ? "scale-0 opacity-0" : "scale-100 opacity-100"
                          )}
                        >
                          <IconCopy aria-hidden="true" className="size-4" />
                        </div>
                      </button>
                    </TooltipTrigger>
                    <TooltipContent className="px-2 py-1 text-xs">Copy to clipboard</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
            <div>
              <h4 className="mb-1 font-medium text-muted-foreground text-sm">Share to</h4>
              <ul className="grid grid-cols-4 gap-2" role="list">
                <li role="listitem">
                  <Button
                    aria-label="Share via email"
                    className="flex aspect-square size-full items-center justify-center rounded-lg bg-card text-gray-400 shadow-lg transition-[background-color_box-shadow_color] hover:text-gray-700 hover:shadow-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    onClick={handleEmailShare}
                    title="Share via email"
                    variant="ghost"
                  >
                    <IconEmail className="size-9" />
                  </Button>
                </li>
                <li role="listitem">
                  <Button
                    aria-label="Share on Facebook"
                    className="flex aspect-square size-full items-center justify-center rounded-lg bg-card text-gray-400 shadow-lg transition-[background-color_box-shadow_color] hover:text-gray-700 hover:shadow-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    onClick={handleFacebookShare}
                    title="Share on Facebook"
                    variant="ghost"
                  >
                    <IconBrandFacebook className="size-9" />
                  </Button>
                </li>
                <li role="listitem">
                  <Button
                    aria-label="Share on Twitter/X"
                    className="flex aspect-square size-full items-center justify-center rounded-lg bg-card text-gray-400 shadow-lg transition-[background-color_box-shadow_color] hover:text-gray-700 hover:shadow-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    onClick={handleTwitterShare}
                    title="Share on Twitter/X"
                    variant="ghost"
                  >
                    <IconBrandX className="size-9" />
                  </Button>
                </li>
                <li role="listitem">
                  <Button
                    aria-label="Copy link for Instagram"
                    className="flex aspect-square size-full items-center justify-center rounded-lg bg-card text-gray-400 shadow-lg transition-[background-color_box-shadow_color] hover:text-gray-700 hover:shadow-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    onClick={handleInstagramShare}
                    title="Copy link for Instagram"
                    variant="ghost"
                  >
                    <IconBrandInstagram className="size-9" />
                  </Button>
                </li>
              </ul>
            </div>
          </SheetContainer>
        </div>
        <SheetFooter className="pt-0">
          <div className="flex items-center justify-between">
            <Button>
              <IconCopy />
              Copy Link
            </Button>
            <SheetClose asChild>
              <Button variant="outline">Done</Button>
            </SheetClose>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
