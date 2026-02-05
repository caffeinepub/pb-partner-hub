import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import SEO from '@/components/SEO';

export default function PrivacyPolicyPage() {
  return (
    <>
      <SEO
        title="Privacy Policy"
        description="Read PB Partner Hub's privacy policy to understand how we collect, use, and protect your personal information."
        canonical="/privacy-policy"
      />

      <section className="py-20 md:py-28">
        <div className="container max-w-4xl">
          <div className="mb-12">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-4">Privacy Policy</h1>
            <p className="text-muted-foreground">Last updated: February 1, 2025</p>
          </div>

          <div className="prose prose-slate max-w-none space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>1. Introduction</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  PB Partner Hub ("we," "our," or "us") is committed to protecting your privacy.
                  This Privacy Policy explains how we collect, use, disclose, and safeguard your
                  information when you visit our website and use our services.
                </p>
                <p>
                  Please read this privacy policy carefully. If you do not agree with the terms of
                  this privacy policy, please do not access the site or use our services.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>2. Information We Collect</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <div>
                  <h3 className="font-semibold text-foreground mb-2">
                    Personal Information You Provide
                  </h3>
                  <p>We may collect personal information that you voluntarily provide to us when you:</p>
                  <ul className="list-disc pl-6 space-y-1 mt-2">
                    <li>Register for partner onboarding</li>
                    <li>Fill out contact forms</li>
                    <li>Subscribe to our newsletters</li>
                    <li>Communicate with us via email or phone</li>
                  </ul>
                  <p className="mt-2">This information may include:</p>
                  <ul className="list-disc pl-6 space-y-1 mt-2">
                    <li>Name and contact information</li>
                    <li>Business details and registration information</li>
                    <li>Professional qualifications and certifications</li>
                    <li>Financial information for partnership purposes</li>
                    <li>Identity verification documents</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">
                    Automatically Collected Information
                  </h3>
                  <p>When you visit our website, we may automatically collect:</p>
                  <ul className="list-disc pl-6 space-y-1 mt-2">
                    <li>IP address and browser type</li>
                    <li>Operating system and device information</li>
                    <li>Pages visited and time spent on pages</li>
                    <li>Referring website addresses</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>3. How We Use Your Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>We use the information we collect to:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Process partner onboarding applications</li>
                  <li>Provide and maintain our services</li>
                  <li>Communicate with you about your partnership</li>
                  <li>Send administrative information and updates</li>
                  <li>Respond to inquiries and provide customer support</li>
                  <li>Improve our website and services</li>
                  <li>Comply with legal obligations and regulatory requirements</li>
                  <li>Prevent fraud and enhance security</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>4. Information Sharing and Disclosure</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>We may share your information with:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>
                    <strong>PBPartners (Policybazaar Insurance Broker Pvt. Ltd.)</strong> - As our
                    parent organization, for partnership management purposes
                  </li>
                  <li>
                    <strong>Service Providers</strong> - Third-party vendors who perform services on
                    our behalf
                  </li>
                  <li>
                    <strong>Regulatory Authorities</strong> - When required by law or to comply with
                    legal processes
                  </li>
                  <li>
                    <strong>Business Transfers</strong> - In connection with mergers, acquisitions,
                    or asset sales
                  </li>
                </ul>
                <p className="mt-4">
                  We do not sell, rent, or trade your personal information to third parties for
                  marketing purposes.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>5. Data Security</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  We implement appropriate technical and organizational security measures to protect
                  your personal information against unauthorized access, alteration, disclosure, or
                  destruction. These measures include:
                </p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Encryption of sensitive data</li>
                  <li>Secure server infrastructure</li>
                  <li>Regular security assessments</li>
                  <li>Access controls and authentication</li>
                  <li>Employee training on data protection</li>
                </ul>
                <p className="mt-4">
                  However, no method of transmission over the Internet or electronic storage is 100%
                  secure. While we strive to protect your information, we cannot guarantee absolute
                  security.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>6. Your Rights and Choices</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>You have the right to:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Access and receive a copy of your personal information</li>
                  <li>Correct inaccurate or incomplete information</li>
                  <li>Request deletion of your personal information</li>
                  <li>Object to or restrict certain processing activities</li>
                  <li>Withdraw consent where processing is based on consent</li>
                  <li>Data portability for information you provided</li>
                </ul>
                <p className="mt-4">
                  To exercise these rights, please contact us at privacy@pbpartnerhub.com.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>7. Cookies and Tracking Technologies</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  We use cookies and similar tracking technologies to enhance your experience on our
                  website. Cookies are small data files stored on your device that help us:
                </p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Remember your preferences</li>
                  <li>Understand how you use our website</li>
                  <li>Improve website functionality</li>
                  <li>Provide personalized content</li>
                </ul>
                <p className="mt-4">
                  You can control cookies through your browser settings. However, disabling cookies
                  may affect your ability to use certain features of our website.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>8. Data Retention</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  We retain your personal information for as long as necessary to fulfill the
                  purposes outlined in this privacy policy, unless a longer retention period is
                  required or permitted by law. When we no longer need your information, we will
                  securely delete or anonymize it.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>9. Children's Privacy</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  Our services are not directed to individuals under the age of 18. We do not
                  knowingly collect personal information from children. If you believe we have
                  collected information from a child, please contact us immediately.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>10. Changes to This Privacy Policy</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  We may update this privacy policy from time to time. We will notify you of any
                  changes by posting the new privacy policy on this page and updating the "Last
                  updated" date. We encourage you to review this privacy policy periodically.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>11. Contact Us</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  If you have questions or concerns about this privacy policy or our data practices,
                  please contact us:
                </p>
                <div className="mt-4 space-y-1">
                  <p>
                    <strong>Email:</strong> privacy@pbpartnerhub.com
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
