import Link from "next/link";

import { Button } from "@/components/ui/button";
import { ImageZoom } from "@/components/ui/image-zoom";

import { ImageObject } from "@/lib/payload/components/media";
import { cn } from "@/lib/utils";
import { Media } from "@/payload-types";

interface Props {
  gallery: (number | Media)[];
  image: number | Media;
}

export const PropertyHeaderImages = ({ gallery, image }: Props) => {
  const totalGalleryCount = gallery?.length ?? 0;
  const displayCount = Math.min(totalGalleryCount, 6);
  const displayedImages = gallery?.slice(0, displayCount) ?? [];

  const getGridClasses = (count: number) => {
    if (count === 0) return "md:grid-cols-1 md:grid-rows-1";
    if (count <= 2) return "md:grid-cols-3 md:grid-rows-2";
    if (count <= 4) return "md:grid-cols-4 md:grid-rows-2"; // 3-4 images
    return "md:grid-cols-5 md:grid-rows-2"; // 5-6 images
  };

  const showSpans = displayCount > 0; // Only span if we actually have side images

  return (
    <div className={cn("relative grid grid-cols-1 gap-2", getGridClasses(displayCount))}>
      <ImageZoom
        className={cn(
          "relative aspect-video overflow-hidden rounded-md",
          showSpans ? "md:col-span-2 md:row-span-2 md:aspect-auto" : "md:col-span-1 md:row-span-1"
        )}
        zoomMargin={100}
      >
        {typeof image !== "number" && image && (
          <ImageObject {...image} className="object-cover transition-transform ease-out hover:scale-105" fill />
        )}
      </ImageZoom>

      {displayedImages.map((img, i) => (
        <ImageZoom className="relative hidden aspect-4/3 overflow-hidden rounded-md md:block" key={i} zoomMargin={100}>
          {typeof img !== "number" && img && (
            <ImageObject {...img} className="object-cover transition-transform duration-300 hover:scale-105" fill />
          )}
        </ImageZoom>
      ))}
      <Button asChild className="absolute right-3 bottom-3" size="sm" variant="outline">
        <Link href="#gallery">{totalGalleryCount} Photos</Link>
      </Button>
    </div>
  );
};
