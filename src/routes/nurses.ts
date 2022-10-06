import { Router } from 'express'
import { getAll, getNursesWithoutJobId, getNumberJobsCanBeHiredEachNurse } from '../services/nurse-service'

const nurseRouter = Router()

nurseRouter.get("/", async (req, res) => {
  return res.status(200).json(await getAll());
})

nurseRouter.get("/nurse-available", async (req, res) => {
  return res.status(200).json(await getNursesWithoutJobId());
})

nurseRouter.get("/total-jobs-nurse", async (req, res) => {
  return res.status(200).json(await getNumberJobsCanBeHiredEachNurse());
})


export default nurseRouter