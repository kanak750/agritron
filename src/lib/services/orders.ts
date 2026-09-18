export async function createOrder(data: any) {
  try {
    // Mocking successful order creation for frontend-only mode
    const order = { id: 'mock-order-id', ...data };
    return { success: true, order }
  } catch (error) {
    console.error('Failed to create order:', error)
    return { success: false, error: 'Failed to create order' }
  }
}
