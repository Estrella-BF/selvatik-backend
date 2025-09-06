import mongoose, { Schema } from 'mongoose';

const AdminSchema = new Schema({
  password: {
    type: String,
    required: true,
    trim: true,
  }
});

export default mongoose.models.Admin || mongoose.model("Admin", AdminSchema, "admin");
  