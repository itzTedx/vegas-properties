import { Badge } from "@/components/ui/badge";

import { IconBookmark } from "@/assets/icons";

import { ensureGuestSession, getBookmarkedPropertiesBySession } from "@/actions/bookmarks";
import { PropertyCard } from "@/modules/properties/component";

export default async function SavedProperties() {
  await ensureGuestSession();
  const favorites = await getBookmarkedPropertiesBySession();

  if (!favorites.length) return <div className="py-12 text-center font-bold text-2xl">No saved properties yet.</div>;

  return (
    <main className="container space-y-20 pt-6 pb-12">
      <div className="space-y-4">
        <header className="space-y-4">
          <Badge>
            <IconBookmark />
            Saved
          </Badge>
          <div className="grid gap-3 md:grid-cols-2">
            <h2 className="text-balance text-center font-serif text-2xl md:text-left md:text-4xl">
              Bookmarked Properties
            </h2>
            <p className="text-balance text-center leading-relaxed md:text-left">
              View and manage the properties you've saved. Revisit your favorites, compare options, and keep track of
              homes that match your needs.
            </p>
          </div>
        </header>
        <article className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 md:grid-cols-3 md:gap-6 lg:grid-cols-4">
          {favorites.map((p) => (
            <PropertyCard key={p.id} property={p} />
          ))}
        </article>
      </div>
    </main>
  );
}
