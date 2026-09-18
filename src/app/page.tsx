import { ProductCard } from '@/components/product/ProductCard'
import Link from 'next/link'
import { Search, LayoutGrid, ShieldCheck, Truck, CreditCard, HeadphonesIcon } from 'lucide-react'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { products as dummyProducts, categories as dummyCategories } from '@/lib/data'

export const dynamic = 'force-dynamic'

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const resolvedParams = await searchParams;
  const search = typeof resolvedParams.q === 'string' ? resolvedParams.q : undefined
  const categorySlug = typeof resolvedParams.category === 'string' ? resolvedParams.category : undefined

  let products = dummyProducts
  
  if (categorySlug) {
    products = products.filter(p => p.category.slug === categorySlug)
  }
  
  if (search) {
    const s = search.toLowerCase()
    products = products.filter(p => 
      p.name.toLowerCase().includes(s) || 
      p.shortDescription.toLowerCase().includes(s)
    )
  }

  const categories = dummyCategories

  // Derive some "trending" products (for demo, just take the first 4)
  const trendingProducts = products.slice(0, 4);

  return (
    <div className="flex flex-col bg-gray-50 min-h-screen">
      
      {/* 1. HERO BANNER */}
      <section className="relative w-full h-[400px] md:h-[550px] bg-primary overflow-hidden">
         <div className="absolute inset-0 bg-[url('https://picsum.photos/seed/farmhero/1920/600')] bg-cover bg-center mix-blend-overlay opacity-50"></div>
         <div className="absolute inset-0 bg-gradient-to-r from-green-900/95 via-green-800/80 to-transparent"></div>
         <div className="relative h-full container mx-auto px-4 flex flex-col justify-center text-white space-y-4 md:space-y-6 max-w-3xl pt-12 pb-20 md:pb-24">
            <span className="inline-block px-3 py-1 md:px-4 md:py-1.5 bg-amber-500 text-white text-[10px] md:text-xs font-bold tracking-widest uppercase rounded-full w-max shadow-sm">
              New Season Arrival
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-display font-extrabold leading-tight drop-shadow-md">
              Smart Technology for Modern Farming
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-white/90 max-w-xl font-medium drop-shadow-sm">
              Upgrade your yield with our latest automated controllers, sensors, and agricultural equipment.
            </p>
            <div className="pt-2 md:pt-4">
              <Link href="/?q=" className="inline-flex items-center justify-center w-max bg-white text-green-900 hover:bg-gray-100 hover:text-green-950 rounded-full px-6 py-3 md:px-8 md:py-4 text-base md:text-lg font-bold shadow-xl transition-all hover:scale-105 border-none">
                Explore Collection
              </Link>
            </div>
         </div>
      </section>

      {/* 2. OVERLAPPING SEARCH & CATEGORY CONTAINER */}
      <section className="container mx-auto px-2 md:px-4 -mt-12 md:-mt-16 relative z-10 mb-12 md:mb-16">
        <div className="bg-white rounded-2xl md:rounded-3xl shadow-2xl p-4 md:p-8 border border-gray-100">
          
          {/* Search Bar */}
          <form action="/" method="GET" className="relative flex items-center mb-6 md:mb-8 max-w-4xl mx-auto">
            <Search className="absolute left-4 md:left-5 text-gray-400 h-5 w-5 md:h-6 md:w-6" />
            <Input 
              type="search" 
              name="q" 
              placeholder="Search equipment..." 
              defaultValue={search || ''}
              className="w-full pl-12 pr-28 md:pl-14 md:pr-32 py-5 md:py-7 rounded-full border-gray-200 shadow-inner bg-gray-50 focus:bg-white focus:ring-primary focus:border-primary text-base md:text-lg transition-colors"
            />
            {categorySlug && <input type="hidden" name="category" value={categorySlug} />}
            <button type="submit" className="absolute right-1.5 md:right-2 rounded-full px-5 py-3 md:px-8 md:py-4 bg-primary hover:bg-primary/90 text-white text-sm md:text-base font-bold shadow-md transition-colors">
              Search
            </button>
          </form>

          {/* Categories */}
          <div className="flex overflow-x-auto hide-scrollbar gap-4 md:gap-10 justify-start md:justify-center py-4 px-2 snap-x snap-mandatory">
            <Link 
              href={`/${search ? `?q=${search}` : ''}`}
              className="group flex flex-col items-center gap-2 md:gap-3 min-w-[76px] md:min-w-[90px] transition-transform hover:-translate-y-1 snap-start"
            >
              <div className={`w-14 h-14 md:w-20 md:h-20 rounded-full flex items-center justify-center text-xl transition-all border-[3px] md:border-4 shadow-sm ${!categorySlug ? 'bg-primary/10 border-primary shadow-md scale-105 md:scale-110' : 'bg-gray-100 border-white group-hover:border-gray-200'}`}>
                <LayoutGrid className={`h-6 w-6 md:h-8 md:w-8 ${!categorySlug ? 'text-primary' : 'text-gray-500 group-hover:text-gray-700'}`} />
              </div>
              <span className={`text-xs md:text-base text-center font-semibold ${!categorySlug ? 'text-primary' : 'text-gray-600 group-hover:text-gray-900'}`}>
                All Items
              </span>
            </Link>
            
            {categories.map(category => (
              <Link 
                key={category.id}
                href={`/?category=${category.slug}${search ? `&q=${search}` : ''}`}
                className="group flex flex-col items-center gap-2 md:gap-3 min-w-[76px] md:min-w-[90px] transition-transform hover:-translate-y-1 snap-start"
              >
                <div className={`w-14 h-14 md:w-20 md:h-20 rounded-full flex items-center justify-center overflow-hidden transition-all border-[3px] md:border-4 shadow-sm ${categorySlug === category.slug ? 'border-primary shadow-md scale-105 md:scale-110' : 'border-white bg-green-50 group-hover:border-gray-200'}`}>
                  <img src={`https://picsum.photos/seed/${category.slug}/150/150`} alt={category.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>
                <span className={`text-xs md:text-base text-center font-semibold leading-tight px-1 ${categorySlug === category.slug ? 'text-primary' : 'text-gray-600 group-hover:text-gray-900'}`}>
                  {category.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 3. PROMOTIONAL BANNER */}
      {!search && !categorySlug && (
        <section className="container mx-auto px-4 mb-12 md:mb-16">
          <div className="w-full rounded-2xl md:rounded-3xl overflow-hidden relative min-h-[220px] md:h-[300px] shadow-2xl group">
            <img src="https://picsum.photos/seed/promo-banner/1200/400" className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" alt="Promo" />
            <div className="absolute inset-0 bg-gradient-to-r from-orange-600/90 via-orange-500/80 md:via-orange-500/70 to-orange-400/30"></div>
            <div className="relative h-full p-6 sm:p-8 md:p-12 flex flex-col justify-center text-white max-w-2xl">
              <span className="bg-white/20 px-3 py-1 rounded-full text-xs md:text-sm font-bold w-max mb-3 md:mb-4 backdrop-blur-sm">Limited Time Offer</span>
              <h2 className="text-2xl sm:text-3xl md:text-5xl font-extrabold mb-2 md:mb-4 drop-shadow-md">Monsoon Mega Sale</h2>
              <p className="text-sm sm:text-base md:text-xl mb-6 md:mb-8 max-w-md drop-shadow-sm font-medium text-white/90">Equip your farm for the season with up to 40% off selected irrigation controllers.</p>
              <Link href="/?q=" className="inline-flex items-center justify-center w-max rounded-full text-orange-700 font-extrabold bg-white hover:bg-gray-100 border-none px-6 py-3 md:px-8 md:py-4 shadow-xl hover:-translate-y-1 transition-transform text-sm md:text-lg">
                Shop Deals Now
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* 4. TRENDING PRODUCTS (Only show if not searching) */}
      {!search && !categorySlug && trendingProducts.length > 0 && (
        <section className="container mx-auto px-4 mb-16">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-3xl font-display font-extrabold text-gray-900 mb-2">Trending Now</h2>
              <p className="text-gray-500">Our most popular items this week.</p>
            </div>
            <Link href="/?q=" className="hidden md:flex text-primary font-bold hover:underline items-center gap-1">
              View All <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {trendingProducts.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        </section>
      )}

      {/* 5. MAIN PRODUCT GRID */}
      <section className="container mx-auto px-4 mb-24">
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-gray-200 gap-4">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-gray-900">
            {categorySlug 
              ? categories.find(c => c.slug === categorySlug)?.name || 'Products' 
              : search 
                ? `Search Results for "${search}"` 
                : 'All Equipment & Supplies'}
          </h2>
          <div className="flex items-center gap-3">
            <span className="text-sm font-bold text-gray-600 bg-gray-200 px-4 py-1.5 rounded-full shadow-inner">
              {products.length} Items Found
            </span>
          </div>
        </div>

        {products.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="py-24 text-center border-2 border-dashed border-gray-300 rounded-3xl bg-white shadow-sm flex flex-col items-center max-w-3xl mx-auto">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-6">
              <Search className="h-10 w-10 text-gray-400" />
            </div>
            <h3 className="font-display font-extrabold text-2xl mb-3 text-gray-900">No products found</h3>
            <p className="text-gray-500 mb-8 max-w-md mx-auto text-lg">
              We couldn't find any products matching your current filters. Try adjusting your search or browsing all categories.
            </p>
            <Link href="/" className="inline-flex items-center justify-center rounded-full px-10 py-4 bg-primary hover:bg-primary/90 shadow-lg font-bold text-white transition-colors">
              Clear Filters
            </Link>
          </div>
        )}
      </section>

      {/* 6. TRUST BADGES */}
      <section className="bg-white py-12 md:py-16 border-t border-gray-200">
        <div className="container mx-auto px-4">
           <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-12 text-center max-w-5xl mx-auto">
              <div className="flex flex-col items-center justify-start gap-2 md:gap-3 group">
                 <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-green-50 text-green-600 flex items-center justify-center mb-1 md:mb-2 group-hover:bg-green-600 group-hover:text-white transition-colors duration-300 shadow-sm">
                   <Truck className="h-6 w-6 md:h-8 md:w-8" />
                 </div>
                 <h4 className="font-extrabold text-gray-900 text-sm md:text-base">Free Delivery</h4>
                 <p className="text-xs md:text-sm text-gray-500 font-medium">On orders over ₹1000</p>
              </div>
              <div className="flex flex-col items-center justify-start gap-2 md:gap-3 group">
                 <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-green-50 text-green-600 flex items-center justify-center mb-1 md:mb-2 group-hover:bg-green-600 group-hover:text-white transition-colors duration-300 shadow-sm">
                   <ShieldCheck className="h-6 w-6 md:h-8 md:w-8" />
                 </div>
                 <h4 className="font-extrabold text-gray-900 text-sm md:text-base">Genuine Products</h4>
                 <p className="text-xs md:text-sm text-gray-500 font-medium">100% Authentic Quality</p>
              </div>
              <div className="flex flex-col items-center justify-start gap-2 md:gap-3 group">
                 <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-green-50 text-green-600 flex items-center justify-center mb-1 md:mb-2 group-hover:bg-green-600 group-hover:text-white transition-colors duration-300 shadow-sm">
                   <CreditCard className="h-6 w-6 md:h-8 md:w-8" />
                 </div>
                 <h4 className="font-extrabold text-gray-900 text-sm md:text-base">Secure Payment</h4>
                 <p className="text-xs md:text-sm text-gray-500 font-medium">Multiple safe gateways</p>
              </div>
              <div className="flex flex-col items-center justify-start gap-2 md:gap-3 group">
                 <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-green-50 text-green-600 flex items-center justify-center mb-1 md:mb-2 group-hover:bg-green-600 group-hover:text-white transition-colors duration-300 shadow-sm">
                   <HeadphonesIcon className="h-6 w-6 md:h-8 md:w-8" />
                 </div>
                 <h4 className="font-extrabold text-gray-900 text-sm md:text-base">Expert Support</h4>
                 <p className="text-xs md:text-sm text-gray-500 font-medium">Dedicated farm helpline</p>
              </div>
           </div>
        </div>
      </section>
    </div>
  )
}
