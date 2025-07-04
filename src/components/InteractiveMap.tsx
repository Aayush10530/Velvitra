import React, { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { MapPin, Home } from "lucide-react";

const attractions = [
  { 
    name: "Taj Mahal", 
    lat: 27.1751, 
    lng: 78.0421, 
    description: "The iconic white marble mausoleum built by Emperor Shah Jahan.",
    image: "../heritage-uploads/taj mahal dusk.jpg"
  },
  { 
    name: "Agra Fort", 
    lat: 27.1797, 
    lng: 78.0216, 
    description: "UNESCO World Heritage site, a historical fort in the city of Agra.",
    image: "../heritage-uploads/diwan-e-aam.jpg"
  },
  { 
    name: "Fatehpur Sikri", 
    lat: 27.0940, 
    lng: 77.6711, 
    description: "A city founded in 1569 by the Mughal Emperor Akbar.",
    image: "../heritage-uploads/fateh 1.jpg"
  },
  { 
    name: "Itmad-ud-Daulah", 
    lat: 27.1927, 
    lng: 78.0309, 
    description: "Known as 'Baby Taj', this tomb inspired the design of the Taj Mahal.",
    image: "../heritage-uploads/itmad 1.jpg"
  },
  { 
    name: "Mehtab Bagh", 
    lat: 27.1796, 
    lng: 78.0437, 
    description: "A garden complex aligned with the Taj Mahal on the opposite side of the Yamuna River.",
    image: "../heritage-uploads/metab.png"
  },
  { 
    name: "Sikandra", 
    lat: 27.2209, 
    lng: 77.9409, 
    description: "The tomb of Akbar the Great, a masterpiece of Mughal architecture.",
    image: "../heritage-uploads/sikandra1.jpg"
  },
  { 
    name: "Ram Bagh", 
    lat: 27.1947, 
    lng: 78.0359, 
    description: "One of the oldest Mughal gardens in India, originally built by Emperor Babur.",
    image: "../heritage-uploads/ram bagh.png"
  },
];

// Component to handle recentering
const MapRecenterButton = ({ center }) => {
  const map = useMap();

  const recenter = () => {
    map.setView(center, map.getZoom());
  };

  return (
    <button 
      onClick={recenter} 
      className="absolute bottom-4 right-4 bg-white/80 backdrop-blur-sm p-3 rounded-lg shadow-md z-[1000] flex items-center gap-2 text-gray-700 hover:bg-white transition-colors duration-200"
      aria-label="Recenter map to Taj Mahal"
    >
      <Home size={18} />
    </button>
  );
};

const InteractiveMap = () => {
  useEffect(() => {
    // Fix for Leaflet marker icons
    delete (L.Icon.Default.prototype as any)._getIconUrl;
    
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
      iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
      shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
    });
  }, []);

  const tajMahalCoords: [number, number] = [27.1751, 78.0421];

  return (
    <div className="relative h-[500px] w-full rounded-xl overflow-hidden shadow-lg">
      <MapContainer
        center={tajMahalCoords}
        zoom={13}
        scrollWheelZoom={true} // Enable mouse wheel zoom
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {attractions.map((attraction, index) => (
          <Marker 
            key={index} 
            position={[attraction.lat, attraction.lng]}
          >
            <Popup>
              <div className="p-2 max-w-xs">
                <h3 className="font-semibold text-lg mb-2">{attraction.name}</h3>
                <div className="rounded-md overflow-hidden mb-2">
                  <img 
                    src={attraction.image} 
                    alt={attraction.name}
                    className="w-full h-32 object-cover"
                    loading="lazy"
                  />
                </div>
                <p className="text-sm">{attraction.description}</p>
              </div>
            </Popup>
          </Marker>
        ))}
        <MapRecenterButton center={tajMahalCoords} />
      </MapContainer>
      <div className="absolute bottom-4 left-4 bg-white/80 backdrop-blur-sm p-3 rounded-lg shadow-md z-[1000] max-w-xs">
        <h3 className="font-playfair text-lg font-semibold flex items-center gap-2">
          <MapPin size={18} className="text-accent" />
          Agra Attractions
        </h3>
        <p className="text-sm text-gray-600 mt-1">Click on markers to explore major attractions in Agra</p>
        <p className="text-xs text-gray-500 mt-1">Use mouse wheel to zoom in and out</p>
      </div>
    </div>
  );
};

export default InteractiveMap;
