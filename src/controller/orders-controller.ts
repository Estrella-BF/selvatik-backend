import { Request, Response } from 'express';
import Orders from '../model/Orders';
import Products from '../model/Products';
import mongoose from 'mongoose';
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
  items: StockListType[],
  title: string,
  totalPrice: number;
};

export type CustomerPurchaseType = {
  _id?: string;
  customerName: string;
  customerShippingAddress: string;
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
      const purchases: CustomerPurchaseType[] = await Orders.find({isPaid: false});
      return response.json(purchases);
    } else if (isDelivered) {
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
      const newStocks = product.stock.map(item => {
        const newQuantity = item.quantity - item.quantitySelected;
        if (newQuantity < 0) {
          throw new Error(`Stock can't be a negative value`);
        }
        return {
          color: item.color,
          quantity: item.quantity - item.quantitySelected
        }
      });
      const product_id = new mongoose.Types.ObjectId(product._id);
      const updatedProduct = await Products.findByIdAndUpdate(product_id, { stocks: newStocks } );

      if (!updatedProduct) {
        throw new Error(`Producto con ID ${product_id} no encontrado`);
      }
      return 'updatedProduct';
    });
    await Promise.all(updatePromises);
    const newOrderResponse = await Orders.create(body);
    return response.status(204).json(newOrderResponse);
  } catch(error: any) {
    return response.status(error.status || 500).json({ error: error.message });
  }
};

export const updateOrderController = async(request: Request, response: Response) => {
  try {
    const { _id, isPaid, isDelivered, comments } = request.body;
    let updateObjet = {};
    if (isPaid) {
      updateObjet = { isPaid: true };
    } else if (isDelivered) {
      updateObjet = { isDelivered: true };
    } else if (comments) {
      updateObjet = { comments };
    } else {
      throw new Error(`No se encuentra el valor a actualizar`);
    }
    const categoryResponse = await Orders.findByIdAndUpdate(_id, updateObjet, { new: true } );
    return response.status(200).json(categoryResponse);
  } catch(error: any) {
    return response.status(error.status || 500).json({ error: error.message });
  }
};
