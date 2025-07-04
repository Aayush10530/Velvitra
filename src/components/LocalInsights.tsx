import { Calendar, Clock, ThermometerSun, Languages, Wallet, Utensils } from "lucide-react";

const LocalInsights = () => {
  return (
    <div className="bg-accent/5 rounded-xl p-8">
      <h2 className="heading-md mb-8 text-center">Local Insights</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-5 rounded-lg shadow-sm">
          <div className="flex items-center mb-4">
            <div className="bg-accent/20 p-2 rounded-full mr-3">
              <Calendar className="h-5 w-5 text-accent" />
            </div>
            <h3 className="font-semibold">Best Time to Visit</h3>
          </div>
          <p className="text-gray-600 text-sm">
            July to Feburary offers pleasant weather. Avoid summer months (April-June) when temperatures can reach 45°C. The monsoon season (July-September) brings beautiful greenery and the rain adds a romantic and serene atmosphere to the monument.
          </p>
        </div>
        
        <div className="bg-white p-5 rounded-lg shadow-sm">
          <div className="flex items-center mb-4">
            <div className="bg-accent/20 p-2 rounded-full mr-3">
              <ThermometerSun className="h-5 w-5 text-accent" />
            </div>
            <h3 className="font-semibold">Weather & Clothing</h3>
          </div>
          <p className="text-gray-600 text-sm">
            Summers are hot, winters can be cool in mornings. Carry a hat, sunglasses, and light cotton clothing in summer; layer up in winter.
          </p>
        </div>
        
        <div className="bg-white p-5 rounded-lg shadow-sm">
          <div className="flex items-center mb-4">
            <div className="bg-accent/20 p-2 rounded-full mr-3">
              <Clock className="h-5 w-5 text-accent" />
            </div>
            <h3 className="font-semibold">Monument Timings</h3>
          </div>
          <p className="text-gray-600 text-sm">
            Taj Mahal: Open from sunrise to sunset, closed on Fridays.
            <br />Agra Fort: 6:00 AM - 6:00 PM daily.
            <br />Other monuments generally open from 6:00 AM to 6:00 PM.
          </p>
        </div>
        
        <div className="bg-white p-5 rounded-lg shadow-sm">
          <div className="flex items-center mb-4">
            <div className="bg-accent/20 p-2 rounded-full mr-3">
              <Languages className="h-5 w-5 text-accent" />
            </div>
            <h3 className="font-semibold">Language & Culture</h3>
          </div>
          <p className="text-gray-600 text-sm">
            Hindi is widely spoken, though many in the tourism industry speak English. Greet locals with "Namaste" (folded hands). Ask permission before photographing locals. Remove shoes before entering temples.
          </p>
        </div>
        
        <div className="bg-white p-5 rounded-lg shadow-sm">
          <div className="flex items-center mb-4">
            <div className="bg-accent/20 p-2 rounded-full mr-3">
              <Wallet className="h-5 w-5 text-accent" />
            </div>
            <h3 className="font-semibold">Currency & Tipping</h3>
          </div>
          <p className="text-gray-600 text-sm">
            The Indian Rupee (₹) is the local currency. Credit cards are widely accepted at hotels and larger establishments. For small vendors, local markets, and heritage sites, it's advisable to carry some cash. Tipping is at the guest's discretion and not compulsory.
          </p>
        </div>
        
        <div className="bg-white p-5 rounded-lg shadow-sm">
          <div className="flex items-center mb-4">
            <div className="bg-accent/20 p-2 rounded-full mr-3">
              <Utensils className="h-5 w-5 text-accent" />
            </div>
            <h3 className="font-semibold">Local Cuisine</h3>
          </div>
          <p className="text-gray-600 text-sm">
            Try Agra's famous Petha (sweet), Mughlai cuisine, and Bedai (breakfast bread). Panchhi Petha and Dalmoth are popular food souvenirs. Drink only bottled water and avoid street food if you have a sensitive stomach.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LocalInsights;
