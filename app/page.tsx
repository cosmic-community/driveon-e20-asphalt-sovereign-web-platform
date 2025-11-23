import { cosmic } from '@/lib/cosmic'
import { Kit, Garage, LearnArticle, hasStatus } from '@/types'
import Link from 'next/link'
import { Wrench, BookOpen, MapPin, Shield } from 'lucide-react'

async function getHomeData() {
  try {
    const [kitsResponse, garagesResponse, articlesResponse] = await Promise.all([
      cosmic.objects.find({ type: 'kits' }).props(['id', 'title', 'slug', 'metadata']).depth(1),
      cosmic.objects.find({ type: 'garages' }).props(['id', 'title', 'slug', 'metadata']),
      cosmic.objects.find({ type: 'learn-articles' }).props(['id', 'title', 'slug', 'metadata']),
    ])

    return {
      kit: kitsResponse.objects[0] as Kit,
      garages: garagesResponse.objects.slice(0, 3) as Garage[],
      articles: articlesResponse.objects.slice(0, 3) as LearnArticle[],
    }
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return { kit: null, garages: [], articles: [] }
    }
    throw error
  }
}

export default async function HomePage() {
  const { kit, garages, articles } = await getHomeData()

  return (
    <div className="container mx-auto px-4 py-12 space-y-24">
      {/* Hero Section */}
      <section className="text-center space-y-6">
        <div className="inline-block px-4 py-2 bg-driveon-green/10 border border-driveon-green rounded-full text-driveon-green text-sm font-semibold mb-4">
          Asphalt Sovereign — E20 Ready. Engine Safe.
        </div>
        <h1 className="text-4xl md:text-6xl font-heading font-bold leading-tight">
          Hardware-First E20
          <br />
          <span className="text-driveon-green">Fuel Conversion Kit</span>
        </h1>
        <p className="text-xl text-text-secondary max-w-3xl mx-auto">
          Upgrade your carbureted bike for E20 compatibility. PTFE hoses, brass jets, Viton O-rings — zero ECU tampering. Your warranty stays safe.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <Link href="/kit" className="btn-primary text-lg px-8 py-4">
            Buy & Book — ₹2,999
          </Link>
          <Link href="/garages" className="btn-secondary text-lg px-8 py-4">
            Find Certified Garage
          </Link>
        </div>
      </section>

      {/* Featured Kit */}
      {kit && (
        <section className="space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-3xl md:text-4xl font-heading">Complete E20 Kit</h2>
            <p className="text-text-secondary">Everything you need for E20 readiness in one package</p>
          </div>
          
          <div className="card max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="aspect-square relative overflow-hidden rounded-lg">
                <img
                  src={`${kit.metadata.product_image.imgix_url}?w=800&h=800&fit=crop&auto=format,compress`}
                  alt={kit.metadata.kit_name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-heading mb-2">{kit.metadata.kit_name}</h3>
                  <p className="text-text-secondary">{kit.metadata.description}</p>
                </div>
                
                <div className="flex items-baseline gap-3">
                  <span className="text-4xl font-bold text-driveon-green">₹{kit.metadata.price}</span>
                  {kit.metadata.original_price && (
                    <span className="text-xl text-text-secondary line-through">₹{kit.metadata.original_price}</span>
                  )}
                </div>
                
                <div className="bg-asphalt rounded-lg p-4">
                  <p className="text-sm text-text-secondary mb-2">Installation Fee</p>
                  <p className="text-2xl font-semibold">₹{kit.metadata.install_price}</p>
                </div>
                
                <Link href="/kit" className="btn-primary block">
                  View Full Details
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Why Driveon */}
      <section className="space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-3xl md:text-4xl font-heading">Why Driveon?</h2>
          <p className="text-text-secondary">Engineering-first approach to E20 compatibility</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="card space-y-4">
            <div className="w-12 h-12 bg-driveon-green/10 rounded-lg flex items-center justify-center">
              <Shield className="w-6 h-6 text-driveon-green" />
            </div>
            <h3 className="text-xl font-heading">Warranty-Safe</h3>
            <p className="text-text-secondary">
              Zero ECU modifications. All hardware replacements use OEM-spec materials. Your manufacturer warranty stays intact.
            </p>
          </div>

          <div className="card space-y-4">
            <div className="w-12 h-12 bg-driveon-green/10 rounded-lg flex items-center justify-center">
              <Wrench className="w-6 h-6 text-driveon-green" />
            </div>
            <h3 className="text-xl font-heading">Certified Installation</h3>
            <p className="text-text-secondary">
              Trained mechanics with bike-specific jet charts. Pressure-tested connections, photo documentation, and digital certificates.
            </p>
          </div>

          <div className="card space-y-4">
            <div className="w-12 h-12 bg-driveon-green/10 rounded-lg flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-driveon-green" />
            </div>
            <h3 className="text-xl font-heading">30-Day Guarantee</h3>
            <p className="text-text-secondary">
              Full service guarantee on all installations. Any issues within 30 days? Free re-check and adjustment at certified garages.
            </p>
          </div>
        </div>
      </section>

      {/* Certified Garages */}
      {garages.length > 0 && (
        <section className="space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-3xl md:text-4xl font-heading">Certified Garages</h2>
            <p className="text-text-secondary">Professional installation at trusted locations</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {garages.map((garage) => (
              <div key={garage.id} className="card space-y-4">
                {garage.metadata.mechanic_photo && (
                  <div className="w-20 h-20 rounded-full overflow-hidden">
                    <img
                      src={`${garage.metadata.mechanic_photo.imgix_url}?w=160&h=160&fit=crop&auto=format,compress`}
                      alt={garage.metadata.lead_mechanic_name || 'Mechanic'}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div>
                  <h3 className="text-xl font-heading mb-1">{garage.metadata.name}</h3>
                  <p className="text-sm text-text-secondary">{garage.metadata.city}</p>
                </div>
                
                <div className="flex items-center gap-4 text-sm">
                  {garage.metadata.rating && (
                    <span className="text-driveon-green">★ {garage.metadata.rating}/5.0</span>
                  )}
                  {garage.metadata.total_installs && (
                    <span className="text-text-secondary">{garage.metadata.total_installs} installs</span>
                  )}
                </div>

                {garage.metadata.lead_mechanic_name && (
                  <p className="text-sm">
                    <span className="text-text-secondary">Lead Mechanic: </span>
                    <span className="text-text-primary">{garage.metadata.lead_mechanic_name}</span>
                  </p>
                )}
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link href="/garages" className="btn-secondary inline-block">
              <MapPin className="inline w-5 h-5 mr-2" />
              View All Garages
            </Link>
          </div>
        </section>
      )}

      {/* Learn Articles */}
      {articles.length > 0 && (
        <section className="space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-3xl md:text-4xl font-heading">Learn About E20</h2>
            <p className="text-text-secondary">Essential knowledge for E20 compatibility</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {articles.map((article) => (
              <Link key={article.id} href={`/learn/${article.slug}`} className="card hover:border-driveon-green border border-transparent transition-colors duration-200 space-y-4">
                {article.metadata.featured_image && (
                  <div className="aspect-video overflow-hidden rounded-lg">
                    <img
                      src={`${article.metadata.featured_image.imgix_url}?w=800&h=450&fit=crop&auto=format,compress`}
                      alt={article.metadata.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div>
                  <span className="text-xs text-driveon-green font-semibold uppercase tracking-wide">
                    {article.metadata.category.value}
                  </span>
                  <h3 className="text-xl font-heading mt-2 mb-3">{article.metadata.title}</h3>
                  {article.metadata.read_time && (
                    <p className="text-sm text-text-secondary">{article.metadata.read_time} min read</p>
                  )}
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center">
            <Link href="/learn" className="btn-secondary inline-block">
              <BookOpen className="inline w-5 h-5 mr-2" />
              Explore All Articles
            </Link>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="card bg-gradient-to-br from-driveon-green/10 to-driveon-green/5 border-2 border-driveon-green/20 text-center space-y-6 py-12">
        <h2 className="text-3xl md:text-4xl font-heading">Ready for E20?</h2>
        <p className="text-xl text-text-secondary max-w-2xl mx-auto">
          Get your bike upgraded with certified installation at ₹2,999 (kit + service)
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/kit" className="btn-primary text-lg px-8 py-4">
            Buy Driveon Kit
          </Link>
          <Link href="/bikes" className="btn-secondary text-lg px-8 py-4">
            Check Compatibility
          </Link>
        </div>
      </section>
    </div>
  )
}