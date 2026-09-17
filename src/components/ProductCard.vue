<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import type { Product } from '../types/Product'
import { useCart } from '../composables/useCart'

const router = useRouter()
const { addToCart } = useCart()

const { product } = defineProps<{
  product: Product
}>()

const added = ref(false)

const handleAddToCart = () => {
  addToCart(product)

  added.value = true

  setTimeout(() => {
    added.value = false
  }, 1200)
}
</script>

<template>
  <div
    @click="router.push(`/product/${product.id}`)"
    class="group bg-white dark:bg-slate-900 p-4 rounded-[2rem]
           border border-slate-200 dark:border-white/5
           hover:shadow-2xl hover:shadow-blue-500/10
           transition-all cursor-pointer flex flex-col h-full"
  >
    <div
      class="aspect-square bg-slate-50 dark:bg-white/5
             rounded-2xl flex items-center justify-center
             p-6 mb-4"
    >
      <img
        :src="product.thumbnail"
        :alt="product.title"
        class="max-w-full max-h-full object-contain
               drop-shadow-lg transition-transform
               group-hover:scale-110"
      />
    </div>

    <div class="space-y-2 flex-grow flex flex-col justify-between">
      <div>
        <h3
          class="font-bold text-slate-800 dark:text-white
                 text-sm line-clamp-1 mb-1"
        >
          {{ product.title }}
        </h3>

        <div class="flex items-center gap-1 mb-2">
          <div class="flex text-amber-400 text-xs">
            <span
              v-for="i in 5"
              :key="i"
            >
              {{
                i <= Math.round(product.rating || 0)
                  ? '★'
                  : '☆'
              }}
            </span>
          </div>

          <span class="text-[10px] font-bold text-slate-400">
            ({{ product.rating }})
          </span>
        </div>
      </div>

      <div
        class="flex items-center justify-between
               pt-2 border-t border-slate-50
               dark:border-white/5"
      >
        <p
          class="text-lg font-black text-slate-900
                 dark:text-white tracking-tighter"
        >
          Rs.
          {{
            product.lkrPrice?.toLocaleString() ||
            Math.round(product.price * 300).toLocaleString()
          }}
        </p>

        <button
          @click.stop="handleAddToCart"
          type="button"
          title="Add to cart"
          :class="[
            'w-9 h-9 rounded-full text-white flex items-center justify-center',
            'font-black shadow-lg transition-all duration-200',
            'hover:scale-110 active:scale-90',
            added
              ? 'bg-green-500 shadow-green-500/30 scale-110'
              : 'bg-blue-600 shadow-blue-500/30 hover:bg-blue-700'
          ]"
        >
          <span
            class="transition-all duration-200"
          >
            {{ added ? '✓' : '+' }}
          </span>
        </button>
      </div>

      <p
        v-if="added"
        class="text-[10px] text-green-500 font-bold
               text-right animate-pulse"
      >
        Added to cart
      </p>
    </div>
  </div>
</template>