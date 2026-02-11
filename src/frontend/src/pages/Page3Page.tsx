import { Link } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ArrowRight,
  Heart,
  Shield,
  FileCheck,
  Clock,
  Users,
  Target,
  Eye,
  Building2,
  CheckCircle,
  Stethoscope,
  Activity,
  Ambulance,
  HeartPulse,
} from 'lucide-react';
import SEO from '@/components/SEO';

const healthInsuranceServices = [
  {
    icon: FileCheck,
    title: 'Health Insurance Quotations',
    description:
      'Get instant and accurate health insurance quotes for individuals, families, and senior citizens with comprehensive coverage options.',
  },
  {
    icon: Shield,
    title: 'Comprehensive Health Plans',
    description:
      'Choose from individual, family floater, critical illness, and top-up plans tailored to your healthcare needs and budget.',
  },
  {
    icon: Clock,
    title: 'Quick Policy Issuance',
    description:
      'Fast-track health policy booking and issuance with minimal documentation and instant digital delivery.',
  },
  {
    icon: Ambulance,
    title: 'Claims Support & Cashless Network',
    description:
      'End-to-end claims support with access to extensive cashless hospital network and claim settlement guidance.',
  },
];

const healthBenefits = [
  {
    icon: Stethoscope,
    title: 'Wide Hospital Network',
    description:
      'Access to 10,000+ cashless hospitals across India for hassle-free treatment without upfront payment.',
  },
  {
    icon: Activity,
    title: 'Pre & Post Hospitalization',
    description:
      'Coverage for medical expenses before and after hospitalization as per policy terms.',
  },
  {
    icon: HeartPulse,
    title: 'Critical Illness Cover',
    description:
      'Additional protection against major illnesses like cancer, heart attack, stroke, and kidney failure.',
  },
  {
    icon: Heart,
    title: 'Wellness Benefits',
    description:
      'Health check-ups, preventive care, and wellness programs to keep you and your family healthy.',
  },
];

const businessInfo = [
  {
    icon: Building2,
    title: 'Our Company',
    description:
      'PB Partners Hub is a trusted insurance partner support platform dedicated to empowering Policybazaar and PB Partners with comprehensive health insurance solutions, operational assistance, and growth-focused partnership programs.',
  },
  {
    icon: Users,
    title: 'Our Team',
    description:
      'Our experienced team of health insurance professionals brings decades of combined expertise in health insurance, partner support, and business development. We are committed to providing personalized assistance and building long-term partnerships.',
  },
  {
    icon: Target,
    title: 'Our Mission',
    description:
      'To simplify health insurance processes for partners and customers alike, ensuring transparent operations, reliable support, and seamless policy management that drives confidence and business growth.',
  },
  {
    icon: Eye,
    title: 'Our Vision',
    description:
      'To become the most trusted health insurance partner support platform in India, recognized for excellence in service delivery, partner empowerment, and customer satisfaction across all health insurance segments.',
  },
];

export default function Page3Page() {
  return (
    <>
      <SEO
        title="Health Insurance Support & Partner Services"
        description="Comprehensive health insurance support services for individuals, families, and senior citizens. Get expert assistance with quotations, policy booking, claims support, and business development for insurance partners."
        canonical="/page-3"
      />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-accent/5 py-20 md:py-32">
        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl text-foreground">
                Health Insurance <span className="text-primary">Support Services</span>
              </h1>
              <p className="text-lg text-muted-foreground md:text-xl max-w-3xl mx-auto">
                Complete health insurance solutions for individuals, families, and senior citizens with
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

      {/* Health Insurance Services Section */}
      <section className="py-20 md:py-28">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
              Health Insurance <span className="text-primary">Services</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Comprehensive health insurance support designed to help partners serve their clients
              better with fast quotations, policy booking, and claims assistance.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {healthInsuranceServices.map((service) => (
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

      {/* Health Benefits Section */}
      <section className="py-20 md:py-28 bg-muted/30">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
              Key Health Insurance <span className="text-primary">Benefits</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Comprehensive coverage and benefits to protect you and your family's health and financial well-being.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {healthBenefits.map((benefit) => (
              <Card key={benefit.title} className="border-2">
                <CardHeader>
                  <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-lg bg-primary/10">
                    <benefit.icon className="h-7 w-7 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{benefit.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{benefit.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Health Insurance Details Section */}
      <section className="py-20 md:py-28">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <Card className="border-2">
              <CardHeader>
                <CardTitle className="text-2xl">
                  Complete Health Insurance Support for Partners
                </CardTitle>
                <CardDescription className="text-base">
                  We provide end-to-end health insurance support services to help you serve your
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
                        <strong>Instant Quotations:</strong> Generate accurate health insurance quotes
                        for individuals, families, and senior citizens with competitive pricing from
                        multiple insurers.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">
                        <strong>Policy Booking Assistance:</strong> Complete support for policy
                        booking with minimal documentation (Age Proof, ID Proof, Address Proof, Medical
                        Reports if required).
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">
                        <strong>Claims Support:</strong> End-to-end claims assistance including
                        cashless hospital network access, claim documentation, reimbursement support,
                        and settlement tracking.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">
                        <strong>Renewal Management:</strong> Automated renewal reminders and seamless
                        policy renewal support to ensure continuous health coverage for your clients.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">
                        <strong>Partner Training:</strong> Regular training sessions on health
                        insurance products, policy features, underwriting guidelines, and sales
                        techniques to boost your business.
                      </span>
                    </li>
                  </ul>
                </div>
                <div className="pt-6 border-t">
                  <h3 className="text-lg font-semibold mb-3">Required Documents:</h3>
                  <div className="grid gap-2 sm:grid-cols-2">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                      Age Proof (Birth Certificate/PAN)
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                      ID Proof (Aadhaar/PAN/Passport)
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                      Address Proof
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                      Medical Reports (if applicable)
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
      <section className="py-20 md:py-28 bg-muted/30">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
              About <span className="text-primary">PB Partners Hub</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Learn more about our company, team, mission, and vision as we work together to
              transform the health insurance partner experience.
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
              Ready to Start Your Health Insurance Partnership?
            </h2>
            <p className="text-lg text-muted-foreground">
              Join PB Partners Hub today and get comprehensive health insurance support to grow your
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
