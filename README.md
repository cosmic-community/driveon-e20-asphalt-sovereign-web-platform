# Driveon E20 — Asphalt Sovereign Web Platform

![App Preview](https://imgix.cosmicjs.com/d9b02af0-c877-11f0-a09b-cf490795a585-photo-1581092918056-0c4c3acd3789-1763907752416.jpg?w=1200&h=300&fit=crop&auto=format,compress)

A production-ready web platform for Driveon's E20 fuel conversion kit business. This application serves both riders seeking E20 compatibility upgrades and certified mechanics performing installations. Built with a rugged, automotive-engineering aesthetic — premium but practical, with hardware-first trust signals and safety-focused language.

## Features

- 🏍️ **Complete E20 Kit Showcase** — Detailed product information with component breakdowns, bike compatibility, and transparent pricing
- 🔧 **Certified Garage Network** — Interactive garage locator with mechanic profiles, ratings, and real-time availability
- 📚 **Educational Hub** — Learn articles covering E20 basics, carburetor upgrades, fuel leak detection, and DIY checks
- 🏁 **Bike Compatibility Database** — Searchable catalog of 100-200cc carbureted bikes with technical specifications
- 💬 **FAQ System** — Categorized Q&A covering warranty, compatibility, pricing, and installation details
- 📱 **Mobile-First Design** — Responsive interface optimized for workshop environments and field use
- 🎨 **Automotive UX** — Asphalt-textured dark theme with matte metal panels and engineering-focused typography

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmicjs.com/projects/new?clone_bucket=692313dcb183692bb397f323&clone_repository=69231affb183692bb397f3e9)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> Build a high-end, production-ready mobile UI for the Driveon / Asphalt Sovereign app that sells and installs the Driveon E20 Kit and supports mechanic installs and admin telemetry. This must be a polished, rugged, automotive-engineering UX — premium but practical. Include the following in the output: 1) A design analysis summary (2–3 short paragraphs) explaining the UX choices and evidence-based reasons (mechanic workflow minimises cognitive load; riders prefer service-priced offers; hardware-first trust signals like boxed kit + certificate; safety-first language avoids warranty fears). 2) A visual design system (color palette, typography, elevation, iconography, grid, spacing rules). 3) A prioritized screen list (14 screens) and exact content for each screen. 4) Reusable components with states (buttons, cards, checklists, certificate card, upload widget, timeline, badge). 5) Interaction notes & microcopy (error states, success toasts, onboarding copy, mechanic checklist copy). 6) Accessibility & localization notes (contrast ratios, text sizes, Tamil & Telugu copy placeholders). 7) Data capture / analytics plan for Phase-2 (fields to collect during install, image naming, tolerances). 8) Delivery format: produce Figma-ready screens, component frames, and Flutter-friendly layout hints (use standard safe-area sizes, 16/24 spacing, and list the Flutter widget equivalents). 9) Exportable assets list and filenames; include the Driveon product image. 10) A single short "pitch-ready" one-screen summary that can be exported as a PNG for the SRM deck.

### Code Generation Prompt

> Based on the content model I created for "Build a high-end, production-ready mobile UI for the Driveon / Asphalt Sovereign app that sells and installs the Driveon E20 Kit and supports mechanic installs and admin telemetry. This must be a polished, rugged, automotive-engineering UX — premium but practical.", now build a complete web application that showcases this content. Include a modern, responsive design with proper navigation, content display, and user-friendly interface.

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies

- **Next.js 16** — React framework with App Router for server-side rendering and optimal performance
- **TypeScript** — Strict typing for enhanced code quality and developer experience
- **Tailwind CSS** — Utility-first styling with custom design system (asphalt theme, automotive colors)
- **Cosmic SDK** — Headless CMS integration for bikes, kits, garages, learn articles, and FAQs
- **Lucide Icons** — Clean, automotive-appropriate icon library
- **React Markdown** — Content rendering for learn articles

## Getting Started

### Prerequisites

- Node.js 18+ or Bun runtime
- Cosmic account with bucket containing Driveon content model
- Environment variables (Cosmic credentials)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd driveon-e20-web
```

2. Install dependencies:
```bash
bun install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

Edit `.env.local` with your Cosmic credentials:
```env
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
COSMIC_WRITE_KEY=your-write-key
```

4. Run the development server:
```bash
bun run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Cosmic SDK Examples

### Fetching Kits with Compatible Bikes (Server Component)

```typescript
// app/page.tsx
import { cosmic } from '@/lib/cosmic'

export default async function HomePage() {
  const { objects: kits } = await cosmic.objects
    .find({ type: 'kits' })
    .props(['id', 'title', 'slug', 'metadata'])
    .depth(1) // Includes nested compatible_bikes objects

  return (
    <div>
      {kits.map((kit: Kit) => (
        <div key={kit.id}>
          <h2>{kit.metadata.kit_name}</h2>
          <p>₹{kit.metadata.price}</p>
          <h3>Compatible Bikes:</h3>
          <ul>
            {kit.metadata.compatible_bikes?.map((bike: Bike) => (
              <li key={bike.id}>{bike.metadata.make} {bike.metadata.model}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}
```

### Fetching Garages with Location Data

```typescript
// app/garages/page.tsx
import { cosmic } from '@/lib/cosmic'

export default async function GaragesPage() {
  const { objects: garages } = await cosmic.objects
    .find({ type: 'garages' })
    .props(['id', 'title', 'slug', 'metadata'])

  return (
    <div>
      {garages.map((garage: Garage) => (
        <div key={garage.id}>
          <h3>{garage.metadata.name}</h3>
          <p>{garage.metadata.address}</p>
          <p>Rating: {garage.metadata.rating}/5.0</p>
          <p>Installs: {garage.metadata.total_installs}</p>
          <p>Lead Mechanic: {garage.metadata.lead_mechanic_name}</p>
        </div>
      ))}
    </div>
  )
}
```

### Fetching Learn Articles by Category

```typescript
// app/learn/page.tsx
import { cosmic } from '@/lib/cosmic'

export default async function LearnPage() {
  const { objects: articles } = await cosmic.objects
    .find({ type: 'learn-articles' })
    .props(['id', 'title', 'slug', 'metadata'])

  // Group by category
  const articlesByCategory = articles.reduce((acc, article: LearnArticle) => {
    const category = article.metadata.category.value
    if (!acc[category]) acc[category] = []
    acc[category].push(article)
    return acc
  }, {} as Record<string, LearnArticle[]>)

  return (
    <div>
      {Object.entries(articlesByCategory).map(([category, articles]) => (
        <section key={category}>
          <h2>{category}</h2>
          {articles.map((article) => (
            <article key={article.id}>
              <h3>{article.metadata.title}</h3>
              <p>Read time: {article.metadata.read_time} min</p>
            </article>
          ))}
        </section>
      ))}
    </div>
  )
}
```

## Cosmic CMS Integration

This application uses the Cosmic headless CMS with the following content structure:

### Object Types

1. **Bikes** — Technical specifications for carbureted motorcycles
   - Make, model, year range, engine CC
   - Jet sizes (main + pilot) for E20 compatibility
   - Float height and installation duration
   - Model-specific mechanic instructions

2. **Kits** — E20 conversion kit products
   - SKU, pricing (kit + installation)
   - Component list (JSON format)
   - Product images and descriptions
   - Links to compatible bikes (object metafield)
   - Stock status

3. **Garages** — Certified installation locations
   - Name, address, GPS coordinates
   - Contact information and operating hours
   - Mechanic profiles with photos
   - Install counts and ratings
   - Certification status

4. **Learn Articles** — Educational content
   - Markdown content with featured images
   - Icon type (fuel, carb, magnify, checklist, wrench)
   - Read time and category
   - SEO-friendly slugs

5. **FAQs** — Customer support Q&A
   - Question and HTML-formatted answer
   - Category (warranty, compatibility, pricing, technical)
   - Display order

### Key Integration Patterns

- **Server-side data fetching** — All Cosmic calls in Server Components for optimal performance
- **Depth parameter** — Fetches nested object relationships (kit → bikes) in single query
- **Type safety** — Complete TypeScript interfaces for all Cosmic objects
- **Image optimization** — Uses imgix_url with query parameters for responsive images
- **Error handling** — 404 checks and empty state management

## Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables:
   - `COSMIC_BUCKET_SLUG`
   - `COSMIC_READ_KEY`
   - `COSMIC_WRITE_KEY`
4. Deploy

### Deploy to Netlify

1. Connect repository to Netlify
2. Set build command: `bun run build`
3. Set publish directory: `.next`
4. Add environment variables in site settings
5. Deploy

### Environment Variables (Production)

Set these in your hosting platform's dashboard:

```env
COSMIC_BUCKET_SLUG=your-production-bucket-slug
COSMIC_READ_KEY=your-production-read-key
COSMIC_WRITE_KEY=your-production-write-key
```

## Design System

### Color Palette

- **Primary Background**: `#0C0C0C` (Asphalt matte with 4% texture overlay)
- **Primary Accent**: `#34D07C` (Driveon Amber-Green)
- **Secondary Accent**: `#FFB64D` (Warm Amber for warnings/CTAs)
- **Text High-Contrast**: `#FFFFFF`
- **Text Secondary**: `#B9B9B9`
- **Card Background**: `#111213`
- **Card Shadow**: `rgba(0,0,0,0.45)` with 6px blur

### Typography

- **Headings**: Inter/Poppins Semi-Bold
  - H1: 28-34px
  - H2: 22-26px
- **Body**: Inter Regular
  - Body: 14-16px
  - Caption: 12px

### Spacing

- Base: 16px
- Section: 24px
- Large gaps: 32px
- Minor increments: 8px

## License

MIT

---

Built with [Cosmic](https://www.cosmicjs.com) — The headless CMS for modern applications.

<!-- README_END -->