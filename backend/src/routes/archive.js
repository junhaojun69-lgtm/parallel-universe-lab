import { Router } from 'express'
import { generateMockArchive } from '../services/mockService.js'

const router = Router()

router.get('/', (req, res) => {
  try {
    const result = generateMockArchive()
    res.json(result)
  } catch (err) {
    res.status(500).json({ error: '获取决策档案失败: ' + err.message })
  }
})

export default router
