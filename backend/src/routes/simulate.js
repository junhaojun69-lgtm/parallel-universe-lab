import { Router } from 'express'
import { simulateWithDeepSeek, isDeepSeekAvailable } from '../services/deepseekService.js'
import { generateMockResult } from '../services/mockService.js'
import { getPool, isDbAvailable } from '../config/database.js'

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

    // 优先使用 DeepSeek API
    if (isDeepSeekAvailable()) {
      try {
        result = await simulateWithDeepSeek(userData)
      } catch (apiErr) {
        console.warn('DeepSeek API 调用失败，使用 Mock 数据:', apiErr.message)
        result = generateMockResult(userData)
      }
    } else {
      result = generateMockResult(userData)
    }

    // 保存到数据库
    let recordId = null
    if (isDbAvailable()) {
      try {
        const pool = getPool()
        const [insertResult] = await pool.execute(
          `INSERT INTO simulations (age, education, city, career, income, savings, decision, summary, universes)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            userData.age,
            userData.education,
            userData.city,
            userData.career,
            userData.income,
            userData.savings,
            userData.decision,
            result.summary,
            JSON.stringify(result.universes)
          ]
        )
        recordId = insertResult.insertId
      } catch (dbErr) {
        console.warn('⚠️  数据库保存失败:', dbErr.message)
      }
    }

    res.json({
      id: recordId,
      ...userData,
      summary: result.summary,
      universes: result.universes
    })
  } catch (err) {
    console.error('模拟失败:', err)
    res.status(500).json({ error: '模拟失败: ' + err.message })
  }
})

export default router
