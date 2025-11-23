"use client";

import React, { useState, useEffect, useCallback } from "react";
import clsx from "clsx";
import dynamic from "next/dynamic";
import mapboxgl from "mapbox-gl";
import { fetchAttractions } from "@/lib/fetchAttractions";
import { Attraction } from "@/types/attractions";
import TrailCard from "@/components/TrailCard";

// Dynamic imports for maps
const DynamicMap = dynamic(() => import("@/components/Map"), { ssr: false });
const MiniMap = dynamic(() => import("@/components/MiniMap"), { ssr: false });

// Extract coordinates in multiple formats
function extractCoords(a: any): [number, number] {
  if (typeof a.lat === "number" && typeof a.lng === "number") return [a.lng, a.lat];
  if (Array.isArray(a.coordinates)) return a.coordinates as [number, number];
  if (a.geometry?.coordinates) return a.geometry.coordinates as [number, number];
  throw new Error("Invalid coordinates");
}

export default function CareerTrailPage() {
  const [roles, setRoles] = useState<Attraction[]>([]);
  const [filtered, setFiltered] = useState<Attraction[]>([]);
  const [search, setSearch] = useState("");
  const [map, setMap] = useState<any | null>(null);

  // Attach map instance
  const mapRef = useCallback((instance: any) => {
    setMap(instance);
  }, []);

  // Load roles
  useEffect(() => {
    async function load() {
      const data = await fetchAttractions();
      setRoles(data);
      setFiltered(data);
    }
    load();
  }, []);

  // Search filter
  useEffect(() => {
    const q = search.toLowerCase();
    setFiltered(
      roles.filter(
        (r) =>
          r.title?.toLowerCase().includes(q) ||
          r.company?.toLowerCase().includes(q) ||
          r.theme?.name?.toLowerCase().includes(q)
      )
    );
  }, [search, roles]);

  // Auto-fit map to filtered roles
  useEffect(() => {
    if (!map || filtered.length === 0) return;

    const bounds = new mapboxgl.LngLatBounds();

    filtered.forEach((a) => {
      try {
        const coords = extractCoords(a);
        bounds.extend(coords);
      } catch {}
    });

    if (!bounds.isEmpty()) {
      map.fitBounds(bounds, { padding: 60, maxZoom: 12 });
    }
  }, [map, filtered]);

  // Fly-to
  const focusRole = (a: Attraction) => {
    if (!map) return;

    try {
      const coords = extractCoords(a);

      // Glow pulse by adjusting pitch & zoom temporarily
      map.easeTo({
        center: coords,
        zoom: 4.2,
        pitch: 55,
        duration: 1200
      });

      // Flash the clicked marker
      const flash = document.querySelector(`[data-marker-id="${a.id}"]`) as HTMLElement;
      if (flash) {
        flash.animate(
          [
            { transform: "scale(1)", boxShadow: "0 0 12px #fff" },
            { transform: "scale(1.4)", boxShadow: "0 0 25px #fff" },
            { transform: "scale(1)", boxShadow: "0 0 12px #fff" }
          ],
          { duration: 900, easing: "ease-out" }
        );
      }
    } catch {}
  };

  return (
    <div className="flex h-screen w-full flex-col bg-gray-100">
      {/* Top search bar */}
      <div className="border-b bg-white p-4 shadow-sm z-20 relative">
        <div className="mx-auto max-w-5xl flex items-center gap-4 px-2">
          <input
            type="text"
            placeholder="Search roles, companies, lands..."
            className="w-full rounded-xl border px-4 py-2 shadow-sm"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden w-full">
        {/* Left Career Trail */}
        <div className="w-[400px] overflow-y-auto border-r bg-gray-50 p-4 space-y-4 shadow-inner">
          {filtered.map((role) => (
            <div key={role.id} className="px-1 hover:bg-white hover:shadow-lg hover:z-10 rounded-xl transition-all">
              <TrailCard
                id={role.id}
                title={role.title}
                company={role.company ?? ""}
                years={role.years ?? ""}
                location={role.location}
                summary={role.summary}
                zoneId={role.zoneId}
                onClick={() => focusRole(role)}
              />
            </div>
          ))}
        </div>

        {/* Right Map */}
        <div className="relative flex-1 min-w-0">
          <div className="absolute inset-0">
            <DynamicMap attractions={filtered} />
          </div>

          {/* Floating MiniMap */}
          <div className="absolute bottom-5 right-5 h-40 w-40 rounded-xl overflow-hidden border bg-white shadow-xl">
            <MiniMap attractions={filtered} />
          </div>
        </div>
      </div>
    </div>
  );
}
