
import React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type RiskCategory = "all" | "safe" | "caution" | "danger";

interface RiskCategoryFilterProps {
  selectedCategory: RiskCategory;
  onSelectCategory: (category: RiskCategory) => void;
}

const RiskCategoryFilter: React.FC<RiskCategoryFilterProps> = ({
  selectedCategory,
  onSelectCategory,
}) => {
  const categories = [
    { id: "all", label: "Tümü", color: "bg-gray-100 text-gray-800" },
    { id: "safe", label: "Güvenli", color: "bg-green-100 text-green-800" },
    { id: "caution", label: "Dikkat", color: "bg-yellow-100 text-yellow-800" },
    { id: "danger", label: "Riskli", color: "bg-red-100 text-red-800" },
  ];

  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((category) => (
        <Button
          key={category.id}
          variant="outline"
          size="sm"
          onClick={() => onSelectCategory(category.id as RiskCategory)}
          className={cn(
            "rounded-full font-medium transition-all",
            selectedCategory === category.id
              ? category.color
              : "hover:bg-muted"
          )}
        >
          {category.label}
        </Button>
      ))}
    </div>
  );
};

export default RiskCategoryFilter;
