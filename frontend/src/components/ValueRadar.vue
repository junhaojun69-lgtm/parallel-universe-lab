<template>
  <div class="value-radar">
    <div class="radar-header">
      <h3 class="chart-title">🎯 人生价值雷达</h3>
      <p class="radar-subtitle">六大人生维度对比，看见不同宇宙下的价值变化</p>
    </div>

    <!-- 雷达图 -->
    <div ref="radarChartRef" class="radar-chart"></div>

    <!-- 维度切换 -->
    <div class="legend-row">
      <div
        class="legend-item"
        v-for="item in legendItems"
        :key="item.name"
        @click="toggleLegend(item.name)"
        :class="{ dimmed: !visibleSeries[item.name] }"
      >
        <span class="legend-dot" :style="{ background: item.color }"></span>
        <span class="legend-text">{{ item.name }}</span>
      </div>
    </div>

    <!-- 分析卡片 -->
    <div class="analysis-grid">
      <div class="glass-card analysis-card analysis-strongest">
        <div class="analysis-icon">🚀</div>
        <div class="analysis-label">最大提升</div>
        <div class="analysis-value">{{ data.analysis.strongest.universe }}</div>
        <div class="analysis-detail">{{ data.analysis.strongest.dimension }} +{{ data.analysis.strongest.value }}</div>
        <p class="analysis-insight">{{ data.analysis.strongest.insight }}</p>
      </div>

      <div class="glass-card analysis-card analysis-balanced">
        <div class="analysis-icon">⚖️</div>
        <div class="analysis-label">最均衡</div>
        <div class="analysis-value">{{ data.analysis.balanced.universe }}</div>
        <div class="analysis-detail">各项指标均衡</div>
        <p class="analysis-insight">{{ data.analysis.balanced.insight }}</p>
      </div>

      <div class="glass-card analysis-card analysis-tradeoff">
        <div class="analysis-icon">⚡</div>
        <div class="analysis-label">最大取舍</div>
        <div class="analysis-value">{{ data.analysis.tradeoff.universe }}</div>
        <div class="analysis-detail">有得有失</div>
        <p class="analysis-insight">{{ data.analysis.tradeoff.insight }}</p>
      </div>
    </div>

    <!-- 总结 -->
    <div class="glass-card radar-summary">
      <div class="summary-header">
        <span class="summary-icon">🤖</span>
        <span class="summary-title">AI 综合分析</span>
      </div>
      <p class="summary-text">{{ data.analysis.summary }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch, nextTick } from 'vue'
import * as echarts from 'echarts'

const props = defineProps({
  data: {
    type: Object,
    required: true
  }
})

const radarChartRef = ref(null)
let chart = null

const visibleSeries = ref({
  '当前状态': true,
  '安稳宇宙': true,
  '突破宇宙': true,
  '成长宇宙': true,
  '创新宇宙': true
})

const legendItems = ref([])

const toggleLegend = (name) => {
  visibleSeries.value[name] = !visibleSeries.value[name]
  updateChart()
}

const buildOption = () => {
  const allSeries = [
    { name: '当前状态', values: props.data.current.values, color: props.data.current.color, isCurrent: true },
    ...props.data.universes.map(u => ({ name: u.name, values: u.values, color: u.color, isCurrent: false }))
  ]

  const series = allSeries.filter(s => visibleSeries.value[s.name])

  return {
    backgroundColor: 'transparent',
    tooltip: {
      backgroundColor: 'rgba(20, 20, 45, 0.9)',
      borderColor: 'rgba(138, 99, 255, 0.3)',
      textStyle: { color: '#e8e8f5' }
    },
    radar: {
      indicator: props.data.dimensions,
      center: ['50%', '52%'],
      radius: '68%',
      axisName: {
        color: '#9999bb',
        fontSize: 14,
        fontWeight: 600
      },
      splitLine: { lineStyle: { color: 'rgba(138, 99, 255, 0.15)' } },
      splitArea: {
        areaStyle: {
          color: ['rgba(138, 99, 255, 0.02)', 'rgba(138, 99, 255, 0.05)', 'rgba(138, 99, 255, 0.02)', 'rgba(138, 99, 255, 0.05)']
        }
      },
      axisLine: { lineStyle: { color: 'rgba(138, 99, 255, 0.2)' } }
    },
    series: [{
      type: 'radar',
      data: series.map(s => ({
        value: s.values,
        name: s.name,
        symbol: 'circle',
        symbolSize: s.isCurrent ? 8 : 6,
        itemStyle: {
          color: s.color,
          borderColor: s.color,
          borderWidth: 2
        },
        lineStyle: {
          color: s.color,
          width: s.isCurrent ? 3 : 2,
          type: s.isCurrent ? 'dashed' : 'solid',
          opacity: s.isCurrent ? 0.8 : 0.7
        },
        areaStyle: {
          color: s.color,
          opacity: s.isCurrent ? 0.03 : 0.08
        }
      }))
    }]
  }
}

const updateChart = () => {
  if (chart) {
    chart.setOption(buildOption(), true)
  }
}

const initChart = () => {
  if (!radarChartRef.value || !props.data) return

  if (chart) {
    chart.dispose()
  }

  chart = echarts.init(radarChartRef.value)
  chart.setOption(buildOption())

  // Build legend items
  legendItems.value = [
    { name: '当前状态', color: props.data.current.color },
    ...props.data.universes.map(u => ({ name: u.name, color: u.color }))
  ]
}

const handleResize = () => {
  chart?.resize()
}

onMounted(() => {
  nextTick(() => {
    initChart()
  })
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
  chart?.dispose()
})

watch(() => props.data, () => {
  nextTick(() => {
    initChart()
  })
}, { deep: true })
</script>

<style scoped>
.value-radar {
  width: 100%;
}

.radar-header {
  margin-bottom: 20px;
}

.radar-subtitle {
  font-size: 14px;
  color: var(--text-secondary);
  margin-top: 4px;
}

.radar-chart {
  width: 100%;
  height: 420px;
}

/* Legend */
.legend-row {
  display: flex;
  justify-content: center;
  gap: 16px;
  flex-wrap: wrap;
  margin-bottom: 24px;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 14px;
  background: rgba(255, 255, 255, 0.04);
  border-radius: var(--radius-pill);
  cursor: pointer;
  transition: all 0.3s ease;
}

.legend-item:hover {
  background: rgba(255, 255, 255, 0.08);
}

.legend-item.dimmed {
  opacity: 0.35;
}

.legend-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  flex-shrink: 0;
}

.legend-text {
  font-size: 13px;
  color: var(--text-secondary);
  font-weight: 500;
}

/* 分析卡片 */
.analysis-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin-bottom: 20px;
}

.analysis-card {
  padding: 20px;
  text-align: center;
  position: relative;
  overflow: hidden;
}

.analysis-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
}

.analysis-strongest::before {
  background: linear-gradient(90deg, #4a9eff, #00e5ff);
}

.analysis-balanced::before {
  background: linear-gradient(90deg, #ff6b9d, #ffa500);
}

.analysis-tradeoff::before {
  background: linear-gradient(90deg, #ffa500, #ff6b6b);
}

.analysis-icon {
  font-size: 28px;
  margin-bottom: 8px;
}

.analysis-label {
  font-size: 12px;
  color: var(--text-muted);
  margin-bottom: 4px;
}

.analysis-value {
  font-size: 18px;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 4px;
}

.analysis-detail {
  font-size: 13px;
  color: var(--accent-purple);
  font-weight: 600;
  margin-bottom: 8px;
}

.analysis-insight {
  font-size: 13px;
  line-height: 1.5;
  color: var(--text-secondary);
}

/* 总结 */
.radar-summary {
  padding: 24px;
  border: 1px solid rgba(138, 99, 255, 0.2);
}

.summary-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 12px;
}

.summary-icon {
  font-size: 22px;
}

.summary-title {
  font-size: 16px;
  font-weight: 600;
  color: var(--accent-purple);
}

.summary-text {
  font-size: 14px;
  line-height: 1.8;
  color: var(--text-primary);
}

/* 响应式 */
@media (max-width: 768px) {
  .analysis-grid {
    grid-template-columns: 1fr;
  }
  .radar-chart {
    height: 340px;
  }
  .legend-row {
    gap: 8px;
  }
  .legend-item {
    padding: 4px 10px;
  }
}
</style>
