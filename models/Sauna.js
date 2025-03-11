import mongoose from 'mongoose';

const saunaSchema = new mongoose.Schema({
  name: { type: String, required: true },
  city: { type: String, required: true },
  citySlug: { type: String, required: true },
  province: { type: String, required: true },
  provinceSlug: { type: String, required: true },
  country: { type: String, required: true },
  
  // Remove the unique constraint from placeId or make it optional
  placeId: { type: String, sparse: true }, // sparse index allows multiple null values
  
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

export default mongoose.models.Sauna || mongoose.model('Sauna', saunaSchema); 