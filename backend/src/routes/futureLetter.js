import { Router } from 'express'
import { generateMockFutureLetter } from '../services/mockService.js'

const router = Router()

router.post('/', (req, res) => {
  try {
    const { years, ...userData } = req.body
    const result = generateMockFutureLetter(userData, Number(years) || 3)
    res.json(result)
  } catch (err) {
    res.status(500).json({ error: '生成未来来信失败: ' + err.message })
  }
})

export default router
