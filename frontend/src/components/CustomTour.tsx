import { useState } from "react";
import { ArrowRight, Phone, Mail, MessageCircle, Shield, Lock, Calendar as CalendarIcon, Plus, Minus, Users, X } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Calendar } from "./ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Badge } from "./ui/badge";
import { useToast } from "./ui/use-toast";
import { ToastAction } from "./ui/toast";

const countryCodes = [
  { code: "+93", country: "Afghanistan" },
  { code: "+355", country: "Albania" },
  { code: "+213", country: "Algeria" },
  { code: "+376", country: "Andorra" },
  { code: "+244", country: "Angola" },
  { code: "+1", country: "Antigua and Barbuda" },
  { code: "+54", country: "Argentina" },
  { code: "+374", country: "Armenia" },
  { code: "+61", country: "Australia" },
  { code: "+43", country: "Austria" },
  { code: "+994", country: "Azerbaijan" },
  { code: "+1", country: "Bahamas" },
  { code: "+973", country: "Bahrain" },
  { code: "+880", country: "Bangladesh" },
  { code: "+1", country: "Barbados" },
  { code: "+375", country: "Belarus" },
  { code: "+32", country: "Belgium" },
  { code: "+501", country: "Belize" },
  { code: "+229", country: "Benin" },
  { code: "+975", country: "Bhutan" },
  { code: "+591", country: "Bolivia" },
  { code: "+387", country: "Bosnia and Herzegovina" },
  { code: "+267", country: "Botswana" },
  { code: "+55", country: "Brazil" },
  { code: "+673", country: "Brunei" },
  { code: "+359", country: "Bulgaria" },
  { code: "+226", country: "Burkina Faso" },
  { code: "+257", country: "Burundi" },
  { code: "+855", country: "Cambodia" },
  { code: "+237", country: "Cameroon" },
  { code: "+1", country: "Canada" },
  { code: "+238", country: "Cape Verde" },
  { code: "+236", country: "Central African Republic" },
  { code: "+235", country: "Chad" },
  { code: "+56", country: "Chile" },
  { code: "+86", country: "China" },
  { code: "+57", country: "Colombia" },
  { code: "+269", country: "Comoros" },
  { code: "+242", country: "Congo" },
  { code: "+506", country: "Costa Rica" },
  { code: "+385", country: "Croatia" },
  { code: "+53", country: "Cuba" },
  { code: "+357", country: "Cyprus" },
  { code: "+420", country: "Czech Republic" },
  { code: "+45", country: "Denmark" },
  { code: "+253", country: "Djibouti" },
  { code: "+1", country: "Dominica" },
  { code: "+1", country: "Dominican Republic" },
  { code: "+670", country: "East Timor" },
  { code: "+593", country: "Ecuador" },
  { code: "+20", country: "Egypt" },
  { code: "+503", country: "El Salvador" },
  { code: "+240", country: "Equatorial Guinea" },
  { code: "+291", country: "Eritrea" },
  { code: "+372", country: "Estonia" },
  { code: "+251", country: "Ethiopia" },
  { code: "+679", country: "Fiji" },
  { code: "+358", country: "Finland" },
  { code: "+33", country: "France" },
  { code: "+241", country: "Gabon" },
  { code: "+220", country: "Gambia" },
  { code: "+995", country: "Georgia" },
  { code: "+49", country: "Germany" },
  { code: "+233", country: "Ghana" },
  { code: "+30", country: "Greece" },
  { code: "+1", country: "Grenada" },
  { code: "+502", country: "Guatemala" },
  { code: "+224", country: "Guinea" },
  { code: "+245", country: "Guinea-Bissau" },
  { code: "+592", country: "Guyana" },
  { code: "+509", country: "Haiti" },
  { code: "+504", country: "Honduras" },
  { code: "+852", country: "Hong Kong" },
  { code: "+36", country: "Hungary" },
  { code: "+354", country: "Iceland" },
  { code: "+91", country: "India" },
  { code: "+62", country: "Indonesia" },
  { code: "+98", country: "Iran" },
  { code: "+964", country: "Iraq" },
  { code: "+353", country: "Ireland" },
  { code: "+972", country: "Israel" },
  { code: "+39", country: "Italy" },
  { code: "+1", country: "Jamaica" },
  { code: "+81", country: "Japan" },
  { code: "+962", country: "Jordan" },
  { code: "+7", country: "Kazakhstan" },
  { code: "+254", country: "Kenya" },
  { code: "+686", country: "Kiribati" },
  { code: "+82", country: "Korea, South" },
  { code: "+383", country: "Kosovo" },
  { code: "+965", country: "Kuwait" },
  { code: "+996", country: "Kyrgyzstan" },
  { code: "+856", country: "Laos" },
  { code: "+371", country: "Latvia" },
  { code: "+961", country: "Lebanon" },
  { code: "+266", country: "Lesotho" },
  { code: "+231", country: "Liberia" },
  { code: "+218", country: "Libya" },
  { code: "+423", country: "Liechtenstein" },
  { code: "+370", country: "Lithuania" },
  { code: "+352", country: "Luxembourg" },
  { code: "+853", country: "Macau" },
  { code: "+389", country: "Macedonia" },
  { code: "+261", country: "Madagascar" },
  { code: "+265", country: "Malawi" },
  { code: "+60", country: "Malaysia" },
  { code: "+960", country: "Maldives" },
  { code: "+223", country: "Mali" },
  { code: "+356", country: "Malta" },
  { code: "+692", country: "Marshall Islands" },
  { code: "+222", country: "Mauritania" },
  { code: "+230", country: "Mauritius" },
  { code: "+52", country: "Mexico" },
  { code: "+691", country: "Micronesia" },
  { code: "+373", country: "Moldova" },
  { code: "+377", country: "Monaco" },
  { code: "+976", country: "Mongolia" },
  { code: "+382", country: "Montenegro" },
  { code: "+212", country: "Morocco" },
  { code: "+258", country: "Mozambique" },
  { code: "+95", country: "Myanmar" },
  { code: "+264", country: "Namibia" },
  { code: "+674", country: "Nauru" },
  { code: "+977", country: "Nepal" },
  { code: "+31", country: "Netherlands" },
  { code: "+64", country: "New Zealand" },
  { code: "+505", country: "Nicaragua" },
  { code: "+227", country: "Niger" },
  { code: "+234", country: "Nigeria" },
  { code: "+47", country: "Norway" },
  { code: "+968", country: "Oman" },
  { code: "+92", country: "Pakistan" },
  { code: "+680", country: "Palau" },
  { code: "+970", country: "Palestine" },
  { code: "+507", country: "Panama" },
  { code: "+675", country: "Papua New Guinea" },
  { code: "+595", country: "Paraguay" },
  { code: "+51", country: "Peru" },
  { code: "+63", country: "Philippines" },
  { code: "+48", country: "Poland" },
  { code: "+351", country: "Portugal" },
  { code: "+974", country: "Qatar" },
  { code: "+40", country: "Romania" },
  { code: "+7", country: "Russia" },
  { code: "+250", country: "Rwanda" },
  { code: "+966", country: "Saudi Arabia" },
  { code: "+221", country: "Senegal" },
  { code: "+381", country: "Serbia" },
  { code: "+248", country: "Seychelles" },
  { code: "+232", country: "Sierra Leone" },
  { code: "+65", country: "Singapore" },
  { code: "+421", country: "Slovakia" },
  { code: "+386", country: "Slovenia" },
  { code: "+677", country: "Solomon Islands" },
  { code: "+252", country: "Somalia" },
  { code: "+27", country: "South Africa" },
  { code: "+211", country: "South Sudan" },
  { code: "+34", country: "Spain" },
  { code: "+94", country: "Sri Lanka" },
  { code: "+249", country: "Sudan" },
  { code: "+597", country: "Suriname" },
  { code: "+268", country: "Swaziland" },
  { code: "+46", country: "Sweden" },
  { code: "+41", country: "Switzerland" },
  { code: "+963", country: "Syria" },
  { code: "+886", country: "Taiwan" },
  { code: "+992", country: "Tajikistan" },
  { code: "+255", country: "Tanzania" },
  { code: "+66", country: "Thailand" },
  { code: "+670", country: "Timor-Leste" },
  { code: "+228", country: "Togo" },
  { code: "+676", country: "Tonga" },
  { code: "+1", country: "Trinidad and Tobago" },
  { code: "+216", country: "Tunisia" },
  { code: "+90", country: "Turkey" },
  { code: "+993", country: "Turkmenistan" },
  { code: "+688", country: "Tuvalu" },
  { code: "+256", country: "Uganda" },
  { code: "+380", country: "Ukraine" },
  { code: "+971", country: "United Arab Emirates" },
  { code: "+44", country: "United Kingdom" },
  { code: "+1", country: "United States" },
  { code: "+598", country: "Uruguay" },
  { code: "+998", country: "Uzbekistan" },
  { code: "+678", country: "Vanuatu" },
  { code: "+379", country: "Vatican City" },
  { code: "+58", country: "Venezuela" },
  { code: "+84", country: "Vietnam" },
  { code: "+967", country: "Yemen" },
  { code: "+260", country: "Zambia" },
  { code: "+263", country: "Zimbabwe" }
].sort((a, b) => a.country.localeCompare(b.country));

const interests = [
  { value: "history", label: "History & Culture" },
  { value: "photography", label: "Photography" },
  { value: "dining", label: "Fine Dining" },
  { value: "shopping", label: "Shopping" },
  { value: "architecture", label: "Architecture" },
  { value: "nature", label: "Nature & Wildlife" },
  { value: "adventure", label: "Adventure" },
  { value: "spiritual", label: "Spiritual & Religious" },
  { value: "art", label: "Art & Museums" },
  { value: "local", label: "Local Experiences" }
];

const CustomTour = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    countryCode: "+91",
    travelDates: "",
    groupSize: "",
    interests: [] as string[],
    specialRequests: ""
  });
  const [date, setDate] = useState<Date>();
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Show success message
      toast({
        title: "Request Submitted Successfully!",
        description: "We will reach out to you within 24 hours to discuss your custom tour.",
        duration: 5000,
        action: (
          <ToastAction altText="Close">Close</ToastAction>
        ),
      });

      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        countryCode: "+91",
        travelDates: "",
        groupSize: "",
        interests: [],
        specialRequests: ""
      });
      setDate(undefined);
      setAdults(1);
      setChildren(0);
      setSelectedInterests([]);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Something went wrong. Please try again.",
        duration: 5000,
        action: (
          <ToastAction altText="Close">Close</ToastAction>
        ),
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleInterestSelect = (value: string) => {
    if (selectedInterests.length < 3 && !selectedInterests.includes(value)) {
      const newInterests = [...selectedInterests, value];
      setSelectedInterests(newInterests);
      setFormData(prev => ({ ...prev, interests: newInterests }));
    }
  };

  const removeInterest = (value: string) => {
    const newInterests = selectedInterests.filter(interest => interest !== value);
    setSelectedInterests(newInterests);
    setFormData(prev => ({ ...prev, interests: newInterests }));
  };

  const handleCountryCodeChange = (value: string) => {
    setFormData(prev => ({ ...prev, countryCode: value }));
  };

  const handleDateSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate);
    if (selectedDate) {
      setFormData(prev => ({ ...prev, travelDates: format(selectedDate, "PPP") }));
    }
  };

  const updateGroupSize = (newAdults: number, newChildren: number) => {
    setAdults(newAdults);
    setChildren(newChildren);
    setFormData(prev => ({
      ...prev,
      groupSize: `${newAdults} ${newAdults === 1 ? 'Adult' : 'Adults'}${newChildren > 0 ? `, ${newChildren} ${newChildren === 1 ? 'Child' : 'Children'}` : ''}`
    }));
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[60vh] w-full overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/heritage-uploads/taj-luxury.jpg')" }}
        >
          <div className="absolute inset-0 bg-accent/20"></div>
        </div>

        <div className="container-custom relative h-full flex flex-col justify-center items-center text-center">
          <div className="max-w-4xl">
            <h1 className="text-foreground text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Craft Your Dream Agra Experience
            </h1>
            <p className="text-foreground/80 text-lg md:text-xl mb-8">
              Let our luxury travel specialists design a bespoke itinerary tailored to your preferences.
            </p>
            <div className="grid md:grid-cols-3 gap-6 mt-8">
              <div className="bg-background/80 backdrop-blur-sm p-6 rounded-lg shadow-lg">
                <h3 className="text-foreground text-xl font-semibold mb-2">Personalized Itinerary</h3>
                <p className="text-foreground/70">Customized tours based on your interests and schedule</p>
              </div>
              <div className="bg-background/80 backdrop-blur-sm p-6 rounded-lg shadow-lg">
                <h3 className="text-foreground text-xl font-semibold mb-2">Expert Guides</h3>
                <p className="text-foreground/70">Knowledgeable guides with years of experience</p>
              </div>
              <div className="bg-background/80 backdrop-blur-sm p-6 rounded-lg shadow-lg">
                <h3 className="text-foreground text-xl font-semibold mb-2">Luxury Experience</h3>
                <p className="text-foreground/70">Premium services and exclusive access to attractions</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div id="request-form" className="bg-white rounded-xl p-6 md:p-8 shadow-lg">
              <h2 className="text-2xl md:text-3xl font-bold mb-6">Request Your Custom Tour</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">Full Name</label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">Email</label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium mb-2">Phone</label>
                  <div className="flex gap-2">
                    <Select
                      value={formData.countryCode}
                      onValueChange={handleCountryCodeChange}
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
                      onChange={handleChange}
                      required
                      className="flex-1"
                      placeholder="Enter phone number"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="travelDates" className="block text-sm font-medium mb-2">Travel Dates</label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !date && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={handleDateSelect}
                        initialFocus
                        disabled={(date) => date < new Date()}
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div>
                  <label htmlFor="groupSize" className="block text-sm font-medium mb-2">Group Size</label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left font-normal"
                      >
                        <Users className="mr-2 h-4 w-4" />
                        {formData.groupSize || "Select group size"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-80 p-4">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium">Adults</h4>
                            <p className="text-sm text-muted-foreground">Age 13+</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => updateGroupSize(Math.max(1, adults - 1), children)}
                              disabled={adults <= 1}
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                            <span className="w-8 text-center">{adults}</span>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => updateGroupSize(adults + 1, children)}
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium">Children</h4>
                            <p className="text-sm text-muted-foreground">Ages 2-12</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => updateGroupSize(adults, Math.max(0, children - 1))}
                              disabled={children <= 0}
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                            <span className="w-8 text-center">{children}</span>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => updateGroupSize(adults, children + 1)}
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>

                <div>
                  <label htmlFor="interests" className="block text-sm font-medium mb-2">Interests (Select up to 3)</label>
                  <div className="space-y-2">
                    <Select
                      value=""
                      onValueChange={handleInterestSelect}
                      disabled={selectedInterests.length >= 3}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder={selectedInterests.length >= 3 ? "Maximum interests selected" : "Select your interests"} />
                      </SelectTrigger>
                      <SelectContent>
                        {interests.map((interest) => (
                          <SelectItem
                            key={interest.value}
                            value={interest.value}
                            disabled={selectedInterests.includes(interest.value)}
                          >
                            {interest.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {selectedInterests.map((interest) => (
                        <Badge
                          key={interest}
                          variant="secondary"
                          className="flex items-center gap-1 px-3 py-1"
                        >
                          {interests.find(i => i.value === interest)?.label}
                          <button
                            type="button"
                            onClick={() => removeInterest(interest)}
                            className="ml-1 hover:text-destructive"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                <div>
                  <label htmlFor="specialRequests" className="block text-sm font-medium mb-2">Special Requests</label>
                  <Textarea
                    id="specialRequests"
                    name="specialRequests"
                    value={formData.specialRequests}
                    onChange={handleChange}
                    className="w-full h-32"
                    placeholder="Tell us about your dream experience..."
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full py-6 text-lg"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Sending..." : "Send Request"}
                </Button>

                <div className="flex items-center justify-center gap-4 mt-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Shield size={16} />
                    <span>SSL Secured</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Lock size={16} />
                    <span>GDPR Compliant</span>
                  </div>
                </div>
              </form>
            </div>

            {/* Contact Options & Testimonial */}
            <div className="space-y-8">
              {/* Testimonial */}
              <div className="bg-white rounded-xl p-6 md:p-8 shadow-lg">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center">
                    <span className="text-xl font-bold text-accent-foreground">S</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">Sarah & John</h4>
                    <p className="text-sm text-gray-600">Anniversary Celebration</p>
                  </div>
                </div>
                <blockquote className="text-gray-700 italic">
                  "The team designed a flawless private tour of Agra for our anniversary. Every detail was perfection! From the sunrise visit to the Taj Mahal to the romantic dinner with a view, it was everything we dreamed of."
                </blockquote>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CustomTour;
