
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
      description: "Ateş düşürücü ve analjezik etki gösteren ağrı kesici bir ilaçtır.",
      category: "safe" as const,
      lastUpdated: "2 gün önce güncellendi",
      isFavorite: true,
    },
    {
      id: "2",
      name: "Metformin",
      description: "Tip 2 diyabet tedavisinde kullanılan oral antidiyabetik bir ilaçtır.",
      category: "caution" as const,
      lastUpdated: "1 hafta önce güncellendi",
      isFavorite: false,
    },
    {
      id: "3",
      name: "Ibuprofen",
      description: "Non-steroidal antienflamatuar ilaç (NSAID) sınıfında ağrı kesici ve ateş düşürücüdür.",
      category: "caution" as const,
      lastUpdated: "3 gün önce güncellendi",
      isFavorite: true,
    },
    {
      id: "4",
      name: "Amoksisilin",
      description: "Penisilin grubuna ait geniş spektrumlu bir antibiyotiktir.",
      category: "safe" as const,
      lastUpdated: "5 gün önce güncellendi",
      isFavorite: false,
    },
    {
      id: "5",
      name: "Diklofenak",
      description: "Non-steroidal antienflamatuar ilaç (NSAID) grubunda ağrı kesici ve iltihap gidericidir.",
      category: "danger" as const,
      lastUpdated: "2 hafta önce güncellendi",
      isFavorite: false,
    },
    {
      id: "6",
      name: "Omeprazol",
      description: "Proton pompası inhibitörü grubunda mide asidi salgılanmasını azaltan bir ilaçtır.",
      category: "safe" as const,
      lastUpdated: "1 gün önce güncellendi",
      isFavorite: false,
    },
  ];

  const guidelines = [
    {
      title: "Emzirme Döneminde İlaç Kullanım Kılavuzu",
      organization: "Türk Neonatoloji Derneği",
      date: "Ocak 2024",
      url: "#",
    },
    {
      title: "Emziren Anne için Antibiyotik Kullanımı Rehberi",
      organization: "Türkiye Maternal Fetal Tıp ve Perinatoloji Derneği",
      date: "Aralık 2023",
      url: "#",
    },
    {
      title: "Laktasyon Döneminde Psikotrop İlaç Kullanımı",
      organization: "Türkiye Psikiyatri Derneği",
      date: "Kasım 2023",
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
              <h1 className="text-2xl font-bold">Hoş Geldiniz</h1>
              <p className="text-muted-foreground">
                TeraGuard ile emzirme döneminde güvenli ilaç kullanımı hakkında bilgi edinin.
              </p>
            </div>
            <Link to="/login">
              <Button className="flex items-center gap-2">
                <LogIn className="h-4 w-4" />
                <span>Giriş Yapın veya Kaydolun</span>
              </Button>
            </Link>
          </div>
          
          <SearchBar />
          
          <div className="pt-2">
            <h2 className="text-lg font-semibold mb-2">Risk Kategorisine Göre Filtrele</h2>
            <RiskCategoryFilter 
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            <h2 className="text-lg font-semibold">Son Eklenen / Güncellenen Bilgiler</h2>
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
              <h2 className="text-lg font-semibold mb-4">Güncel Klinik Rehberler</h2>
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
