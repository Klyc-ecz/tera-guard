
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { User, KeyRound } from "lucide-react";

// Form şemaları
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
    // Demo amaçlı basit bir giriş simülasyonu
    console.log(`${userType} girişi:`, values);
    
    // Gerçek bir uygulamada burada API çağrısı yapılır
    toast.success(`${userType === "pharmacist" ? "Eczacı" : "Hekim"} girişi başarılı!`);
    
    // Ana sayfaya yönlendir
    setTimeout(() => navigate("/"), 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold">LactaMed Insight</CardTitle>
          <CardDescription>
            Emzirme döneminde güvenli ilaç kullanımı için giriş yapın
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <Tabs 
            defaultValue="pharmacist" 
            className="w-full"
            onValueChange={(value) => setUserType(value as "pharmacist" | "doctor")}
          >
            <TabsList className="grid w-full grid-cols-2 mb-4">
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
                          <Input placeholder="ornek@eczane.com" {...field} />
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
                          <Input type="password" placeholder="******" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full">
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
                          <Input placeholder="ornek@hastane.com" {...field} />
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
                          <Input type="password" placeholder="******" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full">
                    Giriş Yap
                  </Button>
                </form>
              </Form>
            </TabsContent>
          </Tabs>

          <div className="text-center text-sm">
            <a href="#" className="text-primary hover:underline">
              Şifremi unuttum
            </a>
          </div>
        </CardContent>
        
        <CardFooter className="flex flex-col">
          <p className="text-center text-sm text-muted-foreground mt-2">
            Henüz hesabınız yok mu?{" "}
            <a href="#" className="text-primary hover:underline">
              Kayıt ol
            </a>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
