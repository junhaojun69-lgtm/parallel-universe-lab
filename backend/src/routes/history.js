import { Router } from 'express'
import { getPool, isDbAvailable } from '../config/database.js'

const router = Router()

// 获取历史记录列表
router.get('/', async (req, res) => {
  if (!isDbAvailable()) {
    return res.json([])
  }

  try {
    const pool = getPool()
    const [rows] = await pool.execute(
      `SELECT id, age, education, city, career, income, savings, decision, created_at
       FROM simulations
       ORDER BY created_at DESC
       LIMIT 50`
    )
    res.json(rows)
  } catch (err) {
    console.error('获取历史记录失败:', err)
    res.status(500).json({ error: '获取历史记录失败' })
  }
})

// 获取历史记录详情
router.get('/:id', async (req, res) => {
  if (!isDbAvailable()) {
    return res.status(404).json({ error: '数据库不可用' })
  }

  try {
    const pool = getPool()
    const [rows] = await pool.execute(
      `SELECT * FROM simulations WHERE id = ?`,
      [req.params.id]
    )

    if (rows.length === 0) {
      return res.status(404).json({ error: '记录不存在' })
    }

    const row = rows[0]
    res.json({
      id: row.id,
      age: row.age,
      education: row.education,
      city: row.city,
      career: row.career,
      income: Number(row.income),
      savings: Number(row.savings),
      decision: row.decision,
      summary: row.summary,
      universes: typeof row.universes === 'string' ? JSON.parse(row.universes) : row.universes,
      created_at: row.created_at
    })
  } catch (err) {
    console.error('获取历史详情失败:', err)
    res.status(500).json({ error: '获取历史详情失败' })
  }
})

// 删除历史记录
router.delete('/:id', async (req, res) => {
  if (!isDbAvailable()) {
    return res.status(404).json({ error: '数据库不可用' })
  }

  try {
    const pool = getPool()
    await pool.execute(`DELETE FROM simulations WHERE id = ?`, [req.params.id])
    res.json({ success: true })
  } catch (err) {
    console.error('删除历史记录失败:', err)
    res.status(500).json({ error: '删除失败' })
  }
})

export default router
