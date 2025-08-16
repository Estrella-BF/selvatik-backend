import { Request, Response } from 'express';
import Categories from "../model/Categories";

export const getAllCategoriesController = async(_req: Request, response: Response) => {
  try {
      const data = await Categories.find();
      return response.json(data);
  } catch(error: any) {
      console.log('--al categories ERROR: ', error)
     return response.status(error.status || 500).json({ error: error.message });
  }
};

export const createCategoryController = async(request: Request, response: Response) => {
  try {
    const { category } = request.body;
    const categoryResponse = await Categories.create({ name: category });
    return response.json(categoryResponse);
  } catch(error: any) {
     return response.status(error.status || 500).json({ error: error.message });
  }
};

export const updateCategoryController = async(request: Request, response: Response) => {
  try {
    const { name, _id } = request.body;
    const categoryResponse = await Categories.findByIdAndUpdate(_id, { name }, { new: true } );
    return response.status(200).json(categoryResponse);
  } catch(error: any) {
     return response.status(error.status || 500).json({ error: error.message });
  }
};

export const deleteCategoryController = async(request: Request, response: Response) => {
  try {
    const { id } = request.params;
    await Categories.findByIdAndDelete(id);
    return response.status(200).json({ message: "Task deleted" });
  } catch(error: any) {
     return response.status(error.status || 500).json({ error: error.message });
  }
};
