import mongoose, { Schema } from 'mongoose';
import { FileProductSchema } from './Products';

const ItemsSchema = new Schema({
  color: {
    type: String,
    required: true,
    trim: true,
  },
  quantitySelected: {
    type: Number,
    required: true
  },
});

const ProducstsToBuy = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  items: {
    type: [ ItemsSchema ],
    required: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  totalPrice: {
    type: Number,
    required: true,
    trim: true
  }
});

const Orders = new Schema({
  customerName: {
    type: String,
    required: true,
    trim: true,
  },
  customerSucursal: {
    type: String,
    required: true,
    trim: true,
  },
  customerCardID: {
    type: String,
    required: true,
    trim: true,
  },
  customerPhone: {
    type: Number,
    required: true,
    trim: true,
  },
  isPaid: {
    type: Boolean,
    default: false,
    required: true,
  },
  isDelivered:  {
    type: Boolean,
    default: false,
    required: true,
  },
  receiptFile: {
    type: FileProductSchema,
    required: true,
  },
  productsToBuy: {
    type: [ ProducstsToBuy ],
    required: true,
  },
}, {
  timestamps: true
});

export default mongoose.models.Orders || mongoose.model('Orders', Orders);
