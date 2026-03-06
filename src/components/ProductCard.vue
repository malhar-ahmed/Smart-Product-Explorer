<script setup lang="ts">
import type { Product } from '../types/Product'

defineProps<{
  product: Product
}>()
</script>

<template>
  <div class="border p-4 rounded shadow hover:shadow-lg transition">
    <img :src="product.thumbnail" class="h-40 w-full object-cover mb-2" />
    <h2 class="font-bold">{{ product.title }}</h2>
    <p class="text-gray-500">${{ product.price }}</p>
  </div>
</template>