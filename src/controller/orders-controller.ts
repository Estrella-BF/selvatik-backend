import { Request, Response } from 'express';
import Orders from '../model/Orders';

export const getOrdersController = async(request: Request, response: Response) => {
  try {
    console.log('--GET orders:')
  /*   const { category_id, search } = request.query; */
        console.log('**** GET QUERY params:', request.query)
    const categoryResponse = await Orders.find();
    return response.json(categoryResponse);
  } catch(error: any) {
    console.log('--orders ERROR:', error)
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