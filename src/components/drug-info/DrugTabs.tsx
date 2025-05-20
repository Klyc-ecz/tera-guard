
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
        <TabsTrigger value="summary">Summary</TabsTrigger>
        <TabsTrigger value="chemical-info">Chemical Information</TabsTrigger>
        <TabsTrigger value="drug-levels">Drug Levels</TabsTrigger>
        <TabsTrigger value="infant-effects">Effects on Infant</TabsTrigger>
        <TabsTrigger value="lactation-effects">Effects on Breastfeeding</TabsTrigger>
        <TabsTrigger value="alternatives">Alternative Medications</TabsTrigger>
        <TabsTrigger value="references">References</TabsTrigger>
        <TabsTrigger value="comments">Expert Opinions</TabsTrigger>
        <TabsTrigger value="discussions">Ask-Consult</TabsTrigger>
      </TabsList>
      {children}
    </Tabs>
  );
};

export default DrugTabs;
