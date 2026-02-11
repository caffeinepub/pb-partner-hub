import { Link } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ArrowRight,
  Car,
  Shield,
  FileCheck,
  Clock,
  Users,
  Target,
  Eye,
  Building2,
  CheckCircle,
} from 'lucide-react';
import SEO from '@/components/SEO';

const motorInsuranceServices = [
  {
    icon: FileCheck,
    title: 'Motor Insurance Quotations',
    description:
      'Get instant and accurate motor insurance quotes for cars, bikes, and commercial vehicles with competitive pricing.',
  },
  {
    icon: Shield,
    title: 'Comprehensive Coverage Options',
    description:
      'Choose from third-party, comprehensive, or standalone own-damage policies tailored to your needs.',
  },
  {
    icon: Clock,
    title: 'Quick Policy Issuance',
    description:
      'Fast-track policy booking and issuance with minimal documentation and instant digital delivery.',
  },
  {
    icon: Car,
    title: 'Claims Support & Assistance',
    description:
      'End-to-end claims support including cashless garage network access and claim settlement guidance.',
  },
];

const businessInfo = [
  {
    icon: Building2,
    title: 'Our Company',
    description:
      'PB Partners Hub is a trusted insurance partner support platform dedicated to empowering Policybazaar and PB Partners with comprehensive motor insurance solutions, operational assistance, and growth-focused partnership programs.',
  },
  {
    icon: Users,
    title: 'Our Team',
    description:
      'Our experienced team of insurance professionals brings decades of combined expertise in motor insurance, partner support, and business development. We are committed to providing personalized assistance and building long-term partnerships.',
  },
  {
    icon: Target,
    title: 'Our Mission',
    description:
      'To simplify motor insurance processes for partners and customers alike, ensuring transparent operations, reliable support, and seamless policy management that drives confidence and business growth.',
  },
  {
    icon: Eye,
    title: 'Our Vision',
    description:
      'To become the most trusted motor insurance partner support platform in India, recognized for excellence in service delivery, partner empowerment, and customer satisfaction across all vehicle insurance segments.',
  },
];

export default function Page2Page() {
  return (
    <>
      <SEO
        title="Motor Insurance Support & Partner Services"
        description="Comprehensive motor insurance support services for cars, bikes, and commercial vehicles. Get expert assistance with quotations, policy booking, claims support, and business development for insurance partners."
        canonical="/page-2"
      />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-accent/5 py-20 md:py-32">
        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl text-foreground">
                Motor Insurance <span className="text-primary">Support Services</span>
              </h1>
              <p className="text-lg text-muted-foreground md:text-xl max-w-3xl mx-auto">
                Complete motor insurance solutions for cars, bikes, and commercial vehicles with
                expert partner support, fast policy issuance, and comprehensive claims assistance.
              </p>
            </div>
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

      {/* Motor Insurance Services Section */}
      <section className="py-20 md:py-28">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
              Motor Insurance <span className="text-primary">Services</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Comprehensive motor insurance support designed to help partners serve their clients
              better with fast quotations, policy booking, and claims assistance.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {motorInsuranceServices.map((service) => (
              <Card key={service.title} className="border-2 hover:border-primary/50 transition-colors">
                <CardHeader>
                  <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-lg bg-primary/10">
                    <service.icon className="h-7 w-7 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{service.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Motor Insurance Details Section */}
      <section className="py-20 md:py-28 bg-muted/30">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <Card className="border-2">
              <CardHeader>
                <CardTitle className="text-2xl">
                  Complete Motor Insurance Support for Partners
                </CardTitle>
                <CardDescription className="text-base">
                  We provide end-to-end motor insurance support services to help you serve your
                  clients efficiently and grow your business.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">What We Offer:</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">
                        <strong>Instant Quotations:</strong> Generate accurate motor insurance quotes
                        for cars, bikes, and commercial vehicles with competitive pricing from
                        multiple insurers.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">
                        <strong>Policy Booking Assistance:</strong> Complete support for policy
                        booking with minimal documentation (RC Copy, Old Policy, PAN, Aadhaar, Contact
                        Details).
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">
                        <strong>Claims Support:</strong> End-to-end claims assistance including
                        cashless garage network access, claim documentation, and settlement tracking.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">
                        <strong>Renewal Management:</strong> Automated renewal reminders and seamless
                        policy renewal support to ensure continuous coverage for your clients.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">
                        <strong>Partner Training:</strong> Regular training sessions on motor
                        insurance products, policy features, and sales techniques to boost your
                        business.
                      </span>
                    </li>
                  </ul>
                </div>
                <div className="pt-6 border-t">
                  <h3 className="text-lg font-semibold mb-3">Required Documents:</h3>
                  <div className="grid gap-2 sm:grid-cols-2">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                      RC Copy (Registration Certificate)
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                      Old Policy Copy
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                      PAN Card
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                      Aadhaar Card
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                      Contact Number
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                      Email ID
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Business Information Section */}
      <section className="py-20 md:py-28">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
              About <span className="text-primary">PB Partners Hub</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Learn more about our company, team, mission, and vision as we work together to
              transform the motor insurance partner experience.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2">
            {businessInfo.map((info) => (
              <Card key={info.title} className="border-2">
                <CardHeader>
                  <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-lg bg-primary/10">
                    <info.icon className="h-7 w-7 text-primary" />
                  </div>
                  <CardTitle className="text-2xl">{info.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">{info.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-28 bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Ready to Start Your Motor Insurance Partnership?
            </h2>
            <p className="text-lg text-muted-foreground">
              Join PB Partners Hub today and get comprehensive motor insurance support to grow your
              business with confidence.
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
