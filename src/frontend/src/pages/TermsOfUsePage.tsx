import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import SEO from '@/components/SEO';

export default function TermsOfUsePage() {
  return (
    <>
      <SEO
        title="Terms of Use"
        description="Read the terms and conditions for using PB Partner Hub's website and services. Understand your rights and responsibilities as a user."
        canonical="/terms-of-use"
      />

      <section className="py-20 md:py-28">
        <div className="container max-w-4xl">
          <div className="mb-12">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-4">Terms of Use</h1>
            <p className="text-muted-foreground">Last updated: February 1, 2025</p>
          </div>

          <div className="prose prose-slate max-w-none space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>1. Acceptance of Terms</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  Welcome to PB Partner Hub. By accessing or using our website and services, you
                  agree to be bound by these Terms of Use and all applicable laws and regulations.
                  If you do not agree with any of these terms, you are prohibited from using or
                  accessing this site.
                </p>
                <p>
                  These Terms of Use constitute a legally binding agreement between you and PB
                  Partner Hub, a platform operated in association with PBPartners (Policybazaar
                  Insurance Broker Pvt. Ltd.).
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>2. Use License</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  Permission is granted to temporarily access the materials (information or software)
                  on PB Partner Hub's website for personal, non-commercial transitory viewing only.
                  This is the grant of a license, not a transfer of title, and under this license
                  you may not:
                </p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Modify or copy the materials</li>
                  <li>Use the materials for any commercial purpose or public display</li>
                  <li>Attempt to decompile or reverse engineer any software on the website</li>
                  <li>Remove any copyright or proprietary notations from the materials</li>
                  <li>Transfer the materials to another person or "mirror" the materials on any other server</li>
                </ul>
                <p className="mt-4">
                  This license shall automatically terminate if you violate any of these
                  restrictions and may be terminated by PB Partner Hub at any time.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>3. User Accounts and Registration</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  To access certain features of our services, you may be required to register for an
                  account. When you register, you agree to:
                </p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Provide accurate, current, and complete information</li>
                  <li>Maintain and promptly update your account information</li>
                  <li>Maintain the security of your account credentials</li>
                  <li>Accept responsibility for all activities under your account</li>
                  <li>Notify us immediately of any unauthorized use of your account</li>
                </ul>
                <p className="mt-4">
                  We reserve the right to suspend or terminate accounts that violate these terms or
                  engage in fraudulent or illegal activities.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>4. Partner Obligations</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>As a partner using our services, you agree to:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Comply with all applicable laws and regulations</li>
                  <li>Maintain valid licenses and certifications required for insurance activities</li>
                  <li>Provide accurate information during onboarding and throughout the partnership</li>
                  <li>Adhere to PBPartners' policies and guidelines</li>
                  <li>Maintain professional standards in all business dealings</li>
                  <li>Protect confidential information and customer data</li>
                  <li>Report any compliance issues or concerns promptly</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>5. Intellectual Property Rights</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  The materials on PB Partner Hub's website, including but not limited to text,
                  graphics, logos, images, software, and content, are owned by or licensed to PB
                  Partner Hub and are protected by copyright, trademark, and other intellectual
                  property laws.
                </p>
                <p className="mt-4">
                  You may not reproduce, distribute, modify, create derivative works of, publicly
                  display, publicly perform, republish, download, store, or transmit any of the
                  material on our website without prior written consent.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>6. Prohibited Activities</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>You are prohibited from using the website or services to:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Violate any applicable laws or regulations</li>
                  <li>Infringe upon the rights of others</li>
                  <li>Transmit harmful or malicious code</li>
                  <li>Engage in unauthorized data collection or scraping</li>
                  <li>Impersonate any person or entity</li>
                  <li>Interfere with or disrupt the website or servers</li>
                  <li>Attempt to gain unauthorized access to any systems</li>
                  <li>Engage in fraudulent activities</li>
                  <li>Harass, abuse, or harm other users</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>7. Disclaimer of Warranties</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  The materials on PB Partner Hub's website are provided on an 'as is' basis. PB
                  Partner Hub makes no warranties, expressed or implied, and hereby disclaims and
                  negates all other warranties including, without limitation, implied warranties or
                  conditions of merchantability, fitness for a particular purpose, or
                  non-infringement of intellectual property or other violation of rights.
                </p>
                <p className="mt-4">
                  Further, PB Partner Hub does not warrant or make any representations concerning the
                  accuracy, likely results, or reliability of the use of the materials on its website
                  or otherwise relating to such materials or on any sites linked to this site.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>8. Limitation of Liability</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  In no event shall PB Partner Hub or its suppliers be liable for any damages
                  (including, without limitation, damages for loss of data or profit, or due to
                  business interruption) arising out of the use or inability to use the materials on
                  PB Partner Hub's website, even if PB Partner Hub or an authorized representative
                  has been notified orally or in writing of the possibility of such damage.
                </p>
                <p className="mt-4">
                  Because some jurisdictions do not allow limitations on implied warranties, or
                  limitations of liability for consequential or incidental damages, these limitations
                  may not apply to you.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>9. Third-Party Links</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  Our website may contain links to third-party websites or services that are not
                  owned or controlled by PB Partner Hub. We have no control over, and assume no
                  responsibility for, the content, privacy policies, or practices of any third-party
                  websites or services.
                </p>
                <p className="mt-4">
                  You acknowledge and agree that PB Partner Hub shall not be responsible or liable,
                  directly or indirectly, for any damage or loss caused or alleged to be caused by or
                  in connection with the use of any such content, goods, or services available on or
                  through any such websites or services.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>10. Indemnification</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  You agree to indemnify, defend, and hold harmless PB Partner Hub, PBPartners, and
                  their respective officers, directors, employees, and agents from and against any
                  claims, liabilities, damages, losses, and expenses, including reasonable attorneys'
                  fees, arising out of or in any way connected with:
                </p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Your access to or use of the website and services</li>
                  <li>Your violation of these Terms of Use</li>
                  <li>Your violation of any third-party rights</li>
                  <li>Your conduct in connection with the services</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>11. Modifications to Terms</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  PB Partner Hub may revise these Terms of Use at any time without notice. By using
                  this website, you are agreeing to be bound by the then-current version of these
                  Terms of Use. We encourage you to periodically review these terms to stay informed
                  of updates.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>12. Governing Law</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  These terms and conditions are governed by and construed in accordance with the
                  laws of India, and you irrevocably submit to the exclusive jurisdiction of the
                  courts in Gurugram, Haryana.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>13. Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  If you have any questions about these Terms of Use, please contact us:
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
