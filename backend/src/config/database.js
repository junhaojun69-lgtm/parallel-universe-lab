import mysql from 'mysql2/promise'
import dotenv from 'dotenv'

dotenv.config()

let pool = null
let dbAvailable = false

export const initDatabase = async () => {
  const config = {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 3306,
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'parallel_universe_lab',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  }

  try {
    pool = mysql.createPool(config)
    // 测试连接
    const conn = await pool.getConnection()
    await conn.ping()
    conn.release()

    // 创建表
    await createTables()
    dbAvailable = true
    console.log('MySQL 数据库连接成功')
  } catch (err) {
    dbAvailable = false
    console.warn('MySQL 数据库未连接，历史记录功能将不可用:', err.message)
  }
}

const createTables = async () => {
  const sql = `
    CREATE TABLE IF NOT EXISTS simulations (
      id INT AUTO_INCREMENT PRIMARY KEY,
      age INT,
      education VARCHAR(50),
      city VARCHAR(100),
      career VARCHAR(100),
      income DECIMAL(12, 2),
      savings DECIMAL(12, 2),
      decision TEXT,
      summary TEXT,
      universes JSON,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
  `
  await pool.execute(sql)
}

export const getPool = () => pool
export const isDbAvailable = () => dbAvailable
