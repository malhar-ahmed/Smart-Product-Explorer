import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import ProductDetail from '../pages/ProductDetail.vue'
import Login from '../pages/Login.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: Home },
    { path: '/product/:id', component: ProductDetail },
    { path: '/login', component: Login }
  ]
})

export default router