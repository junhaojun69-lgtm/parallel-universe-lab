-- 人生平行宇宙实验室 数据库初始化脚本
-- 使用方法: mysql -u root -p < init.sql

CREATE DATABASE IF NOT EXISTS parallel_universe_lab
  DEFAULT CHARACTER SET utf8mb4
  DEFAULT COLLATE utf8mb4_unicode_ci;

USE parallel_universe_lab;

CREATE TABLE IF NOT EXISTS simulations (
  id INT AUTO_INCREMENT PRIMARY KEY,
  age INT COMMENT '年龄',
  education VARCHAR(50) COMMENT '学历',
  city VARCHAR(100) COMMENT '城市',
  career VARCHAR(100) COMMENT '当前职业',
  income DECIMAL(12, 2) COMMENT '月收入',
  savings DECIMAL(12, 2) COMMENT '存款',
  decision TEXT COMMENT '想做的决定',
  summary TEXT COMMENT 'AI综合分析',
  universes JSON COMMENT '四个宇宙的推演结果',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 查看表结构
DESCRIBE simulations;
