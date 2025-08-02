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
        <section className="relative overflow-hidden py-24 md:py-32 lg:py-40">
          {/* Background gradient and decorative elements */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-primary/10" />
          <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-primary/5 blur-3xl" />

          <div className="container relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              {/* Main headline with improved typography */}
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
                <span className="block">Create Events &</span>
                <span className="block">Sell Tickets</span>
                <span className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                  in 10 Minutes
                </span>
              </h1>

              {/* Enhanced subheadline */}
              <p className="mt-6 text-lg leading-8 text-muted-foreground sm:text-xl md:text-2xl max-w-3xl mx-auto">
                The trusted ticketing platform for Indonesian event organizers with
                <span className="font-semibold text-foreground"> QRIS, GoPay, OVO, DANA</span> support
              </p>

              {/* Enhanced CTA buttons with proper mobile touch targets */}
              <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button size="lg" className="text-lg px-8 py-6 h-auto font-semibold shadow-lg hover:shadow-xl transition-all min-h-[48px] w-full sm:w-auto" asChild>
                  <Link href="/sign-up">
                    Start Free Today
                    <Zap className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="text-lg px-8 py-6 h-auto font-semibold border-2 hover:bg-primary/5 min-h-[48px] w-full sm:w-auto" asChild>
                  <Link href="#features">
                    View Demo
                    <Calendar className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>

              {/* Enhanced Social Proof */}
              <div className="mt-16 lg:mt-20">
                <p className="text-sm font-semibold text-muted-foreground mb-8 uppercase tracking-wider">
                  Trusted by Indonesian Event Organizers
                </p>
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-3 max-w-2xl mx-auto">
                  <div className="text-center">
                    <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                      500+
                    </div>
                    <div className="text-sm font-medium text-muted-foreground mt-2">Events Created</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                      50K+
                    </div>
                    <div className="text-sm font-medium text-muted-foreground mt-2">Tickets Sold</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                      200+
                    </div>
                    <div className="text-sm font-medium text-muted-foreground mt-2">Happy Organizers</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 lg:py-28 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-muted/50 to-background" />
          <div className="container relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16 lg:mb-20">
              <Badge variant="secondary" className="mb-4 px-3 py-1">
                Why Choose Gatherly?
              </Badge>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-6">
                Everything you need to succeed
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                From creation to check-in, we&apos;ve got every aspect of event management covered
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              <Card className="group relative overflow-hidden border-0 bg-gradient-to-br from-card to-card/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <CardHeader className="relative pb-4">
                  <div className="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300">
                    <Zap className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl font-bold">Quick Setup</CardTitle>
                </CardHeader>
                <CardContent className="relative">
                  <CardDescription className="text-base leading-relaxed">
                    Create and publish your event in under 10 minutes. No technical skills required.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="group relative overflow-hidden border-0 bg-gradient-to-br from-card to-card/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <CardHeader className="relative pb-4">
                  <div className="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300">
                    <CreditCard className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl font-bold">Local Payments</CardTitle>
                </CardHeader>
                <CardContent className="relative">
                  <CardDescription className="text-base leading-relaxed">
                    Accept QRIS, GoPay, OVO, DANA, and bank transfers. Perfect for Indonesian customers.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="group relative overflow-hidden border-0 bg-gradient-to-br from-card to-card/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <CardHeader className="relative pb-4">
                  <div className="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300">
                    <Smartphone className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl font-bold">Mobile Friendly</CardTitle>
                </CardHeader>
                <CardContent className="relative">
                  <CardDescription className="text-base leading-relaxed">
                    Optimized for mobile devices. Your attendees can buy tickets on any device.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="group relative overflow-hidden border-0 bg-gradient-to-br from-card to-card/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <CardHeader className="relative pb-4">
                  <div className="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300">
                    <QrCode className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl font-bold">Easy Check-in</CardTitle>
                </CardHeader>
                <CardContent className="relative">
                  <CardDescription className="text-base leading-relaxed">
                    Scan QR codes for check-in directly from your phone browser. No app needed.
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20 lg:py-28">
          <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16 lg:mb-20">
              <Badge variant="secondary" className="mb-4 px-3 py-1">
                Success Stories
              </Badge>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-6">
                Trusted by Event Organizers
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                See what our customers say about their experience with Gatherly
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <Card className="group relative overflow-hidden border-0 bg-gradient-to-br from-card to-card/50 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="pt-8">
                  <div className="flex mb-6">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <blockquote className="text-lg leading-relaxed mb-6 font-medium">
                    &quot;Gatherly made our campus music festival so much easier to organize. The QRIS payment was perfect for our students!&quot;
                  </blockquote>
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
                      <Users className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <div className="font-semibold text-lg">Rina S.</div>
                      <div className="text-sm text-muted-foreground">Campus Event Committee</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="group relative overflow-hidden border-0 bg-gradient-to-br from-card to-card/50 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="pt-8">
                  <div className="flex mb-6">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <blockquote className="text-lg leading-relaxed mb-6 font-medium">
                    &quot;Super simple to use! Created my workshop event and started selling tickets in minutes.&quot;
                  </blockquote>
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
                      <Calendar className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <div className="font-semibold text-lg">Budi P.</div>
                      <div className="text-sm text-muted-foreground">Workshop Organizer</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="group relative overflow-hidden border-0 bg-gradient-to-br from-card to-card/50 shadow-lg hover:shadow-xl transition-all duration-300 md:col-span-2 lg:col-span-1">
                <CardContent className="pt-8">
                  <div className="flex mb-6">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <blockquote className="text-lg leading-relaxed mb-6 font-medium">
                    &quot;The QR check-in system saved us so much time at the event entrance. Highly recommended!&quot;
                  </blockquote>
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
                      <QrCode className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <div className="font-semibold text-lg">Sarah M.</div>
                      <div className="text-sm text-muted-foreground">Community Organizer</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="py-20 lg:py-28 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-muted/30 to-background" />
          <div className="container relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="mb-16 lg:mb-20">
              <Badge variant="secondary" className="mb-4 px-3 py-1">
                Simple Pricing
              </Badge>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-6">
                Transparent Pricing
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Simple, transparent pricing that grows with your events. No hidden fees, no surprises.
              </p>
            </div>

            <Card className="max-w-lg mx-auto relative overflow-hidden border-2 border-primary/20 shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/10" />
              <CardHeader className="relative text-center pb-8">
                <div className="flex justify-center mb-6">
                  <Badge className="px-4 py-2 text-sm font-semibold bg-gradient-to-r from-primary to-primary/80">
                    Most Popular
                  </Badge>
                </div>
                <CardTitle className="text-2xl sm:text-3xl font-bold mb-4">Pay Per Ticket</CardTitle>
                <div className="mb-4">
                  <span className="text-5xl sm:text-6xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                    5%
                  </span>
                  <span className="text-xl font-medium text-muted-foreground ml-2">per ticket sold</span>
                </div>
                <p className="text-muted-foreground">
                  Only pay when you succeed. No upfront costs or monthly fees.
                </p>
              </CardHeader>
              <CardContent className="relative space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center">
                      <Check className="h-3 w-3 text-primary font-bold" />
                    </div>
                    <span className="font-medium">Unlimited Events</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center">
                      <Check className="h-3 w-3 text-primary font-bold" />
                    </div>
                    <span className="font-medium">QRIS Payment Integration</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center">
                      <Check className="h-3 w-3 text-primary font-bold" />
                    </div>
                    <span className="font-medium">QR Code Check-in</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center">
                      <Check className="h-3 w-3 text-primary font-bold" />
                    </div>
                    <span className="font-medium">Email Support</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center">
                      <Check className="h-3 w-3 text-primary font-bold" />
                    </div>
                    <span className="font-medium">No Monthly Fees</span>
                  </div>
                </div>
                <Button className="w-full text-lg px-8 py-6 h-auto font-semibold shadow-lg hover:shadow-xl transition-all min-h-[48px]" size="lg" asChild>
                  <Link href="/sign-up">
                    Start Selling Tickets Today
                    <Zap className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 lg:py-28 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-primary/5" />
          <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-primary/5 blur-3xl" />

          <div className="container relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl mb-6">
                Ready to Start{" "}
                <span className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                  Selling Tickets?
                </span>
              </h2>
              <p className="text-xl sm:text-2xl text-muted-foreground mb-10 leading-relaxed">
                Join hundreds of event organizers who trust Gatherly for their ticketing needs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button
                  size="lg"
                  className="text-lg px-8 py-6 h-auto font-semibold shadow-lg hover:shadow-xl transition-all min-h-[48px] w-full sm:w-auto"
                  asChild
                >
                  <Link href="/sign-up">
                    Get Started Free
                    <Zap className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <p className="text-sm text-muted-foreground">
                  No credit card required • 5% commission only when you sell
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
