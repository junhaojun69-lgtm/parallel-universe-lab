<template>
  <div class="decision-tree glass-card fade-in">
    <!-- 头部 -->
    <div class="tree-header">
      <div class="header-left">
        <span class="tree-icon">🌳</span>
        <div class="header-titles">
          <h3 class="tree-title">人生决策树</h3>
          <p class="tree-subtitle">未来可能的发展路径与概率</p>
        </div>
      </div>
      <div class="header-right" v-if="totalNodes">
        <span class="node-count">{{ totalNodes }} 种可能</span>
      </div>
    </div>

    <!-- 图表容器 -->
    <div class="chart-wrapper">
      <div ref="chartRef" class="tree-chart"></div>
    </div>

    <!-- 图例 -->
    <div class="tree-legend" v-if="universes.length">
      <div
        v-for="u in universes"
        :key="u.name"
        class="legend-item"
        :class="{
          active: activeUniverse === u.name,
          dimmed: activeUniverse && activeUniverse !== u.name
        }"
        @mouseenter="highlightUniverse(u.name)"
        @mouseleave="highlightUniverse(null)"
      >
        <span class="legend-dot" :style="{ background: u.color, boxShadow: `0 0 10px ${u.color}` }"></span>
        <span class="legend-name">{{ u.name }}</span>
        <span class="legend-prob">{{ u.probability }}%</span>
      </div>
    </div>

    <!-- 提示 -->
    <div class="tree-tip">
      <span class="tip-icon">💡</span>
      <span class="tip-text">悬停节点查看路径 · 拖拽平移 · 滚轮缩放</span>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch, nextTick, computed } from 'vue'
import * as echarts from 'echarts'

const props = defineProps({
  treeData: {
    type: Object,
    required: true
  }
})

const chartRef = ref(null)
const activeUniverse = ref(null)
let chart = null

// 四个宇宙分支
const universes = computed(() => {
  if (!props.treeData?.root?.children) return []
  return props.treeData.root.children
})

// 统计节点总数
const totalNodes = computed(() => {
  if (!props.treeData?.root) return 0
  let count = 0
  const countNodes = (node) => {
    count++
    if (node.children) node.children.forEach(countNodes)
  }
  countNodes(props.treeData.root)
  return count
})

/**
 * 将传入的 treeData 转换为 ECharts tree 所需的数据格式
 * @param {Object} data - 原始数据
 * @param {string|null} active - 当前高亮的宇宙名称
 */
const transformData = (data, active = null) => {
  if (!data || !data.root) return null

  const transformNode = (node, isRoot, universeName = null) => {
    const isActive = !active || isRoot || universeName === active
    const opacity = isActive ? 1 : 0.15
    const color = node.color || '#8a63ff'
    const hasChildren = node.children && node.children.length > 0

    const result = {
      name: node.name,
      symbolSize: isRoot ? 22 : (hasChildren ? 16 : 10),
      itemStyle: {
        color: color,
        borderColor: color,
        borderWidth: 2,
        shadowBlur: isActive ? 12 : 0,
        shadowColor: color,
        opacity: opacity
      },
      lineStyle: {
        color: color,
        width: 2,
        curveness: 0.5,
        opacity: opacity * 0.6
      },
      label: { opacity: opacity },
      // 自定义字段，供 formatter / tooltip 使用
      _subtitle: node.subtitle,
      _outcome: node.outcome,
      _probability: node.probability,
      _color: color,
      _isRoot: isRoot,
      _hasChildren: hasChildren
    }

    if (node.children) {
      result.children = node.children.map(child =>
        transformNode(child, false, isRoot ? child.name : universeName)
      )
    }
    return result
  }

  return transformNode(data.root, true, null)
}

const getChartOption = () => {
  const data = transformData(props.treeData, activeUniverse.value)

  return {
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'item',
      triggerOn: 'mousemove',
      backgroundColor: 'rgba(20, 20, 45, 0.95)',
      borderColor: 'rgba(138, 99, 255, 0.3)',
      borderWidth: 1,
      padding: [12, 16],
      textStyle: { color: '#e8e8f5', fontSize: 13 },
      formatter: (params) => {
        const d = params.data
        let html = `<div style="font-weight:700;font-size:14px;margin-bottom:6px;color:${d._color || '#8a63ff'}">${d.name}</div>`
        if (d._subtitle) {
          html += `<div style="color:#9999bb;font-size:12px;margin-bottom:6px">${d._subtitle}</div>`
        }
        if (d._probability !== undefined && d._probability !== null) {
          html += `<div style="color:#e8e8f5;font-size:13px">概率: <b style="color:#4a9eff">${d._probability}%</b></div>`
        }
        if (d._outcome) {
          html += `<div style="color:#4ade80;font-size:12px;margin-top:6px">→ ${d._outcome}</div>`
        }
        return html
      }
    },
    series: [
      {
        type: 'tree',
        data: [data],
        layout: 'orthogonal',
        orient: 'LR',
        roam: true,
        initialTreeDepth: -1,
        top: '4%',
        left: '8%',
        bottom: '4%',
        right: '14%',
        symbol: 'circle',
        label: {
          position: 'top',
          distance: 8,
          verticalAlign: 'middle',
          align: 'center',
          formatter: (params) => {
            const d = params.data
            if (d._isRoot) {
              return `{name|${d.name}}\n{sub|${d._subtitle || ''}}`
            } else if (d._hasChildren) {
              return `{name|${d.name}}\n{prob|${d._probability}%}`
            } else {
              const outcome = d._outcome ? `\n{outcome|${d._outcome}}` : ''
              return `{name|${d.name}}\n{prob|${d._probability}%}${outcome}`
            }
          },
          rich: {
            name: {
              color: '#e8e8f5',
              fontSize: 14,
              fontWeight: 700,
              lineHeight: 20
            },
            sub: {
              color: '#9999bb',
              fontSize: 11,
              lineHeight: 16
            },
            prob: {
              color: '#4a9eff',
              fontSize: 12,
              fontWeight: 600,
              lineHeight: 18
            },
            outcome: {
              color: '#4ade80',
              fontSize: 11,
              lineHeight: 16
            }
          }
        },
        leaves: {
          label: {
            position: 'right',
            distance: 10,
            verticalAlign: 'middle',
            align: 'left'
          }
        },
        emphasis: {
          focus: 'ancestor',
          itemStyle: {
            shadowBlur: 20,
            shadowColor: 'rgba(138, 99, 255, 0.8)'
          },
          lineStyle: {
            width: 3
          }
        },
        lineStyle: {
          color: 'rgba(138, 99, 255, 0.4)',
          width: 1.5,
          curveness: 0.5
        },
        animationDuration: 1000,
        animationDurationUpdate: 600,
        animationEasingUpdate: 'cubicInOut'
      }
    ]
  }
}

const initChart = () => {
  if (!chartRef.value) return
  chart = echarts.init(chartRef.value)
  chart.setOption(getChartOption())
}

const updateChart = () => {
  if (!chart) return
  chart.setOption(getChartOption())
}

const highlightUniverse = (name) => {
  activeUniverse.value = name
  updateChart()
}

const handleResize = () => {
  chart?.resize()
}

watch(
  () => props.treeData,
  () => {
    nextTick(() => updateChart())
  },
  { deep: true }
)

onMounted(() => {
  nextTick(() => {
    initChart()
  })
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
  if (chart) {
    chart.dispose()
    chart = null
  }
})
</script>

<style scoped>
.decision-tree {
  padding: 28px 32px;
}

/* ===== 头部 ===== */
.tree-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 14px;
}

.tree-icon {
  font-size: 28px;
}

.header-titles {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.tree-title {
  font-size: 20px;
  font-weight: 700;
  color: var(--text-primary);
}

.tree-subtitle {
  font-size: 13px;
  color: var(--text-secondary);
}

.node-count {
  padding: 6px 14px;
  background: rgba(138, 99, 255, 0.12);
  border: 1px solid rgba(138, 99, 255, 0.25);
  border-radius: var(--radius-pill);
  font-size: 13px;
  color: var(--accent-purple);
  font-weight: 600;
  white-space: nowrap;
}

/* ===== 图表 ===== */
.chart-wrapper {
  width: 100%;
  overflow: hidden;
  border-radius: 12px;
  background: rgba(10, 10, 26, 0.4);
  border: 1px solid rgba(138, 99, 255, 0.1);
}

.tree-chart {
  width: 100%;
  height: 500px;
}

/* ===== 图例 ===== */
.tree-legend {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 20px;
  padding: 16px;
  background: rgba(10, 10, 26, 0.4);
  border-radius: 12px;
  border: 1px solid rgba(138, 99, 255, 0.1);
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 14px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(138, 99, 255, 0.15);
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.legend-item:hover {
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(138, 99, 255, 0.3);
  transform: translateY(-2px);
}

.legend-item.active {
  background: rgba(138, 99, 255, 0.15);
  border-color: rgba(138, 99, 255, 0.5);
  box-shadow: 0 0 16px rgba(138, 99, 255, 0.2);
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

.legend-name {
  font-size: 13px;
  font-weight: 600;
  color: var(--text-primary);
}

.legend-prob {
  font-size: 12px;
  padding: 2px 8px;
  background: rgba(74, 158, 255, 0.1);
  border-radius: 10px;
  color: var(--accent-blue);
  font-weight: 600;
}

/* ===== 提示 ===== */
.tree-tip {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 16px;
  padding: 10px 16px;
  background: rgba(138, 99, 255, 0.06);
  border-radius: 10px;
}

.tip-icon {
  font-size: 16px;
}

.tip-text {
  font-size: 12px;
  color: var(--text-muted);
}

/* ===== 响应式 ===== */
@media (max-width: 768px) {
  .decision-tree {
    padding: 20px 16px;
  }

  .tree-chart {
    height: 400px;
  }

  .tree-title {
    font-size: 18px;
  }

  .tree-legend {
    gap: 8px;
    padding: 12px;
  }

  .legend-item {
    padding: 6px 10px;
    gap: 6px;
  }

  .legend-name {
    font-size: 12px;
  }

  .node-count {
    font-size: 12px;
    padding: 4px 10px;
  }
}
</style>
