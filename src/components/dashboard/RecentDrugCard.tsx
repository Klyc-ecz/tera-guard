
import React from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Clock, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface RecentDrugCardProps {
  id: string;
  name: string;
  description: string;
  category: "safe" | "caution" | "danger";
  lastUpdated: string;
  isFavorite?: boolean;
  onToggleFavorite?: () => void;
}

const RecentDrugCard: React.FC<RecentDrugCardProps> = ({
  id,
  name,
  description,
  category,
  lastUpdated,
  isFavorite = false,
  onToggleFavorite,
}) => {
  const categoryClasses = {
    safe: "risk-tag risk-safe",
    caution: "risk-tag risk-caution",
    danger: "risk-tag risk-danger",
  };

  const categoryLabels = {
    safe: "Safe",
    caution: "Caution",
    danger: "Risky",
  };

  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <Link to={`/drug-info/${id}`}>
            <h3 className="font-semibold text-lg hover:text-primary transition-colors">
              {name}
            </h3>
          </Link>
          <span className={categoryClasses[category]}>{categoryLabels[category]}</span>
        </div>
        <p className="text-muted-foreground text-sm line-clamp-2">{description}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex items-center justify-between">
        <div className="flex items-center text-xs text-muted-foreground">
          <Clock className="h-3 w-3 mr-1" />
          <span>{lastUpdated}</span>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={onToggleFavorite}
        >
          <Star
            className={cn(
              "h-4 w-4",
              isFavorite ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"
            )}
          />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default RecentDrugCard;
