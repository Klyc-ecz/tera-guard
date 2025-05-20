
import React, { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertCircle, FileText, Plus, Save, Trash2, Download, Printer } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { nanoid } from 'nanoid';
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import RiskReport from "@/components/risk-analysis/RiskReport";

const riskLevels = {
  low: { label: "Low Risk", color: "bg-green-500", description: "Minimal teratogenic risk." },
  moderate: { label: "Moderate Risk", color: "bg-yellow-500", description: "Use with caution, evaluate risk-benefit ratio." },
  high: { label: "High Risk", color: "bg-red-500", description: "High teratogenic risk, consider alternative treatment." },
  unknown: { label: "Unknown", color: "bg-gray-500", description: "Risk level could not be assessed." }
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

const sampleMedications = [
  {
    id: 1,
    name: "TETRADOX 100 MG CAPSULE (Doxycycline hyclate)",
    startDate: "11/11/24",
    endDate: "25/11/24",
    dose: "1 every 2 days",
    category: "D",
    analysis: "FDA pregnancy category D. Animal studies show that tetracyclines cross the placenta, are found in fetal tissues, and can cause toxic effects in the developing fetus (mostly related to delayed skeletal development). Signs of embryotoxicity have been observed in animals treated with tetracyclines during early pregnancy. If tetracyclines are used during pregnancy or if the patient becomes pregnant while using tetracyclines, the patient should be informed about possible harm to the fetus. There are no adequate and well-controlled clinical studies in pregnant women. Most studies on doxycycline use during pregnancy focus on short-term first-trimester use. According to an expert review by the TERIS Teratogen Information System of published data on doxycycline use during pregnancy, the likelihood of teratogenic risk when given at therapeutic doses during pregnancy is low, but the data are insufficient to state that there is no risk."
  },
  {
    id: 2,
    name: "GYNOMAX XL VAGINAL OVULE (Tioconazole, Tinidazole, Lidocaine HCl)",
    startDate: "11/11/24",
    endDate: "14/11/24",
    dose: "1X1",
    category: "C",
    analysis: "FDA pregnancy category C. Tinidazole crosses the placenta. Animal studies are insufficient regarding effects on pregnancy and/or embryonal/fetal development or birth and postnatal development. The potential risk to humans is unknown. In pregnant women, during the second and third trimesters, the benefit/risk ratio should be assessed by the physician, and the product should not be used during pregnancy unless necessary."
  },
  {
    id: 3,
    name: "RENNIE CHEWABLE TABLET (Calcium carbonate, Magnesium carbonate)",
    startDate: "16/11/24",
    endDate: "26/11/24",
    dose: "1X1",
    category: "B",
    analysis: "FDA pregnancy category B. Animal studies do not indicate direct or indirect harmful effects on reproductive toxicity. Data from numerous pregnancy exposures do not indicate any adverse effects of RENNIE on pregnancy or on the health of the fetus/newborn child. No significant epidemiological data have been obtained to date."
  },
  {
    id: 4,
    name: "LANSOR 30 MG TABLET (lansoprazole)",
    startDate: "16/11/24",
    endDate: "18/11/24",
    dose: "1X1",
    category: "B",
    analysis: "FDA pregnancy category B. There are no clinical data available on lansoprazole exposure in pregnant women. Animal studies do not indicate direct or indirect harmful effects with respect to pregnancy, embryonal/fetal development, birth or postnatal development. However, since the patient used only 2 doses, the risk of teratogenicity can be considered low."
  }
];

const experts = [
  "Prof. Dr. Robert Johnson\nDepartment of Medical Pharmacology",
  "Prof. Dr. James Wilson\nDepartment of Medical Pharmacology",
  "Dr. Lisa Parker\nDepartment of Medical Pharmacology",
  "Pharm. David Miller\nClinical Pharmacist"
];

const RiskAnalysis = () => {
  const [patient, setPatient] = useState<Patient>({
    name: "",
    age: "",
    pregnancyWeek: "",
    medicalHistory: "",
    medications: []
  });

  const [activeTab, setActiveTab] = useState("form");

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
      toast.error("Medication name must be entered");
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

    toast.success("Medication added");
  };

  const removeMedication = (id: string) => {
    setPatient(prev => ({
      ...prev,
      medications: prev.medications.filter(med => med.id !== id)
    }));
    toast.info("Medication removed");
  };

  const generateReport = () => {
    if (!patient.name) {
      toast.error("Patient information must be entered");
      return;
    }
    
    setActiveTab("report");
    toast.success("Report successfully generated");
  };

  const handlePrint = () => {
    toast.success("Printing report...");
    window.print();
  };

  return (
    <Layout>
      <div className="container mx-auto py-6 space-y-6">
        <h1 className="text-3xl font-bold">Teratogenic Risk Assessment</h1>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList>
            <TabsTrigger value="form">Form</TabsTrigger>
            <TabsTrigger value="report">Report</TabsTrigger>
            <TabsTrigger value="example">Sample Report</TabsTrigger>
          </TabsList>
          
          <TabsContent value="form" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Patient Information</CardTitle>
                  <CardDescription>Enter patient information for assessment</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Patient Name</Label>
                    <Input id="name" name="name" value={patient.name} onChange={handlePatientChange} placeholder="Enter patient name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="age">Age</Label>
                    <Input id="age" name="age" value={patient.age} onChange={handlePatientChange} placeholder="Enter patient age" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="pregnancyWeek">Pregnancy Week</Label>
                    <Input id="pregnancyWeek" name="pregnancyWeek" value={patient.pregnancyWeek} onChange={handlePatientChange} placeholder="Enter pregnancy week" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="medicalHistory">Medical History</Label>
                    <Textarea id="medicalHistory" name="medicalHistory" value={patient.medicalHistory} onChange={handlePatientChange} placeholder="Enter patient's medical history" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Add Medication</CardTitle>
                  <CardDescription>Add medication to be assessed</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="medicationName">Medication Name</Label>
                    <Input id="medicationName" name="name" value={newMedication.name} onChange={handleMedicationChange} placeholder="Enter medication name" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="dose">Dosage</Label>
                      <Input id="dose" name="dose" value={newMedication.dose} onChange={handleMedicationChange} placeholder="Enter medication dosage" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="frequency">Frequency</Label>
                      <Input id="frequency" name="frequency" value={newMedication.frequency} onChange={handleMedicationChange} placeholder="E.g., Twice daily" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="startDate">Start Date</Label>
                    <Input id="startDate" name="startDate" type="date" value={newMedication.startDate} onChange={handleMedicationChange} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="riskLevel">Risk Level</Label>
                    <Select value={newMedication.riskLevel} onValueChange={(value: keyof typeof riskLevels) => handleRiskLevelChange(value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select risk level" />
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
                    <Label htmlFor="riskDescription">Risk Description</Label>
                    <Textarea id="riskDescription" value={newMedication.riskDescription} readOnly className="bg-gray-50" />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button onClick={addMedication} className="w-full">
                    <Plus className="mr-2 h-4 w-4" /> Add Medication
                  </Button>
                </CardFooter>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Added Medications</CardTitle>
                <CardDescription>List of medications to be assessed</CardDescription>
              </CardHeader>
              <CardContent>
                {patient.medications.length > 0 ? (
                  <div className="space-y-4">
                    {patient.medications.map((med) => (
                      <div key={med.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="space-y-1">
                          <div className="font-medium">{med.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {med.dose} • {med.frequency} • Start: {med.startDate || "Not specified"}
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
                    No medications added yet
                  </div>
                )}
              </CardContent>
            </Card>

            {patient.medications.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Teratogenic Risk Assessment</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {patient.medications.some(med => med.riskLevel === "high") && (
                    <Alert variant="destructive">
                      <AlertCircle className="h-4 w-4" />
                      <AlertTitle>High Risk Detected</AlertTitle>
                      <AlertDescription>
                        The patient is using medications with high teratogenic risk. 
                        Treatment plan should be re-evaluated.
                      </AlertDescription>
                    </Alert>
                  )}
                  
                  {patient.medications.some(med => med.riskLevel === "moderate") && !patient.medications.some(med => med.riskLevel === "high") && (
                    <Alert>
                      <AlertCircle className="h-4 w-4" />
                      <AlertTitle>Moderate Risk Detected</AlertTitle>
                      <AlertDescription>
                        The patient is using medications with moderate teratogenic risk.
                        Risk-benefit ratio should be evaluated.
                      </AlertDescription>
                    </Alert>
                  )}
                  
                  {patient.medications.every(med => med.riskLevel === "low") && (
                    <Alert className="bg-green-50 border-green-200">
                      <AlertCircle className="h-4 w-4 text-green-600" />
                      <AlertTitle className="text-green-800">Low Risk Detected</AlertTitle>
                      <AlertDescription className="text-green-700">
                        All medications used by the patient carry low teratogenic risk.
                      </AlertDescription>
                    </Alert>
                  )}
                  
                  <div className="pt-2">
                    <h3 className="font-medium mb-2">Medication-Based Assessment</h3>
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
                    <FileText className="mr-2 h-4 w-4" /> Generate Report
                  </Button>
                </CardFooter>
              </Card>
            )}
          </TabsContent>
          
          <TabsContent value="report">
            <div className="space-y-4">
              <div className="flex justify-end">
                <Button onClick={handlePrint} variant="outline" size="sm" className="gap-2">
                  <Printer className="h-4 w-4" />
                  Print
                </Button>
              </div>
              
              {patient.name ? (
                <RiskReport 
                  patientName={patient.name}
                  age={patient.age}
                  gestationPeriod={patient.pregnancyWeek}
                  medications={patient.medications.map((med, index) => ({
                    id: index + 1,
                    name: med.name,
                    startDate: med.startDate,
                    endDate: "",
                    dose: med.dose || med.frequency,
                    category: med.riskLevel === "high" ? "D" : med.riskLevel === "moderate" ? "C" : "B",
                    analysis: med.riskDescription
                  }))}
                  conclusion="The patient should be evaluated in light of the information provided in this report, along with physical examination and laboratory findings."
                  experts={experts}
                />
              ) : (
                <div className="text-center py-12">
                  <p className="text-xl text-muted-foreground">No report generated yet</p>
                  <p className="text-sm text-muted-foreground mt-2">Please enter patient information and generate a report first</p>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="example">
            <div className="space-y-4">
              <div className="flex justify-end">
                <Button onClick={handlePrint} variant="outline" size="sm" className="gap-2">
                  <Printer className="h-4 w-4" />
                  Print
                </Button>
              </div>
              
              <RiskReport 
                patientName="_______________"
                age="30"
                gestationPeriod="12w / 5 days"
                expectedBirthDate="15/09/24"
                medications={sampleMedications}
                conclusion="The patient should be evaluated in light of the information provided in this report, along with physical examination and laboratory findings."
                experts={experts}
              />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default RiskAnalysis;
