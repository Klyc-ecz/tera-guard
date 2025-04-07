
import React, { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertCircle, FileText, Plus, Save, Trash2, Download } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { nanoid } from 'nanoid';
import { toast } from "sonner";

// Define risk levels with their colors
const riskLevels = {
  low: { label: "Düşük Risk", color: "bg-green-500", description: "Teratojenite riski minimal seviyede." },
  moderate: { label: "Orta Risk", color: "bg-yellow-500", description: "Dikkatle kullanılmalı, risk-fayda dengesi değerlendirilmeli." },
  high: { label: "Yüksek Risk", color: "bg-red-500", description: "Teratojenite riski yüksek, alternatif tedavi düşünülmeli." },
  unknown: { label: "Bilinmeyen", color: "bg-gray-500", description: "Risk seviyesi değerlendirilemedi." }
};

interface Medication {
  id: string;
  name: string;
  dose: string;
  frequency: string;
  startDate: string;
  riskLevel: keyof typeof riskLevels;
  riskDescription: string;
}

interface Patient {
  name: string;
  age: string;
  pregnancyWeek: string;
  medicalHistory: string;
  medications: Medication[];
}

const RiskAnalysis = () => {
  const [patient, setPatient] = useState<Patient>({
    name: "",
    age: "",
    pregnancyWeek: "",
    medicalHistory: "",
    medications: []
  });

  const [newMedication, setNewMedication] = useState<Medication>({
    id: nanoid(),
    name: "",
    dose: "",
    frequency: "",
    startDate: "",
    riskLevel: "unknown",
    riskDescription: riskLevels.unknown.description
  });

  const handlePatientChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setPatient(prev => ({ ...prev, [name]: value }));
  };

  const handleMedicationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewMedication(prev => ({ ...prev, [name]: value }));
  };

  const handleRiskLevelChange = (value: keyof typeof riskLevels) => {
    setNewMedication(prev => ({
      ...prev,
      riskLevel: value,
      riskDescription: riskLevels[value].description
    }));
  };

  const addMedication = () => {
    if (!newMedication.name) {
      toast.error("İlaç adı girilmelidir");
      return;
    }

    setPatient(prev => ({
      ...prev,
      medications: [...prev.medications, newMedication]
    }));

    setNewMedication({
      id: nanoid(),
      name: "",
      dose: "",
      frequency: "",
      startDate: "",
      riskLevel: "unknown",
      riskDescription: riskLevels.unknown.description
    });

    toast.success("İlaç eklendi");
  };

  const removeMedication = (id: string) => {
    setPatient(prev => ({
      ...prev,
      medications: prev.medications.filter(med => med.id !== id)
    }));
    toast.info("İlaç kaldırıldı");
  };

  const generateReport = () => {
    if (!patient.name) {
      toast.error("Hasta bilgileri girilmelidir");
      return;
    }
    
    toast.success("Rapor başarıyla oluşturuldu");
    // Here we would usually generate a PDF or other report format
    // For now we'll just console.log the data
    console.log("Generated report for:", patient);
  };

  return (
    <Layout>
      <div className="container mx-auto py-6 space-y-6">
        <h1 className="text-3xl font-bold">Teratojenik Risk Değerlendirmesi</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Patient Information Card */}
          <Card>
            <CardHeader>
              <CardTitle>Hasta Bilgileri</CardTitle>
              <CardDescription>Değerlendirme için hasta bilgilerini girin</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Hasta Adı</Label>
                <Input id="name" name="name" value={patient.name} onChange={handlePatientChange} placeholder="Hasta adını girin" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="age">Yaş</Label>
                <Input id="age" name="age" value={patient.age} onChange={handlePatientChange} placeholder="Hasta yaşını girin" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="pregnancyWeek">Gebelik Haftası</Label>
                <Input id="pregnancyWeek" name="pregnancyWeek" value={patient.pregnancyWeek} onChange={handlePatientChange} placeholder="Gebelik haftasını girin" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="medicalHistory">Tıbbi Geçmiş</Label>
                <Textarea id="medicalHistory" name="medicalHistory" value={patient.medicalHistory} onChange={handlePatientChange} placeholder="Hastanın tıbbi geçmişini girin" />
              </div>
            </CardContent>
          </Card>

          {/* Medication Addition Card */}
          <Card>
            <CardHeader>
              <CardTitle>İlaç Ekle</CardTitle>
              <CardDescription>Değerlendirilecek ilacı ekleyin</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="medicationName">İlaç Adı</Label>
                <Input id="medicationName" name="name" value={newMedication.name} onChange={handleMedicationChange} placeholder="İlaç adını girin" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="dose">Doz</Label>
                  <Input id="dose" name="dose" value={newMedication.dose} onChange={handleMedicationChange} placeholder="İlaç dozunu girin" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="frequency">Kullanım Sıklığı</Label>
                  <Input id="frequency" name="frequency" value={newMedication.frequency} onChange={handleMedicationChange} placeholder="Örn: Günde 2 kere" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="startDate">Başlangıç Tarihi</Label>
                <Input id="startDate" name="startDate" type="date" value={newMedication.startDate} onChange={handleMedicationChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="riskLevel">Risk Seviyesi</Label>
                <Select value={newMedication.riskLevel} onValueChange={(value: keyof typeof riskLevels) => handleRiskLevelChange(value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Risk seviyesi seçin" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(riskLevels).map(([key, { label }]) => (
                      <SelectItem key={key} value={key}>
                        <div className="flex items-center gap-2">
                          <div className={`w-3 h-3 rounded-full ${riskLevels[key as keyof typeof riskLevels].color}`}></div>
                          <span>{label}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="riskDescription">Risk Açıklaması</Label>
                <Textarea id="riskDescription" value={newMedication.riskDescription} readOnly className="bg-gray-50" />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={addMedication} className="w-full">
                <Plus className="mr-2 h-4 w-4" /> İlaç Ekle
              </Button>
            </CardFooter>
          </Card>
        </div>

        {/* Medications List */}
        <Card>
          <CardHeader>
            <CardTitle>Eklenen İlaçlar</CardTitle>
            <CardDescription>Değerlendirilecek ilaçların listesi</CardDescription>
          </CardHeader>
          <CardContent>
            {patient.medications.length > 0 ? (
              <div className="space-y-4">
                {patient.medications.map((med) => (
                  <div key={med.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="space-y-1">
                      <div className="font-medium">{med.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {med.dose} • {med.frequency} • Başlangıç: {med.startDate || "Belirtilmemiş"}
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <div className={`w-3 h-3 rounded-full ${riskLevels[med.riskLevel].color}`}></div>
                        <span className="text-sm">{riskLevels[med.riskLevel].label}</span>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => removeMedication(med.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6 text-muted-foreground">
                Henüz ilaç eklenmedi
              </div>
            )}
          </CardContent>
        </Card>

        {/* Risk Assessment */}
        {patient.medications.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Teratojenite Risk Değerlendirmesi</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {patient.medications.some(med => med.riskLevel === "high") && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Yüksek Risk Tespit Edildi</AlertTitle>
                  <AlertDescription>
                    Hastanın kullandığı ilaçlar arasında yüksek teratojenite riski olan ilaçlar bulunmaktadır. 
                    Tedavi planı yeniden değerlendirilmelidir.
                  </AlertDescription>
                </Alert>
              )}
              
              {patient.medications.some(med => med.riskLevel === "moderate") && !patient.medications.some(med => med.riskLevel === "high") && (
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Orta Seviye Risk Tespit Edildi</AlertTitle>
                  <AlertDescription>
                    Hastanın kullandığı ilaçlar arasında orta düzeyde teratojenite riski olan ilaçlar bulunmaktadır.
                    Risk-fayda dengesi değerlendirilmelidir.
                  </AlertDescription>
                </Alert>
              )}
              
              {patient.medications.every(med => med.riskLevel === "low") && (
                <Alert className="bg-green-50 border-green-200">
                  <AlertCircle className="h-4 w-4 text-green-600" />
                  <AlertTitle className="text-green-800">Düşük Risk Tespit Edildi</AlertTitle>
                  <AlertDescription className="text-green-700">
                    Hastanın kullandığı tüm ilaçlar düşük teratojenite riski taşımaktadır.
                  </AlertDescription>
                </Alert>
              )}
              
              <div className="pt-2">
                <h3 className="font-medium mb-2">İlaç Bazlı Değerlendirme</h3>
                <div className="space-y-2">
                  {patient.medications.map(med => (
                    <div key={med.id} className="p-3 border rounded-md">
                      <div className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full ${riskLevels[med.riskLevel].color}`}></div>
                        <span className="font-medium">{med.name}</span>
                      </div>
                      <p className="mt-1 text-sm text-muted-foreground">{med.riskDescription}</p>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-2">
              <Button onClick={generateReport} className="w-full">
                <FileText className="mr-2 h-4 w-4" /> Rapor Oluştur
              </Button>
              <Button variant="outline" className="w-full">
                <Download className="mr-2 h-4 w-4" /> PDF Olarak İndir
              </Button>
            </CardFooter>
          </Card>
        )}
      </div>
    </Layout>
  );
};

export default RiskAnalysis;
