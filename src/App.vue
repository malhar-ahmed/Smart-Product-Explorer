<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const isDark = ref(false)
const router = useRouter()
const route = useRoute()

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
          <div class="hidden md:flex items-center gap-5 text-sm font-bold">
            <button @click="router.push('/login')" class="text-slate-500 hover:text-blue-600 transition-colors">Login</button>
            <button @click="router.push('/login')" class="px-5 py-2.5 bg-slate-900 dark:bg-white dark:text-slate-900 text-white rounded-xl hover:scale-105 transition-all">Signup</button>
          </div>

          <div class="flex items-center gap-2 border-l border-slate-200 dark:border-slate-700 pl-4">
            <button class="relative p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-all">
              <span class="text-xl">🛒</span>
              <span class="absolute -top-1 -right-1 w-5 h-5 bg-blue-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white dark:border-slate-900">0</span>
            </button>
            <button @click="toggleDark" class="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 transition-all">
              {{ isDark ? '☀️' : '🌙' }}
            </button>
          </div>
        </div>
      </div>
    </nav>

    <main class="max-w-7xl mx-auto p-6 min-h-[60vh]">
      <router-view></router-view>
    </main>

    <footer class="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 pt-16 pb-8 mt-20">
      <div class="max-w-7xl mx-auto px-6">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div class="col-span-1 md:col-span-1">
            <div class="flex items-center gap-2 mb-6">
              <div class="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">SE</div>
              <span class="text-xl font-bold tracking-tight dark:text-white">Smart<span class="text-blue-600">Explorer</span></span>
            </div>
            <p class="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
              Your premium destination for the latest gadgets, vehicles, and lifestyle products. Quality guaranteed.
            </p>
          </div>

          <div>
            <h4 class="font-bold text-slate-900 dark:text-white mb-6 uppercase tracking-widest text-xs">Shop</h4>
            <ul class="space-y-4 text-sm text-slate-500 dark:text-slate-400">
              <li><a href="#" class="hover:text-blue-600 transition-colors">All Products</a></li>
              <li><a href="#" class="hover:text-blue-600 transition-colors">Featured Items</a></li>
              <li><a href="#" class="hover:text-blue-600 transition-colors">Categories</a></li>
            </ul>
          </div>

          <div>
            <h4 class="font-bold text-slate-900 dark:text-white mb-6 uppercase tracking-widest text-xs">Support</h4>
            <ul class="space-y-4 text-sm text-slate-500 dark:text-slate-400">
              <li><a href="#" class="hover:text-blue-600 transition-colors">Contact Us</a></li>
              <li><a href="#" class="hover:text-blue-600 transition-colors">FAQ</a></li>
              <li><a href="#" class="hover:text-blue-600 transition-colors">Shipping Info</a></li>
            </ul>
          </div>

          <div>
            <h4 class="font-bold text-slate-900 dark:text-white mb-6 uppercase tracking-widest text-xs">Socials</h4>
            <div class="flex gap-4">
              <a href="#" class="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all text-xs font-bold">FB</a>
              <a href="#" class="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all text-xs font-bold">IG</a>
              <a href="#" class="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all text-xs font-bold">X</a>
            </div>
          </div>
        </div>

        <div class="pt-8 border-t border-slate-100 dark:border-slate-800 text-center">
          <p class="text-xs text-slate-400 font-medium">
            &copy; 2026 SmartExplorer. Built for GUI Assignment by Ahmed M.M.M. - [EG/2023/5471]
          </p>
        </div>
      </div>
    </footer>
  </div>
</template>