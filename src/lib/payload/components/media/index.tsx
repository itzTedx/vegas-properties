import Image from "next/image";

import { env } from "@/lib/env/server";
import { addImage } from "@/modules/seo";
import { Schema } from "@/modules/seo/schema";
import type { Media } from "@/payload-types";

type Props = Media & { className?: string; priority?: boolean; fill?: boolean };

export async function ImageObject(props: Props) {
  const { filename, height, width, alt, className, priority, blurDataUrl, fill = false } = props;

  const image = `${env.AWS_BUCKET}/${filename}`;

  return (
    <>
      <Schema schema={addImage(image)} />
      <Image
        alt={alt || ""}
        blurDataURL={blurDataUrl ?? undefined}
        className={className}
        fill={fill}
        height={!fill ? (height ?? undefined) : undefined}
        placeholder={blurDataUrl ? "blur" : "empty"}
        priority={priority}
        src={image}
        width={!fill ? (width ?? undefined) : undefined}
      />
    </>
  );
}
