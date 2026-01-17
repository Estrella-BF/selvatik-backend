import { v2 as cloudinary } from "cloudinary";
import { Request, Response } from 'express';
import streamifier from "streamifier";

export const getFolderImagesController = async (request: Request, response: Response) => {
  try {
    const { folder_path } = request.query;
    console.log('---folder_path:', folder_path)
    const result = await cloudinary.search
      .expression(`folder:${folder_path}`)
      .max_results(500)
      .execute();

    return response.json(result.resources);
  } catch (err: any) {
    console.log('---ERROR FOLDER IMAGE:', err)
    return response.status(500).json({ error: JSON.stringify(err) });
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
