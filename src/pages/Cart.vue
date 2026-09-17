<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useCart } from '../composables/useCart'

const router = useRouter()

const {
  cartItems,
  cartCount,
  cartTotalLkr,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
  clearCart
} = useCart()

const handleCheckout = () => {
  window.alert(
    'Checkout is not implemented in this frontend project yet.'
  )
}
</script>

<template>
  <div class="max-w-5xl mx-auto pb-20">

    <!-- HEADER -->
    <div
      class="flex items-center justify-between
             gap-6 mb-10"
    >
      <div>
        <p
          class="text-[11px] font-black uppercase
                 tracking-[0.25em] text-blue-600 mb-2"
        >
          Your selection
        </p>

        <h1
          class="text-4xl md:text-5xl font-black
                 tracking-tighter dark:text-white"
        >
          Shopping Cart
        </h1>

        <p class="text-slate-500 dark:text-slate-400 mt-2">
          {{ cartCount }}
          item{{ cartCount === 1 ? '' : 's' }}
          in your cart
        </p>
      </div>

      <button
        v-if="cartItems.length"
        @click="clearCart"
        class="px-5 py-3 rounded-xl
               border border-red-200
               dark:border-red-900/40
               text-red-500 text-xs font-black
               uppercase tracking-widest
               hover:bg-red-50
               dark:hover:bg-red-950/20
               transition-colors"
      >
        Clear Cart
      </button>
    </div>

    <!-- EMPTY CART -->
    <div
      v-if="cartItems.length === 0"
      class="text-center py-24
             bg-white dark:bg-slate-900
             rounded-[3rem]
             border border-slate-200
             dark:border-slate-800"
    >
      <div class="text-6xl mb-6">
        🛒
      </div>

      <h2
        class="text-2xl font-black
               dark:text-white mb-3"
      >
        Your cart is empty
      </h2>

      <p
        class="text-slate-500
               dark:text-slate-400 mb-8"
      >
        Explore the store and add something you like.
      </p>

      <button
        @click="router.push('/')"
        class="px-8 py-4 bg-blue-600
               hover:bg-blue-700 text-white
               rounded-2xl font-black
               uppercase tracking-widest
               text-xs transition-colors"
      >
        Continue Shopping
      </button>
    </div>

    <!-- CART -->
    <div
      v-else
      class="grid lg:grid-cols-[1fr_340px]
             gap-8 items-start"
    >

      <!-- PRODUCTS -->
      <div class="space-y-4">

        <article
          v-for="item in cartItems"
          :key="item.id"
          class="bg-white dark:bg-slate-900
                 border border-slate-200
                 dark:border-slate-800
                 rounded-[2rem] p-5
                 flex flex-col sm:flex-row gap-5"
        >

          <!-- IMAGE -->
          <button
            @click="router.push(`/product/${item.id}`)"
            class="w-full sm:w-32 aspect-square
                   rounded-2xl bg-slate-50
                   dark:bg-white/5 p-4 shrink-0"
          >
            <img
              :src="item.thumbnail"
              :alt="item.title"
              class="w-full h-full object-contain"
            />
          </button>

          <!-- INFORMATION -->
          <div
            class="flex-1 flex flex-col
                   justify-between gap-5"
          >
            <div>
              <p
                class="text-[10px] font-black
                       uppercase tracking-widest
                       text-blue-600 mb-1"
              >
                {{ item.category }}
              </p>

              <h2
                class="font-black text-xl
                       text-slate-900 dark:text-white"
              >
                {{ item.title }}
              </h2>

              <p
                class="text-slate-500
                       dark:text-slate-400
                       mt-2 font-bold"
              >
                Rs.
                {{
                  Math.round(
                    item.price * 300
                  ).toLocaleString()
                }}
                each
              </p>
            </div>

            <div
              class="flex flex-wrap items-center
                     justify-between gap-4"
            >

              <!-- QUANTITY -->
              <div
                class="flex items-center rounded-xl
                       border border-slate-200
                       dark:border-slate-700
                       overflow-hidden"
              >
                <button
                  @click="decreaseQuantity(item.id)"
                  class="w-10 h-10 font-black
                         hover:bg-slate-100
                         dark:hover:bg-slate-800
                         dark:text-white"
                >
                  −
                </button>

                <span
                  class="w-12 text-center
                         font-black dark:text-white"
                >
                  {{ item.quantity }}
                </span>

                <button
                  @click="increaseQuantity(item.id)"
                  class="w-10 h-10 font-black
                         hover:bg-slate-100
                         dark:hover:bg-slate-800
                         dark:text-white"
                >
                  +
                </button>
              </div>

              <!-- TOTAL + REMOVE -->
              <div class="flex items-center gap-5">
                <span
                  class="font-black text-lg
                         dark:text-white"
                >
                  Rs.
                  {{
                    (
                      Math.round(item.price * 300) *
                      item.quantity
                    ).toLocaleString()
                  }}
                </span>

                <button
                  @click="removeFromCart(item.id)"
                  class="text-xs font-black uppercase
                         tracking-widest text-red-500
                         hover:text-red-600"
                >
                  Remove
                </button>
              </div>

            </div>
          </div>
        </article>
      </div>

      <!-- SUMMARY -->
      <aside
        class="bg-white dark:bg-slate-900
               border border-slate-200
               dark:border-slate-800
               rounded-[2rem] p-7
               sticky top-28"
      >
        <h2
          class="text-xl font-black
                 dark:text-white mb-6"
        >
          Order Summary
        </h2>

        <div class="space-y-4 text-sm">

          <div
            class="flex justify-between
                   text-slate-500
                   dark:text-slate-400"
          >
            <span>Items</span>
            <span>{{ cartCount }}</span>
          </div>

          <div
            class="flex justify-between
                   text-slate-500
                   dark:text-slate-400"
          >
            <span>Shipping</span>
            <span>Calculated later</span>
          </div>

          <div
            class="border-t border-slate-200
                   dark:border-slate-700 pt-5
                   flex justify-between items-end"
          >
            <span class="font-black dark:text-white">
              Total
            </span>

            <span
              class="text-2xl font-black
                     text-blue-600"
            >
              Rs.
              {{ cartTotalLkr.toLocaleString() }}
            </span>
          </div>
        </div>

        <button
          @click="handleCheckout"
          class="w-full mt-7 py-4
                 bg-slate-900 dark:bg-blue-600
                 text-white rounded-2xl
                 font-black uppercase
                 tracking-widest text-xs
                 hover:scale-[1.02]
                 active:scale-95
                 transition-transform"
        >
          Proceed to Checkout
        </button>

        <button
          @click="router.push('/')"
          class="w-full mt-3 py-3
                 text-slate-500
                 dark:text-slate-400
                 text-xs font-black uppercase
                 tracking-widest
                 hover:text-blue-600"
        >
          Continue Shopping
        </button>
      </aside>

    </div>
  </div>
</template>