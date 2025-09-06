import { DM_Serif_Display, Inter } from "next/font/google";
import localFont from "next/font/local";

export const currency = localFont({
  variable: "--font-currency",
  display: "swap",
  preload: true,
  fallback: ["system-ui", "arial"],
  src: "./currency.woff2",
});

export const nohemi = localFont({
  variable: "--font-nohemi",
  display: "swap",
  preload: true,
  fallback: ["system-ui", "arial"],
  src: [
    { path: "./nohemi/Nohemi-Thin.woff2", weight: "100", style: "normal" },
    { path: "./nohemi/Nohemi-ExtraLight.woff2", weight: "200", style: "normal" },
    { path: "./nohemi/Nohemi-Light.woff2", weight: "300", style: "normal" },
    { path: "./nohemi/Nohemi-Regular.woff2", weight: "400", style: "normal" },
    { path: "./nohemi/Nohemi-Medium.woff2", weight: "500", style: "normal" },
    { path: "./nohemi/Nohemi-SemiBold.woff2", weight: "600", style: "normal" },
    { path: "./nohemi/Nohemi-Bold.woff2", weight: "700", style: "normal" },
    { path: "./nohemi/Nohemi-ExtraBold.woff2", weight: "800", style: "normal" },
    { path: "./nohemi/Nohemi-Black.woff2", weight: "900", style: "normal" },
  ],
});

export const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const dmSerif = DM_Serif_Display({
  variable: "--font-dm-serif",
  subsets: ["latin"],
  weight: ["400"],
});
