<script setup lang="ts">
import { useRouter } from 'vue-router'
import type { Product } from '../types/Product'

const router = useRouter()
const { product } = defineProps<{ product: Product }>()
const goToDetail = () => router.push(`/product/${product.id}`)
</script>

<template>
  <div @click="goToDetail" class="group bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col h-full">
    <div class="relative w-full aspect-square overflow-hidden bg-white dark:bg-slate-800 p-6 flex items-center justify-center border-b border-slate-50 dark:border-slate-800/50">
      <img 
        :src="product.thumbnail" 
        :alt="product.title"
        class="max-w-full max-h-full w-auto h-auto object-contain transition-transform duration-500 group-hover:scale-110" 
      />
      <div class="absolute top-3 right-3">
        <span class="text-[10px] font-bold uppercase tracking-widest bg-slate-100/80 dark:bg-slate-800/80 backdrop-blur-md px-2 py-1 rounded-lg border border-slate-200 dark:border-slate-700 dark:text-white">
          {{ product.category }}
        </span>
      </div>
    </div>
    
    <div class="p-5 flex flex-col flex-grow">
      <h3 class="font-bold text-slate-900 dark:text-white truncate mb-1 group-hover:text-blue-600 transition-colors">
        {{ product.title }}
      </h3>
      <div class="mt-auto pt-3 flex justify-between items-center">
        <span class="text-xl font-black text-blue-600 dark:text-blue-400">${{ product.price }}</span>
        <span class="text-xs font-bold text-blue-600 dark:text-blue-400 group-hover:underline">Details →</span>
      </div>
    </div>
  </div>
</template>