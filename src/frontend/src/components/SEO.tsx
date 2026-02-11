import { useEffect } from 'react';

interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  type?: string;
}

export default function SEO({ title, description, canonical, type = 'website' }: SEOProps) {
  useEffect(() => {
    const fullTitle = `${title} | PB Partners Hub`;
    const baseUrl = window.location.origin;
    const canonicalUrl = canonical ? `${baseUrl}${canonical}` : baseUrl;

    // Update title
    document.title = fullTitle;

    // Update or create meta tags
    const updateMetaTag = (name: string, content: string, isProperty = false) => {
      const attribute = isProperty ? 'property' : 'name';
      let element = document.querySelector(`meta[${attribute}="${name}"]`);
      
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, name);
        document.head.appendChild(element);
      }
      
      element.setAttribute('content', content);
    };

    // Update or create link tags
    const updateLinkTag = (rel: string, href: string) => {
      let element = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement;
      
      if (!element) {
        element = document.createElement('link');
        element.setAttribute('rel', rel);
        document.head.appendChild(element);
      }
      
      element.href = href;
    };

    // Basic meta tags
    updateMetaTag('description', description);
    
    // Open Graph tags
    updateMetaTag('og:type', type, true);
    updateMetaTag('og:title', fullTitle, true);
    updateMetaTag('og:description', description, true);
    updateMetaTag('og:url', canonicalUrl, true);

    // Twitter tags
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', fullTitle);
    updateMetaTag('twitter:description', description);

    // Canonical link
    updateLinkTag('canonical', canonicalUrl);

    // Structured data
    let scriptElement = document.querySelector('script[type="application/ld+json"]');
    if (!scriptElement) {
      scriptElement = document.createElement('script');
      scriptElement.setAttribute('type', 'application/ld+json');
      document.head.appendChild(scriptElement);
    }
    
    scriptElement.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'PB Partners Hub',
      description:
        'Supporting PBPartners by helping insurance partners with onboarding, document support, and business development.',
      url: baseUrl,
      logo: `${baseUrl}/assets/generated/pb-partners-hub-logo.dim_512x512.png`,
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Flat No 2, Sudarshan Housing Society, Indira Nagar',
        addressLocality: 'Nashik',
        addressRegion: 'Maharashtra',
        postalCode: '422009',
        addressCountry: 'IN',
      },
      contactPoint: [
        {
          '@type': 'ContactPoint',
          telephone: '7972584060',
          contactType: 'Customer Service',
          email: 'info@pbpartnershub.in',
        },
        {
          '@type': 'ContactPoint',
          telephone: '7709446589',
          contactType: 'WhatsApp Support',
          email: 'support@pbpartnershub.in',
        },
      ],
    });
  }, [title, description, canonical, type]);

  return null;
}
