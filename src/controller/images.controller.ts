import { v2 as cloudinary } from "cloudinary";
import { Request, Response } from 'express';
import streamifier from "streamifier";

export const getFolderImagesController = async (request: Request, response: Response) => {
  try {
    const { category_id } = request.query;
    const result = await cloudinary.search
      .expression(`folder:products/${category_id}`)
      .max_results(500)
      .execute();

    return response.json(result.resources);
  } catch (err: any) {
    return response.status(500).json({ error: err.message });
  }
};


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
