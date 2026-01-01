import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import AuthModal from "@/components/AuthModal";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Plus, Minus, ArrowLeft, Clock, Users, MapPin, Star, Info, Building2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import ThemedNavbar from "@/components/ThemedNavbar";
import Footer from "@/components/Footer";
import HotelSelection from "@/components/HotelSelection";
import { Separator } from "@/components/ui/separator";
import UploadDocumentsModal from "@/components/UploadDocumentsModal";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
} from "@/components/ui/dialog";


// Tour data (moved from ToursPage for now, should be in a separate data file)
const tourPackages = [
  {
    id: "imperial-agra-day-tour",
    title: "Imperial Agra Day Tour",
    description: "Experience the grandeur of Agra's most iconic monuments in a single day. Visit the Taj Mahal, Agra Fort, and other historical sites with our expert guides.",
    image: "/heritage-uploads/taj fort.jpg",
    rating: 4.9,
    reviews: 128,
    tags: ["best-seller", "day-tour"],
    price: 195,
    highlights: [
      "Skip-the-line entry to Taj Mahal",
      "Expert local guide",
      "Luxury AC vehicle",
      "Lunch at a heritage restaurant",
      "Hotel pickup and drop-off"
    ]
  },
  {
    id: "royal-mughal-heritage",
    title: "Royal Mughal Heritage Tour",
    description: "Immerse yourself in the rich Mughal history of Agra with this comprehensive 2-day tour. Explore the city's most magnificent monuments and hidden gems.",
    image: "/heritage-uploads/all.jpg",
    rating: 4.8,
    reviews: 95,
    tags: ["multi-day", "heritage"],
    price: 250,
    highlights: [
      "Extended 2-day exploration",
      "Sunrise and sunset views",
      "Heritage walk in old Agra",
      "Traditional dinner experience",
      "Luxury accommodation included"
    ]
  },
  {
    id: "taj-mahal-sunrise-tour",
    title: "Taj Mahal Sunrise Tour",
    description: "Experience the magic of the Taj Mahal at dawn, when the first rays of sunlight illuminate the marble monument, creating a breathtaking golden glow.",
    image: "/heritage-uploads/taj rise.jpg",
    rating: 4.9,
    reviews: 124,
    tags: ["best-seller", "sunrise"],
    price: 179,
    highlights: [
      "Beat the crowds with early morning access",
      "Witness the changing colors of the Taj at sunrise",
      "Expert historical commentary from our guides",
      "Perfect lighting conditions for photography"
    ]
  },
  {
    id: "romantic-taj-experience",
    title: "Romantic Taj Experience for Couples",
    description: "A special tour designed exclusively for couples to experience the eternal monument of love with romantic elements and private moments.",
    image: "/heritage-uploads/romantic-taj-couples.jpg",
    rating: 4.9,
    reviews: 89,
    tags: ["romantic", "couples"],
    price: 299,
    highlights: [
      "Private viewing of the Taj Mahal",
      "Romantic photo session",
      "Couple's spa treatment",
      "Candlelight dinner",
      "Luxury hotel stay"
    ]
  },
  {
    id: "agra-food-culture-walk",
    title: "Agra Food & Culture Walk",
    description: "Explore the culinary traditions and cultural heritage of Agra, from street food specialties to local artisan workshops.",
    image: "/heritage-uploads/food-culture.jpg",
    rating: 4.7,
    reviews: 67,
    tags: ["food", "cultural"],
    price: 1999,
    highlights: [
      "Local food tasting tour",
      "Visit to traditional markets",
      "Cooking demonstration",
      "Cultural performances",
      "Local guide"
    ]
  },
  {
    id: "mughal-gardens-nature-tour",
    title: "Mughal Gardens & Nature Tour",
    description: "Discover the lush Mughal gardens and natural landscapes around Agra that showcase the dynasty's appreciation for horticulture and design.",
    image: "/heritage-uploads/mughal-gardens.jpg",
    rating: 4.6,
    reviews: 45,
    tags: ["nature", "gardens"],
    price: 2499,
    highlights: [
      "Visit to Mehtab Bagh",
      "Botanical garden tour",
      "Bird watching",
      "Nature photography",
      "Picnic lunch"
    ]
  },
  {
    id: "photography-masterclass-tour",
    title: "Photography Masterclass Tour",
    description: "Perfect your photography skills with our expert guides who will help you capture stunning images of Agra's monuments from the best angles.",
    image: "/heritage-uploads/photography-tour.jpg",
    rating: 4.8,
    reviews: 78,
    tags: ["photography", "learning"],
    price: 3999,
    highlights: [
      "Professional photography guidance",
      "Access to exclusive viewpoints",
      "Equipment provided",
      "Photo editing workshop",
      "Digital photo album"
    ]
  }
];

// Add country list at the top of the file
const countryList = [
  "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cabo Verde", "Cambodia", "Cameroon", "Canada", "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros", "Congo", "Costa Rica", "Croatia", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "East Timor", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini", "Ethiopia", "Fiji", "Finland", "France", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Honduras", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy", "Ivory Coast", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Korea", "North Macedonia", "Norway", "Oman", "Palau", "Palestine", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Qatar", "Romania", "Russia", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Korea", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City", "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe"
];

// Replace countryCodeList with a comprehensive list (excluding Pakistan)
const countryCodeList = [
  { code: "+93", country: "Afghanistan" },
  { code: "+355", country: "Albania" },
  { code: "+213", country: "Algeria" },
  { code: "+376", country: "Andorra" },
  { code: "+244", country: "Angola" },
  { code: "+1-268", country: "Antigua and Barbuda" },
  { code: "+54", country: "Argentina" },
  { code: "+374", country: "Armenia" },
  { code: "+61", country: "Australia" },
  { code: "+43", country: "Austria" },
  { code: "+994", country: "Azerbaijan" },
  { code: "+1-242", country: "Bahamas" },
  { code: "+973", country: "Bahrain" },
  { code: "+880", country: "Bangladesh" },
  { code: "+1-246", country: "Barbados" },
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
  { code: "+238", country: "Cabo Verde" },
  { code: "+855", country: "Cambodia" },
  { code: "+237", country: "Cameroon" },
  { code: "+1", country: "Canada" },
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
  { code: "+1-767", country: "Dominica" },
  { code: "+1-809", country: "Dominican Republic" },
  { code: "+670", country: "East Timor" },
  { code: "+593", country: "Ecuador" },
  { code: "+20", country: "Egypt" },
  { code: "+503", country: "El Salvador" },
  { code: "+240", country: "Equatorial Guinea" },
  { code: "+291", country: "Eritrea" },
  { code: "+372", country: "Estonia" },
  { code: "+268", country: "Eswatini" },
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
  { code: "+1-473", country: "Grenada" },
  { code: "+502", country: "Guatemala" },
  { code: "+224", country: "Guinea" },
  { code: "+245", country: "Guinea-Bissau" },
  { code: "+592", country: "Guyana" },
  { code: "+509", country: "Haiti" },
  { code: "+504", country: "Honduras" },
  { code: "+36", country: "Hungary" },
  { code: "+354", country: "Iceland" },
  { code: "+91", country: "India" },
  { code: "+62", country: "Indonesia" },
  { code: "+98", country: "Iran" },
  { code: "+964", country: "Iraq" },
  { code: "+353", country: "Ireland" },
  { code: "+972", country: "Israel" },
  { code: "+39", country: "Italy" },
  { code: "+225", country: "Ivory Coast" },
  { code: "+1-876", country: "Jamaica" },
  { code: "+81", country: "Japan" },
  { code: "+962", country: "Jordan" },
  { code: "+7", country: "Kazakhstan" },
  { code: "+254", country: "Kenya" },
  { code: "+686", country: "Kiribati" },
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
  { code: "+850", country: "North Korea" },
  { code: "+389", country: "North Macedonia" },
  { code: "+47", country: "Norway" },
  { code: "+968", country: "Oman" },
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
  { code: "+1-869", country: "Saint Kitts and Nevis" },
  { code: "+1-758", country: "Saint Lucia" },
  { code: "+1-784", country: "Saint Vincent and the Grenadines" },
  { code: "+685", country: "Samoa" },
  { code: "+378", country: "San Marino" },
  { code: "+239", country: "Sao Tome and Principe" },
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
  { code: "+82", country: "South Korea" },
  { code: "+211", country: "South Sudan" },
  { code: "+34", country: "Spain" },
  { code: "+94", country: "Sri Lanka" },
  { code: "+249", country: "Sudan" },
  { code: "+597", country: "Suriname" },
  { code: "+46", country: "Sweden" },
  { code: "+41", country: "Switzerland" },
  { code: "+963", country: "Syria" },
  { code: "+886", country: "Taiwan" },
  { code: "+992", country: "Tajikistan" },
  { code: "+255", country: "Tanzania" },
  { code: "+66", country: "Thailand" },
  { code: "+228", country: "Togo" },
  { code: "+676", country: "Tonga" },
  { code: "+1-868", country: "Trinidad and Tobago" },
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
  { code: "+263", country: "Zimbabwe" },
];

// Add document type lists at the top
const documentTypesIndian = [
  { value: "pan", label: "PAN Card" },
  { value: "dl", label: "Driving License" },
  { value: "passport", label: "Passport" },
];
const documentTypesForeigner = [
  { value: "passport", label: "Passport" },
];

// Helper to calculate nights between two dates
function getNights(checkIn, checkOut) {
  if (!checkIn || !checkOut) return 0;
  const msPerDay = 1000 * 60 * 60 * 24;
  return Math.max(1, Math.round((checkOut - checkIn) / msPerDay));
}

const BookingPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated, isLoading: authLoading } = useAuth();

  // State Definitions
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [date, setDate] = useState<Date>();
  const [adultCount, setAdultCount] = useState(1);
  const [childCount, setChildCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [showHotelBooking, setShowHotelBooking] = useState(false);
  const [hotelBooking, setHotelBooking] = useState<any | null>(null);
  const [step, setStep] = useState(1);
  const [visitorType, setVisitorType] = useState<'indian' | 'foreigner' | null>(null);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [persons, setPersons] = useState([
    // Adult 1 (prefilled if user is logged in)
  ]);
  const [originError, setOriginError] = useState(false);
  const [showOriginPopup, setShowOriginPopup] = useState(false);

  // Country selection
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedCountryCode, setSelectedCountryCode] = useState("");

  // Form fields
  const [mainName, setMainName] = useState("");
  const [mainAge, setMainAge] = useState("");
  const [mainDocumentType, setMainDocumentType] = useState("");
  const [mainEmail, setMainEmail] = useState("");
  const [mainEmailError, setMainEmailError] = useState("");
  const [mainMobile, setMainMobile] = useState("");
  const [mainMobileError, setMainMobileError] = useState("");
  const [mainNameError, setMainNameError] = useState("");
  const [mainAgeError, setMainAgeError] = useState("");
  const [mainDocumentTypeError, setMainDocumentTypeError] = useState("");
  const [uploadDocumentError, setUploadDocumentError] = useState("");

  // UI states
  const [showVentureDetails, setShowVentureDetails] = useState(false);
  const [showMohabbatModal, setShowMohabbatModal] = useState(false);
  const [showLanguageInfo, setShowLanguageInfo] = useState(false);

  // Mohabbat-e-Taj
  const [mohabbatSeats, setMohabbatSeats] = useState(0);
  const [mohabbatTotal, setMohabbatTotal] = useState(0);
  const [mohabbatDate, setMohabbatDate] = useState("");

  // Tour Date
  const [tourDate, setTourDate] = useState<Date | null>(null);
  const [tourDatePopoverOpen, setTourDatePopoverOpen] = useState(false);

  // Derived state: Find tour details
  const tourDetails = tourPackages.find(tour => {
    const tourId = tour.id.toLowerCase().replace(/\s+/g, '-');
    const paramId = id?.toLowerCase().replace(/\s+/g, '-');
    return tourId === paramId;
  });

  // Effects
  useEffect(() => {
    // Simulate loading state
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, [id]);

  // --- AUTH GUARDS (Must be after all hooks) ---

  // 1. Auth Loading State
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent"></div>
      </div>
    );
  }

  // 2. Auth Required Check
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <ThemedNavbar />
        <div className="max-w-md w-full text-center mt-20">
          <Card className="p-8 shadow-lg">
            <h2 className="text-2xl font-bold mb-4 font-playfair">Login Required</h2>
            <p className="text-gray-600 mb-6">Please log in to your account to book this tour.</p>
            <Button
              onClick={() => setShowAuthModal(true)}
              className="w-full bg-black text-white hover:bg-gray-800"
            >
              Log In / Sign Up
            </Button>
          </Card>
        </div>
        <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
      </div>
    );
  }

  const handleAdultCountChange = (increment: boolean) => {
    if (increment) {
      setAdultCount(prev => prev + 1);
    } else {
      setAdultCount(prev => (prev > 1 ? prev - 1 : 1));
    }
  };

  const handleChildCountChange = (increment: boolean) => {
    if (increment) {
      setChildCount(prev => prev + 1);
    } else {
      setChildCount(prev => (prev > 0 ? prev - 1 : 0));
    }
  };

  const calculateTotal = () => {
    if (!tourDetails) return 0;
    const adultTotal = tourDetails.price * adultCount;
    const childTotal = tourDetails.price * 0.5 * childCount;
    const hotelTotal = hotelBooking ? hotelBooking.price : 0;
    return adultTotal + childTotal + hotelTotal;
  };

  const handleProceedToPayment = () => {
    let hasError = false;
    if (!date) {
      toast.error("Please select a date");
      hasError = true;
    }
    if (!mainName) {
      setMainNameError("Name is required");
      hasError = true;
    } else {
      setMainNameError("");
    }
    if (!mainAge) {
      setMainAgeError("Age is required");
      hasError = true;
    } else {
      setMainAgeError("");
    }
    if (!mainEmail || !/^\S+@\S+\.\S+$/.test(mainEmail)) {
      setMainEmailError("Please enter a valid email address");
      hasError = true;
    } else {
      setMainEmailError("");
    }
    if (!mainMobile) {
      setMainMobileError("Mobile number is required");
      hasError = true;
    } else {
      setMainMobileError("");
    }
    if (!mainDocumentType) {
      setMainDocumentTypeError("ID Proof is required");
      hasError = true;
    } else {
      setMainDocumentTypeError("");
    }
    // Check if document is uploaded for Adult 1 (simulate with persons[0]?.file)
    if (!persons[0] || !persons[0].file) {
      setUploadDocumentError("Upload document is required");
      hasError = true;
    } else {
      setUploadDocumentError("");
    }
    if (hasError) return;
    // TODO: Implement payment flow
    toast.success("Proceeding to payment...");
  };

  const handleHotelSelection = (hotelId: string, roomId: string, checkIn: Date, checkOut: Date, roomPrice: number) => {
    setHotelBooking({
      hotelId,
      roomId,
      checkIn: tourDate || checkIn,
      checkOut,
      price: roomPrice
    });
    setShowHotelBooking(false); // Hide the hotel selection after booking
  };

  const handleRemoveHotelStay = () => {
    setHotelBooking(null);
    setShowHotelBooking(false);
  };

  // Handler for language select
  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (value && value !== "Hindi" && value !== "-- Select Language --") {
      setShowLanguageInfo(true);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent"></div>
      </div>
    );
  }

  if (!tourDetails) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <ThemedNavbar />
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Tour Not Found</h1>
          <p className="text-muted-foreground mb-6">The tour you're looking for doesn't exist.</p>
          <Button
            onClick={() => navigate('/tours')}
            className="bg-accent hover:bg-accent/90"
          >
            Back to Tours
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <ThemedNavbar />

      {/* Hero Section */}
      <div className="relative h-[40vh] bg-gray-900">
        <img
          src={tourDetails.image}
          alt={tourDetails.title}
          className="w-full h-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/70">
          <div className="container-custom h-full flex items-center">
            <div className="text-white">
              <Button
                variant="outline"
                className="mb-6 bg-white/10 hover:bg-white/20 text-white border-white/20"
                onClick={() => navigate('/tours')}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Tours
              </Button>
              <h1 className="text-4xl md:text-5xl font-playfair font-bold mb-4">
                {tourDetails.title}
              </h1>
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center">
                  <Star className="text-yellow-400 fill-yellow-400 mr-1" size={16} />
                  <span>{tourDetails.rating}</span>
                  <span className="text-gray-400 ml-1">({tourDetails.reviews} reviews)</span>
                </div>
                <div className="flex items-center">
                  <Clock className="mr-1" size={16} />
                  <span>{tourDetails.highlights[0]}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container-custom py-8 md:py-12 flex flex-col items-center justify-center min-h-[60vh]">
        <div className="w-full space-y-6 md:space-y-8 px-0">
          <Card className="p-6">
            <h2 className="text-2xl font-playfair font-bold text-gray-900 mb-4">
              Tour Overview
            </h2>
            <p className="text-gray-600 mb-6">{tourDetails.description}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="flex items-start gap-3">
                <Clock className="text-accent mt-1" size={20} />
                <div>
                  <h3 className="font-medium text-gray-900">Duration</h3>
                  <p className="text-gray-600">{tourDetails.highlights[0]}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Users className="text-accent mt-1" size={20} />
                <div>
                  <h3 className="font-medium text-gray-900">Group Size</h3>
                  <p className="text-gray-600">Small groups of 2-8 people</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="text-accent mt-1" size={20} />
                <div>
                  <h3 className="font-medium text-gray-900">Location</h3>
                  <p className="text-gray-600">Agra, Uttar Pradesh, India</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Info className="text-accent mt-1" size={20} />
                <div>
                  <h3 className="font-medium text-gray-900">Tour Type</h3>
                  <p className="text-gray-600">
                    {tourDetails.tags?.includes("best-seller") ? "Best Seller" :
                      tourDetails.tags?.includes("romantic") ? "Couples Special" :
                        tourDetails.tags?.includes("special") ? "Special Tour" : "Standard Tour"}
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-playfair font-bold text-gray-900">
                Tour Highlights
              </h3>
              <ul className="space-y-2">
                {tourDetails.highlights.map((highlight, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2"></div>
                    <span className="text-gray-600">{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Card>

          {/* Booking Form */}
          <Card className="p-6">
            <h2 className="text-2xl font-playfair font-bold text-gray-900 mb-6">
              Book Your Tour
            </h2>
            <form className="space-y-4" onSubmit={e => e.preventDefault()}>
              {/* Tour Date Selection */}
              <div>
                <label className="block font-semibold mb-2">Select Tour Date<span className="text-red-500">*</span></label>
                <Popover open={tourDatePopoverOpen} onOpenChange={setTourDatePopoverOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn("w-full justify-start text-left font-normal", !tourDate && "text-muted-foreground")}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {tourDate ? format(tourDate, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="center">
                    <Calendar
                      mode="single"
                      selected={tourDate || undefined}
                      onSelect={(date) => { setTourDate(date); setTourDatePopoverOpen(false); }}
                      className={cn("p-3 pointer-events-auto")}
                      disabled={(date) => date < new Date()}
                    />
                  </PopoverContent>
                </Popover>
                {!tourDate && <div className="text-red-500 text-xs mt-1">Tour date is required</div>}
              </div>
              {/* Origin Selection */}
              <div>
                <label className="block font-semibold mb-2">Select Origin<span className="text-red-500">*</span></label>
                <div className="flex gap-6 items-center">
                  <label className="flex items-center gap-2">
                    <input type="radio" name="origin" value="indian" checked={visitorType === 'indian'} onChange={() => { setVisitorType('indian'); setOriginError(false); }} />
                    INDIAN
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="radio" name="origin" value="foreigner" checked={visitorType === 'foreigner'} onChange={() => { setVisitorType('foreigner'); setOriginError(false); }} />
                    FOREIGNER
                  </label>
                </div>
                {originError && <div className="text-red-500 text-xs mt-1">Please select your origin to proceed.</div>}
              </div>
              {/* Country (if Foreigner) */}
              {visitorType === 'foreigner' && (
                <div>
                  <label className="block font-semibold mb-1">Select Country</label>
                  <select
                    className="w-full border rounded px-3 py-2"
                    required
                    value={selectedCountry}
                    onChange={e => {
                      setSelectedCountry(e.target.value);
                      // Find the country code for the selected country
                      const found = countryCodeList.find(item => item.country.toLowerCase() === e.target.value.toLowerCase());
                      setSelectedCountryCode(found ? found.code : "");
                    }}
                  >
                    <option value="">Select Country</option>
                    {countryList.map(country => (
                      <option key={country} value={country}>{country}</option>
                    ))}
                  </select>
                  <div className="text-red-500 text-xs mt-1">Field is Required</div>
                </div>
              )}
              {/* Visitor Count */}
              <div>
                <label className="block font-semibold mb-2">Select Total No of Visitors</label>
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 items-start sm:items-center mb-1">
                  <div className="flex items-center gap-2">
                    <span>Adult</span>
                    <Button type="button" variant="outline" size="icon" onClick={() => setAdultCount(Math.max(1, adultCount - 1))}><Minus /></Button>
                    <span className="w-8 text-center">{adultCount.toString().padStart(2, '0')}</span>
                    <Button type="button" variant="outline" size="icon" onClick={() => setAdultCount(adultCount + 1)}><Plus /></Button>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>Child</span>
                    <Button type="button" variant="outline" size="icon" onClick={() => setChildCount(Math.max(0, childCount - 1))}><Minus /></Button>
                    <span className="w-8 text-center">{childCount.toString().padStart(2, '0')}</span>
                    <Button type="button" variant="outline" size="icon" onClick={() => setChildCount(childCount + 1)}><Plus /></Button>
                  </div>
                </div>
                <div className="text-xs text-gray-700 font-semibold mt-2 mb-4">
                  Note:<br />
                  1. NO ticket for children below than 4 years.<br />
                  2. For the age group of children between 4 & below 15 years pricing reflects 50% reduction
                </div>
              </div>
              {/* Name, Age, Email, Gender */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold mb-1">Name<span className="text-red-500">*</span></label>
                  <input className={`w-full border rounded px-3 py-2 ${mainNameError ? 'border-red-500' : ''}`} required value={mainName} onChange={e => { setMainName(e.target.value); if (mainNameError) setMainNameError(""); }} />
                  {mainNameError && <div className="text-red-500 text-xs mt-1">{mainNameError}</div>}
                </div>
                <div>
                  <label className="block font-semibold mb-1">Age<span className="text-red-500">*</span></label>
                  <input className={`w-full border rounded px-3 py-2 ${mainAgeError ? 'border-red-500' : ''}`} type="number" required value={mainAge} onChange={e => { setMainAge(e.target.value); if (mainAgeError) setMainAgeError(""); }} />
                  {mainAgeError && <div className="text-red-500 text-xs mt-1">{mainAgeError}</div>}
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold mb-1">Email<span className="text-red-500">*</span></label>
                  <input
                    className={`w-full border rounded px-3 py-2 ${mainEmailError ? 'border-red-500' : ''}`}
                    type="email"
                    required
                    value={mainEmail}
                    onChange={e => {
                      setMainEmail(e.target.value);
                      if (mainEmailError) setMainEmailError("");
                    }}
                    onBlur={e => {
                      const value = e.target.value;
                      if (!value) {
                        setMainEmailError("Email is required");
                      } else if (!/^\S+@\S+\.\S+$/.test(value)) {
                        setMainEmailError("Please enter a valid email address");
                      } else {
                        setMainEmailError("");
                      }
                    }}
                  />
                  {mainEmailError && (
                    <div className="text-red-500 text-xs mt-1">{mainEmailError}</div>
                  )}
                </div>
                <div className="flex items-center gap-4 mt-6 md:mt-0">
                  <label className="font-semibold">Gender</label>
                  <label className="flex items-center gap-1"><input type="radio" name="gender" /> Male</label>
                  <label className="flex items-center gap-1"><input type="radio" name="gender" /> Female</label>
                  <label className="flex items-center gap-1"><input type="radio" name="gender" /> Others</label>
                </div>
              </div>
              {/* Country Code, Mobile No */}
              {visitorType === 'foreigner' && (
                <div>
                  <label className="block font-semibold mb-1">Country Code<span className="text-red-500">*</span></label>
                  <select
                    className="w-full border rounded px-3 py-2"
                    required
                    value={selectedCountryCode}
                    onChange={e => setSelectedCountryCode(e.target.value)}
                  >
                    <option value="">Select Code</option>
                    {countryCodeList.map(item => (
                      <option key={item.code} value={item.code}>{item.code} ({item.country})</option>
                    ))}
                  </select>
                  <div className="text-red-500 text-xs mt-1">Field is Required</div>
                </div>
              )}
              <div>
                <label className="block font-semibold mb-1">Mobile No<span className="text-red-500">*</span></label>
                <input className={`w-full border rounded px-3 py-2 ${mainMobileError ? 'border-red-500' : ''}`} type="tel" required value={mainMobile} onChange={e => { setMainMobile(e.target.value); if (mainMobileError) setMainMobileError(""); }} />
                {mainMobileError && <div className="text-red-500 text-xs mt-1">{mainMobileError}</div>}
              </div>
              {/* ID Proof, Proof Value */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold mb-1">ID Proof</label>
                  <select
                    className={`w-full border rounded px-3 py-2 ${mainDocumentTypeError ? 'border-red-500' : ''}`}
                    value={mainDocumentType}
                    onChange={e => { setMainDocumentType(e.target.value); if (mainDocumentTypeError) setMainDocumentTypeError(""); }}
                    onFocus={e => { if (!visitorType) { e.target.blur(); setShowOriginPopup(true); } }}
                    onMouseDown={e => { if (!visitorType) { e.preventDefault(); setShowOriginPopup(true); } }}
                  >
                    <option value="">Select Id</option>
                    {(visitorType === 'indian' ? documentTypesIndian : documentTypesForeigner).map(dt => (
                      <option key={dt.value} value={dt.value}>{dt.label}</option>
                    ))}
                  </select>
                  {mainDocumentTypeError && <div className="text-red-500 text-xs mt-1">{mainDocumentTypeError}</div>}
                </div>
              </div>
              {/* Add Upload button */}
              <div className="pt-4">
                <Button type="button" className="w-full h-12 text-lg bg-accent hover:bg-accent/90 transition-all duration-300 hover:scale-[1.02]" onClick={() => {
                  if (!visitorType) {
                    setOriginError(true);
                    return;
                  }
                  // Build persons array based on adultCount and childCount
                  const personsArr = [];
                  // Prefill Adult 1 (simulate logged-in user for now)
                  personsArr.push({ name: mainName, age: mainAge, type: "adult", documentType: mainDocumentType, file: persons[0]?.file || null });
                  for (let i = 1; i < adultCount; i++) {
                    personsArr.push({ name: "", age: undefined, type: "adult", documentType: "", file: null });
                  }
                  for (let i = 0; i < childCount; i++) {
                    personsArr.push({ name: "", age: undefined, type: "kid", documentType: "GOVT ID PROOF", file: null });
                  }
                  setPersons(personsArr);
                  setShowUploadModal(true);
                }} disabled={!visitorType}>
                  Upload Document
                </Button>
                {uploadDocumentError && <div className="text-red-500 text-xs mt-1">{uploadDocumentError}</div>}
              </div>
            </form>
          </Card>

          {/* Hotel Booking Section */}
          <Card className="p-6">
            <h2 className="text-2xl font-playfair font-bold text-gray-900 mb-6">
              Hotel Stay
            </h2>
            {!showHotelBooking && !hotelBooking ? (
              <Button
                variant="outline"
                className="w-full"
                onClick={() => setShowHotelBooking(true)}
              >
                <Building2 className="mr-2 h-4 w-4" />
                Add Hotel Stay
              </Button>
            ) : (
              <div>
                {hotelBooking && (
                  <div className="bg-gray-100 rounded-lg p-4 mt-4">
                    <div className="flex items-center justify-between text-gray-600">
                      <span>Check-in:</span>
                      <span>{hotelBooking.checkIn?.toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center justify-between text-gray-600">
                      <span>Check-out:</span>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="outline" size="sm">
                            {hotelBooking.checkOut ? hotelBooking.checkOut.toLocaleDateString() : 'Select'}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="center">
                          <Calendar
                            mode="single"
                            selected={hotelBooking.checkOut || undefined}
                            onSelect={(date) => {
                              if (date && hotelBooking.checkIn && date > hotelBooking.checkIn) {
                                setHotelBooking({ ...hotelBooking, checkOut: date });
                              }
                            }}
                            className={cn("p-3 pointer-events-auto")}
                            disabled={(date) => !hotelBooking.checkIn || date <= hotelBooking.checkIn}
                          // Always allow any date after check-in, regardless of current check-out
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                    <div className="flex items-center justify-between text-gray-600">
                      <span>Nights:</span>
                      <span>{getNights(hotelBooking.checkIn, hotelBooking.checkOut)}</span>
                    </div>
                    <div className="flex items-center justify-between text-gray-600 font-bold">
                      <span>Hotel Total:</span>
                      <span>${hotelBooking.price} x {getNights(hotelBooking.checkIn, hotelBooking.checkOut)} = ${hotelBooking.price * getNights(hotelBooking.checkIn, hotelBooking.checkOut)}</span>
                    </div>
                    <Button variant="outline" onClick={handleRemoveHotelStay}>
                      Remove Hotel Stay
                    </Button>
                  </div>
                )}
                {hotelBooking ? (
                  <HotelSelection
                    onHotelSelect={handleHotelSelection}
                    onRemoveHotelStay={handleRemoveHotelStay}
                    checkIn={tourDate}
                  />
                ) : (
                  <HotelSelection
                    onHotelSelect={handleHotelSelection}
                    onRemoveHotelStay={handleRemoveHotelStay}
                    checkIn={tourDate}
                  />
                )}
              </div>
            )}
          </Card>

          {/* Prevelant venture Section */}
          <Card className="p-6 mt-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-playfair font-bold text-gray-900">
                Prevelant Venture
              </h2>
              {showVentureDetails && (
                <button
                  className="text-2xl font-bold text-gray-500 hover:text-gray-800 focus:outline-none ml-2"
                  onClick={() => setShowVentureDetails(false)}
                  aria-label="Collapse section"
                >
                  &minus;
                </button>
              )}
            </div>
            {!showVentureDetails ? (
              <Button className="mb-2" onClick={() => setShowVentureDetails(true)}>More</Button>
            ) : (
              <div className="mb-4">
                <h3 className="text-lg font-semibold mb-1">Mohabbat-e-Taj: Agra’s Finest Cultural Performance</h3>
                <p className="text-gray-700 mb-2">
                  Experience Agra’s most enchanting theatrical spectacle as the timeless love story of Shah Jahan and Mumtaz Mahal comes alive on stage.<br />
                  A grand cultural evening of music, dance, and regal Mughal elegance at the Kalakriti Theatre.
                </p>
                {mohabbatTotal > 0 && mohabbatSeats > 0 ? (
                  <div className="mt-2 p-4 bg-accent/10 rounded-lg border border-accent text-accent-foreground">
                    <div className="flex flex-wrap items-center justify-between mb-2">
                      <span className="font-semibold">Added: Mohabbat-e-Taj (6:45pm)</span>
                      <span className="ml-4">Date: <span className="font-bold">{mohabbatDate ? new Date(mohabbatDate).toLocaleDateString() : '-'}</span></span>
                      <span className="ml-4">Seats: <span className="font-bold">{mohabbatSeats}</span></span>
                      <span className="ml-4">Total: <span className="font-bold">${mohabbatTotal}</span></span>
                    </div>
                    <div className="flex gap-2 mt-2">
                      <Button variant="outline" className="text-red-600 border-red-300 hover:bg-red-50" onClick={() => { setMohabbatSeats(0); setMohabbatTotal(0); setMohabbatDate(""); }}>Remove</Button>
                      <Button variant="outline" className="border-accent hover:bg-accent/20" onClick={() => setShowMohabbatModal(true)}>Edit</Button>
                    </div>
                  </div>
                ) : (
                  <Button className="mt-2" onClick={() => setShowMohabbatModal(true)}>Add</Button>
                )}
              </div>
            )}
          </Card>

          {/* Mohabbat-e-Taj Modal */}
          <Dialog open={showMohabbatModal} onOpenChange={setShowMohabbatModal}>
            <DialogContent className="max-w-4xl w-full p-0 bg-white rounded-2xl overflow-hidden shadow-2xl border border-gold">
              <div className="flex flex-col md:flex-row">
                {/* Left: Image */}
                <div className="md:w-1/2 w-full h-80 md:h-[32rem] bg-black flex items-center justify-center">
                  <img src="/heritage-uploads/kala.webp" alt="Mohabbat The Taj" className="object-cover w-full h-full rounded-l-2xl" />
                </div>
                {/* Right: Form */}
                <div className="md:w-1/2 w-full">
                  <div className="bg-accent text-accent-foreground py-6 px-4 md:px-8 flex flex-col md:flex-row md:items-center md:justify-between">
                    <h2 className="text-2xl md:text-4xl font-playfair font-bold drop-shadow tracking-wide mb-2 md:mb-0">Mohabbat The Taj (06:45 PM)</h2>
                    <span className="text-xl font-montserrat font-semibold bg-gold/10 text-white px-4 py-2 rounded-lg shadow-sm">$78 <span className="text-base font-normal">per person</span></span>
                  </div>
                  <form className="p-4 md:p-8 space-y-6 bg-white">
                    <div className="flex items-center border rounded px-4 py-3 mb-2 bg-gray-50">
                      <span className="mr-3 text-gray-400"><svg width="22" height="22" fill="none" stroke="currentColor"><rect width="16" height="16" x="3" y="3" rx="2" strokeWidth="2" /><path d="M17 7H5M9 11h4" strokeWidth="2" /></svg></span>
                      <input
                        type="date"
                        className="w-full bg-transparent outline-none font-montserrat text-lg"
                        placeholder="Select Show Date"
                        value={mohabbatDate}
                        onChange={e => setMohabbatDate(e.target.value)}
                      />
                    </div>
                    <div className="flex items-center border rounded px-4 py-3 mb-2 bg-gray-50">
                      <span className="mr-3 text-gray-400"><svg width="22" height="22" fill="none" stroke="currentColor"><rect width="16" height="16" x="3" y="3" rx="2" strokeWidth="2" /><path d="M10 7v8M7 10h8" strokeWidth="2" /></svg></span>
                      <select
                        className="w-full bg-transparent outline-none font-montserrat text-lg"
                        value={mohabbatSeats || ''}
                        onChange={e => setMohabbatSeats(Number(e.target.value))}
                      >
                        <option value="">Select No. of Seats</option>
                        {[...Array(10)].map((_, i) => <option key={i + 1} value={i + 1}>{i + 1}</option>)}
                      </select>
                    </div>
                    <div className="flex items-center border rounded px-4 py-3 mb-2 bg-gray-50">
                      <span className="mr-3 text-gray-400"><svg width="22" height="22" fill="none" stroke="currentColor"><rect width="16" height="16" x="3" y="3" rx="2" strokeWidth="2" /><path d="M7 11h8" strokeWidth="2" /></svg></span>
                      <select className="w-full bg-transparent outline-none font-montserrat text-lg" onChange={handleLanguageChange}>
                        <option>-- Select Language --</option>
                        <option>English</option>
                        <option>French</option>
                        <option>German</option>
                        <option>Hindi</option>
                        <option>Italian</option>
                        <option>Spanish</option>
                      </select>
                    </div>
                    <div className="flex items-center border rounded px-4 py-3 mb-2 bg-gray-50">
                      <span className="mr-3 text-gray-400"><svg width="22" height="22" fill="none" stroke="currentColor"><rect width="16" height="16" x="3" y="3" rx="2" strokeWidth="2" /><path d="M7 11h8" strokeWidth="2" /></svg></span>
                      <input className="w-full bg-transparent outline-none font-montserrat text-lg" value="Category: Maharaja" disabled />
                    </div>
                    <button
                      type="submit"
                      className="w-full btn-primary text-2xl font-playfair font-bold py-3 rounded-full mt-4 shadow-md hover:bg-gold transition-all"
                      onClick={e => {
                        e.preventDefault();
                        setMohabbatTotal(mohabbatSeats * 78);
                        setShowMohabbatModal(false);
                      }}
                      disabled={!mohabbatSeats || !mohabbatDate}
                    >
                      SUBMIT
                    </button>
                  </form>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          {/* Language Info Modal */}
          <Dialog open={showLanguageInfo} onOpenChange={setShowLanguageInfo}>
            <DialogContent className="max-w-md w-full p-0 bg-background rounded-2xl overflow-hidden shadow-2xl border border-gold">
              <div className="p-8 text-center">
                <h2 className="text-xl font-playfair font-bold mb-4 text-accent-foreground">Language interpretation facility will be provided by Ear Phones only.<br />Live show is in Hindi+Urdu.</h2>
                <Button className="btn-primary text-lg font-playfair px-8 py-2 mt-4" onClick={() => setShowLanguageInfo(false)}>OK</Button>
              </div>
            </DialogContent>
          </Dialog>

          {/* Total Amount Section */}
          <Card className="p-6 mt-6">
            <div className="flex justify-between text-2xl font-bold">
              <span>Total Amount</span>
              <span>${calculateTotal() + (mohabbatTotal || 0)}</span>
            </div>
            {hotelBooking && hotelBooking.price > 0 && (
              <div className="flex justify-between text-lg font-semibold text-gold mt-2">
                <span>Hotel Booking</span>
                <span>${hotelBooking.price}</span>
              </div>
            )}
            {mohabbatTotal > 0 && (
              <div className="flex justify-between text-lg font-semibold text-gold mt-2">
                <span>Mohabbat-e-Taj Venture</span>
                <span>${mohabbatTotal}</span>
              </div>
            )}
            <Button
              className="w-full mt-6"
              onClick={handleProceedToPayment}
              disabled={!date}
            >
              Proceed to Payment
            </Button>
          </Card>
        </div>
      </div>
      <Footer />
      {/* Show the modal when showUploadModal is true */}
      {showUploadModal && (
        <UploadDocumentsModal
          persons={persons}
          visitorType={visitorType}
          onClose={() => setShowUploadModal(false)}
        />
      )}
      {/* Show popup if needed */}
      {showOriginPopup && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-40">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full text-center">
            <div className="text-lg font-semibold mb-4">Please select your origin (Indian or Foreigner) first.</div>
            <Button onClick={() => setShowOriginPopup(false)} className="w-full">OK</Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingPage;