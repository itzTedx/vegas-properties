import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

import { ImageObject } from "@/lib/payload/components/media";
import RichText from "@/lib/payload/components/rich-text";
import { formatPrice } from "@/lib/utils";
import { getPropertyBySlug } from "@/modules/properties/actions/query";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function PropertyPage({ params }: Props) {
  const { slug } = await params;
  const { title, image, gallery, propertyDetails, pricing, overview, features, amenities } =
    await getPropertyBySlug(slug);

  return (
    <main className="container pt-6 pb-12">
      <header>
        <div className="relative mb-12 aspect-6/3 overflow-hidden rounded-md">
          {typeof image !== "number" && image && (
            <ImageObject {...image} className="object-cover transition-transform ease-out group-hover:scale-105" fill />
          )}
        </div>
        <h1 className="font-serif text-5xl">{title}</h1>
      </header>
      <section className="mt-9 space-y-16">
        <div className="flex items-center justify-between gap-4">
          <div className="flex gap-12">
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
          <Button asChild size="lg">
            <Link href="/contact">Get Consultation</Link>
          </Button>
        </div>
        <div className="grid grid-cols-2 gap-6">
          <div className="grid h-fit grid-cols-3 gap-9">
            <div>
              <h3 className="text-muted-foreground">Prices from</h3>
              <p className="font-medium text-3xl text-secondary-600">{formatPrice(pricing.salePrice ?? 0)}</p>
            </div>
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
            <div>
              <h3 className="text-muted-foreground">Property Type</h3>
              <p className="font-medium text-3xl capitalize">{propertyDetails.propertyType}</p>
            </div>
            {propertyDetails.other &&
              propertyDetails.other.map((item) => (
                <div key={item.id}>
                  <h3 className="text-muted-foreground">{item.label}</h3>
                  <p className="font-medium text-3xl capitalize">{item.value}</p>
                </div>
              ))}
          </div>
          {overview && (
            <section>
              <RichText data={overview} />
            </section>
          )}
        </div>
      </section>

      <section aria-label="Project Gallery" className="pt-20">
        <Carousel
          className="w-full"
          opts={{
            loop: true,
            align: "start",
          }}
        >
          <div className="flex items-center justify-between md:mb-6 lg:mb-9">
            <h2 className="w-full text-4xl">Project Gallery</h2>
            <div className="relative flex gap-2">
              <CarouselPrevious aria-label="Previous image" className="static translate-y-0" />
              <CarouselNext aria-label="Next image" className="static translate-y-0" />
            </div>
          </div>
          <CarouselContent className="-ml-1">
            {gallery?.map((img, index) => (
              <CarouselItem className="3xl:basis-1/3 pl-1 md:basis-1/2" key={img.id}>
                <div className="h-full p-1">
                  <div className="relative aspect-4/3 overflow-hidden rounded-md xl:aspect-5/4">
                    {typeof img.image !== "number" && img.image && (
                      <ImageObject
                        {...img.image}
                        className="object-cover transition-transform duration-500 hover:scale-105"
                        fill
                      />
                    )}
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </section>

      <section className="space-y-4 py-16">
        <h2>Key Features</h2>
        <ul className="grid grid-cols-2 gap-6">
          {features?.map((feature) => (
            <li key={feature.id}>
              <h3 className="font-medium text-xl">{feature.feature}</h3>
            </li>
          ))}
        </ul>
      </section>
      <section>
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
    </main>
  );
}
