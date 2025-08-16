import { Request, Response } from 'express';
import Orders from '../model/Orders';
import { StockListType } from './products-controller';

export type ReceiptFileType = {
  name: string;
  type: string;
  /* eslint-disable @typescript-eslint/no-explicit-any */
  buffer: any;
};

export type ProductToBuy = {
  _id: string,
  stock: StockListType[],
  title: string,
  totalPrice: number;
};

export type CustomerPurchaseType = {
  _id?: string;
  customerName: string;
  customerSucursal: string;
  customerCardID: number;
  customerPhone: number;
  receiptFile: ReceiptFileType;
  productsToBuy: ProductToBuy[];
  isPaid: boolean;
  isDelivered: boolean;
  createdAt?: string;
  updatedAt?: string;
};

export const getOrdersController = async(request: Request, response: Response) => {
  try {
    const { isPaid, isDelivered } = request.query;

    if (isPaid) {
      console.log('** IS PAID SEARCH');
      const purchases: CustomerPurchaseType[] = await Orders.find({isPaid: false});
      return response.json(purchases);
    } else if (isDelivered) {
      console.log('** IS DELIVERY SEARCH');
      const purchases: CustomerPurchaseType[] = await Orders.find({isDelivered: false});
      return response.json(purchases);
    } else {
      const categoryResponse = await Orders.find();
      return response.json(categoryResponse);
    }
  } catch(error: any) {
    return response.status(error.status || 500).json({ error: error.message });
  }
};

export const updateOrderController = async(request: Request, response: Response) => {
  try {
    const { _id, isPaid, isDelivered } = request.body;
    let updateObjet = {};
    if (isPaid) {
      updateObjet = { isPaid: true };
    } else if (isDelivered) {
      updateObjet = { isDelivered: true };
    }
    const categoryResponse = await Orders.findByIdAndUpdate(_id, updateObjet, { new: true } );
    return response.status(200).json(categoryResponse); 
  } catch(error: any) {
    console.log('--orders ERROR:', error)
     return response.status(error.status || 500).json({ error: error.message });
  }
};




/* export const getAllProductsController = async(request: Request, response: Response) => {
  try {
    const { category_id, search } = request.query;
        console.log('**** QUERY params:', request.query)

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
}; */