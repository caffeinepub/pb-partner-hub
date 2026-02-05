import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from '@tanstack/react-router';
import {
  Users,
  FileText,
  TrendingUp,
  CheckCircle,
  Clock,
  Shield,
  Headphones,
  BookOpen,
  ArrowRight,
  FileCheck,
  CreditCard,
  RefreshCw,
  Award,
} from 'lucide-react';
import SEO from '@/components/SEO';

const mainServices = [
  {
    icon: Users,
    title: 'Partner Onboarding',
    description:
      'Comprehensive onboarding assistance to help new insurance partners get started quickly and efficiently.',
    features: [
      'Streamlined registration process',
      'Documentation guidance',
      'Compliance verification',
      'Initial training and orientation',
      'Account setup assistance',
    ],
    image: '/assets/generated/business-handshake.dim_600x400.jpg',
  },
  {
    icon: FileText,
    title: 'Document Support',
    description:
      'Complete documentation support services to ensure all paperwork is accurate and compliant.',
    features: [
      'Document preparation assistance',
      'Compliance documentation',
      'Digital document management',
      'Template and format guidance',
      'Regular document updates',
    ],
    image: '/assets/generated/insurance-documents.dim_600x400.jpg',
  },
  {
    icon: TrendingUp,
    title: 'Business Development',
    description:
      'Strategic business development programs designed to help partners grow and scale their operations.',
    features: [
      'Market analysis and insights',
      'Growth strategy planning',
      'Performance optimization',
      'Sales training programs',
      'Networking opportunities',
    ],
    image: '/assets/generated/team-meeting.dim_800x600.jpg',
  },
];

const additionalServices = [
  {
    icon: Clock,
    title: '24/7 Support',
    description: 'Round-the-clock assistance for all your queries and concerns.',
  },
  {
    icon: Shield,
    title: 'Compliance Management',
    description: 'Ensure all operations meet regulatory requirements and standards.',
  },
  {
    icon: Headphones,
    title: 'Dedicated Account Manager',
    description: 'Personal point of contact for all your partnership needs.',
  },
  {
    icon: BookOpen,
    title: 'Training & Resources',
    description: 'Access to comprehensive training materials and industry resources.',
  },
];

const agentSupportServices = [
  {
    icon: FileCheck,
    title: 'Quotation Generation Assistance',
    description:
      'Get help generating accurate insurance quotations for your clients quickly and efficiently.',
    requiredDocs: ['RC Copy', 'Old Policy Copy'],
  },
  {
    icon: CreditCard,
    title: 'Policy Booking Support',
    description:
      'Complete assistance with policy booking processes to ensure smooth transactions for your clients.',
    requiredDocs: ['PAN Card', 'Aadhaar Card', 'Contact Number', 'Email ID'],
  },
  {
    icon: TrendingUp,
    title: 'Payout Information Support',
    description:
      'Stay informed about your commission payouts with transparent tracking and timely updates.',
    requiredDocs: [],
  },
  {
    icon: RefreshCw,
    title: 'Renewal & Business Development',
    description:
      'Guidance on policy renewals and strategies to grow your insurance business effectively.',
    requiredDocs: [],
  },
  {
    icon: Award,
    title: 'Contest & Reward Updates',
    description:
      'Stay updated on partner contests, incentive programs, and reward opportunities to maximize your earnings.',
    requiredDocs: [],
  },
];

export default function ServicesPage() {
  return (
    <>
      <SEO
        title="Services"
        description="Explore our comprehensive services including partner onboarding, document support, business development programs, and dedicated agent partner support for insurance partners."
        canonical="/services"
      />

      {/* Hero Section */}
      <section className="py-20 md:py-28 bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              Our <span className="text-primary">Services</span>
            </h1>
            <p className="text-lg text-muted-foreground md:text-xl">
              Comprehensive solutions designed to support insurance partners at every stage of their
              journey with PBPartners.
            </p>
          </div>
        </div>
      </section>

      {/* Main Services */}
      <section className="py-20 md:py-28">
        <div className="container space-y-24">
          {mainServices.map((service, index) => (
            <div
              key={service.title}
              className={`grid gap-12 lg:grid-cols-2 lg:gap-16 items-center ${
                index % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}
            >
              <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                <img
                  src={service.image}
                  alt={service.title}
                  className="rounded-lg shadow-xl"
                />
              </div>
              <div className={`space-y-6 ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                <div className="inline-flex h-16 w-16 items-center justify-center rounded-lg bg-primary/10">
                  <service.icon className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
                    {service.title}
                  </h2>
                  <p className="text-lg text-muted-foreground">{service.description}</p>
                </div>
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold">Key Features:</h3>
                  <ul className="space-y-2">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Agent Partner Support Section */}
      <section className="py-20 md:py-28 bg-muted/30">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
              Agent Partner <span className="text-primary">Support Services</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Dedicated support services designed specifically for our insurance agent partners to
              help you serve your clients better and grow your business.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {agentSupportServices.map((service) => (
              <Card key={service.title} className="flex flex-col">
                <CardHeader>
                  <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-lg bg-primary/10">
                    <service.icon className="h-7 w-7 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-1 space-y-4">
                  <CardDescription className="text-base">{service.description}</CardDescription>
                  {service.requiredDocs.length > 0 && (
                    <div className="pt-4 border-t">
                      <p className="text-sm font-semibold mb-2">Required Documents:</p>
                      <ul className="space-y-1">
                        {service.requiredDocs.map((doc) => (
                          <li key={doc} className="flex items-center gap-2 text-sm text-muted-foreground">
                            <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                            {doc}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="mt-12 text-center">
            <img
              src="/assets/generated/agent-consultation.dim_800x600.jpg"
              alt="Agent consultation"
              className="rounded-lg shadow-xl mx-auto max-w-3xl w-full"
            />
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section className="py-20 md:py-28">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
              Additional Support Services
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Beyond our core offerings, we provide comprehensive support to ensure your success.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {additionalServices.map((service) => (
              <Card key={service.title} className="text-center">
                <CardHeader>
                  <div className="mx-auto mb-4 inline-flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                    <service.icon className="h-7 w-7 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{service.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How We Help Section */}
      <section className="py-20 md:py-28 bg-muted/30">
        <div className="container">
          <Card className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground border-0">
            <CardContent className="p-12">
              <div className="grid gap-8 lg:grid-cols-2 items-center">
                <div className="space-y-6">
                  <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                    How Our Services Help You Succeed
                  </h2>
                  <p className="text-lg opacity-90">
                    Our comprehensive service portfolio is designed to address every aspect of your
                    partnership journey. From initial onboarding to ongoing business development, we
                    provide the tools, resources, and support you need to thrive.
                  </p>
                  <p className="text-lg opacity-90">
                    With PB Partner Hub, you gain access to industry expertise, streamlined
                    processes, and a dedicated support team committed to your success.
                  </p>
                </div>
                <div className="space-y-4">
                  <Link to="/partner-onboarding">
                    <Button
                      size="lg"
                      variant="secondary"
                      className="w-full bg-background text-foreground hover:bg-background/90"
                    >
                      Start Your Onboarding
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Link to="/contact">
                    <Button
                      size="lg"
                      variant="outline"
                      className="w-full border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10"
                    >
                      Contact Our Team
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </>
  );
}
