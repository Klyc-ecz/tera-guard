
import React from "react";
import { Star, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface DrugHeaderProps {
  name: string;
  scientificName: string;
  category: "safe" | "caution" | "danger";
  isFavorite: boolean;
  onToggleFavorite: () => void;
  onShare: () => void;
}

const DrugHeader: React.FC<DrugHeaderProps> = ({
  name,
  scientificName,
  category,
  isFavorite,
  onToggleFavorite,
  onShare,
}) => {
  const categoryClasses = {
    safe: "bg-green-100 text-green-800 border-green-200",
    caution: "bg-yellow-100 text-yellow-800 border-yellow-200",
    danger: "bg-red-100 text-red-800 border-red-200",
  };

  const categoryLabels = {
    safe: "Safe",
    caution: "Caution",
    danger: "Risky",
  };

  return (
    <div className="flex flex-col gap-4 mb-6 md:flex-row md:items-center md:justify-between">
      <div className="space-y-1">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold">{name}</h1>
          <span
            className={cn(
              "px-3 py-1 text-xs font-semibold rounded-full border",
              categoryClasses[category]
            )}
          >
            {categoryLabels[category]}
          </span>
        </div>
        <p className="text-muted-foreground">{scientificName}</p>
      </div>
      
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          className="gap-2"
          onClick={onToggleFavorite}
        >
          <Star
            className={cn(
              "h-4 w-4",
              isFavorite ? "fill-yellow-400 text-yellow-400" : ""
            )}
          />
          {isFavorite ? "Saved" : "Save"}
        </Button>
        <Button variant="outline" size="sm" className="gap-2" onClick={onShare}>
          <Share2 className="h-4 w-4" />
          Share
        </Button>
      </div>
    </div>
  );
};

export default DrugHeader;
