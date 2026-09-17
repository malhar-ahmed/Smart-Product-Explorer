<script setup lang="ts">
import {
  ref,
  onMounted,
  watch
} from 'vue'

import {
  useRouter
} from 'vue-router'

import {
  useCart
} from './composables/useCart'

const isDark = ref(false)

const router = useRouter()

const {
  cartCount
} = useCart()

onMounted(() => {
  const saved =
    localStorage.getItem('dark')

  if (
    saved === '1' ||
    (
      !saved &&
      window.matchMedia(
        '(prefers-color-scheme: dark)'
      ).matches
    )
  ) {
    isDark.value = true
  }
})

const toggleDark = () => {
  isDark.value = !isDark.value

  localStorage.setItem(
    'dark',
    isDark.value ? '1' : '0'
  )
}

watch(
  isDark,

  (val) => {
    document.documentElement
      .classList
      .toggle('dark', val)
  },

  {
    immediate: true
  }
)

const navigate = (
  path: string
) => {
  router.push(path)
}
</script>

<template>
  <div
    class="min-h-screen
           bg-slate-50
           dark:bg-[#020617]
           text-slate-900
           dark:text-white
           transition-colors
           duration-500"
  >

    <!-- NAVIGATION -->
    <nav
      class="sticky top-0 z-50
             w-full
             bg-white
             dark:bg-[#020617]
             border-b
             border-slate-200
             dark:border-white/10
             shadow-sm"
    >
      <div
        class="max-w-7xl mx-auto
               px-6 h-20
               flex items-center
               justify-between"
      >

        <!-- LOGO -->
        <div
          class="flex items-center
                 gap-3 cursor-pointer
                 group"
          @click="navigate('/')"
        >
          <div
            class="w-10 h-10
                   bg-blue-600
                   rounded-xl
                   flex items-center
                   justify-center
                   text-white
                   font-black
                   text-lg
                   shadow-lg
                   shadow-blue-600/20
                   group-hover:scale-110
                   transition-transform"
          >
            SE
          </div>

          <span
            class="text-2xl
                   font-black
                   tracking-tighter
                   uppercase italic"
          >
            Smart
            <span class="text-blue-600">
              Explorer
            </span>
          </span>
        </div>

        <!-- RIGHT NAV -->
        <div
          class="flex items-center gap-8"
        >

          <!-- LOGIN -->
          <div
            class="hidden md:flex
                   gap-8
                   text-[11px]
                   font-black
                   uppercase
                   tracking-widest
                   text-slate-500
                   dark:text-slate-400"
          >
            <button
              @click="navigate('/login')"
              class="hover:text-blue-600
                     cursor-pointer
                     transition-colors"
            >
              Login
            </button>

            <button
              @click="navigate('/login')"
              class="px-6 py-2.5
                     bg-slate-900
                     dark:bg-white
                     dark:text-slate-900
                     text-white
                     rounded-xl
                     hover:scale-105
                     active:scale-95
                     transition-all
                     cursor-pointer"
            >
              Signup
            </button>
          </div>

          <div
            class="flex items-center
                   gap-4
                   border-l
                   border-slate-200
                   dark:border-white/10
                   pl-6"
          >

            <!-- DARK MODE -->
            <button
              @click="toggleDark"
              class="p-2 cursor-pointer
                     text-xl
                     hover:scale-110
                     transition-transform"
            >
              {{ isDark ? '☀️' : '🌙' }}
            </button>

            <!-- CART -->
            <button
              @click="navigate('/cart')"
              class="relative p-2
                     cursor-pointer group"
              aria-label="Open shopping cart"
            >
              <span
                class="text-2xl
                       group-hover:rotate-12
                       transition-transform
                       inline-block"
              >
                🛒
              </span>

              <span
                class="absolute
                       -top-1 -right-1
                       min-w-5 h-5
                       px-1
                       bg-blue-600
                       text-white
                       text-[10px]
                       font-bold
                       rounded-full
                       flex items-center
                       justify-center
                       border-2
                       border-white
                       dark:border-[#020617]"
              >
                {{ cartCount }}
              </span>
            </button>

          </div>
        </div>
      </div>
    </nav>

    <!-- CURRENT PAGE -->
    <main
      class="max-w-7xl
             mx-auto
             px-6
             py-12
             min-h-[70vh]"
    >
      <router-view />
    </main>

    <!-- FOOTER -->
    <footer
      class="bg-white
             dark:bg-[#01040f]
             border-t
             border-slate-200
             dark:border-white/5
             pt-20 pb-12
             mt-20"
    >
      <div
        class="max-w-7xl
               mx-auto
               px-6
               text-center"
      >
        <div
          class="grid
                 grid-cols-1
                 md:grid-cols-4
                 gap-16
                 mb-16
                 text-left"
        >

          <!-- BRAND -->
          <div>
            <div
              @click="navigate('/')"
              class="flex items-center
                     gap-3 mb-8
                     cursor-pointer
                     group"
            >
              <div
                class="w-10 h-10
                       bg-blue-600
                       rounded-xl
                       flex items-center
                       justify-center
                       text-white
                       font-black
                       text-lg
                       group-hover:rotate-12
                       transition-transform"
              >
                SE
              </div>

              <span
                class="text-2xl
                       font-black
                       tracking-tighter
                       dark:text-white
                       italic uppercase"
              >
                Smart
                <span class="text-blue-600">
                  Explorer
                </span>
              </span>
            </div>

            <p
              class="text-slate-500
                     dark:text-slate-400
                     text-sm
                     leading-relaxed
                     font-medium"
            >
              Your premium destination for
              the latest gadgets, vehicles,
              and lifestyle products.
              Quality guaranteed.
            </p>
          </div>

          <!-- SHOP -->
          <div>
            <h4
              class="font-black
                     text-slate-900
                     dark:text-white
                     mb-8 uppercase
                     tracking-[0.2em]
                     text-[10px]"
            >
              Shop
            </h4>

            <ul
              class="space-y-4
                     text-sm
                     font-bold
                     text-slate-400"
            >
              <li>
                <router-link
                  to="/"
                  class="hover:text-blue-500
                         transition-colors
                         block py-1"
                >
                  All Products
                </router-link>
              </li>

              <li>
                <router-link
                  to="/"
                  class="hover:text-blue-500
                         transition-colors
                         block py-1"
                >
                  Featured Items
                </router-link>
              </li>
            </ul>
          </div>

          <!-- SUPPORT -->
          <div>
            <h4
              class="font-black
                     text-slate-900
                     dark:text-white
                     mb-8 uppercase
                     tracking-[0.2em]
                     text-[10px]"
            >
              Support
            </h4>

            <ul
              class="space-y-4
                     text-sm
                     font-bold
                     text-slate-400"
            >
              <li>
                <router-link
                  to="/contact"
                  class="hover:text-blue-500
                         transition-colors
                         block py-1"
                >
                  Contact Us
                </router-link>
              </li>

              <li>
                <router-link
                  to="/faq"
                  class="hover:text-blue-500
                         transition-colors
                         block py-1"
                >
                  FAQ
                </router-link>
              </li>
            </ul>
          </div>

          <!-- SOCIAL -->
          <div>
            <h4
              class="font-black
                     text-slate-900
                     dark:text-white
                     mb-8 uppercase
                     tracking-[0.2em]
                     text-[10px]"
            >
              Socials
            </h4>

            <div class="flex gap-4">
              <a
                href="#"
                class="w-12 h-12
                       rounded-2xl
                       bg-slate-50
                       dark:bg-white/5
                       flex items-center
                       justify-center
                       hover:bg-blue-600
                       hover:text-white
                       transition-all
                       font-bold"
              >
                FB
              </a>

              <a
                href="#"
                class="w-12 h-12
                       rounded-2xl
                       bg-slate-50
                       dark:bg-white/5
                       flex items-center
                       justify-center
                       hover:bg-blue-600
                       hover:text-white
                       transition-all
                       font-bold"
              >
                IG
              </a>
            </div>
          </div>

        </div>

        <div
          class="pt-10
                 border-t
                 border-slate-100
                 dark:border-white/5"
        >
          <p
            class="text-[10px]
                   font-black
                   uppercase
                   tracking-[0.3em]
                   text-slate-500"
          >
            &copy; 2026 SmartExplorer.
            All rights reserved.
          </p>
        </div>
      </div>
    </footer>

  </div>
</template>