import type { Metadata, Route } from "next";
import Link from "next/link";
import Script from "next/script";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

import { IconBrandWhatsapp, IconPhone } from "@/assets/icons";
import { IconAgent } from "@/assets/icons/agent";

import { ImageObject } from "@/lib/payload/components/media";
import { getAgents } from "@/modules/agents/query";

export const metadata: Metadata = {
  title: "Real Estate Agents | Vegas Properties",
  description:
    "Meet our expert real estate agents in Las Vegas. Experienced professionals ready to help you buy, sell, or invest with local market insight.",
  openGraph: {
    title: "Real Estate Agents | Vegas Properties",
    description:
      "Meet our expert real estate agents in Las Vegas. Experienced professionals ready to help you buy, sell, or invest with local market insight.",
    type: "website",
    url: "/agents",
    siteName: "Vegas Properties",
  },
  twitter: {
    card: "summary_large_image",
    title: "Real Estate Agents | Vegas Properties",
    description:
      "Meet our expert real estate agents in Las Vegas. Experienced professionals ready to help you buy, sell, or invest with local market insight.",
  },
};

export default async function AgentsPage() {
  const agents = await getAgents();

  return (
    <main className="container space-y-6 py-12">
      <header>
        <div className="space-y-4">
          <Badge>
            <IconAgent />
            Agents
          </Badge>
          <div className="grid gap-3 md:grid-cols-2">
            <h1 className="text-balance font-medium font-serif text-2xl md:text-4xl">
              Meet Our <span className="text-brand-600">Expert</span> Property Agents
            </h1>
            <p className="text-balance text-sm leading-relaxed">
              Our success is built on the expertise and dedication of our trusted real estate agents. Whether you’re
              buying, selling, or investing, our team is here to guide you every step of the way with local knowledge,
              market insights, and unmatched professionalism.
            </p>
          </div>
        </div>
      </header>
      <section aria-labelledby="agents-list">
        <h2 className="sr-only" id="agents-list">
          All agents
        </h2>
        <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {agents.map((agent) => {
            const whatsAppNumber = agent.contact?.whatsAppNumber?.replace(/[^\d]/g, "");
            const phonePrimary = agent.contact?.phonePrimary?.replace(/[^\d]/g, "");
            const agentUrl = `/agents/${agent.slug}` as Route;
            const imageAlt =
              typeof agent.photo !== "number" && agent.photo?.alt
                ? agent.photo.alt
                : `${agent.name}${agent.title ? ` - ${agent.title}` : ""}`;

            return (
              <li className="contents" key={agent.id}>
                <Card>
                  <article itemScope itemType="https://schema.org/Person">
                    <CardContent className="group relative">
                      <Link
                        aria-label={`View profile for ${agent.name}`}
                        className="absolute inset-0 z-10"
                        href={agentUrl}
                      />
                      <div className="relative aspect-4/3 overflow-hidden rounded-md">
                        {typeof agent.photo !== "number" && agent.photo && (
                          <ImageObject
                            {...agent.photo}
                            alt={imageAlt}
                            className="object-cover object-top transition-transform ease-out group-hover:scale-105"
                            fill
                          />
                        )}
                      </div>

                      <CardHeader className="flex flex-1 items-center justify-between gap-2 pt-2">
                        <div>
                          <CardTitle>
                            <h3 className="text-lg" itemProp="name">
                              {agent.name}
                            </h3>
                          </CardTitle>
                          <CardDescription>
                            <p className="flex items-center gap-1.5">
                              <span className="leading-none [text-box-trim:trim-both]" itemProp="jobTitle">
                                {agent.title}
                              </span>
                            </p>
                          </CardDescription>
                        </div>
                        <div className="relative z-50 flex items-center gap-2">
                          {phonePrimary && (
                            <Button asChild size="icon" variant="outline">
                              <Link aria-label={`Call ${agent.name}`} href={`tel:${phonePrimary}`}>
                                <IconPhone />
                              </Link>
                            </Button>
                          )}
                          {whatsAppNumber && (
                            <Button asChild size="icon" variant="outline">
                              <Link
                                aria-label={`Chat on WhatsApp with ${agent.name}`}
                                href={`https://wa.me/${whatsAppNumber}`}
                              >
                                <IconBrandWhatsapp className="size-5" />
                              </Link>
                            </Button>
                          )}
                        </div>
                      </CardHeader>
                      <meta content={agentUrl} itemProp="url" />
                      {phonePrimary && <meta content={phonePrimary} itemProp="telephone" />}
                    </CardContent>
                  </article>
                </Card>
              </li>
            );
          })}
        </ul>
      </section>
      <Script
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            //biome-ignore lint/suspicious/noExplicitAny: there is not types
            itemListElement: agents.map((agent: any, index: number) => ({
              "@type": "ListItem",
              position: index + 1,
              url: `/agents/${agent.slug}`,
              item: {
                "@type": "Person",
                name: agent.name,
                jobTitle: agent.title,
                url: `/agents/${agent.slug}`,
                telephone: agent?.contact?.phonePrimary || undefined,
              },
            })),
          }),
        }}
        suppressHydrationWarning
        type="application/ld+json"
      />
    </main>
  );
}
