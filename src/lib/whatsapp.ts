export function generateWhatsAppLink(productName: string, price: number) {
  const phoneNumber = "919876543210" // Placeholder phone number
  const message = `Hello AGRITRON, I am interested in purchasing:\n\nProduct: ${productName}\nPrice: ₹${price.toLocaleString('en-IN')}\n\nPlease let me know the process to order this.`
  
  return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
}
