import { Router } from 'express'
import { generateMockReview } from '../services/mockService.js'

const router = Router()

router.post('/', (req, res) => {
  try {
    const result = generateMockReview(req.body)
    res.json(result)
  } catch (err) {
    res.status(500).json({ error: '生成决策复盘失败: ' + err.message })
  }
})

export default router
