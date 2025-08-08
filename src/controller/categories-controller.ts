import { Request, Response } from 'express';
import Categories from "../model/Categories";

export const getAllCategoriesController = async(_req: Request, res: Response) => {
  try {
      const data = await Categories.find();
      console.log('---data:', data)
      return res.json(data);
  } catch(error: any) {
     return res.status(error.status || 500).json({ error: error.message });
  }
};
