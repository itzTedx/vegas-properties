"use client";

import { useEffect, useState } from "react";

import { ensureGuestSession, getBookmarkedProperties } from "@/actions/bookmarks";
import { PropertyCard } from "@/modules/properties/component";
import type { Property } from "@/payload-types";

export default function SavedProperties() {
  const [favorites, setFavorites] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      try {
        await ensureGuestSession();
        const favs = await getBookmarkedProperties();
        setFavorites(favs as Property[]);
      } finally {
        setLoading(false);
      }
    };
    void init();
  }, []);

  // const onToggle = async (propertyId: number) => {
  //   const ids = await toggleBookmark(propertyId);
  //   setFavorites((prev) => prev.filter((p) => ids.includes(p.id)));
  // };

  if (loading) return <div className="py-12 text-center font-bold text-2xl">Loading saved properties…</div>;

  if (!favorites.length) return <div className="py-12 text-center font-bold text-2xl">No saved properties yet.</div>;

  return (
    <div style={{ display: "grid", gap: 16 }}>
      {favorites.map((p) => (
        <PropertyCard key={p.id} property={p} />
      ))}
    </div>
  );
}
