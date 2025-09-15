"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

import { MapPin, Shield, Users } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { BorderBeam } from "@/components/ui/border-beam";

export default function Features() {
  type ImageKey = "item-1" | "item-2" | "item-3";
  const [activeItem, setActiveItem] = useState<ImageKey>("item-1");

  const images = {
    "item-1": {
      image: "/images/deals.webp",
      alt: "Transparent deals verification",
    },
    "item-2": {
      image: "/images/dubai.webp",
      alt: "Prime Dubai locations",
    },
    "item-3": {
      image: "/images/expert.webp",
      alt: "Expert guidance team",
    },
  };

  // Auto-cycle images every 2 seconds
  const imageKeys: ImageKey[] = ["item-1", "item-2", "item-3"];

  useEffect(() => {
    const goToNextImage = () => {
      setActiveItem((current) => {
        const currentIndex = imageKeys.indexOf(current);
        const nextIndex = (currentIndex + 1) % imageKeys.length;
        return imageKeys[nextIndex];
      });
    };
    const intervalId = setInterval(goToNextImage, 2000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <section className="py-12 md:py-20 lg:py-32">
      <div className="-z-10 absolute inset-0 bg-linear-to-b sm:inset-6 sm:rounded-b-3xl dark:block dark:to-[color-mix(in_oklab,var(--color-zinc-900)_75%,var(--color-background))]" />
      <div className="mx-auto max-w-5xl space-y-8 px-6 md:space-y-16 lg:space-y-20 dark:[--color-border:color-mix(in_oklab,var(--color-white)_10%,transparent)]">
        <div className="relative z-10 mx-auto max-w-2xl space-y-2 text-center">
          <h2 className="text-balance font-medium font-sans text-4xl lg:text-5xl">
            Why Dubai Investors <span className="text-brand-600">Choose Vegas Properties</span>
          </h2>
          <p className="text-muted-foreground">
            We don't just sell properties; we create long-term value for homeowners and investors alike.
          </p>
        </div>

        <div className="grid gap-12 sm:px-12 md:grid-cols-2 lg:gap-20 lg:px-0">
          <Accordion
            className="w-full"
            onValueChange={(value) => setActiveItem(value as ImageKey)}
            type="single"
            value={activeItem}
          >
            <AccordionItem value="item-1">
              <AccordionTrigger>
                <div className="flex items-center gap-2 text-xl">
                  <Shield className="size-6" />
                  Transparent Deals
                </div>
              </AccordionTrigger>
              <AccordionContent className="text-lg">
                100% verified listings and clear, honest communication.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>
                <div className="flex items-center gap-2 text-xl">
                  <MapPin className="size-6" />
                  Prime Locations
                </div>
              </AccordionTrigger>
              <AccordionContent className="text-lg">
                Access to Dubai's most desirable communities and iconic developments.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>
                <div className="flex items-center gap-2 text-xl">
                  <Users className="size-6" />
                  Expert Guidance
                </div>
              </AccordionTrigger>
              <AccordionContent className="text-lg">
                Our team brings years of experience to simplify every step of your journey.
              </AccordionContent>
            </AccordionItem>
            {/* <AccordionItem value="item-4">
              <AccordionTrigger>
                <div className="flex items-center gap-2 text-xl">
                  <Smartphone className="size-6" />
                  Digital Experience
                </div>
              </AccordionTrigger>
              <AccordionContent className="text-lg">
                From virtual tours to online payments, manage everything seamlessly.
              </AccordionContent>
            </AccordionItem> */}
          </Accordion>

          <div className="relative flex overflow-hidden rounded-3xl border bg-background p-2">
            <div className="absolute inset-0 right-0 ml-auto w-15 border-l bg-[repeating-linear-gradient(-45deg,var(--color-border),var(--color-border)_1px,transparent_1px,transparent_8px)]" />
            <div className="relative aspect-76/59 w-[calc(3/4*100%+3rem)] rounded-2xl bg-background">
              <AnimatePresence mode="wait">
                <motion.div
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  className="size-full overflow-hidden rounded-2xl border bg-zinc-900 shadow-md"
                  exit={{ opacity: 0, y: 6, scale: 0.98 }}
                  initial={{ opacity: 0, y: 6, scale: 0.98 }}
                  key={`${activeItem}-id`}
                  transition={{ duration: 0.2 }}
                >
                  <Image
                    alt={images[activeItem].alt}
                    className="size-full object-cover object-left-top dark:mix-blend-lighten"
                    height={929}
                    src={images[activeItem].image}
                    width={1207}
                  />
                </motion.div>
              </AnimatePresence>
            </div>
            <BorderBeam className="from-transparent via-brand-500 to-transparent" duration={6} size={200} />
          </div>
        </div>
      </div>
    </section>
  );
}
