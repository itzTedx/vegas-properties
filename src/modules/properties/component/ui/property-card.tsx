import Image from "next/image";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContainer, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Currency } from "@/components/ui/currency";
import { SeparatorDashed } from "@/components/ui/separator";

import { IconBathtub, IconBedroom, IconBookmark, IconLocationPin } from "@/assets/icons";
import { IconArrowRight } from "@/assets/icons/arrows";

import { ImageObject } from "@/lib/payload/components/media";
import { formatPrice } from "@/lib/utils";
import { Property } from "@/payload-types";

interface Props {
  property: Property;
  showBadges?: boolean;
}

export const PropertyCard = ({ property, showBadges = true }: Props) => {
  const primaryImage = property.images?.find((img) => img.isPrimary)?.image;
  const fallbackImage = property.images?.[0].image;
  const selectedImage = primaryImage || fallbackImage;
  const image = typeof selectedImage === "object" ? selectedImage : undefined;

  const developer = typeof property.propertyDetails.developer === "object" ? property.propertyDetails.developer : null;
  const developerLogo = typeof developer?.logo === "object" ? developer.logo : "";
  const developerLogoUrl = typeof developerLogo === "object" ? developerLogo.url || "" : "";
  const developerTitle = typeof developer?.title === "string" ? developer.title : "";

  return (
    <Card>
      <CardContent className="relative space-y-4">
        {showBadges && (
          <div className="absolute top-2 left-4 z-50 flex items-center gap-2">
            {property.isFeatured && <Badge>Featured</Badge>}
            {property.pricing.priceType === "rent" && <Badge>For Rent</Badge>}
            {property.pricing.priceType === "sale" && <Badge>For Sale</Badge>}
          </div>
        )}
        {image && (
          <div className="relative aspect-4/3">
            {typeof selectedImage !== "string" && image && <ImageObject {...image} />}
            {/* <Image alt="Property" className="rounded-md object-cover" fill src={image} /> */}
          </div>
        )}
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
            <div className="flex items-center gap-2">
              <Image alt={developerTitle} height={50} src={developerLogoUrl} width={50} />
            </div>
          )}
        </div>
        <SeparatorDashed />
        <CardContainer className="space-y-4">
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
              <p className="font-sans font-semibold text-brand-700 text-lg">
                <Currency /> {formatPrice(property.pricing.salePrice)}
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
          <Button className="w-full flex-1">View Details</Button>
          <Button size="icon" variant="outline">
            <IconBookmark className="text-secondary" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

// https://zm-deals-local.s3.us-east-1.amazonaws.com/products/c9c6f2f912d64e9985748e4433790b81-goods-9bf74001132c1df184aa28ec910daea9.webp
