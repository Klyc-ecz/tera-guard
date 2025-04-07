
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface FavoriteItem {
  id: string;
  name: string;
  category: "safe" | "caution" | "danger";
}

interface FavoritesListProps {
  favorites: FavoriteItem[];
  onRemoveFavorite: (id: string) => void;
}

const FavoritesList: React.FC<FavoritesListProps> = ({
  favorites,
  onRemoveFavorite,
}) => {
  const getCategoryBadge = (category: "safe" | "caution" | "danger") => {
    switch (category) {
      case "safe":
        return <span className="w-2 h-2 rounded-full bg-safe inline-block mr-2"></span>;
      case "caution":
        return <span className="w-2 h-2 rounded-full bg-caution inline-block mr-2"></span>;
      case "danger":
        return <span className="w-2 h-2 rounded-full bg-danger inline-block mr-2"></span>;
    }
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          <Star className="h-5 w-5 text-yellow-400" />
          Sık Kullanılanlar
        </CardTitle>
      </CardHeader>
      <CardContent>
        {favorites.length > 0 ? (
          <ul className="space-y-2">
            {favorites.map((item) => (
              <li key={item.id} className="flex items-center justify-between">
                <Link
                  to={`/drug-info/${item.id}`}
                  className="flex items-center hover:text-primary transition-colors"
                >
                  {getCategoryBadge(item.category)}
                  <span>{item.name}</span>
                </Link>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => onRemoveFavorite(item.id)}
                >
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                </Button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-muted-foreground text-sm py-4 text-center">
            Henüz kaydedilen öğe bulunmuyor.
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default FavoritesList;
