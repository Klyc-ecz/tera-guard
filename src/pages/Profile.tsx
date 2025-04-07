
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Layout from "@/components/layout/Layout";
import { BookOpen, Clock, MessageSquare, Settings, User } from "lucide-react";

const Profile = () => {
  return (
    <Layout>
      <div className="space-y-6">
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-2xl font-bold">Profil</CardTitle>
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <Settings className="h-4 w-4" />
                Profili Düzenle
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-6 items-start py-4">
              <div className="flex flex-col items-center gap-3 w-full md:w-auto">
                <div className="w-32 h-32 rounded-full bg-primary/10 flex items-center justify-center">
                  <User className="h-16 w-16 text-primary" />
                </div>
                <Button variant="outline" size="sm">
                  Fotoğraf Yükle
                </Button>
              </div>
              
              <div className="space-y-4 w-full">
                <div>
                  <h2 className="text-xl font-semibold">Dr. Ahmet Yılmaz</h2>
                  <p className="text-muted-foreground">Çocuk Doktoru</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">E-posta</h3>
                    <p>ahmet.yilmaz@example.com</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Kurum</h3>
                    <p>Şehir Hastanesi</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Uzmanlık</h3>
                    <p>Pediatri</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Üyelik</h3>
                    <p>Premium Üye</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Tabs defaultValue="saved">
          <TabsList>
            <TabsTrigger value="saved" className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              Kaydedilen İlaçlar
            </TabsTrigger>
            <TabsTrigger value="questions" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              Sorular ve Yanıtlar
            </TabsTrigger>
            <TabsTrigger value="history" className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Geçmiş
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="saved" className="mt-4">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Kaydedilen İlaçlar</h3>
                <ul className="space-y-2">
                  <li className="p-3 border rounded-md hover:bg-muted transition-colors">
                    <a href="/drug-info/1" className="flex justify-between items-center">
                      <div>
                        <h4 className="font-medium">Paracetamol</h4>
                        <p className="text-sm text-muted-foreground">Acetaminophen</p>
                      </div>
                      <span className="risk-tag risk-safe">Güvenli</span>
                    </a>
                  </li>
                  <li className="p-3 border rounded-md hover:bg-muted transition-colors">
                    <a href="/drug-info/3" className="flex justify-between items-center">
                      <div>
                        <h4 className="font-medium">Ibuprofen</h4>
                        <p className="text-sm text-muted-foreground">Brufen</p>
                      </div>
                      <span className="risk-tag risk-caution">Dikkat</span>
                    </a>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="questions" className="mt-4">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Sorular ve Yanıtlar</h3>
                <div className="space-y-4">
                  <div className="p-4 border rounded-md">
                    <div className="flex justify-between mb-2">
                      <h4 className="font-medium">Alprazolam ve emzirme güvenliği</h4>
                      <span className="text-xs text-muted-foreground">2 gün önce</span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      Anksiyete tedavisinde alprazolam kullanmak zorunda olan bir hasta emzirmeye devam edebilir mi?
                    </p>
                    <div className="bg-muted p-3 rounded-md">
                      <p className="text-sm mb-1"><span className="font-medium">Dr. Serkan Aydın (Psikiyatri):</span> Alprazolam anne sütüne geçer ve sedasyona neden olabilir. Kısa süreli kullanımda düşük dozlarda zorunlu hallerde kullanılabilir ancak lorazepam gibi alternatifler daha güvenlidir.</p>
                    </div>
                  </div>
                  
                  <div className="p-4 border rounded-md">
                    <div className="flex justify-between mb-2">
                      <h4 className="font-medium">Metronidazol ve emzirme</h4>
                      <span className="text-xs text-muted-foreground">1 hafta önce</span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      Diş enfeksiyonu için metronidazol kullanması gereken annenin bebeği 2 aylık. Kısa süreli tedavide emzirmeye ara vermeli mi?
                    </p>
                    <div className="bg-muted p-3 rounded-md">
                      <p className="text-sm mb-1"><span className="font-medium">Dr. Elif Demir (Diş Hekimliği):</span> Metronidazol tedavisi sırasında 12-24 saat emzirmeye ara verilmesi önerilir. Alternatif olarak klindamisin değerlendirilebilir.</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="history" className="mt-4">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Arama Geçmişi</h3>
                <ul className="space-y-2">
                  <li className="flex justify-between items-center p-3 border-b">
                    <div className="flex items-center gap-3">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>Sertraline</span>
                    </div>
                    <span className="text-xs text-muted-foreground">Bugün, 14:35</span>
                  </li>
                  <li className="flex justify-between items-center p-3 border-b">
                    <div className="flex items-center gap-3">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>Amoksisilin</span>
                    </div>
                    <span className="text-xs text-muted-foreground">Dün, 09:15</span>
                  </li>
                  <li className="flex justify-between items-center p-3 border-b">
                    <div className="flex items-center gap-3">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>Parasetamol</span>
                    </div>
                    <span className="text-xs text-muted-foreground">3 gün önce</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Profile;
