<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { Product } from './types/Product'
import ProductCard from './components/ProductCard.vue'

const products = ref<Product[]>([])

onMounted(async () => {
  const res = await fetch('https://dummyjson.com/products')
  const data = await res.json()
  products.value = data.products
})
</script>

<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-4">Smart Product Explorer</h1>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <ProductCard
        v-for="p in products"
        :key="p.id"
        :product="p"
      />
    </div>
  </div>
</template>