
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
              <CardTitle className="text-2xl font-bold">Profile</CardTitle>
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <Settings className="h-4 w-4" />
                Edit Profile
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
                  Upload Photo
                </Button>
              </div>
              
              <div className="space-y-4 w-full">
                <div>
                  <h2 className="text-xl font-semibold">Dr. John Smith</h2>
                  <p className="text-muted-foreground">Pediatrician</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Email</h3>
                    <p>john.smith@example.com</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Institution</h3>
                    <p>City Hospital</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Specialty</h3>
                    <p>Pediatrics</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Membership</h3>
                    <p>Premium Member</p>
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
              Saved Medications
            </TabsTrigger>
            <TabsTrigger value="questions" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              Questions & Answers
            </TabsTrigger>
            <TabsTrigger value="history" className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              History
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="saved" className="mt-4">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Saved Medications</h3>
                <ul className="space-y-2">
                  <li className="p-3 border rounded-md hover:bg-muted transition-colors">
                    <a href="/drug-info/1" className="flex justify-between items-center">
                      <div>
                        <h4 className="font-medium">Paracetamol</h4>
                        <p className="text-sm text-muted-foreground">Acetaminophen</p>
                      </div>
                      <span className="risk-tag risk-safe">Safe</span>
                    </a>
                  </li>
                  <li className="p-3 border rounded-md hover:bg-muted transition-colors">
                    <a href="/drug-info/3" className="flex justify-between items-center">
                      <div>
                        <h4 className="font-medium">Ibuprofen</h4>
                        <p className="text-sm text-muted-foreground">Brufen</p>
                      </div>
                      <span className="risk-tag risk-caution">Caution</span>
                    </a>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="questions" className="mt-4">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Questions & Answers</h3>
                <div className="space-y-4">
                  <div className="p-4 border rounded-md">
                    <div className="flex justify-between mb-2">
                      <h4 className="font-medium">Alprazolam safety during breastfeeding</h4>
                      <span className="text-xs text-muted-foreground">2 days ago</span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      Can a patient who needs alprazolam for anxiety treatment continue breastfeeding?
                    </p>
                    <div className="bg-muted p-3 rounded-md">
                      <p className="text-sm mb-1"><span className="font-medium">Dr. Sarah Johnson (Psychiatry):</span> Alprazolam passes into breast milk and can cause sedation. It can be used in low doses for short periods when necessary, but alternatives like lorazepam are safer.</p>
                    </div>
                  </div>
                  
                  <div className="p-4 border rounded-md">
                    <div className="flex justify-between mb-2">
                      <h4 className="font-medium">Metronidazole and breastfeeding</h4>
                      <span className="text-xs text-muted-foreground">1 week ago</span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      A mother with a 2-month-old baby needs metronidazole for a dental infection. Should she interrupt breastfeeding during short-term treatment?
                    </p>
                    <div className="bg-muted p-3 rounded-md">
                      <p className="text-sm mb-1"><span className="font-medium">Dr. Emma Wilson (Dental Medicine):</span> It is recommended to pause breastfeeding for 12-24 hours during metronidazole treatment. Clindamycin can be considered as an alternative.</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="history" className="mt-4">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Search History</h3>
                <ul className="space-y-2">
                  <li className="flex justify-between items-center p-3 border-b">
                    <div className="flex items-center gap-3">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>Sertraline</span>
                    </div>
                    <span className="text-xs text-muted-foreground">Today, 14:35</span>
                  </li>
                  <li className="flex justify-between items-center p-3 border-b">
                    <div className="flex items-center gap-3">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>Amoxicillin</span>
                    </div>
                    <span className="text-xs text-muted-foreground">Yesterday, 09:15</span>
                  </li>
                  <li className="flex justify-between items-center p-3 border-b">
                    <div className="flex items-center gap-3">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>Paracetamol</span>
                    </div>
                    <span className="text-xs text-muted-foreground">3 days ago</span>
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
