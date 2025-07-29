import React, { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Users, Pill, Bot, HelpCircle, Archive, TrendingUp, FileDown, AlertTriangle, CheckCircle, AlertCircle, Search, Send, Plus, Star, Clock, Bookmark, FileText, Download, Calendar, MessageSquare, MapPin, Globe } from "lucide-react";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [aiQuery, setAiQuery] = useState("");
  const [aiResponse, setAiResponse] = useState("");

  // NEUTEC İlaç products from the provided list
  const neutecProducts = [
    { name: "ACTEDAY 35 MG", dosage: "4 FILM KAPLI TABLET", price: "241,11 ₺", kubCode: "hkt - küb" },
    { name: "AIRCOMB", dosage: "2,5 MG / 4 MG GRANUL ICEREN SASE (30 SASE)", price: "126,56 ₺", kubCode: "" },
    { name: "AIRFIX 10 MG", dosage: "28 FILM KAPLI TABLET", price: "262,2 ₺", kubCode: "hkt - küb" },
    { name: "AMLONEB", dosage: "10MG/10MG 30 TABLET", price: "250,9 ₺", kubCode: "hkt - küb" },
    { name: "DULATEC 30 MG", dosage: "GASTRO-REZISTAN SERT KAPSUL (28 KAPSUL)", price: "171,19 ₺", kubCode: "hkt - küb" },
    { name: "EBAFIT 10 MG", dosage: "20 FILM KAPLI TABLET", price: "65,43 ₺", kubCode: "hkt - küb" },
    { name: "ESPLUS 10 MG", dosage: "28 FİLM TABLET", price: "92,21 ₺", kubCode: "hkt - küb" },
    { name: "LEFUMIX 10 MG", dosage: "30 FILM TABLET", price: "449,22 ₺", kubCode: "hkt - küb" },
    { name: "NEUREM 10 MG", dosage: "28 FİLM TABLET", price: "650,1 ₺", kubCode: "hkt - küb" },
    { name: "OLMEDAY 10 MG", dosage: "28 FILM TABLET", price: "109,71 ₺", kubCode: "hkt - küb" }
  ];

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

  // Quick access items for field representatives
  const quickAccessItems = [
    { title: "Ürün KÜB / Pİ Bilgileri", icon: FileText, description: "Ürün belgelerine hızlı erişim" },
    { title: "Hekimden Gelen Soruya Yanıtla", icon: MessageSquare, description: "Doktor sorularını AI ile yanıtlayın" },
    { title: "AI Asistan ile Sorgula", icon: Bot, description: "Medikal sorularınızı sorun" },
    { title: "Bugünkü Ziyaret Listem", icon: MapPin, description: "Günlük ziyaret planınız" },
    { title: "Yeni Ürün Bilgilendirmesi", icon: Globe, description: "En son ürün güncellemeleri" }
  ];

  // Bulletin/Updates data
  const bulletins = [
    { 
      title: "Yeni KÜB Güncellemesi",
      content: "NEUREM 10 MG için yeni KÜB bilgileri eklendi",
      date: "2 gün önce",
      type: "kub"
    },
    {
      title: "Rehber Değişikliği",
      content: "Gebelikte antidepresan kullanım rehberi güncellendi",
      date: "1 hafta önce",
      type: "guideline"
    },
    {
      title: "Klinik Çalışma",
      content: "Hamilelikte metformin güvenliği ile ilgili yeni çalışma",
      date: "3 gün önce",
      type: "study"
    },
    {
      title: "Ürün Lansmanı",
      content: "NEUTEC'ten yeni formülasyon duyurusu",
      date: "5 gün önce",
      type: "product"
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
    
    // Mock AI response with quick filter examples
    setAiResponse(`FDA 2023 verilerine göre, "${aiQuery}" ile ilgili bilgiler: 

Bu konuda yapılan çalışmalar hamilelik döneminde dikkatli kullanım gerektirdiğini göstermektedir. Detaylı bilgi için hekiminize danışınız.

Kaynak: FDA Pregnancy Categories Guidelines, 2023 | PubMed PMID: 12345678`);
  };

  const filteredProducts = neutecProducts.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Layout>
      <div className="space-y-6 font-inter">
        {/* Field Representative Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {/* 1. Today's Visit Plan */}
          <Card className="xl:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                🧩 Bugünkü Ziyaret Planım
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="p-3 border rounded-lg">
                  <div className="font-medium">Dr. Mehmet Kaya</div>
                  <div className="text-sm text-muted-foreground">Acıbadem Hastanesi - Kadın Doğum</div>
                  <div className="mt-2 text-xs text-primary">Görüşülecek: NEUREM, ESPLUS</div>
                </div>
                <div className="p-3 border rounded-lg">
                  <div className="font-medium">Dr. Fatma Özkan</div>
                  <div className="text-sm text-muted-foreground">Memorial Hastanesi - Psikiyatri</div>
                  <div className="mt-2 text-xs text-primary">Görüşülecek: NEUREM</div>
                </div>
              </div>
              <Textarea placeholder="Ziyaret sonrası not: (örn: NEUREM için broşür verildi)" className="min-h-[60px]" />
              <Button className="w-full">
                <CheckCircle className="h-4 w-4 mr-2" />
                Ziyareti Tamamla ✅
              </Button>
            </CardContent>
          </Card>

          {/* 2. Quick Product Info Cards */}
          <Card className="xl:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                💊 Hızlı Ürün Bilgi Kartları
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="p-3 border rounded-lg hover:bg-muted/50 cursor-pointer">
                <div className="font-medium text-primary">NEUREM 10 MG</div>
                <div className="text-xs text-muted-foreground mt-1">Depresyon, anksiyete</div>
                <div className="text-xs mt-2 p-2 bg-blue-50 rounded">
                  "NEUREM, depresyon tedavisinde gebelik kategorisi C olan SSRI'dır."
                </div>
                <Button size="sm" variant="outline" className="mt-2 w-full">KÜB</Button>
              </div>
              <div className="p-3 border rounded-lg hover:bg-muted/50 cursor-pointer">
                <div className="font-medium text-primary">ESPLUS 10 MG</div>
                <div className="text-xs text-muted-foreground mt-1">Depresyon, panik bozukluk</div>
                <div className="text-xs mt-2 p-2 bg-blue-50 rounded">
                  "ESPLUS, SSRI grubu antidepresan, emzirmede dikkat."
                </div>
                <Button size="sm" variant="outline" className="mt-2 w-full">KÜB</Button>
              </div>
              <div className="p-3 border rounded-lg hover:bg-muted/50 cursor-pointer">
                <div className="font-medium text-primary">DULATEC 30 MG</div>
                <div className="text-xs text-muted-foreground mt-1">Gastroözofageal reflü</div>
                <div className="text-xs mt-2 p-2 bg-blue-50 rounded">
                  "DULATEC, PPI grubu, gebelikte B kategorisi güvenli."
                </div>
                <Button size="sm" variant="outline" className="mt-2 w-full">KÜB</Button>
              </div>
            </CardContent>
          </Card>

          {/* 3. Clinical Info Cards / Medical Education */}
          <Card className="xl:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                🎯 Medikal Eğitim Modülü
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="p-3 bg-yellow-50 rounded-lg">
                <div className="font-medium text-sm">En Sık Sorulan:</div>
                <div className="text-xs text-muted-foreground mt-1">"NEUREM gebelikte güvenli mi?"</div>
              </div>
              <div className="p-3 bg-red-50 rounded-lg">
                <div className="font-medium text-sm">❌ Hatalı Söylem:</div>
                <div className="text-xs text-muted-foreground mt-1">"Tüm antidepresanlar aynı risk"</div>
              </div>
              <div className="p-3 bg-green-50 rounded-lg">
                <div className="font-medium text-sm">✅ Doğru Anlatım:</div>
                <div className="text-xs text-muted-foreground mt-1">"SSRI'lar farklı kategoriler, FDA C sınıfı"</div>
              </div>
              <div className="p-3 border rounded-lg">
                <div className="font-medium text-sm">Mini Quiz:</div>
                <div className="text-xs mt-2">"NEUREM gebelikte güvenli midir?"</div>
                <div className="space-y-1 mt-2">
                  <Button size="sm" variant="outline" className="w-full text-xs h-6">A) Evet, tamamen güvenli</Button>
                  <Button size="sm" variant="outline" className="w-full text-xs h-6">B) Hayır, kesinlikle kullanılmaz</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Second Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 4. Product Updates & Launches */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                🗂️ Ürün Güncellemeleri & Lansmanlar
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid md:grid-cols-2 gap-3">
                <div className="p-3 border rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge className="bg-green-100 text-green-800">YENİ</Badge>
                    <span className="font-medium text-sm">AIRFIX Plus Lansmanı</span>
                  </div>
                  <div className="text-xs text-muted-foreground">Yeni formülasyon, gelişmiş etkinlik</div>
                  <Button size="sm" variant="outline" className="mt-2">
                    <Download className="h-3 w-3 mr-1" />
                    Broşür İndir
                  </Button>
                </div>
                <div className="p-3 border rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge className="bg-blue-100 text-blue-800">GÜNCELLEME</Badge>
                    <span className="font-medium text-sm">NEUREM KÜB Güncellemesi</span>
                  </div>
                  <div className="text-xs text-muted-foreground">Gebelik kategorisi bilgileri güncellendi</div>
                  <Button size="sm" variant="outline" className="mt-2">
                    <FileText className="h-3 w-3 mr-1" />
                    KÜB Görüntüle
                  </Button>
                </div>
                <div className="p-3 border rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge className="bg-orange-100 text-orange-800">FİYAT</Badge>
                    <span className="font-medium text-sm">ESPLUS Fiyat Değişikliği</span>
                  </div>
                  <div className="text-xs text-muted-foreground">92,21 ₺ → 89,15 ₺</div>
                  <Button size="sm" variant="outline" className="mt-2">
                    <Download className="h-3 w-3 mr-1" />
                    Fiyat Listesi
                  </Button>
                </div>
                <div className="p-3 border rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge className="bg-purple-100 text-purple-800">ÇALIŞMA</Badge>
                    <span className="font-medium text-sm">DULATEC Klinik Çalışması</span>
                  </div>
                  <div className="text-xs text-muted-foreground">Yeni etkinlik verileri yayımlandı</div>
                  <Button size="sm" variant="outline" className="mt-2">
                    <FileText className="h-3 w-3 mr-1" />
                    Çalışma PDF
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Right Panel - 5. Doctor's Questions & 6. Performance */}
          <div className="space-y-6">
            {/* 5. Doctor's Question Response Panel */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  💬 Hekimden Gelen Sorular
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 border rounded-lg">
                  <div className="text-sm font-medium">Dr. Kaya'dan soru:</div>
                  <div className="text-xs text-muted-foreground mt-1">"NEUREM ve emzirme?"</div>
                  <div className="flex gap-2 mt-2">
                    <Button size="sm" variant="outline" className="text-xs">
                      <Bot className="h-3 w-3 mr-1" />
                      AI Yanıt
                    </Button>
                    <Button size="sm" variant="outline" className="text-xs">
                      <Send className="h-3 w-3 mr-1" />
                      WhatsApp
                    </Button>
                  </div>
                </div>
                <div className="p-3 border rounded-lg">
                  <div className="text-sm font-medium">Dr. Özkan'dan soru:</div>
                  <div className="text-xs text-muted-foreground mt-1">"Yaşlı hastada doz?"</div>
                  <div className="flex gap-2 mt-2">
                    <Button size="sm" variant="outline" className="text-xs">
                      <Bot className="h-3 w-3 mr-1" />
                      AI Yanıt
                    </Button>
                    <Button size="sm" variant="outline" className="text-xs">
                      <Send className="h-3 w-3 mr-1" />
                      E-mail
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 6. Personal Performance Panel */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  📊 Kişisel Performans
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-primary">7</div>
                    <div className="text-xs text-muted-foreground">Bugünkü Ziyaret</div>
                  </div>
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">NEUREM</div>
                    <div className="text-xs text-muted-foreground">En Çok Erişilen</div>
                  </div>
                </div>
                <div className="p-3 border rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Haftalık Hedef</span>
                    <span className="text-sm font-medium">35/40</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                    <div className="bg-primary h-2 rounded-full" style={{width: '87.5%'}}></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3">
            {/* Navigation Tabs */}
            <Tabs defaultValue="patient-cases" className="w-full">
              <TabsList className="grid w-full grid-cols-3 lg:grid-cols-7 h-12 bg-secondary/30">
                <TabsTrigger value="patient-cases" className="flex items-center gap-1 text-xs data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                  <Users className="h-3 w-3" />
                  Hasta Vakaları
                </TabsTrigger>
                <TabsTrigger value="drug-info" className="flex items-center gap-1 text-xs data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                  <Pill className="h-3 w-3" />
                  İlaç Bilgisi
                </TabsTrigger>
                <TabsTrigger value="ai-assistant" className="flex items-center gap-1 text-xs data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                  <Bot className="h-3 w-3" />
                  Yapay Zekâ Asistan
                </TabsTrigger>
                <TabsTrigger value="archive" className="flex items-center gap-1 text-xs data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                  <Archive className="h-3 w-3" />
                  Güncel KÜB/Pİ Arşivi
                </TabsTrigger>
                <TabsTrigger value="faq" className="flex items-center gap-1 text-xs data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                  <HelpCircle className="h-3 w-3" />
                  SSS
                </TabsTrigger>
                <TabsTrigger value="comparisons" className="flex items-center gap-1 text-xs data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                  <TrendingUp className="h-3 w-3" />
                  İlaç Karşılaştırmaları
                </TabsTrigger>
                <TabsTrigger value="reports" className="flex items-center gap-1 text-xs data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                  <FileDown className="h-3 w-3" />
                  Raporlama & PDF
                </TabsTrigger>
              </TabsList>

              {/* Patient Cases Tab */}
              <TabsContent value="patient-cases" className="mt-6">
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold text-foreground">Hasta Vakaları</h2>
                    <Button className="flex items-center gap-2" onClick={() => window.location.href = '/patient-case'}>
                      <Plus className="h-4 w-4" />
                      Yeni Vaka Ekle
                    </Button>
                  </div>
                  
                  <div className="grid gap-4">
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
                                  PDF olarak indir
                                </Button>
                                <Button size="sm" variant="outline" className="h-8">
                                  <Send className="h-3 w-3 mr-1" />
                                  Hekimle paylaş
                                </Button>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </TabsContent>

              {/* Drug Information Tab */}
              <TabsContent value="drug-info" className="mt-6">
                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-semibold text-foreground mb-4">İlaç Bilgi Sistemi</h2>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Ürün adı veya molekül bazlı arama yapın..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10 h-12"
                      />
                    </div>
                  </div>
                  
                  <div className="grid gap-4">
                    {filteredProducts.map((product, index) => (
                      <Card key={index} className="hover:shadow-md transition-shadow">
                        <CardHeader>
                          <CardTitle className="text-lg text-primary">{product.name}</CardTitle>
                          <CardDescription>{product.dosage}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="flex justify-between items-center">
                            <div className="flex items-center gap-4">
                              <div>
                                <span className="font-medium text-muted-foreground">Fiyat:</span>
                                <p className="text-lg font-bold text-primary">{product.price}</p>
                              </div>
                              {product.kubCode && (
                                <Badge variant="outline">{product.kubCode}</Badge>
                              )}
                            </div>
                            <Button variant="outline" size="sm">
                              KÜB Bağlantısı
                            </Button>
                          </div>
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
                    <h2 className="text-xl font-semibold text-foreground mb-2">AI Destekli Medikal Asistan</h2>
                    <p className="text-muted-foreground">
                      Örnek: "Paroksetin gebelikte güvenli mi?"
                    </p>
                  </div>

                  {/* Quick Filter Buttons */}
                  <div className="flex flex-wrap gap-2 justify-center">
                    <Button variant="outline" size="sm" onClick={() => setAiQuery("Gebelikte güvenli ilaçlar nelerdir?")}>
                      Gebelik
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => setAiQuery("Emzirme döneminde hangi ilaçlar kullanılabilir?")}>
                      Emzirme
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => setAiQuery("Yaşlı hastalarda ilaç dozajı nasıl ayarlanır?")}>
                      Yaşlı Hasta
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => setAiQuery("Böbrek yetmezliğinde ilaç dozajı?")}>
                      Böbrek Yetmezliği
                    </Button>
                  </div>

                  <Card>
                    <CardContent className="pt-6">
                      <div className="space-y-4">
                        <Textarea
                          placeholder="Sorunuzu buraya yazın..."
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

              {/* Archive Tab */}
              <TabsContent value="archive" className="mt-6">
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-foreground">Güncel KÜB/Pİ Arşivi</h2>
                  <p className="text-muted-foreground">En güncel KÜB ve Pİ belgelerine buradan ulaşabilirsiniz.</p>
                  
                  <div className="grid gap-4">
                    {neutecProducts.slice(0, 5).map((product, index) => (
                      <Card key={index} className="hover:shadow-md transition-shadow">
                        <CardContent className="pt-6">
                          <div className="flex justify-between items-center">
                            <div>
                              <h3 className="font-semibold">{product.name}</h3>
                              <p className="text-sm text-muted-foreground">Son güncelleme: 2 gün önce</p>
                            </div>
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm">
                                KÜB İndir
                              </Button>
                              <Button variant="outline" size="sm">
                                Pİ İndir
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </TabsContent>

              {/* Comparisons Tab */}
              <TabsContent value="comparisons" className="mt-6">
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-foreground">İlaç Karşılaştırmaları</h2>
                  <p className="text-muted-foreground">Farklı ilaçları karşılaştırarak en uygun seçimi yapın.</p>
                  
                  <Card>
                    <CardContent className="pt-6">
                      <p className="text-center text-muted-foreground">İlaç karşılaştırma özelliği yakında eklenecek.</p>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Reports Tab */}
              <TabsContent value="reports" className="mt-6">
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-foreground">Raporlama & PDF</h2>
                  <p className="text-muted-foreground">Vaka raporları ve analiz sonuçlarını PDF olarak indirin.</p>
                  
                  <Card>
                    <CardContent className="pt-6">
                      <p className="text-center text-muted-foreground">Raporlama modülü geliştiriliyor.</p>
                    </CardContent>
                  </Card>
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

          {/* Right Panel - Quick Access & Bulletins */}
          <div className="space-y-6">
            {/* Quick Access Panel */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">🧩 Hızlı Erişim</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {quickAccessItems.map((item, index) => (
                  <Button
                    key={index}
                    variant="ghost"
                    className="w-full justify-start h-auto p-3 text-left"
                    onClick={() => {
                      if (item.title === "Yeni Vaka Ekle") {
                        window.location.href = '/patient-case';
                      }
                    }}
                  >
                    <item.icon className="h-4 w-4 mr-3 flex-shrink-0" />
                    <div>
                      <div className="font-medium text-sm">{item.title}</div>
                      <div className="text-xs text-muted-foreground">{item.description}</div>
                    </div>
                  </Button>
                ))}
              </CardContent>
            </Card>

            {/* Bulletins Panel */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">📣 Bülten / Güncellemeler</CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-80">
                  <div className="space-y-4">
                    {bulletins.map((bulletin, index) => (
                      <div key={index} className="border-l-2 border-primary/20 pl-4 pb-4">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-medium text-sm">{bulletin.title}</h4>
                          <Badge variant="outline" className="text-xs">
                            {bulletin.type === "kub" && "KÜB"}
                            {bulletin.type === "guideline" && "Rehber"}
                            {bulletin.type === "study" && "Çalışma"}
                            {bulletin.type === "product" && "Ürün"}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground mb-2">{bulletin.content}</p>
                        <span className="text-xs text-muted-foreground">{bulletin.date}</span>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Index;