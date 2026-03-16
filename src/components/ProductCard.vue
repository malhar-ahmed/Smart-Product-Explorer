<script setup lang="ts">
import { useRouter } from 'vue-router'
import type { Product } from '../types/Product'

const router = useRouter()
const { product } = defineProps<{ product: Product }>()
</script>

<template>
  <div @click="router.push(`/product/${product.id}`)" 
    class="group bg-white dark:bg-slate-900 rounded-4xl p-3 border border-slate-100 dark:border-slate-800 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 cursor-pointer flex flex-col h-full">
    
    <div class="relative aspect-square overflow-hidden bg-slate-50 dark:bg-slate-800/50 rounded-3xl flex items-center justify-center p-6 mb-4">
      <img :src="product.thumbnail" class="max-w-full max-h-full object-contain drop-shadow-2xl transition-transform duration-700 group-hover:scale-110" />
    </div>
    
    <div class="px-2 pb-2 grow flex flex-col">
      <h3 class="font-bold text-slate-800 dark:text-white truncate text-sm mb-1">{{ product.title }}</h3>
      <div class="flex items-center justify-between mt-auto pt-3">
        <span class="text-lg font-black text-slate-900 dark:text-white">
          Rs. {{ product.lkrPrice?.toLocaleString() || Math.round(product.price * 300).toLocaleString() }}
        </span>
        <div class="w-8 h-8 rounded-full bg-slate-900 dark:bg-white dark:text-slate-900 text-white flex items-center justify-center text-xs">+</div>
      </div>
    </div>
  </div>
</template>