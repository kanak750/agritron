"use client"

import { useCart } from "@/context/CartContext"
import Link from "next/link"
import { Button } from "@/components/ui/Button"
import { Trash2, Minus, Plus, ShoppingBag, ShieldCheck } from "lucide-react"

export default function CartPage() {
  const { items, updateQuantity, removeItem, totalPrice } = useCart()
  
  const shipping = items.length > 0 ? 150 : 0
  const total = totalPrice + shipping

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-24 text-center">
        <div className="w-24 h-24 bg-surface rounded-full flex items-center justify-center mx-auto mb-6">
          <ShoppingBag className="h-10 w-10 text-primary" />
        </div>
        <h1 className="font-display text-3xl font-bold mb-4">Your cart is empty</h1>
        <p className="text-foreground/70 mb-8 max-w-md mx-auto">
          Looks like you haven't added any products to your cart yet. Discover our practical technology solutions.
          </p>
          <Link href="/" className="inline-flex items-center justify-center rounded-md bg-primary px-8 py-3 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90 transition-colors">
            Continue Shopping
          </Link>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12 md:py-16">
      <h1 className="font-display text-3xl font-bold mb-8">Shopping Cart</h1>

      <div className="flex flex-col lg:flex-row gap-12">
        {/* Cart Items */}
        <div className="w-full lg:w-2/3 flex flex-col gap-6">
          <div className="hidden md:grid grid-cols-12 text-sm font-semibold text-foreground/60 pb-4 border-b border-border">
            <div className="col-span-6">Product</div>
            <div className="col-span-3 text-center">Quantity</div>
            <div className="col-span-2 text-right">Total</div>
            <div className="col-span-1"></div>
          </div>
          
          <div className="divide-y divide-border border-b border-border pb-6">
            {items.map((item) => (
              <div key={item.id} className="py-6 flex flex-col md:grid md:grid-cols-12 gap-4 items-center">
                
                {/* Mobile: Image + Details row */}
                <div className="col-span-6 w-full flex gap-4 items-center">
                  <div className="w-20 h-20 bg-surface rounded-md border border-border shrink-0 flex items-center justify-center">
                    <span className="text-[10px] text-foreground/30 font-bold uppercase">Image</span>
                  </div>
                  <div className="flex flex-col">
                    <Link href={`/products/${item.slug}`} className="font-bold hover:text-primary leading-tight mb-1">
                      {item.name}
                    </Link>
                    <span className="text-sm font-medium text-foreground/70">
                      ₹{item.price.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>

                {/* Mobile: Controls row */}
                <div className="w-full flex items-center justify-between md:contents mt-4 md:mt-0">
                  <div className="col-span-3 flex justify-center">
                    <div className="flex items-center border border-border rounded-md bg-background">
                      <button 
                        onClick={() => {
                          if (item.quantity === 1) {
                            if (window.confirm("Are you sure you want to remove this item from the cart?")) {
                              removeItem(item.id)
                            }
                          } else {
                            updateQuantity(item.id, item.quantity - 1)
                          }
                        }}
                        className="p-2 hover:bg-surface text-foreground/70 transition-colors"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="w-10 text-center font-medium text-sm">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-2 hover:bg-surface text-foreground/70 transition-colors"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  <div className="col-span-2 text-right font-bold md:text-lg">
                    ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                  </div>

                  <div className="col-span-1 flex justify-end">
                    <button 
                      onClick={() => removeItem(item.id)}
                      className="p-2 text-foreground/40 hover:text-destructive hover:bg-destructive/10 rounded-md transition-colors"
                    >
                      <Trash2 className="h-5 w-5" />
                      <span className="sr-only">Remove</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="hidden md:flex justify-between items-center">
            <Link href="/" className="text-sm text-primary hover:underline font-medium mb-4 inline-block">
              &larr; Continue Shopping
            </Link>
          </div>
        </div>

        {/* Order Summary */}
        <div className="w-full lg:w-1/3">
          <div className="bg-surface/50 border border-border rounded-xl p-6 lg:p-8 sticky top-24">
            <h2 className="font-display font-bold text-xl mb-6">Order Summary</h2>
            
            <div className="space-y-4 text-sm font-medium border-b border-border pb-6 mb-6">
              <div className="flex justify-between">
                <span className="text-foreground/70">Subtotal ({items.length} items)</span>
                <span>₹{totalPrice.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-foreground/70">Shipping estimate</span>
                <span>₹{shipping.toLocaleString('en-IN')}</span>
              </div>
            </div>
            
            <div className="flex justify-between items-end mb-8">
              <span className="font-bold text-lg">Total</span>
              <span className="font-bold text-3xl">₹{total.toLocaleString('en-IN')}</span>
            </div>

            <Button asChild size="lg" className="w-full h-14 text-lg">
              <Link href="/checkout">Proceed to Checkout</Link>
            </Button>
            
            <div className="mt-4 text-center">
              <span className="text-xs text-foreground/60 flex items-center justify-center gap-1">
                <ShieldCheck className="h-4 w-4" /> Secure checkout
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
