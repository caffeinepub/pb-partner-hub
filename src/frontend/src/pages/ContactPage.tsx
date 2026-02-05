import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Mail, Phone, MapPin, Clock, MessageSquare } from 'lucide-react';
import { toast } from 'sonner';
import SEO from '@/components/SEO';
import { useSubmitContactForm } from '@/hooks/useQueries';

const contactInfo = [
  {
    icon: Mail,
    title: 'Email',
    details: 'info@pbpartnershub.in, support@pbpartnershub.in, Prashant.pbp47@gmail.com',
    link: 'mailto:info@pbpartnershub.in',
  },
  {
    icon: Phone,
    title: 'Mobile',
    details: '7972584060',
    link: 'tel:7972584060',
  },
  {
    icon: MessageSquare,
    title: 'WhatsApp',
    details: '7709446589',
    link: 'https://wa.me/7709446589',
  },
  {
    icon: MapPin,
    title: 'Office Address',
    details: 'Flat No 2, Sudarshan Housing Society, Indira Nagar, Nashik, Maharashtra 422009, District Nashik',
    link: null,
  },
  {
    icon: Clock,
    title: 'Business Hours',
    details: 'Monday - Friday: 9:00 AM - 6:00 PM IST',
    link: null,
  },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: '',
  });

  const submitContactForm = useSubmitContactForm();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await submitContactForm.mutateAsync({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        company: formData.company,
        message: formData.message,
      });

      toast.success('Message sent successfully!', {
        description: 'We will get back to you within 24 hours.',
      });

      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        message: '',
      });
    } catch (error) {
      toast.error('Failed to send message', {
        description: 'Please try again later or contact us directly.',
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <>
      <SEO
        title="Contact Us"
        description="Get in touch with PB Partner Hub. Contact our support team at 7972584060 (Mobile) or 7709446589 (WhatsApp) for inquiries about partner onboarding, services, or general questions."
        canonical="/contact"
      />

      {/* Hero Section */}
      <section className="py-20 md:py-28 bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              Get in <span className="text-primary">Touch</span>
            </h1>
            <p className="text-lg text-muted-foreground md:text-xl">
              Have questions? We're here to help. Reach out to our team and we'll respond as soon
              as possible.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-20 md:py-28">
        <div className="container">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-16">
            {contactInfo.map((info) => (
              <Card key={info.title} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <info.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{info.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  {info.link ? (
                    <a
                      href={info.link}
                      target={info.link.startsWith('http') ? '_blank' : undefined}
                      rel={info.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors break-words"
                    >
                      {info.details}
                    </a>
                  ) : (
                    <p className="text-sm text-muted-foreground break-words">{info.details}</p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Contact Form and Map */}
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Contact Form */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Send Us a Message</CardTitle>
                <CardDescription>
                  Fill out the form below and we'll get back to you within 24 hours.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+91-9876543210"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="company">Company/Organization</Label>
                    <Input
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="Your Company Name"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us how we can help you..."
                      rows={5}
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full"
                    disabled={submitContactForm.isPending}
                  >
                    {submitContactForm.isPending ? 'Sending...' : 'Send Message'}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Office Image and Additional Info */}
            <div className="space-y-6">
              <img
                src="/assets/generated/office-building.dim_800x600.jpg"
                alt="Office building"
                className="rounded-lg shadow-xl w-full"
              />
              <Card>
                <CardHeader>
                  <CardTitle>Visit Our Office</CardTitle>
                  <CardDescription>
                    We welcome partners to visit our office for in-person consultations.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">Location</h3>
                    <p className="text-sm text-muted-foreground">
                      Flat No 2, Sudarshan Housing Society
                      <br />
                      Indira Nagar, Nashik
                      <br />
                      Maharashtra 422009
                      <br />
                      District Nashik
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Contact Details</h3>
                    <p className="text-sm text-muted-foreground">
                      Mobile:{' '}
                      <a href="tel:7972584060" className="hover:text-primary transition-colors">
                        7972584060
                      </a>
                      <br />
                      WhatsApp:{' '}
                      <a
                        href="https://wa.me/7709446589"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-primary transition-colors"
                      >
                        7709446589
                      </a>
                      <br />
                      Email:{' '}
                      <a href="mailto:info@pbpartnershub.in" className="hover:text-primary transition-colors">
                        info@pbpartnershub.in
                      </a>
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Directions</h3>
                    <p className="text-sm text-muted-foreground">
                      Our office is conveniently located in Indira Nagar, Nashik. Contact us for detailed directions or to schedule a visit.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
