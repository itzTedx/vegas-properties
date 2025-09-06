import Link from "next/link";

import { IconBrandWhatsapp } from "@/assets/icons";
import { IconBrandFacebook, IconBrandInstagram, IconBrandLinkedin } from "@/assets/icons/socials";
import { Logo } from "@/assets/logo";

import { getFeaturedProperties } from "@/modules/properties/actions/query";

export const Footer = async () => {
  const featuredProperties = await getFeaturedProperties(6);
  return (
    <footer className="bg-card">
      <nav className="container flex justify-between py-12">
        <Link href="/">
          <Logo />
        </Link>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <h3>Navigation</h3>
            <ul>
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link href="/">Properties</Link>
              </li>
              <li>
                <Link href="/">Who we are</Link>
              </li>
              <li>
                <Link href="/">Contact us</Link>
              </li>
            </ul>
          </div>
          <div>
            <h3>Featured Properties</h3>
            <ul>
              {featuredProperties.map((property) => (
                <li key={property.id}>
                  <Link href={`/properties/${property.slug}`}>{property.title}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3>Popular Searches</h3>
            <ul>
              {featuredProperties.map((property) => (
                <li key={property.id}>
                  <Link href={`/properties/${property.slug}`}>{property.title}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
      <div className="container flex items-center justify-between gap-3 py-4">
        <p className="text-muted-foreground text-sm">
          ALL RIGHTS RESERVED.
          <br />© {new Date().getFullYear()} Vegas Properties LLC
        </p>
        <ul className="flex items-center gap-1 rounded-md bg-muted p-1">
          <li>
            <Link
              className="flex size-8 items-center justify-center rounded-md transition-colors hover:bg-card"
              href="/"
            >
              <IconBrandFacebook className="size-5 text-muted-foreground" />
            </Link>
          </li>
          <li>
            <Link
              className="flex size-8 items-center justify-center rounded-md transition-colors hover:bg-card"
              href="/"
            >
              <IconBrandWhatsapp className="size-5 text-muted-foreground" />
            </Link>
          </li>
          <li>
            <Link
              className="flex size-8 items-center justify-center rounded-md transition-colors hover:bg-card"
              href="/"
            >
              <IconBrandInstagram className="size-5 text-muted-foreground" />
            </Link>
          </li>
          <li>
            <Link
              className="flex size-8 items-center justify-center rounded-md transition-colors hover:bg-card"
              href="/"
            >
              <IconBrandLinkedin className="size-5 text-muted-foreground" />
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
};
