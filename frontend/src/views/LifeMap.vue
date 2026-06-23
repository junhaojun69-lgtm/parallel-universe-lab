<template>
  <div class="life-map-page">
    <!-- Navbar -->
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

    <!-- Main content -->
    <div class="map-content">
      <header class="page-header fade-in-up">
        <h1 class="page-title">🗺️ AI人生地图</h1>
        <p class="page-subtitle">探索你的人生路径树，每个选择都通向不同的未来</p>
      </header>

      <!-- Loading state -->
      <div v-if="loading" class="loading-wrap glass-card fade-in-up">
        <div class="loader"></div>
        <p class="loading-text">正在生成你的人生地图...</p>
      </div>

      <!-- Error state -->
      <div v-else-if="error" class="error-wrap glass-card fade-in-up">
        <p class="error-text">⚠️ {{ error }}</p>
        <router-link to="/" class="btn btn-secondary">返回首页重试</router-link>
      </div>

      <!-- Map content -->
      <template v-else>
        <!-- Legend -->
        <div class="legend glass-card fade-in-up">
          <span class="legend-title">图例</span>
          <div class="legend-items">
            <div
              v-for="item in lifeMap.legend"
              :key="item.type"
              class="legend-item"
            >
              <span
                class="legend-dot"
                :style="{ background: item.color, boxShadow: `0 0 8px ${item.color}` }"
              ></span>
              <span class="legend-label">{{ item.label }}</span>
            </div>
          </div>
        </div>

        <!-- SVG Life Map -->
        <div class="svg-wrapper glass-card fade-in-up">
          <svg
            viewBox="0 0 800 680"
            class="life-map-svg"
            preserveAspectRatio="xMidYMin meet"
          >
            <defs>
              <!-- Glow filter for active nodes -->
              <filter id="node-glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>

              <!-- Gradient definitions for each path -->
              <linearGradient
                v-for="(p, i) in lifeMap.paths"
                :key="'grad-' + i"
                :id="'grad-' + i"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop offset="0%" :stop-color="getNodeColor(p.from)" stop-opacity="0.75" />
                <stop offset="100%" :stop-color="getNodeColor(p.to)" stop-opacity="0.75" />
              </linearGradient>
            </defs>

            <!-- Connection paths (curved bezier lines) -->
            <path
              v-for="(p, i) in lifeMap.paths"
              :key="'path-' + i"
              :d="getPathD(p.from, p.to)"
              :stroke="`url(#grad-${i})`"
              :class="['map-path', { 'path-active': isActivePath(p) }]"
              fill="none"
            />

            <!-- Nodes (sorted: expanded nodes render last for proper z-order) -->
            <g
              v-for="node in sortedNodes"
              :key="node.id"
              :class="[
                'map-node',
                'node-' + node.type,
                { 'node-active': isActiveNode(node), 'node-expanded': expandedNodes.has(node.id) }
              ]"
              :transform="`translate(${node.x},${node.y})`"
              @click="toggleNode(node.id)"
            >
              <!-- Pulsing glow ring for active/current nodes -->
              <circle
                v-if="isActiveNode(node)"
                class="node-glow-ring"
                r="46"
                :fill="getTypeColor(node.type)"
              />

              <!-- Outer colored circle -->
              <circle
                class="node-outer"
                r="36"
                :fill="getTypeColor(node.type)"
                :filter="isActiveNode(node) ? 'url(#node-glow)' : ''"
              />

              <!-- Inner dark circle (icon background) -->
              <circle class="node-inner" r="32" />

              <!-- Node icon (emoji) -->
              <text
                class="node-icon"
                text-anchor="middle"
                dominant-baseline="central"
              >{{ node.icon }}</text>

              <!-- Node label -->
              <text
                class="node-label"
                text-anchor="middle"
                y="54"
              >{{ node.label }}</text>

              <!-- Probability badge -->
              <g
                v-if="node.probability != null"
                :transform="`translate(0, 71)`"
              >
                <rect
                  class="node-prob-bg"
                  x="-26"
                  y="-11"
                  width="52"
                  height="22"
                  rx="11"
                  :fill="getTypeColor(node.type)"
                />
                <text
                  class="node-prob-text"
                  text-anchor="middle"
                  dominant-baseline="central"
                >{{ node.probability }}%</text>
              </g>

              <!-- Expanded description card -->
              <foreignObject
                v-if="expandedNodes.has(node.id)"
                x="-115"
                :y="node.probability != null ? 90 : 72"
                width="230"
                height="130"
              >
                <div
                  class="node-desc-card"
                  :style="{ borderColor: getTypeColor(node.type) }"
                  @click.stop
                >
                  <div
                    class="node-desc-type"
                    :style="{ color: getTypeColor(node.type) }"
                  >{{ getTypeLabel(node.type) }}</div>
                  <div class="node-desc-text">{{ node.description }}</div>
                </div>
              </foreignObject>
            </g>
          </svg>
        </div>

        <!-- Summary -->
        <div class="summary glass-card fade-in-up">
          <h3 class="summary-title">📌 人生地图解读</h3>
          <p class="summary-text">{{ lifeMap.summary }}</p>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { getLifeMap } from '../api'

const loading = ref(true)
const error = ref('')
const lifeMap = ref({ nodes: [], paths: [], legend: [], summary: '' })
const expandedNodes = ref(new Set())

// Node type color mapping
const typeColors = {
  origin: '#8a63ff',
  decision: '#4a9eff',
  event: '#ffa500',
  milestone: '#4ade80',
  destination: '#ff6b9d'
}

// Node type label mapping
const typeLabels = {
  origin: '起点',
  decision: '决策点',
  event: '事件节点',
  milestone: '里程碑',
  destination: '终点'
}

// Build a lookup map for nodes by id
const nodeMap = computed(() => {
  const map = {}
  lifeMap.value.nodes.forEach((n) => {
    map[n.id] = n
  })
  return map
})

// Set of active/current node ids (the highlighted path)
const activeNodeIds = computed(() => {
  return new Set(
    lifeMap.value.nodes
      .filter((n) => n.status === 'current' || n.status === 'active')
      .map((n) => n.id)
  )
})

// Sort nodes so expanded ones render last (appear on top in SVG z-order)
const sortedNodes = computed(() => {
  return [...lifeMap.value.nodes].sort((a, b) => {
    const aExp = expandedNodes.value.has(a.id) ? 1 : 0
    const bExp = expandedNodes.value.has(b.id) ? 1 : 0
    return aExp - bExp
  })
})

const getTypeColor = (type) => typeColors[type] || '#888888'
const getTypeLabel = (type) => typeLabels[type] || type
const getNodeColor = (id) => {
  const node = nodeMap.value[id]
  return node ? getTypeColor(node.type) : '#666666'
}

// Generate a curved bezier path between two nodes (vertical flow)
const getPathD = (from, to) => {
  const fromNode = nodeMap.value[from]
  const toNode = nodeMap.value[to]
  if (!fromNode || !toNode) return ''
  const x1 = fromNode.x
  const y1 = fromNode.y
  const x2 = toNode.x
  const y2 = toNode.y
  const midY = (y1 + y2) / 2
  return `M ${x1},${y1} C ${x1},${midY} ${x2},${midY} ${x2},${y2}`
}

const isActiveNode = (node) => activeNodeIds.value.has(node.id)
const isActivePath = (path) =>
  activeNodeIds.value.has(path.from) && activeNodeIds.value.has(path.to)

// Toggle description visibility for a node
const toggleNode = (id) => {
  const next = new Set(expandedNodes.value)
  if (next.has(id)) {
    next.delete(id)
  } else {
    next.add(id)
  }
  expandedNodes.value = next
}

onMounted(async () => {
  try {
    const stored = sessionStorage.getItem('simulationResult')
    const userData = stored ? JSON.parse(stored) : {}
    const res = await getLifeMap(userData)
    lifeMap.value = res.data || res
  } catch (e) {
    error.value = '加载人生地图失败，请稍后重试'
    console.error('LifeMap load error:', e)
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
/* ===== Page & cosmic background ===== */
.life-map-page {
  min-height: 100vh;
  color: var(--text-primary, #ffffff);
  font-family: 'PingFang SC', 'Microsoft YaHei', -apple-system, sans-serif;
}

/* ===== Content layout ===== */
.map-content {
  max-width: 960px;
  margin: 0 auto;
  padding: 40px 24px 60px;
}

/* ===== Page header ===== */
.page-header {
  text-align: center;
  margin-bottom: 28px;
}

.page-subtitle {
  color: var(--text-secondary, rgba(255, 255, 255, 0.6));
  font-size: 15px;
  margin: 0;
}

/* ===== Glass card ===== */
.glass-card {
  background: var(--bg-card, rgba(20, 20, 40, 0.55));
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid var(--border-glow, rgba(138, 99, 255, 0.15));
  border-radius: 16px;
  padding: 20px;
}

/* ===== Loading & error ===== */
.loading-wrap {
  text-align: center;
  padding: 60px 20px;
}

.loader {
  width: 48px;
  height: 48px;
  border: 3px solid rgba(138, 99, 255, 0.2);
  border-top-color: #8a63ff;
  border-radius: 50%;
  margin: 0 auto 16px;
  animation: spin 1s linear infinite;
}

.loading-text {
  color: var(--text-secondary, rgba(255, 255, 255, 0.6));
  font-size: 15px;
  margin: 0;
}

.error-wrap {
  text-align: center;
  padding: 48px 20px;
}

.error-text {
  color: #ff6b6b;
  font-size: 16px;
  margin: 0 0 20px;
}

/* ===== Legend ===== */
.legend {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
  margin-bottom: 20px;
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.legend:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-card-hover, 0 12px 40px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(138, 99, 255, 0.2), 0 0 30px rgba(138, 99, 255, 0.15));
}

.legend-title {
  font-size: 14px;
  color: var(--text-secondary, rgba(255, 255, 255, 0.6));
  font-weight: 600;
  white-space: nowrap;
  letter-spacing: 0.5px;
}

.legend-items {
  display: flex;
  flex-wrap: wrap;
  gap: 18px;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 6px;
}

.legend-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  flex-shrink: 0;
}

.legend-label {
  font-size: 13px;
  color: var(--text-primary, rgba(255, 255, 255, 0.85));
}

/* ===== SVG wrapper (scrollable) ===== */
.svg-wrapper {
  overflow: auto;
  padding: 24px 16px;
  margin-bottom: 20px;
  max-height: 78vh;
  position: relative;
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  box-shadow: var(--shadow-card, 0 4px 24px rgba(0, 0, 0, 0.35), 0 0 0 1px rgba(138, 99, 255, 0.08));
}

.svg-wrapper:hover {
  box-shadow: var(--shadow-card-hover, 0 12px 40px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(138, 99, 255, 0.2), 0 0 30px rgba(138, 99, 255, 0.15));
}

.life-map-svg {
  display: block;
  width: 100%;
  min-width: 640px;
  height: auto;
  margin: 0 auto;
}

/* ===== Connection paths ===== */
.map-path {
  stroke-width: 2.5;
  opacity: 0.45;
  transition: opacity 0.3s ease, stroke-width 0.3s ease;
}

.map-path.path-active {
  stroke-width: 4;
  opacity: 1;
  stroke-dasharray: 8 4;
  animation: dashFlow 1s linear infinite;
  filter: drop-shadow(0 0 6px rgba(138, 99, 255, 0.5));
}

/* ===== Nodes ===== */
.map-node {
  cursor: pointer;
}

.node-glow-ring {
  opacity: 0.15;
  animation: pulse 2.5s ease-in-out infinite;
  transform-origin: center;
  transform-box: fill-box;
}

.node-outer {
  stroke: rgba(255, 255, 255, 0.25);
  stroke-width: 1.5;
  transition: stroke 0.3s ease, stroke-width 0.3s ease;
}

.node-inner {
  fill: #0d0d22;
  pointer-events: none;
}

.map-node:hover .node-outer {
  stroke: rgba(255, 255, 255, 0.55);
  stroke-width: 2.5;
}

.map-node.node-expanded .node-outer {
  stroke: rgba(255, 255, 255, 0.6);
  stroke-width: 3;
}

.node-icon {
  font-size: 26px;
  pointer-events: none;
  user-select: none;
}

.node-label {
  font-size: 14px;
  font-weight: 600;
  fill: var(--text-primary, #ffffff);
  pointer-events: none;
  user-select: none;
  letter-spacing: 0.3px;
}

.node-prob-bg {
  opacity: 0.25;
  pointer-events: none;
}

.node-prob-text {
  font-size: 11px;
  font-weight: 700;
  fill: var(--text-primary, #ffffff);
  pointer-events: none;
  user-select: none;
}

/* ===== Expanded description card (inside foreignObject) ===== */
.node-desc-card {
  background: rgba(13, 13, 34, 0.96);
  border: 1.5px solid;
  border-radius: 10px;
  padding: 10px 12px;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.88);
  line-height: 1.6;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.6);
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  overflow-y: auto;
  word-wrap: break-word;
}

.node-desc-type {
  font-size: 11px;
  font-weight: 700;
  margin-bottom: 4px;
  letter-spacing: 0.5px;
}

.node-desc-text {
  word-break: break-word;
}

/* ===== Summary ===== */
.summary {
  text-align: center;
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.summary:hover {
  transform: translateY(-3px);
  box-shadow: var(--shadow-card-hover, 0 12px 40px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(138, 99, 255, 0.2), 0 0 30px rgba(138, 99, 255, 0.15));
}

.summary-title {
  font-size: 16px;
  font-weight: 700;
  margin: 0 0 10px;
  color: var(--text-primary, #ffffff);
  letter-spacing: 0.5px;
}

.summary-text {
  font-size: 14px;
  line-height: 1.8;
  color: var(--text-secondary, rgba(255, 255, 255, 0.7));
  margin: 0;
}

/* ===== Animations ===== */
.fade-in-up {
  animation: fadeInUp 0.6s ease both;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

@keyframes pulse {
  0%,
  100% {
    opacity: 0.12;
    transform: scale(1);
  }
  50% {
    opacity: 0.28;
    transform: scale(1.12);
  }
}

@keyframes dashFlow {
  to {
    stroke-dashoffset: -12;
  }
}

/* Staggered animation delays */
.page-header {
  animation-delay: 0s;
}
.legend {
  animation-delay: 0.1s;
}
.svg-wrapper {
  animation-delay: 0.2s;
}
.summary {
  animation-delay: 0.3s;
}

/* ===== Responsive ===== */
@media (max-width: 768px) {
  .map-content {
    padding: 20px 12px 40px;
  }

  .page-subtitle {
    font-size: 13px;
  }

  .legend {
    gap: 10px;
    padding: 14px 16px;
  }

  .legend-items {
    gap: 12px;
  }

  .svg-wrapper {
    padding: 16px 8px;
  }

  .summary-text {
    font-size: 13px;
  }
}
</style>
