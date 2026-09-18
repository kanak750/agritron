"use client"

import { useCart } from "@/context/CartContext"
import { Button } from "@/components/ui/Button"
import { ShoppingCart } from "lucide-react"

export function AddToCartButton({ product }: { product: any }) {
  const { addItem } = useCart()
  
  const handleAdd = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: JSON.parse(product.images)[0] || '/placeholder-product.webp',
      slug: product.slug
    })
    
    // Optionally trigger a toast here
    alert(`${product.name} added to cart!`)
  }

  return (
    <Button onClick={handleAdd} size="lg" className="flex-1 text-base h-14">
      <ShoppingCart className="mr-2 h-5 w-5" />
      Add to Cart
    </Button>
  )
}
