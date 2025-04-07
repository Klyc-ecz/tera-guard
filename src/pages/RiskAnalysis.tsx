
import React, { useState } from "react";
import Layout from "@/components/layout/Layout";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { 
  Form, 
  FormControl, 
  FormDescription, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "@/components/ui/textarea";
import * as z from "zod";
import { toast } from "sonner";
import { AlertCircle, Download, Plus, Trash } from "lucide-react";

// Form şemaları
const patientSchema = z.object({
  nameSurname: z.string().min(2, { message: "Ad soyad en az 2 karakter olmalıdır" }),
  age: z.string().refine((val) => !isNaN(parseInt(val)) && parseInt(val) > 0, {
    message: "Geçerli bir yaş giriniz",
  }),
  pregnancyWeek: z.string().refine(val => !isNaN(parseInt(val)) && parseInt(val) >= 0 && parseInt(val) <= 42, {
    message: "Geçerli bir gebelik haftası giriniz (0-42)",
  }),
  specialConditions: z.string().optional(),
});

// İlaç şeması
const medicationSchema = z.object({
  name: z.string().min(2, { message: "İlaç adı en az 2 karakter olmalıdır" }),
  dose: z.string().min(1, { message: "Doz bilgisi giriniz" }),
  frequency: z.string().min(1, { message: "Kullanım sıklığı giriniz" }),
  startDate: z.string().min(1, { message: "Başlangıç tarihi giriniz" }),
});

// Teratojenite risk seviyeleri
const riskLevels = {
  high: "Yüksek Risk - Gebelikte kontrendike",
  moderate: "Orta Risk - Dikkatli kullanım gerektirir", 
  low: "Düşük Risk - Genellikle güvenli",
  unknown: "Bilinmiyor - Yeterli veri yok"
};

type Medication = {
  id: string;
  name: string;
  dose: string;
  frequency: string;
  startDate: string;
  riskLevel?: keyof typeof riskLevels;
  riskDescription?: string;
};

const RiskAnalysis = () => {
  const [medications, setMedications] = useState<Medication[]>([]);
  const [currentMedication, setCurrentMedication] = useState<Medication | null>(null);
  
  // Hasta formu
  const patientForm = useForm<z.infer<typeof patientSchema>>({
    resolver: zodResolver(patientSchema),
    defaultValues: {
      nameSurname: "",
      age: "",
      pregnancyWeek: "",
      specialConditions: "",
    }
  });
  
  // İlaç formu
  const medicationForm = useForm<z.infer<typeof medicationSchema>>({
    resolver: zodResolver(medicationSchema),
    defaultValues: {
      name: "",
      dose: "",
      frequency: "",
      startDate: "",
    }
  });

  // İlaç ekleme
  const handleAddMedication = (values: z.infer<typeof medicationSchema>) => {
    const newMedication: Medication = {
      id: Date.now().toString(),
      ...values,
      // Demo amaçlı rastgele risk seviyesi ataması
      riskLevel: Object.keys(riskLevels)[Math.floor(Math.random() * Object.keys(riskLevels).length)] as keyof typeof riskLevels,
      riskDescription: "Bu risk değerlendirmesi simülasyon amaçlıdır.",
    };
    
    setMedications([...medications, newMedication]);
    medicationForm.reset();
    toast.success("İlaç başarıyla eklendi");
  };

  // İlaç silme
  const handleRemoveMedication = (id: string) => {
    setMedications(medications.filter(med => med.id !== id));
    toast.info("İlaç listeden kaldırıldı");
  };

  // İlaç detaylarını görüntüleme
  const handleViewMedication = (medication: Medication) => {
    setCurrentMedication(medication);
  };

  // Rapor oluştur
  const generateReport = () => {
    const patientData = patientForm.getValues();
    
    if (Object.values(patientData).some(val => val === "") || medications.length === 0) {
      toast.error("Rapor oluşturmak için hasta bilgileri ve en az bir ilaç eklemelisiniz");
      return;
    }
    
    toast.success("Rapor oluşturuldu ve indirme başlatıldı");
    // Gerçek bir uygulamada burada PDF oluşturma ve indirme işlemi olacaktır
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Teratojenite Risk Analizi</h1>
          <Button onClick={generateReport} disabled={medications.length === 0} className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Rapor Oluştur ve İndir
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Hasta Bilgileri */}
          <Card>
            <CardHeader>
              <CardTitle>Hasta Bilgileri</CardTitle>
              <CardDescription>
                Risk analizi yapılacak hastanın bilgilerini giriniz
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...patientForm}>
                <form className="space-y-4">
                  <FormField
                    control={patientForm.control}
                    name="nameSurname"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Ad Soyad</FormLabel>
                        <FormControl>
                          <Input placeholder="Hasta adı ve soyadı" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={patientForm.control}
                      name="age"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Yaş</FormLabel>
                          <FormControl>
                            <Input placeholder="28" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={patientForm.control}
                      name="pregnancyWeek"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Gebelik Haftası</FormLabel>
                          <FormControl>
                            <Input placeholder="24" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={patientForm.control}
                    name="specialConditions"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Özel Durumlar</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Kronik hastalıklar, alerjiler veya diğer önemli tıbbi durumlar..." 
                            className="min-h-[100px]"
                            {...field} 
                          />
                        </FormControl>
                        <FormDescription>
                          Risk değerlendirmesinde önemli olabilecek diğer tıbbi durumlar
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </form>
              </Form>
            </CardContent>
          </Card>

          {/* İlaç Bilgileri */}
          <Card>
            <CardHeader>
              <CardTitle>İlaç Ekleme</CardTitle>
              <CardDescription>
                Hastanın kullandığı ilaçları ekleyin
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...medicationForm}>
                <form onSubmit={medicationForm.handleSubmit(handleAddMedication)} className="space-y-4">
                  <FormField
                    control={medicationForm.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>İlaç Adı</FormLabel>
                        <FormControl>
                          <Input placeholder="İlaç adını giriniz" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={medicationForm.control}
                    name="dose"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Doz</FormLabel>
                        <FormControl>
                          <Input placeholder="Örn: 500 mg" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={medicationForm.control}
                      name="frequency"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Kullanım Sıklığı</FormLabel>
                          <FormControl>
                            <Input placeholder="Örn: Günde 2 kez" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={medicationForm.control}
                      name="startDate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Başlangıç Tarihi</FormLabel>
                          <FormControl>
                            <Input type="date" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <Button type="submit" className="w-full flex items-center gap-2">
                    <Plus className="h-4 w-4" />
                    İlaç Ekle
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>

        {/* İlaç Listesi ve Risk Analizi */}
        <Card>
          <CardHeader>
            <CardTitle>İlaç Listesi ve Risk Analizi</CardTitle>
            <CardDescription>
              Eklenmiş ilaçlar ve teratojenite risk değerlendirmesi
            </CardDescription>
          </CardHeader>
          <CardContent>
            {medications.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>İlaç Adı</TableHead>
                    <TableHead>Doz</TableHead>
                    <TableHead>Kullanım Sıklığı</TableHead>
                    <TableHead>Teratojenite Riski</TableHead>
                    <TableHead className="text-right">İşlemler</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {medications.map((med) => (
                    <TableRow key={med.id}>
                      <TableCell className="font-medium">{med.name}</TableCell>
                      <TableCell>{med.dose}</TableCell>
                      <TableCell>{med.frequency}</TableCell>
                      <TableCell>
                        <div className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-semibold
                          ${med.riskLevel === 'high' ? 'bg-red-100 text-red-800' : 
                            med.riskLevel === 'moderate' ? 'bg-yellow-100 text-yellow-800' : 
                            med.riskLevel === 'low' ? 'bg-green-100 text-green-800' : 
                            'bg-gray-100 text-gray-800'}`
                        }>
                          {med.riskLevel === 'high' && <AlertCircle className="h-3 w-3" />}
                          {riskLevels[med.riskLevel || 'unknown']}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Sheet>
                            <SheetTrigger asChild>
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => handleViewMedication(med)}
                              >
                                Detaylar
                              </Button>
                            </SheetTrigger>
                            <SheetContent>
                              <SheetHeader>
                                <SheetTitle>{med.name}</SheetTitle>
                                <SheetDescription>
                                  Teratojenite Risk Detayları
                                </SheetDescription>
                              </SheetHeader>
                              <div className="mt-6 space-y-4">
                                <div>
                                  <h4 className="text-sm font-medium">Doz</h4>
                                  <p className="text-sm text-muted-foreground">{med.dose}</p>
                                </div>
                                <div>
                                  <h4 className="text-sm font-medium">Kullanım Sıklığı</h4>
                                  <p className="text-sm text-muted-foreground">{med.frequency}</p>
                                </div>
                                <div>
                                  <h4 className="text-sm font-medium">Başlangıç Tarihi</h4>
                                  <p className="text-sm text-muted-foreground">{med.startDate}</p>
                                </div>
                                <div>
                                  <h4 className="text-sm font-medium">Teratojenite Risk Seviyesi</h4>
                                  <div className={`inline-flex items-center gap-1 mt-1 rounded-full px-2 py-1 text-xs font-semibold
                                    ${med.riskLevel === 'high' ? 'bg-red-100 text-red-800' : 
                                      med.riskLevel === 'moderate' ? 'bg-yellow-100 text-yellow-800' : 
                                      med.riskLevel === 'low' ? 'bg-green-100 text-green-800' : 
                                      'bg-gray-100 text-gray-800'}`
                                  }>
                                    {med.riskLevel === 'high' && <AlertCircle className="h-3 w-3" />}
                                    {riskLevels[med.riskLevel || 'unknown']}
                                  </div>
                                </div>
                                <div>
                                  <h4 className="text-sm font-medium">Risk Açıklaması</h4>
                                  <p className="text-sm text-muted-foreground mt-1">{med.riskDescription}</p>
                                </div>
                                <div>
                                  <h4 className="text-sm font-medium">Öneriler</h4>
                                  <p className="text-sm text-muted-foreground mt-1">
                                    {med.riskLevel === 'high' ? 
                                      "Bu ilacın kullanımı gebelikte önerilmemektedir. Alternatif tedavi seçenekleri değerlendirilmelidir." : 
                                      med.riskLevel === 'moderate' ? 
                                      "İlaç fayda/risk değerlendirmesi yapılarak ve düşük dozda kullanılmalıdır." : 
                                      "İlaç gebelikte güvenli kabul edilmektedir, ancak klinik gereklilik dikkate alınmalıdır."}
                                  </p>
                                </div>
                              </div>
                            </SheetContent>
                          </Sheet>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleRemoveMedication(med.id)}
                          >
                            <Trash className="h-4 w-4 text-red-500" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <p className="text-muted-foreground mb-2">Henüz ilaç eklenmedi</p>
                <p className="text-sm text-muted-foreground">
                  Risk analizi için yukarıdan ilaç ekleyiniz
                </p>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex justify-between">
            <p className="text-sm text-muted-foreground">
              Toplam {medications.length} ilaç
            </p>
            {medications.length > 0 && (
              <Button variant="outline" onClick={() => setMedications([])}>
                Listeyi Temizle
              </Button>
            )}
          </CardFooter>
        </Card>
      </div>
    </Layout>
  );
};

export default RiskAnalysis;
