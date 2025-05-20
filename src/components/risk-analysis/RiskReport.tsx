
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
        <CardTitle className="text-xl text-center">Teratogenic Risk Report</CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        <div className="space-y-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium">Protocol/ID Number:</p>
              <p className="text-sm text-muted-foreground">{protocol || "_______________"}</p>
            </div>
            <div>
              <p className="text-sm font-medium">Full Name:</p>
              <p className="text-sm text-muted-foreground">{patientName || "_______________"}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <p className="text-sm font-medium">Age:</p>
              <p className="text-sm text-muted-foreground">{age || "_______________"}</p>
            </div>
            <div>
              <p className="text-sm font-medium">Gestation Period:</p>
              <p className="text-sm text-muted-foreground">{gestationPeriod || "_______________"}</p>
            </div>
            <div>
              <p className="text-sm font-medium">Expected Delivery Date:</p>
              <p className="text-sm text-muted-foreground">{expectedBirthDate || "_______________"}</p>
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="text-md font-medium mb-2">Medications Used, Dosages, Duration:</h3>
          <div className="overflow-x-auto">
            <Table className="border">
              <TableHeader className="bg-muted">
                <TableRow>
                  <TableHead className="w-[50px]">No</TableHead>
                  <TableHead>Medication Name</TableHead>
                  <TableHead>Start Date</TableHead>
                  <TableHead>End Date</TableHead>
                  <TableHead>Dosage</TableHead>
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
              <p className="font-medium">{med.id}. {med.name}: FDA Pregnancy Category {med.category}</p>
            </div>
          ))}
        </div>
        
        <div className="border-t pt-4">
          <h3 className="font-semibold text-lg mb-2">CONCLUSION:</h3>
          <div className="space-y-4">
            {medications.map((med) => (
              <div key={med.id} className="space-y-2">
                <p className="font-medium">{med.id}. {med.name}: FDA Pregnancy Category {med.category}</p>
                <p className="text-sm text-gray-700">{med.analysis}</p>
              </div>
            ))}
            
            <p className="text-sm py-2">{conclusion}</p>
          </div>
        </div>
        
        {experts && experts.length > 0 && (
          <div className="border-t pt-4 mt-6">
            <h3 className="font-medium mb-2">APPROVED BY:</h3>
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
