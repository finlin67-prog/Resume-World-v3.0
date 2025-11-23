import React from "react";
import { MapPin, Star } from "lucide-react";

interface AttractionCardProps {
  title: string;
  image: string;
  location: string;
  rating?: number;
  onClick?: () => void;
}

export default function AttractionCard({ title, image, location, rating, onClick }: AttractionCardProps) {
  return (
    <div onClick={onClick} className="cursor-pointer overflow-hidden rounded-2xl shadow-md transition-transform hover:scale-[1.02] bg-white">
      <div className="relative h-48 w-full overflow-hidden">
        <img src={image} alt={title} className="h-full w-full object-cover" />
        {rating && (
          <div className="absolute top-2 right-2 flex items-center gap-1 rounded-full bg-white/90 px-2 py-1 text-sm font-medium shadow">
            <Star className="h-4 w-4 fill-current text-yellow-500" />
            {rating.toFixed(1)}
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="mb-1 text-lg font-semibold">{title}</h3>
        <div className="flex items-center text-sm text-gray-600">
          <MapPin className="mr-1 h-4 w-4" />
          {location}
        </div>
      </div>
    </div>
  );
}
