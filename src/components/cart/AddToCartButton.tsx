"use client"

import { useCart } from "@/context/CartContext"
import { Button } from "@/components/ui/Button"
import { toast } from "sonner"
import { ShoppingCart } from "lucide-react"

export function AddToCartButton({ product, className }: { product: any, className?: string }) {
  const { addItem } = useCart()
  
  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault()
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: typeof product.images === 'string' ? (JSON.parse(product.images)[0] || '/placeholder-product.webp') : product.images?.[0] || '/placeholder-product.webp',
      slug: product.slug
    })
    
    toast.success(`${product.name} added to cart!`)
  }

  return (
    <Button onClick={handleAdd} size="lg" className={className || "flex-1 text-base h-14"}>
      <ShoppingCart className="mr-2 h-5 w-5" />
      Add to Cart
    </Button>
  )
}
