import { Router } from 'express'
import { generateMockCaseLibrary } from '../services/mockService.js'

const router = Router()

router.post('/', (req, res) => {
  try {
    const result = generateMockCaseLibrary(req.body)
    res.json(result)
  } catch (err) {
    res.status(500).json({ error: '生成案例库失败: ' + err.message })
  }
})

export default router
