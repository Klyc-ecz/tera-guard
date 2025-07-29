import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { User, Briefcase, ShieldCheck } from "lucide-react";

// Form schema
const loginSchema = z.object({
  email: z.string().email({
    message: "Geçerli bir e-posta adresi girin"
  }),
  password: z.string().min(6, {
    message: "Şifre en az 6 karakter olmalı"
  })
});
const Login = () => {
  const navigate = useNavigate();
  const [selectedUserType, setSelectedUserType] = useState<string | null>(null);
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  });
  const handleLogin = (values: z.infer<typeof loginSchema>) => {
    const userTypeText = selectedUserType === "doctor" ? "Hekim" : "Saha Temsilcisi";
    console.log(`${userTypeText} girişi:`, values);
    toast.success(`${userTypeText} girişi başarılı!`);

    // Redirect to home page
    setTimeout(() => navigate("/"), 1500);
  };
  const handleUserTypeSelect = (userType: string) => {
    setSelectedUserType(userType);
  };
  if (!selectedUserType) {
    return <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-secondary/20 to-primary/10 font-inter">
        <div className="w-full max-w-md space-y-8">
          {/* NEUTEC Logo Area */}
          <div className="text-center mb-12">
            <div className="mx-auto w-20 h-20 mb-6 flex items-center justify-center rounded-full bg-primary/10 border-2 border-primary/20">
              <ShieldCheck className="h-12 w-12 text-primary" />
            </div>
            <p className="text-sm text-muted-foreground uppercase tracking-wider">NEUTEC İlaç</p>
          </div>

          {/* NEU-GUARD Title */}
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent mb-2">
              NEU-GUARD
            </h1>
            <p className="text-muted-foreground text-sm">
          </p>
          </div>

          {/* Login Type Selection */}
          <div className="space-y-4">
            <Button onClick={() => handleUserTypeSelect("doctor")} variant="outline" size="lg" className="w-full h-16 text-lg font-medium hover:bg-primary hover:text-primary-foreground transition-all duration-300 rounded-xl border-2 hover:border-primary group">
              <User className="h-6 w-6 mr-3 group-hover:scale-110 transition-transform" />
              Hekim Girişi
            </Button>
            
            <Button onClick={() => handleUserTypeSelect("representative")} variant="outline" size="lg" className="w-full h-16 text-lg font-medium hover:bg-primary hover:text-primary-foreground transition-all duration-300 rounded-xl border-2 hover:border-primary group">
              <Briefcase className="h-6 w-6 mr-3 group-hover:scale-110 transition-transform" />
              Saha Temsilcisi Girişi
            </Button>
          </div>

          <div className="text-center mt-8">
            <p className="text-xs text-muted-foreground">
              NEUTEC İlaç güvencesiyle
            </p>
          </div>
        </div>
      </div>;
  }
  return <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-secondary/20 to-primary/10 font-inter">
      <Card className="w-full max-w-md shadow-2xl border-0 bg-white/95 backdrop-blur-sm rounded-2xl">
        <CardHeader className="space-y-1 text-center pb-8">
          <div className="mx-auto w-16 h-16 mb-4 flex items-center justify-center rounded-full bg-primary/10">
            {selectedUserType === "doctor" ? <User className="h-8 w-8 text-primary" /> : <Briefcase className="h-8 w-8 text-primary" />}
          </div>
          <h2 className="text-2xl font-bold text-primary">
            {selectedUserType === "doctor" ? "Hekim Girişi" : "Saha Temsilcisi Girişi"}
          </h2>
          <p className="text-sm text-muted-foreground">
            NEU-GUARD platformuna giriş yapın
          </p>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleLogin)} className="space-y-6">
              <FormField control={form.control} name="email" render={({
              field
            }) => <FormItem>
                    <FormLabel className="text-sm font-medium">E-posta Adresi</FormLabel>
                    <FormControl>
                      <Input placeholder={selectedUserType === "doctor" ? "hekim@hastane.com" : "temsilci@neutec.com"} {...field} className="h-12 rounded-lg border-2 focus:border-primary" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>} />
              <FormField control={form.control} name="password" render={({
              field
            }) => <FormItem>
                    <FormLabel className="text-sm font-medium">Şifre</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="••••••••" {...field} className="h-12 rounded-lg border-2 focus:border-primary" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>} />
              
              <div className="space-y-4">
                <Button type="submit" size="lg" className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-medium rounded-lg transition-all duration-300">
                  Giriş Yap
                </Button>
                
                <Button type="button" variant="ghost" onClick={() => setSelectedUserType(null)} className="w-full text-muted-foreground hover:text-foreground">
                  ← Geri Dön
                </Button>
              </div>
            </form>
          </Form>

          <div className="text-center">
            <a href="#" className="text-sm text-primary hover:underline">
              Şifremi Unuttum
            </a>
          </div>
        </CardContent>
      </Card>
    </div>;
};
export default Login;