
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import DrugHeader from "@/components/drug-info/DrugHeader";
import DrugTabs from "@/components/drug-info/DrugTabs";
import { TabsContent } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent } from "@/components/ui/card";

const DrugInfo = () => {
  const { id } = useParams<{ id: string }>();
  const [isFavorite, setIsFavorite] = useState(false);
  const { toast } = useToast();

  // Mock drug data - in real application, this would be fetched based on the id
  const drug = {
    id: id || "1",
    name: "Paracetamol",
    scientificName: "Acetaminophen",
    category: "safe" as const,
    summary: `Paracetamol (asetaminofen) ağrı kesici ve ateş düşürücü bir ilaçtır. Anne sütüne çok düşük miktarda geçer. Emzirme döneminde, önerilen dozlarda kullanıldığında bebekte herhangi bir yan etki gözlenmemiştir. Dünya Sağlık Örgütü (WHO) ve Amerikan Pediatri Akademisi (AAP) tarafından emzirme döneminde güvenli kabul edilmektedir.`,
    drugLevels: `Anne sütüne geçen paracetamol miktarı, annenin aldığı dozun yaklaşık %1-4'ü kadardır. Bu konsantrasyon, bebekte terapötik etki oluşturacak düzeyin çok altındadır. Anne sütündeki yarı ömrü yaklaşık 1.5-2.5 saattir.`,
    infantEffects: `Paracetamolün anne sütü yoluyla bebeğe geçen miktarları, bebeği etkileyecek düzeylerin çok altındadır. Yapılan çalışmalarda, anne sütü ile beslenen bebeklerde paracetamol kullanımına bağlı yan etki bildirilmemiştir. Uzun süreli yüksek doz kullanımında teorik olarak karaciğer üzerine etki ihtimali bulunmakla birlikte, klinik pratikte böyle bir durum rapor edilmemiştir.`,
    lactationEffects: `Paracetamol kullanımının anne sütü üretimini etkilediğine dair herhangi bir veri bulunmamaktadır. Süt miktarı veya içeriği üzerine olumsuz bir etkisi gözlenmemiştir.`,
    alternatives: `Emzirme döneminde ağrı kontrolünde paracetamol, ibuprofen ve asetilsalisilik asit (düşük doz) kullanılabilir. İbuprofen, 6 aydan küçük bebeklerde daha dikkatli değerlendirilmelidir. Kodein içeren kombinasyon preparatlarından kaçınılmalıdır.`,
    references: [
      "Anderson PO. Acetaminophen (Paracetamol) and Breastfeeding. Breastfeed Med. 2018;13(10):645-647.",
      "Sachs HC; Committee On Drugs. The transfer of drugs and therapeutics into human breast milk: an update on selected topics. Pediatrics. 2013;132(3):e796-e809.",
      "World Health Organization. Breastfeeding and maternal medication. 2002."
    ],
    comments: [
      {
        author: "Dr. Ayşe Yılmaz",
        specialty: "Klinik Farmakoloji",
        date: "15 Mart 2024",
        content: "Parasetamol, emzirme döneminde ilk tercih edilmesi gereken analjeziklerden biridir. Özellikle ateş ve hafif-orta şiddetli ağrıda güvenli bir seçenektir."
      },
      {
        author: "Prof. Dr. Mehmet Kara",
        specialty: "Neonatoloji",
        date: "10 Şubat 2024",
        content: "Anne sütüne geçen parasetamolün bebeğe zararı olmadığı pek çok çalışmada gösterilmiştir. Bununla birlikte, annenin yüksek dozda ve uzun süreli kullanımında dikkatli olunmalıdır."
      }
    ]
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    toast({
      title: !isFavorite ? "Favorilere eklendi" : "Favorilerden çıkarıldı",
      description: drug.name,
    });
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "Bağlantı kopyalandı",
      description: "İlaç bilgisinin bağlantısı panoya kopyalandı.",
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
                <h2 className="text-xl font-semibold mb-4">Kullanım Özeti</h2>
                <p className="text-base leading-relaxed">{drug.summary}</p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="drug-levels">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">İlaç Seviyeleri</h2>
                <h3 className="font-medium text-lg mb-2">Anne Sütündeki Seviyeler</h3>
                <p className="text-base leading-relaxed">{drug.drugLevels}</p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="infant-effects">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Bebekteki Etkileri</h2>
                <p className="text-base leading-relaxed">{drug.infantEffects}</p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="lactation-effects">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Emzirmeye Etkileri</h2>
                <p className="text-base leading-relaxed">{drug.lactationEffects}</p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="alternatives">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Alternatif İlaçlar</h2>
                <p className="text-base leading-relaxed">{drug.alternatives}</p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="references">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Kaynaklar</h2>
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
                <h2 className="text-xl font-semibold mb-4">Uzman Görüşleri</h2>
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
        </DrugTabs>
      </div>
    </Layout>
  );
};

export default DrugInfo;
