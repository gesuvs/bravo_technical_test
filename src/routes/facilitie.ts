import { Router } from 'express'
import { getAll } from '../services/facilitie-service'

const facilitieRouter = Router()

facilitieRouter.get('/', async (req, res) => {
  return res.status(200).json(await getAll());
})


export default facilitieRouter