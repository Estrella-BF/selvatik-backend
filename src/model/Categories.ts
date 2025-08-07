import mongoose, { Schema } from 'mongoose';

export type CategoriesType = {
  is_special_category: boolean;
  name: string;
  _id: string;
};

const CategorySchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  is_special_category: {
    type: Boolean,
    default: false,
  }
}, {
  timestamps: true // Opcional, agrega createdAt y updatedAt
});

export default mongoose.models.Category || mongoose.model('Category', CategorySchema);
