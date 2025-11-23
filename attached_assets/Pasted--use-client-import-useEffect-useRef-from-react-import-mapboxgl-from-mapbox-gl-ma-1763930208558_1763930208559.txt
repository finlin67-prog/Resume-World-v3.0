"use client";

import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || "";

interface MiniMapProps {
  attractions: any[];
}

export default function MiniMap({ attractions }: MiniMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const map = new mapboxgl.Map({
      container: containerRef.current,
      style: "mapbox://styles/mapbox/light-v11",
      center: [50, 50],
      zoom: 2.5,
      pitch: 0,
      bearing: 0,
      interactive: false,
      attributionControl: false
    });

    mapRef.current = map;

    map.on("load", () => {
      /* ------------------------------------
         Load Career Island + Zones
      ------------------------------------ */
      map.addSource("career-world", {
        type: "geojson",
        data: "/data/career-world.geojson"
      });

      // Island — sand color
      map.addLayer({
        id: "mini-island-base",
        type: "fill",
        source: "career-world",
        filter: ["==", ["get", "kind"], "world"],
        paint: {
          "fill-color": "#fef3c7",
          "fill-opacity": 0.85
        }
      });

      map.addLayer({
        id: "mini-island-outline",
        type: "line",
        source: "career-world",
        filter: ["==", ["get", "kind"], "world"],
        paint: {
          "line-color": "#facc15",
          "line-width": 2
        }
      });

      // Zone colors
      const ZONES: Record<string, string> = {
        "onboarding-forest": "#0ea5e9",
        "martech-mountain": "#0d9488",
        "demand-gen-fields": "#16a34a",
        "revops-forge": "#475569",
        "abm-kingdom": "#7c3aed",
        "gtmstack-citadel": "#eab308"
      };

      for (const zoneId in ZONES) {
        map.addLayer({
          id: `mini-zone-${zoneId}`,
          type: "fill",
          source: "career-world",
          filter: ["==", ["get", "zoneId"], zoneId],
          paint: {
            "fill-color": ZONES[zoneId],
            "fill-opacity": 0.22
          }
        });

        map.addLayer({
          id: `mini-zone-${zoneId}-outline`,
          type: "line",
          source: "career-world",
          filter: ["==", ["get", "zoneId"], zoneId],
          paint: {
            "line-color": ZONES[zoneId],
            "line-width": 1
          }
        });
      }

      /* ------------------------------------
         Attraction Mini-Markers (tiny dots)
      ------------------------------------ */
      attractions.forEach((a) => {
        try {
          const coords = a.geometry?.coordinates || a.coordinates;

          const marker = document.createElement("div");
          marker.style.width = "8px";
          marker.style.height = "8px";
          marker.style.borderRadius = "50%";
          marker.style.background = "#ec4899";

          new mapboxgl.Marker({ element: marker })
            .setLngLat(coords)
            .addTo(map);
        } catch {}
      });

      // Mini-map viewport box (later)
    });

    return () => map.remove();
  }, [attractions]);

  return (
    <div
      ref={containerRef}
      className="h-full w-full rounded-xl overflow-hidden border border-gray-300 shadow-md"
    />
  );
}
