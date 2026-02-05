import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle } from 'lucide-react';
import SEO from '@/components/SEO';

export default function DisclaimerPage() {
  return (
    <>
      <SEO
        title="Disclaimer"
        description="Read important disclaimers regarding PB Partner Hub's services, information accuracy, and limitations of liability."
        canonical="/disclaimer"
      />

      <section className="py-20 md:py-28">
        <div className="container max-w-4xl">
          <div className="mb-12">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-4">Disclaimer</h1>
            <p className="text-muted-foreground">Last updated: February 1, 2025</p>
          </div>

          <Alert className="mb-8">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              Please read this disclaimer carefully before using PB Partner Hub's website and
              services. By accessing or using our platform, you acknowledge that you have read,
              understood, and agree to be bound by this disclaimer.
            </AlertDescription>
          </Alert>

          <div className="prose prose-slate max-w-none space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>1. General Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  The information provided by PB Partner Hub on our website and through our services
                  is for general informational purposes only. All information on the site is provided
                  in good faith; however, we make no representation or warranty of any kind, express
                  or implied, regarding the accuracy, adequacy, validity, reliability, availability,
                  or completeness of any information on the site.
                </p>
                <p>
                  Under no circumstance shall we have any liability to you for any loss or damage of
                  any kind incurred as a result of the use of the site or reliance on any information
                  provided on the site. Your use of the site and your reliance on any information on
                  the site is solely at your own risk.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>2. Professional Advice Disclaimer</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  The information provided on PB Partner Hub is not intended to be a substitute for
                  professional advice. You should not rely upon the information on our website as a
                  basis for making any business, legal, financial, or any other decisions.
                </p>
                <p>
                  While we strive to provide guidance and support for insurance partners, we strongly
                  recommend that you:
                </p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Consult with qualified professionals for specific advice</li>
                  <li>Verify all information independently</li>
                  <li>Seek legal counsel for legal matters</li>
                  <li>Consult financial advisors for financial decisions</li>
                  <li>Obtain professional insurance advice when needed</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>3. No Warranties</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  PB Partner Hub provides its website and services on an "as is" and "as available"
                  basis. We make no warranties, expressed or implied, and hereby disclaim and negate
                  all other warranties, including without limitation:
                </p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Implied warranties of merchantability</li>
                  <li>Fitness for a particular purpose</li>
                  <li>Non-infringement of intellectual property</li>
                  <li>Accuracy or completeness of content</li>
                  <li>Uninterrupted or error-free service</li>
                  <li>Security of data transmission</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>4. Limitation of Liability</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  To the fullest extent permitted by applicable law, PB Partner Hub, PBPartners
                  (Policybazaar Insurance Broker Pvt. Ltd.), and their respective officers,
                  directors, employees, and agents shall not be liable for any indirect, incidental,
                  special, consequential, or punitive damages, including without limitation:
                </p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Loss of profits or revenue</li>
                  <li>Loss of data or information</li>
                  <li>Business interruption</li>
                  <li>Loss of business opportunities</li>
                  <li>Costs of procurement of substitute services</li>
                </ul>
                <p className="mt-4">
                  This limitation applies whether the alleged liability is based on contract, tort,
                  negligence, strict liability, or any other basis, even if we have been advised of
                  the possibility of such damage.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>5. External Links Disclaimer</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  Our website may contain links to external websites that are not provided or
                  maintained by or in any way affiliated with PB Partner Hub. Please note that we do
                  not guarantee the accuracy, relevance, timeliness, or completeness of any
                  information on these external websites.
                </p>
                <p>
                  We have no control over the nature, content, and availability of those sites. The
                  inclusion of any links does not necessarily imply a recommendation or endorse the
                  views expressed within them.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>6. Regulatory Compliance Disclaimer</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  While PB Partner Hub assists with partner onboarding and compliance documentation,
                  it is the sole responsibility of each partner to:
                </p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Ensure compliance with all applicable laws and regulations</li>
                  <li>Maintain valid licenses and certifications</li>
                  <li>Stay updated on regulatory changes</li>
                  <li>Adhere to IRDAI (Insurance Regulatory and Development Authority of India) guidelines</li>
                  <li>Comply with all insurance industry standards</li>
                </ul>
                <p className="mt-4">
                  We do not guarantee that our services will ensure your compliance with all
                  applicable regulations. Partners are responsible for their own regulatory
                  compliance.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>7. Service Availability</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  We strive to ensure that our website and services are available at all times.
                  However, we do not guarantee uninterrupted access or that the site will be free
                  from errors, viruses, or other harmful components.
                </p>
                <p>
                  We reserve the right to suspend, withdraw, or restrict the availability of all or
                  any part of our website or services for business and operational reasons. We will
                  try to give you reasonable notice of any suspension or withdrawal.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>8. Information Accuracy</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  While we make every effort to ensure that the information on our website is
                  accurate and up-to-date, we cannot guarantee its accuracy or completeness. The
                  insurance industry is subject to frequent changes in regulations, policies, and
                  procedures.
                </p>
                <p>
                  Partners should verify all information independently and not rely solely on the
                  information provided on our website for making business decisions.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>9. Third-Party Content</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  Our website may include content provided by third parties, including materials
                  provided by other users, bloggers, and third-party licensors. All statements and
                  opinions expressed in these materials are solely the opinions and responsibility of
                  the person or entity providing those materials.
                </p>
                <p>
                  These materials do not necessarily reflect the opinion of PB Partner Hub. We are
                  not responsible or liable to you or any third party for the content or accuracy of
                  any materials provided by third parties.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>10. Changes to Services</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  PB Partner Hub reserves the right to modify, suspend, or discontinue any aspect of
                  our services at any time without prior notice. We shall not be liable to you or any
                  third party for any modification, suspension, or discontinuance of our services.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>11. Errors and Omissions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  Despite our best efforts, our website may occasionally contain inaccuracies or
                  typographical errors. We do not warrant that the content will be uninterrupted,
                  timely, secure, or error-free. We reserve the right to correct any errors,
                  inaccuracies, or omissions and to change or update information at any time without
                  prior notice.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>12. Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  If you have any questions or concerns about this disclaimer, please contact us:
                </p>
                <div className="mt-4 space-y-1">
                  <p>
                    <strong>Email:</strong> legal@pbpartnerhub.com
                  </p>
                  <p>
                    <strong>Phone:</strong> +91-1234567890
                  </p>
                  <p>
                    <strong>Address:</strong> Tower A, Business Park, Sector 18, Gurugram, Haryana
                    122015, India
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </>
  );
}
