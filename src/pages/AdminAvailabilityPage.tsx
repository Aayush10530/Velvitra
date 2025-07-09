import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { toast } from "sonner";
import ThemedNavbar from "@/components/ThemedNavbar";
import Footer from "@/components/Footer";
import axios from 'axios';

interface Tour {
  _id: string;
  title: string;
  slug: string;
}

const AdminAvailabilityPage = () => {
  const navigate = useNavigate();
  const [tours, setTours] = useState<Tour[]>([]);
  const [selectedTour, setSelectedTour] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [status, setStatus] = useState<string>("available");
  const [slotsAvailable, setSlotsAvailable] = useState<number>(10);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Fetch tours from the database
    const fetchTours = async () => {
      try {
        const response = await axios.get('/api/tours');
        if (response.data.success) {
          setTours(response.data.data);
        }
      } catch (error) {
        console.error('Error fetching tours:', error);
        toast.error('Failed to fetch tours');
      }
    };

    fetchTours();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedTour || !selectedDate) {
      toast.error('Please select both tour and date');
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post('/api/admin/availability', {
        tourId: selectedTour,
        date: selectedDate.toISOString().split('T')[0],
        status,
        slotsAvailable: status === 'limited' ? slotsAvailable : undefined
      });

      if (response.data.success) {
        toast.success('Availability updated successfully!');
        // Reset form
        setSelectedDate(undefined);
        setStatus("available");
        setSlotsAvailable(10);
      } else {
        toast.error(response.data.message || 'Failed to update availability');
      }
    } catch (error: any) {
      console.error('Error updating availability:', error);
      toast.error(error.response?.data?.message || 'Failed to update availability');
    } finally {
      setIsLoading(false);
    }
  };

  const handleBulkUpdate = async () => {
    if (!selectedTour || !selectedDate) {
      toast.error('Please select both tour and date');
      return;
    }

    setIsLoading(true);
    try {
      // Update for the next 30 days
      const promises = [];
      for (let i = 0; i < 30; i++) {
        const date = new Date(selectedDate);
        date.setDate(date.getDate() + i);
        
        promises.push(
          axios.post('/api/admin/availability', {
            tourId: selectedTour,
            date: date.toISOString().split('T')[0],
            status,
            slotsAvailable: status === 'limited' ? slotsAvailable : undefined
          })
        );
      }

      await Promise.all(promises);
      toast.success('Bulk availability updated successfully!');
    } catch (error: any) {
      console.error('Error bulk updating availability:', error);
      toast.error('Failed to bulk update availability');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <ThemedNavbar />
      
      <div className="pt-32 pb-16">
        <div className="container-custom max-w-4xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Manage Tour Availability</h1>
            <p className="text-gray-600">Set availability status for tours on specific dates</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Update Tour Availability</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="tour">Select Tour</Label>
                    <Select value={selectedTour} onValueChange={setSelectedTour}>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose a tour" />
                      </SelectTrigger>
                      <SelectContent>
                        {tours.map((tour) => (
                          <SelectItem key={tour._id} value={tour.slug}>
                            {tour.title}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="date">Select Date</Label>
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      className="rounded-md border"
                      disabled={(date) => date < new Date()}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="status">Availability Status</Label>
                    <Select value={status} onValueChange={setStatus}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="available">Available</SelectItem>
                        <SelectItem value="limited">Limited</SelectItem>
                        <SelectItem value="booked">Booked</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {status === 'limited' && (
                    <div>
                      <Label htmlFor="slots">Slots Available</Label>
                      <Input
                        type="number"
                        value={slotsAvailable}
                        onChange={(e) => setSlotsAvailable(parseInt(e.target.value))}
                        min="1"
                        max="50"
                      />
                    </div>
                  )}
                </div>

                <div className="flex gap-4">
                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? 'Updating...' : 'Update Availability'}
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={handleBulkUpdate}
                    disabled={isLoading}
                  >
                    {isLoading ? 'Updating...' : 'Bulk Update (30 days)'}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          <div className="mt-8">
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button 
                    variant="outline" 
                    onClick={() => navigate('/admin')}
                    className="h-20"
                  >
                    Back to Admin Dashboard
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => navigate('/tours')}
                    className="h-20"
                  >
                    View All Tours
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => navigate('/')}
                    className="h-20"
                  >
                    Go to Homepage
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AdminAvailabilityPage; 