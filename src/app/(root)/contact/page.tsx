import { Cta } from "@/components/layout/cta";

import { ContactForm } from "./form";
import { SectionHeader } from "./section-header";

type SearchParams = Promise<{ message: string | undefined }>;
interface Props {
  searchParams: SearchParams;
}

export default async function ContactPage({ searchParams }: Props) {
  const query = await searchParams;

  return (
    <main className="pt-4 sm:pt-9 md:pt-12">
      <section className="container relative pb-9 sm:pb-14">
        <SectionHeader
          as="h1"
          hasHighlight
          highlightText="Conversation"
          subtitle=" Have questions about our properties or services? We're here to
          help. Fill out the form below and our team will get back to you
          shortly."
          title={`Let's Start\na Conversation`}
        />
        <div className="mt-12 grid grid-cols-3 gap-6">
          <ContactForm initialMessage={query?.message} />
          <aside>
            <h2 className="font-jaguar text-3xl">Other Ways to Reach Us</h2>
            <div className="mt-4 grid grid-cols-1 gap-6">
              {[
                {
                  title: "Office Location",
                  content: "Dubai, United Arab Emirates",
                },
                {
                  title: "Email",
                  content: "info@vegasproperties.com",
                },
                {
                  title: "Phone",
                  content: "+971 4 123 4567",
                },
              ].map((info) => (
                <div
                  className="group rounded-lg border p-6 transition-colors duration-300 hover:border-primary/50"
                  key={info.title}
                >
                  <h3 className="mb-2 font-medium text-xl">{info.title}</h3>
                  <p className="text-muted-foreground">{info.content}</p>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </section>
      <Cta />
    </main>
  );
}
