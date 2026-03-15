<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue'
import type { Product, ProductResponse } from '../types/Product'
import ProductCard from '../components/ProductCard.vue'

const products = ref<Product[]>([])
const search = ref('')
const loading = ref(true)

const currentPage = ref(1)
const itemsPerPage = 20

onMounted(async () => {
  try {
    const res = await fetch('https://dummyjson.com/products?limit=194')
    const data: ProductResponse = await res.json()
    products.value = data.products
  } catch (error) {
    console.error(error)
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

const totalPages = computed(() => Math.ceil(filteredProducts.value.length / itemsPerPage))

const paginatedProducts = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return filteredProducts.value.slice(start, end)
})

watch(search, () => {
  currentPage.value = 1
})
</script>

<template>
  <div class="animate-in fade-in duration-500">
    <div class="py-10 text-center">
      <h1 class="text-4xl font-black mb-6 bg-linear-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent italic">
        Find Your Style
      </h1>
      <div class="relative max-w-xl mx-auto mb-4">
        <input
          v-model="search"
          type="text"
          placeholder="Search products..."
          class="w-full px-6 py-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl focus:ring-2 focus:ring-blue-500 dark:text-white outline-none transition-all"
        />
      </div>
      <p v-if="!loading" class="text-slate-400 text-sm font-medium">
        Showing {{ filteredProducts.length }} products
      </p>
    </div>

    <div v-if="loading" class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      <div v-for="i in 10" :key="i" class="aspect-[4/5] bg-slate-200 dark:bg-slate-800 animate-pulse rounded-2xl"></div>
    </div>

    <div v-else-if="paginatedProducts.length > 0">
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mb-10">
        <ProductCard v-for="p in paginatedProducts" :key="p.id" :product="p" />
      </div>

      <div v-if="totalPages > 1" class="flex justify-center items-center gap-2 py-8 border-t border-slate-200 dark:border-slate-800">
        <button 
          @click="currentPage--" 
          :disabled="currentPage === 1"
          class="px-4 py-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-50 transition-colors dark:text-white"
        >
          Previous
        </button>
        
        <div class="flex gap-1">
          <button 
            v-for="page in totalPages" 
            :key="page"
            @click="currentPage = page"
            :class="[
              'w-10 h-10 rounded-lg font-bold transition-all',
              currentPage === page 
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30' 
                : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 dark:text-white hover:bg-slate-50'
            ]"
          >
            {{ page }}
          </button>
        </div>

        <button 
          @click="currentPage++" 
          :disabled="currentPage === totalPages"
          class="px-4 py-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-50 transition-colors dark:text-white"
        >
          Next
        </button>
      </div>
    </div>

    <div v-else class="text-center py-20 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-3xl">
      <p class="text-xl text-slate-400 font-medium italic">No results for "{{ search }}"</p>
    </div>
  </div>
</template>