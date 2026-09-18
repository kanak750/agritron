"use client"

import { useCart } from "@/context/CartContext"

export function CartBadge() {
  const { totalItems } = useCart()

  if (totalItems === 0) return null

  return (
    <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-accent text-accent-foreground text-[10px] font-bold flex items-center justify-center">
      {totalItems}
    </span>
  )
}
