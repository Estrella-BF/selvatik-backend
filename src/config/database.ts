import { connect } from 'mongoose';

const mongo_uri = process.env.MONGODB_URI ?? '';

const connectDB = async () => {
  try {
    const db = await connect(mongo_uri);

    console.log("MongoDB is connected to ", db.connection.name);
  } catch (error) {
    console.error(error);
  }
}

export default connectDB;
