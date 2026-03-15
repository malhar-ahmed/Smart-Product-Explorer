<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'

const isDark = ref(false)

onMounted(() => {
  const saved = localStorage.getItem('dark')
  if (saved === '1' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    isDark.value = true
  }
})

const toggleDark = () => {
  isDark.value = !isDark.value
  localStorage.setItem('dark', isDark.value ? '1' : '0')
}

watch(isDark, (val) => {
  document.documentElement.classList.toggle('dark', val)
}, { immediate: true })
</script>

<template>
  <div class="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-500">
    <nav class="sticky top-0 z-50 w-full border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md">
      <div class="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <div class="flex items-center gap-2">
          <div class="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">SE</div>
          <span class="text-xl font-bold tracking-tight">Smart<span class="text-blue-600">Explorer</span></span>
        </div>
        <button @click="toggleDark" class="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:ring-2 ring-blue-500/50 transition-all">
          {{ isDark ? '☀️' : '🌙' }}
        </button>
      </div>
    </nav>
    <main class="max-w-7xl mx-auto p-6">
      <router-view></router-view>
    </main>
  </div>
</template>