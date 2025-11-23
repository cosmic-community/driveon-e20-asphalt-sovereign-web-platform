// app/bikes/[slug]/page.tsx
import { cosmic } from '@/lib/cosmic'
import { Bike, hasStatus } from '@/types'
import Link from 'next/link'
import { Clock, Wrench, AlertCircle } from 'lucide-react'

async function getBike(slug: string) {
  try {
    const response = await cosmic.objects.findOne({
      type: 'bikes',
      slug,
    }).props(['id', 'title', 'slug', 'metadata', 'thumbnail'])
    
    return response.object as Bike
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null
    }
    throw error
  }
}

export default async function BikeDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const bike = await getBike(slug)

  if (!bike) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-3xl font-heading mb-4">Bike Not Found</h1>
        <p className="text-text-secondary mb-8">The bike you're looking for doesn't exist in our database.</p>
        <Link href="/bikes" className="btn-primary">View All Bikes</Link>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12 space-y-12">
      {/* Header */}
      <section className="space-y-4">
        <Link href="/bikes" className="text-driveon-green hover:text-green-400 text-sm">
          ← Back to All Bikes
        </Link>
        <h1 className="text-4xl md:text-5xl font-heading">
          {bike.metadata.make} {bike.metadata.model}
        </h1>
        {bike.metadata.year_range && (
          <p className="text-xl text-text-secondary">Years: {bike.metadata.year_range}</p>
        )}
      </section>

      {/* Hero Image */}
      {bike.thumbnail && (
        <div className="aspect-video overflow-hidden rounded-2xl max-w-4xl mx-auto">
          <img
            src={`${bike.thumbnail}?w=1600&h=900&fit=crop&auto=format,compress`}
            alt={`${bike.metadata.make} ${bike.metadata.model}`}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Technical Specifications */}
      <section className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <div className="card space-y-4">
          <h2 className="text-2xl font-heading mb-4">E20 Jet Specifications</h2>
          
          <div className="space-y-3">
            <div className="flex justify-between items-center pb-3 border-b border-text-secondary/20">
              <span className="text-text-secondary">Engine Displacement</span>
              <span className="text-2xl font-semibold">{bike.metadata.engine_cc}cc</span>
            </div>

            <div className="flex justify-between items-center pb-3 border-b border-text-secondary/20">
              <span className="text-text-secondary">Main Jet Size</span>
              <span className="text-2xl font-bold text-driveon-green">{bike.metadata.main_jet_size}</span>
            </div>

            <div className="flex justify-between items-center pb-3 border-b border-text-secondary/20">
              <span className="text-text-secondary">Pilot Jet Size</span>
              <span className="text-2xl font-bold text-driveon-green">{bike.metadata.pilot_jet_size}</span>
            </div>

            {bike.metadata.float_height && (
              <div className="flex justify-between items-center pb-3 border-b border-text-secondary/20">
                <span className="text-text-secondary">Float Height</span>
                <span className="text-xl font-semibold">{bike.metadata.float_height}mm</span>
              </div>
            )}

            {bike.metadata.install_duration && (
              <div className="flex items-center gap-2 pt-2">
                <Clock className="w-5 h-5 text-driveon-green" />
                <span className="text-text-secondary">Typical install time: </span>
                <span className="font-semibold">{bike.metadata.install_duration} minutes</span>
              </div>
            )}
          </div>
        </div>

        {/* Installation Notes */}
        {bike.metadata.special_instructions && (
          <div className="card space-y-4">
            <div className="flex items-center gap-2">
              <Wrench className="w-6 h-6 text-driveon-green" />
              <h2 className="text-2xl font-heading">Mechanic Notes</h2>
            </div>
            
            <div className="bg-driveon-amber/10 border border-driveon-amber/20 rounded-lg p-4">
              <div className="flex items-start gap-2">
                <AlertCircle className="w-5 h-5 text-driveon-amber flex-shrink-0 mt-1" />
                <p className="text-sm text-text-secondary leading-relaxed">
                  {bike.metadata.special_instructions}
                </p>
              </div>
            </div>

            <p className="text-xs text-text-secondary">
              These are model-specific installation notes for certified mechanics. Always refer to the installation guide during service.
            </p>
          </div>
        )}
      </section>

      {/* What's Included */}
      <section className="card max-w-4xl mx-auto bg-gradient-to-br from-driveon-green/5 to-transparent">
        <h2 className="text-2xl font-heading mb-6">Your E20 Upgrade Includes</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <ul className="space-y-3">
            <li className="flex items-start gap-2">
              <span className="text-driveon-green">✓</span>
              <span>J30R9 PTFE braided fuel hose (1.2m)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-driveon-green">✓</span>
              <span>Brass main jets (2x, size {bike.metadata.main_jet_size})</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-driveon-green">✓</span>
              <span>Brass pilot jets (2x, size {bike.metadata.pilot_jet_size})</span>
            </li>
          </ul>
          <ul className="space-y-3">
            <li className="flex items-start gap-2">
              <span className="text-driveon-green">✓</span>
              <span>Viton O-rings (4x, high-temp rated)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-driveon-green">✓</span>
              <span>Stainless worm-drive clamps (4x)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-driveon-green">✓</span>
              <span>QR-linked installation guide</span>
            </li>
          </ul>
        </div>
      </section>

      {/* CTA */}
      <section className="text-center space-y-6 py-8">
        <h2 className="text-3xl font-heading">Ready to Upgrade Your {bike.metadata.model}?</h2>
        <p className="text-lg text-text-secondary max-w-2xl mx-auto">
          Get E20-ready with certified installation at ₹2,999 (kit + service)
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/kit" className="btn-primary text-lg px-8 py-4">
            View Kit Details
          </Link>
          <Link href="/garages" className="btn-secondary text-lg px-8 py-4">
            Find Certified Garage
          </Link>
        </div>
      </section>
    </div>
  )
}