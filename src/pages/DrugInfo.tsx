
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import DrugHeader from "@/components/drug-info/DrugHeader";
import DrugTabs from "@/components/drug-info/DrugTabs";
import DiscussionThread, { Message } from "@/components/drug-info/DiscussionThread";
import { TabsContent } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent } from "@/components/ui/card";
import { AlarmClock, FlaskConical } from "lucide-react";

const DrugInfo = () => {
  const { id } = useParams<{ id: string }>();
  const [isFavorite, setIsFavorite] = useState(false);
  const { toast } = useToast();

  const discussion: Message[] = [
    {
      id: "1",
      sender: {
        name: "Dr. Emily Johnson",
        specialty: "Family Medicine",
      },
      time: "10:24",
      content: "Hello, I have a patient who is 12 weeks pregnant. She mentioned occasionally using ibuprofen for migraines. I'd like to confirm if ibuprofen is safe during this period. Is it recommended, or do you have an alternative suggestion?",
      isQuestion: true,
    },
    {
      id: "2",
      sender: {
        name: "Dr. Sarah Davis",
        specialty: "Obstetrics & Gynecology",
      },
      time: "11:03",
      content: "Hello Dr. Johnson, ibuprofen can be used in limited situations until the 12th week, but caution is advised at the beginning of the 2nd trimester. It's contraindicated in the 3rd trimester. For now, acetaminophen (paracetamol) would be a safer alternative. If migraines are frequent, a neurology consultation might be beneficial. I hope your patient feels better soon.",
    },
    {
      id: "3",
      sender: {
        name: "Dr. Emily Johnson",
        specialty: "Family Medicine",
      },
      time: "11:08",
      content: "Thank you for your quick response. I'll proceed with acetaminophen and refer if needed.",
    },
  ];

  const drug = {
    id: id || "1",
    name: "Paracetamol",
    scientificName: "Acetaminophen",
    category: "safe" as const,
    summary: `Paracetamol (acetaminophen) is a pain reliever and fever reducer. It passes into breast milk in very small amounts. No adverse effects have been observed in the infant when used at recommended doses during breastfeeding. It is considered safe during breastfeeding by the World Health Organization (WHO) and the American Academy of Pediatrics (AAP).`,
    drugLevels: `The amount of paracetamol that passes into breast milk is approximately 1-4% of the mother's dose. This concentration is well below levels that would have therapeutic effects in the infant. The half-life in breast milk is approximately 1.5-2.5 hours.`,
    infantEffects: `The amounts of paracetamol passing into breast milk are well below levels that would affect the infant. Studies have not reported any adverse effects in breastfed infants whose mothers used paracetamol. Theoretically, there is a potential effect on the liver with long-term high-dose use, but no such case has been reported in clinical practice.`,
    lactationEffects: `There is no data to suggest that paracetamol affects milk production. No negative effects on milk quantity or content have been observed.`,
    alternatives: `For pain control during breastfeeding, paracetamol, ibuprofen, and acetylsalicylic acid (low dose) can be used. Ibuprofen should be evaluated more carefully in infants under 6 months. Combination preparations containing codeine should be avoided.`,
    atcCode: "N02BE01",
    formula: "C8H9NO2",
    molecularWeight: "151.16 g/mol",
    netMass: "500 mg/tablet",
    mechanismOfAction: `Paracetamol selectively inhibits the cyclooxygenase-3 (COX-3) enzyme in the brain and spinal cord to produce its analgesic and antipyretic effects. Its low anti-inflammatory effect in peripheral tissues is due to its low capacity to inhibit the cyclooxygenase enzyme in peripheral tissues due to the low amount of peroxides present.`,
    pharmacokinetics: `
      - Absorption: Rapidly absorbed from the gastrointestinal tract after oral administration. Maximum plasma concentration is reached within 30-60 minutes.
      - Distribution: Rapidly distributed to body fluids. Plasma protein binding is low (<20%).
      - Metabolism: Metabolized in the liver by conjugation with glucuronic acid and sulfate (90%). A small portion (5-10%) is metabolized by the cytochrome P450 enzyme system.
      - Elimination: Metabolites are excreted in the urine. Plasma half-life is 1.5-3 hours.
    `,
    references: [
      "US National Library of Medicine. DailyMed - ACETAMINOPHEN tablet. https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=53b3ed76-34db-4a2a-aa5a-14a24c45e73c",
      "Anderson PO. Acetaminophen (Paracetamol) and Breastfeeding. Breastfeed Med. 2018;13(10):645-647.",
      "Sachs HC; Committee On Drugs. The transfer of drugs and therapeutics into human breast milk: an update on selected topics. Pediatrics. 2013;132(3):e796-e809.",
      "World Health Organization. Breastfeeding and maternal medication. 2002."
    ],
    comments: [
      {
        author: "Dr. Alice Johnson",
        specialty: "Clinical Pharmacology",
        date: "March 15, 2024",
        content: "Paracetamol is one of the first-choice analgesics during breastfeeding. It's particularly safe for fever and mild to moderate pain."
      },
      {
        author: "Prof. Michael Black",
        specialty: "Neonatology",
        date: "February 10, 2024",
        content: "Numerous studies have shown that paracetamol in breast milk does not harm the infant. However, caution should be exercised with high doses and long-term use by the mother."
      }
    ]
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    toast({
      title: !isFavorite ? "Added to favorites" : "Removed from favorites",
      description: drug.name,
    });
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "Link copied",
      description: "Medication information link copied to clipboard.",
    });
  };

  return (
    <Layout>
      <div className="space-y-6">
        <DrugHeader
          name={drug.name}
          scientificName={drug.scientificName}
          category={drug.category}
          isFavorite={isFavorite}
          onToggleFavorite={toggleFavorite}
          onShare={handleShare}
        />

        <DrugTabs defaultTab="summary">
          <TabsContent value="summary">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Usage Summary</h2>
                <p className="text-base leading-relaxed">{drug.summary}</p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="chemical-info">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <FlaskConical className="h-5 w-5" />
                  Chemical Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-medium mb-2">ATC Code</h3>
                      <p className="text-base bg-muted p-2 rounded">{drug.atcCode}</p>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium mb-2">Formula</h3>
                      <p className="text-base bg-muted p-2 rounded">{drug.formula}</p>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium mb-2">Molecular Weight</h3>
                      <p className="text-base bg-muted p-2 rounded">{drug.molecularWeight}</p>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium mb-2">Net Mass</h3>
                      <p className="text-base bg-muted p-2 rounded">{drug.netMass}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-medium mb-2">Mechanism of Action</h3>
                      <p className="text-base leading-relaxed">{drug.mechanismOfAction}</p>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium mb-2">Pharmacokinetic Properties</h3>
                      <div className="text-base leading-relaxed whitespace-pre-line">{drug.pharmacokinetics}</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="drug-levels">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Drug Levels</h2>
                <h3 className="font-medium text-lg mb-2">Levels in Breast Milk</h3>
                <p className="text-base leading-relaxed">{drug.drugLevels}</p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="infant-effects">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Effects on Infant</h2>
                <p className="text-base leading-relaxed">{drug.infantEffects}</p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="lactation-effects">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Effects on Breastfeeding</h2>
                <p className="text-base leading-relaxed">{drug.lactationEffects}</p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="alternatives">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Alternative Medications</h2>
                <p className="text-base leading-relaxed">{drug.alternatives}</p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="references">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">References</h2>
                <ul className="list-disc pl-5 space-y-2">
                  {drug.references.map((ref, index) => (
                    <li key={index} className="text-base">{ref}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="comments">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Expert Opinions</h2>
                <div className="space-y-4">
                  {drug.comments.map((comment, index) => (
                    <div key={index} className="p-4 border rounded-md">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <h3 className="font-medium">{comment.author}</h3>
                          <p className="text-sm text-muted-foreground">{comment.specialty}</p>
                        </div>
                        <span className="text-xs text-muted-foreground">{comment.date}</span>
                      </div>
                      <p className="text-sm">{comment.content}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="discussions">
            <Card>
              <CardContent className="p-6">
                <DiscussionThread messages={discussion} />
              </CardContent>
            </Card>
          </TabsContent>
        </DrugTabs>
      </div>
    </Layout>
  );
};

export default DrugInfo;
