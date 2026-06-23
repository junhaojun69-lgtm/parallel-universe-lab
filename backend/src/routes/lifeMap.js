import { Router } from 'express'
import { generateMockLifeMap } from '../services/mockService.js'

const router = Router()

router.post('/', (req, res) => {
  try {
    const result = generateMockLifeMap(req.body)
    res.json(result)
  } catch (err) {
    res.status(500).json({ error: '生成人生地图失败: ' + err.message })
  }
})

export default router
