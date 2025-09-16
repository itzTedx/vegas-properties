import type { ComponentType, SVGProps } from "react";

import { Globe } from "lucide-react";

import {
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandLinkedin,
  IconBrandSnapchat,
  IconBrandTelegram,
  IconBrandTiktok,
  IconBrandWhatsapp,
  IconBrandX,
  IconBrandYoutube,
  IconEmail,
} from "@/assets/icons";

interface Props {
  platform:
    | "website"
    | "facebook"
    | "instagram"
    | "linkedin"
    | "twitter"
    | "youtube"
    | "tiktok"
    | "whatsapp"
    | "snapchat"
    | "telegram";
}

type IconComponent = ComponentType<SVGProps<SVGSVGElement>>;

export const getSocialIcons = (platform: Props["platform"]): IconComponent => {
  switch (platform) {
    case "website":
      return Globe;
    case "facebook":
      return IconBrandFacebook;
    case "instagram":
      return IconBrandInstagram;
    case "linkedin":
      return IconBrandLinkedin;
    case "twitter":
      return IconBrandX;
    case "youtube":
      return IconBrandYoutube;
    case "whatsapp":
      return IconBrandWhatsapp;
    case "snapchat":
      return IconBrandSnapchat;
    case "telegram":
      return IconBrandTelegram;
    case "tiktok":
      return IconBrandTiktok; // fallback
    default:
      return IconEmail;
  }
};
