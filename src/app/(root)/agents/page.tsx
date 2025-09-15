import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

import { IconAgent } from "@/assets/icons/agent";

import { ImageObject } from "@/lib/payload/components/media";
import { getAgents } from "@/modules/agents/query";

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
            <h2 className="text-balance font-medium font-sans text-2xl md:text-4xl">
              Meet Our <span className="text-brand-600">Expert</span> Property Agents
            </h2>
            <p className="text-balance text-sm leading-relaxed">
              Our success is built on the expertise and dedication of our trusted real estate agents. Whether you’re
              buying, selling, or investing, our team is here to guide you every step of the way with local knowledge,
              market insights, and unmatched professionalism.
            </p>
          </div>
        </div>
      </header>
      <section className="grid grid-cols-3 gap-6">
        {agents.map((agent) => (
          <Card key={agent.id}>
            <CardContent className="group relative">
              <div className="relative aspect-4/3 overflow-hidden rounded-md">
                {typeof agent.photo !== "number" && agent.photo && (
                  <ImageObject
                    {...agent.photo}
                    className="object-cover object-top transition-transform ease-out group-hover:scale-105"
                    fill
                  />
                )}
              </div>

              <CardHeader className="flex-1">
                <CardTitle>
                  <h3 className="text-lg">{agent.name}</h3>
                </CardTitle>
                <CardDescription>
                  <p className="flex items-center gap-1.5">
                    <span className="leading-none [text-box-trim:trim-both]">{agent.title}</span>
                  </p>
                </CardDescription>
              </CardHeader>
            </CardContent>
          </Card>
        ))}
      </section>
    </main>
  );
}
