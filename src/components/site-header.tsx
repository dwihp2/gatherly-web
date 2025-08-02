import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <Image
              src="/gatherly-logo.png"
              alt="Gatherly"
              width={32}
              height={32}
              className="h-8 w-8"
            />
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
              Gatherly
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <Link
            href="#features"
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            Features
          </Link>
          <Link
            href="#pricing"
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            Pricing
          </Link>
          <Link
            href="#help"
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            Help
          </Link>
        </nav>

        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex items-center gap-3">
          <Button variant="ghost" asChild>
            <Link href="/sign-in">Sign In</Link>
          </Button>
          <Button asChild className="font-semibold">
            <Link href="/sign-up">Start Free</Link>
          </Button>
        </div>

        {/* Mobile Navigation */}
        <Sheet>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon" className="relative group">
              <div className="flex flex-col justify-center items-center w-5 h-5 transform transition-all duration-300 group-hover:scale-110">
                <span className="block h-0.5 w-5 bg-current transform transition-all duration-300 group-hover:bg-primary"></span>
                <span className="block h-0.5 w-5 bg-current mt-1 transform transition-all duration-300 group-hover:bg-primary"></span>
                <span className="block h-0.5 w-5 bg-current mt-1 transform transition-all duration-300 group-hover:bg-primary"></span>
              </div>
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-80 p-0">
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b">
                <div className="flex items-center gap-2">
                  <Image
                    src="/gatherly-logo.png"
                    alt="Gatherly"
                    width={24}
                    height={24}
                    className="h-6 w-6"
                  />
                  <span className="text-lg font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                    Gatherly
                  </span>
                </div>
              </div>

              {/* Navigation Links */}
              <div className="flex-1 px-6 py-8">
                <nav className="space-y-6">
                  <Link
                    href="#features"
                    className="flex items-center gap-3 text-lg font-medium hover:text-primary transition-colors py-3 border-b border-border/50 hover:border-primary/20"
                  >
                    <div className="w-2 h-2 rounded-full bg-primary/20"></div>
                    Features
                  </Link>
                  <Link
                    href="#pricing"
                    className="flex items-center gap-3 text-lg font-medium hover:text-primary transition-colors py-3 border-b border-border/50 hover:border-primary/20"
                  >
                    <div className="w-2 h-2 rounded-full bg-primary/20"></div>
                    Pricing
                  </Link>
                  <Link
                    href="#help"
                    className="flex items-center gap-3 text-lg font-medium hover:text-primary transition-colors py-3 border-b border-border/50 hover:border-primary/20"
                  >
                    <div className="w-2 h-2 rounded-full bg-primary/20"></div>
                    Help
                  </Link>
                </nav>
              </div>

              {/* Bottom Actions */}
              <div className="p-6 border-t bg-muted/20 space-y-4">
                <Button variant="ghost" className="w-full justify-start text-lg h-12" asChild>
                  <Link href="/sign-in">Sign In</Link>
                </Button>
                <Button className="w-full font-semibold text-lg h-12 shadow-lg" asChild>
                  <Link href="/sign-up">Start Free</Link>
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
