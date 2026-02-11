import { Link } from '@tanstack/react-router';
import { Heart } from 'lucide-react';
import { BRAND } from '@/constants/brand';
import HostingerZipDownloadLink from './HostingerZipDownloadLink';

const footerLinks = {
  company: [
    { name: 'About Us', href: '/about' },
    { name: 'Partner Support', href: '/partner-support' },
    { name: 'Insurance Services', href: '/insurance-services' },
    { name: 'Contact Us', href: '/contact' },
    { name: 'Page 2', href: '/page-2' },
    { name: 'Page 3', href: '/page-3' },
    { name: 'Page 4', href: '/page-4' },
    { name: 'Page 5', href: '/page-5' },
  ],
  legal: [
    { name: 'Privacy Policy', href: '/privacy-policy' },
    { name: 'Terms of Use', href: '/terms-of-use' },
    { name: 'Disclaimer', href: '/disclaimer' },
  ],
};

export default function Footer() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="container py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Brand Section */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <img
                src={BRAND.logo.path}
                alt={BRAND.logo.alt}
                width={BRAND.logo.displaySize.width}
                height={BRAND.logo.displaySize.height}
                className="h-10 w-10"
              />
              <span className="text-xl font-bold text-primary">{BRAND.name}</span>
            </div>
            <p className="text-sm text-muted-foreground max-w-md">
              Supporting PBPartners (Policybazaar Insurance Broker Pvt. Ltd.) by helping insurance
              partners with onboarding, document support, and business development.
            </p>
            <div className="mt-4">
              <p className="text-sm font-semibold text-foreground">Contact Information</p>
              <p className="text-sm text-muted-foreground mt-2">
                Email:{' '}
                <a href="mailto:info@pbpartnershub.in" className="hover:text-primary transition-colors">
                  info@pbpartnershub.in
                </a>
                ,{' '}
                <a href="mailto:support@pbpartnershub.in" className="hover:text-primary transition-colors">
                  support@pbpartnershub.in
                </a>
                ,{' '}
                <a href="mailto:Prashant.pbp47@gmail.com" className="hover:text-primary transition-colors">
                  Prashant.pbp47@gmail.com
                </a>
              </p>
              <p className="text-sm text-muted-foreground">
                Mobile:{' '}
                <a href="tel:7972584060" className="hover:text-primary transition-colors">
                  7972584060
                </a>
              </p>
              <p className="text-sm text-muted-foreground">
                WhatsApp:{' '}
                <a
                  href="https://wa.me/7709446589"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors"
                >
                  7709446589
                </a>
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                Address: Flat No 2, Sudarshan Housing Society, Indira Nagar, Nashik, Maharashtra 422009, District Nashik
              </p>
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4">Legal</h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Hostinger ZIP Download */}
        <div className="mt-8 pt-6 border-t">
          <HostingerZipDownloadLink />
        </div>

        <div className="mt-8 pt-8 border-t">
          <p className="text-center text-sm text-muted-foreground flex items-center justify-center gap-1 flex-wrap">
            © 2026. Built with{' '}
            <Heart className="h-4 w-4 text-red-500 fill-red-500" /> using{' '}
            <a
              href="https://caffeine.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
