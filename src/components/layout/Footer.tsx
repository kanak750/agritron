import Link from 'next/link'

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface text-surface-foreground mt-auto">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link href="/" className="font-display font-bold text-2xl text-primary">
              AGRITRON
            </Link>
            <p className="text-sm max-w-xs text-foreground/80">
              Reliable controllers, automation devices and surveillance solutions built for farms, homes, vehicles and businesses.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4 font-display">Products</h3>
            <ul className="space-y-2 text-sm text-foreground/80">
              <li><Link href="/category/agriculture" className="hover:text-primary">Agriculture</Link></li>
              <li><Link href="/category/electrical-automation" className="hover:text-primary">Electrical & Automation</Link></li>
              <li><Link href="/category/vehicle-security" className="hover:text-primary">Vehicle Security</Link></li>
              <li><Link href="/category/home-utility" className="hover:text-primary">Home & Utility</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4 font-display">Company</h3>
            <ul className="space-y-2 text-sm text-foreground/80">
              <li><Link href="/about" className="hover:text-primary">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-primary">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4 font-display">Contact Us</h3>
            <ul className="space-y-2 text-sm text-foreground/80">
              <li>Phone: +91 98765 43210</li>
              <li>WhatsApp: +91 98765 43210</li>
              <li>Email: info@agritron.placeholder</li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-border/50 text-sm text-center text-foreground/60">
          <p>&copy; {new Date().getFullYear()} AGRITRON. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
