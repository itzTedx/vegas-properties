"use client";

import { useRef } from "react";

import Autoplay from "embla-carousel-autoplay";
import { WheelGesturesPlugin } from "embla-carousel-wheel-gestures";

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

import { ImageObject } from "@/lib/payload/components/media";
import { Media } from "@/payload-types";

interface Props {
  gallery: (number | Media)[];
}

export const Gallery = ({ gallery }: Props) => {
  const plugin = useRef(Autoplay({ delay: 2000, stopOnInteraction: true }));
  return (
    <Carousel
      className="w-full"
      onMouseEnter={() => plugin.current.stop()}
      onMouseLeave={() => plugin.current.play()}
      opts={{
        loop: true,
        align: "start",
      }}
      plugins={[plugin.current, WheelGesturesPlugin()]}
    >
      <div className="mb-4 flex items-center justify-between">
        <h2 className="w-full font-light font-sans text-muted-foreground text-xl">Project Gallery</h2>
        <div className="relative flex gap-2">
          <CarouselPrevious aria-label="Previous image" className="static translate-y-0" />
          <CarouselNext aria-label="Next image" className="static translate-y-0" />
        </div>
      </div>
      <CarouselContent className="-ml-1">
        {gallery?.map((img, i) => (
          <CarouselItem className="3xl:basis-1/3 pl-1 md:basis-1/2" key={i}>
            <div className="h-full p-1">
              <div className="relative aspect-4/3 overflow-hidden rounded-md xl:aspect-5/4">
                {typeof img !== "number" && img && (
                  <ImageObject
                    {...img}
                    className="object-cover transition-transform duration-500 hover:scale-105"
                    fill
                  />
                )}
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};
