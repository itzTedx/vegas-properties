import Link from "next/link";

import { Building2, Calendar, Car, Layers, Ruler } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContainer, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Separator, SeparatorDashed } from "@/components/ui/separator";
import Autoplay from "embla-carousel-autoplay"
import { WheelGesturesPlugin } from 'embla-carousel-wheel-gestures'

import { IconBuilding, IconKey, IconSaleBuilding, IconStar } from "@/assets/icons";

import { formatDate } from "@/lib/functions/format-date";
import { ImageObject } from "@/lib/payload/components/media";
import RichText from "@/lib/payload/components/rich-text";
import { formatPrice } from "@/lib/utils";
import { getPropertyBySlug } from "@/modules/properties/actions/query";
import { PropertyNavbar } from "@/modules/properties/component";
import { Gallery } from "@/modules/properties/component/gallery";

interface Props {
  params: Promise<{ slug: string }>;
}

function getDetailIcon(label: string) {
  const normalized = label.toLowerCase().trim();

  if (normalized.includes("parking") || normalized.includes("garage") || normalized.includes("car park")) {
    return <Car className="size-6" />;
  }

  if (normalized.includes("year built") || normalized.includes("built") || normalized.includes("construction year")) {
    return <Calendar className="size-6" />;
  }

  if (
    normalized.includes("area") ||
    normalized.includes("size") ||
    normalized.includes("lot") ||
    normalized.includes("sqft") ||
    normalized.includes("square")
  ) {
    return <Ruler className="size-6" />;
  }

  if (normalized.includes("floor") || normalized.includes("storey") || normalized.includes("stories")) {
    return <Building2 className="size-6" />;
  }

  if (normalized.includes("amenities") || normalized.includes("features")) {
    return <Layers className="size-6" />;
  }

  return <IconBuilding className="size-6" />;
}

export default async function PropertyPage({ params }: Props) {
  const { slug } = await params;
  const { title, image, gallery, propertyDetails, pricing, overview, features, amenities, isFeatured, updatedAt } =
    await getPropertyBySlug(slug);

  return (
    <main className="pb-12">
      <PropertyNavbar />

      <header className="container">
        <div className="relative grid grid-cols-5 grid-rows-2 gap-2">
          <div className="relative col-span-2 row-span-2 overflow-hidden rounded-md">
            {typeof image !== "number" && image && (
              <ImageObject {...image} className="object-cover transition-transform ease-out hover:scale-105" fill />
            )}
          </div>
          {gallery?.splice(0, 6).map((img, i) => (
            <div className="relative aspect-4/3 overflow-hidden rounded-md" key={i}>
              {typeof img !== "number" && img && (
                <ImageObject {...img} className="object-cover transition-transform duration-300 hover:scale-105" fill />
              )}
            </div>
          ))}
          <Button asChild className="absolute right-3 bottom-3" size="sm" variant="outline">
            <Link href="#gallery">{gallery.length} Photos</Link>
          </Button>
        </div>
      </header>
      <div className="container mt-9 grid max-w-7xl grid-cols-3 gap-4">
        <div className="col-span-2 space-y-12">
          <section className="scroll-mt-20" id="overview">
            <Card className="py-0">
              <CardContent className="group relative space-y-3 p-6">
                <div className="flex items-center gap-2">
                  {isFeatured && (
                    <Badge className="border-[#C99A2C]/15 shadow-lg shadow-yellow-800/10">
                      <IconStar className="text-[#F6B51E]" /> Featured
                    </Badge>
                  )}
                  {pricing.priceType === "rent" && (
                    <Badge className="border-brand-600/15 shadow-brand-800/10 shadow-lg">
                      <IconKey className="text-[#2547D0]" /> For Rent
                    </Badge>
                  )}
                  {pricing.priceType === "sale" && (
                    <Badge className="border-secondary-600/15 shadow-lg shadow-secondary-800/10">
                      <IconSaleBuilding className="text-secondary" /> For Sale
                    </Badge>
                  )}
                </div>

                <CardHeader className="flex-1 space-y-3">
                  <CardTitle>
                    <h1 className="font-serif text-4xl">{title}</h1>
                  </CardTitle>
                  <div className="space-y-1">
                    <h3 className="text-muted-foreground">Prices from</h3>
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-3xl text-secondary-600 leading-none">
                        {formatPrice(pricing.salePrice ?? 0)}
                      </p>
                      {pricing.rentalPrice && (
                        <span className="text-muted-foreground text-sm">{pricing.rentalPrice}/month</span>
                      )}
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-6">
                    <div>
                      <h3 className="text-muted-foreground">Bedrooms</h3>
                      <p className="font-medium text-3xl">{propertyDetails.bedrooms}</p>
                    </div>
                    <div>
                      <h3 className="text-muted-foreground">Bathrooms</h3>
                      <p className="font-medium text-3xl">{propertyDetails.bathrooms}</p>
                    </div>
                    <div>
                      <h3 className="text-muted-foreground">Starting area (ft²)</h3>
                      <p className="font-medium text-3xl">{propertyDetails.area}</p>
                    </div>
                  </div>
                </CardHeader>

                <SeparatorDashed />
                <CardContainer className="space-y-3">
                  <div className="mt-4 flex gap-12">
                    <div>
                      <h2 className="flex items-center gap-2 text-muted-foreground">Location</h2>
                      <p className="font-medium text-xl">{propertyDetails.location}</p>
                    </div>
                    {propertyDetails.developer && typeof propertyDetails.developer === "object" && (
                      <div>
                        <h2 className="flex items-center gap-2 text-muted-foreground">Developer</h2>
                        <p className="font-medium text-xl">{propertyDetails.developer.title}</p>
                      </div>
                    )}
                  </div>
                </CardContainer>
              </CardContent>
            </Card>
          </section>
          <section className="scroll-mt-20" id="about">
            <Card className="py-0">
              <CardContent className="space-y-4 p-6">
                <h3 className="font-medium text-muted-foreground text-xl">About the property</h3>

                {overview && <RichText data={overview} enableGutter={false} />}

                <ul className="grid grid-cols-3 gap-4">
                  <li className="flex items-center gap-2 rounded-md bg-accent p-3">
                    <IconBuilding className="size-7" />
                    <div>
                      <p className="font-medium text-lg capitalize leading-none">{propertyDetails.propertyType}</p>
                      <h4 className="text-muted-foreground text-sm">Property Type</h4>
                    </div>
                  </li>
                  {propertyDetails.other &&
                    propertyDetails.other.map((item) => (
                      <li className="flex items-center gap-2 rounded-md bg-accent p-3" key={item.id}>
                        {getDetailIcon(item.label)}
                        <div>
                          <p className="font-medium text-lg capitalize leading-none">{item.value}</p>
                          <h4 className="text-muted-foreground text-sm">{item.label}</h4>
                        </div>
                      </li>
                    ))}
                </ul>

                <p className="text-muted-foreground text-sm">
                  Listing updated: {formatDate(updatedAt, { showDayOfWeek: true })}
                </p>
              </CardContent>
            </Card>
          </section>

          <section aria-label="Project Gallery" className="scroll-mt-20" id="gallery">
            <Card className="py-0">
              <CardContent className="p-6">
                <Gallery gallery={gallery} />
              </CardContent>
            </Card>
          </section>

          <section className="scroll-mt-20" id="features">
            <h2>Key Features</h2>
            <ul className="grid grid-cols-2 gap-6">
              {features?.map((feature) => (
                <li key={feature.id}>
                  <h3 className="font-medium text-xl">{feature.feature}</h3>
                </li>
              ))}
            </ul>
          </section>
          <section className="scroll-mt-20" id="amenities">
            <h2>Amenities That Redefine Living</h2>
            <div className="grid grid-cols-4 gap-6">
              {amenities?.map((amenity) => (
                <div key={amenity.id}>
                  {typeof amenity.image !== "number" && amenity.image && (
                    <div className="relative aspect-square overflow-hidden rounded-md">
                      <ImageObject {...amenity.image} className="object-cover" fill />
                    </div>
                  )}
                  <h3 className="font-medium text-xl">{amenity.amenity}</h3>
                </div>
              ))}
            </div>
          </section>
        </div>
        <aside className="flex h-fit flex-col gap-2 rounded-md border bg-card p-6">
          <Button asChild className="w-full font-semibold text-lg" size="lg">
            <Link href="/contact">Get Consultation</Link>
          </Button>
          <p className="text-muted-foreground text-xs">Get an Expert advice to find the perfect property for you.</p>
          <Separator />
          <div className="flex items-center justify-between gap-2 text-center">
            <Link
              className="w-full text-center font-semibold text-secondary-700 hover:text-secondary-600 hover:underline"
              href="/contact"
            >
              Ask a Question
            </Link>
            <div className="h-5 w-px shrink-0 bg-border" />
            <Link
              className="w-full text-center font-semibold text-secondary-700 hover:text-secondary-600 hover:underline"
              href="/contact"
            >
              Schedule a Call
            </Link>
          </div>
        </aside>
      </div>
    </main>
  );
}
