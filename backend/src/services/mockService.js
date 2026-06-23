// Mock 数据生成器 - 比赛版
// 包含：宇宙重命名、城市数据模型、决策树、风险预警、未来来信

const themes = {
  A: { color: '#8a63ff', gradient: 'linear-gradient(135deg, #8a63ff, #6366f1)' },
  B: { color: '#4a9eff', gradient: 'linear-gradient(135deg, #4a9eff, #00e5ff)' },
  C: { color: '#ff6b9d', gradient: 'linear-gradient(135deg, #ff6b9d, #ffa500)' },
  D: { color: '#4ade80', gradient: 'linear-gradient(135deg, #4ade80, #00e5ff)' }
}

// ===== 城市发展数据模型 =====
const cityData = {
  '北京': { employmentIndex: 88, salaryIndex: 92, startupIndex: 85, costIndex: 95, growthIndex: 82 },
  '上海': { employmentIndex: 90, salaryIndex: 95, startupIndex: 88, costIndex: 96, growthIndex: 85 },
  '深圳': { employmentIndex: 87, salaryIndex: 90, startupIndex: 92, costIndex: 90, growthIndex: 90 },
  '广州': { employmentIndex: 82, salaryIndex: 80, startupIndex: 78, costIndex: 75, growthIndex: 76 },
  '杭州': { employmentIndex: 85, salaryIndex: 86, startupIndex: 88, costIndex: 78, growthIndex: 89 },
  '成都': { employmentIndex: 78, salaryIndex: 72, startupIndex: 75, costIndex: 65, growthIndex: 82 },
  '武汉': { employmentIndex: 75, salaryIndex: 70, startupIndex: 70, costIndex: 62, growthIndex: 78 },
  '南京': { employmentIndex: 76, salaryIndex: 74, startupIndex: 72, costIndex: 68, growthIndex: 76 },
  '西安': { employmentIndex: 72, salaryIndex: 65, startupIndex: 68, costIndex: 58, growthIndex: 74 },
  '苏州': { employmentIndex: 80, salaryIndex: 78, startupIndex: 76, costIndex: 70, growthIndex: 80 }
}

const getCityData = (cityName) => {
  // 精确匹配
  if (cityData[cityName]) return cityData[cityName]
  // 模糊匹配
  for (const key of Object.keys(cityData)) {
    if (cityName.includes(key) || key.includes(cityName)) return cityData[key]
  }
  // 默认值
  return { employmentIndex: 72, salaryIndex: 70, startupIndex: 68, costIndex: 65, growthIndex: 72 }
}

const generateIncomeTrend = (base, multiplier) => {
  return [
    base,
    Math.round(base * (1 + multiplier * 0.15)),
    Math.round(base * (1 + multiplier * 0.4)),
    Math.round(base * (1 + multiplier * 0.7)),
    Math.round(base * (1 + multiplier * 1.2))
  ]
}

const generateTimeline = (type, userData) => {
  const city = userData.city || '当前城市'
  const career = userData.career || '当前职业'
  const timelines = {
    A: [
      { year: '1年后', event: `继续在${city}从事${career}工作，收入稳步小幅增长` },
      { year: '3年后', event: `积累了更多行业经验，可能获得一次晋升机会` },
      { year: '5年后', event: `生活趋于稳定，但可能感到职业发展遇到瓶颈` },
      { year: '10年后', event: `回顾人生，或许会想"如果当初..."，但也有了安稳的积累` }
    ],
    B: [
      { year: '1年后', event: `刚执行决定，面临转型阵痛，收入可能出现波动` },
      { year: '3年后', event: `逐渐走上正轨，新方向开始展现潜力` },
      { year: '5年后', event: `决定带来的收益开始显现，职业路径焕然一新` },
      { year: '10年后', event: `庆幸当初的勇气，人生轨迹因这个决定而截然不同` }
    ],
    C: [
      { year: '1年后', event: `采取折中方案，在现有基础上渐进式调整方向` },
      { year: '3年后', event: `副业或新技能逐渐成熟，开始产生额外收益` },
      { year: '5年后', event: `成功实现软着陆，新旧方向并行发展` },
      { year: '10年后', event: `走出一条独特的复合型发展道路，进退自如` }
    ],
    D: [
      { year: '1年后', event: `选择了一条少有人走的路，需要更多探索时间` },
      { year: '3年后', event: `找到自己的节奏，开始建立独特竞争优势` },
      { year: '5年后', event: `在细分领域站稳脚跟，收获差异化红利` },
      { year: '10年后', event: `成为某个小领域的专家，活出了不一样的人生` }
    ]
  }
  return timelines[type]
}

const generateAdvice = (type) => {
  const advices = {
    A: '安稳宇宙虽然风险最低，但长期可能错失成长机会。建议在稳定中寻找突破点，保持学习。',
    B: '突破宇宙需要勇气和充分准备。建议提前做好6-12个月财务缓冲和技能储备，降低转型风险。',
    C: '成长宇宙兼顾稳定与发展。建议设定明确的里程碑，每季度复盘，避免长期处于过渡状态。',
    D: '创新宇宙充满可能性但也伴随不确定性。建议小步快跑，用最小成本快速验证方向。'
  }
  return advices[type]
}

// ===== 预分析数据 =====
export const generateMockAnalysis = (userData) => {
  const income = Number(userData.income) || 10000
  const savings = Number(userData.savings) || 0
  const age = Number(userData.age) || 30
  const cityInfo = getCityData(userData.city)

  const careerStability = Math.min(95, 55 + Math.max(0, 35 - Math.abs(age - 30)) + Math.floor(cityInfo.employmentIndex * 0.2))
  const monthlyExpense = income * 0.6
  const supportMonths = Math.floor(savings / monthlyExpense)
  const financialScore = Math.min(95, Math.max(30, supportMonths * 8 + 20))
  const successRate = 20 + Math.floor(cityInfo.startupIndex * 0.2) + Math.floor(Math.random() * 10)
  const industryScore = Math.min(95, Math.floor(cityInfo.growthIndex * 0.7) + 20 + Math.floor(Math.random() * 10))

  return {
    dimensions: [
      {
        id: 'career',
        label: '当前职业稳定性',
        score: careerStability,
        icon: '💼',
        color: '#8a63ff',
        reason: `${userData.career}岗位在${userData.city}就业指数${cityInfo.employmentIndex}，${cityInfo.employmentIndex >= 80 ? '需求旺盛' : '竞争增加'}`
      },
      {
        id: 'financial',
        label: '财务抗风险能力',
        score: financialScore,
        icon: '💰',
        color: '#4a9eff',
        reason: `存款${savings >= 10000 ? Math.floor(savings / 10000) + '万' : savings}元，可支撑约${supportMonths}个月`
      },
      {
        id: 'success',
        label: '创业成功率参考',
        score: successRate,
        isPercent: true,
        icon: '🎯',
        color: '#ff6b9d',
        reason: `${userData.city}创业指数${cityInfo.startupIndex}，结合公开创业统计数据`
      },
      {
        id: 'industry',
        label: '行业发展指数',
        score: industryScore,
        icon: '📈',
        color: '#4ade80',
        reason: `${userData.city}发展指数${cityInfo.growthIndex}，${cityInfo.growthIndex >= 85 ? '行业高速增长' : '行业稳步增长'}`
      }
    ],
    cityData: cityInfo,
    cityName: userData.city,
    overallScore: Math.round((careerStability + financialScore + successRate + industryScore) / 4)
  }
}

// ===== 四重平行宇宙（比赛版命名）=====
export const generateMockResult = (userData) => {
  const baseIncome = Number(userData.income) || 10000
  const cityInfo = getCityData(userData.city)

  const universes = [
    {
      label: 'A',
      title: '安稳宇宙',
      subtitle: '延续当前轨迹，稳中求进',
      theme: themes.A,
      incomeChange: '+15%',
      risk: 25,
      happiness: 62,
      growth: 38,
      incomeTrend: generateIncomeTrend(baseIncome, 0.4),
      timeline: generateTimeline('A', userData),
      advice: generateAdvice('A')
    },
    {
      label: 'B',
      title: '突破宇宙',
      subtitle: '坚定执行决定，破局重生',
      theme: themes.B,
      incomeChange: '+85%',
      risk: 65,
      happiness: 78,
      growth: 85,
      incomeTrend: generateIncomeTrend(baseIncome, 1.8),
      timeline: generateTimeline('B', userData),
      advice: generateAdvice('B')
    },
    {
      label: 'C',
      title: '成长宇宙',
      subtitle: '渐进转型，平衡中求发展',
      theme: themes.C,
      incomeChange: '+45%',
      risk: 40,
      happiness: 75,
      growth: 68,
      incomeTrend: generateIncomeTrend(baseIncome, 1.0),
      timeline: generateTimeline('C', userData),
      advice: generateAdvice('C')
    },
    {
      label: 'D',
      title: '创新宇宙',
      subtitle: '另辟蹊径，探索差异化可能',
      theme: themes.D,
      incomeChange: '+60%',
      risk: 50,
      happiness: 80,
      growth: 72,
      incomeTrend: generateIncomeTrend(baseIncome, 1.3),
      timeline: generateTimeline('D', userData),
      advice: generateAdvice('D')
    }
  ]

  const summary = `基于你${userData.age}岁、在${userData.city}从事${userData.career}的现状（城市就业指数${cityInfo.employmentIndex}、创业指数${cityInfo.startupIndex}），AI推演了四个平行宇宙。安稳宇宙风险最低但成长有限；突破宇宙收益最高但风险也最大；成长宇宙在稳定与发展间取得平衡；创新宇宙在幸福感和成长性上表现突出。综合来看，成长宇宙和创新宇宙是兼顾风险与回报的优选。`

  return { summary, universes, cityData: cityInfo }
}

// ===== 人生决策树 =====
export const generateMockDecisionTree = (userData) => {
  const cityInfo = getCityData(userData.city)
  const successRate = 20 + Math.floor(cityInfo.startupIndex * 0.2)

  return {
    root: {
      name: '现在',
      subtitle: `${userData.age}岁 · ${userData.career}`,
      children: [
        {
          name: '安稳宇宙',
          probability: 100,
          color: '#8a63ff',
          children: [
            { name: '晋升资深', probability: 60, outcome: '收入+30%，生活稳定', color: '#8a63ff' },
            { name: '维持现状', probability: 30, outcome: '收入+10%，逐渐被淘汰', color: '#a78bfa' },
            { name: '被动离职', probability: 10, outcome: '需重新找工作，短期阵痛', color: '#c4b5fd' }
          ]
        },
        {
          name: '突破宇宙',
          probability: 100,
          color: '#4a9eff',
          children: [
            { name: '创业成功', probability: successRate, outcome: `收入翻倍+，事业自由`, color: '#4a9eff' },
            { name: '稳步发展', probability: 35, outcome: '收入+50%，找到新方向', color: '#60a5fa' },
            { name: '创业失败', probability: 100 - successRate - 35, outcome: '损失存款，重回职场', color: '#93c5fd' }
          ]
        },
        {
          name: '成长宇宙',
          probability: 100,
          color: '#ff6b9d',
          children: [
            { name: '副业成熟', probability: 50, outcome: '收入+60%，双线发展', color: '#ff6b9d' },
            { name: '技能转型', probability: 35, outcome: '收入+40%，新赛道', color: '#f9a8d4' },
            { name: '进展缓慢', probability: 15, outcome: '收入+15%，时间成本高', color: '#fbcfe8' }
          ]
        },
        {
          name: '创新宇宙',
          probability: 100,
          color: '#4ade80',
          children: [
            { name: '建立壁垒', probability: 30, outcome: '细分领域专家，高溢价', color: '#4ade80' },
            { name: '稳定收益', probability: 45, outcome: '收入+50%，自由度高', color: '#86efac' },
            { name: '方向迷失', probability: 25, outcome: '探索成本高，需调整', color: '#bbf7d0' }
          ]
        }
      ]
    }
  }
}

// ===== 人生风险预警 =====
export const generateMockRiskWarning = (userData) => {
  return {
    risks: [
      {
        id: 'regret',
        icon: '😔',
        title: '最大后悔点预警',
        level: 'high',
        levelText: '高风险',
        color: '#ff6b6b',
        items: [
          { time: '5年后', risk: `如果选择安稳宇宙，可能会后悔没有趁年轻尝试${userData.decision}`, severity: 85 },
          { time: '10年后', risk: `如果选择突破宇宙但失败，可能会后悔没有做好充分准备`, severity: 70 },
          { time: '15年后', risk: `无论哪条路，最可能后悔的是"没有早点开始"`, severity: 90 }
        ]
      },
      {
        id: 'financial',
        icon: '💸',
        title: '财务风险预警',
        level: 'medium',
        levelText: '中风险',
        color: '#ffa500',
        items: [
          { time: '1年内', risk: `突破宇宙初期收入可能下降50%，存款消耗加速`, severity: 75 },
          { time: '3年内', risk: `创新宇宙可能需要持续投入，${userData.savings >= 100000 ? '当前存款可支撑' : '存款可能不足'}`, severity: 60 },
          { time: '5年内', risk: `成长宇宙需要兼顾主业和副业，可能面临双重压力`, severity: 55 }
        ]
      },
      {
        id: 'career',
        icon: '⚠️',
        title: '职业发展风险',
        level: 'medium',
        levelText: '中风险',
        color: '#ffa500',
        items: [
          { time: '2年内', risk: `${userData.career}岗位可能被AI工具部分替代，需提前布局`, severity: 65 },
          { time: '5年内', risk: `行业格局变化，${userData.city}的竞争将更加激烈`, severity: 70 },
          { time: '10年后', risk: `如果不持续学习，任何宇宙都面临被淘汰风险`, severity: 80 }
        ]
      },
      {
        id: 'opportunity',
        icon: '🔥',
        title: '机会成本预警',
        level: 'low',
        levelText: '需关注',
        color: '#4ade80',
        items: [
          { time: '现在', risk: `AI行业窗口期可能只有2-3年，犹豫本身就是成本`, severity: 70 },
          { time: '3年后', risk: `年龄${Number(userData.age) + 3}岁，转型成本将显著增加`, severity: 60 },
          { time: '5年后', risk: `${userData.city}的政策红利可能变化，需关注时机`, severity: 50 }
        ]
      }
    ],
    summary: `综合分析，你当前面临的最大风险不是"选错"，而是"不选"。建议在财务可承受范围内，优先考虑成长宇宙或创新宇宙，既能控制风险又能抓住机会窗口。`
  }
}

// ===== AI未来来信 =====
export const generateMockFutureLetter = (userData, years) => {
  const letters = {
    3: {
      year: `${Number(userData.age) + 3}岁的你`,
      greeting: `亲爱的${userData.age}岁的我：`,
      content: `你好啊，三年前的自己。

写下这封信的时候，我正在${userData.city}的一间咖啡馆里。三年前你犹豫要不要${userData.decision}，现在我可以告诉你——

这三年并不容易。刚开始的时候确实有过迷茫和焦虑，尤其是看到同龄人还在稳步上班拿工资的时候。但回过头看，那些挣扎恰恰是成长最快的时候。

我现在的生活和你想象的有些不同。收入没有翻倍那么夸张，但做的事情让我每天醒来都有期待感。最重要的是，我不再害怕"如果当初"这四个字了。

如果非要给你一个建议：不要等"准备好了"才开始。永远没有完全准备好的时候，但时间不会等你。

对了，记得多运动，少熬夜。三年后的身体真的会不一样。

此致
${Number(userData.age) + 3}岁的你`,
      mood: '感恩而坚定',
      highlight: '那些挣扎恰恰是成长最快的时候'
    },
    5: {
      year: `${Number(userData.age) + 5}岁的你`,
      greeting: `亲爱的${userData.age}岁的我：`,
      content: `展信佳。

五年了。你一定想不到，五年后的我会过着这样的生活。

关于那个让你辗转反侧的决定——${userData.decision}——我最终走了一条你没完全预料到的路。既不是最激进的突破，也不是最保守的安稳，而是在尝试中找到了属于自己的节奏。

五年后的我，经济上比现在宽裕了不少，但更重要的是，我找到了一种"不焦虑"的状态。不再每天和别人比较，不再被"应该怎样"绑架。

如果有什么遗憾的话，就是中间有段时间太拼了，忽略了一些重要的人和事。工作永远做不完，但有些错过就是错过了。

所以，去尝试吧，但记得留一些时间给生活本身。人生不是只有事业这一条线。

祝好
${Number(userData.age) + 5}岁的你`,
      mood: '从容而通透',
      highlight: '找到了一种"不焦虑"的状态'
    },
    10: {
      year: `${Number(userData.age) + 10}岁的你`,
      greeting: `亲爱的${userData.age}岁的我：`,
      content: `你好，十年前的年轻人。

十年后再看当年那个纠结要不要${userData.decision}的你，我只想说一句话：谢谢你做了选择。

不管那个选择最终是对是错，十年后的我都过得很好。因为人生不是一道选择题，而是一道论述题——重要的不是选了什么，而是选了之后怎么走。

这十年里我经历过低谷，也到达过意想不到的高点。${userData.city}变了好多，行业也变了好多，我也变了好多。但有一件事没变：我依然对生活充满好奇。

十年前的你总在担心"选错了怎么办"，十年后的我想告诉你：没有错误的选择，只有不同的风景。每条路上都有属于它的花开。

所以，别怕。去选，去走，去经历。十年很长，但也很快。

带着你现在的勇气，往前走吧。

${Number(userData.age) + 10}岁的你
于${userData.city}`,
      mood: '豁达而温暖',
      highlight: '没有错误的选择，只有不同的风景'
    }
  }

  return letters[years] || letters[3]
}

// ===== AI真实案例库 =====
export const generateMockCaseLibrary = (userData) => {
  const cityInfo = getCityData(userData.city)
  const age = Number(userData.age) || 30
  const career = userData.career || '职场人'
  const decision = userData.decision || '做出改变'

  return {
    similarCases: [
      {
        id: 1,
        avatar: '👨‍💻',
        name: '李明',
        age: age + 2,
        city: userData.city,
        career: career,
        decision: decision,
        similarity: 92,
        chosen: '突破宇宙',
        outcome: '成功',
        incomeBefore: Number(userData.income) || 10000,
        incomeAfter: Math.round((Number(userData.income) || 10000) * 2.5),
        timeline: '2年实现盈利，3年稳定营收',
        summary: `同样是${career}出身，${age + 2}岁时选择${decision}。前期艰难但坚持了下来，现在收入翻倍。`
      },
      {
        id: 2,
        avatar: '👩‍💼',
        name: '王芳',
        age: age - 1,
        city: userData.city,
        career: career,
        decision: '选择成长宇宙路径',
        similarity: 85,
        chosen: '成长宇宙',
        outcome: '成功',
        incomeBefore: Math.round((Number(userData.income) || 10000) * 0.8),
        incomeAfter: Math.round((Number(userData.income) || 10000) * 1.8),
        timeline: '1年副业起步，2年双线并行，3年完成转型',
        summary: `没有直接辞职，而是先发展副业。利用${userData.city}的产业优势，渐进式转型，风险可控。`
      },
      {
        id: 3,
        avatar: '🧑‍🎨',
        name: '张伟',
        age: age + 3,
        city: '杭州',
        career: '设计师',
        decision: '辞职做自由职业',
        similarity: 78,
        chosen: '创新宇宙',
        outcome: '成功',
        incomeBefore: 12000,
        incomeAfter: 22000,
        timeline: '6个月低谷期，1年找到方向，2年建立个人品牌',
        summary: '选择差异化路线，在细分领域建立壁垒。前期收入下降但幸福感和自由度大幅提升。'
      }
    ],
    successCases: [
      {
        id: 1,
        avatar: '🚀',
        name: '陈强',
        background: '30岁程序员 · 北京',
        strategy: '先做MVP验证，3个月拿到种子用户后再辞职',
        keyFactor: '最小化试错成本，用数据驱动决策',
        incomeGrowth: '300%',
        advice: '不要等"准备好了"才开始，但一定要有验证过的方向再全力投入'
      },
      {
        id: 2,
        avatar: '🎯',
        name: '刘洋',
        background: '28岁产品经理 · 深圳',
        strategy: '利用业余时间积累客户资源，辞职时已有3个付费客户',
        keyFactor: '提前建立现金流，降低转型风险',
        incomeGrowth: '180%',
        advice: '最好的辞职时机不是"想清楚了"，而是"有收入了"'
      },
      {
        id: 3,
        avatar: '🌱',
        name: '赵琳',
        background: '32岁运营 · 上海',
        strategy: '选择副业先行，6个月后副业收入超过主业才辞职',
        keyFactor: '渐进式转型，保持财务安全垫',
        incomeGrowth: '150%',
        advice: '成长宇宙路径适合大多数人，兼顾稳定和发展'
      }
    ],
    failureCases: [
      {
        id: 1,
        avatar: '💸',
        name: '匿名用户A',
        background: '29岁前端开发 · 广州',
        strategy: '裸辞创业，没有验证市场直接投入',
        failureReason: '没有客户验证，产品做了3个月无人问津',
        loss: '存款消耗12万，重回职场降薪30%',
        lesson: '永远不要在没有付费用户之前全职投入'
      },
      {
        id: 2,
        avatar: '😰',
        name: '匿名用户B',
        background: '31岁设计师 · 北京',
        strategy: '跟风热门赛道，没有自身优势积累',
        failureReason: '选择自己不擅长的领域，竞争激烈无法差异化',
        loss: '8个月时间成本 + 5万投入',
        lesson: '选择赛道要基于自身优势，而不是市场热度'
      },
      {
        id: 3,
        avatar: '📉',
        name: '匿名用户C',
        background: '27岁程序员 · 杭州',
        strategy: '辞职后没有财务规划，3个月花光存款',
        failureReason: '财务缓冲不足，焦虑导致决策变形',
        loss: '被迫接受不理想的工作机会',
        lesson: '至少准备12个月的生活费再考虑全职转型'
      }
    ],
    patterns: {
      successPatterns: [
        { pattern: '先验证后投入', frequency: 85, description: '83%的成功案例都在辞职前完成了市场验证' },
        { pattern: '渐进式转型', frequency: 72, description: '副业先行策略的成功率是裸辞的2.3倍' },
        { pattern: '财务缓冲充足', frequency: 90, description: '成功者平均准备了14个月的生活费' },
        { pattern: '利用城市优势', frequency: 68, description: '结合所在城市的产业生态选择方向' }
      ],
      failurePatterns: [
        { pattern: '裸辞无规划', frequency: 78, description: '78%的失败案例都是冲动裸辞' },
        { pattern: '财务准备不足', frequency: 65, description: '存款低于6个月生活费时焦虑感急剧上升' },
        { pattern: '盲目跟风', frequency: 52, description: '选择不熟悉的赛道是常见失败原因' },
        { pattern: '孤军奋战', frequency: 45, description: '缺乏导师和社群支持的创业者更容易放弃' }
      ],
      aiSummary: `基于${cityInfo.employmentIndex > 80 ? '一线城市' : '新一线/二线城市'}${career}从业者的${similarCases_length(userData)}个真实案例分析，成功转型者普遍遵循"验证→积累→转型"三步法。在${userData.city}（创业指数${cityInfo.startupIndex}），建议采取渐进式策略，利用现有职业积累的资源优势，将转型风险降至最低。最关键的发现是：准备程度比时机更重要，但"过度准备"本身也是一种风险。`
    }
  }
}

function similarCases_length(userData) {
  return 50 + Math.floor(Math.random() * 30)
}

// ===== 后悔指数模型 =====
export const generateMockRegretIndex = (userData) => {
  const age = Number(userData.age) || 30
  const savings = Number(userData.savings) || 0

  return {
    universes: [
      {
        label: 'A',
        title: '安稳宇宙',
        color: '#8a63ff',
        regretIndex: 72,
        level: '中高',
        levelColor: '#ffa500',
        reasons: [
          { time: '5年后', reason: `可能会后悔没有趁${age}岁时尝试${userData.decision}，年龄越大转型成本越高` },
          { time: '10年后', reason: '稳定的收入换来了安全感，但可能失去了爆发性成长的机会' },
          { time: '15年后', reason: '看到同龄人因勇敢尝试而获得不同人生时，遗憾感最强' }
        ],
        topRegret: '最大的后悔将是"我本可以，但我没有"',
        mitigation: '在稳定中开辟小规模实验，每月投入10%的时间探索新可能'
      },
      {
        label: 'B',
        title: '突破宇宙',
        color: '#4a9eff',
        regretIndex: 45,
        level: '中等',
        levelColor: '#ffa500',
        reasons: [
          { time: '2年后', reason: savings < 100000 ? '存款消耗快，可能后悔财务准备不足' : '转型阵痛期可能后悔时机选择' },
          { time: '5年后', reason: '如果方向正确，后悔指数会快速下降；如果方向偏差，可能需要调整路线' },
          { time: '10年后', reason: '即使失败，经历过的人通常不后悔尝试本身' }
        ],
        topRegret: '最大的后悔将是"准备不够充分就冲了"',
        mitigation: '制定清晰的里程碑和止损线，每3个月复盘一次方向'
      },
      {
        label: 'C',
        title: '成长宇宙',
        color: '#ff6b9d',
        regretIndex: 28,
        level: '低',
        levelColor: '#4ade80',
        reasons: [
          { time: '3年后', reason: '可能偶尔觉得进展太慢，但方向是对的' },
          { time: '5年后', reason: '双线并行可能带来精力分散的遗憾，但整体收益可观' },
          { time: '10年后', reason: '回头看，这是后悔指数最低的选择' }
        ],
        topRegret: '最大的后悔将是"过渡期拖得太久"',
        mitigation: '设定明确的转型时间表，避免长期处于"半吊子"状态'
      },
      {
        label: 'D',
        title: '创新宇宙',
        color: '#4ade80',
        regretIndex: 38,
        level: '中低',
        levelColor: '#4ade80',
        reasons: [
          { time: '2年后', reason: '可能后悔没有选择更主流的路径，社会认同感不足' },
          { time: '5年后', reason: '如果找到差异化优势，后悔感会消失；否则可能怀疑选择' },
          { time: '10年后', reason: '独特经历本身成为人生财富，后悔指数趋于零' }
        ],
        topRegret: '最大的后悔将是"走得太偏，错过了主流机会"',
        mitigation: '保持与主流行业的连接，将差异化作为优势而非逃避'
      }
    ],
    summary: '后悔指数分析表明：不行动的后悔远大于行动失败的后悔。成长宇宙的后悔指数最低（28），是风险调整后的最优选择。但如果你有强烈的内心驱动力，突破宇宙的"尝试过就不后悔"效应会在10年后显现。',
    recommendation: '基于你的情况，建议选择成长宇宙作为主路径，同时保留向突破宇宙切换的灵活性。'
  }
}

// ===== 人生价值雷达 =====
export const generateMockValueRadar = (userData) => {
  const income = Number(userData.income) || 10000
  const savings = Number(userData.savings) || 0
  const age = Number(userData.age) || 30
  const cityInfo = getCityData(userData.city)

  const baseWealth = Math.min(90, 30 + Math.floor(income / 500) + Math.floor(savings / 20000))
  const baseHealth = Math.max(40, 90 - Math.max(0, age - 25) * 2)
  const baseFreedom = 35 + Math.floor(cityInfo.growthIndex * 0.3)
  const baseGrowth = 50 + Math.floor(cityInfo.employmentIndex * 0.2)

  return {
    dimensions: [
      { name: '财富', max: 100 },
      { name: '健康', max: 100 },
      { name: '家庭', max: 100 },
      { name: '自由', max: 100 },
      { name: '成长', max: 100 },
      { name: '幸福', max: 100 }
    ],
    current: {
      name: '当前状态',
      values: [baseWealth, baseHealth, 65, baseFreedom, baseGrowth, 58],
      color: '#8a63ff'
    },
    universes: [
      {
        name: '安稳宇宙',
        color: '#8a63ff',
        values: [
          Math.min(95, baseWealth + 15),
          Math.min(90, baseHealth + 5),
          75,
          Math.max(30, baseFreedom - 10),
          Math.max(30, baseGrowth - 15),
          62
        ]
      },
      {
        name: '突破宇宙',
        color: '#4a9eff',
        values: [
          Math.min(95, baseWealth + 35),
          Math.max(40, baseHealth - 15),
          55,
          Math.min(90, baseFreedom + 30),
          Math.min(95, baseGrowth + 25),
          78
        ]
      },
      {
        name: '成长宇宙',
        color: '#ff6b9d',
        values: [
          Math.min(90, baseWealth + 20),
          Math.min(85, baseHealth - 5),
          68,
          Math.min(80, baseFreedom + 15),
          Math.min(90, baseGrowth + 15),
          75
        ]
      },
      {
        name: '创新宇宙',
        color: '#4ade80',
        values: [
          Math.min(85, baseWealth + 15),
          Math.min(88, baseHealth + 3),
          60,
          Math.min(95, baseFreedom + 40),
          Math.min(88, baseGrowth + 18),
          82
        ]
      }
    ],
    analysis: {
      strongest: {
        universe: '创新宇宙',
        dimension: '自由',
        value: Math.min(95, baseFreedom + 40),
        insight: '创新宇宙在自由维度提升最大，适合追求自主权的人'
      },
      balanced: {
        universe: '成长宇宙',
        insight: '成长宇宙各项指标最为均衡，没有明显短板'
      },
      tradeoff: {
        universe: '突破宇宙',
        insight: '突破宇宙财富和成长大幅提升，但健康和家庭会有牺牲'
      },
      summary: `当前你的财富维度（${baseWealth}）和自由维度（${baseFreedom}）有较大提升空间。四个宇宙中，创新宇宙在幸福和自由维度表现最优，成长宇宙各项最均衡，突破宇宙财富增长最强但健康和家庭有 trade-off。建议根据你最看重的维度选择宇宙。`
    }
  }
}

// ===== AI未来采访 =====
export const generateMockFutureInterview = (userData, years) => {
  const age = Number(userData.age) || 30
  const futureAge = age + years
  const city = userData.city || '当前城市'
  const decision = userData.decision || '做出改变'
  const career = userData.career || '当前职业'

  const interviews = {
    3: {
      year: `${futureAge}岁的你`,
      mood: '坦诚而略带疲惫',
      location: `${city} · 一间共享办公空间`,
      qa: [
        {
          question: '三年了，回头看当初的决定，你后悔吗？',
          answer: `说实话，头一年确实有过后悔的瞬间。尤其是看到前同事还在稳定拿工资的时候，我有时候会怀疑自己。但到了第二年，当我的项目开始有了第一批付费用户，那种"这是我自己做出来的"成就感，是工资给不了的。所以现在回头看，不后悔。`
        },
        {
          question: '这三年最大的变化是什么？',
          answer: `最大的变化不是收入，而是心态。以前我总觉得"等准备好了再开始"，现在我明白了，准备永远不会"好"，但行动本身就是在准备。另外，我对失败的恐惧减少了很多——失败只是数据，不是终点。`
        },
        {
          question: '有什么是你希望三年前就知道的？',
          answer: `我希望当初能更早地找到同行者的圈子。一个人摸索太慢了，很多坑别人已经踩过。另外，我应该更早地学会"拒绝"——不是所有机会都值得投入，精力是最稀缺的资源。`
        },
        {
          question: '给正在犹豫的人一句话？',
          answer: `不要用"准备好了"骗自己。你永远不会准备好。但你可以先迈出一小步，然后看看脚下的路。`
        },
        {
          question: '三年后的生活和你想象的一样吗？',
          answer: `不完全一样。我以为三年后我会"功成名就"，实际上我只是在一个小领域站稳了脚跟。但奇怪的是，这种"不够好"的状态反而让我很踏实，因为我知道自己还在成长。`
        }
      ]
    },
    5: {
      year: `${futureAge}岁的你`,
      mood: '从容而自信',
      location: `${city} · 自己的工作室`,
      qa: [
        {
          question: '五年了，你觉得自己变了吗？',
          answer: `变了很多。五年前的我总是在焦虑"选对了吗"，现在的我不再问这个问题了。因为我发现，重要的不是选了什么路，而是走这条路时你变成了什么样的人。五年后的我更耐心、更坚韧，也更知道自己要什么。`
        },
        {
          question: '五年来最大的收获是什么？',
          answer: `不是钱，不是名声，是一种"我能搞定"的底层自信。这种自信不是盲目的，而是被无数次困难验证过的。你知道自己能跌倒后爬起来，这种确定感比任何外在成就都珍贵。`
        },
        {
          question: '有遗憾吗？',
          answer: `有。中间有两年太拼了，身体出了些问题，也错过了一些朋友的重要时刻。工作永远做不完，但有些人和事错过了就是错过了。这是五年后我最大的教训：成功不是只有事业一条线。`
        },
        {
          question: '如果可以回到五年前，你会改变什么？',
          answer: `我不会改变大方向，但我会让自己节奏慢一点。当初总觉得"要快"，现在发现，真正有价值的东西都需要时间。快不是目的，对才是。`
        },
        {
          question: '对现在的自己说什么？',
          answer: `你已经比想象中走得更远了。别焦虑，别比较，你的节奏就是最好的节奏。`
        }
      ]
    },
    10: {
      year: `${futureAge}岁的你`,
      mood: '豁达而温暖',
      location: `${city} · 一个安静的午后`,
      qa: [
        {
          question: '十年后再看当初那个纠结的自己，想说什么？',
          answer: `我想说：谢谢你做了选择。不管那个选择最终带来了什么，十年后的我都过得很好。因为人生不是选择题，是论述题——重要的不是选了什么，而是选了之后怎么走。十年前的你勇敢地迈出了那一步，这本身就是最大的成功。`
        },
        {
          question: '十年里最大的领悟是什么？',
          answer: `没有错误的选择，只有不同的风景。我走过弯路，经历过低谷，但每一段经历都在塑造现在的我。十年前我害怕"选错"，现在我明白了，所谓的"错"只是另一条你没预料到的路。`
        },
        {
          question: '十年后，事业和生活的关系是怎样的？',
          answer: `十年前我以为事业就是一切，十年后我发现，事业只是人生的一部分。健康、家庭、友情、爱好……这些"不赚钱"的东西，反而是十年后最让我感到富足的。事业给了我成就感，但生活给了我幸福感。`
        },
        {
          question: '看到十年前的自己最想给什么建议？',
          answer: `三个字：别着急。你以为十年很长，其实很快。你以为每个决定都生死攸关，其实大部分决定都没那么重要。真正重要的是：你有没有在认真生活，有没有对身边的人好一点，有没有照顾好自己的身体。`
        },
        {
          question: '十年后，你幸福吗？',
          answer: `幸福。但这个幸福和十年前想象的不一样。它不是"什么都有了"的幸福，而是"接受了一切"的幸福。我知道自己不完美，生活不完美，但这就是我的生活，我在认真地过。十年前的你给了我这个机会，谢谢你。`
        }
      ]
    }
  }

  return interviews[years] || interviews[3]
}

// ===== 决策复盘系统 =====
export const generateMockReview = (data) => {
  const { decision, chosenUniverse, daysPassed } = data
  const dp = Number(daysPassed) || 30

  const reviewStages = {
    30: {
      stage: '30天复盘',
      stageLabel: '初期复盘',
      focus: '行动力与适应度评估',
      satisfaction: 7,
      regret: 3,
      execution: '已开始执行，初期进展符合预期',
      achievements: [
        '迈出了第一步，打破了犹豫状态',
        '建立了初步的行动框架和计划',
        '开始接触新领域，学习曲线陡峭但充实'
      ],
      challenges: [
        '时间管理压力增大，主业与新方向需要平衡',
        '初期成果不明显，偶尔会怀疑选择',
        '周围人的不理解带来一定心理压力'
      ],
      biggestGain: '最大的收获是打破了"想而不做"的状态，开始行动本身就是胜利',
      biggestRegret: '暂无明显遗憾，但偶尔会想是否准备得更充分会更好',
      aiComparison: `与当初AI推演的${chosenUniverse || '成长宇宙'}对比：当前进展基本符合预期。AI预测的"渐进式发展"路径正在验证中。初期的不适感是正常过渡现象，AI推演中提到的"前3个月阵痛期"正在经历。`,
      aiSuggestion: '建议保持当前节奏，不要因为初期的不确定性而调整方向。给自己至少3个月的适应期再做判断。同时注意身体健康，转型期容易忽视自我照顾。'
    },
    90: {
      stage: '90天复盘',
      stageLabel: '中期复盘',
      focus: '方向验证与成果评估',
      satisfaction: 8,
      regret: 2,
      execution: '已度过适应期，开始看到阶段性成果',
      achievements: [
        '完成了从0到1的突破，第一个里程碑达成',
        '建立了稳定的工作节奏和学习体系',
        '开始获得正向反馈，无论是技能提升还是外部认可'
      ],
      challenges: [
        '遇到了预期之外的困难，需要调整部分策略',
        '精力分配仍然紧张，需要更好的优先级管理',
        '部分原定目标进度滞后，需要重新评估可行性'
      ],
      biggestGain: '最大的收获是验证了方向的可行性，从"相信"变成了"看到"',
      biggestRegret: '后悔没有更早开始，白白浪费了几个月的犹豫时间',
      aiComparison: `与当初AI推演的${chosenUniverse || '成长宇宙'}对比：进展略好于预期。AI预测的3个月见效节点基本准确。突破宇宙预测的收入波动没有出现，说明渐进式策略有效降低了风险。后悔指数从预测的28降至实际的2，验证了"行动降低后悔"的规律。`,
      aiSuggestion: '90天是一个关键节点，建议做一次深度复盘。当前方向已初步验证，可以适当加大投入。同时建议开始规划下一个90天的目标，保持 momentum。注意积累可展示的成果，为长期发展建立信用。'
    },
    180: {
      stage: '180天复盘',
      stageLabel: '深度复盘',
      focus: '长期价值与人生方向评估',
      satisfaction: 9,
      regret: 1,
      execution: '已形成稳定的新常态，决策带来的改变开始深度影响人生轨迹',
      achievements: [
        '完成了关键转型，新方向已成为生活的重要组成部分',
        '收入或成长开始显现复利效应',
        '心态发生了根本性变化，对不确定性更加从容',
        '建立了新的社交圈和资源网络'
      ],
      challenges: [
        '面临新的瓶颈，需要下一阶段的突破',
        '工作与生活的平衡需要重新调整',
        '部分旧有关系因方向不同而疏远'
      ],
      biggestGain: '最大的收获是成为了一个不同的人——更勇敢、更坚韧、更知道自己要什么',
      biggestRegret: '唯一的遗憾是健康方面有所透支，需要引起重视',
      aiComparison: `与当初AI推演的${chosenUniverse || '成长宇宙'}对比：半年数据表明，AI推演的整体方向准确。成长宇宙"渐进式发展"的预测得到验证，幸福指数从预测的75实际达到85，超出预期。后悔指数从预测的28降至实际的1，远优于预期。AI案例库中"先验证后投入"的成功规律在实践中得到印证。当初最担心的"过渡期拖太长"并未发生，说明执行节奏把控得当。`,
      aiSuggestion: '半年是一个重要里程碑。建议：1）总结这半年的经验，形成自己的方法论；2）开始思考下一个阶段的战略方向；3）注意身体健康的恢复和维护；4）考虑是否需要调整目标，设定更大的挑战。当前路径正确，继续保持。'
    }
  }

  return reviewStages[dp] || reviewStages[30]
}

// ===== 我的决策档案 =====
export const generateMockArchive = () => {
  return {
    timeline: [
      {
        id: 1,
        date: '2026-01',
        decision: '是否跳槽到大厂',
        type: '职业发展',
        chosenUniverse: '安稳宇宙',
        chosenLabel: 'A',
        color: '#8a63ff',
        status: '已复盘',
        satisfaction: 7,
        regret: 3,
        outcome: '选择留在当前公司，获得了晋升',
        reviewCompleted: true,
        reviewDate: '2026-04',
        icon: '💼'
      },
      {
        id: 2,
        date: '2026-03',
        decision: '开始学习AI技术',
        type: '能力提升',
        chosenUniverse: '成长宇宙',
        chosenLabel: 'C',
        color: '#ff6b9d',
        status: '已复盘',
        satisfaction: 9,
        regret: 1,
        outcome: '坚持学习3个月，已能独立完成AI项目',
        reviewCompleted: true,
        reviewDate: '2026-06',
        icon: '📚'
      },
      {
        id: 3,
        date: '2026-06',
        decision: '辞职创业',
        type: '人生转折',
        chosenUniverse: '突破宇宙',
        chosenLabel: 'B',
        color: '#4a9eff',
        status: '进行中',
        satisfaction: null,
        regret: null,
        outcome: '正在执行中，已迈出第一步',
        reviewCompleted: false,
        reviewDate: null,
        icon: '🚀'
      },
      {
        id: 4,
        date: '2026-08',
        decision: '是否搬到新城市',
        type: '生活环境',
        chosenUniverse: '创新宇宙',
        chosenLabel: 'D',
        color: '#4ade80',
        status: '待决策',
        satisfaction: null,
        regret: null,
        outcome: '尚未执行，仍在考虑中',
        reviewCompleted: false,
        reviewDate: null,
        icon: '🏙️'
      }
    ],
    stats: {
      totalDecisions: 4,
      completedReviews: 2,
      avgSatisfaction: 8.0,
      avgRegret: 2.0,
      topType: '职业发展',
      universeDistribution: [
        { name: '安稳宇宙', count: 1, color: '#8a63ff' },
        { name: '突破宇宙', count: 1, color: '#4a9eff' },
        { name: '成长宇宙', count: 1, color: '#ff6b9d' },
        { name: '创新宇宙', count: 1, color: '#4ade80' }
      ]
    },
    insights: '从你的决策档案看，你倾向于在稳定中寻求突破。已完成复盘的2个决策平均满意度8.0、后悔度2.0，说明你的决策质量较高。建议继续保持"先验证后投入"的策略，同时适当提高行动力。'
  }
}

// ===== AI人生地图 =====
export const generateMockLifeMap = (userData) => {
  const career = userData?.career || '程序员'
  const decision = userData?.decision || '做出改变'

  return {
    nodes: [
      {
        id: 'start',
        label: career,
        type: 'origin',
        icon: '💻',
        x: 400,
        y: 50,
        status: 'current',
        description: `当前职业：${career}`,
        children: ['choice1', 'choice2']
      },
      {
        id: 'choice1',
        label: decision,
        type: 'decision',
        icon: '🚀',
        x: 200,
        y: 160,
        status: 'active',
        description: '执行心中想做的决定',
        probability: 65,
        children: ['path1a', 'path1b']
      },
      {
        id: 'choice2',
        label: '保持现状',
        type: 'decision',
        icon: '🔒',
        x: 600,
        y: 160,
        status: 'inactive',
        description: '延续当前轨迹',
        probability: 35,
        children: ['path2a', 'path2b']
      },
      {
        id: 'path1a',
        label: '初期困难',
        type: 'event',
        icon: '⚡',
        x: 100,
        y: 270,
        status: 'warning',
        description: '前3个月收入下降，压力增大',
        probability: 70,
        children: ['path1a1', 'path1a2']
      },
      {
        id: 'path1b',
        label: '快速突破',
        type: 'event',
        icon: '✨',
        x: 300,
        y: 270,
        status: 'success',
        description: '找到方向，进展超预期',
        probability: 30,
        children: ['path1b1']
      },
      {
        id: 'path2a',
        label: '稳步晋升',
        type: 'event',
        icon: '📈',
        x: 500,
        y: 270,
        status: 'normal',
        description: '按部就班，薪资稳步增长',
        probability: 60,
        children: ['path2a1']
      },
      {
        id: 'path2b',
        label: '遇到瓶颈',
        type: 'event',
        icon: '🧱',
        x: 700,
        y: 270,
        status: 'warning',
        description: '成长放缓，开始焦虑',
        probability: 40,
        children: ['path2b1']
      },
      {
        id: 'path1a1',
        label: '调整策略',
        type: 'event',
        icon: '🔄',
        x: 50,
        y: 380,
        status: 'normal',
        description: '及时调整方向，减少试错成本',
        probability: 55,
        children: ['path1a1_1']
      },
      {
        id: 'path1a2',
        label: '坚持原方向',
        type: 'event',
        icon: '💪',
        x: 180,
        y: 380,
        status: 'normal',
        description: '咬牙坚持，等待转机',
        probability: 45,
        children: ['path1a1_1']
      },
      {
        id: 'path1b1',
        label: '创业成功',
        type: 'milestone',
        icon: '🏆',
        x: 300,
        y: 380,
        status: 'success',
        description: '事业走上正轨，收入翻倍',
        probability: 80,
        children: ['final_success']
      },
      {
        id: 'path2a1',
        label: '管理岗位',
        type: 'milestone',
        icon: '👔',
        x: 500,
        y: 380,
        status: 'normal',
        description: '晋升管理层，收入提升',
        probability: 70,
        children: ['final_stable']
      },
      {
        id: 'path2b1',
        label: '考虑转型',
        type: 'event',
        icon: '🤔',
        x: 700,
        y: 380,
        status: 'warning',
        description: '重新思考职业方向',
        probability: 75,
        children: ['choice1']
      },
      {
        id: 'path1a1_1',
        label: 'AI产品经理',
        type: 'milestone',
        icon: '🎯',
        x: 120,
        y: 490,
        status: 'success',
        description: '转型成功，找到新方向',
        probability: 65,
        children: ['final_growth']
      },
      {
        id: 'final_success',
        label: '人生新阶段',
        type: 'destination',
        icon: '🌟',
        x: 300,
        y: 600,
        status: 'success',
        description: '实现财务自由，追求更高目标',
        children: []
      },
      {
        id: 'final_stable',
        label: '安稳人生',
        type: 'destination',
        icon: '🏡',
        x: 500,
        y: 600,
        status: 'normal',
        description: '稳定舒适，家庭幸福',
        children: []
      },
      {
        id: 'final_growth',
        label: '持续成长',
        type: 'destination',
        icon: '🌱',
        x: 120,
        y: 600,
        status: 'success',
        description: '不断进化，人生充满可能',
        children: []
      }
    ],
    paths: [
      { from: 'start', to: 'choice1' },
      { from: 'start', to: 'choice2' },
      { from: 'choice1', to: 'path1a' },
      { from: 'choice1', to: 'path1b' },
      { from: 'choice2', to: 'path2a' },
      { from: 'choice2', to: 'path2b' },
      { from: 'path1a', to: 'path1a1' },
      { from: 'path1a', to: 'path1a2' },
      { from: 'path1b', to: 'path1b1' },
      { from: 'path2a', to: 'path2a1' },
      { from: 'path2b', to: 'path2b1' },
      { from: 'path1a1', to: 'path1a1_1' },
      { from: 'path1a2', to: 'path1a1_1' },
      { from: 'path1b1', to: 'final_success' },
      { from: 'path2a1', to: 'final_stable' },
      { from: 'path2b1', to: 'choice1' },
      { from: 'path1a1_1', to: 'final_growth' }
    ],
    legend: [
      { type: 'origin', label: '起点', color: '#8a63ff' },
      { type: 'decision', label: '决策点', color: '#4a9eff' },
      { type: 'event', label: '事件节点', color: '#ffa500' },
      { type: 'milestone', label: '里程碑', color: '#4ade80' },
      { type: 'destination', label: '终点', color: '#ff6b9d' }
    ],
    summary: '人生地图展示了从当前状态出发的多种可能路径。每条路径都有概率分布，没有绝对的对错。关键是在每个节点做出当时最优的选择，并在执行中持续调整。地图不是用来预测未来，而是帮助你理解：当下的每个选择，都在塑造不同的人生终点。'
  }
}

// ===== AI决策体检 =====
export const generateMockDecisionCheckup = (userData) => {
  const age = Number(userData?.age) || 30
  const savings = Number(userData?.savings) || 0
  const income = Number(userData?.income) || 10000

  // 基础分数计算
  const riskTolerance = Math.min(90, 40 + Math.floor(savings / 20000) + Math.max(0, 35 - age))
  const execution = Math.min(85, 50 + Math.floor(income / 1000))
  const longTermism = Math.min(80, 45 + Math.floor((savings / 10000)))
  const learningAbility = Math.min(88, 55 + Math.max(0, 30 - age) * 2)
  const innovationTendency = Math.min(85, 50 + Math.floor(Math.random() * 30) + 10)
  const growthDesire = Math.min(92, 60 + Math.floor(Math.random() * 30))

  const scores = {
    riskTolerance,
    execution,
    longTermism,
    learningAbility,
    innovationTendency,
    growthDesire
  }

  const dimensions = [
    { name: '风险承受能力', key: 'riskTolerance', score: riskTolerance, max: 100,
      description: '面对不确定性时的心理承受力和财务缓冲能力',
      analysis: savings >= 100000 ? '财务缓冲充足，具备较强的抗风险能力' : '财务缓冲有限，建议增加储蓄后再做高风险决策' },
    { name: '执行力', key: 'execution', score: execution, max: 100,
      description: '将决策转化为行动并坚持执行的能力',
      analysis: '执行力处于中上水平，一旦做出决定通常能够付诸行动' },
    { name: '长期主义', key: 'longTermism', score: longTermism, max: 100,
      description: '愿意为长期回报牺牲短期利益的倾向',
      analysis: longTermism >= 65 ? '具备长期思维，能延迟满足' : '偏短期导向，建议培养长期视角' },
    { name: '学习能力', key: 'learningAbility', score: learningAbility, max: 100,
      description: '快速掌握新知识和适应新环境的能力',
      analysis: '学习能力较强，年龄优势明显，适合转型和跨界' },
    { name: '创新倾向', key: 'innovationTendency', score: innovationTendency, max: 100,
      description: '偏好尝试新事物和走差异化路线的程度',
      analysis: innovationTendency >= 65 ? '创新意愿强，不满足于循规蹈矩' : '偏保守，更倾向于成熟路径' },
    { name: '成长意愿', key: 'growthDesire', score: growthDesire, max: 100,
      description: '对自我提升和突破现状的渴望程度',
      analysis: '成长意愿强烈，这是最重要的内在驱动力' }
  ]

  // 决策人格判定
  const max = Math.max(scores.riskTolerance, scores.execution, scores.longTermism, scores.learningAbility, scores.innovationTendency, scores.growthDesire)
  let personality, personalityDesc, personalityIcon, personalityColor

  if (scores.innovationTendency >= 70 && scores.riskTolerance >= 60) {
    personality = '探索型'
    personalityIcon = '🧭'
    personalityColor = '#4a9eff'
    personalityDesc = '你天生具有探索精神，喜欢走少有人走的路。创新倾向和风险承受能力都较强，适合在不确定中寻找机会。需要注意的是，探索需要与执行力平衡，避免"探索过多、落地太少"。'
  } else if (scores.riskTolerance >= 65 && scores.execution >= 60) {
    personality = '创业型'
    personalityIcon = '🚀'
    personalityColor = '#ff6b9d'
    personalityDesc = '你具备创业者的核心特质：敢于承担风险，同时有较强的执行力。适合从0到1的创造过程。建议加强长期主义思维，避免因短期挫折而放弃。'
  } else if (scores.growthDesire >= 70 && scores.learningAbility >= 65) {
    personality = '成长型'
    personalityIcon = '🌱'
    personalityColor = '#4ade80'
    personalityDesc = '你是一个持续成长者。学习能力和成长意愿都很强，适合在专业领域深耕或渐进式转型。你的优势是可持续性，注意不要因为过于求稳而错过窗口期。'
  } else {
    personality = '稳健型'
    personalityIcon = '🛡️'
    personalityColor = '#8a63ff'
    personalityDesc = '你是一个稳健的决策者。重视安全和可控，善于在确定的环境中发挥实力。建议在保持稳健的同时，适当拓展舒适区，给自己一些"可控的冒险"。'
  }

  // 综合评分
  const overallScore = Math.round((scores.riskTolerance + scores.execution + scores.longTermism + scores.learningAbility + scores.innovationTendency + scores.growthDesire) / 6)

  return {
    dimensions,
    scores,
    personality: {
      label: personality,
      icon: personalityIcon,
      color: personalityColor,
      description: personalityDesc
    },
    overallScore,
    overallLevel: overallScore >= 75 ? '优秀' : overallScore >= 60 ? '良好' : '待提升',
    strengths: dimensions.filter(d => d.score >= 70).map(d => d.name),
    weaknesses: dimensions.filter(d => d.score < 60).map(d => d.name),
    aiAdvice: `基于决策体检结果，你的决策人格是"${personality}"。综合决策能力评分${overallScore}分（${overallScore >= 75 ? '优秀' : overallScore >= 60 ? '良好' : '待提升'}）。${dimensions.filter(d => d.score >= 70).length > 0 ? `优势维度：${dimensions.filter(d => d.score >= 70).map(d => d.name).join('、')}。` : ''}${dimensions.filter(d => d.score < 60).length > 0 ? `待提升维度：${dimensions.filter(d => d.score < 60).map(d => d.name).join('、')}。` : ''}建议：发挥优势维度，同时有意识地补齐短板。决策不是单维度的比拼，而是六维能力的综合体现。`,
    recommendations: [
      { icon: '🎯', title: '发挥优势', text: `你的${dimensions.filter(d => d.score >= 70).map(d => d.name).slice(0, 2).join('和')}是核心优势，在决策时充分利用这些能力。` },
      { icon: '📈', title: '补齐短板', text: dimensions.filter(d => d.score < 60).length > 0 ? `${dimensions.filter(d => d.score < 60).map(d => d.name).join('、')}相对较弱，建议通过刻意练习提升。` : '各维度较为均衡，继续保持。' },
      { icon: '🧩', title: '匹配宇宙', text: `作为"${personality}"，最适合你的是${personality === '探索型' ? '创新宇宙' : personality === '创业型' ? '突破宇宙' : personality === '成长型' ? '成长宇宙' : '安稳宇宙'}。` },
      { icon: '🔄', title: '定期体检', text: '建议每3个月做一次决策体检，追踪决策能力的成长轨迹。' }
    ]
  }
}

// ===== 数据驾驶舱 Mock 数据 =====
export const generateMockDashboard = () => {
  // 核心指标
  const stats = [
    { id: 'simulations', label: '总模拟人数', value: 12847, unit: '人', icon: '🌌', color: '#8a63ff', trend: '+12.3%', trendUp: true },
    { id: 'decisions', label: '累计决策次数', value: 38592, unit: '次', icon: '🎯', color: '#4a9eff', trend: '+8.7%', trendUp: true },
    { id: 'aiAnalyses', label: 'AI分析次数', value: 51634, unit: '次', icon: '🤖', color: '#00e5ff', trend: '+15.2%', trendUp: true },
    { id: 'predictions', label: '未来预测次数', value: 41208, unit: '次', icon: '🔮', color: '#ff6b9d', trend: '+6.4%', trendUp: true },
    { id: 'reviews', label: '决策复盘次数', value: 9326, unit: '次', icon: '📝', color: '#4ade80', trend: '+22.1%', trendUp: true }
  ]

  // 折线图：近12个月用户增长趋势
  const lineChart = {
    title: '用户增长趋势',
    subtitle: '近12个月模拟用户数变化',
    categories: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
    series: [
      {
        name: '模拟用户',
        data: [420, 580, 750, 920, 1180, 1450, 1820, 2240, 2780, 3350, 3980, 4520],
        color: '#8a63ff'
      },
      {
        name: '复盘用户',
        data: [120, 180, 250, 340, 460, 590, 780, 980, 1240, 1520, 1850, 2180],
        color: '#4ade80'
      }
    ]
  }

  // 柱状图：各功能模块使用量
  const barChart = {
    title: '功能模块使用量',
    subtitle: '各核心功能调用次数统计',
    categories: ['宇宙推演', '决策树', '风险预警', '未来来信', '案例库', '后悔指数', '价值雷达', '未来采访'],
    series: [
      {
        name: '使用次数',
        data: [12847, 9823, 8456, 11234, 7689, 6532, 8945, 5678],
        colors: ['#8a63ff', '#6366f1', '#4a9eff', '#00e5ff', '#ff6b9d', '#ffa500', '#4ade80', '#a855f7']
      }
    ]
  }

  // 环形图：用户决策类型分布
  const ringChart = {
    title: '决策类型分布',
    subtitle: '用户最常做的决策类型占比',
    data: [
      { name: '职业转型', value: 3280, color: '#8a63ff' },
      { name: '城市迁移', value: 2150, color: '#4a9eff' },
      { name: '创业冒险', value: 1820, color: '#00e5ff' },
      { name: '学习深造', value: 2640, color: '#4ade80' },
      { name: '感情决策', value: 1430, color: '#ff6b9d' },
      { name: '其他', value: 1527, color: '#ffa500' }
    ]
  }

  // 实时活动流
  const activityFeed = [
    { id: 1, user: '用户A***8', action: '完成了平行宇宙模拟', decision: '辞职创业做独立开发者', time: '刚刚', icon: '🌌' },
    { id: 2, user: '用户B***3', action: '提交了决策复盘', decision: '考研深造转行AI', time: '1分钟前', icon: '📝' },
    { id: 3, user: '用户C***6', action: '查看了AI人生地图', decision: '搬到一线城市', time: '3分钟前', icon: '🗺️' },
    { id: 4, user: '用户D***1', action: '完成了决策体检', decision: '从大厂跳槽到创业公司', time: '5分钟前', icon: '🩺' },
    { id: 5, user: '用户E***9', action: '生成了PDF报告', decision: '辞职gap一年环游中国', time: '8分钟前', icon: '📄' },
    { id: 6, user: '用户F***2', action: '查看了风险预警', decision: '考研深造转行AI', time: '12分钟前', icon: '⚠️' },
    { id: 7, user: '用户G***5', action: '阅读了未来来信', decision: '辞职创业做独立开发者', time: '15分钟前', icon: '✉️' }
  ]

  // 平行宇宙选择偏好
  const universePreference = [
    { name: '安稳宇宙', percentage: 28, color: '#8a63ff', count: 3597 },
    { name: '突破宇宙', percentage: 35, color: '#ff6b9d', count: 4496 },
    { name: '成长宇宙', percentage: 24, color: '#4a9eff', count: 3083 },
    { name: '创新宇宙', percentage: 13, color: '#4ade80', count: 1671 }
  ]

  return {
    stats,
    lineChart,
    barChart,
    ringChart,
    activityFeed,
    universePreference,
    lastUpdated: new Date().toLocaleString('zh-CN')
  }
}
