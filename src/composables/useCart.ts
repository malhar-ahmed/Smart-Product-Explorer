import { computed, ref, watch } from 'vue'
import type { Product } from '../types/Product'

export interface CartItem extends Product {
  quantity: number
}

const STORAGE_KEY = 'smart-explorer-cart'

const loadCart = (): CartItem[] => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved ? JSON.parse(saved) : []
  } catch {
    return []
  }
}

const cartItems = ref<CartItem[]>(loadCart())

watch(
  cartItems,
  (items) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  },
  { deep: true }
)

const cartCount = computed(() =>
  cartItems.value.reduce((total, item) => total + item.quantity, 0)
)

const cartTotalLkr = computed(() =>
  cartItems.value.reduce(
    (total, item) => total + Math.round(item.price * 300) * item.quantity,
    0
  )
)

const addToCart = (product: Product) => {
  const existing = cartItems.value.find((item) => item.id === product.id)

  if (existing) {
    const maxQuantity = product.stock ?? Infinity
    if (existing.quantity < maxQuantity) {
      existing.quantity += 1
    }
    return
  }

  cartItems.value.push({ ...product, quantity: 1 })
}

const increaseQuantity = (productId: number) => {
  const item = cartItems.value.find((cartItem) => cartItem.id === productId)
  if (!item) return

  const maxQuantity = item.stock ?? Infinity
  if (item.quantity < maxQuantity) {
    item.quantity += 1
  }
}

const decreaseQuantity = (productId: number) => {
  const item = cartItems.value.find((cartItem) => cartItem.id === productId)
  if (!item) return

  if (item.quantity <= 1) {
    removeFromCart(productId)
  } else {
    item.quantity -= 1
  }
}

const removeFromCart = (productId: number) => {
  cartItems.value = cartItems.value.filter((item) => item.id !== productId)
}

const clearCart = () => {
  cartItems.value = []
}

export const useCart = () => ({
  cartItems,
  cartCount,
  cartTotalLkr,
  addToCart,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
  clearCart
})
