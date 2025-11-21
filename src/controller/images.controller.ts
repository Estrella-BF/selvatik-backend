import { v2 as cloudinary } from "cloudinary";
import streamifier from "streamifier";

export const uploadImage = (file: Express.Multer.File, folder: string = "products") => {
  const buffer: Buffer = file.buffer;
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder, public_id: file.originalname, overwrite: true },
      (err, result) => {
        if (err) return reject(err);
        resolve(result);
      }
    );

    streamifier.createReadStream(buffer).pipe(uploadStream);
  });
};
