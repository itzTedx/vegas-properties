import { currency } from "@/assets/fonts";

import { cn } from "@/lib/utils";

export function Currency({ className }: { className?: string }) {
  return <span className={cn(currency.className, className)}>&#x00EA;</span>;
}
