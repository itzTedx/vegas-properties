"use client";

import type { StaticImageData } from "next/image";
import NextImage from "next/image";

import { cssVariables } from "@/css-variables";
import { cn } from "@/lib/utils";

import { getClientSideURL } from "../../utils/get-url";
import type { MediaProps } from "./types";

const { breakpoints } = cssVariables;

export const ImageMedia = (props: MediaProps) => {
  const {
    alt: altFromProps,
    fill,
    imgClassName,
    priority,
    resource,
    size: sizeFromProps,
    src: srcFromProps,
    loading: loadingFromProps,
  } = props;

  let width: number | undefined;
  let height: number | undefined;
  let alt = altFromProps;
  let src: StaticImageData | string = srcFromProps || "";
  let blurDataUrl: string | undefined;

  if (!src && resource && typeof resource === "object") {
    const {
      alt: altFromResource,
      blurDataUrl: blurDataUrlFromResource,
      height: fullHeight,
      url,
      width: fullWidth,
    } = resource;

    width = fullWidth!;
    height = fullHeight!;
    alt = altFromResource || "";
    blurDataUrl = blurDataUrlFromResource ?? undefined;
    src = `${getClientSideURL()}${url}`;
  }

  const loading = loadingFromProps || (!priority ? "lazy" : undefined);

  // NOTE: this is used by the browser to determine which image to download at different screen sizes
  const sizes = sizeFromProps
    ? sizeFromProps
    : Object.entries(breakpoints)
        .map(([, value]) => `(max-width: ${value}px) ${value * 2}w`)
        .join(", ");

  return (
    <picture>
      <NextImage
        alt={alt || ""}
        blurDataURL={blurDataUrl ?? undefined}
        className={cn(imgClassName)}
        fill={fill}
        height={!fill ? height : undefined}
        loading={loading}
        placeholder={blurDataUrl ? "blur" : "empty"}
        priority={priority}
        quality={100}
        sizes={sizes}
        src={src}
        width={!fill ? width : undefined}
      />
    </picture>
  );
};
