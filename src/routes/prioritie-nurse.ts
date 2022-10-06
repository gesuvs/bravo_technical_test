import { Router } from 'express'
import { getPrioritiesNursesByFacilitie } from '../services/clinician-work-history-service'

const prioritieNurseRouter = Router()

prioritieNurseRouter.get("/:facilitieId", async (req, res) => {
  const { facilitieId } = req.params
  return res.status(200).json(await getPrioritiesNursesByFacilitie(facilitieId));
})


export default prioritieNurseRouter