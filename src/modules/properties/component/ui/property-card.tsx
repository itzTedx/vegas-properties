import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Card, CardContainer, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Currency } from "@/components/ui/currency";
import { SeparatorDashed } from "@/components/ui/separator";

import { Azis, IconBathtub, IconBedroom, IconBookmark, IconLocationPin } from "@/assets/icons";
import { IconArrowRight } from "@/assets/icons/arrows";

import { Property } from "@/payload-types";

interface Props {
  property: Property;
}

export const PropertyCard = ({ property }: Props) => {
  return (
    <Card>
      <CardContent className="space-y-4">
        <div className="relative aspect-4/3">
          <Image alt="Property" className="rounded-md object-cover" fill src="/images/property-1.jpg" />
        </div>
        <div className="flex items-center justify-between">
          <CardHeader className="flex-1">
            <CardTitle>
              <h3 className="text-xl">{property.title}</h3>
            </CardTitle>
            <CardDescription>
              <p className="flex items-center gap-1.5">
                <IconLocationPin className="size-5 text-muted-foreground" />
                <span className="leading-none [text-box-trim:trim-both]">{property.location.address}</span>
              </p>
            </CardDescription>
          </CardHeader>
          <Azis />
        </div>
        <SeparatorDashed />
        <CardContainer className="space-y-4">
          <div className="flex items-center justify-between">
            <ul className="flex items-center gap-3">
              <li className="flex items-center gap-1.5">
                <IconBedroom className="text-brand-600" />
                <span className="-tracking-[0.24px] leading-none [text-box-trim:trim-both]">
                  {property.propertyDetails.bedrooms} Bedrooms
                </span>
              </li>
              <li className="flex items-center gap-1.5">
                <IconBathtub className="text-brand-600" />
                <span className="-tracking-[0.24px] leading-none [text-box-trim:trim-both]">
                  {property.propertyDetails.bathrooms} Bathrooms
                </span>
              </li>
            </ul>
            <IconArrowRight className="size-4 text-muted-foreground/60" />
          </div>
          <div className="inline-flex items-center gap-2">
            <p className="font-sans font-semibold text-brand-700 text-lg [text-box-trim:trim-both]">
              <Currency /> {property.pricing.salePrice}
            </p>
            <span className="-tracking-[0.24px] text-muted-foreground text-sm [text-box-trim:trim-both]">
              {property.pricing.rentalPrice}/month
            </span>
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
