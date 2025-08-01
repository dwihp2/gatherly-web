import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import {
  Zap,
  CreditCard,
  Smartphone,
  QrCode,
  Users,
  Calendar,
  Check,
  Star
} from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20 md:py-28 px-4">
          <div className="container max-w-6xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
              Create Events & Sell Tickets{" "}
              <span className="text-primary">in 10 Minutes</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Trusted ticketing platform for Indonesian Event Organizers with QRIS, GoPay, OVO, DANA support
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/sign-up">Start Free</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="#features">View Demo</Link>
              </Button>
            </div>

            {/* Social Proof */}
            <div className="mt-16 grid grid-cols-3 gap-8 max-w-md mx-auto">
              <div className="text-center">
                <div className="text-2xl font-bold">500+</div>
                <div className="text-sm text-muted-foreground">Events Created</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">50K+</div>
                <div className="text-sm text-muted-foreground">Tickets Sold</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">200+</div>
                <div className="text-sm text-muted-foreground">Happy Organizers</div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 bg-muted/50">
          <div className="container max-w-6xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Gatherly?</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Everything you need to create, manage, and sell tickets for your events
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader>
                  <Zap className="h-10 w-10 text-primary mb-2" />
                  <CardTitle>Quick Setup</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Create and publish your event in under 10 minutes. No technical skills required.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CreditCard className="h-10 w-10 text-primary mb-2" />
                  <CardTitle>Local Payments</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Accept QRIS, GoPay, OVO, DANA, and bank transfers. Perfect for Indonesian customers.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Smartphone className="h-10 w-10 text-primary mb-2" />
                  <CardTitle>Mobile Friendly</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Optimized for mobile devices. Your attendees can buy tickets on any device.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <QrCode className="h-10 w-10 text-primary mb-2" />
                  <CardTitle>Easy Check-in</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Scan QR codes for check-in directly from your phone browser. No app needed.
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20">
          <div className="container max-w-6xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Trusted by Event Organizers</h2>
              <p className="text-xl text-muted-foreground">
                See what our customers say about Gatherly
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                    ))}
                  </div>
                  <p className="text-sm mb-4">
                    &quot;Gatherly made our campus music festival so much easier to organize. The QRIS payment was perfect for our students!&quot;
                  </p>
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <Users className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="font-semibold text-sm">Rina S.</div>
                      <div className="text-xs text-muted-foreground">Campus Event Committee</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                    ))}
                  </div>
                  <p className="text-sm mb-4">
                    &quot;Super simple to use! Created my workshop event and started selling tickets in minutes.&quot;
                  </p>
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <Calendar className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="font-semibold text-sm">Budi P.</div>
                      <div className="text-xs text-muted-foreground">Workshop Organizer</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                    ))}
                  </div>
                  <p className="text-sm mb-4">
                    &quot;The QR check-in system saved us so much time at the event entrance. Highly recommended!&quot;
                  </p>
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <QrCode className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="font-semibold text-sm">Sarah M.</div>
                      <div className="text-xs text-muted-foreground">Community Organizer</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="py-20 bg-muted/50">
          <div className="container max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Transparent Pricing</h2>
            <p className="text-xl text-muted-foreground mb-12">
              Simple, transparent pricing that grows with your events
            </p>

            <Card className="max-w-md mx-auto">
              <CardHeader>
                <div className="flex justify-center">
                  <Badge className="mb-4">Most Popular</Badge>
                </div>
                <CardTitle className="text-2xl">Pay Per Ticket</CardTitle>
                <div className="text-4xl font-bold">
                  5% <span className="text-lg font-normal text-muted-foreground">per ticket sold</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-primary" />
                    <span className="text-sm">Unlimited Events</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-primary" />
                    <span className="text-sm">QRIS Payment Integration</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-primary" />
                    <span className="text-sm">QR Code Check-in</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-primary" />
                    <span className="text-sm">Email Support</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-primary" />
                    <span className="text-sm">No Monthly Fees</span>
                  </div>
                </div>
                <Button className="w-full" size="lg" asChild>
                  <Link href="/sign-up">Start Selling Tickets Today</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="container max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Start Selling Tickets?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Join hundreds of event organizers who trust Gatherly for their ticketing needs.
            </p>
            <Button size="lg" asChild>
              <Link href="/sign-up">Get Started Free</Link>
            </Button>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
