import { Router } from 'express'

import { create, list } from 'controllers/user'
import auth from 'middlewares/auth'

const router = Router()

router.post('/', create)
router.get('/', auth(), list)

export default router
