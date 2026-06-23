import axios from 'axios'
import dotenv from 'dotenv'

dotenv.config()

const API_KEY = process.env.DEEPSEEK_API_KEY
const API_URL = process.env.DEEPSEEK_API_URL || 'https://api.deepseek.com/v1/chat/completions'
const MODEL = process.env.DEEPSEEK_MODEL || 'deepseek-chat'

export const isDeepSeekAvailable = () => {
  return !!API_KEY && API_KEY !== 'your_deepseek_api_key_here'
}

const buildPrompt = (userData) => {
  return `你是一个人生模拟推演引擎。请根据以下用户信息，推演出4个平行宇宙的未来发展结果。

用户信息：
- 年龄：${userData.age}岁
- 学历：${userData.education}
- 城市：${userData.city}
- 当前职业：${userData.career}
- 月收入：${userData.income}元
- 存款：${userData.savings}元
- 想做的决定：${userData.decision}

请生成4个平行宇宙：
- 宇宙A：保持现状（不做改变）
- 宇宙B：执行目标（坚定执行用户的决定）
- 宇宙C：替代方案1（AI推荐的折中或创新路径）
- 宇宙D：替代方案2（AI推荐的另一种不同视角方案）

请严格按照以下JSON格式返回（不要包含任何其他文字，不要使用markdown代码块）：
{
  "summary": "对四个宇宙的综合分析总结，200字以内",
  "universes": [
    {
      "label": "A",
      "title": "保持现状",
      "subtitle": "延续当前人生轨迹",
      "theme": {
        "color": "#8a63ff",
        "gradient": "linear-gradient(135deg, #8a63ff, #6366f1)"
      },
      "incomeChange": "+15%",
      "risk": 30,
      "happiness": 65,
      "growth": 40,
      "incomeTrend": [${userData.income}, ${Math.round(userData.income * 1.05)}, ${Math.round(userData.income * 1.15)}, ${Math.round(userData.income * 1.25)}, ${Math.round(userData.income * 1.4)}],
      "timeline": [
        {"year": "1年后", "event": "事件描述"},
        {"year": "3年后", "event": "事件描述"},
        {"year": "5年后", "event": "事件描述"},
        {"year": "10年后", "event": "事件描述"}
      ],
      "advice": "针对这个宇宙的建议，50字以内"
    },
    {
      "label": "B",
      "title": "执行目标",
      "subtitle": "坚定执行你的决定",
      "theme": {
        "color": "#4a9eff",
        "gradient": "linear-gradient(135deg, #4a9eff, #00e5ff)"
      },
      "incomeChange": "...",
      "risk": 50,
      "happiness": 75,
      "growth": 80,
      "incomeTrend": [5个数字],
      "timeline": [4个时间节点],
      "advice": "..."
    },
    {
      "label": "C",
      "title": "替代方案一",
      "subtitle": "...",
      "theme": {
        "color": "#ff6b9d",
        "gradient": "linear-gradient(135deg, #ff6b9d, #ffa500)"
      },
      "incomeChange": "...",
      "risk": 40,
      "happiness": 70,
      "growth": 65,
      "incomeTrend": [5个数字],
      "timeline": [4个时间节点],
      "advice": "..."
    },
    {
      "label": "D",
      "title": "替代方案二",
      "subtitle": "...",
      "theme": {
        "color": "#4ade80",
        "gradient": "linear-gradient(135deg, #4ade80, #00e5ff)"
      },
      "incomeChange": "...",
      "risk": 35,
      "happiness": 72,
      "growth": 70,
      "incomeTrend": [5个数字],
      "timeline": [4个时间节点],
      "advice": "..."
    }
  ]
}

要求：
1. incomeChange 用 "+X%" 或 "-X%" 格式
2. risk/happiness/growth 都是0-100的整数
3. incomeTrend 是5个月收入数字（现在、1年后、3年后、5年后、10年后）
4. timeline 包含4个时间节点
5. 内容要基于用户的具体信息，有针对性和差异化
6. 每个宇宙的指标要有明显差异
7. 只返回JSON，不要任何其他内容`
}

const buildAnalysisPrompt = (userData) => {
  return `你是一个人生模拟推演引擎。请根据以下用户信息，进行预分析评估。

用户信息：
- 年龄：${userData.age}岁
- 学历：${userData.education}
- 城市：${userData.city}
- 当前职业：${userData.career}
- 月收入：${userData.income}元
- 存款：${userData.savings}元
- 想做的决定：${userData.decision}

请从四个维度评估用户当前状况，严格按照以下JSON格式返回（不要包含任何其他文字，不要使用markdown代码块）：
{
  "dimensions": [
    {
      "id": "career",
      "label": "当前职业稳定性",
      "score": 82,
      "icon": "💼",
      "color": "#8a63ff",
      "reason": "评估原因，30字以内"
    },
    {
      "id": "financial",
      "label": "财务抗风险能力",
      "score": 70,
      "icon": "💰",
      "color": "#4a9eff",
      "reason": "评估原因，30字以内"
    },
    {
      "id": "success",
      "label": "创业成功率参考",
      "score": 35,
      "isPercent": true,
      "icon": "🎯",
      "color": "#ff6b9d",
      "reason": "评估原因，30字以内"
    },
    {
      "id": "industry",
      "label": "行业发展指数",
      "score": 78,
      "icon": "📈",
      "color": "#4ade80",
      "reason": "评估原因，30字以内"
    }
  ],
  "overallScore": 66
}

要求：
1. score是0-100的整数
2. reason要基于用户的具体信息
3. overallScore是四个维度的平均分
4. 只返回JSON，不要任何其他内容`
}

export const analyzeWithDeepSeek = async (userData) => {
  const prompt = buildAnalysisPrompt(userData)

  const response = await axios.post(
    API_URL,
    {
      model: MODEL,
      messages: [
        { role: 'system', content: '你是一个专业的人生模拟推演AI，只返回JSON格式数据。' },
        { role: 'user', content: prompt }
      ],
      temperature: 0.7,
      max_tokens: 2000
    },
    {
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json'
      },
      timeout: 30000
    }
  )

  const content = response.data.choices[0].message.content

  let jsonStr = content.trim()
  if (jsonStr.startsWith('```')) {
    jsonStr = jsonStr.replace(/^```(?:json)?\n?/, '').replace(/\n?```$/, '')
  }

  return JSON.parse(jsonStr)
}

export const simulateWithDeepSeek = async (userData) => {
  const prompt = buildPrompt(userData)

  const response = await axios.post(
    API_URL,
    {
      model: MODEL,
      messages: [
        { role: 'system', content: '你是一个专业的人生模拟推演AI，只返回JSON格式数据。' },
        { role: 'user', content: prompt }
      ],
      temperature: 0.8,
      max_tokens: 4000
    },
    {
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json'
      },
      timeout: 55000
    }
  )

  const content = response.data.choices[0].message.content

  // 清理可能的 markdown 代码块标记
  let jsonStr = content.trim()
  if (jsonStr.startsWith('```')) {
    jsonStr = jsonStr.replace(/^```(?:json)?\n?/, '').replace(/\n?```$/, '')
  }

  const result = JSON.parse(jsonStr)
  return result
}
