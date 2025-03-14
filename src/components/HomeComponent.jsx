import { ArrowRight, Check, Layers, Paintbrush, Code } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link } from "react-router-dom";
import banner from "../assets/website-builder.jpeg";
import portfolio from "../assets/portfolio.jpg";
import commerce from "../assets/E-Commerce.jpg";
import business from "../assets/Business Website.jpeg";
import Header from "@/components/Header";
import Cookies from "js-cookie";

export default function HomeComponent() {
  const authToken = Cookies.get("authToken"); // Check if user is authenticated
  return (
    <div className="min-h-screen">
      {/* Header */}
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="p-5 py-24 md:py-32">
          <div className="grid gap-10 md:grid-cols-2 md:gap-16">
            <div className="flex flex-col justify-center space-y-4">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
                Build beautiful websites without code
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                Create stunning, professional websites with our drag-and-drop
                builder. Choose from templates, customize to your needs, and
                publish in minutes.
              </p>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                {!authToken && ( // Show Get Started button only if user is NOT logged in
                  <Link to="/register">
              <Button size="lg" className="gap-1.5 text-black bg-white hover:text-white hover:bg-black w-full transition-colors border-black"  variant="outline" >
                      Get Started <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                )}
                <Link to="templates">
                  <Button size="lg" className="gap-1.5 text-black bg-white hover:text-white hover:bg-black w-full transition-colors border-black"  variant="outline">
                    View Templates
                  </Button>
                </Link>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="relative h-[350px] w-full md:h-[440px] rounded-lg bg-muted/30 border shadow-lg overflow-hidden">
                <img
                  src={banner}
                  alt="Website builder interface preview"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="p-5 py-16 md:py-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Powerful Features
            </h2>
            <p className="mt-4 text-xl text-muted-foreground">
              Everything you need to build professional websites
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            <Card>
              <CardHeader>
                <div className="mb-2 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Paintbrush className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Drag & Drop Editor</CardTitle>
                <CardDescription>
                  Easily build your website with our intuitive drag and drop
                  interface.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  No coding required. Simply drag elements onto your page,
                  customize them, and create beautiful layouts in minutes.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <div className="mb-2 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Layers className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Professional Templates</CardTitle>
                <CardDescription>
                  Choose from a variety of professionally designed templates.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Start with a template and customize it to match your brand.
                  Portfolio, e-commerce, blog, and more.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <div className="mb-2 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Code className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Export Code</CardTitle>
                <CardDescription>
                  Export your website as clean HTML, CSS, and JavaScript.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Premium users can export their website code to host anywhere
                  or further customize with their own development.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Templates Section */}
        <section id="templates" className="p-5 py-16 md:py-24 bg-muted/30">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Ready-to-Use Templates
            </h2>
            <p className="mt-4 text-xl text-muted-foreground">
              Start with a professional template and customize it to your needs
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            <Card className="overflow-hidden">
              <div className="h-[200px] overflow-hidden">
                <img
                  src={portfolio}
                  alt="Portfolio template"
                  className="w-full h-full object-cover transition-transform hover:scale-105"
                />
              </div>
              <CardHeader>
                <CardTitle>Personal Portfolio</CardTitle>
                <CardDescription>
                  Showcase your work and skills with this modern portfolio
                  template.
                </CardDescription>
              </CardHeader>
              <CardFooter>
                <Link to="/templates/portfolio" className="w-full">
                  <Button className="gap-1.5 text-black bg-white hover:text-white hover:bg-black w-full transition-colors border-black"  variant="outline">
                    Preview Template
                  </Button>
                </Link>
              </CardFooter>
            </Card>
            <Card className="overflow-hidden">
              <div className="h-[200px] overflow-hidden">
                <img
                  src={commerce}
                  alt="E-commerce template"
                  className="w-full h-full object-cover transition-transform hover:scale-105"
                />
              </div>
              <CardHeader>
                <CardTitle>E-commerce Store</CardTitle>
                <CardDescription>
                  Sell products online with this complete e-commerce template.
                </CardDescription>
              </CardHeader>
              <CardFooter>
                <Link to="/templates/ecommerce" className="w-full">
                  <Button className="gap-1.5 text-black bg-white hover:text-white hover:bg-black w-full transition-colors border-black"  variant="outline">
                    Preview Template
                  </Button>
                </Link>
              </CardFooter>
            </Card>
            <Card className="overflow-hidden">
              <div className="h-[200px] overflow-hidden">
                <img
                  src={business}
                  alt="Business template"
                  className="w-full h-full object-cover transition-transform hover:scale-105"
                />
              </div>
              <CardHeader>
                <CardTitle>Business Website</CardTitle>
                <CardDescription>
                  Present your business professionally with this corporate
                  template.
                </CardDescription>
              </CardHeader>
              <CardFooter>
                <Link to="/templates/business" className="w-full">
                  <Button className="gap-1.5 text-black bg-white hover:text-white hover:bg-black w-full transition-colors border-black"  variant="outline">
                    Preview Template
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="p-5 py-16 md:py-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Simple, Transparent Pricing
            </h2>
            <p className="mt-4 text-xl text-muted-foreground">
              Choose the plan that's right for you
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Free</CardTitle>
                <div className="mt-4 flex items-baseline text-5xl font-bold">
                  $0
                  <span className="ml-1 text-xl text-muted-foreground">
                    /month
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-primary" />
                    <span>1 website</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-primary" />
                    <span>Basic templates</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-primary" />
                    <span>Drag & drop editor</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Link to="/register" className="w-full">
                  <Button className="gap-1.5 text-black bg-white hover:text-white hover:bg-black w-full transition-colors border-black"  variant="outline">
                    Get Started
                  </Button>
                </Link>
              </CardFooter>
            </Card>
            <Card className="border-primary">
              <CardHeader className="bg-primary/5">
                <div className="text-center text-sm font-medium text-primary mb-2">
                  MOST POPULAR
                </div>
                <CardTitle>Pro</CardTitle>
                <div className="mt-4 flex items-baseline text-5xl font-bold">
                  $19
                  <span className="ml-1 text-xl text-muted-foreground">
                    /month
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-primary" />
                    <span>5 websites</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-primary" />
                    <span>All templates</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-primary" />
                    <span>Advanced editor features</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-primary" />
                    <span>Custom domain</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Link to="/register?plan=pro" className="w-full">
                  <Button className="gap-1.5 text-black bg-white hover:text-white hover:bg-black w-full transition-colors border-black"  variant="outline">Subscribe Now</Button>
                </Link>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Premium</CardTitle>
                <div className="mt-4 flex items-baseline text-5xl font-bold">
                  $49
                  <span className="ml-1 text-xl text-muted-foreground">
                    /month
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-primary" />
                    <span>Unlimited websites</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-primary" />
                    <span>All Pro features</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-primary" />
                    <span>Priority support</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-primary" />
                    <span>Export code (HTML/CSS/JS)</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Link to="/register?plan=premium" className="w-full">
                  <Button className="gap-1.5 text-black bg-white hover:text-white hover:bg-black w-full transition-colors border-black"  variant="outline">
                    Subscribe Now
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t bg-muted/40">
        <div className="p-5 py-10">
          <div className="grid gap-8 md:grid-cols-4">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Layers className="h-6 w-6 text-primary" />
                <span className="text-xl font-bold">WebCraft</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Build beautiful websites without code. Start your free trial
                today.
              </p>
            </div>
            <div>
              <h3 className="font-medium mb-4">Product</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    to="#features"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Features
                  </Link>
                </li>
                <li>
                  <Link
                    to="#templates"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Templates
                  </Link>
                </li>
                <li>
                  <Link
                    to="#pricing"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Pricing
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium mb-4">Resources</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    to="#"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Tutorials
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Blog
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium mb-4">Company</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    to="#"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Contact
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-10 border-t pt-6 text-center text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} WebCraft. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
