
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface FavoriteItem {
  id: string;
  name: string;
  category: "safe" | "caution" | "danger";
}

interface FavoritesListProps {
  favorites: FavoriteItem[];
  onRemoveFavorite: (id: string) => void;
}

const FavoritesList: React.FC<FavoritesListProps> = ({ favorites, onRemoveFavorite }) => {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Favorilerin</CardTitle>
      </CardHeader>
      <CardContent className="px-6">
        {favorites.length > 0 ? (
          <ul className="space-y-2">
            {favorites.map((item) => (
              <li key={item.id} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div
                    className={`w-3 h-3 rounded-full ${
                      item.category === "safe"
                        ? "bg-green-500"
                        : item.category === "caution"
                        ? "bg-yellow-500"
                        : "bg-red-500"
                    }`}
                  />
                  <span>{item.name}</span>
                </div>
                <Button
                  onClick={() => onRemoveFavorite(item.id)}
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0"
                >
                  <X className="h-4 w-4" />
                  <span className="sr-only">Remove</span>
                </Button>
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-center py-4">
            <p className="text-sm text-muted-foreground">Henüz favori eklenmedi</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default FavoritesList;
