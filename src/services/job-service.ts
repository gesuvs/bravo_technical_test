import { QueryTypes } from "sequelize";
import { Job } from "../entities/job";

interface RemainingJob {
  job_id: number,
  facility_id: number,
  nurse_type_needed: string,
  total_number_nurses_needed: number,
  nurse_id: number
}

export const getAll = async (): Promise<Job[]> => {
  const response = await Job.findAll();
  return response
}

export const getJobsRemainingByEachJob = async (): Promise<RemainingJob[]> => {
  const response = await Job.sequelize?.query<RemainingJob>({
    query: "SELECT * FROM jobs j JOIN nurse_hired_jobs AS nhj ON nhj.job_id =  j.job_id",
    values: []
  }, {
    type: QueryTypes.SELECT,
    mapToModel: true,
  });

  const countRemainingJobs = {} as any;
  response?.forEach((obj) => {
    if (!countRemainingJobs[obj.job_id]) {
      countRemainingJobs[obj.job_id] = { ...obj };
    }
    countRemainingJobs[obj.job_id].total_number_nurses_needed -= 1;
  });
  const remainingJobs: RemainingJob[] = Object.values(countRemainingJobs);
  return remainingJobs;
}




const result = [
  {
    nurseId: 1000,
    nurseName: 'Kelvin',
    nurseType: 'CNA',
    numberJobsCanBeHired: 3// 202, 207, 209
  }
]