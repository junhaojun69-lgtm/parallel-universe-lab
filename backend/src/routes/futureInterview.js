import { Router } from 'express'
import { generateMockFutureInterview } from '../services/mockService.js'

const router = Router()

router.post('/', (req, res) => {
  try {
    const { years, ...userData } = req.body
    const result = generateMockFutureInterview(userData, Number(years) || 3)
    res.json(result)
  } catch (err) {
    res.status(500).json({ error: '生成未来采访失败: ' + err.message })
  }
})

export default router
