<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue'
import type { Product, ProductResponse } from '../types/Product'
import ProductCard from '../components/ProductCard.vue'

// Conversion rate: 1 USD = 300 LKR
const LKR_RATE = 300

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
    categories.value = cData.map((c: any) => typeof c === 'object' ? c.slug : c)
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

const visiblePages = computed(() => {
  if (!totalPages.value || totalPages.value <= 0) return []
  const range = 2
  const start = Math.max(1, currentPage.value - range)
  const end = Math.min(totalPages.value, currentPage.value + range)
  let pages: number[] = []
  for (let i = start; i <= end; i++) pages.push(i)
  return pages
})

const paginatedProducts = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  // We map the products to include the LKR price calculation
  return processedProducts.value.slice(start, start + itemsPerPage).map(p => ({
    ...p,
    lkrPrice: Math.round(p.price * LKR_RATE)
  }))
})

watch([search, selectedCategory, sortBy], () => {
  currentPage.value = 1
})
</script>

<template>
  <div class="animate-in fade-in duration-700">
    <div class="py-16 text-center">
      <h1 class="text-5xl font-black mb-4 tracking-tighter text-slate-900 dark:text-white">
        Explore <span class="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-indigo-400 italic">Everything.</span>
      </h1>
      <p class="text-slate-500 dark:text-slate-400 mb-10 font-medium">Find your next favorite gadget or vehicle today.</p>
      
      <div class="max-w-2xl mx-auto space-y-4 px-4">
        <input v-model="search" type="text" placeholder="Search products..." 
          class="w-full px-8 py-5 rounded-4xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl focus:ring-2 focus:ring-blue-500 outline-none text-lg transition-all dark:text-white" />

        <div class="flex flex-wrap justify-center gap-3">
          <select v-model="selectedCategory" class="px-4 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-sm outline-none capitalize dark:text-white">
            <option value="">All Categories</option>
            <option v-for="cat in categories" :key="cat" :value="cat">{{ cat.replace(/-/g, ' ') }}</option>
          </select>
          <select v-model="sortBy" class="px-4 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-sm outline-none dark:text-white">
            <option value="default">Newest</option>
            <option value="low">Price: Low</option>
            <option value="high">Price: High</option>
          </select>
        </div>
      </div>
    </div>

    <div v-if="loading" class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
      <div v-for="i in 10" :key="i" class="aspect-4/5 bg-slate-200 dark:bg-slate-800 animate-pulse rounded-4xl"></div>
    </div>

    <div v-else-if="paginatedProducts?.length > 0">
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        <ProductCard v-for="p in paginatedProducts" :key="p.id" :product="p" />
      </div>

      <div v-if="totalPages > 1 && visiblePages?.length > 0" class="flex items-center justify-center gap-3 mt-16 pb-10">
        <button @click="currentPage--" :disabled="currentPage === 1"
          class="p-3 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 disabled:opacity-20 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all shadow-sm dark:text-white">
          <span class="text-xl">←</span>
        </button>

        <div class="flex items-center gap-2">
          <template v-if="visiblePages[0]! > 1">
            <button @click="currentPage = 1" class="w-10 h-10 rounded-full border border-slate-200 dark:border-slate-800 text-sm font-bold dark:text-white">1</button>
            <span class="text-slate-400 px-1">...</span>
          </template>

          <button v-for="p in visiblePages" :key="p" @click="currentPage = p"
            :class="['w-10 h-10 rounded-full font-bold transition-all flex items-center justify-center text-sm',
              currentPage === p ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30' : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 dark:text-white hover:border-blue-400']">
            {{ p }}
          </button>

          <template v-if="visiblePages[visiblePages.length - 1]! < totalPages">
            <span class="text-slate-400 px-1">...</span>
            <button @click="currentPage = totalPages" class="w-10 h-10 rounded-full border border-slate-200 dark:border-slate-800 text-sm font-bold dark:text-white">{{ totalPages }}</button>
          </template>
        </div>

        <button @click="currentPage++" :disabled="currentPage === totalPages"
          class="p-3 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 disabled:opacity-20 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all shadow-sm dark:text-white">
          <span class="text-xl">→</span>
        </button>
      </div>
    </div>

    <div v-else class="text-center py-20 italic text-slate-400">
      No products found matching your search.
    </div>
  </div>
</template>