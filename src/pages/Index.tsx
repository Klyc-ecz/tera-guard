
import React, { useState } from "react";
import Layout from "@/components/layout/Layout";
import SearchBar from "@/components/dashboard/SearchBar";
import RiskCategoryFilter from "@/components/dashboard/RiskCategoryFilter";
import RecentDrugCard from "@/components/dashboard/RecentDrugCard";
import FavoritesList, { FavoriteItem } from "@/components/dashboard/FavoritesList";
import GuidelineCard from "@/components/dashboard/GuidelineCard";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LogIn } from "lucide-react";

type RiskCategory = "all" | "safe" | "caution" | "danger";

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState<RiskCategory>("all");
  const [favorites, setFavorites] = useState<FavoriteItem[]>([
    { id: "1", name: "Paracetamol", category: "safe" },
    { id: "3", name: "Ibuprofen", category: "caution" },
  ]);

  const recentDrugs = [
    {
      id: "1",
      name: "Paracetamol",
      description: "A pain reliever and fever reducer with analgesic effect.",
      category: "safe" as const,
      lastUpdated: "Updated 2 days ago",
      isFavorite: true,
    },
    {
      id: "2",
      name: "Metformin",
      description: "An oral antidiabetic medication used to treat type 2 diabetes.",
      category: "caution" as const,
      lastUpdated: "Updated 1 week ago",
      isFavorite: false,
    },
    {
      id: "3",
      name: "Ibuprofen",
      description: "A non-steroidal anti-inflammatory drug (NSAID) used as a pain reliever and fever reducer.",
      category: "caution" as const,
      lastUpdated: "Updated 3 days ago",
      isFavorite: true,
    },
    {
      id: "4",
      name: "Amoxicillin",
      description: "A broad-spectrum antibiotic belonging to the penicillin group.",
      category: "safe" as const,
      lastUpdated: "Updated 5 days ago",
      isFavorite: false,
    },
    {
      id: "5",
      name: "Diclofenac",
      description: "A non-steroidal anti-inflammatory drug (NSAID) used for pain relief and inflammation reduction.",
      category: "danger" as const,
      lastUpdated: "Updated 2 weeks ago",
      isFavorite: false,
    },
    {
      id: "6",
      name: "Omeprazole",
      description: "A proton pump inhibitor that reduces stomach acid production.",
      category: "safe" as const,
      lastUpdated: "Updated 1 day ago",
      isFavorite: false,
    },
  ];

  const guidelines = [
    {
      title: "Medication Use Guide During Breastfeeding",
      organization: "National Neonatology Association",
      date: "January 2024",
      url: "#",
    },
    {
      title: "Antibiotic Use Guide for Breastfeeding Mothers",
      organization: "Maternal Fetal Medicine and Perinatology Association",
      date: "December 2023",
      url: "#",
    },
    {
      title: "Psychotropic Medication Use During Lactation",
      organization: "Psychiatric Association",
      date: "November 2023",
      url: "#",
    },
  ];

  const filteredDrugs = selectedCategory === "all" 
    ? recentDrugs 
    : recentDrugs.filter(drug => drug.category === selectedCategory);

  const toggleFavorite = (id: string) => {
    const drug = recentDrugs.find(drug => drug.id === id);
    if (!drug) return;

    const isFavorite = favorites.some(fav => fav.id === id);
    if (isFavorite) {
      setFavorites(favorites.filter(fav => fav.id !== id));
    } else {
      setFavorites([...favorites, { id, name: drug.name, category: drug.category }]);
    }
  };

  return (
    <Layout>
      <div className="space-y-8">
        <div className="space-y-4">
          <div className="flex flex-col gap-2 sm:flex-row sm:justify-between sm:items-center">
            <div>
              <h1 className="text-2xl font-bold">Welcome</h1>
              <p className="text-muted-foreground">
                Get information about safe medication use during breastfeeding with TeraGuard.
              </p>
            </div>
            <Link to="/login">
              <Button className="flex items-center gap-2">
                <LogIn className="h-4 w-4" />
                <span>Login or Register</span>
              </Button>
            </Link>
          </div>
          
          <SearchBar />
          
          <div className="pt-2">
            <h2 className="text-lg font-semibold mb-2">Filter by Risk Category</h2>
            <RiskCategoryFilter 
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            <h2 className="text-lg font-semibold">Recently Added / Updated Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredDrugs.map((drug) => (
                <RecentDrugCard
                  key={drug.id}
                  {...drug}
                  isFavorite={favorites.some(fav => fav.id === drug.id)}
                  onToggleFavorite={() => toggleFavorite(drug.id)}
                />
              ))}
            </div>
          </div>
          
          <div className="space-y-6">
            <FavoritesList 
              favorites={favorites}
              onRemoveFavorite={(id) => toggleFavorite(id)}
            />
            
            <div>
              <h2 className="text-lg font-semibold mb-4">Current Clinical Guidelines</h2>
              <div className="space-y-3">
                {guidelines.map((guideline, index) => (
                  <GuidelineCard key={index} {...guideline} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
