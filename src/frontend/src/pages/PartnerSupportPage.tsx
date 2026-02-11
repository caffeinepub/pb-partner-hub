import { Link } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, ArrowRight } from 'lucide-react';
import SEO from '@/components/SEO';

const supportPoints = [
  'Partner onboarding assistance',
  'Policy issuance & process support',
  'Documentation guidance',
  'Claims & service coordination',
  'Dedicated help for daily partner queries',
];

export default function PartnerSupportPage() {
  return (
    <>
      <SEO
        title="Partner Support"
        description="We provide complete operational and support assistance to insurance partners so they can focus on sales and customer relationships."
        canonical="/partner-support"
      />

      <div className="container py-16 md:py-24">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Partner Support</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We provide complete operational and support assistance to insurance partners so they
              can focus on sales and customer relationships.
            </p>
          </div>

          <Card className="border-2">
            <CardHeader>
              <CardTitle className="text-2xl">Support Services</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {supportPoints.map((point) => (
                <div key={point} className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-lg">{point}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          <div className="text-center space-y-6">
            <h2 className="text-2xl font-bold">Need Support?</h2>
            <p className="text-muted-foreground">
              Our dedicated support team is here to help you with all your partner needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <Button size="lg" className="w-full sm:w-auto">
                  Connect With Our Support Team
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link to="/partner-onboarding">
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  Become a Partner
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
