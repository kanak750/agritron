import { NextResponse } from 'next/server'
import { createOrder } from '@/lib/services/orders'
import { z } from 'zod'

const orderSchema = z.object({
  customerName: z.string().min(2),
  mobileNumber: z.string().min(10),
  email: z.string().email().optional().or(z.literal('')),
  address: z.string().min(5),
  villageTown: z.string().min(2),
  district: z.string().min(2),
  state: z.string().min(2),
  pinCode: z.string().min(6),
  items: z.array(z.object({
    productId: z.string(),
    name: z.string(),
    price: z.number(),
    quantity: z.number()
  })).min(1),
  subtotal: z.number(),
  shipping: z.number(),
  total: z.number()
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    // Validate request
    const validatedData = orderSchema.parse(body)
    
    // Create order
    const result = await createOrder(validatedData)
    
    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 500 })
    }
    
    return NextResponse.json({ success: true, orderId: result.order?.id })
    
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Validation failed', details: error.issues }, { status: 400 })
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
