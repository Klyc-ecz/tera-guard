
import React from "react";
import { Star, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";

export interface FavoriteItem {
  id: string;
  name: string;
  category: "safe" | "caution" | "danger"; // Updated to include "danger"
}

interface FavoritesListProps {
  favorites: FavoriteItem[];
  onRemoveFavorite: (id: string) => void;
}

const FavoritesList = ({ favorites, onRemoveFavorite }: FavoritesListProps) => {
  if (favorites.length === 0) {
    return (
      <Card className="bg-muted/40">
        <CardContent className="p-6 flex flex-col items-center justify-center text-center space-y-2">
          <Star className="h-10 w-10 text-muted-foreground/40" />
          <h3 className="font-medium text-lg">Favori İlaç Yok</h3>
          <p className="text-sm text-muted-foreground">
            Sık kullandığınız ilaçları favorilere ekleyerek burada görebilirsiniz.
          </p>
        </CardContent>
      </Card>
    );
  }

  const categoryClasses = {
    safe: "text-green-600",
    caution: "text-yellow-600",
    danger: "text-red-600",
  };

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Favori İlaçlarım</h2>
      <Card>
        <CardContent className="p-4">
          <ul className="space-y-2">
            {favorites.map((item) => (
              <li
                key={item.id}
                className="flex items-center justify-between group py-2 px-3 rounded-md hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <Star
                    className={cn(
                      "h-4 w-4 fill-current",
                      categoryClasses[item.category]
                    )}
                  />
                  <span>{item.name}</span>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => onRemoveFavorite(item.id)}
                >
                  <X className="h-3 w-3" />
                  <span className="sr-only">Remove</span>
                </Button>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default FavoritesList;
