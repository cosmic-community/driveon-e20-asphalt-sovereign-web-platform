import { cosmic } from '@/lib/cosmic'
import { FAQ, hasStatus } from '@/types'
import { HelpCircle } from 'lucide-react'

async function getFAQs() {
  try {
    const response = await cosmic.objects
      .find({ type: 'faqs' })
      .props(['id', 'title', 'slug', 'metadata'])
    
    // Sort by order field
    const faqs = response.objects as FAQ[]
    return faqs.sort((a, b) => {
      const orderA = a.metadata.order || 999
      const orderB = b.metadata.order || 999
      return orderA - orderB
    })
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw error
  }
}

export default async function FAQPage() {
  const faqs = await getFAQs()

  // Group by category
  const faqsByCategory = faqs.reduce((acc, faq) => {
    const category = faq.metadata.category.value
    if (!acc[category]) {
      acc[category] = []
    }
    acc[category].push(faq)
    return acc
  }, {} as Record<string, FAQ[]>)

  const categoryOrder = ['Pricing', 'Compatibility', 'Installation', 'Technical', 'Warranty']

  return (
    <div className="container mx-auto px-4 py-12 space-y-12">
      {/* Header */}
      <section className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-driveon-green/10 border border-driveon-green rounded-full text-driveon-green text-sm font-semibold mb-4">
          <HelpCircle className="w-4 h-4" />
          <span>FAQ</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-heading">Frequently Asked Questions</h1>
        <p className="text-xl text-text-secondary max-w-3xl mx-auto">
          Common questions about E20 compatibility, installation, and warranty
        </p>
      </section>

      {/* FAQs by Category */}
      <section className="max-w-4xl mx-auto space-y-12">
        {categoryOrder.map((categoryName) => {
          const categoryFAQs = faqsByCategory[categoryName]
          
          if (!categoryFAQs || categoryFAQs.length === 0) {
            return null
          }

          return (
            <div key={categoryName} className="space-y-6">
              <h2 className="text-2xl font-heading text-driveon-green border-b border-text-secondary/20 pb-3">
                {categoryName}
              </h2>
              
              <div className="space-y-6">
                {categoryFAQs.map((faq) => (
                  <div key={faq.id} className="card">
                    <h3 className="text-xl font-heading mb-4">{faq.metadata.question}</h3>
                    <div 
                      className="prose prose-invert max-w-none"
                      dangerouslySetInnerHTML={{ __html: faq.metadata.answer }}
                    />
                  </div>
                ))}
              </div>
            </div>
          )
        })}

        {faqs.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl text-text-secondary">No FAQs found.</p>
          </div>
        )}
      </section>

      {/* Contact CTA */}
      <section className="card bg-gradient-to-br from-driveon-green/10 to-driveon-green/5 border-2 border-driveon-green/20 text-center space-y-6 py-8 max-w-2xl mx-auto">
        <h2 className="text-2xl font-heading">Still Have Questions?</h2>
        <p className="text-text-secondary">
          Can't find what you're looking for? Contact our support team or visit a certified garage for personalized assistance.
        </p>
      </section>
    </div>
  )
}