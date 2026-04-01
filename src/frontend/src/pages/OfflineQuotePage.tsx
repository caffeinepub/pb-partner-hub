import SEO from "@/components/SEO";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowRight,
  Bot,
  CheckCircle2,
  FileText,
  MessageCircle,
  SlidersHorizontal,
  Ticket,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";

const steps = [
  {
    number: 1,
    title: "Start on WhatsApp",
    description:
      "Initiate chat with PBPartners on WhatsApp to begin your offline quote journey.",
    icon: MessageCircle,
    color: "bg-green-100 text-green-700",
  },
  {
    number: 2,
    title: "Raise Intent",
    description:
      'Simply message "offline quote chahiye" to trigger the quote workflow instantly.',
    icon: Zap,
    color: "bg-yellow-100 text-yellow-700",
    highlight: '"offline quote chahiye"',
  },
  {
    number: 3,
    title: "Upload Document",
    description:
      "Share your Previous Policy (PYP) or Vehicle RC as an image or PDF on WhatsApp.",
    icon: FileText,
    color: "bg-blue-100 text-blue-700",
  },
  {
    number: 4,
    title: "AI Extraction",
    description:
      "Our AI system automatically reads and extracts vehicle details and policy information from your document.",
    icon: Bot,
    color: "bg-purple-100 text-purple-700",
  },
  {
    number: 5,
    title: "Select Preferences",
    description:
      "Choose your preferred insurers, confirm NCB (No Claim Bonus), and share your claim history.",
    icon: SlidersHorizontal,
    color: "bg-orange-100 text-orange-700",
  },
  {
    number: 6,
    title: "Review & Confirm",
    description:
      "Validate the AI-extracted details. Make any edits needed before finalizing the quote request.",
    icon: CheckCircle2,
    color: "bg-teal-100 text-teal-700",
  },
  {
    number: 7,
    title: "Ticket Created Instantly",
    description:
      "Receive your unique Ticket ID and a tracking link right on WhatsApp. Track your quote in real time.",
    icon: Ticket,
    color: "bg-green-100 text-green-700",
  },
];

const WHATSAPP_URL =
  "https://wa.me/917709446589?text=offline%20quote%20chahiye";

export default function OfflineQuotePage() {
  return (
    <>
      <SEO
        title="Offline Quote Made Easy"
        description="Get motor insurance offline quotes via WhatsApp in 7 simple steps. Share your RC or previous policy and receive ticket ID instantly."
        canonical="/offline-quote"
      />

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[oklch(0.95_0.06_145)] via-background to-[oklch(0.97_0.03_145)] py-20 md:py-32">
        <div className="container relative z-10 text-center space-y-8 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge className="mb-4 bg-[oklch(0.75_0.18_145)] text-white border-0 px-4 py-1.5 text-sm font-semibold">
              🔥 New Feature
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl text-foreground">
              Offline Quote Made{" "}
              <span className="text-[oklch(0.52_0.18_145)]">Easy</span> 💥
            </h1>
            <p className="mt-6 text-lg text-muted-foreground md:text-xl max-w-2xl mx-auto">
              Get motor insurance offline quotes instantly — right on WhatsApp.
              No app, no portal. Just chat and get your ticket in minutes.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
              <Button
                size="lg"
                data-ocid="offline_quote.primary_button"
                className="bg-[oklch(0.65_0.18_145)] hover:bg-[oklch(0.58_0.18_145)] text-white border-0 text-base px-8 py-6 h-auto rounded-full shadow-lg"
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                Start on WhatsApp — Type &quot;offline quote chahiye&quot;
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </a>
            <p className="mt-3 text-sm text-muted-foreground">
              WhatsApp: +91 7709446589
            </p>
          </motion.div>
        </div>
      </section>

      {/* Steps */}
      <section className="py-20 md:py-28">
        <div className="container max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
              7 Simple Steps to Your Quote
            </h2>
            <p className="text-lg text-muted-foreground">
              The entire process happens on WhatsApp — no extra apps needed.
            </p>
          </div>

          <div className="space-y-6">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.07 }}
                  data-ocid={`offline_quote.item.${step.number}`}
                >
                  <Card className="border border-border hover:border-[oklch(0.75_0.18_145)] transition-colors hover:shadow-md">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-5">
                        <div className="flex-shrink-0">
                          <div className="w-14 h-14 rounded-full bg-[oklch(0.65_0.18_145)] flex items-center justify-center text-white font-bold text-xl shadow-md">
                            {step.number}
                          </div>
                        </div>
                        <div className="flex-1 pt-1">
                          <div className="flex items-center gap-3 mb-2">
                            <div className={`p-1.5 rounded-lg ${step.color}`}>
                              <Icon className="h-4 w-4" />
                            </div>
                            <h3 className="text-lg font-semibold text-foreground">
                              {step.title}
                            </h3>
                            {step.number === 7 && (
                              <Badge className="bg-[oklch(0.75_0.18_145)] text-white border-0 text-xs">
                                Instant
                              </Badge>
                            )}
                          </div>
                          <p className="text-muted-foreground">
                            {step.description}
                          </p>
                          {step.highlight && (
                            <div className="mt-2 inline-block bg-[oklch(0.95_0.06_145)] border border-[oklch(0.82_0.12_145)] rounded-lg px-3 py-1">
                              <span className="text-sm font-mono font-semibold text-[oklch(0.45_0.18_145)]">
                                {step.highlight}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-20 bg-[oklch(0.95_0.06_145)]">
        <div className="container max-w-3xl mx-auto text-center space-y-6">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Ready to Get Your Offline Quote?
          </h2>
          <p className="text-lg text-muted-foreground">
            Just tap the button below, send the magic message, and we handle the
            rest.
          </p>
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
            <Button
              size="lg"
              data-ocid="offline_quote.secondary_button"
              className="bg-[oklch(0.65_0.18_145)] hover:bg-[oklch(0.58_0.18_145)] text-white border-0 text-base px-8 py-6 h-auto rounded-full shadow-lg mt-2"
            >
              <MessageCircle className="mr-2 h-5 w-5" />
              Chat with PBPartners on WhatsApp
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </a>
          <p className="text-sm text-muted-foreground">
            Available Mon–Sat, 9 AM – 7 PM IST
          </p>
        </div>
      </section>
    </>
  );
}
