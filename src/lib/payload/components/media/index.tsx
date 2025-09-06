import React, { Fragment, JSX } from "react";

import { ImageMedia } from "./image";
import type { MediaProps } from "./types";
import { VideoMedia } from "./video";

export const Media: React.FC<MediaProps> = (props) => {
  const { className, htmlElement = "div", resource } = props;

  const isVideo = typeof resource === "object" && resource?.mimeType?.includes("video");
  const Tag = (htmlElement as keyof JSX.IntrinsicElements) || Fragment;

  return (
    <Tag
      {...(htmlElement !== null
        ? {
            className,
          }
        : {})}
    >
      {isVideo ? <VideoMedia {...props} /> : <ImageMedia {...props} />}
    </Tag>
  );
};
