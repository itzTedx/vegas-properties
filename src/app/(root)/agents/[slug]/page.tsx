import type { Metadata, Route } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Cta } from "@/components/layout/cta";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { IconBrandWhatsapp, IconEmail, IconPhone } from "@/assets/icons";

import { getSocialIcons } from "@/lib/functions/get-social-icons";
import { pluralize } from "@/lib/functions/pluralize";
import { ImageObject } from "@/lib/payload/components/media";
import RichText from "@/lib/payload/components/rich-text";
import { getAgentBySlug, getAgents } from "@/modules/agents/query";
import { addBreadcrumbs } from "@/modules/seo";
import { Schema } from "@/modules/seo/schema";

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  try {
    const agents = await getAgents();
    return agents.map((agent) => agent.slug).map((slug) => ({ slug }));
  } catch (error) {
    // If database is unavailable during build, return empty array
    // Pages will be generated on-demand at runtime
    console.warn("Failed to fetch agents for static generation:", error);
    return [];
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const agent = await getAgentBySlug(slug);

  if (!agent) {
    return {
      title: "Agent Not Found | Vegas Properties",
      description: "The requested agent profile could not be found.",
      robots: { index: false, follow: false },
      alternates: { canonical: `/agents/${slug}` },
      metadataBase: new URL("https://www.vegasproperties.ae/"),
    };
  }

  const title = `${agent.name}${agent.title ? `, ${agent.title}` : ""} | Vegas Properties`;
  const description = agent.about
    ? `Learn more about ${agent.name}, ${agent.title || "real estate agent"}.`
    : `${agent.name} ${agent.title ? `- ${agent.title} ` : ""}at Vegas Properties.`;

  return {
    title,
    description,
    alternates: { canonical: `/agents/${slug}` },
    openGraph: {
      title,
      description,
      type: "profile",
      url: `/agents/${slug}`,
      siteName: "Vegas Properties",
    },
    twitter: {
      card: "summary",
      title,
      description,
    },
    robots: { index: true, follow: true },
  };
}

export default async function AgentPage({ params }: Props) {
  const { slug } = await params;
  const agent = await getAgentBySlug(slug);
  if (!agent) return notFound();

  const sanitizedWhatsapp = agent.contact?.whatsAppNumber?.replace(/[^\d]/g, "");
  const sanitizedPhonePrimary = agent.contact?.phonePrimary?.replace(/[^\d]/g, "");
  const sanitizedPhoneSecondary = agent.contact?.phoneSecondary?.replace(/[^\d]/g, "");
  const imageAlt =
    typeof agent.photo !== "number" && agent.photo?.alt
      ? agent.photo.alt
      : `${agent.name}${agent.title ? ` - ${agent.title}` : ""}`;

  const breadcrumbs = addBreadcrumbs([
    { name: "Agents", link: "/agents" },
    { name: agent.name, link: `/agents/${slug}` },
  ]);

  return (
    <main>
      <div className="container max-w-7xl">
        <article
          className="grid gap-4 py-4 sm:py-9 md:grid-cols-2 md:py-12"
          itemScope
          itemType="https://schema.org/Person"
        >
          <header className="flex flex-col items-center gap-4">
            {typeof agent.photo !== "number" && agent.photo && (
              <figure className="overflow-hidden rounded-xl">
                <ImageObject {...agent.photo} alt={imageAlt} />
              </figure>
            )}
            <nav aria-label="Social profiles" className="flex items-center gap-3">
              {agent.contact?.socials?.map((social) => {
                const Icon = getSocialIcons(social.platform);
                return (
                  <Button asChild key={social.id} size="icon" variant="outline">
                    <Link href={social.url as Route} rel="noopener noreferrer" target="_blank">
                      <Icon />
                    </Link>
                  </Button>
                );
              })}
            </nav>
            {/* Microdata */}
            <meta content={agent.name} itemProp="name" />
            {agent.title && <meta content={agent.title} itemProp="jobTitle" />}
            {agent.contact?.email && <meta content={agent.contact.email} itemProp="email" />}
            {sanitizedPhonePrimary && <meta content={sanitizedPhonePrimary} itemProp="telephone" />}
            {agent.contact?.socials?.length ? (
              <>
                {agent.contact.socials
                  .filter((s) => !!s.url)
                  .map((s) => (
                    <link href={s.url as string} itemProp="sameAs" key={s.id} />
                  ))}
              </>
            ) : null}
          </header>

          <div className="space-y-6 py-4">
            <div>
              <div className="flex items-end gap-2">
                <h1 className="font-serif text-4xl" itemProp="name">
                  {agent.name}
                </h1>
                {agent.contact?.licenseNumber && (
                  <p className="text-muted-foreground text-sm">{agent.contact?.licenseNumber}</p>
                )}
              </div>
              {agent.title && (
                <p className="text-muted-foreground" itemProp="jobTitle">
                  {agent.title}
                </p>
              )}
            </div>
            <div className="flex items-center gap-3">
              {sanitizedWhatsapp && (
                <Button asChild className="bg-emerald-200 text-emerald-800 hover:text-emerald-400" variant="secondary">
                  <Link href={`https://wa.me/${sanitizedWhatsapp}`} rel="noopener noreferrer" target="_blank">
                    <IconBrandWhatsapp />
                    Whatsapp
                  </Link>
                </Button>
              )}
              {agent.contact?.email && (
                <Button asChild variant="outline">
                  <Link href={`mailto:${agent.contact.email}`}>
                    <IconEmail />
                    {agent.contact.email}
                  </Link>
                </Button>
              )}
              {sanitizedPhonePrimary && (
                <Button asChild variant="outline">
                  <Link href={`tel:${sanitizedPhonePrimary}`}>
                    <IconPhone />
                    {agent.contact?.phonePrimary}
                  </Link>
                </Button>
              )}
            </div>

            <section aria-labelledby="contact-details">
              <h2 className="mb-3 text-muted-foreground text-sm" id="contact-details">
                Contact Details
              </h2>
              <ul className="space-y-4">
                {sanitizedPhonePrimary && (
                  <li>
                    <Link
                      className="flex items-center gap-3 transition-colors hover:text-brand-600"
                      href={`tel:${sanitizedPhonePrimary}`}
                    >
                      <IconPhone className="size-4" /> {agent.contact?.phonePrimary}
                    </Link>
                  </li>
                )}
                {sanitizedPhoneSecondary && (
                  <li>
                    <Link
                      className="flex items-center gap-3 transition-colors hover:text-brand-600"
                      href={`tel:${sanitizedPhoneSecondary}`}
                    >
                      <IconPhone className="size-4" /> {agent.contact?.phoneSecondary}
                    </Link>
                  </li>
                )}
                {sanitizedWhatsapp && (
                  <li>
                    <Link
                      className="flex items-center gap-3 transition-colors hover:text-brand-600"
                      href={`https://wa.me/${sanitizedWhatsapp}`}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      <IconBrandWhatsapp className="size-4" /> {agent.contact?.whatsAppNumber}
                    </Link>
                  </li>
                )}
                {agent.contact?.email && (
                  <li>
                    <Link
                      className="flex items-center gap-3 transition-colors hover:text-brand-600"
                      href={`mailto:${agent.contact.email}`}
                    >
                      <IconEmail className="size-4" /> {agent.contact?.email}
                    </Link>
                  </li>
                )}
              </ul>
            </section>

            <section aria-labelledby="agent-stats">
              <h2 className="sr-only" id="agent-stats">
                Agent stats
              </h2>
              <ul className="grid grid-cols-2 gap-6">
                {agent.professional?.experienceYears && (
                  <li>
                    <h3 className="text-muted-foreground text-sm">Experience</h3>
                    <p className="font-medium text-lg">
                      {agent.professional.experienceYears} {pluralize("year", agent.professional.experienceYears)} as{" "}
                      {agent.title}
                    </p>
                  </li>
                )}
                {agent.professional?.awards && (
                  <li>
                    <h3 className="text-muted-foreground text-sm">Awards</h3>
                    <p className="font-medium text-lg">{agent.professional.awards}</p>
                  </li>
                )}
                {/* {agent.professional?.mlsNumber && (
                  <li>
                    <h3 className="text-muted-foreground text-sm">MLS Number</h3>
                    <p className="font-medium text-lg">{agent.professional.mlsNumber}</p>
                  </li>
                )} */}
                {agent.professional?.languages && (
                  <li>
                    <h3 className="text-muted-foreground text-sm">Languages Spoken</h3>
                    <p className="font-medium text-lg">
                      {agent.professional.languages
                        .map((l) => l.language)
                        .filter(Boolean)
                        .join(", ")}
                    </p>
                  </li>
                )}
              </ul>
            </section>
          </div>
        </article>

        <div className="space-y-6">
          {agent.professional?.specialties && (
            <section aria-labelledby="specialties">
              <h4 className="text-muted-foreground text-sm" id="specialties">
                Specialties & Service Areas
              </h4>
              <ul className="mt-2 flex flex-wrap gap-3">
                {agent.professional?.specialties.map(
                  (s) =>
                    typeof s !== "number" &&
                    s.title && (
                      <li key={s.id}>
                        <Badge>{s.title}</Badge>
                      </li>
                    )
                )}
              </ul>
            </section>
          )}
          {agent.about && (
            <section aria-labelledby="about-agent">
              <h4 className="mb-2 text-muted-foreground text-sm" id="about-agent">
                About me
              </h4>
              <RichText data={agent.about} enableGutter={false} />
            </section>
          )}
        </div>
      </div>
      <Cta />

      {/* JSON-LD Schema */}
      <Schema
        schema={{
          "@context": "https://schema.org",
          "@type": "Person",
          name: agent.name,
          jobTitle: agent.title,
          url: `/agents/${slug}`,
          email: agent.contact?.email,
          telephone: sanitizedPhonePrimary || undefined,
          sameAs: agent.contact?.socials?.map((s) => s.url).filter(Boolean),
        }}
      />
      <Schema schema={breadcrumbs} />
    </main>
  );
}
