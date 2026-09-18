import Link from "next/link"
import { Button } from "@/components/ui/Button"
import { CheckCircle2 } from "lucide-react"

export default async function OrderSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const resolvedParams = await searchParams
  const orderId = resolvedParams.id as string

  return (
    <div className="container mx-auto px-4 py-24 text-center min-h-[70vh] flex flex-col justify-center items-center">
      <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mb-6">
        <CheckCircle2 className="h-12 w-12 text-primary" />
      </div>
      
      <h1 className="font-display text-4xl font-bold mb-4">Order Confirmed!</h1>
      
      <p className="text-lg text-foreground/70 mb-2 max-w-lg">
        Thank you for your purchase. Your order has been successfully placed.
      </p>
      
      {orderId && (
        <p className="text-sm font-semibold bg-surface px-4 py-2 rounded-md mb-8">
          Order ID: {orderId}
        </p>
      )}

      <p className="text-foreground/70 mb-10 max-w-md">
        We will contact you shortly on your mobile number to confirm delivery details.
      </p>
      
      <div className="flex gap-4">
          <Link href="/" className="inline-flex items-center justify-center rounded-md bg-primary px-8 py-3 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90 transition-colors">
            Continue Shopping
          </Link>
      </div>
    </div>
  )
}
