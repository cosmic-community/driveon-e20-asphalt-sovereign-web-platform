import { cosmic } from '@/lib/cosmic'
import { Kit, hasStatus } from '@/types'
import Link from 'next/link'
import { Check, Package, Wrench } from 'lucide-react'

async function getKit() {
  try {
    const response = await cosmic.objects
      .find({ type: 'kits' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    
    return response.objects[0] as Kit
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null
    }
    throw error
  }
}

export default async function KitPage() {
  const kit = await getKit()

  if (!kit) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-3xl font-heading mb-4">Kit Not Found</h1>
        <p className="text-text-secondary mb-8">The E20 kit is currently unavailable.</p>
        <Link href="/" className="btn-primary">Return Home</Link>
      </div>
    )
  }

  const totalPrice = kit.metadata.price + kit.metadata.install_price
  const savings = kit.metadata.original_price ? kit.metadata.original_price - totalPrice : 0

  return (
    <div className="container mx-auto px-4 py-12 space-y-12">
      {/* Hero Product Section */}
      <section className="grid md:grid-cols-2 gap-12 items-center">
        <div className="aspect-square relative overflow-hidden rounded-2xl">
          <img
            src={`${kit.metadata.product_image.imgix_url}?w=1200&h=1200&fit=crop&auto=format,compress`}
            alt={kit.metadata.kit_name}
            className="w-full h-full object-cover"
          />
          {kit.metadata.in_stock && (
            <div className="absolute top-4 right-4 bg-driveon-green text-white px-4 py-2 rounded-full text-sm font-semibold">
              In Stock
            </div>
          )}
        </div>

        <div className="space-y-6">
          <div>
            <span className="text-sm text-driveon-green font-semibold uppercase tracking-wide">
              SKU: {kit.metadata.sku}
            </span>
            <h1 className="text-4xl font-heading mt-2 mb-4">{kit.metadata.kit_name}</h1>
            <p className="text-lg text-text-secondary">{kit.metadata.description}</p>
          </div>

          <div className="bg-asphalt-card rounded-xl p-6 space-y-4">
            <div className="flex items-baseline gap-3">
              <span className="text-sm text-text-secondary">Kit Price</span>
              <div className="flex items-baseline gap-2 ml-auto">
                {kit.metadata.original_price && (
                  <span className="text-lg text-text-secondary line-through">₹{kit.metadata.original_price}</span>
                )}
                <span className="text-3xl font-bold text-driveon-green">₹{kit.metadata.price}</span>
              </div>
            </div>
            
            <div className="flex items-baseline gap-3">
              <span className="text-sm text-text-secondary">Installation</span>
              <span className="text-2xl font-semibold ml-auto">₹{kit.metadata.install_price}</span>
            </div>

            <div className="border-t border-text-secondary/20 pt-4">
              <div className="flex items-baseline gap-3">
                <span className="text-lg font-semibold">Total</span>
                <span className="text-4xl font-bold ml-auto">₹{totalPrice}</span>
              </div>
              {savings > 0 && (
                <p className="text-sm text-driveon-green text-right mt-1">Save ₹{savings}</p>
              )}
            </div>
          </div>

          <Link href="/garages" className="btn-primary block text-center text-lg py-4">
            Buy & Book Installation
          </Link>

          <div className="flex items-center gap-4 text-sm text-text-secondary">
            <div className="flex items-center gap-2">
              <Wrench className="w-4 h-4 text-driveon-green" />
              <span>Certified Installation</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-driveon-green" />
              <span>30-Day Guarantee</span>
            </div>
          </div>
        </div>
      </section>

      {/* Components List */}
      <section className="space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-heading">What's Included</h2>
          <p className="text-text-secondary">Complete E20 compatibility upgrade in one package</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {kit.metadata.components_list.map((component, index) => (
            <div key={index} className="card space-y-3">
              <div className="w-12 h-12 bg-driveon-green/10 rounded-lg flex items-center justify-center">
                <Package className="w-6 h-6 text-driveon-green" />
              </div>
              <h3 className="text-lg font-heading">{component.name}</h3>
              <p className="text-sm text-text-secondary">{component.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Compatible Bikes */}
      {kit.metadata.compatible_bikes && kit.metadata.compatible_bikes.length > 0 && (
        <section className="space-y-6">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-heading">Compatible Bikes</h2>
            <p className="text-text-secondary">Verified compatibility with these popular models</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {kit.metadata.compatible_bikes.map((bike) => (
              <Link 
                key={bike.id} 
                href={`/bikes/${bike.slug}`}
                className="card hover:border-driveon-green border border-transparent transition-colors duration-200"
              >
                <h3 className="text-xl font-heading mb-2">
                  {bike.metadata.make} {bike.metadata.model}
                </h3>
                <div className="space-y-1 text-sm text-text-secondary">
                  <p>Year: {bike.metadata.year_range}</p>
                  <p>Engine: {bike.metadata.engine_cc}cc</p>
                  <p className="text-driveon-green">Main Jet: {bike.metadata.main_jet_size} | Pilot Jet: {bike.metadata.pilot_jet_size}</p>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center">
            <Link href="/bikes" className="btn-secondary">
              View All Compatible Bikes
            </Link>
          </div>
        </section>
      )}

      {/* Installation Process */}
      <section className="card bg-gradient-to-br from-driveon-green/5 to-transparent">
        <h2 className="text-2xl font-heading mb-6">Installation Process</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-driveon-green">What We Do</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-driveon-green flex-shrink-0 mt-1" />
                <span>Pre-installation bike inspection</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-driveon-green flex-shrink-0 mt-1" />
                <span>Carburetor removal, cleaning, and re-assembly</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-driveon-green flex-shrink-0 mt-1" />
                <span>Replace jets with bike-specific sizes</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-driveon-green flex-shrink-0 mt-1" />
                <span>Install PTFE fuel hose and Viton O-rings</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-driveon-green flex-shrink-0 mt-1" />
                <span>Pressure test for fuel leaks</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-driveon-green flex-shrink-0 mt-1" />
                <span>Test ride and final verification</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-driveon-green flex-shrink-0 mt-1" />
                <span>Digital certificate with QR verification</span>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-driveon-green">Installation Time</h3>
            <p className="text-text-secondary">
              Typical installation takes 45-60 minutes depending on your bike model. Our certified mechanics work efficiently while maintaining precision.
            </p>
            
            <h3 className="text-lg font-semibold text-driveon-green mt-6">Warranty Protection</h3>
            <p className="text-text-secondary">
              Zero ECU modifications. All components use OEM-spec materials. Your manufacturer warranty remains intact. We provide photo documentation of the entire installation process.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="text-center space-y-6 py-8">
        <h2 className="text-3xl font-heading">Ready to Upgrade?</h2>
        <p className="text-lg text-text-secondary max-w-2xl mx-auto">
          Book your installation at a certified garage and get E20-ready in under an hour
        </p>
        <Link href="/garages" className="btn-primary inline-block text-lg px-8 py-4">
          Find Nearest Garage
        </Link>
      </section>
    </div>
  )
}