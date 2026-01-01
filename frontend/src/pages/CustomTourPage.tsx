import React, { useState } from 'react';
import ThemedNavbar from "@/components/ThemedNavbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Command, CommandGroup, CommandItem, CommandList } from "@/components/ui/command";
import { Checkbox } from "@/components/ui/checkbox";
import axios from 'axios';
import { useToast } from "@/components/ui/use-toast";
import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import AuthModal from "@/components/AuthModal";

interface CustomTourFormData {
  name: string;
  email: string;
  phone: string;
  countryCode: string;
  country: string;
  monument: string[];
  themes: string[];
  adults: number;
  children: number;
  language: string;
  date: Date | undefined;
  vehicle: string;
  specialRequests: string;
}

const monumentsList = [
  "Taj Mahal",
  "Agra Fort",
  "Fatehpur Sikri",
  "Itmad-ud-Daula's Tomb (Baby Taj)",
  "Mehtab Bagh",
  "Akbar's Tomb, Sikandra",
  "Mariam's Tomb",
  "Chini Ka Rauza",
  "Jama Masjid",
  "Agra Cathedral",
];

const tourThemes = [
  "Historical & Heritage",
  "Cultural Immersion",
  "Adventure & Outdoors",
  "Food & Culinary",
  "Romantic Escapes",
  "Photography Tours",
  "Nature & Wildlife",
  "Spiritual & Religious",
];

const countryCodes = [
  { code: "+91", country: "India" },
  { code: "+1", country: "USA" },
  { code: "+44", country: "UK" },
  { code: "+49", country: "Germany" },
  { code: "+33", country: "France" },
  { code: "+81", country: "Japan" },
  { code: "+86", country: "China" },
  { code: "+39", country: "Italy" },
  { code: "+7", country: "Russia" },
  { code: "+971", country: "UAE" },
];


const CustomTourPage: React.FC = () => {
  const { isAuthenticated, isLoading: authLoading } = useAuth(); // Get auth state
  const [showAuthModal, setShowAuthModal] = useState(false); // State for AuthModal
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<CustomTourFormData>({
    name: '',
    email: '',
    phone: '',
    countryCode: '+91',
    country: '', // New field
    monument: [],
    themes: [],
    adults: 1, // New field
    children: 0, // New field
    language: 'english',
    date: undefined,
    vehicle: '',
    specialRequests: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(false); // Prevent double-click submission
  const { toast } = useToast();

  // Prevent accidental double-clicks submitting immediately when entering step 4
  React.useEffect(() => {
    if (step === 4) {
      setIsSubmitDisabled(true);
      const timer = setTimeout(() => setIsSubmitDisabled(false), 800);
      return () => clearTimeout(timer);
    }
  }, [step]);

  if (authLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col">
        <ThemedNavbar />
        <div className="flex-grow container-custom py-32 flex items-center justify-center">
          <Card className="w-full max-w-md shadow-xl rounded-xl border-none bg-[#fbf3e4]/90 backdrop-blur-sm p-6 md:p-8 text-center">
            <CardContent className="space-y-6">
              <h2 className="text-2xl font-playfair font-bold text-gray-900">Login Required</h2>
              <p className="text-gray-600">Please log in to your account to plan your custom tour.</p>
              <Button onClick={() => setShowAuthModal(true)} className="w-full bg-black text-white hover:bg-gray-800">
                Log In / Sign Up
              </Button>
            </CardContent>
          </Card>
        </div>
        <Footer />
        <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
      </div>
    );
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: (name === 'adults' || name === 'children') ? parseInt(value) || 0 : value });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({ ...formData, [name as keyof CustomTourFormData]: value });
  };

  const handleMonumentSelect = (selectedMonument: string) => {
    setFormData((prevFormData) => {
      const currentMonuments = prevFormData.monument;
      if (currentMonuments.includes(selectedMonument)) {
        return {
          ...prevFormData,
          monument: currentMonuments.filter((m) => m !== selectedMonument),
        };
      } else {
        return {
          ...prevFormData,
          monument: [...currentMonuments, selectedMonument],
        };
      }
    });
  };

  const handleThemeSelect = (selectedTheme: string) => {
    setFormData((prevFormData) => {
      const currentThemes = prevFormData.themes;
      if (currentThemes.includes(selectedTheme)) {
        return {
          ...prevFormData,
          themes: currentThemes.filter((t) => t !== selectedTheme),
        };
      } else {
        if (currentThemes.length >= 3) {
          toast({
            variant: "destructive",
            title: "Limit Reached",
            description: "You can select up to 3 themes only.",
          });
          return prevFormData;
        }
        return {
          ...prevFormData,
          themes: [...currentThemes, selectedTheme],
        };
      }
    });
  };

  const validateStep = (currentStep: number) => {
    switch (currentStep) {
      case 1:
        if (!formData.name.trim()) { toast({ variant: "destructive", title: "Missing Name", description: "Please enter your full name." }); return false; }
        if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) { toast({ variant: "destructive", title: "Invalid Email", description: "Please enter a valid email address." }); return false; }
        if (!formData.phone.trim()) { toast({ variant: "destructive", title: "Missing Phone", description: "Please enter your phone number." }); return false; }
        if (formData.monument.length === 0) { toast({ variant: "destructive", title: "Select Monument", description: "Please select at least one monument." }); return false; }
        return true;
      case 2:
        if (formData.themes.length === 0) { toast({ variant: "destructive", title: "Select Theme", description: "Please select at least one tour theme." }); return false; }
        return true;
      case 3:
        if (!formData.country) { toast({ variant: "destructive", title: "Select Country", description: "Please select your country of origin." }); return false; }
        if (formData.adults < 1) { toast({ variant: "destructive", title: "Invalid Travelers", description: "Please enter at least 1 adult." }); return false; }
        if (!formData.language) { toast({ variant: "destructive", title: "Select Language", description: "Please select a preferred language." }); return false; }
        if (!formData.date) { toast({ variant: "destructive", title: "Select Date", description: "Please select a preferred travel date." }); return false; }
        return true;
      default:
        return true;
    }
  };

  const nextStep = (e: React.MouseEvent) => {
    e.preventDefault();
    if (validateStep(step)) {
      setStep((prev) => Math.min(prev + 1, 4));
    }
  };
  const prevStep = (e: React.MouseEvent) => {
    e.preventDefault();
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    console.log("Submitting form data:", formData);

    try {
      const response = await axios.post('/api/custom-tours', {
        ...formData,
        monuments: formData.monument, // Map frontend 'monument' to backend 'monuments'
        date: formData.date?.toISOString(),
      });

      console.log("Submission successful:", response.data);

      toast({
        title: "Request Submitted!",
        description: response.data.message || "Your custom tour request has been sent successfully.",
      });
      setFormData({
        name: '',
        email: '',
        phone: '',
        countryCode: '+91',
        country: '',
        monument: [],
        themes: [],
        adults: 1,
        children: 0,
        language: 'english',
        date: undefined,
        vehicle: 'luxury-sedan',
        specialRequests: '',
      });
      setStep(1);
      setIsSuccess(true);
    } catch (error: any) {
      console.error('Error submitting custom tour request:', error);
      const serverError = error.response?.data?.error || error.response?.data?.message;
      toast({
        variant: "destructive",
        title: "Submission Failed",
        description: serverError ? `Server Error: ${serverError}` : "There was an error submitting your request. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <h2 className="font-playfair text-2xl font-semibold mb-4">Step 1: Your Contact Details & Tour Basics</h2>
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Your Full Name"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="your@example.com"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <div className="flex gap-2">
                <Select
                  value={formData.countryCode}
                  onValueChange={(value) => setFormData({ ...formData, countryCode: value })}
                >
                  <SelectTrigger className="w-[120px]">
                    <SelectValue placeholder="Code" />
                  </SelectTrigger>
                  <SelectContent>
                    {countryCodes.map((country) => (
                      <SelectItem key={country.code} value={country.code}>
                        {country.code} ({country.country})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Enter phone number"
                  required
                  className="flex-1"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="monument">Select Monuments</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal"
                  >
                    {formData.monument.length > 0
                      ? formData.monument.join(", ")
                      : "Select one or more monuments"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
                  <Command>
                    <CommandList>
                      <CommandGroup>
                        {monumentsList.map((monument) => (
                          <CommandItem
                            key={monument}
                            onSelect={() => handleMonumentSelect(monument)}
                            className="flex items-center space-x-2 p-2 cursor-pointer"
                          >
                            <Checkbox
                              checked={formData.monument.includes(monument)}
                              onCheckedChange={() => handleMonumentSelect(monument)}
                            />
                            <span>{monument}</span>
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-6">
            <h2 className="font-playfair text-2xl font-semibold mb-4">Step 2: Choose Your Tour Themes</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {tourThemes.map((theme) => (
                <Card
                  key={theme}
                  className={cn(
                    "cursor-pointer p-4 flex items-center justify-center text-center",
                    formData.themes.includes(theme) ? "border-accent bg-accent/10" : "border-gray-200"
                  )}
                  onClick={() => handleThemeSelect(theme)}
                >
                  <CardContent className="p-0">
                    <p className="font-medium">{theme}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-6">
            <h2 className="font-playfair text-2xl font-semibold mb-4">Step 3: Traveler Details</h2>

            <div className="space-y-2">
              <Label htmlFor="country">Country of Origin</Label>
              <Select
                value={formData.country}
                onValueChange={(value) => handleSelectChange('country', value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select your country" />
                </SelectTrigger>
                <SelectContent className="max-h-[300px]">
                  {/* Using the countries list from earlier code or a new one, filtering out PK/BD */}
                  {countryCodes
                    .filter(c => !["Pakistan", "Bangladesh"].includes(c.country))
                    .map((c) => (
                      <SelectItem key={c.code} value={c.country}>
                        {c.country}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="adults">Adults</Label>
                <Input
                  id="adults"
                  name="adults"
                  type="number"
                  value={formData.adults}
                  onChange={handleInputChange}
                  min={1}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="children">Kids (below 8)</Label>
                <Input
                  id="children"
                  name="children"
                  type="number"
                  value={formData.children}
                  onChange={handleInputChange}
                  min={0}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="language">Preferred Language</Label>
              <Select
                value={formData.language}
                onValueChange={(value) => handleSelectChange('language', value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="english">English</SelectItem>
                  <SelectItem value="hindi">Hindi</SelectItem>
                  <SelectItem value="spanish">Spanish</SelectItem>
                  <SelectItem value="french">French</SelectItem>
                  <SelectItem value="german">German</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="date">Preferred Travel Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !formData.date && "text-muted-foreground"
                    )}
                  >
                    {formData.date ? format(formData.date, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={formData.date}
                    onSelect={(date) => setFormData({ ...formData, date: date || undefined })}
                    initialFocus
                    disabled={(date) => date < new Date()}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
        );
      case 4:
        const totalTravelers = (formData.adults || 0) + (formData.children || 0);

        return (
          <div className="space-y-6">
            <h2 className="font-playfair text-2xl font-semibold mb-4">Step 4: Vehicle & Special Requests</h2>
            <div className="space-y-2">
              <Label htmlFor="vehicle">Preferred Vehicle</Label>
              <Select
                value={formData.vehicle}
                onValueChange={(value) => handleSelectChange('vehicle', value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a vehicle" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="luxury-sedan" disabled={totalTravelers > 3}>
                    Luxury Sedan {totalTravelers > 3 && "(Max 3 travelers)"}
                  </SelectItem>
                  <SelectItem value="suv" disabled={totalTravelers > 5}>
                    SUV {totalTravelers > 5 && "(Max 5 travelers)"}
                  </SelectItem>
                  <SelectItem value="luxury-suv" disabled={totalTravelers > 5}>
                    Luxury SUV {totalTravelers > 5 && "(Max 5 travelers)"}
                  </SelectItem>
                  <SelectItem value="van">Van</SelectItem>
                </SelectContent>
              </Select>
              {totalTravelers > 5 && <p className="text-xs text-muted-foreground">For groups larger than 5, a Van is required for comfort and luggage.</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="specialRequests">Special Requests</Label>
              <Input
                id="specialRequests"
                name="specialRequests"
                value={formData.specialRequests}
                onChange={handleInputChange}
                placeholder="E.g., dietary restrictions, accessibility needs, specific interests"
              />
            </div>
          </div>
        );
      default:
        return null;
    }
  };


  // ... (inside render)
  if (isSuccess) {
    return (
      <div className="min-h-screen flex flex-col">
        <ThemedNavbar />
        <div className="flex-grow container-custom py-32 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-lg text-center"
          >
            <Card className="w-full shadow-2xl rounded-xl border-none bg-[#fbf3e4]/95 backdrop-blur-md p-8">
              <CardContent className="space-y-6">
                <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="text-3xl font-playfair font-bold text-gray-900">Request Submitted!</h2>
                <p className="text-gray-700 text-lg">
                  Thank you for planning your journey with Velvitra.
                </p>
                <p className="text-gray-600">
                  Our team has received your request and will be in contact with you within <strong>12-24 hours</strong> to finalize your custom itinerary.
                </p>
                <Button
                  onClick={() => { setIsSuccess(false); setStep(1); }}
                  className="mt-6 bg-black text-white hover:bg-gray-800"
                >
                  Plan Another Tour
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <ThemedNavbar />
      <div className="flex-grow container-custom py-32 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          whileHover={{ scale: 1.02 }}
          className="w-full max-w-2xl"
        >
          <Card className="w-full shadow-xl rounded-xl border-none bg-[#fbf3e4]/90 backdrop-blur-sm hover:shadow-2xl transition-all duration-300">
            <CardHeader>
              <CardTitle className="text-3xl font-playfair font-bold text-gray-900 text-center">Plan Your Custom Tour</CardTitle>
            </CardHeader>
            <CardContent>
              <form
                onSubmit={handleSubmit}
                className="space-y-8"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                  }
                }}
              >
                {renderStep()}

                <div className="flex justify-between mt-8">
                  {step > 1 && (
                    <Button type="button" variant="outline" onClick={prevStep} className="bg-white/50 border-gray-400 hover:bg-white">
                      <ChevronLeft className="mr-2 h-4 w-4" />
                      Previous
                    </Button>
                  )}
                  {step < 4 ? (
                    <Button type="button" onClick={nextStep} className="ml-auto bg-black text-white hover:bg-gray-800">
                      Next
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  ) : (
                    <Button type="submit" disabled={isSubmitting || isSubmitDisabled || !formData.vehicle} className="ml-auto bg-black text-white hover:bg-gray-800">
                      {isSubmitting ? "Submitting..." : "Submit Request"}
                    </Button>
                  )}
                </div>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
};

export default CustomTourPage;
