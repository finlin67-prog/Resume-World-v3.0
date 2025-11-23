"use client";

import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || "";

interface MapProps {
  attractions: any[];
  small?: boolean;
  onMapReady?: (map: mapboxgl.Map) => void;
}

// Extract coords
function extractCoords(a: any): [number, number] {
  return a.geometry?.coordinates || a.coordinates;
}

export default function Map({ attractions, small, onMapReady }: MapProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (!mapContainer.current) return;

    const map = new mapboxgl.Map({
      container: mapContainer.current,

      style: "mapbox://styles/mapbox/light-v11",

      // 🔥 Fictional world grid 0–100
      projection: "mercator",
      maxBounds: [
        [0, 0],
        [100, 100]
      ],

      center: [50, 50],
      zoom: small ? 2.3 : 3.2,
      pitch: small ? 0 : 45,
      bearing: 0,
      antialias: true
    });

    mapRef.current = map;

    map.on("load", () => {
      map.addSource("career-world", {
        type: "geojson",
        data: "/data/career-world.geojson"
      });

      map.addLayer({
        id: "island-fill",
        type: "fill",
        source: "career-world",
        filter: ["==", ["get", "kind"], "world"],
        paint: {
          "fill-color": "#fef3c7",
          "fill-opacity": 0.9
        }
      });

      map.addLayer({
        id: "island-outline",
        type: "line",
        source: "career-world",
        filter: ["==", ["get", "kind"], "world"],
        paint: {
          "line-color": "#facc15",
          "line-width": 3
        }
      });

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
          id: `zone-fill-${zoneId}`,
          type: "fill",
          source: "career-world",
          filter: ["==", ["get", "zoneId"], zoneId],
          paint: {
            "fill-color": ZONES[zoneId],
            "fill-opacity": 0.25
          }
        });

        map.addLayer({
          id: `zone-outline-${zoneId}`,
          type: "line",
          source: "career-world",
          filter: ["==", ["get", "zoneId"], zoneId],
          paint: {
            "line-color": ZONES[zoneId],
            "line-width": 2
          }
        });
      }

      attractions.forEach((a) => {
        try {
          const coords = extractCoords(a);

          const el = document.createElement("div");
          el.style.width = "22px";
          el.style.height = "22px";
          el.style.borderRadius = "50%";
          el.style.background = "#ec4899";
          el.style.border = "3px solid white";
          el.style.boxShadow = "0 0 12px #ec4899AA, 0 0 25px #ec489966";

          new mapboxgl.Marker({ element: el })
            .setLngLat(coords)
            .addTo(map);
        } catch {}
      });

      if (onMapReady) onMapReady(map);
    });

    return () => map.remove();
  }, [attractions, small]);

  return (
    <div
      ref={mapContainer}
      className={small ? "h-full w-full" : "h-full w-full rounded-xl"}
    />
  );
}
