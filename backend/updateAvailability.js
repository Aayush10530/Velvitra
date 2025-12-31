const mongoose = require('mongoose');
const TourAvailability = require('./models/TourAvailability');
const Tour = require('./models/Tour');
const dotenv = require('dotenv');

dotenv.config();

// Command line arguments
const args = process.argv.slice(2);
const tourSlug = args[0];
const date = args[1];
const status = args[2];
const slotsAvailable = args[3];

if (!tourSlug || !date || !status) {
  console.log('Usage: node updateAvailability.js <tour-slug> <date> <status> [slots-available]');
  console.log('Example: node updateAvailability.js taj-mahal-sunrise-tour 2024-12-25 booked');
  console.log('Example: node updateAvailability.js royal-mughal-heritage 2024-12-25 limited 5');
  console.log('Status options: available, limited, booked');
  process.exit(1);
}

async function updateAvailability() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/velvitra');
    console.log('Connected to MongoDB');

    // Find the tour by slug
    const tour = await Tour.findOne({ slug: tourSlug });
    if (!tour) {
      console.error(`Tour with slug "${tourSlug}" not found`);
      process.exit(1);
    }

    console.log(`Found tour: ${tour.title} (ID: ${tour._id})`);

    // Validate status
    const validStatuses = ['available', 'limited', 'booked'];
    if (!validStatuses.includes(status)) {
      console.error(`Invalid status: ${status}. Must be one of: ${validStatuses.join(', ')}`);
      process.exit(1);
    }

    // Validate date format
    const dateObj = new Date(date);
    if (isNaN(dateObj.getTime())) {
      console.error(`Invalid date format: ${date}. Use YYYY-MM-DD format`);
      process.exit(1);
    }

    // Create or update availability
    const availabilityData = {
      tour: tour._id,
      date: dateObj,
      status,
      slotsAvailable: status === 'limited' ? parseInt(slotsAvailable) || 10 : undefined
    };

    const updatedAvailability = await TourAvailability.findOneAndUpdate(
      { tour: tour._id, date: dateObj },
      availabilityData,
      { new: true, upsert: true, runValidators: true }
    );

    console.log('✅ Availability updated successfully!');
    console.log(`Tour: ${tour.title}`);
    console.log(`Date: ${date}`);
    console.log(`Status: ${status}`);
    if (status === 'limited' && slotsAvailable) {
      console.log(`Slots Available: ${slotsAvailable}`);
    }

    process.exit(0);
  } catch (error) {
    console.error('Error updating availability:', error);
    process.exit(1);
  }
}

updateAvailability(); 