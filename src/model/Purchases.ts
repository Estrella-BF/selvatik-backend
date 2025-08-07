import mongoose, { Schema } from "mongoose";
import { FileProductSchema, StockSchema } from "./Products";

const ProducstsToBuy = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  stocks: {
    type: [ StockSchema ],
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

const Purchase = new Schema({
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

export default mongoose.models.Purchase || mongoose.model('Purchase', Purchase);
