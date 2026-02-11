import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Heart, Car, FileText, RefreshCw } from 'lucide-react';
import SEO from '@/components/SEO';

const services = [
  {
    icon: Heart,
    title: 'Life Insurance Support',
    description: 'Comprehensive support for life insurance policies and claims.',
  },
  {
    icon: Shield,
    title: 'Health Insurance Support',
    description: 'Expert guidance for health insurance products and services.',
  },
  {
    icon: Car,
    title: 'Motor Insurance Support',
    description: 'Complete assistance for vehicle insurance needs.',
  },
  {
    icon: FileText,
    title: 'General Insurance Assistance',
    description: 'Support for all types of general insurance products.',
  },
  {
    icon: RefreshCw,
    title: 'Policy Renewal & Servicing Support',
    description: 'Seamless policy renewal and ongoing servicing assistance.',
  },
];

export default function InsuranceServicesPage() {
  return (
    <>
      <SEO
        title="Insurance Services"
        description="We provide comprehensive insurance services including Life Insurance, Health Insurance, Motor Insurance, General Insurance, and Policy Renewal & Servicing Support."
        canonical="/insurance-services"
      />

      <div className="container py-16 md:py-24">
        <div className="max-w-5xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Insurance Services</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Comprehensive insurance support services to help partners serve their clients better.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <Card key={service.title} className="border-2 hover:border-primary/50 transition-colors">
                <CardHeader>
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <service.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
