import { Request, Response } from 'express';
import Orders from '../model/Orders';
import { StockListType } from './products-controller';
import Products from '../model/Products';
import mongoose from 'mongoose';

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

export const createOrderController = async(request: Request, response: Response) => {
  try {
    const body: CustomerPurchaseType = request.body;
    const {productsToBuy} = body;

    const updatePromises = productsToBuy.map(async(product) => {
      const newStocks = product.stock.map(item => ({
        color: item.color,
        quantity: item.quantity - item.quantitySelected
      }));
      const product_id = new mongoose.Types.ObjectId(product._id);
      const updatedProduct = await Products.findByIdAndUpdate(product_id, { stocks: newStocks } );
      if (!updatedProduct) {
        throw new Error(`Producto con ID ${product_id} no encontrado`);
      }
      return updatedProduct;
    });

    await Promise.all(updatePromises);
    return response.status(204).send();
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
    return response.status(error.status || 500).json({ error: error.message });
  }
};
