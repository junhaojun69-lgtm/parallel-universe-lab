import express from 'express'
import { generateMockDashboard } from '../services/mockService.js'

const router = express.Router()

// 获取数据驾驶舱数据
router.get('/', async (req, res) => {
  try {
    const data = generateMockDashboard()
    res.json(data)
  } catch (err) {
    console.error('数据驾驶舱生成失败:', err)
    res.status(500).json({ error: '数据驾驶舱生成失败' })
  }
})

export default router
