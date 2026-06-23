<template>
  <div class="dashboard-page">
    <!-- 导航栏 -->
    <nav class="navbar">
      <div class="container nav-inner">
        <div class="logo" @click="$router.push('/')">
          <span class="logo-icon">🌌</span>
          <span class="logo-text">平行宇宙实验室</span>
        </div>
        <div class="nav-actions">
          <router-link to="/" class="btn btn-secondary nav-btn">返回首页</router-link>
        </div>
      </div>
    </nav>

    <!-- 加载状态 -->
    <div v-if="loading" class="loading-section">
      <div class="glass-card loading-card">
        <div class="loading-spinner"></div>
        <p class="loading-text">正在加载数据驾驶舱...</p>
      </div>
    </div>

    <!-- 主内容 -->
    <div v-else-if="dashboardData" class="dashboard-content">
      <!-- 页面标题 -->
      <header class="page-header fade-in-up">
        <div class="container">
          <div class="header-badge">📊 实时数据</div>
          <h1 class="page-title">数据驾驶舱</h1>
          <p class="page-subtitle">平台核心指标全景展示 · 最后更新: {{ dashboardData.lastUpdated }}</p>
        </div>
      </header>

      <!-- 核心指标卡片 -->
      <section class="stats-section">
        <div class="container">
          <div class="stats-grid">
            <div
              v-for="(stat, index) in dashboardData.stats"
              :key="stat.id"
              class="glass-card stat-card fade-in-up"
              :style="{ animationDelay: index * 0.08 + 's' }"
            >
              <div class="stat-top">
                <div class="stat-icon" :style="{ background: stat.color + '20', boxShadow: '0 0 20px ' + stat.color + '30' }">
                  {{ stat.icon }}
                </div>
                <div class="stat-trend" :class="{ up: stat.trendUp }">
                  <span class="trend-arrow">{{ stat.trendUp ? '↗' : '↘' }}</span>
                  {{ stat.trend }}
                </div>
              </div>
              <div class="stat-value" :style="{ color: stat.color }">
                {{ formatNumber(stat.value) }}
                <span class="stat-unit">{{ stat.unit }}</span>
              </div>
              <div class="stat-label">{{ stat.label }}</div>
              <div class="stat-bar-bg">
                <div class="stat-bar-fill" :style="{ background: stat.color, width: getStatBarWidth(stat.value, dashboardData.stats) + '%' }"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 图表区域 -->
      <section class="charts-section">
        <div class="container">
          <!-- 折线图 + 环形图 -->
          <div class="charts-row">
            <!-- 折线图 -->
            <div class="glass-card chart-card chart-card-large fade-in-up" style="animation-delay: 0.3s">
              <div class="chart-header">
                <div>
                  <h3 class="chart-title">📈 {{ dashboardData.lineChart.title }}</h3>
                  <p class="chart-subtitle">{{ dashboardData.lineChart.subtitle }}</p>
                </div>
              </div>
              <div ref="lineChartRef" class="chart-container chart-tall"></div>
            </div>

            <!-- 环形图 -->
            <div class="glass-card chart-card chart-card-small fade-in-up" style="animation-delay: 0.4s">
              <div class="chart-header">
                <div>
                  <h3 class="chart-title">🍩 {{ dashboardData.ringChart.title }}</h3>
                  <p class="chart-subtitle">{{ dashboardData.ringChart.subtitle }}</p>
                </div>
              </div>
              <div ref="ringChartRef" class="chart-container chart-tall"></div>
              <div class="ring-legend">
                <div
                  v-for="item in dashboardData.ringChart.data"
                  :key="item.name"
                  class="ring-legend-item"
                >
                  <span class="ring-legend-dot" :style="{ background: item.color }"></span>
                  <span class="ring-legend-name">{{ item.name }}</span>
                  <span class="ring-legend-value">{{ item.value }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- 柱状图 + 宇宙偏好 -->
          <div class="charts-row">
            <!-- 柱状图 -->
            <div class="glass-card chart-card chart-card-large fade-in-up" style="animation-delay: 0.5s">
              <div class="chart-header">
                <div>
                  <h3 class="chart-title">📊 {{ dashboardData.barChart.title }}</h3>
                  <p class="chart-subtitle">{{ dashboardData.barChart.subtitle }}</p>
                </div>
              </div>
              <div ref="barChartRef" class="chart-container chart-tall"></div>
            </div>

            <!-- 宇宙偏好 -->
            <div class="glass-card chart-card chart-card-small fade-in-up" style="animation-delay: 0.6s">
              <div class="chart-header">
                <div>
                  <h3 class="chart-title">🌌 平行宇宙选择偏好</h3>
                  <p class="chart-subtitle">用户最倾向的宇宙类型</p>
                </div>
              </div>
              <div class="universe-prefs">
                <div
                  v-for="(uni, index) in dashboardData.universePreference"
                  :key="uni.name"
                  class="uni-pref-item"
                  :style="{ animationDelay: 0.7 + index * 0.1 + 's' }"
                >
                  <div class="uni-pref-header">
                    <span class="uni-pref-dot" :style="{ background: uni.color, boxShadow: '0 0 10px ' + uni.color }"></span>
                    <span class="uni-pref-name">{{ uni.name }}</span>
                    <span class="uni-pref-pct" :style="{ color: uni.color }">{{ uni.percentage }}%</span>
                  </div>
                  <div class="uni-pref-bar-bg">
                    <div
                      class="uni-pref-bar-fill"
                      :style="{ background: uni.color, width: uni.percentage * 2.8 + '%', boxShadow: '0 0 12px ' + uni.color + '60' }"
                    ></div>
                  </div>
                  <div class="uni-pref-count">{{ formatNumber(uni.count) }} 人选择</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 实时活动流 -->
      <section class="activity-section">
        <div class="container">
          <div class="glass-card activity-card fade-in-up" style="animation-delay: 0.7s">
            <div class="activity-header">
              <h3 class="chart-title">⚡ 实时活动流</h3>
              <div class="live-indicator">
                <span class="live-dot"></span>
                <span class="live-text">LIVE</span>
              </div>
            </div>
            <div class="activity-list">
              <div
                v-for="(activity, index) in dashboardData.activityFeed"
                :key="activity.id"
                class="activity-item"
                :style="{ animationDelay: 0.8 + index * 0.08 + 's' }"
              >
                <div class="activity-icon">{{ activity.icon }}</div>
                <div class="activity-info">
                  <div class="activity-main">
                    <span class="activity-user">{{ activity.user }}</span>
                    <span class="activity-action">{{ activity.action }}</span>
                  </div>
                  <div class="activity-decision">{{ activity.decision }}</div>
                </div>
                <div class="activity-time">{{ activity.time }}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 底部 -->
      <footer class="dashboard-footer">
        <div class="container">
          <p>人生平行宇宙实验室 · 数据驾驶舱 · 仅供比赛演示</p>
        </div>
      </footer>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue'
import * as echarts from 'echarts'
import { getDashboard } from '../api'

const dashboardData = ref(null)
const loading = ref(true)

const lineChartRef = ref(null)
const barChartRef = ref(null)
const ringChartRef = ref(null)

let lineChart = null
let barChart = null
let ringChart = null

const formatNumber = (num) => {
  if (num >= 10000) return (num / 10000).toFixed(1) + '万'
  if (num >= 1000) return (num / 1000).toFixed(1) + 'k'
  return num.toString()
}

const getStatBarWidth = (value, allStats) => {
  const max = Math.max(...allStats.map(s => s.value))
  return (value / max) * 100
}

const initLineChart = () => {
  if (!lineChartRef.value || !dashboardData.value) return
  const data = dashboardData.value.lineChart

  lineChart = echarts.init(lineChartRef.value)
  lineChart.setOption({
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(20, 20, 45, 0.95)',
      borderColor: 'rgba(138, 99, 255, 0.3)',
      borderWidth: 1,
      textStyle: { color: '#f0f0fa', fontSize: 13 }
    },
    legend: {
      data: data.series.map(s => s.name),
      textStyle: { color: '#a0a0c8', fontSize: 12 },
      top: 5,
      right: 10
    },
    grid: { left: '3%', right: '4%', bottom: '3%', top: '15%', containLabel: true },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: data.categories,
      axisLine: { lineStyle: { color: 'rgba(138, 99, 255, 0.2)' } },
      axisLabel: { color: '#6a6a8a', fontSize: 11 },
      axisTick: { show: false }
    },
    yAxis: {
      type: 'value',
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: { color: '#6a6a8a', fontSize: 11 },
      splitLine: { lineStyle: { color: 'rgba(138, 99, 255, 0.08)', type: 'dashed' } }
    },
    series: data.series.map((s, i) => ({
      name: s.name,
      type: 'line',
      smooth: true,
      symbol: 'circle',
      symbolSize: 6,
      data: s.data,
      lineStyle: { width: 3, color: s.color, shadowColor: s.color, shadowBlur: 10 },
      itemStyle: { color: s.color, borderColor: '#fff', borderWidth: 2 },
      areaStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: s.color + '40' },
          { offset: 1, color: s.color + '05' }
        ])
      },
      emphasis: { focus: 'series' }
    }))
  })
}

const initBarChart = () => {
  if (!barChartRef.value || !dashboardData.value) return
  const data = dashboardData.value.barChart

  barChart = echarts.init(barChartRef.value)
  barChart.setOption({
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' },
      backgroundColor: 'rgba(20, 20, 45, 0.95)',
      borderColor: 'rgba(138, 99, 255, 0.3)',
      borderWidth: 1,
      textStyle: { color: '#f0f0fa', fontSize: 13 }
    },
    grid: { left: '3%', right: '4%', bottom: '3%', top: '10%', containLabel: true },
    xAxis: {
      type: 'category',
      data: data.categories,
      axisLine: { lineStyle: { color: 'rgba(138, 99, 255, 0.2)' } },
      axisLabel: { color: '#6a6a8a', fontSize: 11, rotate: 20 },
      axisTick: { show: false }
    },
    yAxis: {
      type: 'value',
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: { color: '#6a6a8a', fontSize: 11 },
      splitLine: { lineStyle: { color: 'rgba(138, 99, 255, 0.08)', type: 'dashed' } }
    },
    series: [{
      name: data.series[0].name,
      type: 'bar',
      data: data.series[0].data.map((val, i) => ({
        value: val,
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: data.series[0].colors[i] },
            { offset: 1, color: data.series[0].colors[i] + '30' }
          ]),
          borderRadius: [6, 6, 0, 0],
          shadowColor: data.series[0].colors[i],
          shadowBlur: 8
        }
      })),
      barWidth: '50%'
    }]
  })
}

const initRingChart = () => {
  if (!ringChartRef.value || !dashboardData.value) return
  const data = dashboardData.value.ringChart

  ringChart = echarts.init(ringChartRef.value)
  ringChart.setOption({
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'item',
      backgroundColor: 'rgba(20, 20, 45, 0.95)',
      borderColor: 'rgba(138, 99, 255, 0.3)',
      borderWidth: 1,
      textStyle: { color: '#f0f0fa', fontSize: 13 },
      formatter: '{b}: {c} ({d}%)'
    },
    series: [{
      type: 'pie',
      radius: ['45%', '70%'],
      center: ['50%', '50%'],
      avoidLabelOverlap: false,
      itemStyle: {
        borderRadius: 8,
        borderColor: 'rgba(10, 10, 26, 0.8)',
        borderWidth: 3
      },
      label: {
        show: true,
        position: 'outside',
        color: '#a0a0c8',
        fontSize: 11,
        formatter: '{b}\n{d}%'
      },
      labelLine: {
        show: true,
        lineStyle: { color: 'rgba(138, 99, 255, 0.2)' }
      },
      emphasis: {
        scale: true,
        scaleSize: 8,
        label: { show: true, fontSize: 13, fontWeight: 'bold' }
      },
      data: data.data.map(item => ({
        name: item.name,
        value: item.value,
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 1, 1, [
            { offset: 0, color: item.color },
            { offset: 1, color: item.color + '80' }
          ]),
          shadowColor: item.color,
          shadowBlur: 15
        }
      }))
    }]
  })
}

const handleResize = () => {
  lineChart?.resize()
  barChart?.resize()
  ringChart?.resize()
}

const loadDashboard = async () => {
  loading.value = true
  try {
    const res = await getDashboard()
    dashboardData.value = res.data
    loading.value = false
    await nextTick()
    initLineChart()
    initBarChart()
    initRingChart()
    window.addEventListener('resize', handleResize)
  } catch (err) {
    console.error('数据驾驶舱加载失败:', err)
    loading.value = false
  }
}

onMounted(() => {
  loadDashboard()
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize)
  lineChart?.dispose()
  barChart?.dispose()
  ringChart?.dispose()
})
</script>

<style scoped>
.dashboard-page {
  min-height: 100vh;
  padding-bottom: 40px;
}

/* 加载状态 */
.loading-section {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 70vh;
  padding: 40px 0;
}

.loading-card {
  padding: 60px 40px;
  text-align: center;
}

.loading-spinner {
  width: 56px;
  height: 56px;
  margin: 0 auto 24px;
  border: 4px solid rgba(138, 99, 255, 0.15);
  border-top-color: var(--accent-purple);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

.loading-text {
  font-size: 18px;
  font-weight: 600;
  color: var(--text-secondary);
}

/* 页面标题 */
.page-header {
  text-align: center;
  padding: 50px 0 36px;
}

.header-badge {
  display: inline-block;
  padding: 6px 18px;
  background: rgba(138, 99, 255, 0.12);
  border: 1px solid var(--border-glow);
  border-radius: var(--radius-pill);
  font-size: 13px;
  font-weight: 600;
  color: var(--accent-purple);
  letter-spacing: 0.5px;
  margin-bottom: 16px;
}

.page-header .page-title {
  margin-bottom: 10px;
}

/* 核心指标 */
.stats-section {
  margin-bottom: 32px;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 20px;
}

.stat-card {
  padding: 24px 20px;
  position: relative;
  overflow: hidden;
}

.stat-card::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: var(--gradient-nebula);
  opacity: 0;
  transition: opacity 0.4s ease;
}

.stat-card:hover::after {
  opacity: 1;
}

.stat-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.stat-icon {
  width: 48px;
  height: 48px;
  border-radius: var(--radius-sm);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
}

.stat-trend {
  font-size: 13px;
  font-weight: 600;
  color: var(--accent-green);
  display: flex;
  align-items: center;
  gap: 2px;
}

.stat-trend:not(.up) {
  color: #ff6b6b;
}

.trend-arrow {
  font-size: 16px;
}

.stat-value {
  font-size: 32px;
  font-weight: 800;
  letter-spacing: 0.5px;
  margin-bottom: 4px;
  line-height: 1.2;
}

.stat-unit {
  font-size: 14px;
  font-weight: 500;
  color: var(--text-muted);
  margin-left: 4px;
}

.stat-label {
  font-size: 13px;
  color: var(--text-secondary);
  letter-spacing: 0.3px;
  margin-bottom: 14px;
}

.stat-bar-bg {
  height: 4px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 2px;
  overflow: hidden;
}

.stat-bar-fill {
  height: 100%;
  border-radius: 2px;
  transition: width 0.8s cubic-bezier(0.16, 1, 0.3, 1);
}

/* 图表区域 */
.charts-section {
  margin-bottom: 32px;
}

.charts-row {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
}

.chart-card {
  padding: 28px 24px;
  flex: 1;
}

.chart-card-large {
  flex: 1.5;
}

.chart-card-small {
  flex: 1;
}

.chart-header {
  margin-bottom: 20px;
}

.chart-title {
  font-size: 18px;
  font-weight: 700;
  color: var(--text-primary);
  letter-spacing: 0.5px;
  margin-bottom: 4px;
}

.chart-subtitle {
  font-size: 13px;
  color: var(--text-muted);
  letter-spacing: 0.3px;
}

.chart-container {
  width: 100%;
}

.chart-tall {
  height: 320px;
}

/* 环形图图例 */
.ring-legend {
  display: flex;
  flex-wrap: wrap;
  gap: 8px 16px;
  margin-top: 12px;
  justify-content: center;
}

.ring-legend-item {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  color: var(--text-secondary);
}

.ring-legend-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  flex-shrink: 0;
}

.ring-legend-name {
  letter-spacing: 0.3px;
}

.ring-legend-value {
  font-weight: 600;
  color: var(--text-primary);
}

/* 宇宙偏好 */
.universe-prefs {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 8px 0;
}

.uni-pref-item {
  animation: fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  opacity: 0;
}

.uni-pref-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 8px;
}

.uni-pref-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  flex-shrink: 0;
}

.uni-pref-name {
  font-size: 14px;
  font-weight: 600;
  color: var(--text-primary);
  letter-spacing: 0.3px;
  flex: 1;
}

.uni-pref-pct {
  font-size: 18px;
  font-weight: 800;
  letter-spacing: 0.5px;
}

.uni-pref-bar-bg {
  height: 8px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 6px;
}

.uni-pref-bar-fill {
  height: 100%;
  border-radius: 4px;
  transition: width 0.8s cubic-bezier(0.16, 1, 0.3, 1);
}

.uni-pref-count {
  font-size: 12px;
  color: var(--text-muted);
  letter-spacing: 0.3px;
}

/* 实时活动流 */
.activity-section {
  margin-bottom: 32px;
}

.activity-card {
  padding: 28px 24px;
}

.activity-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.live-indicator {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 4px 12px;
  background: rgba(74, 222, 128, 0.1);
  border: 1px solid rgba(74, 222, 128, 0.3);
  border-radius: var(--radius-pill);
}

.live-dot {
  width: 8px;
  height: 8px;
  background: var(--accent-green);
  border-radius: 50%;
  animation: pulse-dot 1.5s ease-in-out infinite;
}

@keyframes pulse-dot {
  0%, 100% { opacity: 1; box-shadow: 0 0 0 0 rgba(74, 222, 128, 0.5); }
  50% { opacity: 0.6; box-shadow: 0 0 0 6px rgba(74, 222, 128, 0); }
}

.live-text {
  font-size: 11px;
  font-weight: 700;
  color: var(--accent-green);
  letter-spacing: 1px;
}

.activity-list {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.activity-item {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 14px 16px;
  background: rgba(255, 255, 255, 0.02);
  border-radius: var(--radius-sm);
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  animation: fadeInUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  opacity: 0;
}

.activity-item:hover {
  background: rgba(138, 99, 255, 0.06);
  transform: translateX(6px);
}

.activity-icon {
  font-size: 22px;
  flex-shrink: 0;
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(138, 99, 255, 0.08);
  border-radius: var(--radius-sm);
}

.activity-info {
  flex: 1;
  min-width: 0;
}

.activity-main {
  font-size: 14px;
  margin-bottom: 2px;
}

.activity-user {
  font-weight: 700;
  color: var(--accent-purple);
  margin-right: 6px;
}

.activity-action {
  color: var(--text-secondary);
}

.activity-decision {
  font-size: 13px;
  color: var(--text-muted);
  letter-spacing: 0.2px;
}

.activity-time {
  font-size: 12px;
  color: var(--text-muted);
  flex-shrink: 0;
  white-space: nowrap;
}

/* 底部 */
.dashboard-footer {
  text-align: center;
  padding: 20px 0;
  font-size: 13px;
  color: var(--text-muted);
  letter-spacing: 0.3px;
}

/* 响应式 */
@media (max-width: 1024px) {
  .stats-grid {
    grid-template-columns: repeat(3, 1fr);
  }

  .charts-row {
    flex-direction: column;
  }

  .chart-card-large,
  .chart-card-small {
    flex: 1;
  }
}

@media (max-width: 768px) {
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .stat-value {
    font-size: 26px;
  }

  .chart-tall {
    height: 260px;
  }

  .activity-item {
    flex-wrap: wrap;
  }

  .activity-time {
    width: 100%;
    padding-left: 58px;
  }
}

@media (max-width: 480px) {
  .stats-grid {
    grid-template-columns: 1fr;
  }
}
</style>
