<script setup lang="ts">
import { useRouter } from 'vue-router'
import type { Product } from '../types/Product' 

const router = useRouter()
const { product } = defineProps<{ product: Product }>()
const goToDetail = () => router.push(`/product/${product.id}`)
</script>

<template>
  <div @click="goToDetail" class="group bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 cursor-pointer">
    <div class="relative aspect-video overflow-hidden bg-slate-100 dark:bg-slate-800">
      <img :src="product.thumbnail" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
      <div class="absolute top-2 right-2">
        <span class="text-[10px] font-bold uppercase tracking-widest bg-white/90 dark:bg-slate-900/90 backdrop-blur-md px-2 py-1 rounded-lg border border-slate-200 dark:border-slate-700 dark:text-white">
          {{ product.category }}
        </span>
      </div>
    </div>
    <div class="p-5">
      <h3 class="font-bold text-slate-900 dark:text-white truncate mb-1">{{ product.title }}</h3>
      <div class="flex justify-between items-center">
        <span class="text-xl font-black text-blue-600 dark:text-blue-400">${{ product.price }}</span>
        <button class="text-xs font-bold text-blue-600 dark:text-blue-400 group-hover:underline">Details →</button>
      </div>
    </div>
  </div>
</template>