import { Request, Response } from 'express';
import Products from "../model/Products";

export type StockListType = {
  color: string;
  quantity: number;
  quantitySelected: number | 0;
};

export type BufferDataType = {
  type: 'Buffer';
  data: number[];
};

export type FileProductType = {
  name: string;
  type: string;
  /* eslint-disable @typescript-eslint/no-explicit-any */
  buffer: any;
};

export type ProductType = {
  _id?: string;
  title: string;
  description: string;
  category_id: string;
  price: string;
  fileProduct: FileProductType;
  url_facebook?: string;
  url_instagram?: string;
  url_tiktok?: string;
  url_threads?: string;
  stocks: StockListType[];
  totalItems?: number;
  totalPrice?: number;
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
    const categoryResponse = await Products.create(body);
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

