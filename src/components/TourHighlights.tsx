
import { Check } from "lucide-react";

interface TourHighlightsProps {
  highlights: string[];
  className?: string;
}

const TourHighlights = ({ highlights, className = "" }: TourHighlightsProps) => {
  return (
    <div className={`space-y-2 ${className}`}>
      <h3 className="font-medium text-lg mb-3">Tour Highlights</h3>
      <ul className="space-y-2">
        {highlights.map((highlight, index) => (
          <li key={index} className="flex items-start">
            <div className="mr-2 mt-1 bg-accent/20 p-1 rounded-full flex-shrink-0">
              <Check className="h-3 w-3 text-accent" />
            </div>
            <span className="text-gray-700">{highlight}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TourHighlights;
