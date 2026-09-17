import {
  defineComponent
} from 'vue'

import {
  createRouter,
  createWebHistory
} from 'vue-router'

import Home from '../pages/Home.vue'
import ProductDetail from '../pages/ProductDetail.vue'
import Login from '../pages/Login.vue'
import Cart from '../pages/Cart.vue'

const Contact = defineComponent({
  name: 'ContactPage',

  template: `
    <div class="max-w-4xl mx-auto p-8">
      <h1 class="text-3xl font-bold mb-4">
        Contact Us
      </h1>

      <p class="text-slate-600 dark:text-slate-300">
        Have a question? Reach out through our
        support channels and we'll get back to
        you shortly.
      </p>
    </div>
  `
})

const FAQ = defineComponent({
  name: 'FAQPage',

  template: `
    <div class="max-w-4xl mx-auto p-8">
      <h1 class="text-3xl font-bold mb-4">
        FAQ
      </h1>

      <p class="text-slate-600 dark:text-slate-300">
        Find answers to common questions about
        orders, shipping, returns, and product
        details.
      </p>
    </div>
  `
})

const ShippingInfo = defineComponent({
  name: 'ShippingInfoPage',

  template: `
    <div class="max-w-4xl mx-auto p-8">
      <h1 class="text-3xl font-bold mb-4">
        Shipping Info
      </h1>

      <p class="text-slate-600 dark:text-slate-300">
        We offer fast shipping and transparent
        tracking for all orders.
      </p>
    </div>
  `
})

const router = createRouter({
  history: createWebHistory(),

  routes: [
    {
      path: '/',
      component: Home
    },

    {
      path: '/product/:id',
      component: ProductDetail
    },

    {
      path: '/login',
      component: Login
    },

    {
      path: '/cart',
      component: Cart
    },

    {
      path: '/contact',
      component: Contact
    },

    {
      path: '/faq',
      component: FAQ
    },

    {
      path: '/shipping',
      component: ShippingInfo
    }
  ]
})

export default router