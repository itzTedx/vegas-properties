import Link from "next/link";

import { Button } from "@/components/ui/button";

import { ImageObject } from "@/lib/payload/components/media";
import { Media } from "@/payload-types";

interface Props {
  gallery: (number | Media)[];
  image: number | Media;
}

export const PropertyHeaderImages = ({ gallery, image }: Props) => {
  return (
    <div className="relative grid grid-cols-1 gap-2 md:grid-cols-5 md:grid-rows-2">
      <div className="relative aspect-video overflow-hidden rounded-md md:col-span-2 md:row-span-2 md:aspect-auto">
        {typeof image !== "number" && image && (
          <ImageObject {...image} className="object-cover transition-transform ease-out hover:scale-105" fill />
        )}
      </div>
      {gallery?.splice(0, 6).map((img, i) => (
        <div className="relative hidden aspect-4/3 overflow-hidden rounded-md md:block" key={i}>
          {typeof img !== "number" && img && (
            <ImageObject {...img} className="object-cover transition-transform duration-300 hover:scale-105" fill />
          )}
        </div>
      ))}
      <Button asChild className="absolute right-3 bottom-3" size="sm" variant="outline">
        <Link href="#gallery">{gallery.length} Photos</Link>
      </Button>
    </div>
  );
};
