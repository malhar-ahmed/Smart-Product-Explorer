export interface Product {
  id: number
  title: string
  price: number
  category: string
  thumbnail: string
  description: string
  rating?: number
  stock?: number
  lkrPrice?: number
  images?: string[]
}

export interface ProductResponse {
  products: Product[]
  total: number
  skip: number
  limit: number
}