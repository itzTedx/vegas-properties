import { getPropertyBySlug } from "@/modules/properties/actions/query";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function PropertyPage({ params }: Props) {
  const { slug } = await params;
  const { title, description } = await getPropertyBySlug(slug);

  return (
    <main className="container py-6">
      <h1 className="font-serif text-2xl">{title}</h1>
      <p>{description}</p>
    </main>
  );
}
