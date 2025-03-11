// Import with require
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');

// Load environment variables
dotenv.config({ path: '.env.local' });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable');
}

// Define schemas
const provinceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  cityCount: { type: Number, default: 0 },
  saunaCount: { type: Number, default: 0 }
}, { timestamps: true });

const citySchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  province: { type: String, required: true },
  provinceSlug: { type: String, required: true },
  saunaCount: { type: Number, default: 0 }
}, { timestamps: true });

const saunaSchema = new mongoose.Schema({
  name: { type: String, required: true },
  city: { type: String, required: true },
  citySlug: { type: String, required: true },
  province: { type: String, required: true },
  provinceSlug: { type: String, required: true },
  country: { type: String, required: true },
  
  // Make placeId optional with sparse index
  placeId: { type: String, sparse: true },
  
  // Optional fields
  street: String,
  postalCode: String,
  phone: String,
  website: String,
  email: String,
  latitude: Number,
  longitude: Number,
  description: String,
  rating: Number,
  reviewCount: Number,
  images: [String]
}, { timestamps: true });

// Create a compound index that makes each sauna unique based on name and city
saunaSchema.index({ name: 1, city: 1, province: 1 }, { unique: true });

// Create models
const Province = mongoose.model('Province', provinceSchema);
const City = mongoose.model('City', citySchema);
const Sauna = mongoose.model('Sauna', saunaSchema);

async function seedDatabase() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Drop the collections to remove all indexes
    await mongoose.connection.db.dropCollection('saunas').catch(() => console.log('No saunas collection to drop'));
    await mongoose.connection.db.dropCollection('cities').catch(() => console.log('No cities collection to drop'));
    await mongoose.connection.db.dropCollection('provinces').catch(() => console.log('No provinces collection to drop'));
    console.log('Dropped existing collections');

    // Read JSON files
    const dataDir = path.join(__dirname, '../data');
    const provinces = JSON.parse(fs.readFileSync(path.join(dataDir, 'provinces.json'), 'utf8'));
    const cities = JSON.parse(fs.readFileSync(path.join(dataDir, 'cities.json'), 'utf8'));
    const saunas = JSON.parse(fs.readFileSync(path.join(dataDir, 'saunas.json'), 'utf8'));

    // Process cities to handle duplicates
    const uniqueCities = {};
    cities.forEach(city => {
      const key = city.slug;
      if (!uniqueCities[key]) {
        uniqueCities[key] = city;
      } else {
        // Merge duplicate cities by adding sauna counts
        uniqueCities[key].saunaCount += city.saunaCount;
        console.log(`Merged duplicate city: ${city.name} (${city.slug})`);
      }
    });

    // Convert back to array
    const uniqueCitiesArray = Object.values(uniqueCities);
    console.log(`Processed ${cities.length} cities into ${uniqueCitiesArray.length} unique cities`);

    // Seed provinces
    await Province.insertMany(provinces);
    console.log(`Seeded ${provinces.length} provinces`);

    // Seed cities one by one to handle any potential errors
    for (const city of uniqueCitiesArray) {
      try {
        await City.create(city);
      } catch (error) {
        console.error(`Error seeding city ${city.name}: ${error.message}`);
      }
    }
    console.log(`Seeded ${uniqueCitiesArray.length} cities`);

    // Seed saunas one by one to handle any potential errors
    let successCount = 0;
    for (const sauna of saunas) {
      try {
        // Generate a unique ID for each sauna
        sauna._id = new mongoose.Types.ObjectId();
        await Sauna.create(sauna);
        successCount++;
      } catch (error) {
        console.error(`Error seeding sauna ${sauna.name}: ${error.message}`);
      }
    }
    console.log(`Seeded ${successCount} saunas out of ${saunas.length}`);

    console.log('Database seeded successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

seedDatabase(); 