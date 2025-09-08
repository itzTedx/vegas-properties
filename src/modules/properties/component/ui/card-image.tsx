import { ImageObject } from "@/lib/payload/components/media";
import { Media } from "@/payload-types";

interface Props {
  image: number | Media;
}
export const CardImage = ({ image }: Props) => {
  return (
    <div className="relative aspect-4/3 overflow-hidden rounded-md">
      {typeof image !== "number" && image && (
        <ImageObject {...image} className="object-cover transition-transform ease-out group-hover:scale-105" fill />
      )}
    </div>
  );
};
