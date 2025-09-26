import Link from "next/link";

import { IconBrandWhatsapp } from "@/assets/icons";
import { IconBrandFacebook, IconBrandInstagram, IconBrandLinkedin } from "@/assets/icons/socials";
import { Logo } from "@/assets/logo";

import { getFeaturedProperties } from "@/modules/properties/actions/query";

export const Footer = async () => {
  const featuredProperties = await getFeaturedProperties(6);
  return (
    <footer className="bg-card">
      <nav className="container py-8 md:py-12">
        <div className="flex flex-col gap-6 md:flex-row md:justify-between">
          <div>
            <Link className="self-center md:self-start" href="/">
              <Logo />
            </Link>
            <p className="mt-4 max-w-lg">
              Vegas Properties offers luxury apartments, villas, and townhouses in Dubai’s top communities. With
              verified listings, trusted developers, and expert guidance, we make buying, selling, and investing
              seamless and transparent.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div>
              <h3 className="mb-3 text-muted-foreground text-xs">Navigation</h3>
              <ul className="space-y-2 font-medium">
                <li>
                  <Link className="transition-colors hover:text-foreground" href="/">
                    Home
                  </Link>
                </li>
                <li>
                  <Link className="transition-colors hover:text-foreground" href="/">
                    Properties
                  </Link>
                </li>
                <li>
                  <Link className="transition-colors hover:text-foreground" href="/">
                    Who we are
                  </Link>
                </li>
                <li>
                  <Link className="transition-colors hover:text-foreground" href="/">
                    Contact us
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-3 text-muted-foreground text-xs">Featured Properties</h3>
              <ul className="space-y-2 font-medium">
                {featuredProperties.map((property) => (
                  <li key={property.id}>
                    <Link className="transition-colors hover:text-foreground" href={`/properties/${property.slug}`}>
                      {property.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="sm:col-span-2 lg:col-span-1">
              <h3 className="mb-3 text-muted-foreground text-xs">Popular Searches</h3>
              <ul className="space-y-2 font-medium">
                {featuredProperties.map((property) => (
                  <li key={property.id}>
                    <Link className="transition-colors hover:text-foreground" href={`/properties/${property.slug}`}>
                      {property.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </nav>

      <div className="container flex flex-col items-center gap-4 py-4 sm:flex-row sm:justify-between">
        <p className="sm: text-center text-xs sm:text-left">
          ALL RIGHTS RESERVED.
          <br />© {new Date().getFullYear()} Vegas Properties LLC
        </p>
        <ul className="flex items-center gap-1 rounded-md bg-muted p-1">
          <li>
            <Link
              className="flex size-8 items-center justify-center rounded-md transition-colors hover:bg-card"
              href="/"
            >
              <IconBrandFacebook className="size-4 text-muted-foreground sm:size-5" />
            </Link>
          </li>
          <li>
            <Link
              className="flex size-8 items-center justify-center rounded-md transition-colors hover:bg-card"
              href="/"
            >
              <IconBrandWhatsapp className="size-4 text-muted-foreground sm:size-5" />
            </Link>
          </li>
          <li>
            <Link
              className="flex size-8 items-center justify-center rounded-md transition-colors hover:bg-card"
              href="/"
            >
              <IconBrandInstagram className="size-4 text-muted-foreground sm:size-5" />
            </Link>
          </li>
          <li>
            <Link
              className="flex size-8 items-center justify-center rounded-md transition-colors hover:bg-card"
              href="/"
            >
              <IconBrandLinkedin className="size-4 text-muted-foreground sm:size-5" />
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
};
