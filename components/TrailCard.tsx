"use client";

import React from "react";

// LAND COLORS + ICONS
export const LAND_THEMES: Record<string, { name: string; color: string; icon: string }> = {
  "martech-mountain": {
    name: "MarTech Mountain Pass",
    color: "#0d9488",
    icon: "⛰"
  },
  "revops-forge": {
    name: "The RevOps Ironworks",
    color: "#475569",
    icon: "⚒️"
  },
  "abm-kingdom": {
    name: "The Royal ABM Kingdom",
    color: "#7c3aed",
    icon: "👑"
  },
  "demand-gen-fields": {
    name: "The DemandGen Prairie",
    color: "#16a34a",
    icon: "🌾"
  },
  "onboarding-forest": {
    name: "Onboarding Forest",
    color: "#0ea5e9",
    icon: "🌲"
  },
  "gtmstack-citadel": {
    name: "GTMstack Citadel",
    color: "#eab308",
    icon: "🏰"
  }
};

interface TrailCardProps {
  id: string | number;
  title: string;
  company: string;
  years: string;
  location?: string;
  summary?: string;
  zoneId: string;
  onClick?: () => void;
}

export default function TrailCard({
  id,
  title,
  company,
  years,
  location,
  summary,
  zoneId,
  onClick
}: TrailCardProps) {
  const theme =
    LAND_THEMES[zoneId] ??
    {
      name: "Unknown Land",
      color: "#64748b",
      icon: "⭐"
    };

  return (
    <div
      onClick={onClick}
      className="group cursor-pointer rounded-2xl px-4 py-3 mb-4 bg-white dark:bg-[#121212] border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-xl transition-all duration-300 hover:scale-[1.015] relative overflow-hidden"
      style={{
        boxShadow: `0 3px 10px ${theme.color}22, 0 0 25px ${theme.color}15`
      }}
    >
      {/* Ripple animation on click */}
      <span className="pointer-events-none absolute inset-0 opacity-0 group-active:opacity-20 transition bg-white" />

      {/* Header row */}
      <div className="flex items-center gap-2">
        <span className="text-2xl">{theme.icon}</span>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 leading-tight">
          {title}
        </h3>
      </div>

      {/* Company + Years */}
      <p className="text-sm font-medium text-gray-600 dark:text-gray-300 mt-1">{company}</p>
      <p className="text-sm text-gray-500 dark:text-gray-400">{years}</p>

      {/* Location */}
      {location && (
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">📍 {location}</p>
      )}

      {/* Summary */}
      {summary && (
        <p className="mt-2 text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
          {summary}
        </p>
      )}

      {/* Land theme badge */}
      <div
        className="mt-3 inline-block px-3 py-1 text-xs font-medium rounded-md text-white shadow-sm"
        style={{
          backgroundColor: theme.color,
          boxShadow: `0 0 10px ${theme.color}66`
        }}
      >
        {theme.name}
      </div>
    </div>
  );
}
