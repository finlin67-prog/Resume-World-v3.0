export interface Attraction {
  id: string | number;
  name: string;
  location?: string;
  image?: string;
  rating?: number;
  category?: string;

  // Coordinates can be in ANY supported format
  lat?: number;
  lng?: number;
  coordinates?: [number, number];
  geometry?: { coordinates: [number, number] };

  // Optional details
  description?: string;
}

export interface FilterState {
  query: string;
  minRating: number;
  category: string;
}

// For Map.tsx ref typing
export type MapInstance = any;
