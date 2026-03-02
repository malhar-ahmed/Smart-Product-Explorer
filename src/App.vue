<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { Product } from './types/Product'

const products = ref<Product[]>([])
const loading = ref(true)

onMounted(async () => {
  const res = await fetch('https://dummyjson.com/products')
  const data = await res.json()
  products.value = data.products
  loading.value = false
})
</script>

<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-4">Smart Product Explorer</h1>

    <div v-if="loading">Loading...</div>

    <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div
        v-for="product in products"
        :key="product.id"
        class="border p-4 rounded shadow"
      >
        <img :src="product.thumbnail" class="h-40 w-full object-cover mb-2" />
        <h2 class="font-bold">{{ product.title }}</h2>
        <p>${{ product.price }}</p>
      </div>
    </div>
  </div>
</template>