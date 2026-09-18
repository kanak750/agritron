import { db } from '@/lib/db'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { CheckCircle2, ChevronRight, Truck, ShieldCheck, Smartphone } from 'lucide-react'
import { generateWhatsAppLink } from '@/lib/whatsapp'
import { AddToCartButton } from '@/components/cart/AddToCartButton'
import { Metadata } from 'next'

export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params
  const product = await db.product.findUnique({ where: { slug: resolvedParams.slug } })
  if (!product) return { title: 'Product Not Found' }
  return {
    title: `${product.name} | AGRITRON`,
    description: product.shortDescription,
  }
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const resolvedParams = await params
  
  const product = await db.product.findUnique({
    where: { slug: resolvedParams.slug },
    include: { category: true }
  })

  if (!product) {
    notFound()
  }

  const features = JSON.parse(product.features) as string[]
  const specifications = JSON.parse(product.specifications) as {name: string, value: string}[]
  const applications = JSON.parse(product.applications) as string[]
  const images = JSON.parse(product.images) as string[]

  return (
    <div className="bg-background min-h-screen pb-20">
      {/* Breadcrumb */}
      <div className="bg-surface/50 border-b border-border py-3">
        <div className="container mx-auto px-4 flex items-center text-sm text-foreground/60">
          <Link href="/" className="hover:text-primary">Home</Link>
          <ChevronRight className="h-4 w-4 mx-2" />
          <Link href="/products" className="hover:text-primary">Products</Link>
          <ChevronRight className="h-4 w-4 mx-2" />
          <Link href={`/category/${product.category.slug}`} className="hover:text-primary">
            {product.category.name}
          </Link>
          <ChevronRight className="h-4 w-4 mx-2" />
          <span className="text-foreground truncate max-w-[200px]">{product.name}</span>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
          
          {/* Left: Images */}
          <div className="w-full lg:w-1/2 flex flex-col gap-4">
            <div className="aspect-square bg-surface border border-border rounded-xl flex items-center justify-center relative overflow-hidden">
              {product.badge && (
                <span className="absolute top-4 left-4 bg-accent text-accent-foreground text-xs font-bold px-3 py-1 uppercase tracking-wider rounded-sm z-10">
                  {product.badge}
                </span>
              )}
              {/* Placeholder for actual Next Image */}
              <div className="text-foreground/30 font-display font-bold text-2xl rotate-[-45deg] select-none">
                PRODUCT IMAGE
              </div>
            </div>
            {images.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {images.map((img, i) => (
                  <div key={i} className="aspect-square bg-surface border border-border rounded-lg cursor-pointer hover:border-primary transition-colors"></div>
                ))}
              </div>
            )}
          </div>

          {/* Right: Product Details */}
          <div className="w-full lg:w-1/2 flex flex-col">
            <span className="text-sm font-semibold uppercase tracking-widest text-primary/80 mb-3">
              {product.category.name}
            </span>
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight mb-4">
              {product.name}
            </h1>
            
            <p className="text-lg md:text-xl text-foreground/80 mb-6 font-medium">
              {product.shortDescription}
            </p>

            <div className="flex items-end gap-4 mb-8">
              <span className="text-3xl font-bold text-foreground">
                ₹{product.price.toLocaleString('en-IN')}
              </span>
              {product.compareAtPrice && (
                <span className="text-lg text-foreground/50 line-through mb-1">
                  ₹{product.compareAtPrice.toLocaleString('en-IN')}
                </span>
              )}
            </div>

            <div className="space-y-4 mb-8 border-t border-b border-border py-6">
              <div className="flex items-center gap-3 text-sm">
                <Truck className="h-5 w-5 text-primary" />
                <span>Fast delivery across India</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <ShieldCheck className="h-5 w-5 text-primary" />
                <span>1 Year Manufacturer Warranty</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <AddToCartButton product={product} />
              <Button asChild size="lg" variant="outline" className="flex-1 text-base h-14 border-primary text-primary hover:bg-primary/5">
                <a href={generateWhatsAppLink(product.name, product.price)} target="_blank" rel="noopener noreferrer">
                  <Smartphone className="mr-2 h-5 w-5" />
                  Order via WhatsApp
                </a>
              </Button>
            </div>

            {/* Description */}
            <div className="prose prose-sm md:prose-base prose-neutral max-w-none text-foreground/80">
              <p>{product.description}</p>
            </div>
          </div>
        </div>

        {/* Technical Details & Features Section */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24">
          
          {/* Features */}
          <div>
            <h2 className="font-display text-2xl font-bold mb-6 flex items-center gap-2">
              <span className="w-8 h-8 rounded bg-primary/10 text-primary flex items-center justify-center text-sm">01</span>
              Key Features
            </h2>
            <ul className="space-y-4">
              {features.map((feature, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <span className="text-foreground/80 leading-relaxed">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Specifications */}
          <div>
            <h2 className="font-display text-2xl font-bold mb-6 flex items-center gap-2">
              <span className="w-8 h-8 rounded bg-primary/10 text-primary flex items-center justify-center text-sm">02</span>
              Specifications
            </h2>
            <div className="border border-border rounded-lg overflow-hidden">
              {specifications.map((spec, i) => (
                <div key={i} className={`flex border-b border-border last:border-0 ${i % 2 === 0 ? 'bg-surface/30' : 'bg-background'}`}>
                  <div className="w-1/3 p-4 text-sm font-semibold text-foreground/70 border-r border-border">
                    {spec.name}
                  </div>
                  <div className="w-2/3 p-4 text-sm text-foreground/90 font-medium">
                    {spec.value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* How it works simple visualization */}
        {(product.slug.includes('gsm') || product.slug.includes('water')) && (
          <div className="mt-24 text-center">
            <h2 className="font-display text-2xl md:text-3xl font-bold mb-12">How it works</h2>
            
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 max-w-4xl mx-auto">
              <div className="flex flex-col items-center">
                <div className="w-20 h-20 bg-surface border border-border rounded-full flex items-center justify-center mb-4">
                  {product.slug.includes('gsm') ? <Smartphone className="h-8 w-8 text-primary" /> : <div className="text-xl">💧</div>}
                </div>
                <span className="font-medium text-sm">
                  {product.slug.includes('gsm') ? 'Mobile Phone' : 'Water Tank'}
                </span>
              </div>
              
              <div className="hidden md:block flex-1 h-px bg-border relative">
                <ChevronRight className="absolute right-0 top-1/2 -translate-y-1/2 text-border h-5 w-5 bg-background" />
              </div>
              <ChevronRight className="md:hidden text-border h-6 w-6 my-2 rotate-90" />
              
              <div className="flex flex-col items-center">
                <div className="w-24 h-24 bg-primary text-primary-foreground rounded-lg flex items-center justify-center mb-4 shadow-lg font-display font-bold">
                  CONTROLLER
                </div>
                <span className="font-medium text-sm">AGRITRON Device</span>
              </div>
              
              <div className="hidden md:block flex-1 h-px bg-border relative">
                <ChevronRight className="absolute right-0 top-1/2 -translate-y-1/2 text-border h-5 w-5 bg-background" />
              </div>
              <ChevronRight className="md:hidden text-border h-6 w-6 my-2 rotate-90" />
              
              <div className="flex flex-col items-center">
                <div className="w-20 h-20 bg-surface border border-border rounded-full flex items-center justify-center mb-4">
                  <div className="text-2xl">⚙️</div>
                </div>
                <span className="font-medium text-sm">Agricultural Motor</span>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}
