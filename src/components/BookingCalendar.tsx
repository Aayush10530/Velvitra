import { useState, useEffect } from "react";
import { Calendar as CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import axios from 'axios';

type AvailabilityStatus = "available" | "limited" | "booked";
type AvailabilityData = Record<string, AvailabilityStatus>;

interface BookingCalendarProps {
  tourId: string;
}

const BookingCalendar = ({ tourId }: BookingCalendarProps) => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [isOpen, setIsOpen] = useState(false);
  const [availabilityData, setAvailabilityData] = useState<AvailabilityData>({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAvailability = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const year = currentMonth.getFullYear();
        const month = currentMonth.getMonth() + 1;
        const response = await axios.get(`/api/availability/${tourId}?year=${year}&month=${month}`);
        
        if (response.data.success) {
          setAvailabilityData(prevData => ({ ...prevData, ...response.data.data }));
        } else {
          throw new Error(response.data.message || 'Failed to fetch availability');
        }
      } catch (err: any) {
        setError(err.message || 'An error occurred while fetching data.');
      } finally {
        setIsLoading(false);
      }
    };

    if (tourId) {
      fetchAvailability();
    }
  }, [tourId, currentMonth]);

  const getDateAvailability = (date: Date | undefined): AvailabilityStatus => {
    if (!date) return "booked";
    const dateString = format(date, "yyyy-MM-dd");
    return availabilityData[dateString] || "available"; // Default to 'available' if not specified
  };

  const currentAvailability = getDateAvailability(date);

  // Function to create custom day content
  const dayContent = (day: Date) => {
    const availability = getDateAvailability(day);
    let dotColor = "bg-gray-300"; // Default for unknown/loading
    
    if (!isLoading) {
        switch (availability) {
            case "available":
                dotColor = "bg-green-500";
                break;
            case "limited":
                dotColor = "bg-yellow-500";
                break;
            case "booked":
                dotColor = "bg-red-500";
                break;
        }
    }

    return (
      <div className="relative flex items-center justify-center w-full h-full">
        <div>{format(day, "d")}</div>
        <div className={`absolute bottom-1 w-1 h-1 ${dotColor} rounded-full`}></div>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-md">
      <h3 className="font-playfair text-2xl font-semibold mb-4 text-center">Check Tour Availability</h3>
      <div className="grid gap-4">
        <div className="flex flex-col items-center gap-2">
          <Popover open={isOpen} onOpenChange={setIsOpen}>
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
            <PopoverContent className="w-auto p-0" align="center">
              <Calendar
                mode="single"
                selected={date}
                onSelect={(selectedDate) => {
                  setDate(selectedDate);
                  setIsOpen(false);
                }}
                month={currentMonth}
                onMonthChange={setCurrentMonth}
                initialFocus
                components={{
                  DayContent: ({ date }) => dayContent(date),
                }}
                className={cn("p-3 pointer-events-auto")}
                disabled={(date) => date < new Date() || getDateAvailability(date) === 'booked'}
              />
              <div className="flex items-center justify-between p-3 border-t text-xs">
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <span>Available</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                  <span>Limited</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-red-500"></div>
                  <span>Booked</span>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>

        {isLoading && <p className="text-center">Loading availability...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}

        {!isLoading && !error && (
          <div className="mt-4">
            {currentAvailability === "available" && (
              <div className="flex items-center gap-3 p-4 rounded-md bg-green-50 border border-green-200 text-green-800 shadow-sm">
                <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                <span className="font-semibold text-lg">This tour is available for your selected date!</span>
              </div>
            )}
            {currentAvailability === "limited" && (
              <div className="flex items-center gap-3 p-4 rounded-md bg-yellow-50 border border-yellow-200 text-yellow-800 shadow-sm">
                <svg className="w-6 h-6 text-yellow-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12A9 9 0 113 12a9 9 0 0118 0z" /></svg>
                <span className="font-semibold text-lg">Limited spots left for this date. Book soon!</span>
              </div>
            )}
            {currentAvailability === "booked" && (
              <div className="flex items-center gap-3 p-4 rounded-md bg-red-50 border border-red-200 text-red-800 shadow-sm">
                <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                <span className="font-semibold text-lg">Sorry, this tour is fully booked for your selected date.</span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingCalendar;
