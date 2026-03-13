<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import type { Product } from '../types/Product' 

import ProductCard from '../components/ProductCard.vue' 

const products = ref<Product[]>([])
const search = ref('')
const loading = ref(true)

onMounted(async () => {
  try {
    const res = await fetch('https://dummyjson.com/products')
    const data = await res.json()
    // Ensure we are getting the array correctly
    products.value = data.products || [] 
  } catch (error) {
    console.error("Fetch failed", error)
  } finally {
    loading.value = false
  }
})

const filteredProducts = computed(() =>
  products.value.filter((p: Product) =>
    p.title.toLowerCase().includes(search.value.toLowerCase()) ||
    p.category.toLowerCase().includes(search.value.toLowerCase())
  )
)
</script>

<template>
  <div class="animate-in fade-in duration-500">
    <div class="py-10 text-center">
      <h1 class="text-4xl font-black mb-6 bg-linear-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent italic">
        Find Your Style
      </h1>
      <div class="relative max-w-xl mx-auto">
        <input
          v-model="search"
          type="text"
          placeholder="Search products..."
          class="w-full px-6 py-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl focus:ring-2 focus:ring-blue-500 dark:text-white outline-none transition-all"
        />
      </div>
    </div>

    <div v-if="loading" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="i in 6" :key="i" class="h-64 bg-slate-200 dark:bg-slate-800 animate-pulse rounded-2xl"></div>
    </div>

    <div v-else-if="filteredProducts.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <ProductCard 
        v-for="p in filteredProducts" 
        :key="p.id" 
        :product="p" 
      />
    </div>

    <div v-else class="text-center py-20 bg-slate-100/50 dark:bg-slate-900/50 rounded-3xl border-2 border-dashed border-slate-200 dark:border-slate-800">
      <p class="text-xl text-slate-400 font-medium italic">No results for "{{ search }}"</p>
      <button @click="search = ''" class="mt-4 text-blue-600 font-bold hover:underline">Clear search</button>
    </div>
  </div>
</template>