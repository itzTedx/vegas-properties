import Image from "next/image";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContainer, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Currency } from "@/components/ui/currency";
import { SeparatorDashed } from "@/components/ui/separator";

import { IconBathtub, IconBedroom, IconKey, IconLocationPin, IconSaleBuilding, IconStar } from "@/assets/icons";
import { IconArrowRight } from "@/assets/icons/arrows";

import { getBookmarkByPropertyId } from "@/actions/bookmarks";
import { formatPrice } from "@/lib/utils";
import { Property } from "@/payload-types";

import { BookmarkButton } from "./bookmark-button";
import { CardImage } from "./card-image";

interface Props {
  property: Property;
  showBadges?: boolean;
}

export const PropertyCard = async ({ property, showBadges = true }: Props) => {
  const isBookmarked = await getBookmarkByPropertyId(property.id);
  const developer = typeof property.propertyDetails.developer === "object" ? property.propertyDetails.developer : null;
  const developerLogo = typeof developer?.logo === "object" ? developer.logo : "";
  const developerLogoUrl = typeof developerLogo === "object" ? developerLogo.url || "" : "";
  const developerTitle = typeof developer?.title === "string" ? developer.title : "";

  const titleId = `property-title-${property.id}`;

  return (
    <article aria-labelledby={titleId} className="h-full" itemScope itemType="https://schema.org/Residence">
      <Card className="h-full">
        <CardContent className="group relative flex h-full flex-col justify-between">
          <div className="space-y-3">
            {showBadges && (
              <div className="absolute top-2 left-4 z-50 flex items-center gap-2">
                {property.isFeatured && (
                  <Badge className="border-[#C99A2C]/15 shadow-xl shadow-yellow-700/10">
                    <IconStar className="text-[#F6B51E]" /> Featured
                  </Badge>
                )}
                {property.pricing.priceType === "rent" && (
                  <Badge className="border-brand-600/15 shadow-brand-700/10 shadow-xl">
                    <IconKey className="text-[#2547D0]" /> For Rent
                  </Badge>
                )}
                {property.pricing.priceType === "sale" && (
                  <Badge className="border-secondary-600/15 shadow-secondary-700/10 shadow-xl">
                    <IconSaleBuilding className="text-secondary" /> For Sale
                  </Badge>
                )}
              </div>
            )}
            <figure>
              <CardImage image={property.image} />
            </figure>
            <div className="flex items-center justify-between gap-2 pr-2">
              <header className="flex-1">
                <CardHeader className="flex-1 p-0">
                  <CardTitle>
                    <h3 className="text-lg" id={titleId} itemProp="name">
                      <Link href={`/properties/${property.slug}`} title={`View details for ${property.title}`}>
                        {property.title}
                      </Link>
                    </h3>
                  </CardTitle>
                  <CardDescription>
                    <div className="flex items-center gap-1.5">
                      <IconLocationPin className="size-5 text-muted-foreground" />
                      <address className="not-italic leading-none [text-box-trim:trim-both]" itemProp="address">
                        {property.propertyDetails.location}
                      </address>
                    </div>
                  </CardDescription>
                </CardHeader>
              </header>
              {property.propertyDetails.developer && typeof property.propertyDetails.developer === "object" && (
                <div className="shrink-0" itemProp="brand" itemScope itemType="https://schema.org/Brand">
                  {developerTitle && <meta content={developerTitle} itemProp="name" />}
                  <Image
                    alt={developerTitle || `${property.title} developer logo`}
                    height={50}
                    itemProp="logo"
                    src={developerLogoUrl}
                    width={50}
                  />
                </div>
              )}
            </div>
            <SeparatorDashed />
            <CardContainer className="space-y-3">
              <div className="flex items-center justify-between">
                <ul className="flex items-center gap-3">
                  <li className="flex items-center gap-1.5">
                    <IconBedroom className="size-5 text-brand-600" />
                    <p className="-tracking-[0.24px] text-sm leading-none [text-box-trim:trim-both]">
                      <span itemProp="numberOfRooms">{property.propertyDetails.bedrooms}</span> Bedrooms
                    </p>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <IconBathtub className="size-5 text-brand-600" />
                    <p className="-tracking-[0.24px] text-sm leading-none [text-box-trim:trim-both]">
                      <span itemProp="numberOfBathroomsTotal">{property.propertyDetails.bathrooms}</span> Bathrooms
                    </p>
                  </li>
                </ul>
                <IconArrowRight className="size-4 text-muted-foreground/60" />
              </div>
              <div className="inline-flex items-center gap-2">
                {property.pricing.salePrice && (
                  <div itemProp="offers" itemScope itemType="https://schema.org/Offer">
                    <meta content="USD" itemProp="priceCurrency" />
                    <p className="font-semibold text-brand-800">
                      <Currency /> {formatPrice(property.pricing.salePrice)}
                    </p>
                    <meta content={String(property.pricing.salePrice)} itemProp="price" />
                  </div>
                )}
                {property.pricing.rentalPrice && (
                  <span className="-tracking-[0.24px] text-muted-foreground text-sm [text-box-trim:trim-both]">
                    {property.pricing.rentalPrice}/month
                  </span>
                )}
              </div>
            </CardContainer>
          </div>
          <div className="mt-auto flex items-center gap-2 pt-3">
            <Button asChild className="z-50 w-full flex-1">
              <Link
                aria-label={`View details for ${property.title}`}
                href={`/properties/${property.slug}`}
                title="View Details"
              >
                View Details
              </Link>
            </Button>
            <BookmarkButton id={property.id} isBookmarked={isBookmarked} />
          </div>
        </CardContent>
      </Card>
    </article>
  );
};
