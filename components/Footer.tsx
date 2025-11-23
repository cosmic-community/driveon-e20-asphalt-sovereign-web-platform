import Link from 'next/link'
import { Mail, Phone, MapPin } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-asphalt-card border-t border-text-secondary/10 mt-24">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-driveon-green rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">D</span>
              </div>
              <span className="font-heading font-bold text-xl">Driveon</span>
            </div>
            <p className="text-sm text-text-secondary">
              Hardware-first E20 compatibility upgrades for carbureted motorcycles.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-heading font-semibold">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/kit" className="text-text-secondary hover:text-driveon-green transition-colors">
                  E20 Kit
                </Link>
              </li>
              <li>
                <Link href="/garages" className="text-text-secondary hover:text-driveon-green transition-colors">
                  Find Garages
                </Link>
              </li>
              <li>
                <Link href="/bikes" className="text-text-secondary hover:text-driveon-green transition-colors">
                  Compatible Bikes
                </Link>
              </li>
              <li>
                <Link href="/learn" className="text-text-secondary hover:text-driveon-green transition-colors">
                  Learn Hub
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-text-secondary hover:text-driveon-green transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h3 className="font-heading font-semibold">Support</h3>
            <ul className="space-y-2 text-sm text-text-secondary">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-driveon-green" />
                <span>support@driveon.in</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-driveon-green" />
                <span>1800-XXX-XXXX</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-driveon-green flex-shrink-0 mt-1" />
                <span>Bengaluru, Karnataka</span>
              </li>
            </ul>
          </div>

          {/* Warranty Info */}
          <div className="space-y-4">
            <h3 className="font-heading font-semibold">Warranty Safe</h3>
            <p className="text-sm text-text-secondary">
              All Driveon upgrades use OEM-spec materials and zero ECU modifications. Your manufacturer warranty stays intact.
            </p>
            <div className="inline-block px-3 py-1 bg-driveon-green/10 border border-driveon-green rounded-full text-driveon-green text-xs font-semibold">
              30-Day Service Guarantee
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-text-secondary/10 mt-12 pt-8 text-center text-sm text-text-secondary">
          <p>© {currentYear} Driveon. All rights reserved. Asphalt Sovereign — E20 Ready. Engine Safe.</p>
        </div>
      </div>
    </footer>
  )
}