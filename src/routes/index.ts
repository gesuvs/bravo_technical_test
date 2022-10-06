import { Router } from 'express'
import prioritieNurseRouter from './prioritie-nurse'
import facilitieRouter from './facilitie'
import nurseRouter from './nurses'
import jobsRouter from './job'
import nurseHiredJobsRouter from './nurse-hired-jobs'

const router = Router()

router.use('/priority-score', prioritieNurseRouter)
router.use('/facilitie', facilitieRouter)
router.use('/nurse', nurseRouter)
router.use('/job', jobsRouter)
router.use('/nurse-hired-jobs', nurseHiredJobsRouter)

export default router;