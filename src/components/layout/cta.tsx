import Link from "next/link";

import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";

interface Props {
  disableBg?: boolean;
}

export const Cta = ({ disableBg = false }: Props) => {
  return (
    <section
      aria-labelledby="cta-heading"
      className={cn(
        "relative bg-gradient-to-t from-50% from-brand-950 to-50% to-transparent py-8 max-md:px-4 sm:py-12 md:py-16 lg:py-20",
        disableBg && "bg-transparent"
      )}
    >
      {/* <div className="container relative z-10 flex max-w-7xl items-center justify-between gap-3 space-y-3 overflow-hidden rounded-3xl bg-radial-[105%_100%_at_50%_0%] from-brand-500 via-55% via-brand-800 to-brand-950 px-3 py-8 text-background shadow-[0_8px_28px_0_oklch(0.2788_0.0909_306.27/40%)] sm:space-y-4 sm:rounded-4xl sm:px-4 sm:py-12 sm:shadow-[0_12px_42px_0_oklch(0.2788_0.0909_306.27/40%)] md:space-y-6 md:px-8 md:py-16 lg:px-12"> */}
      <div className="container relative z-10 flex max-w-7xl flex-col items-center justify-between gap-3 overflow-hidden rounded-3xl bg-card px-6 py-8 text-primary shadow-[0_8px_28px_0_oklch(0.2788_0.0909_306.27/40%)] sm:rounded-4xl sm:px-4 sm:py-12 sm:shadow-[0_12px_42px_0_oklch(0.2788_0.0909_306.27/40%)] md:flex-row md:px-8 md:py-16 lg:px-12">
        <div>
          <h2
            className="relative z-10 mx-auto max-w-2xl text-balance font-serif text-2xl text-secondary-800 leading-[1.1] md:text-3xl lg:text-4xl xl:text-6xl"
            id="cta-heading"
          >
            Ready to Buy, Sell, or Invest in Dubai?
          </h2>
          <p className="relative z-10 mx-auto max-w-xl text-balance leading-relaxed sm:max-w-2xl md:text-lg lg:text-xl">
            Our team of experts is ready to guide you through every step of the process.
          </p>
        </div>
        <Button aria-label="Learn more about our services and expertise" asChild>
          <Link href="https://wa.me/971505691218" rel="noopener noreferrer" target="_blank">
            Get Expert Advice
          </Link>
        </Button>
      </div>
    </section>
  );
};
