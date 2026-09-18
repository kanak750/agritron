"use client"

import { useState, useEffect } from "react"
import { useCart } from "@/context/CartContext"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { ShieldCheck, Truck } from "lucide-react"
import Link from "next/link"

const checkoutSchema = z.object({
  customerName: z.string().min(2, "Name must be at least 2 characters"),
  mobileNumber: z.string().regex(/^[0-9]{10}$/, "Please enter a valid 10-digit mobile number"),
  email: z.string().email("Invalid email address").optional().or(z.literal('')),
  address: z.string().min(5, "Please enter your full address"),
  villageTown: z.string().min(2, "Please enter your village or town"),
  district: z.string().min(2, "Please enter your district"),
  state: z.string().min(2, "Please enter your state"),
  pinCode: z.string().regex(/^[0-9]{6}$/, "Please enter a valid 6-digit PIN code"),
})

type CheckoutFormValues = z.infer<typeof checkoutSchema>

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCart()
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const shipping = items.length > 0 ? 150 : 0
  const total = totalPrice + shipping

  const { register, handleSubmit, formState: { errors } } = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema)
  })

  const [isMounted, setIsMounted] = useState(false)

  // Redirect if cart is empty
  useEffect(() => {
    setIsMounted(true)
    if (items.length === 0 && !isSubmitting) {
      router.push('/cart')
    }
  }, [items.length, isSubmitting, router])

  if (!isMounted || items.length === 0) return null

  const onSubmit = async (data: CheckoutFormValues) => {
    setIsSubmitting(true)
    setError(null)

    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          items: items.map(item => ({
            productId: item.id,
            name: item.name,
            price: item.price,
            quantity: item.quantity
          })),
          subtotal: totalPrice,
          shipping,
          total
        })
      })

      const result = await response.json()

      if (response.ok && result.success) {
        clearCart()
        router.push(`/order-success?id=${result.orderId}`)
      } else {
        setError(result.error || 'Something went wrong while processing your order.')
        setIsSubmitting(false)
      }
    } catch (err) {
      setError('A network error occurred. Please try again.')
      setIsSubmitting(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8 border-b border-border pb-4 flex justify-between items-end">
        <h1 className="font-display text-3xl font-bold">Checkout</h1>
        <Link href="/cart" className="text-sm font-semibold text-primary hover:underline">
          Return to Cart
        </Link>
      </div>

      <div className="flex flex-col lg:flex-row gap-12">
        {/* Left: Form */}
        <div className="w-full lg:w-2/3">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            
            {error && (
              <div className="p-4 bg-destructive/10 text-destructive border border-destructive/20 rounded-md">
                {error}
              </div>
            )}

            {/* Customer Details */}
            <div className="bg-surface/30 p-6 rounded-xl border border-border">
              <h2 className="font-display font-bold text-xl mb-6">1. Customer Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="customerName" className="text-sm font-semibold">Full Name *</label>
                  <Input id="customerName" {...register("customerName")} placeholder="Ramesh Kumar" />
                  {errors.customerName && <p className="text-destructive text-xs">{errors.customerName.message}</p>}
                </div>
                <div className="space-y-2">
                  <label htmlFor="mobileNumber" className="text-sm font-semibold">Mobile Number *</label>
                  <Input id="mobileNumber" {...register("mobileNumber")} placeholder="9876543210" />
                  {errors.mobileNumber && <p className="text-destructive text-xs">{errors.mobileNumber.message}</p>}
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label htmlFor="email" className="text-sm font-semibold">Email (Optional)</label>
                  <Input id="email" type="email" {...register("email")} placeholder="ramesh@example.com" />
                  {errors.email && <p className="text-destructive text-xs">{errors.email.message}</p>}
                </div>
              </div>
            </div>

            {/* Delivery Address */}
            <div className="bg-surface/30 p-6 rounded-xl border border-border">
              <h2 className="font-display font-bold text-xl mb-6">2. Delivery Address</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2 md:col-span-2">
                  <label htmlFor="address" className="text-sm font-semibold">House No, Building, Street *</label>
                  <Input id="address" {...register("address")} placeholder="House No 123, Main Street" />
                  {errors.address && <p className="text-destructive text-xs">{errors.address.message}</p>}
                </div>
                <div className="space-y-2">
                  <label htmlFor="villageTown" className="text-sm font-semibold">Village / Town *</label>
                  <Input id="villageTown" {...register("villageTown")} placeholder="Town Name" />
                  {errors.villageTown && <p className="text-destructive text-xs">{errors.villageTown.message}</p>}
                </div>
                <div className="space-y-2">
                  <label htmlFor="district" className="text-sm font-semibold">District *</label>
                  <Input id="district" {...register("district")} placeholder="District Name" />
                  {errors.district && <p className="text-destructive text-xs">{errors.district.message}</p>}
                </div>
                <div className="space-y-2">
                  <label htmlFor="state" className="text-sm font-semibold">State *</label>
                  <Input id="state" {...register("state")} placeholder="State Name" />
                  {errors.state && <p className="text-destructive text-xs">{errors.state.message}</p>}
                </div>
                <div className="space-y-2">
                  <label htmlFor="pinCode" className="text-sm font-semibold">PIN Code *</label>
                  <Input id="pinCode" {...register("pinCode")} placeholder="123456" />
                  {errors.pinCode && <p className="text-destructive text-xs">{errors.pinCode.message}</p>}
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-surface/30 p-6 rounded-xl border border-border">
              <h2 className="font-display font-bold text-xl mb-6">3. Payment Method</h2>
              <div className="border border-primary bg-primary/5 p-4 rounded-lg flex items-start gap-3">
                <input type="radio" id="cod" name="payment" defaultChecked className="mt-1" />
                <div>
                  <label htmlFor="cod" className="font-semibold block">Cash on Delivery (COD)</label>
                  <p className="text-sm text-foreground/70">Pay when your order is delivered to your address.</p>
                </div>
              </div>
              <p className="text-xs text-foreground/50 mt-4 italic">
                * Note: Online payment gateway integration is prepared but currently operating in mock mode for this demo.
              </p>
            </div>

            <Button type="submit" size="lg" className="w-full h-14 text-lg" disabled={isSubmitting}>
              {isSubmitting ? 'Processing Order...' : `Place Order (₹${total.toLocaleString('en-IN')})`}
            </Button>
          </form>
        </div>

        {/* Right: Order Summary */}
        <div className="w-full lg:w-1/3">
          <div className="bg-surface/50 border border-border rounded-xl p-6 lg:p-8 sticky top-24">
            <h2 className="font-display font-bold text-xl mb-6">Order Summary</h2>
            
            <div className="space-y-4 mb-6">
              {items.map(item => (
                <div key={item.id} className="flex justify-between text-sm">
                  <div className="flex gap-3 pr-4">
                    <span className="font-semibold">{item.quantity}x</span>
                    <span className="text-foreground/80 line-clamp-2">{item.name}</span>
                  </div>
                  <span className="font-semibold whitespace-nowrap">₹{(item.price * item.quantity).toLocaleString('en-IN')}</span>
                </div>
              ))}
            </div>
            
            <div className="space-y-4 text-sm font-medium border-t border-b border-border py-6 mb-6">
              <div className="flex justify-between">
                <span className="text-foreground/70">Subtotal</span>
                <span>₹{totalPrice.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-foreground/70">Shipping</span>
                <span>₹{shipping.toLocaleString('en-IN')}</span>
              </div>
            </div>
            
            <div className="flex justify-between items-end mb-8">
              <span className="font-bold text-lg">Total</span>
              <span className="font-bold text-3xl">₹{total.toLocaleString('en-IN')}</span>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm text-foreground/70">
                <ShieldCheck className="h-5 w-5 text-primary" />
                <span>100% Secure Checkout</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-foreground/70">
                <Truck className="h-5 w-5 text-primary" />
                <span>Dispatched within 24 hours</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
