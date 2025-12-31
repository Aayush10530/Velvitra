import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, X } from "lucide-react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/lib/supabase";
import axios from "axios";
import { API_BASE_URL } from "@/lib/api";

// Form validation schemas
const registerSchema = z.object({
  name: z.string().trim().regex(/^[\w'\-,.]+(?: [\w'\-,.]+)+$/, "Please enter your full name (first & last name)"),
  country: z.string().min(1, "Please select a country"),
  phoneNumber: z.string().regex(/^\d{10,15}$/, "Invalid phone number format"),
  email: z.string().email("Invalid email address"),
  password: z.string()
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character"),
});

const signInSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

const forgotPasswordSchema = z.object({
  email: z.string().email("Invalid email address"),
});

// List of countries with their phone codes
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
  { code: "CN", name: "China", phoneCode: "+86" },
  { code: "RU", name: "Russia", phoneCode: "+7" },
  { code: "BR", name: "Brazil", phoneCode: "+55" },
  { code: "ZA", name: "South Africa", phoneCode: "+27" },
  { code: "MX", name: "Mexico", phoneCode: "+52" },
  { code: "SG", name: "Singapore", phoneCode: "+65" },
  { code: "AE", name: "United Arab Emirates", phoneCode: "+971" },
  { code: "SA", name: "Saudi Arabia", phoneCode: "+966" },
  { code: "TR", name: "Turkey", phoneCode: "+90" },
  { code: "SE", name: "Sweden", phoneCode: "+46" },
  { code: "CH", name: "Switzerland", phoneCode: "+41" },
  { code: "NL", name: "Netherlands", phoneCode: "+31" },
  { code: "BE", name: "Belgium", phoneCode: "+32" },
  { code: "AT", name: "Austria", phoneCode: "+43" },
  { code: "DK", name: "Denmark", phoneCode: "+45" },
  { code: "NO", name: "Norway", phoneCode: "+47" },
  { code: "FI", name: "Finland", phoneCode: "+358" },
  { code: "PL", name: "Poland", phoneCode: "+48" },
  { code: "PT", name: "Portugal", phoneCode: "+351" },
  { code: "GR", name: "Greece", phoneCode: "+30" },
  { code: "IE", name: "Ireland", phoneCode: "+353" },
  { code: "NZ", name: "New Zealand", phoneCode: "+64" },
  { code: "KR", name: "South Korea", phoneCode: "+82" },
  { code: "MY", name: "Malaysia", phoneCode: "+60" },
  { code: "TH", name: "Thailand", phoneCode: "+66" },
  { code: "VN", name: "Vietnam", phoneCode: "+84" },
  { code: "ID", name: "Indonesia", phoneCode: "+62" },
  { code: "PH", name: "Philippines", phoneCode: "+63" },
  { code: "IL", name: "Israel", phoneCode: "+972" },
  { code: "EG", name: "Egypt", phoneCode: "+20" },
  { code: "NG", name: "Nigeria", phoneCode: "+234" },
  { code: "KE", name: "Kenya", phoneCode: "+254" },
  { code: "MA", name: "Morocco", phoneCode: "+212" },
  { code: "AR", name: "Argentina", phoneCode: "+54" },
  { code: "CL", name: "Chile", phoneCode: "+56" },
  { code: "CO", name: "Colombia", phoneCode: "+57" },
  { code: "PE", name: "Peru", phoneCode: "+51" },
  { code: "VE", name: "Venezuela", phoneCode: "+58" },
  { code: "HK", name: "Hong Kong", phoneCode: "+852" },
  { code: "TW", name: "Taiwan", phoneCode: "+886" },
  { code: "PK", name: "Pakistan", phoneCode: "+92" }
];

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AuthModal = ({ isOpen, onClose }: AuthModalProps) => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    reset,
    control,
  } = useForm({
    resolver: zodResolver(
      isForgotPassword
        ? forgotPasswordSchema
        : isSignIn
          ? signInSchema
          : registerSchema
    ),
    defaultValues: {
      name: "",
      country: "",
      phoneNumber: "",
      email: "",
      password: "",
    },
  });

  const selectedCountryCode = watch("country");
  const selectedCountryData = countries.find(c => c.code === selectedCountryCode);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      reset({
        name: "",
        country: isSignIn ? "" : "IN",
        phoneNumber: isSignIn ? "" : countries.find(c => c.code === "IN")?.phoneCode || "",
        email: "",
        password: "",
      });
      setIsForgotPassword(false);
    } else {
      reset();
      document.body.style.overflow = "";
    }
  }, [isOpen, isSignIn, reset, countries]);



  const onSubmit = async (data: any) => {
    try {
      if (isForgotPassword) {
        const { error } = await supabase.auth.resetPasswordForEmail(data.email, {
          redirectTo: `${window.location.origin}/reset-password`,
        });
        if (error) throw error;
        toast.success("Password reset link sent to your email!");
        setIsForgotPassword(false);
        setIsSignIn(true);
        reset();
      } else if (isSignIn) {
        const { data: authData, error } = await supabase.auth.signInWithPassword({
          email: data.email,
          password: data.password,
        });
        if (error) throw error;

        // Sync profile
        if (authData.session) {
          try {
            const token = authData.session.access_token;
            await axios.post(`${API_BASE_URL}/users/sync`, {}, {
              headers: { Authorization: `Bearer ${token}` }
            });
          } catch (syncError) {
            console.error("Profile sync warning:", syncError);
          }
        }

        toast.success("Signed in successfully!");
        onClose();
        reset();
      } else {
        const fullPhoneNumber = (countries.find(c => c.code === data.country)?.phoneCode || "") + data.phoneNumber;
        const { data: authData, error } = await supabase.auth.signUp({
          email: data.email,
          password: data.password,
          options: {
            data: {
              full_name: data.name,
              phone: fullPhoneNumber,
            }
          }
        });
        if (error) throw error;

        if (authData.session) {
          // Auto login
          const token = authData.session.access_token;
          await axios.post(`${API_BASE_URL}/users/sync`, {}, {
            headers: { Authorization: `Bearer ${token}` }
          });
          toast.success("Registered and signed in!");
          onClose();
        } else {
          toast.success("Registered! Please check your email to verify.");
          onClose();
        }
        reset();
      }
    } catch (error: any) {
      console.error("Authentication failed:", error);
      toast.error(error.message || error || "An error occurred. Please try again.");
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center"
      >
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        />

        {/* Modal */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ type: "spring", duration: 0.5 }}
          className="relative bg-white rounded-lg shadow-lg p-8 w-full max-w-md mx-4"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          >
            <X size={24} />
          </button>

          <div className="text-center mb-8 relative">
            {isForgotPassword && (
              <button
                onClick={() => setIsForgotPassword(false)}
                className="absolute left-0 top-1 text-gray-500 hover:text-gray-700"
              >
                <ArrowLeft size={20} />
              </button>
            )}
            <h1 className="text-2xl font-playfair font-bold">
              {isForgotPassword
                ? "Reset Password"
                : isSignIn
                  ? "Welcome Back"
                  : "Create Account"}
            </h1>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {!isSignIn && !isForgotPassword && (
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
                  <Controller
                    name="country"
                    control={control}
                    render={({ field }) => (
                      <Select
                        onValueChange={(value) => {
                          field.onChange(value);
                        }}
                        value={field.value}
                      >
                        <SelectTrigger className={errors.country ? "border-red-500" : ""}>
                          <SelectValue placeholder="Select your country" />
                        </SelectTrigger>
                        <SelectContent className="max-h-[300px] overflow-y-auto">
                          {countries.map((country) => (
                            <SelectItem key={country.code} value={country.code}>
                              {country.name} ({country.phoneCode})
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.country && (
                    <p className="text-sm text-red-500">{errors.country.message as string}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`phoneNumber-${isSignIn ? 'signin' : 'register'}`}>Phone Number</Label>
                  <div className="flex gap-2">
                    <div className="w-24">
                      <Input
                        value={selectedCountryData?.phoneCode || ""}
                        readOnly
                        className="bg-muted"
                      />
                    </div>
                    <Input
                      id={`phoneNumber-${isSignIn ? 'signin' : 'register'}`}
                      type="tel"
                      {...register("phoneNumber")}
                      className={`flex-1 ${errors.phoneNumber ? "border-red-500" : ""}`}
                      placeholder="Enter phone number"
                    />
                  </div>
                  {errors.phoneNumber && (
                    <p className="text-sm text-red-500">{errors.phoneNumber.message as string}</p>
                  )}
                </div>
              </>
            )}

            <div className="space-y-2">
              <Label htmlFor={`email-${isSignIn ? 'signin' : 'register'}`}>Email</Label>
              <Input
                id={`email-${isSignIn ? 'signin' : 'register'}`}
                type="email"
                {...register("email")}
                className={errors.email ? "border-red-500" : ""}
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message as string}</p>
              )}
            </div>

            {!isForgotPassword && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor={`password-${isSignIn ? 'signin' : 'register'}`}>Password</Label>
                  {isSignIn && (
                    <button
                      type="button"
                      onClick={() => setIsForgotPassword(true)}
                      className="text-sm text-primary hover:underline text-amber-600"
                    >
                      Forgot Password?
                    </button>
                  )}
                </div>
                <Input
                  id={`password-${isSignIn ? 'signin' : 'register'}`}
                  type="password"
                  {...register("password")}
                  className={errors.password ? "border-red-500" : ""}
                />
                {errors.password && (
                  <p className="text-sm text-red-500">{errors.password.message as string}</p>
                )}
                {!isSignIn && (
                  <p className="text-xs text-muted-foreground">
                    Password must contain uppercase, lowercase, number, and special character
                  </p>
                )}
              </div>
            )}

            <Button type="submit" className="w-full bg-black text-white hover:bg-white hover:text-black hover:border-black border border-transparent hover:border transition-all duration-300 py-6 text-lg">
              {isForgotPassword
                ? "Send Reset Link"
                : isSignIn
                  ? "Sign In"
                  : "Create Account"}
            </Button>

            {!isForgotPassword && (
              <div className="text-center text-sm text-gray-600">
                {isSignIn ? (
                  <>Don't have an account?{" "}
                    <Button
                      type="button"
                      variant="link"
                      onClick={() => setIsSignIn(false)}
                      className="p-0 h-auto"
                    >
                      Register
                    </Button>
                  </>
                ) : (
                  <>Already have an account?{" "}
                    <Button
                      type="button"
                      variant="link"
                      onClick={() => setIsSignIn(true)}
                      className="p-0 h-auto"
                    >
                      Sign In
                    </Button>
                  </>
                )}
              </div>
            )}
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AuthModal; 