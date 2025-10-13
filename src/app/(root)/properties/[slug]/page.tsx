import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";

import { Building2, Calendar, Car, Layers, Ruler } from "lucide-react";

import { Cta } from "@/components/layout/cta";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContainer, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Currency } from "@/components/ui/currency";
import { Separator, SeparatorDashed } from "@/components/ui/separator";

import { IconBuilding, IconFire, IconKey, IconSaleBuilding, IconStar } from "@/assets/icons";
import { IconCheckmark } from "@/assets/icons/checkmark";
import { IconPlan } from "@/assets/icons/plan";

import { formatDate } from "@/lib/functions/format-date";
import { ImageObject } from "@/lib/payload/components/media";
import RichText from "@/lib/payload/components/rich-text";
import { formatPrice } from "@/lib/utils";
import { getProperties, getPropertiesByDeveloper, getPropertyBySlug } from "@/modules/properties/actions/query";
import { PropertyCard, PropertyNavbar } from "@/modules/properties/component";
import { Gallery } from "@/modules/properties/component/gallery";
import { PropertyHeaderImages } from "@/modules/properties/component/property-header-images";
import { FeaturedProperties } from "@/modules/properties/sections/featured-properties";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const properties = await getProperties();
  return properties.docs.map((property) => property.slug).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  try {
    const property = await getPropertyBySlug(slug);
    const title = property.meta?.title ?? `${property.title} | Vegas Properties`;
    const description =
      property.meta?.description ??
      property.description ??
      `Discover ${property.title} in ${property.propertyDetails?.location ?? "Dubai"}. Explore prices, features, amenities and more.`;

    return {
      title,
      description,
      alternates: {
        canonical: `/properties/${slug}`,
      },
      openGraph: {
        title,
        description,
        type: "website",
        url: `/properties/${slug}`,
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
      },
      robots: {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          "max-image-preview": "large",
        },
      },
    };
  } catch {
    return {
      title: "Property | Vegas Properties",
      description: "Explore Dubai properties for sale and rent with Vegas Properties.",
    };
  }
}

export default async function PropertyPage({ params }: Props) {
  const { slug } = await params;
  const {
    id,
    title,
    description,
    image,
    gallery,
    propertyDetails,
    pricing,
    overview,
    features,
    amenities,
    isFeatured,
    updatedAt,
    status,
  } = await getPropertyBySlug(slug);

  const developerId =
    propertyDetails.developer && typeof propertyDetails.developer === "object"
      ? propertyDetails.developer.id
      : undefined;

  const propertiesByDev = await getPropertiesByDeveloper(developerId, 8);

  return (
    <main>
      <PropertyNavbar
        data={{
          slug,
          title,
          description,
        }}
        id={id}
      />

      <header className="container">
        <PropertyHeaderImages gallery={gallery} image={image} />
        <nav aria-label="Breadcrumb" className="py-3 text-muted-foreground text-sm">
          <ol className="flex items-center gap-2">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li aria-hidden>›</li>
            <li>
              <Link href="/properties">Properties</Link>
            </li>
            <li aria-hidden>›</li>
            <li aria-current="page" className="text-foreground">
              {title}
            </li>
          </ol>
        </nav>
      </header>
      <div className="container mt-9 grid max-w-7xl grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
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
                  {pricing.priceType === "lease" && (
                    <Badge className="border-brand-600/15 shadow-brand-800/10 shadow-lg">
                      <IconSaleBuilding className="text-brand-600" /> For Lease
                    </Badge>
                  )}
                  {getStatus(status)}
                </div>

                <CardHeader className="flex-1 space-y-3">
                  <CardTitle>
                    <h1 className="font-serif text-4xl">{title}</h1>
                  </CardTitle>
                  <div className="space-y-1">
                    <h3 className="text-muted-foreground">Prices from</h3>
                    <div className="flex items-center gap-2">
                      <p className="flex items-center gap-1 font-semibold text-3xl text-secondary-600 leading-none">
                        <Currency className="text-xl" /> {formatPrice(pricing.salePrice ?? 0)}
                      </p>
                      {pricing.rentalPrice && (
                        <span className="text-muted-foreground text-sm">{pricing.rentalPrice}/month</span>
                      )}
                    </div>
                  </div>
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
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
                      <address className="font-medium text-xl not-italic">{propertyDetails.location}</address>
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
                <h2 className="font-light font-sans text-muted-foreground text-xl">About the property</h2>

                {overview && <RichText data={overview} enableGutter={false} />}

                <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
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
            <Card className="py-0">
              <CardContent className="p-6">
                <h2 className="font-light font-sans text-muted-foreground text-xl">Key Features</h2>
                <ul className="mt-2 grid grid-cols-1 gap-x-6 md:grid-cols-2">
                  {features?.map((feature) => (
                    <li className="border-b py-2" key={feature.id}>
                      <h3 className="font-medium">{feature.feature}</h3>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </section>
          <section className="scroll-mt-20" id="amenities">
            <Card className="py-0">
              <CardContent className="p-6">
                <h2 className="font-light font-sans text-muted-foreground text-xl">Amenities That Redefine Living</h2>
                <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {amenities?.map((amenity) => (
                    <div
                      className="relative flex aspect-square items-end overflow-hidden rounded-md border bg-accent p-3"
                      key={amenity.id}
                    >
                      {typeof amenity.image !== "number" && amenity.image && (
                        <ImageObject {...amenity.image} className="object-cover" fill />
                      )}

                      <h3 className="relative z-20 font-medium text-lg">{amenity.amenity}</h3>
                      <div className="absolute inset-0 bg-gradient-to-t from-card/90 via-transparent to-transparent" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </section>
          {propertyDetails.developer &&
            typeof propertyDetails.developer === "object" &&
            propertyDetails.developer.description && (
              <section className="scroll-mt-20" id="developer">
                <Card className="py-0">
                  <CardContent className="p-6">
                    <h2 className="font-light font-sans text-muted-foreground text-xl">More about the Developer</h2>

                    <div className="mt-4">
                      <h3 className="text-muted-foreground">{propertyDetails.developer.title}</h3>
                      <p className="font-medium text-lg">{propertyDetails.developer.description}</p>
                    </div>
                  </CardContent>
                </Card>
              </section>
            )}
        </div>
        <aside className="z-997 flex h-fit flex-col gap-2 rounded-md border bg-card p-4 max-sm:sticky max-sm:bottom-0 sm:p-6 lg:sticky lg:top-20">
          <Button asChild className="w-full font-semibold text-lg" size="lg">
            <Link href={`/contact?message=Can i get more details about ${title}`}>Get Consultation</Link>
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
      {propertiesByDev && (
        <section className="container mt-20">
          <h2 className="max-w-2xl text-balance font-medium font-sans text-2xl md:text-4xl">
            Related properties from{" "}
            <span className="text-brand-600">
              {typeof propertyDetails.developer === "object" && propertyDetails.developer?.title}
            </span>
          </h2>
          <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-4">
            {propertiesByDev.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        </section>
      )}
      <section className="container py-14 md:py-16 lg:py-20">
        <div className="space-y-4">
          <Badge>
            <IconFire />
            Featured
          </Badge>
          <div className="grid gap-3 md:grid-cols-2">
            <h2 className="text-balance font-medium font-sans text-2xl md:text-4xl">
              <span className="text-brand-600">Handpicked</span> Properties for You
            </h2>
            <p className="text-balance text-sm leading-relaxed">
              Discover handpicked Dubai properties for sale and rent, from stunning apartments to luxury villas. Explore
              premium listings with Vegas Properties and find your perfect home in the heart of Dubai.
            </p>
          </div>
        </div>

        <FeaturedProperties />
      </section>

      <Script
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: title,
            description: description,
            brand:
              propertyDetails.developer && typeof propertyDetails.developer === "object"
                ? {
                    "@type": "Organization",
                    name: propertyDetails.developer.title,
                  }
                : undefined,
            offers: pricing?.salePrice
              ? {
                  "@type": "Offer",
                  price: pricing.salePrice,
                  priceCurrency: "AED",
                  availability: "https://schema.org/InStock",
                  url: `/properties/${slug}`,
                }
              : undefined,
            url: `/properties/${slug}`,
            category: propertyDetails.propertyType,
          }),
        }}
        id="ld-json-property"
        type="application/ld+json"
      />

      <Script
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: "/",
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Properties",
                item: "/properties",
              },
              {
                "@type": "ListItem",
                position: 3,
                name: title,
                item: `/properties/${slug}`,
              },
            ],
          }),
        }}
        id="ld-json-breadcrumbs"
        type="application/ld+json"
      />

      <Cta />
    </main>
  );
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

function getStatus(status: "offPlan" | "available" | "sold" | "rented" | "under_contract" | "plot" | "coming_soon") {
  if (status === "offPlan") {
    return (
      <Badge className="border-brand-600/15 shadow-brand-800/10 shadow-lg">
        <IconPlan /> Off-Plan
      </Badge>
    );
  }

  if (status === "available") {
    return (
      <Badge className="border-[#178C4E]/15 text-[#178C4E] shadow-[#178C4E]/10 shadow-lg">
        <IconCheckmark /> Available
      </Badge>
    );
  }

  if (status === "sold") {
    return (
      <Badge className="border-red-600/15 text-destructive shadow-lg shadow-red-800/10">
        <IconCheckmark /> Sold
      </Badge>
    );
  }

  if (status === "rented") {
    return (
      <Badge className="border-brand-700/15 text-brand-600 shadow-brand-700/10 shadow-lg">
        <IconKey className="text-[#2547D0]" /> Rented
      </Badge>
    );
  }

  if (status === "under_contract") {
    return (
      <Badge className="border-brand-700/15 text-brand-600 shadow-brand-700/10 shadow-lg">
        <IconKey /> Under Contract
      </Badge>
    );
  }

  if (status === "plot") {
    return (
      <Badge className="border-brand-700/15 text-brand-600 shadow-brand-700/10 shadow-lg">
        <IconPlan /> Plot
      </Badge>
    );
  }

  if (status === "coming_soon") {
    return (
      <Badge className="border-brand-700/15 text-brand-600 shadow-brand-700/10 shadow-lg">
        <IconKey /> Coming Soon
      </Badge>
    );
  }
}
