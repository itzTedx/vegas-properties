import { notFound } from "next/navigation";

import { ImageObject } from "@/lib/payload/components/media";
import { getAgentBySlug } from "@/modules/agents/query";

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
      <div className="py-12">
        <div>
          <h1 className="font-serif text-4xl">{agent.name}</h1>
          <p>{agent.title}</p>
        </div>
        {typeof agent.photo !== "number" && agent.photo && (
          <div>
            <ImageObject {...agent.photo} />
          </div>
        )}
      </div>
    </main>
  );
}
