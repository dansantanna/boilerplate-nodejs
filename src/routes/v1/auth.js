import { Router } from 'express'

import { token } from 'controllers/auth'

const router = Router()

router.post('/token', token)

export default router
