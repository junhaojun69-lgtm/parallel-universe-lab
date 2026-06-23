import { Router } from 'express'
import { generateMockDecisionCheckup } from '../services/mockService.js'

const router = Router()

router.post('/', (req, res) => {
  try {
    const result = generateMockDecisionCheckup(req.body)
    res.json(result)
  } catch (err) {
    res.status(500).json({ error: '生成决策体检失败: ' + err.message })
  }
})

export default router
