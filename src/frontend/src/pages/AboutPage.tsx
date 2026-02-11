import SEO from '@/components/SEO';
import { Card, CardContent } from '@/components/ui/card';

export default function AboutPage() {
  return (
    <>
      <SEO
        title="About Us"
        description="PB Partners Hub is a partner support platform created to assist insurance partners associated with Policybazaar and PB Partners."
        canonical="/about"
      />

      <div className="container py-16 md:py-24">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">About PB Partners Hub</h1>
          </div>

          <Card className="border-2">
            <CardContent className="p-8 md:p-12">
              <div className="prose prose-lg max-w-none">
                <p className="text-lg text-muted-foreground leading-relaxed">
                  PB Partners Hub is a partner support platform created to assist insurance partners
                  associated with Policybazaar and PB Partners.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed mt-6">
                  Our mission is to simplify insurance processes, provide timely support, and help
                  partners grow their business with confidence and transparency.
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-8 md:grid-cols-2">
            <Card className="border-2">
              <CardContent className="p-8">
                <img
                  src="/assets/generated/team-meeting.dim_800x600.jpg"
                  alt="Team collaboration"
                  className="rounded-lg mb-6"
                />
                <h3 className="text-xl font-semibold mb-3">Our Approach</h3>
                <p className="text-muted-foreground">
                  We believe in building long-term partnerships through dedicated support, clear
                  communication, and continuous growth opportunities.
                </p>
              </CardContent>
            </Card>
            <Card className="border-2">
              <CardContent className="p-8">
                <img
                  src="/assets/generated/office-interior.dim_800x600.jpg"
                  alt="Office workspace"
                  className="rounded-lg mb-6"
                />
                <h3 className="text-xl font-semibold mb-3">Our Commitment</h3>
                <p className="text-muted-foreground">
                  We are committed to providing reliable, transparent, and efficient support to all
                  our insurance partners, helping them achieve their business goals.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}
