import Image from "next/image";

import { env } from "@/lib/env/server";
import { addImage } from "@/modules/seo";
import { Schema } from "@/modules/seo/schema";
import type { Media } from "@/payload-types";

type Props = Media & { className?: string; priority?: boolean };

export async function ImageObject(props: Props) {
  const { filename, height, width, alt, className, priority, blurDataUrl } = props;

  return (
    <>
      <Schema schema={addImage(props)} />
      <Image
        alt={alt || ""}
        blurDataURL={blurDataUrl ?? undefined}
        className={className}
        height={height || 360}
        placeholder={blurDataUrl ? "blur" : "empty"}
        priority={priority}
        src={`${env.CLOUDFLARE_BUCKET}/${filename}`}
        width={width || 640}
      />
    </>
  );
}
