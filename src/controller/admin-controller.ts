import { Request, Response } from 'express';
import Admin from "../model/Admin";

export const verifyPasswordController = async(request: Request, response: Response) => {
  try {
    const { password } = request.body;

const all = await Admin.find({});
    const dataResponse = await Admin.exists({password});
    const valid = !!dataResponse;
    return response.status(200).json({ valid })
  } catch(error: any) {
    return response.status(error.status || 500).json({ error: error.message });
  }
};
