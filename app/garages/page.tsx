import { cosmic } from '@/lib/cosmic'
import { Garage, hasStatus } from '@/types'
import { MapPin, Phone, Clock, Star, Wrench } from 'lucide-react'

async function getGarages() {
  try {
    const response = await cosmic.objects
      .find({ type: 'garages' })
      .props(['id', 'title', 'slug', 'metadata'])
    
    return response.objects as Garage[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw error
  }
}

export default async function GaragesPage() {
  const garages = await getGarages()

  return (
    <div className="container mx-auto px-4 py-12 space-y-12">
      {/* Header */}
      <section className="text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-heading">Certified Garages</h1>
        <p className="text-xl text-text-secondary max-w-3xl mx-auto">
          Professional E20 kit installation at trusted locations across Bengaluru
        </p>
      </section>

      {/* Garages Grid */}
      {garages.length > 0 ? (
        <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {garages.map((garage) => (
            <div key={garage.id} className="card space-y-6">
              {/* Mechanic Photo */}
              {garage.metadata.mechanic_photo && (
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full overflow-hidden">
                    <img
                      src={`${garage.metadata.mechanic_photo.imgix_url}?w=128&h=128&fit=crop&auto=format,compress`}
                      alt={garage.metadata.lead_mechanic_name || 'Mechanic'}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {garage.metadata.certified && (
                    <div className="bg-driveon-green/10 text-driveon-green px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                      <Wrench className="w-3 h-3" />
                      Certified Installer
                    </div>
                  )}
                </div>
              )}

              {/* Garage Name */}
              <div>
                <h3 className="text-2xl font-heading mb-2">{garage.metadata.name}</h3>
                {garage.metadata.lead_mechanic_name && (
                  <p className="text-sm text-text-secondary">
                    Lead Mechanic: {garage.metadata.lead_mechanic_name}
                  </p>
                )}
              </div>

              {/* Stats */}
              <div className="flex items-center gap-4 text-sm">
                {garage.metadata.rating && (
                  <div className="flex items-center gap-1 text-driveon-green">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="font-semibold">{garage.metadata.rating}/5.0</span>
                  </div>
                )}
                {garage.metadata.total_installs && (
                  <span className="text-text-secondary">
                    {garage.metadata.total_installs} installs completed
                  </span>
                )}
              </div>

              {/* Address */}
              <div className="space-y-2 text-sm">
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-driveon-green flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-text-primary">{garage.metadata.address}</p>
                    <p className="text-text-secondary">
                      {garage.metadata.city}, {garage.metadata.state} - {garage.metadata.pin_code}
                    </p>
                  </div>
                </div>

                {garage.metadata.operating_hours && (
                  <div className="flex items-start gap-2">
                    <Clock className="w-4 h-4 text-driveon-green flex-shrink-0 mt-1" />
                    <p className="text-text-secondary">{garage.metadata.operating_hours}</p>
                  </div>
                )}

                <div className="flex items-start gap-2">
                  <Phone className="w-4 h-4 text-driveon-green flex-shrink-0 mt-1" />
                  <a 
                    href={`tel:${garage.metadata.phone_number}`}
                    className="text-driveon-green hover:text-green-400 transition-colors"
                  >
                    {garage.metadata.phone_number}
                  </a>
                </div>
              </div>

              {/* CTA */}
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${garage.metadata.latitude},${garage.metadata.longitude}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary block text-center"
              >
                Get Directions
              </a>
            </div>
          ))}
        </section>
      ) : (
        <div className="text-center py-12">
          <p className="text-xl text-text-secondary">No garages found.</p>
        </div>
      )}

      {/* Info Section */}
      <section className="card bg-gradient-to-br from-driveon-green/5 to-transparent max-w-4xl mx-auto">
        <h2 className="text-2xl font-heading mb-6">What to Expect</h2>
        <div className="space-y-4 text-text-secondary">
          <p>
            All Driveon certified garages follow the same installation protocol to ensure consistent quality. Your installation includes:
          </p>
          <ul className="space-y-2 ml-6">
            <li className="flex items-start gap-2">
              <span className="text-driveon-green">•</span>
              <span>Pre-installation bike inspection</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-driveon-green">•</span>
              <span>Complete carburetor service</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-driveon-green">•</span>
              <span>PTFE hose and jet installation</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-driveon-green">•</span>
              <span>Leak pressure test</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-driveon-green">•</span>
              <span>Test ride verification</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-driveon-green">•</span>
              <span>Digital certificate with QR code</span>
            </li>
          </ul>
          <p className="pt-4">
            Installation typically takes 45-60 minutes. We recommend calling ahead to book your preferred time slot.
          </p>
        </div>
      </section>
    </div>
  )
}