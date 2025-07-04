
import { useState } from "react";
import { Mail } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useToast } from "@/hooks/use-toast";

const NewsletterSignup = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate an API call
    setTimeout(() => {
      setIsLoading(false);
      setEmail("");
      toast({
        title: "Success!",
        description: "Thank you for subscribing to our newsletter.",
        variant: "default",
      });
    }, 1000);
  };

  return (
    <div className="bg-accent/10 rounded-xl p-8 shadow-sm fade-in">
      <div className="flex items-center justify-center mb-6">
        <div className="bg-accent/20 p-3 rounded-full">
          <Mail className="text-accent" size={28} />
        </div>
      </div>
      <h2 className="text-2xl font-playfair font-semibold text-center mb-2">Stay Updated</h2>
      <p className="text-center mb-6 text-gray-600">
        Subscribe to our newsletter for exclusive travel tips and special offers on our Agra tours.
      </p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Input
            type="email"
            placeholder="Enter your email address"
            required
            className="w-full"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <Button 
          type="submit" 
          className="w-full bg-accent hover:bg-accent/90"
          disabled={isLoading}
        >
          {isLoading ? "Subscribing..." : "Subscribe"}
        </Button>
      </form>
      <p className="text-xs text-center mt-4 text-gray-500">
        We respect your privacy and will never share your information.
      </p>
    </div>
  );
};

export default NewsletterSignup;
