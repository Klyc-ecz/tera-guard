
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
import { User, KeyRound, ShieldCheck, ShieldAlert, UserPlus, Mail, Lock, Building } from "lucide-react";

// Form schema
const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

const registerSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
  confirmPassword: z.string().min(6, { message: "Password must be at least 6 characters" }),
  institution: z.string().optional(),
  userType: z.enum(["pharmacist", "doctor"]),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

const Login = () => {
  const navigate = useNavigate();
  const [userType, setUserType] = useState<"pharmacist" | "doctor">("pharmacist");
  const [authMode, setAuthMode] = useState<"login" | "register">("login");
  
  const loginForm = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  });

  const registerForm = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      institution: "",
      userType: userType
    }
  });

  React.useEffect(() => {
    registerForm.setValue("userType", userType);
  }, [userType, registerForm]);

  const handleLogin = (values: z.infer<typeof loginSchema>) => {
    // Demo login simulation
    console.log(`${userType} login:`, values);
    
    toast.success(`${userType === "pharmacist" ? "Pharmacist" : "Doctor"} login successful!`);
    
    // Redirect to home page
    setTimeout(() => navigate("/"), 1500);
  };

  const handleRegister = (values: z.infer<typeof registerSchema>) => {
    console.log(`${userType} register:`, values);
    
    toast.success(`${userType === "pharmacist" ? "Pharmacist" : "Doctor"} registration successful! Please log in.`);
    
    // Switch to login mode after successful registration
    setAuthMode("login");
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
            {authMode === "login" ? "Log in" : "Register"} for safe medication use during breastfeeding
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
                Pharmacist
              </TabsTrigger>
              <TabsTrigger value="doctor" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                Doctor
              </TabsTrigger>
            </TabsList>

            <TabsContent value="pharmacist" className="space-y-4">
              {authMode === "login" ? (
                <Form {...loginForm}>
                  <form onSubmit={loginForm.handleSubmit(handleLogin)} className="space-y-4">
                    <FormField
                      control={loginForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email Address</FormLabel>
                          <FormControl>
                            <Input placeholder="example@pharmacy.com" {...field} className="h-11" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={loginForm.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <Input type="password" placeholder="******" {...field} className="h-11" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit" size="lg" className="w-full mt-6 bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity">
                      Log In
                    </Button>
                  </form>
                </Form>
              ) : (
                <Form {...registerForm}>
                  <form onSubmit={registerForm.handleSubmit(handleRegister)} className="space-y-4">
                    <FormField
                      control={registerForm.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Full Name" {...field} className="h-11" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={registerForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email Address</FormLabel>
                          <FormControl>
                            <Input placeholder="example@pharmacy.com" {...field} className="h-11" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={registerForm.control}
                      name="institution"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Institution</FormLabel>
                          <FormControl>
                            <Input placeholder="Pharmacy/Hospital Name" {...field} className="h-11" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={registerForm.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <Input type="password" placeholder="******" {...field} className="h-11" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={registerForm.control}
                      name="confirmPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Confirm Password</FormLabel>
                          <FormControl>
                            <Input type="password" placeholder="******" {...field} className="h-11" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit" size="lg" className="w-full mt-6 bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity">
                      Register
                    </Button>
                  </form>
                </Form>
              )}
            </TabsContent>

            <TabsContent value="doctor" className="space-y-4">
              {authMode === "login" ? (
                <Form {...loginForm}>
                  <form onSubmit={loginForm.handleSubmit(handleLogin)} className="space-y-4">
                    <FormField
                      control={loginForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email Address</FormLabel>
                          <FormControl>
                            <Input placeholder="example@hospital.com" {...field} className="h-11" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={loginForm.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <Input type="password" placeholder="******" {...field} className="h-11" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit" size="lg" className="w-full mt-6 bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity">
                      Log In
                    </Button>
                  </form>
                </Form>
              ) : (
                <Form {...registerForm}>
                  <form onSubmit={registerForm.handleSubmit(handleRegister)} className="space-y-4">
                    <FormField
                      control={registerForm.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Full Name" {...field} className="h-11" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={registerForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email Address</FormLabel>
                          <FormControl>
                            <Input placeholder="example@hospital.com" {...field} className="h-11" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={registerForm.control}
                      name="institution"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Institution</FormLabel>
                          <FormControl>
                            <Input placeholder="Hospital/Clinic Name" {...field} className="h-11" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={registerForm.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <Input type="password" placeholder="******" {...field} className="h-11" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={registerForm.control}
                      name="confirmPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Confirm Password</FormLabel>
                          <FormControl>
                            <Input type="password" placeholder="******" {...field} className="h-11" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit" size="lg" className="w-full mt-6 bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity">
                      Register
                    </Button>
                  </form>
                </Form>
              )}
            </TabsContent>
          </Tabs>

          <div className="text-center text-sm">
            {authMode === "login" && (
              <a href="#" className="text-primary hover:underline hover:text-primary/80 transition-colors">
                Forgot my password
              </a>
            )}
          </div>
        </CardContent>
        
        <CardFooter className="flex flex-col">
          <p className="text-center text-sm text-muted-foreground mt-2">
            {authMode === "login" ? (
              <>
                Don't have an account yet?{" "}
                <button 
                  onClick={() => setAuthMode("register")} 
                  className="text-primary font-medium hover:underline hover:text-primary/80 transition-colors"
                >
                  Register
                </button>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <button 
                  onClick={() => setAuthMode("login")} 
                  className="text-primary font-medium hover:underline hover:text-primary/80 transition-colors"
                >
                  Log in
                </button>
              </>
            )}
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
