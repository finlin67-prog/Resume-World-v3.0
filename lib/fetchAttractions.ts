import { Attraction } from "@/types/attractions";
import { LAND_THEMES } from "@/components/TrailCard";

export async function fetchAttractions(): Promise<Attraction[]> {
  try {
    const res = await fetch("/data/roles.json");
    if (!res.ok) throw new Error("Failed to fetch roles.json");

    const raw = await res.json();

    // Newest → Oldest (based on endYear)
    raw.sort((a: any, b: any) => (b.endYear ?? 0) - (a.endYear ?? 0));

    return raw.map((item: any, index: number) => {
      const zoneId = item.zoneIds?.[0] ?? "unknown";
      const theme = LAND_THEMES[zoneId] ?? {
        name: "Unknown Land",
        color: "#94a3b8",
        icon: "⭐",
      };

      return {
        id: item.id ?? index,
        title: item.title,
        company: item.company ?? "",
        years: `${item.startYear ?? ""} – ${item.endYear ?? ""}`,
        location: item.location ?? "",
        summary: item.summary ?? "",
        zoneId,
        theme,

        // Coordinates added manually to roles.json (Option B)
        lat: item.lat,
        lng: item.lng,
      } as Attraction;
    });
  } catch (err) {
    console.error("fetchAttractions error:", err);
    return [];
  }
}
