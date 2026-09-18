import Link from 'next/link'
import { Prisma } from '@prisma/client'
import { Button } from '@/components/ui/Button'

type ProductWithCategory = Prisma.ProductGetPayload<{
  include: { category: true }
}>

interface ProductCardProps {
  product: ProductWithCategory
  index?: number
}

export function ProductCard({ product, index }: ProductCardProps) {
  // Use unique dummy images based on product ID to simulate a catalog
  const dummyImage = `https://picsum.photos/seed/${product.id}/500/500`;

  return (
    <div className="flex flex-col bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 group h-full relative">
      {/* Image Container */}
      <div className="aspect-[4/3] bg-gray-50 relative flex items-center justify-center p-6 border-b border-gray-50 overflow-hidden">
        {product.badge && (
          <span className="absolute top-3 left-3 bg-red-500 text-white text-[10px] font-bold px-2.5 py-1 uppercase tracking-wider rounded shadow-sm z-10">
            {product.badge}
          </span>
        )}
        <div className="w-full h-full relative transition-transform duration-500 group-hover:scale-105">
          <img 
            src={dummyImage} 
            alt={product.name} 
            className="w-full h-full object-cover rounded-lg mix-blend-multiply"
          />
        </div>
      </div>
      
      {/* Card Body */}
      <div className="p-5 flex flex-col flex-grow relative bg-white">
        {/* Category */}
        <span className="text-[10px] md:text-xs font-bold uppercase tracking-wider text-gray-400 mb-1.5">
          {product.category.name}
        </span>
        
        {/* Title */}
        <h3 className="font-semibold text-gray-900 leading-tight mb-2 text-sm md:text-base line-clamp-2 min-h-[2.5rem]">
          <Link href={`/products/${product.slug}`} className="hover:text-primary before:absolute before:inset-0">
            {product.name}
          </Link>
        </h3>
        
        {/* Ratings (Dummy) */}
        <div className="flex items-center gap-1 mb-4">
          <span className="text-amber-400 text-xs">★★★★☆</span>
          <span className="text-xs text-gray-400 font-medium">(24)</span>
        </div>
        
        {/* Pricing & Actions */}
        <div className="mt-auto flex flex-col gap-3">
          <div className="flex items-baseline gap-2">
            <span className="font-bold text-lg md:text-xl text-gray-900">
              ₹{product.price.toLocaleString('en-IN')}
            </span>
            <span className="text-xs text-gray-400 line-through font-medium">
              ₹{(product.price * 1.2).toLocaleString('en-IN')}
            </span>
          </div>
          
          <Button className="w-full rounded-xl bg-primary hover:bg-primary/90 text-white font-bold py-2.5 shadow-md transition-colors z-10 relative">
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  )
}
