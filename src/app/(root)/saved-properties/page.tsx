import type { Metadata } from "next";

import { Cta } from "@/components/layout/cta";
import { Badge } from "@/components/ui/badge";

import { IconBookmark } from "@/assets/icons";

import { ensureGuestSession, getBookmarkedPropertiesBySession } from "@/actions/bookmarks";
import { PropertyCard } from "@/modules/properties/component";

export const metadata: Metadata = {
  title: "Saved Properties | Vegas Properties",
  description:
    "View and manage the real estate listings you've saved on Vegas Properties. Revisit your favorites, compare options, and keep track of homes that match your needs.",
  robots: { index: false, follow: false },
  openGraph: {
    title: "Saved Properties",
    description: "View and manage the real estate listings you've saved on Vegas Properties.",
  },
};

export default async function SavedProperties() {
  await ensureGuestSession();
  const favorites = await getBookmarkedPropertiesBySession();

  if (!favorites.length)
    return (
      <main className="container space-y-20 pt-6">
        <div className="space-y-4">
          <header className="space-y-4">
            <Badge>
              <IconBookmark aria-hidden="true" />
              Saved
            </Badge>
            <div className="grid gap-3 md:grid-cols-2">
              <h1
                className="text-balance text-center font-serif text-2xl md:text-left md:text-4xl"
                id="bookmarked-heading"
              >
                Bookmarked Properties
              </h1>
              <p className="text-balance text-center leading-relaxed md:text-left">
                View and manage the properties you've saved. Revisit your favorites, compare options, and keep track of
                homes that match your needs.
              </p>
            </div>
          </header>
          <section aria-labelledby="bookmarked-heading" className="mt-6">
            <p className="py-12 text-center font-bold text-2xl">No saved properties yet.</p>
          </section>
        </div>
      </main>
    );

  return (
    <main className="container space-y-20 pt-6 pb-12">
      <div className="space-y-4">
        <header className="space-y-4">
          <Badge>
            <IconBookmark aria-hidden="true" />
            Saved
          </Badge>
          <div className="grid gap-3 md:grid-cols-2">
            <h1
              className="text-balance text-center font-serif text-2xl md:text-left md:text-4xl"
              id="bookmarked-heading"
            >
              Bookmarked Properties
            </h1>
            <p className="text-balance text-center leading-relaxed md:text-left">
              View and manage the properties you've saved. Revisit your favorites, compare options, and keep track of
              homes that match your needs.
            </p>
          </div>
        </header>
        <section aria-labelledby="bookmarked-heading" className="mt-6">
          <ul
            className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 md:grid-cols-3 md:gap-6 lg:grid-cols-4"
            role="list"
          >
            {favorites.map((p) => (
              <li key={p.id}>
                <PropertyCard property={p} />
              </li>
            ))}
          </ul>
        </section>
      </div>
      <Cta />
    </main>
  );
}
