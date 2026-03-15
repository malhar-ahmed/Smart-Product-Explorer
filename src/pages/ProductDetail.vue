<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import type { Product } from '../types/Product'

const route = useRoute()
const router = useRouter()
const product = ref<Product | null>(null)
const loading = ref(true)

onMounted(async () => {
  try {
    const res = await fetch(`https://dummyjson.com/products/${route.params.id}`)
    product.value = await res.json()
  } catch (error) {
    console.error(error)
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div class="max-w-5xl mx-auto">
    <button @click="router.back()" class="mb-8 flex items-center gap-2 text-slate-500 hover:text-blue-600 font-medium transition-colors group">
      <span class="group-hover:-translate-x-1 transition-transform">←</span> Back to Explorer
    </button>

    <div v-if="loading" class="animate-pulse flex flex-col md:flex-row gap-10">
      <div class="w-full md:w-1/2 aspect-square bg-slate-200 dark:bg-slate-800 rounded-3xl"></div>
      <div class="flex-1 space-y-6 py-4">
        <div class="h-10 bg-slate-200 dark:bg-slate-800 rounded-xl w-3/4"></div>
        <div class="h-40 bg-slate-200 dark:bg-slate-800 rounded-xl"></div>
      </div>
    </div>

    <div v-else-if="product" class="flex flex-col md:flex-row gap-10 bg-white dark:bg-slate-900 p-8 rounded-[2rem] shadow-xl border border-slate-100 dark:border-slate-800">
      <div class="w-full md:w-1/2 aspect-square bg-slate-50 dark:bg-slate-800/50 rounded-2xl flex items-center justify-center p-8">
        <img :src="product.thumbnail" :alt="product.title" class="max-w-full max-h-full object-contain drop-shadow-2xl" />
      </div>
      
      <div class="flex-1 flex flex-col justify-center">
        <span class="inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 mb-4 w-fit">
          {{ product.category }}
        </span>
        <h1 class="text-4xl font-black text-slate-900 dark:text-white mb-4">{{ product.title }}</h1>
        <p class="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-8">{{ product.description }}</p>
        <div class="flex items-center justify-between mb-8">
          <div class="text-4xl font-black text-slate-900 dark:text-white">${{ product.price }}</div>
          <div class="flex items-center gap-1 text-amber-500">
            <span class="text-lg font-bold">{{ product.rating }}</span>
            <span class="text-xl">★</span>
          </div>
        </div>
        <button class="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl shadow-lg shadow-blue-500/25 transition-all active:scale-95">
          Add to Cart
        </button>
      </div>
    </div>
  </div>
</template>