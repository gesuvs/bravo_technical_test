import { Router } from 'express'
import { getAll, getJobsRemainingByEachJob } from '../services/job-service'

const jobsRouter = Router()

jobsRouter.get("/", async (req, res) => {
  return res.status(200).json(await getAll());
})

jobsRouter.get("/remaining", async (req, res) => {
  return res.status(200).json(await getJobsRemainingByEachJob());
})


export default jobsRouter