import Link from 'next/link'
import { ShoppingCart, Search, Menu } from 'lucide-react'
import { CartBadge } from '@/components/cart/CartBadge'

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center space-x-2">
            <span className="font-display font-bold text-2xl tracking-tight text-primary">AGRITRON</span>
          </Link>
        </div>

        <div className="hidden md:flex flex-1"></div>

        <div className="flex items-center gap-2">
          <Link href="/cart" className="p-2 text-foreground hover:text-primary transition-colors relative">
            <ShoppingCart className="h-5 w-5" />
            <span className="sr-only">Cart</span>
            <CartBadge />
          </Link>
        </div>
      </div>
    </header>
  )
}
