<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const isDark = ref(false)
const router = useRouter()
const route = useRoute()
const cartCount = ref(0)

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
        <div class="flex items-center gap-2 cursor-pointer" @click="router.push('/')">
          <div class="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">SE</div>
          <span class="text-xl font-bold tracking-tight">Smart<span class="text-blue-600">Explorer</span></span>
        </div>
        
        <div class="flex items-center gap-3 sm:gap-6">
          <div class="hidden md:flex items-center gap-4 text-sm font-bold">
            <button @click="router.push('/login')" class="text-slate-500 hover:text-blue-600 transition-colors">Login</button>
            <button @click="router.push('/login')" class="px-4 py-2 bg-slate-900 dark:bg-white dark:text-slate-900 text-white rounded-xl hover:opacity-90 transition-all">Signup</button>
          </div>

          <div class="flex items-center gap-2 border-l border-slate-200 dark:border-slate-700 pl-4">
            <button class="relative p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-all">
              <span class="text-xl">🛒</span>
              <span class="absolute -top-1 -right-1 w-5 h-5 bg-blue-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white dark:border-slate-900">
                {{ cartCount }}
              </span>
            </button>
            <button @click="toggleDark" class="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 transition-all">
              {{ isDark ? '☀️' : '🌙' }}
            </button>
          </div>
        </div>
      </div>
    </nav>

    <main class="max-w-7xl mx-auto p-6">
      <router-view></router-view>
    </main>
  </div>
</template>