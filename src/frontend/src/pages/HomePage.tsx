import { Link } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Users, TrendingUp, ArrowRight, CheckCircle } from 'lucide-react';
import SEO from '@/components/SEO';

const features = [
  {
    icon: Users,
    title: 'Partner Onboarding',
    description:
      'Streamlined onboarding process to help insurance partners get started quickly and efficiently.',
  },
  {
    icon: FileText,
    title: 'Document Support',
    description:
      'Comprehensive documentation assistance and support for all your insurance partnership needs.',
  },
  {
    icon: TrendingUp,
    title: 'Business Development',
    description:
      'Strategic business development programs designed to help partners grow and succeed.',
  },
];

const benefits = [
  'Simplified onboarding process',
  'Expert guidance and support',
  'Comprehensive training programs',
  'Dedicated account management',
  'Regular business updates',
  'Growth-focused strategies',
];

export default function HomePage() {
  return (
    <>
      <SEO
        title="Home"
        description="PB Partner Hub - Supporting PBPartners by helping insurance partners with onboarding, document support, and business development."
        canonical="/"
      />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-accent/5 py-20 md:py-32">
        <div className="container relative z-10">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl text-foreground">
                  Empowering Insurance Partners for{' '}
                  <span className="text-primary">Success</span>
                </h1>
                <p className="text-lg text-muted-foreground md:text-xl max-w-2xl">
                  PB Partner Hub supports PBPartners (Policybazaar Insurance Broker Pvt. Ltd.) by
                  providing comprehensive onboarding, documentation, and business development
                  services.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/partner-onboarding">
                  <Button size="lg" className="w-full sm:w-auto">
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link to="/services">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto">
                    Explore Services
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative">
              <img
                src="/assets/generated/office-building.dim_800x600.jpg"
                alt="Modern office building"
                className="rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 md:py-28">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
              Our Core Services
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Comprehensive solutions designed to support insurance partners at every stage of
              their journey.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {features.map((feature) => (
              <Card key={feature.title} className="border-2 hover:border-primary/50 transition-colors">
                <CardHeader>
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                  <CardDescription className="text-base">{feature.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 md:py-28 bg-muted/30">
        <div className="container">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
            <div>
              <img
                src="/assets/generated/team-meeting.dim_800x600.jpg"
                alt="Team collaboration meeting"
                className="rounded-lg shadow-xl"
              />
            </div>
            <div className="space-y-6">
              <div>
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
                  Why Partner With Us?
                </h2>
                <p className="text-lg text-muted-foreground">
                  We provide end-to-end support to ensure your success as an insurance partner with
                  PBPartners.
                </p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {benefits.map((benefit) => (
                  <div key={benefit} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm font-medium">{benefit}</span>
                  </div>
                ))}
              </div>
              <Link to="/about">
                <Button variant="outline" size="lg" className="mt-4">
                  Learn More About Us
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-28">
        <div className="container">
          <Card className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground border-0">
            <CardContent className="p-12 text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
                Ready to Get Started?
              </h2>
              <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
                Join our network of successful insurance partners and take your business to the next
                level with PB Partner Hub.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/partner-onboarding">
                  <Button
                    size="lg"
                    variant="secondary"
                    className="w-full sm:w-auto bg-background text-foreground hover:bg-background/90"
                  >
                    Start Onboarding
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full sm:w-auto border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10"
                  >
                    Contact Us
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </>
  );
}
