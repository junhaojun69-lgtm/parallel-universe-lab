import { Router } from 'express'
import { generateMockRegretIndex } from '../services/mockService.js'

const router = Router()

router.post('/', (req, res) => {
  try {
    const result = generateMockRegretIndex(req.body)
    res.json(result)
  } catch (err) {
    res.status(500).json({ error: '生成后悔指数失败: ' + err.message })
  }
})

export default router
