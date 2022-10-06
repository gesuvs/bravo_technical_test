import { QueryTypes } from "sequelize";
import { Nurse } from "../entities/nurse";
import { getJobsRemainingByEachJob } from "./job-service";

interface JobsNurse {
  nurse_id: number,
  nurse_name: string,
  nurse_type: string,
  count: number
}

export const getAll = async (): Promise<Nurse[]> => {
  const response = await Nurse.findAll();
  return response
}

export const getNursesWithoutJobId = async () => {
  const response = await Nurse.sequelize?.query<JobsNurse>({
    query: "SELECT ns.nurse_id, ns.nurse_name, ns.nurse_type FROM nurses ns LEFT JOIN nurse_hired_jobs AS nhj ON nhj.nurse_id =  ns.nurse_id WHERE nhj.job_id IS NULL;",
    values: []
  }, {
    type: QueryTypes.SELECT,
    mapToModel: true,
  })
  return response;
}

export const getNumberJobsCanBeHiredEachNurse = async () => {
  const jobsRemainingByEachJobResponse = await getJobsRemainingByEachJob();
  const nursesWithoutJobIdResponse = await getNursesWithoutJobId();
  const a = jobsRemainingByEachJobResponse
    ?.map(jobRemaining => {
      return nursesWithoutJobIdResponse
        ?.filter(nurseWithoutJob => jobRemaining.nurse_type_needed == nurseWithoutJob.nurse_type &&
          jobRemaining.total_number_nurses_needed > 0);
    }).flatMap(item => item)


  const jobsCanBeHiredByNurses = jobsRemainingByEachJobResponse
    ?.map(jobRemaining => {
      return nursesWithoutJobIdResponse
        ?.filter(nurseWithoutJob => jobRemaining.nurse_type_needed == nurseWithoutJob.nurse_type &&
          jobRemaining.total_number_nurses_needed > 0);
    }).flatMap(item => item)
    .reduce((value, object) => {
      if (value?.[object?.nurse_id as unknown as keyof JobsNurse]) {
        value[object?.nurse_id as unknown as keyof JobsNurse].jobsCanBeHired++;
      } else {
        (value[object!.nurse_id as unknown as keyof JobsNurse] as any) = { ...object, jobsCanBeHired: 1 }
      }
      return value;
    }, [] as any).filter(Boolean)

  
  return jobsCanBeHiredByNurses;
}
