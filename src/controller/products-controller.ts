import { Request, Response } from 'express';
import Products from "../model/Products";
import { v2 as cloudinary } from "cloudinary";
import { uploadImage } from "./images.controller";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_SECRET,
  secure: true
});

export type StockListType = {
  color: string;
  quantity: number;
  quantitySelected: number | 0;
  photo_URL: string | '';
};

export type ProductType = {
  _id?: string;
  title: string;
  description: string;
  category_id: string;
  price: string;
  image: ProductImageType;
  url_facebook?: string;
  url_instagram?: string;
  url_tiktok?: string;
  url_threads?: string;
  stocks: StockListType[];
  totalItems?: number;
  totalPrice?: number;
};

type ProductImageType = {
  name?: string;
  folder_path: string;
};

export const getProductsController = async(request: Request, response: Response) => {
  try {
    const { category_id, search } = request.query;

    if (category_id) {
      const allProductsByCategoryId = await Products.find({category_id});
      return response.json(allProductsByCategoryId);
    } else if (search) {
      const allProductsFinded = await Products.find({title: search});
      return response.json(allProductsFinded);
    }
    const categoryResponse = await Products.find();
    return response.json(categoryResponse);
  } catch(error: any) {
    console.log('**error:', error)
    return response.status(error.status || 500).json({ error: error.message });
  }
};

export const createProductController = async(request: Request, response: Response) => {
  try {
    const body = request.body;
    const file = request.file;
    const formDetails = JSON.parse(body.formDetails);
    const formNetworks = JSON.parse(body.formNetworks);
    const stocks = JSON.parse(body.stocks);
    const image: ProductImageType = { name: file?.originalname, folder_path: "products" }
    const formValue = { ...formDetails, ...formNetworks, stocks, image }
    if (file) {
      await uploadImage(file);
    };
    const categoryResponse = await Products.create(formValue);
    return response.json(categoryResponse);
  } catch(error: any) {
    return response.status(error.status || 500).json({ error: error.message });
  }
};

export const deleteProductController = async(request: Request, response: Response) => {
  try {
    const { id } = request.params;
    await Products.findByIdAndDelete(id);
    return response.status(200).json({ message: "Product deleted" });
  } catch(error: any) {
     return response.status(error.status || 500).json({ error: error.message });
  }
};
