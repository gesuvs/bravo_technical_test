import { NurseHiredJobs } from "../entities/nurse-hired-jobs";

export const getAll = async (): Promise<NurseHiredJobs[]> => {
  const response = await NurseHiredJobs.findAll();
  return response
}