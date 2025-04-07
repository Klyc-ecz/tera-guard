
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface DrugTabsProps {
  children: React.ReactNode;
  defaultTab?: string;
}

const DrugTabs: React.FC<DrugTabsProps> = ({ children, defaultTab = "summary" }) => {
  return (
    <Tabs defaultValue={defaultTab} className="w-full">
      <TabsList className="w-full max-w-full overflow-x-auto flex-nowrap">
        <TabsTrigger value="summary">Özet</TabsTrigger>
        <TabsTrigger value="drug-levels">İlaç Seviyeleri</TabsTrigger>
        <TabsTrigger value="infant-effects">Bebekteki Etkileri</TabsTrigger>
        <TabsTrigger value="lactation-effects">Emzirmeye Etkileri</TabsTrigger>
        <TabsTrigger value="alternatives">Alternatif İlaçlar</TabsTrigger>
        <TabsTrigger value="references">Kaynaklar</TabsTrigger>
        <TabsTrigger value="comments">Uzman Görüşleri</TabsTrigger>
      </TabsList>
      {children}
    </Tabs>
  );
};

export default DrugTabs;
