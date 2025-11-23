import { cosmic } from '@/lib/cosmic'
import { Bike, hasStatus } from '@/types'
import Link from 'next/link'
import { Search } from 'lucide-react'

async function getBikes() {
  try {
    const response = await cosmic.objects
      .find({ type: 'bikes' })
      .props(['id', 'title', 'slug', 'metadata', 'thumbnail'])
    
    return response.objects as Bike[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw error
  }
}

export default async function BikesPage() {
  const bikes = await getBikes()

  // Group bikes by make
  const bikesByMake = bikes.reduce((acc, bike) => {
    const make = bike.metadata.make
    if (!acc[make]) {
      acc[make] = []
    }
    acc[make].push(bike)
    return acc
  }, {} as Record<string, Bike[]>)

  return (
    <div className="container mx-auto px-4 py-12 space-y-12">
      {/* Header */}
      <section className="text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-heading">Compatible Bikes</h1>
        <p className="text-xl text-text-secondary max-w-3xl mx-auto">
          Verified E20 compatibility for carbureted 100-200cc motorcycles (2010+)
        </p>
      </section>

      {/* Search Info */}
      <div className="card max-w-2xl mx-auto bg-gradient-to-br from-driveon-green/5 to-transparent">
        <div className="flex items-start gap-4">
          <Search className="w-6 h-6 text-driveon-green flex-shrink-0" />
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Find Your Bike</h3>
            <p className="text-sm text-text-secondary">
              All bikes listed have verified jet sizes and installation procedures. If your bike isn't listed, contact us for compatibility verification.
            </p>
          </div>
        </div>
      </div>

      {/* Bikes by Make */}
      {Object.keys(bikesByMake).length > 0 ? (
        <section className="space-y-12">
          {Object.entries(bikesByMake).map(([make, bikes]) => (
            <div key={make} className="space-y-6">
              <h2 className="text-3xl font-heading border-b border-text-secondary/20 pb-3">
                {make}
              </h2>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {bikes.map((bike) => (
                  <Link
                    key={bike.id}
                    href={`/bikes/${bike.slug}`}
                    className="card hover:border-driveon-green border border-transparent transition-colors duration-200"
                  >
                    {bike.thumbnail && (
                      <div className="aspect-video overflow-hidden rounded-lg mb-4">
                        <img
                          src={`${bike.thumbnail}?w=800&h=450&fit=crop&auto=format,compress`}
                          alt={`${bike.metadata.make} ${bike.metadata.model}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}

                    <h3 className="text-xl font-heading mb-3">
                      {bike.metadata.make} {bike.metadata.model}
                    </h3>

                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-text-secondary">Year Range</span>
                        <span className="text-text-primary">{bike.metadata.year_range}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-text-secondary">Engine</span>
                        <span className="text-text-primary">{bike.metadata.engine_cc}cc</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-text-secondary">Main Jet</span>
                        <span className="text-driveon-green font-semibold">{bike.metadata.main_jet_size}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-text-secondary">Pilot Jet</span>
                        <span className="text-driveon-green font-semibold">{bike.metadata.pilot_jet_size}</span>
                      </div>
                      {bike.metadata.install_duration && (
                        <div className="flex justify-between pt-2 border-t border-text-secondary/20">
                          <span className="text-text-secondary">Install Time</span>
                          <span className="text-text-primary">{bike.metadata.install_duration} min</span>
                        </div>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </section>
      ) : (
        <div className="text-center py-12">
          <p className="text-xl text-text-secondary">No bikes found in database.</p>
        </div>
      )}

      {/* CTA */}
      <section className="card bg-gradient-to-br from-driveon-green/10 to-driveon-green/5 border-2 border-driveon-green/20 text-center space-y-6 py-8">
        <h2 className="text-2xl font-heading">Bike Not Listed?</h2>
        <p className="text-text-secondary max-w-2xl mx-auto">
          We're constantly adding new bike models. Contact us to verify E20 compatibility for your specific bike.
        </p>
        <Link href="/kit" className="btn-primary inline-block">
          View E20 Kit Details
        </Link>
      </section>
    </div>
  )
}