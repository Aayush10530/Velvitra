import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import ThemedNavbar from "@/components/ThemedNavbar";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";

// Form validation schemas
const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  country: z.string().min(1, "Please select a country"),
  phoneNumber: z.string().regex(/^\+[1-9]\d{1,14}$/, "Invalid phone number format"),
  email: z.string().email("Invalid email address"),
  password: z.string()
    .min(12, "Password must be at least 12 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character"),
});

const signInSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

// List of countries (excluding Pakistan)
const countries = [
  { code: "IN", name: "India", phoneCode: "+91" },
  { code: "US", name: "United States", phoneCode: "+1" },
  { code: "GB", name: "United Kingdom", phoneCode: "+44" },
  { code: "CA", name: "Canada", phoneCode: "+1" },
  { code: "AU", name: "Australia", phoneCode: "+61" },
  { code: "DE", name: "Germany", phoneCode: "+49" },
  { code: "FR", name: "France", phoneCode: "+33" },
  { code: "IT", name: "Italy", phoneCode: "+39" },
  { code: "ES", name: "Spain", phoneCode: "+34" },
  { code: "JP", name: "Japan", phoneCode: "+81" },
  // Add more countries as needed
];

const AuthPage = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm({
    resolver: zodResolver(isSignIn ? signInSchema : registerSchema),
  });

  const selectedCountry = watch("country");
  const selectedCountryData = countries.find(c => c.code === selectedCountry);

  const onSubmit = async (data: any) => {
    try {
      if (isSignIn) {
        // Handle sign in
        console.log("Sign in:", data);
        toast.success("Signed in successfully!");
        navigate("/");
      } else {
        // Handle register
        console.log("Register:", data);
        toast.success("Registered successfully!");
        setIsSignIn(true);
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <ThemedNavbar />
      <div className="pt-24 pb-12">
        <div className="container-custom max-w-md mx-auto">
          <Link to="/" className="flex items-center text-accent mb-6 hover:underline">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Home
          </Link>

          <div className="bg-white rounded-lg shadow-lg p-8">
            <h1 className="text-2xl font-playfair font-bold text-center mb-8">
              {isSignIn ? "Welcome Back" : "Create Account"}
            </h1>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {!isSignIn && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      type="text"
                      {...register("name")}
                      className={errors.name ? "border-red-500" : ""}
                    />
                    {errors.name && (
                      <p className="text-sm text-red-500">{errors.name.message as string}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="country">Country</Label>
                    <Select
                      onValueChange={(value) => setValue("country", value)}
                      value={selectedCountry}
                    >
                      <SelectTrigger className={errors.country ? "border-red-500" : ""}>
                        <SelectValue placeholder="Select your country" />
                      </SelectTrigger>
                      <SelectContent>
                        {countries.map((country) => (
                          <SelectItem key={country.code} value={country.code}>
                            {country.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.country && (
                      <p className="text-sm text-red-500">{errors.country.message as string}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phoneNumber">Phone Number</Label>
                    <div className="flex gap-2">
                      <div className="w-24">
                        <Input
                          value={selectedCountryData?.phoneCode || ""}
                          readOnly
                          className="bg-muted"
                        />
                      </div>
                      <Input
                        id="phoneNumber"
                        type="tel"
                        {...register("phoneNumber")}
                        className={`flex-1 ${errors.phoneNumber ? "border-red-500" : ""}`}
                        placeholder="Phone number"
                      />
                    </div>
                    {errors.phoneNumber && (
                      <p className="text-sm text-red-500">{errors.phoneNumber.message as string}</p>
                    )}
                  </div>
                </>
              )}

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  {...register("email")}
                  className={errors.email ? "border-red-500" : ""}
                />
                {errors.email && (
                  <p className="text-sm text-red-500">{errors.email.message as string}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  {...register("password")}
                  className={errors.password ? "border-red-500" : ""}
                />
                {errors.password && (
                  <p className="text-sm text-red-500">{errors.password.message as string}</p>
                )}
                {!isSignIn && (
                  <p className="text-xs text-muted-foreground">
                    Password must be at least 12 characters long and contain uppercase, lowercase, number, and special character
                  </p>
                )}
              </div>

              <Button type="submit" className="w-full">
                {isSignIn ? "Sign In" : "Register"}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <button
                onClick={() => setIsSignIn(!isSignIn)}
                className="text-accent hover:underline"
              >
                {isSignIn
                  ? "Don't have an account? Register"
                  : "Already have an account? Sign In"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage; 