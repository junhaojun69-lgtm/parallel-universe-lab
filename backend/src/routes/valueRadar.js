import { Router } from 'express'
import { generateMockValueRadar } from '../services/mockService.js'

const router = Router()

router.post('/', (req, res) => {
  try {
    const result = generateMockValueRadar(req.body)
    res.json(result)
  } catch (err) {
    res.status(500).json({ error: '生成价值雷达失败: ' + err.message })
  }
})

export default router
