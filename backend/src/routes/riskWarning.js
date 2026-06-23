import { Router } from 'express'
import { generateMockRiskWarning } from '../services/mockService.js'

const router = Router()

router.post('/', (req, res) => {
  try {
    const userData = req.body
    const result = generateMockRiskWarning(userData)
    res.json(result)
  } catch (err) {
    res.status(500).json({ error: '生成风险预警失败: ' + err.message })
  }
})

export default router
