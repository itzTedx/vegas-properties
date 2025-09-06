"use client";
import { useState } from "react";
import Image from "next/image";

import { Shield, MapPin, Users, Smartphone } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { BorderBeam } from "@/components/ui/border-beam";


export default function Features() {
  type ImageKey = "item-1" | "item-2" | "item-3" | "item-4";
  const [activeItem, setActiveItem] = useState<ImageKey>("item-1");

  const images = {
    "item-1": {
      image: "/charts.png",
      alt: "Transparent deals verification",
    },
    "item-2": {
      image: "/music.png",
      alt: "Prime Dubai locations",
    },
    "item-3": {
      image: "/mail2.png",
      alt: "Expert guidance team",
    },
    "item-4": {
      image: "/payments.png",
      alt: "Digital experience platform",
    },
  };

  return (
    <section className="py-12 md:py-20 lg:py-32">
      <div className="-z-10 absolute inset-0 bg-linear-to-b sm:inset-6 sm:rounded-b-3xl dark:block dark:to-[color-mix(in_oklab,var(--color-zinc-900)_75%,var(--color-background))]" />
      <div className="mx-auto max-w-5xl space-y-8 px-6 md:space-y-16 lg:space-y-20 dark:[--color-border:color-mix(in_oklab,var(--color-white)_10%,transparent)]">
        <div className="relative z-10 mx-auto max-w-2xl space-y-4 text-center">
          <h2 className="text-balance font-medium text-4xl lg:text-5xl font-sans">Why Dubai Investors Choose Vegas Properties</h2>
          <p>
            We don't just sell properties—we create long-term value for homeowners and investors alike.
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
                <div className="flex items-center gap-2 text-base">
                  <Shield className="size-4" />
                  Transparent Deals
                </div>
              </AccordionTrigger>
              <AccordionContent>
                100% verified listings and clear, honest communication.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>
                <div className="flex items-center gap-2 text-base">
                  <MapPin className="size-4" />
                  Prime Locations
                </div>
              </AccordionTrigger>
              <AccordionContent>
                Access to Dubai's most desirable communities and iconic developments.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>
                <div className="flex items-center gap-2 text-base">
                  <Users className="size-4" />
                  Expert Guidance
                </div>
              </AccordionTrigger>
              <AccordionContent>
                Our team brings years of experience to simplify every step of your journey.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger>
                <div className="flex items-center gap-2 text-base">
                  <Smartphone className="size-4" />
                  Digital Experience
                </div>
              </AccordionTrigger>
              <AccordionContent>
                From virtual tours to online payments, manage everything seamlessly.
              </AccordionContent>
            </AccordionItem>
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
            <BorderBeam
              className="from-transparent via-yellow-700 to-transparent dark:via-white/50"
              duration={6}
              size={200}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
