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

interface CustomTourFormData {
  name: string;
  email: string;
  phone: string;
  countryCode: string;
  monument: string[];
  themes: string[];
  travelers: number;
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
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<CustomTourFormData>({
    name: '',
    email: '',
    phone: '',
    countryCode: '+91',
    monument: [],
    themes: [],
    travelers: 1,
    language: 'english',
    date: undefined,
    vehicle: 'luxury-sedan',
    specialRequests: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: name === 'travelers' ? parseInt(value) : value });
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
        return {
          ...prevFormData,
          themes: [...currentThemes, selectedTheme],
        };
      }
    });
  };

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 4));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    console.log("Submitting form data:", formData);

    try {
      const response = await axios.post('/api/custom-tour', {
        ...formData,
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
        monument: [],
        themes: [],
        travelers: 1,
        language: 'english',
        date: undefined,
        vehicle: 'luxury-sedan',
        specialRequests: '',
      });
      setStep(1);
    } catch (error: any) {
      console.error('Error submitting custom tour request:', error);
      toast({
        variant: "destructive",
        title: "Submission Failed",
        description: error.response?.data?.message || "There was an error submitting your request. Please try again.",
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
            <h2 className="font-playfair text-2xl font-semibold mb-4">Step 3: Tour Preferences</h2>
            <div className="space-y-2">
              <Label htmlFor="travelers">Number of Travelers</Label>
              <Input
                id="travelers"
                name="travelers"
                type="number"
                value={formData.travelers}
                onChange={handleInputChange}
                min={1}
                required
              />
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
                  <SelectItem value="luxury-sedan">Luxury Sedan</SelectItem>
                  <SelectItem value="suv">SUV</SelectItem>
                  <SelectItem value="van">Van</SelectItem>
                </SelectContent>
              </Select>
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
              <form onSubmit={handleSubmit} className="space-y-8">
                {renderStep()}

                <div className="flex justify-between mt-8">
                  {step > 1 && (
                    <Button variant="outline" onClick={prevStep} className="bg-white/50 border-gray-400 hover:bg-white">
                      <ChevronLeft className="mr-2 h-4 w-4" />
                      Previous
                    </Button>
                  )}
                  {step < 4 ? (
                    <Button onClick={nextStep} className="ml-auto bg-black text-white hover:bg-gray-800">
                      Next
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  ) : (
                    <Button type="submit" disabled={isSubmitting} className="ml-auto bg-black text-white hover:bg-gray-800">
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
