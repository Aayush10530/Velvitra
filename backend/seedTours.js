const mongoose = require('mongoose');
const Tour = require('./models/Tour');
const dotenv = require('dotenv');

dotenv.config();

const tours = [
  {
    title: "Taj Mahal Sunrise Tour",
    slug: "taj-mahal-sunrise-tour",
    description: "Experience the magic of the Taj Mahal at dawn, when the first rays of sunlight illuminate the marble monument, creating a breathtaking golden glow.",
    price: 179,
    duration: "Half Day",
    maxGroupSize: 3,
    images: ["/heritage-uploads/taj rise.jpg"],
    highlights: [
      "Beat the crowds with early morning access",
      "Witness the changing colors of the Taj at sunrise",
      "Expert historical commentary from our guides",
      "Perfect lighting conditions for photography",
      "Complimentary hotel pickup and drop-off",
      "Small group size for personalized experience"
    ],
    location: "Agra, India",
    category: "day-tour",
    rating: 4.9,
    isActive: true
  },
  {
    title: "Royal Mughal Heritage Tour",
    slug: "royal-mughal-heritage",
    description: "Immerse yourself in the rich history of the Mughal Empire with visits to all major monuments in Agra, accompanied by expert historical commentary.",
    price: 250,
    duration: "1 Day",
    maxGroupSize: 6,
    images: ["/heritage-uploads/all.jpg"],
    highlights: [
      "Visit all major Mughal monuments in one day",
      "Insights into the architecture and history",
      "Lunch at a traditional restaurant",
      "Luxury air-conditioned transportation",
      "Skip-the-line entry tickets included",
      "Complimentary bottled water throughout the day"
    ],
    location: "Agra, India",
    category: "day-tour",
    rating: 4.8,
    isActive: true
  },
  {
    title: "Imperial Agra Day Tour",
    slug: "imperial-agra-day-tour",
    description: "Our most authentic experience visiting the two most iconic monuments of Agra with expert historical insights and plenty of time for photography.",
    price: 195,
    duration: "1 Day",
    maxGroupSize: 8,
    images: ["/heritage-uploads/taj fort.jpg"],
    highlights: [
      "In-depth tour of the Taj Mahal and Agra Fort",
      "Professional photography guidance",
      "Historical insights from expert guides",
      "Comfortable, air-conditioned transportation",
      "Skip-the-line entry tickets",
      "Lunch at a heritage restaurant"
    ],
    location: "Agra, India",
    category: "day-tour",
    rating: 4.7,
    isActive: true
  },
  {
    title: "Romantic Taj Experience for Couples",
    slug: "romantic-taj-experience",
    description: "A special tour designed exclusively for couples to experience the eternal monument of love with romantic elements and private moments.",
    price: 299,
    duration: "1 Day",
    maxGroupSize: 2,
    images: ["/heritage-uploads/romantic-taj-couples.jpg"],
    highlights: [
      "Private viewing of the Taj Mahal",
      "Romantic photo session",
      "Couple's spa treatment",
      "Candlelight dinner",
      "Luxury hotel stay"
    ],
    location: "Agra, India",
    category: "special-access",
    rating: 4.9,
    isActive: true
  },
  {
    title: "Agra Food & Culture Walk",
    slug: "agra-food-culture-walk",
    description: "Explore the culinary traditions and cultural heritage of Agra, from street food specialties to local artisan workshops.",
    price: 89,
    duration: "Half Day",
    maxGroupSize: 8,
    images: ["https://images.unsplash.com/photo-1537944434965-cf4dbaf03696?auto=format&fit=crop&q=80&w=1000"],
    highlights: [
      "Sample authentic Mughal cuisine and street food",
      "Visit local artisans and craftspeople",
      "Explore hidden gems in Agra's old city",
      "Learn about cultural traditions and daily life"
    ],
    location: "Agra, India",
    category: "cultural",
    rating: 4.8,
    isActive: true
  },
  {
    title: "Mughal Gardens & Nature Tour",
    slug: "mughal-gardens-nature-tour",
    description: "Discover the lush Mughal gardens and natural landscapes around Agra that showcase the dynasty's appreciation for horticulture and design.",
    price: 120,
    duration: "Half Day",
    maxGroupSize: 6,
    images: ["https://images.unsplash.com/photo-1558180077-09f158c76707?auto=format&fit=crop&q=80&w=1000"],
    highlights: [
      "Visit the Mehtab Bagh for Taj Mahal views across the river",
      "Explore the oldest Mughal garden, Ram Bagh",
      "Learn about Mughal landscape design principles",
      "Enjoy serene natural environments away from the crowds"
    ],
    location: "Agra, India",
    category: "cultural",
    rating: 4.6,
    isActive: true
  },
  {
    title: "Photography Masterclass Tour",
    slug: "photography-masterclass-tour",
    description: "Perfect your photography skills with our expert guides who will help you capture stunning images of Agra's monuments from the best angles.",
    price: 149,
    duration: "1 Day",
    maxGroupSize: 4,
    images: ["https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&q=80&w=1000"],
    highlights: [
      "Learn composition techniques for architectural photography",
      "Visit the best vantage points at optimal times",
      "Access special areas for unique perspectives",
      "Post-processing tips and guidance"
    ],
    location: "Agra, India",
    category: "photography",
    rating: 4.9,
    isActive: true
  }
];

async function seedTours() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/velvitra');
    console.log('Connected to MongoDB');

    // Clear existing tours
    await Tour.deleteMany({});
    console.log('Cleared existing tours');

    // Insert new tours
    const createdTours = await Tour.insertMany(tours);
    console.log(`Created ${createdTours.length} tours`);

    // Log the created tours
    createdTours.forEach(tour => {
      console.log(`- ${tour.title} (ID: ${tour._id}, Slug: ${tour.slug})`);
    });

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedTours(); 