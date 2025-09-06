import { ImageObject } from "@/lib/payload/components/media";
import { Media } from "@/payload-types";

interface Props {
  images?:
    | {
        image: number | Media;
        alt?: string | null;
        isPrimary?: boolean | null;
        id?: string | null;
      }[]
    | null;
}
export const CardImage = ({ images }: Props) => {
  const primaryImage = images?.find((img) => img.isPrimary)?.image;
  const fallbackImage = images?.[0].image;
  const selectedImage = primaryImage || fallbackImage;
  const image = typeof selectedImage === "object" ? selectedImage : undefined;
  return (
    <div className="relative aspect-4/3 overflow-hidden rounded-md">
      {typeof selectedImage !== "string" && image && (
        <ImageObject {...image} className="object-cover transition-transform ease-out group-hover:scale-105" fill />
      )}
    </div>
  );
};
