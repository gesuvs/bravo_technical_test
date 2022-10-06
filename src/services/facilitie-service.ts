import { Facilitie } from "../entities/facilitie";

export const getAll = async (): Promise<Facilitie[]> => {
  const response = await Facilitie.findAll();
  return response
}