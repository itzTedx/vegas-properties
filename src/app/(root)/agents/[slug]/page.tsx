import { notFound } from "next/navigation";

import { ImageObject } from "@/lib/payload/components/media";
import { getAgentBySlug } from "@/modules/agents/query";
import { Cta } from "@/components/layout/cta";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { IconBrandWhatsapp, IconEmail, IconPhone } from "@/assets/icons";
import type { Route } from "next";
import { getSocialIcons } from "@/lib/functions/get-social-icons";
import { pluralize } from "@/lib/functions/pluralize";

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export default async function AgentPage({ params }: Props) {
  const { slug } = await params;
  const agent = await getAgentBySlug(slug);
  if (!agent) return notFound();

  return (
    <main className="container max-w-7xl">
      <div className="py-12 grid grid-cols-2 gap-4">
        <div className="flex flex-col items-center gap-4">
          {typeof agent.photo !== "number" && agent.photo && (
            <div className="rounded-xl overflow-hidden">
              <ImageObject {...agent.photo} />
            </div>
          )}
          <div className="flex items-center gap-3">
            {agent.contact?.socials?.map((social) => {
              const Icon = getSocialIcons(social.platform);
              return (
                <Button size="icon" variant="outline" asChild key={social.id}>
                  <Link href={social.url as Route}>
                    <Icon />
                  </Link>
                </Button>
              );
            })}
          </div>
        </div>
        <div className="py-4 space-y-6">
          <div>
            <div className="flex items-end gap-2">
              <h1 className="font-serif text-4xl">{agent.name}</h1>
              {agent.contact?.licenseNumber && (
                <p className="text-muted-foreground text-sm">{agent.contact?.licenseNumber}</p>
              )}
            </div>
            <p className="text-muted-foreground">{agent.title}</p>
          </div>
          <div className="flex items-center gap-3">
            {agent.contact?.whatsAppNumber && (
              <Button asChild className="hover:text-emerald-400 bg-emerald-200 text-emerald-800" variant="secondary">
                <Link href="/">
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
            {agent.contact?.phonePrimary && (
              <Button asChild variant="outline">
                <Link href={`tel:${agent.contact.phonePrimary}`}>
                  <IconPhone />
                  {agent.contact.phonePrimary}
                </Link>
              </Button>
            )}
          </div>
          <div>
            <h2 className="text-sm text-muted-foreground mb-3">Contact Details</h2>
            <ul className="space-y-4">
              {agent.contact?.phonePrimary && (
                <li>
                  <Link
                    className="flex items-center gap-3 hover:text-brand-600 transition-colors"
                    href={`tel:${agent.contact.phonePrimary}`}
                  >
                    <IconPhone className="size-4" /> {agent.contact.phonePrimary}
                  </Link>
                </li>
              )}
              {agent.contact?.phoneSecondary && (
                <li>
                  <Link
                    className="flex items-center gap-3 hover:text-brand-600 transition-colors"
                    href={`tel:${agent.contact.phoneSecondary}`}
                  >
                    <IconPhone className="size-4" /> {agent.contact.phoneSecondary}
                  </Link>
                </li>
              )}
              {agent.contact?.whatsAppNumber && (
                <li>
                  <Link
                    className="flex items-center gap-3 hover:text-brand-600 transition-colors"
                    href={`tel:${agent.contact.whatsAppNumber}`}
                  >
                    <IconBrandWhatsapp className="size-4" /> {agent.contact.whatsAppNumber}
                  </Link>
                </li>
              )}
              {agent.contact?.email && (
                <li>
                  <Link
                    className="flex items-center gap-3 hover:text-brand-600 transition-colors"
                    href={`tel:${agent.contact.email}`}
                  >
                    <IconEmail className="size-4" /> {agent.contact.email}
                  </Link>
                </li>
              )}
            </ul>
          </div>
          <ul className="gird grid-cols-2 gap-6">
            {agent.professional?.experienceYears && (
              <li>
                <h3 className="text-sm text-muted-foreground">Experience</h3>
                <p className="text-lg font-medium">{agent.professional.experienceYears} {pluralize('year', agent.professional.experienceYears)} as {agent.title}</p>
              </li>
            )}
            {agent.professional?.experienceYears && (
              <li>
                <h3 className="text-sm text-muted-foreground">Experience</h3>
                <p className="text-lg font-medium">{agent.professional.experienceYears} {pluralize('year', agent.professional.experienceYears)} as {agent.title}</p>
              </li>
            )}
          </ul>
        </div>
      </div>

      <Cta />
    </main>
  );
}
