import { Router } from 'express'
import { getAll } from '../services/nurse-hired-jobs-service'

const nurseHiredJobsRouter = Router()

nurseHiredJobsRouter.get('/', async (_req, res) => {
  return res.status(200).json(await getAll());
})


export default nurseHiredJobsRouter