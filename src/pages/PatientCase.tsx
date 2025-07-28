import React, { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { ClipboardPlus, Download, Send, AlertTriangle, CheckCircle, AlertCircle, Bot } from "lucide-react";

// Form schema for patient case
const patientCaseSchema = z.object({
  patientAge: z.string().min(1, { message: "Hasta yaşı gerekli" }),
  gender: z.string().min(1, { message: "Cinsiyet seçimi gerekli" }),
  pregnancyStatus: z.string().min(1, { message: "Gebelik durumu gerekli" }),
  pregnancyWeek: z.string().optional(),
  diagnosis: z.string().min(1, { message: "Tanı bilgisi gerekli" }),
  medications: z.string().min(1, { message: "Kullanılan ilaçlar gerekli" }),
  dosage: z.string().min(1, { message: "Doz bilgisi gerekli" }),
  additionalNotes: z.string().optional()
});

const PatientCase = () => {
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const form = useForm<z.infer<typeof patientCaseSchema>>({
    resolver: zodResolver(patientCaseSchema),
    defaultValues: {
      patientAge: "",
      gender: "",
      pregnancyStatus: "",
      pregnancyWeek: "",
      diagnosis: "",
      medications: "",
      dosage: "",
      additionalNotes: ""
    }
  });

  const onSubmit = async (values: z.infer<typeof patientCaseSchema>) => {
    setIsAnalyzing(true);
    
    // Simulate AI analysis
    setTimeout(() => {
      const riskLevel = Math.random() > 0.6 ? "safe" : Math.random() > 0.3 ? "caution" : "danger";
      
      setAnalysisResult({
        riskLevel,
        riskScore: Math.floor(Math.random() * 100),
        recommendations: [
          "Gebelik döneminde paracetamol güvenli kabul edilir",
          "İbuprofen 3. trimesterde kullanılmamalı",
          "Düzenli kontrol önerilir"
        ],
        interactions: [
          { drug1: "Paracetamol", drug2: "Metformin", level: "safe" },
          { drug1: "İbuprofen", drug2: "Aspirin", level: "caution" }
        ],
        sources: [
          "FDA 2023 Pregnancy Guidelines",
          "PubMed PMID: 12345678",
          "ACOG Practice Bulletin No. 230"
        ]
      });
      setIsAnalyzing(false);
      toast.success("Vaka analizi tamamlandı!");
    }, 2000);
  };

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
        return "bg-green-100 text-green-800";
      case "caution":
        return "bg-yellow-100 text-yellow-800";
      case "danger":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const generatePDF = () => {
    toast.success("PDF raporu indirildi!");
  };

  const shareWithDoctor = () => {
    toast.success("Rapor hekim ile paylaşıldı!");
  };

  return (
    <Layout>
      <div className="space-y-6 font-inter">
        {/* Header */}
        <div className="flex items-center gap-3">
          <ClipboardPlus className="h-8 w-8 text-primary" />
          <div>
            <h1 className="text-2xl font-bold text-foreground">Hasta Vakası Ekleme Sayfası</h1>
            <p className="text-muted-foreground">Hasta bilgilerini girerek AI ile teratojenite riski analizini başlatın</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Patient Case Form */}
          <Card>
            <CardHeader>
              <CardTitle>Hasta Bilgileri</CardTitle>
              <CardDescription>
                Lütfen hasta bilgilerini eksiksiz doldurun
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="patientAge"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Hasta Yaşı</FormLabel>
                          <FormControl>
                            <Input placeholder="28" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="gender"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Cinsiyet</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Seçiniz" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="female">Kadın</SelectItem>
                              <SelectItem value="male">Erkek</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="pregnancyStatus"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Gebelik Durumu</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Seçiniz" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="pregnant">Gebe</SelectItem>
                              <SelectItem value="planning">Gebelik planlıyor</SelectItem>
                              <SelectItem value="breastfeeding">Emziriyor</SelectItem>
                              <SelectItem value="not-pregnant">Gebe değil</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="pregnancyWeek"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Gebelik Haftası (Gebe ise)</FormLabel>
                          <FormControl>
                            <Input placeholder="12" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="diagnosis"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tanı</FormLabel>
                        <FormControl>
                          <Input placeholder="Ör: Hipertansiyon, Diabetes, Enfeksiyon" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="medications"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Kullanılan İlaçlar</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Ör: Paracetamol 500mg, Metformin 850mg, Folik asit 5mg"
                            className="min-h-[80px]"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="dosage"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Doz Bilgisi</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Ör: Günde 3x1, Günde 2x1, Tek doz"
                            className="min-h-[60px]"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="additionalNotes"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Ek Notlar (Opsiyonel)</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Hastanın özel durumları, alerjileri vb."
                            className="min-h-[60px]"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button 
                    type="submit" 
                    className="w-full" 
                    disabled={isAnalyzing}
                  >
                    <Bot className="h-4 w-4 mr-2" />
                    {isAnalyzing ? "AI Analiz Ediliyor..." : "AI ile Analiz Et"}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>

          {/* Analysis Results */}
          <div className="space-y-6">
            {isAnalyzing && (
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <Bot className="h-12 w-12 text-primary mx-auto mb-4 animate-pulse" />
                    <h3 className="text-lg font-semibold mb-2">AI Analiz Ediliyor</h3>
                    <p className="text-muted-foreground">Teratojenite riski değerlendiriliyor...</p>
                  </div>
                </CardContent>
              </Card>
            )}

            {analysisResult && (
              <div className="space-y-4">
                {/* Risk Assessment */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      {getRiskIcon(analysisResult.riskLevel)}
                      AI ile Analiz Edilmiş Teratojenite Riski
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">Risk Düzeyi:</span>
                        <Badge className={getRiskBadgeColor(analysisResult.riskLevel)}>
                          {analysisResult.riskLevel === "safe" && "Güvenli"}
                          {analysisResult.riskLevel === "caution" && "Dikkatli"}
                          {analysisResult.riskLevel === "danger" && "Riskli"}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="font-medium">Risk Skoru:</span>
                        <span className="text-lg font-bold text-primary">
                          {analysisResult.riskScore}/100
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Recommendations */}
                <Card>
                  <CardHeader>
                    <CardTitle>Öneriler</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {analysisResult.recommendations.map((rec: string, index: number) => (
                        <li key={index} className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                          <span className="text-sm">{rec}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                {/* Drug Interactions */}
                <Card>
                  <CardHeader>
                    <CardTitle>İlaç Etkileşimleri</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {analysisResult.interactions.map((interaction: any, index: number) => (
                        <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium">{interaction.drug1}</span>
                            <span className="text-muted-foreground">+</span>
                            <span className="text-sm font-medium">{interaction.drug2}</span>
                          </div>
                          <Badge className={getRiskBadgeColor(interaction.level)}>
                            {interaction.level === "safe" && "Güvenli"}
                            {interaction.level === "caution" && "Dikkatli"}
                            {interaction.level === "danger" && "Riskli"}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Sources */}
                <Card>
                  <CardHeader>
                    <CardTitle>Kaynaklar</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-1">
                      {analysisResult.sources.map((source: string, index: number) => (
                        <li key={index} className="text-sm text-muted-foreground">
                          • {source}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <Button onClick={generatePDF} className="flex-1">
                    <Download className="h-4 w-4 mr-2" />
                    PDF olarak indir
                  </Button>
                  <Button onClick={shareWithDoctor} variant="outline" className="flex-1">
                    <Send className="h-4 w-4 mr-2" />
                    Hekimle paylaş
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PatientCase;