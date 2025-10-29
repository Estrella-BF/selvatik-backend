import mongoose, { Schema } from 'mongoose';

export const StockSchema = new Schema({
  color: {
    type: String,
    required: true,
    trim: true,
  },
  quantity: {
    type: Number,
    required: true,
    default: 0
  },
  photo_URL: {
    type: String,
    required: true,
    trim: true,
  },
});

export const FileProductSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  type: {
    type: String,
    required: true,
    trim: true,
  },
  buffer: {
    type: Buffer,
    required: true,
    trim: true,
  },
});

const ProductsSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  category_id: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    default: 0
  },
  fileProduct: {
    type: FileProductSchema,
    required: true,
  },
  url_facebook: {
    type: String,
    trim: true,
  },
  url_instagram: {
    type: String,
    trim: true,
  },
  url_tiktok: {
    type: String,
    trim: true,
  },
  url_threads: {
    type: String,
    trim: true,
  },
  stocks: {
    type: [ StockSchema ],
    required: true
  }
}, {
  timestamps: true 
});

export default mongoose.models.Products || mongoose.model('Products', ProductsSchema);
