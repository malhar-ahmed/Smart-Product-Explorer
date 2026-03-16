<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import ProductCard from '../components/ProductCard.vue'

const route = useRoute()
const router = useRouter()
const product = ref<any>(null)
const relatedProducts = ref<any[]>([])
const loading = ref(true)
const activeImage = ref('')

const fetchData = async () => {
  loading.value = true
  try {
    const res = await fetch(`https://dummyjson.com/products/${route.params.id}`)
    const data = await res.json()
    product.value = data
    activeImage.value = data.thumbnail

    const relatedRes = await fetch(`https://dummyjson.com/products/category/${data.category}`)
    const relatedData = await relatedRes.json()
    relatedProducts.value = relatedData.products.filter((p: any) => p.id !== data.id).slice(0, 5)
  } catch (err) {
    console.error(err)
  } finally {
    loading.value = false
  }
}

onMounted(fetchData)
watch(() => route.params.id, fetchData)
</script>

<template>
  <div class="max-w-6xl mx-auto pb-20">
    <button @click="router.back()" class="mb-8 flex items-center gap-2 text-slate-500 hover:text-blue-600 font-bold group transition-colors">
      <span class="group-hover:-translate-x-1 transition-transform">←</span> Back to Explore
    </button>

    <div v-if="loading" class="animate-pulse flex flex-col md:flex-row gap-12">
      <div class="w-full md:w-1/2 aspect-square bg-slate-200 dark:bg-slate-800 rounded-[3rem]"></div>
      <div class="flex-1 space-y-6 pt-10">
        <div class="h-12 bg-slate-200 dark:bg-slate-800 rounded-2xl w-3/4"></div>
        <div class="h-32 bg-slate-200 dark:bg-slate-800 rounded-2xl w-full"></div>
      </div>
    </div>

    <div v-else-if="product" class="space-y-20">
      <div class="flex flex-col md:flex-row gap-12 items-start">
        <div class="w-full md:w-1/2 space-y-6">
          <div class="aspect-square bg-white dark:bg-slate-900 rounded-[3rem] flex items-center justify-center p-12 border border-slate-100 dark:border-slate-800 shadow-2xl shadow-blue-500/5">
            <img :src="activeImage" class="max-w-full max-h-full object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.1)] dark:drop-shadow-[0_20px_50px_rgba(255,255,255,0.05)] transition-all duration-500" />
          </div>
          <div class="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
            <button v-for="(img, i) in product.images" :key="i" @click="activeImage = img"
              :class="['w-24 h-24 rounded-2xl p-3 border-2 transition-all flex-shrink-0 bg-white dark:bg-slate-900', activeImage === img ? 'border-blue-600 scale-95 shadow-lg' : 'border-transparent opacity-50 hover:opacity-100']">
              <img :src="img" class="w-full h-full object-contain" />
            </button>
          </div>
        </div>

        <div class="flex-1 bg-white dark:bg-slate-900 p-10 rounded-[3rem] border border-slate-100 dark:border-slate-800 shadow-xl self-stretch flex flex-col">
          <div class="mb-8">
            <span class="px-4 py-1.5 rounded-full text-[11px] font-black uppercase tracking-widest bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
              {{ product.category }}
            </span>
            <h1 class="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mt-6 mb-4 tracking-tighter">{{ product.title }}</h1>
            <div class="flex items-center gap-3">
              <div class="flex text-amber-400 text-xl">
                <span v-for="i in 5" :key="i">{{ i <= Math.round(product.rating) ? '★' : '☆' }}</span>
              </div>
              <span class="text-sm font-black text-slate-400 tracking-wide">{{ product.rating }} Rating</span>
            </div>
          </div>

          <p class="text-lg text-slate-500 dark:text-slate-400 leading-relaxed mb-10">
            {{ product.description }}
          </p>

          <div class="mt-auto space-y-8">
            <div class="flex items-end justify-between">
              <div>
                <p class="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Price</p>
                <span class="text-5xl font-black text-slate-900 dark:text-white tracking-tighter">${{ product.price }}</span>
              </div>
              <span v-if="product.stock < 10" class="px-4 py-2 rounded-xl bg-red-50 dark:bg-red-900/20 text-red-500 text-xs font-black uppercase animate-pulse">
                Low Stock: {{ product.stock }}
              </span>
            </div>
            
            <button class="w-full py-6 bg-slate-900 dark:bg-blue-600 hover:scale-[1.02] text-white font-black rounded-[2rem] shadow-2xl transition-all active:scale-95 uppercase tracking-widest text-sm">
              Add to Shopping Bag
            </button>
          </div>
        </div>
      </div>

      <div v-if="relatedProducts.length > 0" class="pt-10">
        <div class="flex items-center justify-between mb-10">
          <h3 class="text-3xl font-black dark:text-white tracking-tighter italic">Similar Finds</h3>
          <div class="h-[2px] flex-1 bg-slate-100 dark:bg-slate-800 ml-8"></div>
        </div>
        <div class="grid grid-cols-2 md:grid-cols-5 gap-6">
          <ProductCard v-for="rp in relatedProducts" :key="rp.id" :product="rp" />
        </div>
      </div>
    </div>
  </div>
</template>