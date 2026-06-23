<template>
  <div class="result-page">
    <!-- 导航栏 -->
    <nav class="navbar">
      <div class="container nav-inner">
        <div class="logo" @click="$router.push('/')">
          <span class="logo-icon">🌌</span>
          <span class="logo-text">平行宇宙实验室</span>
        </div>
        <div class="nav-actions">
          <button class="btn btn-secondary nav-btn" @click="$router.push('/create')">重新模拟</button>
          <button class="btn btn-secondary nav-btn" @click="saveDecision" :disabled="decisionSaved">
            <span v-if="!decisionSaved">💾 保存决策</span>
            <span v-else>✅ 已保存</span>
          </button>
          <button class="btn btn-secondary nav-btn" @click="$router.push('/review')">📝 决策复盘</button>
          <button class="btn btn-secondary nav-btn" @click="exportPoster" :disabled="exporting">
            <span v-if="!exporting">📷 海报</span>
            <span v-else>导出中...</span>
          </button>
          <button class="btn btn-primary nav-btn" @click="exportPDF" :disabled="exportingPDF">
            <span v-if="!exportingPDF">📄 PDF报告</span>
            <span v-else>生成中...</span>
          </button>
        </div>
      </div>
    </nav>

    <!-- 空状态 -->
    <div v-if="!result" class="empty-result">
      <div class="glass-card empty-card">
        <div class="empty-icon">🌌</div>
        <h2>暂无模拟结果</h2>
        <p>请先创建一次平行宇宙模拟</p>
        <router-link to="/create" class="btn btn-primary">去创建</router-link>
      </div>
    </div>

    <!-- 结果内容 -->
    <div v-else class="result-content">
      <!-- 决策概览 -->
      <section class="decision-section fade-in-up">
        <div class="container">
          <div class="glass-card decision-card">
            <div class="decision-label">你的决定</div>
            <h1 class="decision-text">{{ result.decision }}</h1>
            <div class="decision-meta">
              <span class="meta-chip">{{ result.age }}岁</span>
              <span class="meta-chip">{{ result.education }}</span>
              <span class="meta-chip">{{ result.city }}</span>
              <span class="meta-chip">{{ result.career }}</span>
              <span class="meta-chip">月入 {{ formatMoney(result.income) }}</span>
              <span class="meta-chip">存款 {{ formatMoney(result.savings) }}</span>
            </div>
          </div>
        </div>
      </section>

      <!-- 海报内容区（用于导出） -->
      <div class="poster-area" ref="posterArea">
        <!-- AI 总结 -->
        <section class="summary-section">
          <div class="container">
            <div class="glass-card summary-card fade-in-up">
              <div class="summary-header">
                <span class="summary-icon">🤖</span>
                <h2 class="summary-title">AI 综合分析</h2>
              </div>
              <p class="summary-text">{{ result.summary }}</p>
            </div>
          </div>
        </section>

        <!-- 四宇宙卡片 -->
        <section class="universes-section">
          <div class="container">
            <h2 class="section-title fade-in-up">四重平行宇宙</h2>
            <p class="section-subtitle fade-in-up">点击卡片查看详细推演</p>
            <div class="universes-grid">
              <UniverseCard
                v-for="(u, i) in result.universes"
                :key="i"
                :universe="u"
                :is-best="i === bestIndex"
                class="fade-in-up"
                :style="{ animationDelay: `${i * 0.1}s` }"
              />
            </div>
          </div>
        </section>

        <!-- 雷达图对比 -->
        <section class="chart-section">
          <div class="container">
            <div class="glass-card chart-card fade-in-up">
              <h3 class="chart-title">多维指标对比</h3>
              <div ref="radarChartRef" class="chart-container"></div>
            </div>
          </div>
        </section>

        <!-- 收入趋势图 -->
        <section class="chart-section">
          <div class="container">
            <div class="glass-card chart-card fade-in-up">
              <h3 class="chart-title">收入变化趋势</h3>
              <div ref="lineChartRef" class="chart-container"></div>
            </div>
          </div>
        </section>

        <!-- 综合评分对比 -->
        <section class="chart-section">
          <div class="container">
            <div class="glass-card chart-card fade-in-up">
              <h3 class="chart-title">综合评分排名</h3>
              <div ref="barChartRef" class="chart-container"></div>
            </div>
          </div>
        </section>

        <!-- 人生决策树 -->
        <section class="chart-section" v-if="treeData">
          <div class="container">
            <div class="glass-card chart-card fade-in-up">
              <DecisionTree :treeData="treeData" />
            </div>
          </div>
        </section>

        <!-- 人生风险预警 -->
        <section class="chart-section" v-if="riskData">
          <div class="container">
            <div class="glass-card chart-card fade-in-up">
              <RiskWarning :data="riskData" />
            </div>
          </div>
        </section>

        <!-- AI未来来信 -->
        <section class="chart-section">
          <div class="container">
            <div class="glass-card chart-card fade-in-up">
              <div class="letter-section-header">
                <h3 class="chart-title">✉️ AI未来来信</h3>
                <p class="letter-subtitle">来自未来的你，写给现在的你</p>
              </div>
              <div class="letter-tabs">
                <button
                  v-for="y in [3, 5, 10]"
                  :key="y"
                  class="letter-tab"
                  :class="{ active: letterYear === y }"
                  @click="loadFutureLetter(y)"
                >
                  {{ y }}年后
                </button>
              </div>
              <FutureLetter :letter="letterData" :loading="letterLoading" />
            </div>
          </div>
        </section>

        <!-- 后悔指数模型 -->
        <section class="chart-section" v-if="regretData">
          <div class="container">
            <div class="glass-card chart-card fade-in-up">
              <div class="regret-header">
                <h3 class="chart-title">📊 后悔指数模型</h3>
                <p class="regret-subtitle">每个宇宙的潜在后悔程度与原因分析</p>
              </div>

              <!-- 后悔指数卡片 -->
              <div class="regret-grid">
                <div
                  class="regret-card"
                  v-for="(u, i) in regretData.universes"
                  :key="i"
                  :style="{ borderTopColor: u.color }"
                >
                  <div class="regret-card-header">
                    <span class="regret-badge" :style="{ background: u.color }">{{ u.label }}</span>
                    <span class="regret-title">{{ u.title }}</span>
                    <span class="regret-level" :style="{ color: u.levelColor }">{{ u.level }}</span>
                  </div>
                  <div class="regret-score-area">
                    <div class="regret-score-bar-wrapper">
                      <div
                        class="regret-score-bar"
                        :style="{ width: u.regretIndex + '%', background: `linear-gradient(90deg, ${u.color}, ${u.color}aa)` }"
                      ></div>
                    </div>
                    <div class="regret-score-value" :style="{ color: u.color }">{{ u.regretIndex }}</div>
                  </div>
                  <div class="regret-reasons">
                    <div class="regret-reason-item" v-for="(r, j) in u.reasons" :key="j">
                      <span class="regret-reason-time">{{ r.time }}</span>
                      <span class="regret-reason-text">{{ r.reason }}</span>
                    </div>
                  </div>
                  <div class="regret-top">
                    <span class="regret-top-label">⚠️ {{ u.topRegret }}</span>
                  </div>
                  <div class="regret-mitigation">
                    <span class="mitigation-icon">🛡️</span>
                    <span class="mitigation-text">{{ u.mitigation }}</span>
                  </div>
                </div>
              </div>

              <!-- 总结 -->
              <div class="regret-summary">
                <div class="regret-summary-icon">🤖</div>
                <div class="regret-summary-content">
                  <p class="regret-summary-text">{{ regretData.summary }}</p>
                  <p class="regret-recommendation">{{ regretData.recommendation }}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- 人生价值雷达 -->
        <section class="chart-section" v-if="radarData">
          <div class="container">
            <div class="glass-card chart-card fade-in-up">
              <ValueRadar :data="radarData" />
            </div>
          </div>
        </section>

        <!-- AI真实案例库 -->
        <section class="chart-section" v-if="caseLibraryData">
          <div class="container">
            <div class="glass-card chart-card fade-in-up">
              <CaseLibrary :data="caseLibraryData" />
            </div>
          </div>
        </section>

        <!-- AI未来采访 -->
        <section class="chart-section">
          <div class="container">
            <div class="glass-card chart-card fade-in-up">
              <FutureInterview
                :interview="interviewData"
                :year="interviewYear"
                :loading="interviewLoading"
                @change="loadFutureInterview"
              />
            </div>
          </div>
        </section>
      </div>

      <!-- 底部操作 -->
      <section class="bottom-actions">
        <div class="container">
          <div class="action-buttons">
            <router-link to="/create" class="btn btn-primary action-btn">🔄 再来一次</router-link>
            <button class="btn btn-secondary action-btn" @click="exportPoster" :disabled="exporting">
              📷 导出海报
            </button>
            <button class="btn btn-secondary action-btn" @click="exportPDF" :disabled="exportingPDF">
              📄 导出PDF报告
            </button>
            <router-link to="/" class="btn btn-secondary action-btn">返回首页</router-link>
          </div>
          <p class="disclaimer">⚠️ 以上内容由 AI 生成，仅供娱乐参考，人生没有标准答案</p>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick, computed } from 'vue'
import { useRoute } from 'vue-router'
import * as echarts from 'echarts'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
import UniverseCard from '../components/UniverseCard.vue'
import DecisionTree from '../components/DecisionTree.vue'
import RiskWarning from '../components/RiskWarning.vue'
import FutureLetter from '../components/FutureLetter.vue'
import CaseLibrary from '../components/CaseLibrary.vue'
import ValueRadar from '../components/ValueRadar.vue'
import FutureInterview from '../components/FutureInterview.vue'
import { getHistoryDetail, getDecisionTree, getRiskWarning, getFutureLetter, getCaseLibrary, getRegretIndex, getValueRadar, getFutureInterview } from '../api'

const route = useRoute()
const result = ref(null)
const exporting = ref(false)
const exportingPDF = ref(false)
const decisionSaved = ref(false)

// 保存决策
const saveDecision = () => {
  if (!result.value) return
  const saved = JSON.parse(localStorage.getItem('savedDecisions') || '[]')
  saved.push({
    ...result.value,
    savedAt: new Date().toISOString()
  })
  localStorage.setItem('savedDecisions', JSON.stringify(saved))
  decisionSaved.value = true
}

// 新功能数据
const treeData = ref(null)
const riskData = ref(null)
const letterData = ref(null)
const letterLoading = ref(false)
const letterYear = ref(3)

// 决赛版新功能数据
const caseLibraryData = ref(null)
const regretData = ref(null)
const radarData = ref(null)
const interviewData = ref(null)
const interviewLoading = ref(false)
const interviewYear = ref(3)

const radarChartRef = ref(null)
const lineChartRef = ref(null)
const barChartRef = ref(null)
const posterArea = ref(null)

let radarChart = null
let lineChart = null
let barChart = null

const bestIndex = computed(() => {
  if (!result.value || !result.value.universes) return 0
  let maxScore = -1
  let idx = 0
  result.value.universes.forEach((u, i) => {
    const score = (u.happiness + u.growth + (100 - u.risk)) / 3
    if (score > maxScore) {
      maxScore = score
      idx = i
    }
  })
  return idx
})

const formatMoney = (val) => {
  if (!val && val !== 0) return '未知'
  if (val >= 10000) return (val / 10000).toFixed(1) + '万'
  return val.toString()
}

const initCharts = () => {
  if (!result.value || !result.value.universes) return

  const universes = result.value.universes
  const colors = universes.map(u => u.theme?.color || '#8a63ff')

  // 雷达图
  if (radarChartRef.value) {
    radarChart = echarts.init(radarChartRef.value)
    radarChart.setOption({
      backgroundColor: 'transparent',
      tooltip: {
        backgroundColor: 'rgba(20, 20, 45, 0.9)',
        borderColor: 'rgba(138, 99, 255, 0.3)',
        textStyle: { color: '#e8e8f5' }
      },
      legend: {
        data: universes.map(u => `${u.label}·${u.title}`),
        bottom: 0,
        textStyle: { color: '#9999bb' },
        itemWidth: 12,
        itemHeight: 12
      },
      radar: {
        indicator: [
          { name: '收入', max: 100 },
          { name: '幸福', max: 100 },
          { name: '成长', max: 100 },
          { name: '安全', max: 100 },
          { name: '稳定', max: 100 }
        ],
        center: ['50%', '48%'],
        radius: '65%',
        axisName: { color: '#9999bb', fontSize: 13 },
        splitLine: { lineStyle: { color: 'rgba(138, 99, 255, 0.15)' } },
        splitArea: { areaStyle: { color: ['rgba(138, 99, 255, 0.03)', 'rgba(138, 99, 255, 0.06)'] } },
        axisLine: { lineStyle: { color: 'rgba(138, 99, 255, 0.2)' } }
      },
      series: [{
        type: 'radar',
        data: universes.map((u, i) => ({
          value: [
            Math.min(Math.abs(parseInt(u.incomeChange)) + 30, 100),
            u.happiness,
            u.growth,
            100 - u.risk,
            100 - u.risk * 0.5
          ],
          name: `${u.label}·${u.title}`,
          itemStyle: { color: colors[i] },
          lineStyle: { color: colors[i], width: 2 },
          areaStyle: { color: colors[i], opacity: 0.15 }
        }))
      }]
    })
  }

  // 折线图 - 收入趋势
  if (lineChartRef.value) {
    lineChart = echarts.init(lineChartRef.value)
    const years = ['现在', '+1年', '+3年', '+5年', '+10年']
    lineChart.setOption({
      backgroundColor: 'transparent',
      tooltip: {
        trigger: 'axis',
        backgroundColor: 'rgba(20, 20, 45, 0.9)',
        borderColor: 'rgba(138, 99, 255, 0.3)',
        textStyle: { color: '#e8e8f5' }
      },
      legend: {
        data: universes.map(u => `${u.label}·${u.title}`),
        bottom: 0,
        textStyle: { color: '#9999bb' }
      },
      grid: { left: '3%', right: '4%', bottom: '15%', top: '10%', containLabel: true },
      xAxis: {
        type: 'category',
        data: years,
        axisLine: { lineStyle: { color: 'rgba(138, 99, 255, 0.2)' } },
        axisLabel: { color: '#9999bb' }
      },
      yAxis: {
        type: 'value',
        name: '月收入(元)',
        axisLine: { lineStyle: { color: 'rgba(138, 99, 255, 0.2)' } },
        axisLabel: { color: '#9999bb', formatter: (v) => v >= 10000 ? (v/10000) + '万' : v },
        splitLine: { lineStyle: { color: 'rgba(138, 99, 255, 0.1)' } }
      },
      series: universes.map((u, i) => ({
        name: `${u.label}·${u.title}`,
        type: 'line',
        smooth: true,
        symbol: 'circle',
        symbolSize: 8,
        data: u.incomeTrend || [result.value.income, result.value.income * 1.1, result.value.income * 1.3, result.value.income * 1.5, result.value.income * 2],
        itemStyle: { color: colors[i] },
        lineStyle: { color: colors[i], width: 3 },
        areaStyle: { color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: colors[i] + '40' },
          { offset: 1, color: colors[i] + '00' }
        ])}
      }))
    })
  }

  // 柱状图 - 综合评分
  if (barChartRef.value) {
    barChart = echarts.init(barChartRef.value)
    const scores = universes.map(u => Math.round((u.happiness + u.growth + (100 - u.risk)) / 3))
    barChart.setOption({
      backgroundColor: 'transparent',
      tooltip: {
        backgroundColor: 'rgba(20, 20, 45, 0.9)',
        borderColor: 'rgba(138, 99, 255, 0.3)',
        textStyle: { color: '#e8e8f5' }
      },
      grid: { left: '3%', right: '4%', bottom: '10%', top: '15%', containLabel: true },
      xAxis: {
        type: 'category',
        data: universes.map(u => `${u.label}·${u.title}`),
        axisLine: { lineStyle: { color: 'rgba(138, 99, 255, 0.2)' } },
        axisLabel: { color: '#9999bb', fontSize: 12 }
      },
      yAxis: {
        type: 'value',
        max: 100,
        axisLine: { lineStyle: { color: 'rgba(138, 99, 255, 0.2)' } },
        axisLabel: { color: '#9999bb' },
        splitLine: { lineStyle: { color: 'rgba(138, 99, 255, 0.1)' } }
      },
      series: [{
        type: 'bar',
        data: scores.map((s, i) => ({
          value: s,
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: colors[i] },
              { offset: 1, color: colors[i] + '60' }
            ]),
            borderRadius: [8, 8, 0, 0]
          }
        })),
        barWidth: '40%',
        label: {
          show: true,
          position: 'top',
          color: '#e8e8f5',
          fontSize: 16,
          fontWeight: 'bold'
        }
      }]
    })
  }
}

const exportPoster = async () => {
  if (!posterArea.value) return
  exporting.value = true
  try {
    const canvas = await html2canvas(posterArea.value, {
      backgroundColor: '#0a0a1a',
      scale: 2,
      useCORS: true,
      logging: false
    })
    const link = document.createElement('a')
    link.download = `平行宇宙_${Date.now()}.png`
    link.href = canvas.toDataURL('image/png')
    link.click()
  } catch (err) {
    alert('导出失败：' + (err.message || '未知错误'))
  } finally {
    exporting.value = false
  }
}

// PDF报告导出
const exportPDF = async () => {
  if (!posterArea.value) return
  exportingPDF.value = true
  try {
    const canvas = await html2canvas(posterArea.value, {
      backgroundColor: '#0a0a1a',
      scale: 2,
      useCORS: true,
      logging: false
    })
    const imgData = canvas.toDataURL('image/png')
    const imgWidth = canvas.width
    const imgHeight = canvas.height

    const pdf = new jsPDF('p', 'mm', 'a4')
    const pdfWidth = pdf.internal.pageSize.getWidth()
    const pdfHeight = pdf.internal.pageSize.getHeight()
    const ratio = imgWidth / imgHeight
    let renderWidth = pdfWidth - 20
    let renderHeight = renderWidth / ratio
    let position = 10

    // 分页处理
    if (renderHeight < pdfHeight - 20) {
      pdf.addImage(imgData, 'PNG', 10, position, renderWidth, renderHeight)
    } else {
      let remainingHeight = imgHeight
      let cropTop = 0
      const pageContentHeight = Math.floor((pdfHeight - 20) * (imgWidth / renderWidth))

      while (remainingHeight > 0) {
        const tempCanvas = document.createElement('canvas')
        tempCanvas.width = imgWidth
        tempCanvas.height = Math.min(pageContentHeight, remainingHeight)
        const tempCtx = tempCanvas.getContext('2d')
        tempCtx.fillStyle = '#0a0a1a'
        tempCtx.fillRect(0, 0, tempCanvas.width, tempCanvas.height)
        tempCtx.drawImage(canvas, 0, cropTop, imgWidth, tempCanvas.height, 0, 0, imgWidth, tempCanvas.height)

        const tempImgData = tempCanvas.toDataURL('image/png')
        const tempHeight = (tempCanvas.height * renderWidth) / imgWidth

        if (cropTop > 0) pdf.addPage()
        pdf.addImage(tempImgData, 'PNG', 10, 10, renderWidth, tempHeight)

        cropTop += pageContentHeight
        remainingHeight -= pageContentHeight
      }
    }

    pdf.save(`平行宇宙报告_${Date.now()}.pdf`)
  } catch (err) {
    alert('PDF导出失败：' + (err.message || '未知错误'))
  } finally {
    exportingPDF.value = false
  }
}

// 加载决策树
const loadDecisionTree = async () => {
  if (!result.value) return
  try {
    const res = await getDecisionTree(result.value)
    treeData.value = res.data
  } catch (err) {
    console.warn('决策树加载失败')
  }
}

// 加载风险预警
const loadRiskWarning = async () => {
  if (!result.value) return
  try {
    const res = await getRiskWarning(result.value)
    riskData.value = res.data
  } catch (err) {
    console.warn('风险预警加载失败')
  }
}

// 加载未来来信
const loadFutureLetter = async (years) => {
  if (!result.value) return
  letterLoading.value = true
  letterYear.value = years
  try {
    const res = await getFutureLetter(result.value, years)
    letterData.value = res.data
  } catch (err) {
    console.warn('未来来信加载失败')
  } finally {
    letterLoading.value = false
  }
}

// 加载案例库
const loadCaseLibrary = async () => {
  if (!result.value) return
  try {
    const res = await getCaseLibrary(result.value)
    caseLibraryData.value = res.data
  } catch (err) {
    console.warn('案例库加载失败')
  }
}

// 加载后悔指数
const loadRegretIndex = async () => {
  if (!result.value) return
  try {
    const res = await getRegretIndex(result.value)
    regretData.value = res.data
  } catch (err) {
    console.warn('后悔指数加载失败')
  }
}

// 加载价值雷达
const loadValueRadar = async () => {
  if (!result.value) return
  try {
    const res = await getValueRadar(result.value)
    radarData.value = res.data
  } catch (err) {
    console.warn('价值雷达加载失败')
  }
}

// 加载未来采访
const loadFutureInterview = async (years) => {
  if (!result.value) return
  interviewLoading.value = true
  interviewYear.value = years
  try {
    const res = await getFutureInterview(result.value, years)
    interviewData.value = res.data
  } catch (err) {
    console.warn('未来采访加载失败')
  } finally {
    interviewLoading.value = false
  }
}

const loadResult = async () => {
  // 从 sessionStorage 获取结果
  const stored = sessionStorage.getItem('simulationResult')
  if (stored) {
    result.value = JSON.parse(stored)
    await nextTick()
    initCharts()
    loadDecisionTree()
    loadRiskWarning()
    loadFutureLetter(3)
    loadCaseLibrary()
    loadRegretIndex()
    loadValueRadar()
    loadFutureInterview(3)
    return
  }

  // 如果有历史 ID，从后端获取
  const historyId = route.params.id
  if (historyId) {
    try {
      const res = await getHistoryDetail(historyId)
      result.value = res.data
      await nextTick()
      initCharts()
      loadDecisionTree()
      loadRiskWarning()
      loadFutureLetter(3)
      loadCaseLibrary()
      loadRegretIndex()
      loadValueRadar()
      loadFutureInterview(3)
    } catch (err) {
      result.value = null
    }
  }
}

const handleResize = () => {
  radarChart?.resize()
  lineChart?.resize()
  barChart?.resize()
}

onMounted(() => {
  loadResult()
  window.addEventListener('resize', handleResize)
})
</script>

<style scoped>
.result-page {
  min-height: 100vh;
  padding-bottom: 40px;
}

/* 空状态 */
.empty-result {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 70vh;
}

.empty-card {
  padding: 60px 40px;
  text-align: center;
}

.empty-icon {
  font-size: 56px;
  margin-bottom: 16px;
}

.empty-card h2 {
  font-size: 22px;
  margin-bottom: 8px;
}

.empty-card p {
  color: var(--text-secondary);
  margin-bottom: 24px;
}

/* 决策概览 */
.decision-section {
  padding: 48px 0 24px;
}

.decision-card {
  padding: 36px 32px;
  text-align: center;
}

.decision-label {
  display: inline-flex;
  align-items: center;
  padding: 5px 16px;
  background: rgba(138, 99, 255, 0.12);
  border: 1px solid var(--border-glow);
  border-radius: var(--radius-pill);
  font-size: 13px;
  font-weight: 500;
  color: var(--accent-purple);
  margin-bottom: 18px;
  letter-spacing: 0.3px;
}

.decision-text {
  font-size: 30px;
  font-weight: 700;
  line-height: 1.35;
  margin-bottom: 22px;
  background: var(--gradient-nebula);
  background-size: 200% auto;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: gradient-shift 5s ease infinite;
  letter-spacing: -0.3px;
}

.decision-meta {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 10px;
}

.meta-chip {
  padding: 6px 16px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid var(--border-glow);
  border-radius: var(--radius-pill);
  font-size: 13px;
  color: var(--text-secondary);
  transition: all 0.3s ease;
}

.meta-chip:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: var(--border-glow-strong);
}

/* AI 总结 */
.summary-section {
  padding: 24px 0;
}

.summary-card {
  padding: 30px 34px;
}

.summary-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 16px;
}

.summary-icon {
  font-size: 24px;
  filter: drop-shadow(0 0 8px rgba(138, 99, 255, 0.3));
}

.summary-title {
  font-size: 20px;
  font-weight: 700;
  letter-spacing: 0.3px;
}

.summary-text {
  font-size: 15px;
  line-height: 1.8;
  color: var(--text-primary);
}

/* 四宇宙 */
.universes-section {
  padding: 30px 0;
}

.section-title {
  font-size: 24px;
  font-weight: 700;
  text-align: center;
  margin-bottom: 8px;
  letter-spacing: 0.5px;
}

.section-subtitle {
  text-align: center;
  color: var(--text-secondary);
  margin-bottom: 32px;
  font-size: 14px;
}

.universes-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
}

/* 图表 */
.chart-section {
  padding: 20px 0;
}

.chart-card {
  padding: 30px 28px;
}

.chart-title {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 20px;
  letter-spacing: 0.3px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.chart-container {
  width: 100%;
  height: 400px;
}

/* 未来来信区域 */
.letter-section-header {
  margin-bottom: 20px;
}

.letter-subtitle {
  font-size: 14px;
  color: var(--text-secondary);
  margin-top: 4px;
}

.letter-tabs {
  display: flex;
  gap: 12px;
  margin-bottom: 24px;
}

.letter-tab {
  padding: 10px 24px;
  background: rgba(138, 99, 255, 0.08);
  border: 1px solid var(--border-glow);
  border-radius: 24px;
  color: var(--text-secondary);
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: inherit;
}

.letter-tab:hover {
  background: rgba(138, 99, 255, 0.15);
  color: var(--text-primary);
}

.letter-tab.active {
  background: var(--gradient-nebula);
  color: white;
  border-color: transparent;
  box-shadow: 0 4px 15px rgba(138, 99, 255, 0.3);
}

/* 底部操作 */
.bottom-actions {
  padding: 40px 0;
  text-align: center;
}

.action-buttons {
  display: flex;
  justify-content: center;
  gap: 16px;
  flex-wrap: wrap;
  margin-bottom: 20px;
}

.action-btn {
  padding: 14px 28px;
}

.disclaimer {
  font-size: 13px;
  color: var(--text-muted);
}

/* 响应式 */
@media (max-width: 768px) {
  .universes-grid {
    grid-template-columns: 1fr;
  }
  .decision-text {
    font-size: 20px;
  }
  .chart-container {
    height: 320px;
  }
  .nav-actions {
    gap: 8px;
  }
  .nav-btn {
    padding: 6px 14px;
    font-size: 13px;
  }
  .regret-grid {
    grid-template-columns: 1fr !important;
  }
}

/* 后悔指数模型 */
.regret-header {
  margin-bottom: 20px;
}

.regret-subtitle {
  font-size: 14px;
  color: var(--text-secondary);
  margin-top: 4px;
}

.regret-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  margin-bottom: 20px;
}

.regret-card {
  padding: 20px;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 12px;
  border-top: 3px solid;
}

.regret-card-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 14px;
}

.regret-badge {
  width: 28px;
  height: 28px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 700;
  color: white;
}

.regret-title {
  font-size: 15px;
  font-weight: 600;
  color: var(--text-primary);
  flex: 1;
}

.regret-level {
  font-size: 12px;
  font-weight: 600;
  padding: 2px 10px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.06);
}

.regret-score-area {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 14px;
}

.regret-score-bar-wrapper {
  flex: 1;
  height: 8px;
  background: rgba(255, 255, 255, 0.06);
  border-radius: 4px;
  overflow: hidden;
}

.regret-score-bar {
  height: 100%;
  border-radius: 4px;
  transition: width 0.8s ease;
}

.regret-score-value {
  font-size: 22px;
  font-weight: 800;
  min-width: 36px;
  text-align: right;
}

.regret-reasons {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 12px;
}

.regret-reason-item {
  display: flex;
  gap: 8px;
  font-size: 13px;
  line-height: 1.5;
}

.regret-reason-time {
  color: var(--accent-purple);
  font-weight: 600;
  flex-shrink: 0;
  width: 50px;
}

.regret-reason-text {
  color: var(--text-secondary);
  flex: 1;
}

.regret-top {
  padding: 8px 12px;
  background: rgba(255, 165, 0, 0.08);
  border-radius: 8px;
  margin-bottom: 10px;
}

.regret-top-label {
  font-size: 13px;
  color: #ffa500;
  font-weight: 500;
}

.regret-mitigation {
  display: flex;
  gap: 8px;
  padding: 8px 12px;
  background: rgba(74, 222, 128, 0.06);
  border-radius: 8px;
}

.mitigation-icon {
  font-size: 14px;
  flex-shrink: 0;
}

.mitigation-text {
  font-size: 13px;
  color: var(--accent-green);
  line-height: 1.5;
}

.regret-summary {
  display: flex;
  gap: 14px;
  padding: 20px;
  background: rgba(138, 99, 255, 0.08);
  border-radius: 12px;
  border: 1px solid rgba(138, 99, 255, 0.15);
}

.regret-summary-icon {
  font-size: 28px;
  flex-shrink: 0;
}

.regret-summary-text {
  font-size: 14px;
  line-height: 1.7;
  color: var(--text-primary);
  margin-bottom: 8px;
}

.regret-recommendation {
  font-size: 14px;
  line-height: 1.6;
  color: var(--accent-purple);
  font-weight: 500;
}
</style>
