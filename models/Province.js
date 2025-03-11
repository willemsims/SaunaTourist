import mongoose from 'mongoose';

const provinceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  cityCount: { type: Number, default: 0 },
  saunaCount: { type: Number, default: 0 }
}, { timestamps: true });

export default mongoose.models.Province || mongoose.model('Province', provinceSchema); 