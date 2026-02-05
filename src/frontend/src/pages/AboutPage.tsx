import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Target, Eye, Award, Users } from 'lucide-react';
import SEO from '@/components/SEO';

const values = [
  {
    icon: Target,
    title: 'Mission',
    description:
      'To empower insurance partners with comprehensive support, streamlined processes, and strategic guidance for sustainable business growth.',
  },
  {
    icon: Eye,
    title: 'Vision',
    description:
      'To be the leading partner enablement platform in the insurance industry, fostering a thriving ecosystem of successful insurance partners.',
  },
  {
    icon: Award,
    title: 'Excellence',
    description:
      'We are committed to delivering exceptional service quality and maintaining the highest standards in everything we do.',
  },
  {
    icon: Users,
    title: 'Partnership',
    description:
      'We believe in building long-term relationships based on trust, transparency, and mutual success.',
  },
];

const milestones = [
  { year: '2020', title: 'Platform Launch', description: 'PB Partner Hub was established' },
  { year: '2021', title: '500+ Partners', description: 'Reached 500 active insurance partners' },
  { year: '2023', title: 'National Expansion', description: 'Expanded services across India' },
  { year: '2025', title: 'Industry Leader', description: 'Recognized as top partner platform' },
];

export default function AboutPage() {
  return (
    <>
      <SEO
        title="About Us"
        description="Learn about PB Partner Hub's mission to support PBPartners and insurance partners with comprehensive onboarding and business development services."
        canonical="/about"
      />

      {/* Hero Section */}
      <section className="py-20 md:py-28 bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              About <span className="text-primary">PB Partner Hub</span>
            </h1>
            <p className="text-lg text-muted-foreground md:text-xl">
              We are dedicated to supporting PBPartners (Policybazaar Insurance Broker Pvt. Ltd.) by
              providing comprehensive solutions for insurance partner success.
            </p>
          </div>
        </div>
      </section>

      {/* Company Overview */}
      <section className="py-20 md:py-28">
        <div className="container">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
            <div>
              <img
                src="/assets/generated/office-interior.dim_800x600.jpg"
                alt="Modern office interior"
                className="rounded-lg shadow-xl"
              />
            </div>
            <div className="space-y-6">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Our Story</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  PB Partner Hub was created with a singular vision: to revolutionize the way
                  insurance partners engage with PBPartners (Policybazaar Insurance Broker Pvt.
                  Ltd.). We recognized the need for a comprehensive platform that could streamline
                  onboarding, provide robust documentation support, and drive business development.
                </p>
                <p>
                  Since our inception, we have been committed to excellence in partner enablement.
                  Our platform combines cutting-edge technology with personalized support to ensure
                  every partner has the tools and resources they need to succeed in the competitive
                  insurance landscape.
                </p>
                <p>
                  Today, we serve hundreds of insurance partners across India, helping them navigate
                  the complexities of the insurance industry while building sustainable and
                  profitable businesses.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission, Vision & Values */}
      <section className="py-20 md:py-28 bg-muted/30">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
              Our Mission, Vision & Values
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Guiding principles that drive everything we do at PB Partner Hub.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {values.map((value) => (
              <Card key={value.title} className="text-center">
                <CardHeader>
                  <div className="mx-auto mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                    <value.icon className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{value.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Milestones */}
      <section className="py-20 md:py-28">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
              Our Journey
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Key milestones that have shaped PB Partner Hub into what it is today.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {milestones.map((milestone, index) => (
              <div key={milestone.year} className="relative">
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground text-xl font-bold">
                    {index + 1}
                  </div>
                  <div className="space-y-2">
                    <div className="text-2xl font-bold text-primary">{milestone.year}</div>
                    <h3 className="text-lg font-semibold">{milestone.title}</h3>
                    <p className="text-sm text-muted-foreground">{milestone.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 md:py-28 bg-muted/30">
        <div className="container">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Our Team</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Our team comprises experienced professionals from the insurance and technology
                  sectors, united by a common goal: to help insurance partners succeed.
                </p>
                <p>
                  With decades of combined experience in insurance operations, business development,
                  and partner management, our leadership team brings deep industry knowledge and a
                  commitment to innovation.
                </p>
                <p>
                  Every team member at PB Partner Hub is dedicated to providing exceptional support
                  and creating value for our partners. We believe that our partners' success is our
                  success.
                </p>
              </div>
            </div>
            <div>
              <img
                src="/assets/generated/team-meeting.dim_800x600.jpg"
                alt="Team collaboration"
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
