import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  CheckCircle,
  FileText,
  GraduationCap,
  TrendingUp,
  Users,
} from "lucide-react";

export default function Page4Page() {
  return (
    <>
      <SEO
        title="Partner Growth & Training | PB Partners Hub"
        description="Comprehensive training, documentation guidance, and growth enablement programs for insurance partners. Learn how we help you succeed with expert support and resources."
        canonical="/page-4"
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 py-16">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Partner Growth & Training Programs
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Empowering insurance partners with comprehensive training,
              documentation support, and growth enablement resources to build
              successful insurance businesses.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/partner-onboarding">
                <Button size="lg" className="gap-2">
                  Start Your Journey
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
              <Link to="/contact">
                <Button size="lg" variant="outline">
                  Talk to Our Team
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Training Programs Section */}
      <section className="py-16">
        <div className="container">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Comprehensive Training Programs
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                We provide structured training programs designed to help you
                master insurance products, sales techniques, and compliance
                requirements.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <GraduationCap className="h-10 w-10 text-primary mb-3" />
                  <CardTitle>Product Training</CardTitle>
                  <CardDescription>
                    In-depth training on Life, Health, Motor, and General
                    Insurance products
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">
                        Understanding policy features, benefits, and coverage
                        details
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">
                        Comparing plans and recommending the right products to
                        clients
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">
                        Handling product-specific queries and objections
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">
                        Regular updates on new product launches and
                        modifications
                      </span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Users className="h-10 w-10 text-primary mb-3" />
                  <CardTitle>Sales & Communication Skills</CardTitle>
                  <CardDescription>
                    Master the art of client engagement and effective sales
                    techniques
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">
                        Building trust and rapport with potential clients
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">
                        Effective needs analysis and solution presentation
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">
                        Handling objections and closing techniques
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">
                        Follow-up strategies and client retention methods
                      </span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <FileText className="h-10 w-10 text-primary mb-3" />
                  <CardTitle>Compliance & Documentation</CardTitle>
                  <CardDescription>
                    Stay compliant with regulatory requirements and
                    documentation standards
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">
                        IRDAI regulations and compliance guidelines
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">
                        Proper documentation procedures for policy issuance
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">
                        KYC requirements and verification processes
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">
                        Data privacy and customer information protection
                      </span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <TrendingUp className="h-10 w-10 text-primary mb-3" />
                  <CardTitle>Business Growth Strategies</CardTitle>
                  <CardDescription>
                    Scale your insurance business with proven growth strategies
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">
                        Lead generation techniques and marketing strategies
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">
                        Building and managing a sales team
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">
                        Digital tools and technology for business efficiency
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">
                        Performance tracking and goal setting
                      </span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Documentation Support Section */}
      <section className="py-16 bg-muted/30">
        <div className="container">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Documentation Guidance & Support
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                We simplify the documentation process with clear guidance,
                templates, and hands-on support to ensure smooth onboarding and
                policy processing.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Document Checklists</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Comprehensive checklists for partner onboarding, policy
                    issuance, claims processing, and renewal documentation to
                    ensure nothing is missed.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Template Library</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Access ready-to-use templates for proposals, quotations,
                    policy documents, and client communication to save time and
                    maintain consistency.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Document Review</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Our team reviews your submitted documents to identify any
                    issues or missing information before final submission,
                    reducing rejection rates.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Digital Tools</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Learn to use digital documentation tools, e-signature
                    platforms, and document management systems for faster
                    processing and better organization.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Compliance Checks</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Automated compliance verification to ensure all documents
                    meet regulatory requirements and company standards before
                    submission.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Quick Support</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Get instant help with documentation queries via WhatsApp,
                    phone, or email. Our support team is always ready to assist
                    you.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <Card className="bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 border-primary/20">
              <CardContent className="p-8 md:p-12 text-center">
                <h2 className="text-3xl font-bold text-foreground mb-4">
                  Ready to Grow Your Insurance Business?
                </h2>
                <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                  Join our partner network and get access to comprehensive
                  training, documentation support, and growth resources. Start
                  your journey with PB Partners Hub today.
                </p>
                <div className="flex flex-wrap gap-4 justify-center">
                  <Link to="/partner-onboarding">
                    <Button size="lg" className="gap-2">
                      Begin Partner Onboarding
                      <ArrowRight className="h-5 w-5" />
                    </Button>
                  </Link>
                  <Link to="/contact">
                    <Button size="lg" variant="outline">
                      Contact Our Team
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </>
  );
}
