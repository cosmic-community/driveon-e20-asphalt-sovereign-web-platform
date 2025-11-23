// app/learn/[slug]/page.tsx
import { cosmic } from '@/lib/cosmic'
import { LearnArticle, hasStatus } from '@/types'
import Link from 'next/link'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Clock, ArrowLeft } from 'lucide-react'

async function getArticle(slug: string) {
  try {
    const response = await cosmic.objects.findOne({
      type: 'learn-articles',
      slug,
    }).props(['id', 'title', 'slug', 'metadata'])
    
    return response.object as LearnArticle
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null
    }
    throw error
  }
}

export default async function LearnArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const article = await getArticle(slug)

  if (!article) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-3xl font-heading mb-4">Article Not Found</h1>
        <p className="text-text-secondary mb-8">The article you're looking for doesn't exist.</p>
        <Link href="/learn" className="btn-primary">Back to Learn Hub</Link>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <article className="max-w-4xl mx-auto space-y-8">
        {/* Back Link */}
        <Link href="/learn" className="inline-flex items-center gap-2 text-driveon-green hover:text-green-400 text-sm">
          <ArrowLeft className="w-4 h-4" />
          Back to Learn Hub
        </Link>

        {/* Header */}
        <header className="space-y-4">
          <div className="flex items-center gap-4">
            <span className="text-xs text-driveon-green font-semibold uppercase tracking-wide px-3 py-1 bg-driveon-green/10 rounded-full">
              {article.metadata.category.value}
            </span>
            {article.metadata.read_time && (
              <div className="flex items-center gap-1 text-sm text-text-secondary">
                <Clock className="w-4 h-4" />
                <span>{article.metadata.read_time} min read</span>
              </div>
            )}
          </div>

          <h1 className="text-4xl md:text-5xl font-heading">{article.metadata.title}</h1>
        </header>

        {/* Featured Image */}
        {article.metadata.featured_image && (
          <div className="aspect-video overflow-hidden rounded-2xl">
            <img
              src={`${article.metadata.featured_image.imgix_url}?w=1600&h=900&fit=crop&auto=format,compress`}
              alt={article.metadata.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Content */}
        <div className="prose prose-invert max-w-none">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {article.metadata.content}
          </ReactMarkdown>
        </div>

        {/* CTA */}
        <div className="card bg-gradient-to-br from-driveon-green/10 to-driveon-green/5 border-2 border-driveon-green/20 text-center space-y-4 py-8 mt-12">
          <h3 className="text-2xl font-heading">Ready to Upgrade?</h3>
          <p className="text-text-secondary">Get E20-ready with certified installation</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/kit" className="btn-primary">
              View E20 Kit
            </Link>
            <Link href="/garages" className="btn-secondary">
              Find Garage
            </Link>
          </div>
        </div>
      </article>
    </div>
  )
}