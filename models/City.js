import mongoose from 'mongoose';

const citySchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  province: { type: String, required: true },
  provinceSlug: { type: String, required: true },
  saunaCount: { type: Number, default: 0 }
}, { timestamps: true });

export default mongoose.models.City || mongoose.model('City', citySchema); 