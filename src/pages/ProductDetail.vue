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
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div class="max-w-4xl mx-auto">
    <button @click="router.back()" class="mb-6 flex items-center gap-2 text-slate-500 hover:text-blue-600 transition-colors">
      <span>←</span> Back to Explorer
    </button>

    <div v-if="loading" class="animate-pulse flex flex-col md:flex-row gap-8">
      <div class="w-full md:w-1/2 aspect-square bg-slate-200 dark:bg-slate-800 rounded-3xl"></div>
      <div class="flex-1 space-y-4 py-4">
        <div class="h-8 bg-slate-200 dark:bg-slate-800 rounded w-3/4"></div>
        <div class="h-32 bg-slate-200 dark:bg-slate-800 rounded"></div>
      </div>
    </div>

    <div v-else-if="product" class="flex flex-col md:flex-row gap-8 bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-xl border border-slate-100 dark:border-slate-800">
      <div class="w-full md:w-1/2">
        <img :src="product.thumbnail" class="w-full h-full object-cover rounded-2xl shadow-inner" />
      </div>
      <div class="flex-1">
        <span class="text-xs font-bold uppercase tracking-widest text-blue-600 mb-2 block">{{ product.category }}</span>
        <h1 class="text-4xl font-bold dark:text-white mb-4">{{ product.title }}</h1>
        <p class="text-slate-600 dark:text-slate-400 leading-relaxed mb-6">{{ product.description }}</p>
        <div class="text-3xl font-black text-slate-900 dark:text-white mb-6">${{ product.price }}</div>
        <button class="w-full py-4 bg-blue-600 text-white font-bold rounded-2xl shadow-lg shadow-blue-500/30 hover:bg-blue-700 transition-all">Add to Cart</button>
      </div>
    </div>
  </div>
</template>