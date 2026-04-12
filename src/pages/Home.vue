<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue'
import type { Product, ProductResponse } from '../types/Product'
import ProductCard from '../components/ProductCard.vue'

const LKR_RATE = 300
const DISPLAY_CATEGORIES = ['vehicle', 'laptops', 'mens-watches', 'womens-watches', 'motorcycle', 'smartphones', 'tablets']

const products = ref<Product[]>([])
const categories = ref<string[]>([])
const search = ref('')
const selectedCategory = ref('')
const sortBy = ref('default')
const loading = ref(true)
const currentPage = ref(1)
const itemsPerPage = 10

onMounted(async () => {
  try {
    const [pRes, cRes] = await Promise.all([
      fetch('https://dummyjson.com/products?limit=194'),
      fetch('https://dummyjson.com/products/categories')
    ])
    const pData: ProductResponse = await pRes.json()
    const cData = await cRes.json()
    products.value = pData.products || []
    categories.value = cData
      .map((c: any) => typeof c === 'object' ? c.slug : c)
      .filter((slug: string) => DISPLAY_CATEGORIES.includes(slug))
  } catch (e) {
    console.error(e)
  } finally {
    loading.value = false
  }
})

const processedProducts = computed(() => {
  let result = [...products.value].filter(p => {
    const mSearch = p.title.toLowerCase().includes(search.value.toLowerCase())
    const mCat = !selectedCategory.value || p.category === selectedCategory.value
    return mSearch && mCat
  })
  if (sortBy.value === 'low') result.sort((a, b) => a.price - b.price)
  if (sortBy.value === 'high') result.sort((a, b) => b.price - a.price)
  return result
})

const totalPages = computed(() => Math.ceil(processedProducts.value.length / itemsPerPage))

const paginatedProducts = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  return processedProducts.value.slice(start, start + itemsPerPage).map(p => ({
    ...p,
    lkrPrice: Math.round(p.price * LKR_RATE)
  }))
})

watch([search, selectedCategory, sortBy], () => { currentPage.value = 1 })
</script>

<template>
  <div class="animate-in fade-in duration-700">
    <div class="text-center py-16 space-y-6">
      <h1 class="text-6xl font-black tracking-tighter text-slate-900 dark:text-white">
        Explore <span class="text-blue-600 italic">Everything.</span>
      </h1>
      <p class="text-slate-500 dark:text-slate-400 max-w-xl mx-auto font-medium leading-relaxed">
        Your premium destination for high-end gadgets and vehicles curated for the modern explorer.
      </p>
      
      <div class="max-w-3xl mx-auto p-3 bg-white dark:bg-slate-900 rounded-[2rem] shadow-xl border border-slate-200 dark:border-white/10 flex flex-col md:flex-row gap-3 mt-10">
        <input v-model="search" type="text" placeholder="Search for items..." 
          class="flex-1 px-6 py-3 outline-none dark:text-white bg-transparent text-lg" />
        
        <div class="flex gap-2">
          <select v-model="selectedCategory" 
            class="px-5 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 border-none text-sm font-bold outline-none capitalize dark:text-white cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
            <option value="" class="dark:bg-slate-800 text-white">Collections</option>
            <option v-for="cat in categories" :key="cat" :value="cat" class="dark:bg-slate-800 text-white">
              {{ cat.replace(/-/g, ' ') }}
            </option>
          </select>

          <select v-model="sortBy" 
            class="px-5 py-3 rounded-xl bg-blue-600 text-white text-sm font-bold outline-none cursor-pointer hover:bg-blue-700 transition-colors">
            <option value="default" class="bg-blue-600">Sort: Newest</option>
            <option value="low" class="bg-blue-600">Price: Low</option>
            <option value="high" class="bg-blue-600">Price: High</option>
          </select>
        </div>
      </div>
    </div>

    <div v-if="loading" class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
      <div v-for="i in 10" :key="i" class="aspect-[4/5] bg-slate-200 dark:bg-slate-800 animate-pulse rounded-[2.5rem]"></div>
    </div>

    <div v-else-if="paginatedProducts.length > 0">
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 mb-20">
        <ProductCard v-for="p in paginatedProducts" :key="p.id" :product="p" />
      </div>

      <div v-if="totalPages > 1" class="flex items-center justify-center gap-4 mt-20 pb-10 border-t border-slate-100 dark:border-white/5 pt-10">
        <button @click="currentPage--" :disabled="currentPage === 1" 
          class="p-4 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 disabled:opacity-30 shadow-md cursor-pointer hover:bg-slate-50 transition-all dark:text-white">
          <span class="text-xl">←</span>
        </button>
        <span class="font-black text-sm uppercase tracking-widest text-slate-400">Page {{ currentPage }} / {{ totalPages }}</span>
        <button @click="currentPage++" :disabled="currentPage === totalPages" 
          class="p-4 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 disabled:opacity-30 shadow-md cursor-pointer hover:bg-slate-50 transition-all dark:text-white">
          <span class="text-xl">→</span>
        </button>
      </div>
    </div>
  </div>
</template>