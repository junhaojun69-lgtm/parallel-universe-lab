import { Router } from 'express'
import { analyzeWithDeepSeek, isDeepSeekAvailable } from '../services/deepseekService.js'
import { generateMockAnalysis } from '../services/mockService.js'

const router = Router()

router.post('/', async (req, res) => {
  try {
    const userData = req.body

    // 参数校验
    const required = ['age', 'education', 'city', 'career', 'income', 'savings', 'decision']
    for (const field of required) {
      if (userData[field] === undefined || userData[field] === null || userData[field] === '') {
        return res.status(400).json({ error: `缺少必填字段: ${field}` })
      }
    }

    let result

    if (isDeepSeekAvailable()) {
      try {
        result = await analyzeWithDeepSeek(userData)
      } catch (apiErr) {
        console.warn('DeepSeek API 分析失败，使用 Mock 数据:', apiErr.message)
        result = generateMockAnalysis(userData)
      }
    } else {
      result = generateMockAnalysis(userData)
    }

    res.json(result)
  } catch (err) {
    console.error('分析失败:', err)
    res.status(500).json({ error: '分析失败: ' + err.message })
  }
})

export default router
