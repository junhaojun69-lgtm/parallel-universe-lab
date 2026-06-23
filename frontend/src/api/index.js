import {
  generateMockAnalysis,
  generateMockResult,
  generateMockDecisionTree,
  generateMockRiskWarning,
  generateMockFutureLetter,
  generateMockCaseLibrary,
  generateMockRegretIndex,
  generateMockValueRadar,
  generateMockFutureInterview,
  generateMockReview,
  generateMockArchive,
  generateMockLifeMap,
  generateMockDecisionCheckup,
  generateMockDashboard
} from './mockData.js'

// Mock 模式：前端独立运行，无需后端
// 所有 API 调用直接返回 Mock 数据
const USE_MOCK = true

// 模拟网络延迟
const delay = (ms = 300) => new Promise(resolve => setTimeout(resolve, ms))

// 包装为 axios 风格的响应
const mockResponse = (data) => ({ data })

// 创建模拟
export const createSimulation = async (data) => {
  if (USE_MOCK) {
    await delay(500)
    return mockResponse(generateMockResult(data))
  }
  return api.post('/simulate', data)
}

// 预分析
export const analyzeSimulation = async (data) => {
  if (USE_MOCK) {
    await delay(400)
    return mockResponse(generateMockAnalysis(data))
  }
  return api.post('/analyze', data)
}

// 人生决策树
export const getDecisionTree = async (data) => {
  if (USE_MOCK) {
    await delay(400)
    return mockResponse(generateMockDecisionTree(data))
  }
  return api.post('/decision-tree', data)
}

// 人生风险预警
export const getRiskWarning = async (data) => {
  if (USE_MOCK) {
    await delay(400)
    return mockResponse(generateMockRiskWarning(data))
  }
  return api.post('/risk-warning', data)
}

// AI未来来信
export const getFutureLetter = async (data, years) => {
  if (USE_MOCK) {
    await delay(500)
    return mockResponse(generateMockFutureLetter(data, years))
  }
  return api.post('/future-letter', { ...data, years })
}

// AI真实案例库
export const getCaseLibrary = async (data) => {
  if (USE_MOCK) {
    await delay(400)
    return mockResponse(generateMockCaseLibrary(data))
  }
  return api.post('/case-library', data)
}

// 后悔指数模型
export const getRegretIndex = async (data) => {
  if (USE_MOCK) {
    await delay(400)
    return mockResponse(generateMockRegretIndex(data))
  }
  return api.post('/regret-index', data)
}

// 人生价值雷达
export const getValueRadar = async (data) => {
  if (USE_MOCK) {
    await delay(400)
    return mockResponse(generateMockValueRadar(data))
  }
  return api.post('/value-radar', data)
}

// AI未来采访
export const getFutureInterview = async (data, years) => {
  if (USE_MOCK) {
    await delay(500)
    return mockResponse(generateMockFutureInterview(data, years))
  }
  return api.post('/future-interview', { ...data, years })
}

// 决策复盘
export const getReview = async (data) => {
  if (USE_MOCK) {
    await delay(400)
    return mockResponse(generateMockReview(data))
  }
  return api.post('/review', data)
}

// 我的决策档案
export const getArchive = async () => {
  if (USE_MOCK) {
    await delay(300)
    return mockResponse(generateMockArchive())
  }
  return api.get('/archive')
}

// AI人生地图
export const getLifeMap = async (data) => {
  if (USE_MOCK) {
    await delay(400)
    return mockResponse(generateMockLifeMap(data))
  }
  return api.post('/life-map', data)
}

// AI决策体检
export const getDecisionCheckup = async (data) => {
  if (USE_MOCK) {
    await delay(400)
    return mockResponse(generateMockDecisionCheckup(data))
  }
  return api.post('/checkup', data)
}

// 获取历史记录列表
export const getHistory = async () => {
  if (USE_MOCK) {
    await delay(200)
    return mockResponse([])
  }
  return api.get('/history')
}

// 获取历史记录详情
export const getHistoryDetail = async (id) => {
  if (USE_MOCK) {
    await delay(200)
    return mockResponse(null)
  }
  return api.get(`/history/${id}`)
}

// 删除历史记录
export const deleteHistory = async (id) => {
  if (USE_MOCK) {
    await delay(200)
    return mockResponse({ success: true })
  }
  return api.delete(`/history/${id}`)
}

// 数据驾驶舱
export const getDashboard = async () => {
  if (USE_MOCK) {
    await delay(300)
    return mockResponse(generateMockDashboard())
  }
  return api.get('/dashboard')
}

// axios 实例（仅非 Mock 模式使用）
import axios from 'axios'
const api = axios.create({
  baseURL: '/api',
  timeout: 60000
})

export default api
