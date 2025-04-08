
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface Medication {
  id: number;
  name: string;
  startDate: string;
  endDate: string;
  dose: string;
  category: string;
  analysis: string;
}

interface RiskReportProps {
  protocol?: string;
  patientName?: string;
  age?: string;
  gestationPeriod?: string;
  expectedBirthDate?: string;
  medications: Medication[];
  conclusion: string;
  experts?: string[];
  onPrint?: () => void;
}

const RiskReport: React.FC<RiskReportProps> = ({
  protocol,
  patientName,
  age,
  gestationPeriod,
  expectedBirthDate,
  medications,
  conclusion,
  experts,
  onPrint
}) => {
  return (
    <Card className="shadow-lg">
      <CardHeader className="bg-primary/5 border-b">
        <CardTitle className="text-xl text-center">Teratojenik Risk Raporu</CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        <div className="space-y-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium">Protokol/T.C. Kimlik no:</p>
              <p className="text-sm text-muted-foreground">{protocol || "_______________"}</p>
            </div>
            <div>
              <p className="text-sm font-medium">Adı soyadı:</p>
              <p className="text-sm text-muted-foreground">{patientName || "_______________"}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <p className="text-sm font-medium">Yaşı:</p>
              <p className="text-sm text-muted-foreground">{age || "_______________"}</p>
            </div>
            <div>
              <p className="text-sm font-medium">Gestasyon süresi:</p>
              <p className="text-sm text-muted-foreground">{gestationPeriod || "_______________"}</p>
            </div>
            <div>
              <p className="text-sm font-medium">SAT:</p>
              <p className="text-sm text-muted-foreground">{expectedBirthDate || "_______________"}</p>
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="text-md font-medium mb-2">Kullanılan İlaçlar, dozları, süreleri:</h3>
          <div className="overflow-x-auto">
            <Table className="border">
              <TableHeader className="bg-muted">
                <TableRow>
                  <TableHead className="w-[50px]">Sıra no</TableHead>
                  <TableHead>İlacın adı</TableHead>
                  <TableHead>İlacın başlangıç tarihi</TableHead>
                  <TableHead>İlacın bitiş tarihi</TableHead>
                  <TableHead>İlacın dozu</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {medications.map((med) => (
                  <TableRow key={med.id}>
                    <TableCell className="font-medium">{med.id}</TableCell>
                    <TableCell>{med.name}</TableCell>
                    <TableCell>{med.startDate}</TableCell>
                    <TableCell>{med.endDate}</TableCell>
                    <TableCell>{med.dose}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
        
        <div className="space-y-3">
          {medications.map((med) => (
            <div key={med.id} className="border rounded-md p-3">
              <p className="font-medium">{med.id}. {med.name}: Gebelikte kullanımı FDA'ya göre {med.category} kategorisindedir.</p>
            </div>
          ))}
        </div>
        
        <div className="border-t pt-4">
          <h3 className="font-semibold text-lg mb-2">SONUÇ:</h3>
          <div className="space-y-4">
            {medications.map((med) => (
              <div key={med.id} className="space-y-2">
                <p className="font-medium">{med.id}. {med.name}: Gebelikte kullanımı FDA'ya göre {med.category} kategorisindedir.</p>
                <p className="text-sm text-gray-700">{med.analysis}</p>
              </div>
            ))}
            
            <p className="text-sm py-2">{conclusion}</p>
          </div>
        </div>
        
        {experts && experts.length > 0 && (
          <div className="border-t pt-4 mt-6">
            <h3 className="font-medium mb-2">ONAYLAYAN UZMAN DR.:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {experts.map((expert, index) => (
                <div key={index} className="text-center">
                  <p className="text-sm">{expert}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RiskReport;
