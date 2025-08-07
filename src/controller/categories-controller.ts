import { Request, Response } from 'express';
import Categories from "../model/Categories";

/* import {
  createTherapist,
  getAllBuildings,
  getAllSpacesByBuilding,
  getMainEvents,
  getTherapistByEmail,
  getAllInactiveTherapist,
  getAllTherapists,
  updateReservationPayment,
  updateTherapistData,
  updateTherapistReservationSpace,
  updateTherapistReservationTime,
  deleteRegistrationAtTherapist
} from '../services/configurationService.js';

export const getAllBuildingsController = async(req, res) => {
  try {
      const data = await getAllBuildings();
      return res.json(data);
  } catch(error) {
      return res.status(error.status || 500).json({ error: error.message });
  }
}; , 
 */
export const getAllCategories = async(req: Request, res: Response) => {
  try {
      const data = await Categories.find();
      console.log('---data:', data)
      return res.json(data);
  } catch(error) {
/*       return res.status(error.status || 500).json({ error: error.message });
 */  }
};
