import { cosmic } from '@/lib/cosmic'
import { LearnArticle, hasStatus } from '@/types'
import Link from 'next/link'
import { BookOpen, Fuel, Wrench, Search, CheckSquare } from 'lucide-react'

const iconMap = {
  fuel: Fuel,
  carb: Wrench,
  magnify: Search,
  checklist: CheckSquare,
  wrench: Wrench,
}

async function getLearnArticles() {
  try {
    const response = await cosmic.objects
      .find({ type: 'learn-articles' })
      .props(['id', 'title', 'slug', 'metadata'])
    
    return response.objects as LearnArticle[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw error
  }
}

export default async function LearnPage() {
  const articles = await getLearnArticles()

  // Group by category
  const articlesByCategory = articles.reduce((acc, article) => {
    const category = article.metadata.category.value
    if (!acc[category]) {
      acc[category] = []
    }
    acc[category].push(article)
    return acc
  }, {} as Record<string, LearnArticle[]>)

  const categoryOrder = ['E20 Basics', 'Maintenance', 'Troubleshooting', 'DIY Checks']

  return (
    <div className="container mx-auto px-4 py-12 space-y-12">
      {/* Header */}
      <section className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-driveon-green/10 border border-driveon-green rounded-full text-driveon-green text-sm font-semibold mb-4">
          <BookOpen className="w-4 h-4" />
          <span>Learn Hub</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-heading">E20 Knowledge Base</h1>
        <p className="text-xl text-text-secondary max-w-3xl mx-auto">
          Essential information about E20 fuel, carburetor upgrades, and motorcycle maintenance
        </p>
      </section>

      {/* Articles by Category */}
      {categoryOrder.map((categoryName) => {
        const categoryArticles = articlesByCategory[categoryName]
        
        if (!categoryArticles || categoryArticles.length === 0) {
          return null
        }

        return (
          <section key={categoryName} className="space-y-6">
            <h2 className="text-3xl font-heading border-b border-text-secondary/20 pb-3">
              {categoryName}
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categoryArticles.map((article) => {
                const IconComponent = iconMap[article.metadata.icon_type.key as keyof typeof iconMap] || BookOpen
                
                return (
                  <Link
                    key={article.id}
                    href={`/learn/${article.slug}`}
                    className="card hover:border-driveon-green border border-transparent transition-colors duration-200 space-y-4"
                  >
                    {article.metadata.featured_image && (
                      <div className="aspect-video overflow-hidden rounded-lg">
                        <img
                          src={`${article.metadata.featured_image.imgix_url}?w=800&h=450&fit=crop&auto=format,compress`}
                          alt={article.metadata.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}

                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-driveon-green/10 rounded-lg flex items-center justify-center">
                        <IconComponent className="w-5 h-5 text-driveon-green" />
                      </div>
                      <span className="text-xs text-driveon-green font-semibold uppercase tracking-wide">
                        {article.metadata.category.value}
                      </span>
                    </div>

                    <h3 className="text-xl font-heading">{article.metadata.title}</h3>

                    {article.metadata.read_time && (
                      <p className="text-sm text-text-secondary">
                        {article.metadata.read_time} min read
                      </p>
                    )}
                  </Link>
                )
              })}
            </div>
          </section>
        )
      })}

      {articles.length === 0 && (
        <div className="text-center py-12">
          <p className="text-xl text-text-secondary">No articles found.</p>
        </div>
      )}

      {/* CTA */}
      <section className="card bg-gradient-to-br from-driveon-green/10 to-driveon-green/5 border-2 border-driveon-green/20 text-center space-y-6 py-8">
        <h2 className="text-2xl font-heading">Have More Questions?</h2>
        <p className="text-text-secondary max-w-2xl mx-auto">
          Check our FAQ section for answers to common questions about E20 compatibility, installation, and warranty.
        </p>
        <Link href="/faq" className="btn-primary inline-block">
          View FAQ
        </Link>
      </section>
    </div>
  )
}