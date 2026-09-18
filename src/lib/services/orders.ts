import { db } from '@/lib/db'

export async function createOrder(data: any) {
  try {
    const order = await db.order.create({
      data: {
        customerName: data.customerName,
        mobileNumber: data.mobileNumber,
        email: data.email || null,
        address: data.address,
        villageTown: data.villageTown,
        district: data.district,
        state: data.state,
        pinCode: data.pinCode,
        subtotal: data.subtotal,
        shipping: data.shipping,
        total: data.total,
        paymentStatus: 'PENDING',
        orderStatus: 'PENDING',
        items: {
          create: data.items.map((item: any) => ({
            productId: item.productId,
            name: item.name,
            price: item.price,
            quantity: item.quantity
          }))
        }
      }
    })
    return { success: true, order }
  } catch (error) {
    console.error('Failed to create order:', error)
    return { success: false, error: 'Failed to create order' }
  }
}
