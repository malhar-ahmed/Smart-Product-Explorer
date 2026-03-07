<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import type { Product } from './types/Product'
import ProductCard from './components/ProductCard.vue'

const products = ref<Product[]>([])
const search = ref('')

onMounted(async () => {
  const res = await fetch('https://dummyjson.com/products')
  const data = await res.json()
  products.value = data.products
})

const filteredProducts = computed(() =>
  products.value.filter(p =>
    p.title.toLowerCase().includes(search.value.toLowerCase())
  )
)
const toggleDark = () => {
  document.documentElement.classList.toggle('dark')
}

</script>

<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-4">Smart Product Explorer</h1>
    <input
      v-model="search"
      placeholder="Search products..."
      class="border p-2 mb-4 w-full"
    />
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <ProductCard
        v-for="p in filteredProducts"
        :key="p.id"
        :product="p"
      />
    </div>
  </div>
  <button
  @click="toggleDark"
  class="mb-4 px-4 py-2 bg-black text-white">
    Toggle Dark Mode
  </button>
</template>