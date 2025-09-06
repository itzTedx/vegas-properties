"use client";

import * as React from "react";

import * as SeparatorPrimitive from "@radix-ui/react-separator";

import { cn } from "@/lib/utils";

function Separator({
  className,
  orientation = "horizontal",
  decorative = true,
  ...props
}: React.ComponentProps<typeof SeparatorPrimitive.Root>) {
  return (
    <SeparatorPrimitive.Root
      className={cn(
        "shrink-0 bg-border data-[orientation=horizontal]:h-px data-[orientation=vertical]:h-full data-[orientation=horizontal]:w-full data-[orientation=vertical]:w-px",
        className
      )}
      data-slot="separator"
      decorative={decorative}
      orientation={orientation}
      {...props}
    />
  );
}

function SeparatorDashed({ className, ...props }: React.ComponentProps<typeof SeparatorPrimitive.Root>) {
  return (
    <div
      className={cn(
        "h-px w-full bg-[url('data:image/svg+xml,%3csvg%20width%3D%27100%25%27%20height%3D%27100%25%27%20xmlns%3D%27http%3A//www.w3.org/2000/svg%27%3e%3crect%20width%3D%27100%25%27%20height%3D%27100%25%27%20fill%3D%27none%27%20stroke%3D%27%23E6E6E6%27%20stroke-width%3D%271%27%20stroke-dasharray%3D%274%2c%206%27%20stroke-dashoffset%3D%270%27%20stroke-linecap%3D%27round%27/%3e%3c/svg%3e')]",
        className
      )}
      {...props}
    />
  );
}

export { Separator, SeparatorDashed };
