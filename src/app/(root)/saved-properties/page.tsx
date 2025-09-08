"use client";

import { useEffect, useState } from "react";

type Media = {
  id: number;
  url?: string | null;
};

type Property = {
  id: number;
  title?: string;
  image?: Media | number;
};

export default function SavedProperties() {
  const [favorites, setFavorites] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      try {
        await fetch("/api/guest-session", { cache: "no-store" });
        const res = await fetch("/api/favorites", { cache: "no-store" });
        const data = await res.json();
        const favs = (data?.favorites ?? []) as Property[];
        setFavorites(favs);
      } finally {
        setLoading(false);
      }
    };
    void init();
  }, []);

  const toggleFavorite = async (propertyId: number) => {
    const res = await fetch("/api/favorites", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ propertyId }),
    });
    const data = await res.json();
    const ids = new Set<number>((data?.favorites ?? []) as number[]);
    setFavorites((prev) => prev.filter((p) => ids.has(p.id)));
  };

  if (loading) return <div>Loading saved properties…</div>;

  if (!favorites.length) return <div>No saved properties yet.</div>;

  return (
    <div style={{ display: "grid", gap: 16 }}>
      {favorites.map((p) => (
        <div key={p.id} style={{ border: "1px solid #eee", padding: 12, borderRadius: 8 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            {typeof p.image === "object" && p.image?.url ? (
              <img
                alt={p.title ?? "Property"}
                height={64}
                src={p.image.url}
                style={{ objectFit: "cover", borderRadius: 6 }}
                width={96}
              />
            ) : null}
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 600 }}>{p.title ?? `Property #${p.id}`}</div>
            </div>
            <button aria-label="Remove from saved" onClick={() => toggleFavorite(p.id)}>
              Remove
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
