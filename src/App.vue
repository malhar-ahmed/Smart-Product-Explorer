<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'

const isDark = ref(false)

onMounted(() => {
  if (localStorage.getItem('dark') === '1') isDark.value = true
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
  <div class="min-h-screen transition-colors duration-300">
    <nav class="sticky top-0 z-50 w-full border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md">
      <div class="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <span class="text-xl font-bold dark:text-white">Smart<span class="text-blue-600">Explorer</span></span>
        <button @click="toggleDark" class="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-lg">
          {{ isDark ? '☀️' : '🌙' }}
        </button>
      </div>
    </nav>
    <main class="max-w-7xl mx-auto p-6">
      <router-view></router-view>
    </main>
  </div>
</template>