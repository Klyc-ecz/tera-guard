
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { User, KeyRound, ShieldCheck, ShieldAlert } from "lucide-react";

// Form schema
const loginSchema = z.object({
  email: z.string().email({ message: "Geçerli bir e-posta adresi giriniz" }),
  password: z.string().min(6, { message: "Şifre en az 6 karakter olmalıdır" }),
});

const Login = () => {
  const navigate = useNavigate();
  const [userType, setUserType] = useState<"pharmacist" | "doctor">("pharmacist");
  
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  });

  const onSubmit = (values: z.infer<typeof loginSchema>) => {
    // Demo login simulation
    console.log(`${userType} login:`, values);
    
    // In a real app, an API call would be made here
    toast.success(`${userType === "pharmacist" ? "Eczacı" : "Hekim"} girişi başarılı!`);
    
    // Redirect to home page
    setTimeout(() => navigate("/"), 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-primary/5 to-secondary/5 relative">
      {/* Background gradient elements */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full filter blur-3xl"></div>
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-secondary/10 rounded-full filter blur-3xl"></div>
      
      <Card className="w-full max-w-md shadow-lg border-0 bg-white/90 backdrop-blur-sm">
        <CardHeader className="space-y-1 text-center">
          <div className="mx-auto w-20 h-20 mb-4 flex items-center justify-center rounded-full bg-primary/10">
            <ShieldCheck className="h-12 w-12 text-primary" />
          </div>
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">TeraGuard</CardTitle>
          <CardDescription className="text-muted-foreground">
            Emzirme döneminde güvenli ilaç kullanımı için giriş yapın
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <Tabs 
            defaultValue="pharmacist" 
            className="w-full"
            onValueChange={(value) => setUserType(value as "pharmacist" | "doctor")}
          >
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="pharmacist" className="flex items-center gap-2">
                <KeyRound className="h-4 w-4" />
                Eczacı Girişi
              </TabsTrigger>
              <TabsTrigger value="doctor" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                Hekim Girişi
              </TabsTrigger>
            </TabsList>

            <TabsContent value="pharmacist" className="space-y-4">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>E-posta Adresi</FormLabel>
                        <FormControl>
                          <Input placeholder="ornek@eczane.com" {...field} className="h-11" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Şifre</FormLabel>
                        <FormControl>
                          <Input type="password" placeholder="******" {...field} className="h-11" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" size="lg" className="w-full mt-6 bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity">
                    Giriş Yap
                  </Button>
                </form>
              </Form>
            </TabsContent>

            <TabsContent value="doctor" className="space-y-4">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>E-posta Adresi</FormLabel>
                        <FormControl>
                          <Input placeholder="ornek@hastane.com" {...field} className="h-11" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Şifre</FormLabel>
                        <FormControl>
                          <Input type="password" placeholder="******" {...field} className="h-11" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" size="lg" className="w-full mt-6 bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity">
                    Giriş Yap
                  </Button>
                </form>
              </Form>
            </TabsContent>
          </Tabs>

          <div className="text-center text-sm">
            <a href="#" className="text-primary hover:underline hover:text-primary/80 transition-colors">
              Şifremi unuttum
            </a>
          </div>
        </CardContent>
        
        <CardFooter className="flex flex-col">
          <p className="text-center text-sm text-muted-foreground mt-2">
            Henüz hesabınız yok mu?{" "}
            <a href="#" className="text-primary font-medium hover:underline hover:text-primary/80 transition-colors">
              Kayıt ol
            </a>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
