import Image from "next/image";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContainer, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Currency } from "@/components/ui/currency";
import { SeparatorDashed } from "@/components/ui/separator";

import {
  IconBathtub,
  IconBedroom,
  IconBookmark,
  IconKey,
  IconLocationPin,
  IconSaleBuilding,
  IconStar,
} from "@/assets/icons";
import { IconArrowRight } from "@/assets/icons/arrows";

import { formatPrice } from "@/lib/utils";
import { Property } from "@/payload-types";

import { CardImage } from "./card-image";

interface Props {
  property: Property;
  showBadges?: boolean;
}

export const PropertyCard = ({ property, showBadges = true }: Props) => {
  const developer = typeof property.propertyDetails.developer === "object" ? property.propertyDetails.developer : null;
  const developerLogo = typeof developer?.logo === "object" ? developer.logo : "";
  const developerLogoUrl = typeof developerLogo === "object" ? developerLogo.url || "" : "";
  const developerTitle = typeof developer?.title === "string" ? developer.title : "";

  return (
    <Card>
      <CardContent className="group relative space-y-3">
        <Link className="absolute inset-0" href={`/properties/${property.slug}`} title="View Details" />
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
        <CardImage images={property.images} />
        <div className="flex items-center justify-between gap-2 pr-2">
          <CardHeader className="flex-1">
            <CardTitle>
              <h3 className="text-lg">{property.title}</h3>
            </CardTitle>
            <CardDescription>
              <p className="flex items-center gap-1.5">
                <IconLocationPin className="size-5 text-muted-foreground" />
                <span className="leading-none [text-box-trim:trim-both]">{property.location.address}</span>
              </p>
            </CardDescription>
          </CardHeader>
          {property.propertyDetails.developer && typeof property.propertyDetails.developer === "object" && (
            <Image alt={developerTitle} height={50} src={developerLogoUrl} width={50} />
          )}
        </div>
        <SeparatorDashed />
        <CardContainer className="space-y-3">
          <div className="flex items-center justify-between">
            <ul className="flex items-center gap-3">
              <li className="flex items-center gap-1.5">
                <IconBedroom className="size-5 text-brand-600" />
                <p className="-tracking-[0.24px] text-sm leading-none [text-box-trim:trim-both]">
                  {property.propertyDetails.bedrooms} Bedrooms
                </p>
              </li>
              <li className="flex items-center gap-1.5">
                <IconBathtub className="size-5 text-brand-600" />
                <p className="-tracking-[0.24px] text-sm leading-none [text-box-trim:trim-both]">
                  {property.propertyDetails.bathrooms} Bathrooms
                </p>
              </li>
            </ul>
            <IconArrowRight className="size-4 text-muted-foreground/60" />
          </div>
          <div className="inline-flex items-center gap-2">
            {property.pricing.salePrice && (
              <p className="font-semibold text-brand-800">
                From <Currency /> {formatPrice(property.pricing.salePrice)}
              </p>
            )}
            {property.pricing.rentalPrice && (
              <span className="-tracking-[0.24px] text-muted-foreground text-sm [text-box-trim:trim-both]">
                {property.pricing.rentalPrice}/month
              </span>
            )}
          </div>
        </CardContainer>
        <div className="flex items-center gap-2">
          <Button asChild className="z-50 w-full flex-1">
            <Link href={`/properties/${property.slug}`} title="View Details">
              View Details
            </Link>
          </Button>
          <Button size="icon" variant="outline">
            <IconBookmark className="text-secondary" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
