import { Router } from 'express'
import { generateMockDecisionTree } from '../services/mockService.js'

const router = Router()

router.post('/', (req, res) => {
  try {
    const userData = req.body
    const result = generateMockDecisionTree(userData)
    res.json(result)
  } catch (err) {
    res.status(500).json({ error: '生成决策树失败: ' + err.message })
  }
})

export default router
