import { Link } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, CheckCircle } from 'lucide-react';
import SEO from '@/components/SEO';

const highlights = [
  'Dedicated Partner Support',
  'Policybazaar & PB Partners Assistance',
  'Documentation & Process Help',
  'Fast Query Resolution',
  'Growth-Focused Partner Model',
];

export default function HomePage() {
  return (
    <>
      <SEO
        title="Home"
        description="PB Partners Hub – Trusted Insurance Partner Support Platform. We support Policybazaar and PB Partners with reliable insurance guidance, partner assistance, and long-term growth opportunities."
        canonical="/"
      />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-accent/5 py-20 md:py-32">
        <div className="container relative z-10">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl text-foreground">
                  PB Partners Hub – Trusted Insurance Partner Support Platform
                </h1>
                <p className="text-lg text-muted-foreground md:text-xl max-w-2xl">
                  We support Policybazaar and PB Partners with reliable insurance guidance, partner
                  assistance, and long-term growth opportunities.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/partner-onboarding">
                  <Button size="lg" className="w-full sm:w-auto">
                    Become a Partner
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link to="/partner-support">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto">
                    Explore Support
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[16/9] overflow-hidden rounded-lg shadow-2xl">
                <img
                  src="/assets/generated/pb-partners-hub-hero-illustration.dim_1600x900.png"
                  alt="Professional insurance partner support illustration showing collaboration between partners and support team with documents and digital tools"
                  className="w-full h-full object-cover"
                  width={1600}
                  height={900}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What We Do Section */}
      <section className="py-20 md:py-28">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">What We Do</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              PB Partners Hub is dedicated to supporting insurance partners with end-to-end
              assistance, documentation help, training support, and smooth coordination for faster
              business growth.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
            {highlights.map((highlight) => (
              <Card key={highlight} className="border-2 hover:border-primary/50 transition-colors">
                <CardHeader>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-6 w-6 text-primary mt-0.5 flex-shrink-0" />
                    <CardTitle className="text-lg">{highlight}</CardTitle>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-28 bg-muted/30">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Ready to Grow Your Insurance Business?
            </h2>
            <p className="text-lg text-muted-foreground">
              Join PB Partners Hub today and get the support you need to succeed as an insurance
              partner.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/partner-onboarding">
                <Button size="lg" className="w-full sm:w-auto">
                  Become a Partner
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link to="/contact">
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
