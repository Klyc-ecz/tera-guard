import React, { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ClipboardList, Pill, Bot, HelpCircle, FileText, Download, AlertTriangle, CheckCircle, AlertCircle, Search, Send } from "lucide-react";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [aiQuery, setAiQuery] = useState("");
  const [aiResponse, setAiResponse] = useState("");

  // Mock data for patient cases
  const patientCases = [
    {
      id: 1,
      patientAge: 28,
      pregnancyWeek: 12,
      medications: ["Paracetamol 500mg", "Folik Asit 5mg", "Demir 80mg"],
      riskLevel: "safe",
      lastUpdate: "2 gün önce"
    },
    {
      id: 2,
      patientAge: 32,
      pregnancyWeek: 24,
      medications: ["Metformin 850mg", "İnsulin Aspart", "Vitamin D3"],
      riskLevel: "caution",
      lastUpdate: "1 hafta önce"
    },
    {
      id: 3,
      patientAge: 29,
      pregnancyWeek: 8,
      medications: ["İbuprofen 400mg", "Omeprazol 20mg"],
      riskLevel: "danger",
      lastUpdate: "3 gün önce"
    }
  ];

  // Mock data for products
  const products = [
    {
      id: 1,
      name: "Paracetamol",
      activeIngredient: "Paracetamol",
      brandName: "Parol",
      indication: "Ateş düşürücü, ağrı kesici",
      pregnancyCategory: "B",
      description: "Hamilelik kategorisi B - Genelde güvenli kabul edilir"
    },
    {
      id: 2,
      name: "Metformin",
      activeIngredient: "Metformin HCl",
      brandName: "Glucophage",
      indication: "Tip 2 diabetes mellitus",
      pregnancyCategory: "B",
      description: "Gestasyonel diabetes tedavisinde kullanılabilir"
    },
    {
      id: 3,
      name: "İbuprofen",
      activeIngredient: "İbuprofen",
      brandName: "Brufen",
      indication: "Ağrı kesici, iltihap giderici",
      pregnancyCategory: "C/D",
      description: "3. trimesterde kullanımından kaçınılmalı"
    }
  ];

  // Mock FAQ data
  const faqs = [
    {
      question: "Hamilelikte paracetamol kullanılır mı?",
      answer: "Evet, paracetamol hamilelikte güvenli kabul edilen ağrı kesici ve ateş düşürücüdür. FDA kategorisi B'dir ve gerektiğinde kullanılabilir."
    },
    {
      question: "En güvenli ağrı kesici nedir?",
      answer: "Hamilelik döneminde en güvenli ağrı kesici paracetamol'dür. İbuprofen gibi NSAİİ grubu ilaçlar özellikle 3. trimesterde kullanılmamalıdır."
    },
    {
      question: "Hamilelikte antibiyotik kullanımı nasıl olmalı?",
      answer: "Penisilin grubu antibiyotikler (amoksisilin gibi) hamilelikte güvenli kabul edilir. Tetrasiklin grubu antibiyotiklerden kaçınılmalıdır."
    },
    {
      question: "Gestasyonel diabetes ilaçları güvenli mi?",
      answer: "Metformin gestasyonel diabetes tedavisinde güvenli kabul edilir. İnsulin de hamilelikte güvenle kullanılabilir."
    }
  ];

  const getRiskIcon = (level: string) => {
    switch (level) {
      case "safe":
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case "caution":
        return <AlertCircle className="h-5 w-5 text-yellow-600" />;
      case "danger":
        return <AlertTriangle className="h-5 w-5 text-red-600" />;
      default:
        return <AlertCircle className="h-5 w-5 text-gray-600" />;
    }
  };

  const getRiskBadgeColor = (level: string) => {
    switch (level) {
      case "safe":
        return "bg-green-100 text-green-800 hover:bg-green-200";
      case "caution":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-200";
      case "danger":
        return "bg-red-100 text-red-800 hover:bg-red-200";
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-200";
    }
  };

  const handleAiSubmit = () => {
    if (!aiQuery.trim()) return;
    
    // Mock AI response
    setAiResponse(`FDA 2023 verilerine göre, "${aiQuery}" ile ilgili bilgiler: 

Bu konuda yapılan çalışmalar hamilelik döneminde dikkatli kullanım gerektirdiğini göstermektedir. Detaylı bilgi için hekiminize danışınız.

Kaynak: FDA Pregnancy Categories Guidelines, 2023`);
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.activeIngredient.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Layout>
      <div className="space-y-6 font-inter">
        {/* Welcome Message */}
        <div className="bg-gradient-to-r from-primary/10 to-secondary/20 rounded-xl p-6 border border-primary/20">
          <h1 className="text-2xl font-bold text-primary mb-2">
            Hoş geldiniz, Dr. Ayşe
          </h1>
          <p className="text-muted-foreground">
            NEU-GUARD platformuna hoş geldiniz. Hamilelik döneminde güvenli ilaç kullanımı için tüm kaynaklara buradan ulaşabilirsiniz.
          </p>
        </div>

        {/* Main Tabs */}
        <Tabs defaultValue="patient-cases" className="w-full">
          <TabsList className="grid w-full grid-cols-4 h-12 bg-secondary/30">
            <TabsTrigger value="patient-cases" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <ClipboardList className="h-4 w-4" />
              📋 Hasta Vakaları
            </TabsTrigger>
            <TabsTrigger value="product-info" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Pill className="h-4 w-4" />
              💊 Ürün Bilgileri
            </TabsTrigger>
            <TabsTrigger value="ai-assistant" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Bot className="h-4 w-4" />
              🤖 AI Asistan
            </TabsTrigger>
            <TabsTrigger value="faq" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <HelpCircle className="h-4 w-4" />
              ❓ SSS
            </TabsTrigger>
          </TabsList>

          {/* Patient Cases Tab */}
          <TabsContent value="patient-cases" className="mt-6">
            <div className="grid gap-4">
              <h2 className="text-xl font-semibold text-foreground mb-4">Hasta Vakaları</h2>
              {patientCases.map((case_) => (
                <Card key={case_.id} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">Vaka #{case_.id}</CardTitle>
                        <CardDescription>
                          Hasta yaşı: {case_.patientAge} • Gebelik haftası: {case_.pregnancyWeek}
                        </CardDescription>
                      </div>
                      <div className="flex items-center gap-2">
                        {getRiskIcon(case_.riskLevel)}
                        <Badge className={getRiskBadgeColor(case_.riskLevel)}>
                          {case_.riskLevel === "safe" && "Güvenli"}
                          {case_.riskLevel === "caution" && "Dikkatli"}
                          {case_.riskLevel === "danger" && "Riskli"}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div>
                        <h4 className="font-medium text-sm text-muted-foreground mb-2">Kullanılan İlaçlar:</h4>
                        <div className="flex flex-wrap gap-2">
                          {case_.medications.map((med, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {med}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className="flex justify-between items-center pt-2">
                        <span className="text-xs text-muted-foreground">{case_.lastUpdate}</span>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" className="h-8">
                            <FileText className="h-3 w-3 mr-1" />
                            Raporu Görüntüle
                          </Button>
                          <Button size="sm" variant="outline" className="h-8">
                            <Download className="h-3 w-3 mr-1" />
                            PDF İndir
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Product Information Tab */}
          <TabsContent value="product-info" className="mt-6">
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold text-foreground mb-4">Ürün Bilgi Sistemi</h2>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Ürün veya molekül adı arayın..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 h-12"
                  />
                </div>
              </div>
              
              <div className="grid gap-4">
                {filteredProducts.map((product) => (
                  <Card key={product.id} className="hover:shadow-md transition-shadow">
                    <CardHeader>
                      <CardTitle className="text-lg text-primary">{product.name}</CardTitle>
                      <CardDescription>{product.brandName}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="font-medium text-muted-foreground">Etken Madde:</span>
                          <p>{product.activeIngredient}</p>
                        </div>
                        <div>
                          <span className="font-medium text-muted-foreground">Endikasyon:</span>
                          <p>{product.indication}</p>
                        </div>
                        <div>
                          <span className="font-medium text-muted-foreground">Gebelik Kategorisi:</span>
                          <Badge variant="outline" className="ml-2">{product.pregnancyCategory}</Badge>
                        </div>
                        <div className="col-span-2">
                          <span className="font-medium text-muted-foreground">Açıklama:</span>
                          <p className="text-foreground">{product.description}</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="mt-4">
                        KÜB/Pİ Bilgisini Görüntüle
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* AI Assistant Tab */}
          <TabsContent value="ai-assistant" className="mt-6">
            <div className="space-y-6">
              <div className="text-center">
                <div className="mx-auto w-16 h-16 mb-4 flex items-center justify-center rounded-full bg-primary/10">
                  <Bot className="h-8 w-8 text-primary" />
                </div>
                <h2 className="text-xl font-semibold text-foreground mb-2">AI Medikal Asistan</h2>
                <p className="text-muted-foreground">
                  Hamilelik döneminde ilaç kullanımı hakkında sorularınızı sorun
                </p>
              </div>

              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <Textarea
                      placeholder="Sorunuzu buraya yazın... (örn: Hamilelikte paracetamol kullanımı güvenli mi?)"
                      value={aiQuery}
                      onChange={(e) => setAiQuery(e.target.value)}
                      className="min-h-[100px]"
                    />
                    <Button onClick={handleAiSubmit} className="w-full">
                      <Send className="h-4 w-4 mr-2" />
                      Soruyu Gönder
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {aiResponse && (
                <Card className="border-primary/20 bg-primary/5">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Bot className="h-5 w-5 text-primary" />
                      AI Asistan Yanıtı
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="whitespace-pre-line text-foreground">
                      {aiResponse}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          {/* FAQ Tab */}
          <TabsContent value="faq" className="mt-6">
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-foreground">Sık Sorulan Sorular</h2>
              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <Card key={index} className="hover:shadow-md transition-shadow">
                    <CardHeader>
                      <CardTitle className="text-lg text-primary flex items-start gap-2">
                        <HelpCircle className="h-5 w-5 mt-0.5 flex-shrink-0" />
                        {faq.question}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-foreground leading-relaxed">{faq.answer}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Index;