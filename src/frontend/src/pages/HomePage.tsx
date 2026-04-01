import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "@tanstack/react-router";
import { ArrowRight, CheckCircle, MessageCircle, Zap } from "lucide-react";

const highlights = [
  "Dedicated Partner Support",
  "Policybazaar & PB Partners Assistance",
  "Documentation & Process Help",
  "Fast Query Resolution",
  "Growth-Focused Partner Model",
];

export default function HomePage() {
  return (
    <>
      <SEO
        title="Home"
        description="PB Partners Hub – Trusted Insurance Partner Support Platform. We support Policybazaar and PB Partners with reliable insurance guidance, partner assistance, and long-term growth opportunities."
        canonical="/"
      />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-accent/5 py-20 md:py-32">
        <div className="container relative z-10">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl text-foreground">
                  PB Partners Hub – Trusted Insurance Partner Support Platform
                </h1>
                <p className="text-lg text-muted-foreground md:text-xl max-w-2xl">
                  We support Policybazaar and PB Partners with reliable
                  insurance guidance, partner assistance, and long-term growth
                  opportunities.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/partner-onboarding">
                  <Button size="lg" className="w-full sm:w-auto">
                    Become a Partner
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link to="/partner-support">
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full sm:w-auto"
                  >
                    Explore Support
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[16/9] overflow-hidden rounded-lg shadow-2xl">
                <img
                  src="/assets/generated/pb-partners-hub-hero-illustration.dim_1600x900.png"
                  alt="Professional insurance partner support illustration"
                  className="w-full h-full object-cover"
                  width={1600}
                  height={900}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What We Do Section */}
      <section className="py-20 md:py-28">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
              What We Do
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              PB Partners Hub is dedicated to supporting insurance partners with
              end-to-end assistance, documentation help, training support, and
              smooth coordination for faster business growth.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
            {highlights.map((highlight) => (
              <Card
                key={highlight}
                className="border-2 hover:border-primary/50 transition-colors"
              >
                <CardHeader>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-6 w-6 text-primary mt-0.5 flex-shrink-0" />
                    <CardTitle className="text-lg">{highlight}</CardTitle>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Offline Quote Feature Highlight */}
      <section className="py-16 md:py-20">
        <div className="container">
          <Card className="max-w-4xl mx-auto border-2 border-[oklch(0.82_0.12_145)] overflow-hidden">
            <CardContent className="p-0">
              <div className="grid md:grid-cols-2">
                <div className="p-8 md:p-10 space-y-4 bg-gradient-to-br from-[oklch(0.96_0.04_145)] to-background">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">💥</span>
                    <span className="text-sm font-semibold text-[oklch(0.45_0.18_145)] uppercase tracking-wider">
                      New Feature
                    </span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                    Offline Quote Made Easy
                  </h2>
                  <p className="text-muted-foreground">
                    Get motor insurance offline quotes in 7 simple steps —
                    entirely on WhatsApp. No app downloads, no portals. Just
                    send a message and receive your ticket instantly.
                  </p>
                  <div className="flex flex-wrap gap-2 text-sm">
                    {["WhatsApp-based", "AI-powered", "Instant Ticket"].map(
                      (tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 bg-[oklch(0.88_0.1_145)] text-[oklch(0.38_0.18_145)] rounded-full font-medium"
                        >
                          {tag}
                        </span>
                      ),
                    )}
                  </div>
                  <Link to="/offline-quote">
                    <Button
                      data-ocid="home.offline_quote.primary_button"
                      className="mt-2 bg-[oklch(0.65_0.18_145)] hover:bg-[oklch(0.58_0.18_145)] text-white border-0 rounded-full"
                    >
                      <MessageCircle className="mr-2 h-4 w-4" />
                      Get Offline Quote
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
                <div className="bg-[oklch(0.65_0.18_145)] p-8 md:p-10 flex flex-col justify-center space-y-4">
                  {[
                    "Message 'offline quote chahiye'",
                    "Upload your RC or Previous Policy",
                    "AI extracts your vehicle details",
                    "Get Ticket ID on WhatsApp",
                  ].map((step, i) => (
                    <div key={step} className="flex items-center gap-3">
                      <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                        {i + 1}
                      </div>
                      <span className="text-white text-sm font-medium">
                        {step}
                      </span>
                    </div>
                  ))}
                  <div className="pt-2">
                    <a
                      href="https://wa.me/917709446589?text=offline%20quote%20chahiye"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button
                        data-ocid="home.offline_quote.secondary_button"
                        size="sm"
                        className="bg-white text-[oklch(0.45_0.18_145)] hover:bg-white/90 border-0 rounded-full font-semibold"
                      >
                        <Zap className="mr-1.5 h-3.5 w-3.5" />
                        Start Now on WhatsApp
                      </Button>
                    </a>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-28 bg-muted/30">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Ready to Grow Your Insurance Business?
            </h2>
            <p className="text-lg text-muted-foreground">
              Join PB Partners Hub today and get the support you need to succeed
              as an insurance partner.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/partner-onboarding">
                <Button size="lg" className="w-full sm:w-auto">
                  Become a Partner
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link to="/contact">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto"
                >
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
