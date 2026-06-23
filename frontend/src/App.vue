<template>
  <div class="cosmic-bg"></div>
  <div class="stars" ref="starsContainer"></div>
  <router-view v-slot="{ Component }">
    <transition name="page" mode="out-in">
      <component :is="Component" />
    </transition>
  </router-view>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const starsContainer = ref(null)

onMounted(() => {
  const container = starsContainer.value
  const starCount = 120
  const colors = ['#ffffff', '#ffffff', '#ffffff', '#a0a0ff', '#ffd0a0', '#a0d0ff']
  for (let i = 0; i < starCount; i++) {
    const star = document.createElement('div')
    star.className = 'star'
    const size = Math.random() * 2.5 + 0.5
    star.style.width = `${size}px`
    star.style.height = `${size}px`
    star.style.left = `${Math.random() * 100}%`
    star.style.top = `${Math.random() * 100}%`
    star.style.setProperty('--duration', `${Math.random() * 3 + 2}s`)
    star.style.animationDelay = `${Math.random() * 3}s`
    const color = colors[Math.floor(Math.random() * colors.length)]
    star.style.background = color
    if (size > 2) {
      star.style.boxShadow = `0 0 ${size * 3}px ${color}`
    }
    container.appendChild(star)
  }
})
</script>

<style>
.page-enter-active {
  transition: opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1), transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}
.page-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}
.page-enter-from {
  opacity: 0;
  transform: translateY(24px) scale(0.99);
}
.page-leave-to {
  opacity: 0;
  transform: translateY(-12px) scale(0.99);
}
</style>
