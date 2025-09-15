import { notFound } from "next/navigation";

import { getAgentBySlug } from "@/modules/agents/query";

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export default async function AgentPage({ params }: Props) {
  const { slug } = await params;
  const agent = await getAgentBySlug(slug);
  console.log("agents", agent);

  if (!agent) return notFound();

  return <main>{JSON.stringify(agent, null, 2)}</main>;
}
