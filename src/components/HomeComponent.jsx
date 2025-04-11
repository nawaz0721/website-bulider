"use client"

import { ArrowRight, Check, Layers, Paintbrush, Code, Star, ArrowDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import banner from "../assets/website-builder.jpeg"
import portfolio from "../assets/portfolio.jpg"
import commerce from "../assets/E-Commerce.jpg"
import business from "../assets/Business Website.jpeg"
import Header from "@/components/Header"
import Cookies from "js-cookie"

export default function HomeComponent() {
  const authToken = Cookies.get("authToken") // Check if user is authenticated

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  }

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Header */}
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden p-5 py-24 md:py-32">
          {/* Background elements */}
          <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-blue-100 opacity-50 blur-3xl"></div>
          <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-purple-100 opacity-40 blur-3xl"></div>

          <motion.div initial="hidden" animate="visible" variants={fadeIn} className="container mx-auto">
            <div className="grid gap-10 md:grid-cols-2 md:gap-16">
              <div className="flex flex-col justify-center space-y-6">
                <div>
                  <div className="mb-4 inline-block rounded-full bg-blue-100 px-4 py-1.5 text-sm font-medium text-blue-800">
                    Website Builder
                  </div>
                  <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl bg-gradient-to-r from-gray-900 via-blue-800 to-purple-900 bg-clip-text text-transparent">
                    Build beautiful websites without code
                  </h1>
                </div>
                <p className="max-w-[600px] text-gray-600 text-lg md:text-xl leading-relaxed">
                  Create stunning, professional websites with our drag-and-drop builder. Choose from templates,
                  customize to your needs, and publish in minutes.
                </p>
                <div className="flex flex-col gap-3 min-[400px]:flex-row pt-2">
                  {!authToken && (
                    <Link to="/register">
                      <Button
                        size="lg"
                        className="gap-1.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg px-6 py-3 shadow-lg hover:shadow-xl transition-all duration-300"
                      >
                        Get Started <ArrowRight className="h-4 w-4 ml-1" />
                      </Button>
                    </Link>
                  )}
                  {authToken && (
                    <Link to="select-website">
                      <Button
                        size="lg"
                        className="gap-1.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg px-6 py-3 shadow-lg hover:shadow-xl transition-all duration-300"
                      >
                        Get Started <ArrowRight className="h-4 w-4 ml-1" />
                      </Button>
                    </Link>
                  )}
                  <a href="#features">
                    <Button
                      size="lg"
                      variant="outline"
                      className="gap-1.5 border-gray-300 text-gray-700 hover:bg-gray-100 font-medium rounded-lg px-6 py-3"
                    >
                      Learn More <ArrowDown className="h-4 w-4 ml-1" />
                    </Button>
                  </a>
                </div>

                {/* Trust badges */}
                <div className="flex items-center gap-3 pt-4">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className={`h-8 w-8 rounded-full border-2 border-white bg-gray-${i * 100}`}></div>
                    ))}
                  </div>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">5,000+</span> websites created by our users
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="relative h-[350px] w-full md:h-[440px] rounded-xl bg-white border shadow-2xl overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 to-purple-500/10"></div>
                  <img
                    src={banner || "/placeholder.svg"}
                    alt="Website builder interface preview"
                    className="object-cover h-full w-full"
                  />

                  {/* Floating elements */}
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-green-500"></div>
                      <span className="text-sm font-medium">Live Preview</span>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Features Section */}
        <section id="features" className="p-5 py-20 md:py-28 bg-white">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
            className="container mx-auto"
          >
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">Powerful Features</h2>
              <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
                Everything you need to build professional websites
              </p>
            </div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="grid gap-8 md:grid-cols-3"
            >
              <motion.div variants={fadeIn}>
                <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-gradient-to-br from-white to-blue-50">
                  <CardHeader>
                    <div className="mb-4 w-14 h-14 rounded-2xl bg-blue-100 flex items-center justify-center">
                      <Paintbrush className="h-7 w-7 text-blue-600" />
                    </div>
                    <CardTitle className="text-2xl">Drag & Drop Editor</CardTitle>
                    <CardDescription className="text-base">
                      Easily build your website with our intuitive drag and drop interface.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">
                      No coding required. Simply drag elements onto your page, customize them, and create beautiful
                      layouts in minutes.
                    </p>
                    <ul className="mt-4 space-y-2">
                      <li className="flex items-center text-gray-700">
                        <Check className="mr-2 h-5 w-5 text-green-500" />
                        <span>Intuitive visual editor</span>
                      </li>
                      <li className="flex items-center text-gray-700">
                        <Check className="mr-2 h-5 w-5 text-green-500" />
                        <span>Real-time preview</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div variants={fadeIn}>
                <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-gradient-to-br from-white to-purple-50">
                  <CardHeader>
                    <div className="mb-4 w-14 h-14 rounded-2xl bg-purple-100 flex items-center justify-center">
                      <Layers className="h-7 w-7 text-purple-600" />
                    </div>
                    <CardTitle className="text-2xl">Professional Templates</CardTitle>
                    <CardDescription className="text-base">
                      Choose from a variety of professionally designed templates.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">
                      Start with a template and customize it to match your brand. Portfolio, e-commerce, blog, and more.
                    </p>
                    <ul className="mt-4 space-y-2">
                      <li className="flex items-center text-gray-700">
                        <Check className="mr-2 h-5 w-5 text-green-500" />
                        <span>Responsive designs</span>
                      </li>
                      <li className="flex items-center text-gray-700">
                        <Check className="mr-2 h-5 w-5 text-green-500" />
                        <span>Industry-specific templates</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div variants={fadeIn}>
                <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-gradient-to-br from-white to-green-50">
                  <CardHeader>
                    <div className="mb-4 w-14 h-14 rounded-2xl bg-green-100 flex items-center justify-center">
                      <Code className="h-7 w-7 text-green-600" />
                    </div>
                    <CardTitle className="text-2xl">Export Code</CardTitle>
                    <CardDescription className="text-base">
                      Export your website as clean HTML, CSS, and JavaScript.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">
                      Premium users can export their website code to host anywhere or further customize with their own
                      development.
                    </p>
                    <ul className="mt-4 space-y-2">
                      <li className="flex items-center text-gray-700">
                        <Check className="mr-2 h-5 w-5 text-green-500" />
                        <span>Clean, optimized code</span>
                      </li>
                      <li className="flex items-center text-gray-700">
                        <Check className="mr-2 h-5 w-5 text-green-500" />
                        <span>Developer-friendly output</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          </motion.div>
        </section>

        {/* Templates Section */}
        <section id="templates" className="p-5 py-20 md:py-28 bg-gray-50">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
            className="container mx-auto"
          >
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">Ready-to-Use Templates</h2>
              <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
                Start with a professional template and customize it to your needs
              </p>
            </div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="grid gap-8 md:grid-cols-3"
            >
              <motion.div variants={fadeIn}>
                <Card className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
                  <div className="relative h-[240px] overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>
                    <img
                      src={portfolio || "/placeholder.svg"}
                      alt="Portfolio template"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-medium text-gray-800 z-20">
                      Popular
                    </div>
                  </div>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-2xl">Personal Portfolio</CardTitle>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                        <span className="ml-1 text-sm font-medium">4.9</span>
                      </div>
                    </div>
                    <CardDescription className="text-base">
                      Showcase your work and skills with this modern portfolio template.
                    </CardDescription>
                  </CardHeader>
                  <CardFooter className="flex flex-col gap-3">
                    <div className="flex flex-wrap gap-2 w-full">
                      <span className="px-2 py-1 bg-gray-100 rounded-full text-xs font-medium text-gray-700">
                        Responsive
                      </span>
                      <span className="px-2 py-1 bg-gray-100 rounded-full text-xs font-medium text-gray-700">
                        Portfolio
                      </span>
                      <span className="px-2 py-1 bg-gray-100 rounded-full text-xs font-medium text-gray-700">
                        Creative
                      </span>
                    </div>
                    <Link to="/templates/portfolio" className="w-full">
                      <Button className="gap-1.5 bg-blue-600 hover:bg-blue-700 text-white w-full transition-colors">
                        Preview Template
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              </motion.div>

              <motion.div variants={fadeIn}>
                <Card className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
                  <div className="relative h-[240px] overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>
                    <img
                      src={commerce || "/placeholder.svg"}
                      alt="E-commerce template"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute top-3 left-3 bg-blue-500/90 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-medium text-white z-20">
                      New
                    </div>
                  </div>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-2xl">E-commerce Store</CardTitle>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                        <span className="ml-1 text-sm font-medium">4.8</span>
                      </div>
                    </div>
                    <CardDescription className="text-base">
                      Sell products online with this complete e-commerce template.
                    </CardDescription>
                  </CardHeader>
                  <CardFooter className="flex flex-col gap-3">
                    <div className="flex flex-wrap gap-2 w-full">
                      <span className="px-2 py-1 bg-gray-100 rounded-full text-xs font-medium text-gray-700">
                        E-commerce
                      </span>
                      <span className="px-2 py-1 bg-gray-100 rounded-full text-xs font-medium text-gray-700">Shop</span>
                      <span className="px-2 py-1 bg-gray-100 rounded-full text-xs font-medium text-gray-700">
                        Products
                      </span>
                    </div>
                    <Link to="/templates/ecommerce" className="w-full">
                      <Button className="gap-1.5 bg-blue-600 hover:bg-blue-700 text-white w-full transition-colors">
                        Preview Template
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              </motion.div>

              <motion.div variants={fadeIn}>
                <Card className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
                  <div className="relative h-[240px] overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>
                    <img
                      src={business || "/placeholder.svg"}
                      alt="Business template"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-2xl">Business Website</CardTitle>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                        <span className="ml-1 text-sm font-medium">4.7</span>
                      </div>
                    </div>
                    <CardDescription className="text-base">
                      Present your business professionally with this corporate template.
                    </CardDescription>
                  </CardHeader>
                  <CardFooter className="flex flex-col gap-3">
                    <div className="flex flex-wrap gap-2 w-full">
                      <span className="px-2 py-1 bg-gray-100 rounded-full text-xs font-medium text-gray-700">
                        Business
                      </span>
                      <span className="px-2 py-1 bg-gray-100 rounded-full text-xs font-medium text-gray-700">
                        Corporate
                      </span>
                      <span className="px-2 py-1 bg-gray-100 rounded-full text-xs font-medium text-gray-700">
                        Professional
                      </span>
                    </div>
                    <Link to="/templates/business" className="w-full">
                      <Button className="gap-1.5 bg-blue-600 hover:bg-blue-700 text-white w-full transition-colors">
                        Preview Template
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              </motion.div>
            </motion.div>

            <div className="mt-12 text-center">
              <Link to="/templates">
                <Button
                  variant="outline"
                  size="lg"
                  className="gap-1.5 border-gray-300 text-gray-700 hover:bg-gray-100 font-medium rounded-lg px-6 py-3"
                >
                  View All Templates <ArrowRight className="h-4 w-4 ml-1" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="p-5 py-20 md:py-28 bg-white relative overflow-hidden">
          {/* Background elements */}
          <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-blue-50 opacity-70 blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-purple-50 opacity-70 blur-3xl"></div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
            className="container mx-auto relative z-10"
          >
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">Simple, Transparent Pricing</h2>
              <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">Choose the plan that's right for you</p>
            </div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="grid gap-8 md:grid-cols-3"
            >
              <motion.div variants={fadeIn}>
                <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-2xl">Free</CardTitle>
                    <div className="mt-4 flex items-baseline">
                      <span className="text-5xl font-bold">$0</span>
                      <span className="ml-1 text-xl text-gray-500">/month</span>
                    </div>
                    <CardDescription className="text-base mt-4">
                      Perfect for beginners and small projects
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pb-6">
                    <ul className="space-y-4">
                      <li className="flex items-center">
                        <Check className="mr-3 h-5 w-5 text-green-500" />
                        <span className="text-gray-700">1 website</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="mr-3 h-5 w-5 text-green-500" />
                        <span className="text-gray-700">Basic templates</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="mr-3 h-5 w-5 text-green-500" />
                        <span className="text-gray-700">Drag & drop editor</span>
                      </li>
                      <li className="flex items-center text-gray-400">
                        <div className="mr-3 h-5 w-5"></div>
                        <span>Custom domain</span>
                      </li>
                      <li className="flex items-center text-gray-400">
                        <div className="mr-3 h-5 w-5"></div>
                        <span>Export code</span>
                      </li>
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Link to="/register" className="w-full">
                      <Button className="gap-1.5 bg-blue-600 hover:bg-blue-700 text-white w-full transition-colors">
                        Get Started
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              </motion.div>

              <motion.div variants={fadeIn} className="md:-mt-4 md:-mb-4">
                <Card className="h-full border-0 shadow-xl hover:shadow-2xl transition-all duration-300 bg-white relative z-10">
                  <div className="absolute -top-5 left-0 right-0 flex justify-center">
                    <div className="bg-blue-600 text-white text-sm font-bold px-4 py-2 rounded-full shadow-lg">
                      MOST POPULAR
                    </div>
                  </div>
                  <CardHeader className="pt-10 pb-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-t-lg">
                    <CardTitle className="text-2xl">Pro</CardTitle>
                    <div className="mt-4 flex items-baseline">
                      <span className="text-5xl font-bold">$19</span>
                      <span className="ml-1 text-xl text-gray-500">/month</span>
                    </div>
                    <CardDescription className="text-base mt-4">
                      For professionals and growing businesses
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pb-6">
                    <ul className="space-y-4">
                      <li className="flex items-center">
                        <Check className="mr-3 h-5 w-5 text-green-500" />
                        <span className="text-gray-700">5 websites</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="mr-3 h-5 w-5 text-green-500" />
                        <span className="text-gray-700">All templates</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="mr-3 h-5 w-5 text-green-500" />
                        <span className="text-gray-700">Advanced editor features</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="mr-3 h-5 w-5 text-green-500" />
                        <span className="text-gray-700">Custom domain</span>
                      </li>
                      <li className="flex items-center text-gray-400">
                        <div className="mr-3 h-5 w-5"></div>
                        <span>Export code</span>
                      </li>
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Link to="/register?plan=pro" className="w-full">
                      <Button className="gap-1.5 bg-blue-600 hover:bg-blue-700 text-white w-full transition-colors">
                        Subscribe Now
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              </motion.div>

              <motion.div variants={fadeIn}>
                <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-2xl">Premium</CardTitle>
                    <div className="mt-4 flex items-baseline">
                      <span className="text-5xl font-bold">$49</span>
                      <span className="ml-1 text-xl text-gray-500">/month</span>
                    </div>
                    <CardDescription className="text-base mt-4">For agencies and advanced developers</CardDescription>
                  </CardHeader>
                  <CardContent className="pb-6">
                    <ul className="space-y-4">
                      <li className="flex items-center">
                        <Check className="mr-3 h-5 w-5 text-green-500" />
                        <span className="text-gray-700">Unlimited websites</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="mr-3 h-5 w-5 text-green-500" />
                        <span className="text-gray-700">All Pro features</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="mr-3 h-5 w-5 text-green-500" />
                        <span className="text-gray-700">Priority support</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="mr-3 h-5 w-5 text-green-500" />
                        <span className="text-gray-700">Custom domain</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="mr-3 h-5 w-5 text-green-500" />
                        <span className="text-gray-700">Export code (HTML/CSS/JS)</span>
                      </li>
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Link to="/register?plan=premium" className="w-full">
                      <Button className="gap-1.5 bg-blue-600 hover:bg-blue-700 text-white w-full transition-colors">
                        Subscribe Now
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              </motion.div>
            </motion.div>

            {/* FAQ teaser */}
            <div className="mt-16 text-center">
              <p className="text-gray-600 mb-4">Have questions about our pricing?</p>
              <Link to="/faq">
                <Button
                  variant="outline"
                  size="lg"
                  className="gap-1.5 border-gray-300 text-gray-700 hover:bg-gray-100 font-medium rounded-lg px-6 py-3"
                >
                  View FAQ <ArrowRight className="h-4 w-4 ml-1" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </section>

        {/* Testimonial Section */}
        <section className="p-5 py-20 md:py-28 bg-gray-50">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
            className="container mx-auto"
          >
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">Loved by Creators Worldwide</h2>
              <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
                See what our users are saying about WebCraft
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              {[
                {
                  quote:
                    "WebCraft helped me launch my portfolio in just one day. The templates are beautiful and so easy to customize!",
                  author: "Sarah Johnson",
                  role: "Freelance Designer",
                },
                {
                  quote:
                    "As a small business owner with no coding experience, WebCraft was exactly what I needed. My online store looks professional and was so simple to set up.",
                  author: "Michael Chen",
                  role: "E-commerce Store Owner",
                },
                {
                  quote:
                    "The export feature is a game-changer. I started with the drag-and-drop editor and then exported the code to add my own custom features.",
                  author: "Alex Rodriguez",
                  role: "Web Developer",
                },
              ].map((testimonial, index) => (
                <Card key={index} className="border-0 shadow-lg bg-white">
                  <CardContent className="pt-6">
                    <div className="mb-4 flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                      ))}
                    </div>
                    <p className="text-gray-700 italic mb-6">"{testimonial.quote}"</p>
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                        {testimonial.author.charAt(0)}
                      </div>
                      <div className="ml-3">
                        <p className="font-medium">{testimonial.author}</p>
                        <p className="text-sm text-gray-500">{testimonial.role}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>
        </section>

        {/* CTA Section */}
        <section className="p-5 py-20 md:py-28 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <div className="container mx-auto">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-6">
                Ready to build your website?
              </h2>
              <p className="text-xl text-white/80 mb-8">
                Join thousands of creators and businesses building their online presence with WebCraft.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to={authToken ? "/select-website" : "/register"}>
                  <Button
                    size="lg"
                    className="gap-1.5 bg-white text-blue-600 hover:bg-gray-100 font-medium rounded-lg px-8 py-3 shadow-lg"
                  >
                    Get Started <ArrowRight className="h-4 w-4 ml-1" />
                  </Button>
                </Link>
                <Link to="/templates">
                  <Button
                    size="lg"
                    variant="outline"
                    className="gap-1.5 border-white text-white hover:bg-white/10 font-medium rounded-lg px-8 py-3"
                  >
                    Browse Templates
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t bg-white">
        <div className="container mx-auto p-5 py-16">
          <div className="grid gap-8 md:grid-cols-4">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Layers className="h-6 w-6 text-blue-600" />
                <span className="text-xl font-bold">WebCraft</span>
              </div>
              <p className="text-gray-600">Build beautiful websites without code. Start your free trial today.</p>
              <div className="mt-6 flex gap-4">
                {["twitter", "facebook", "instagram", "github"].map((social) => (
                  <a
                    key={social}
                    href={`#${social}`}
                    className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-colors"
                  >
                    <span className="sr-only">{social}</span>
                    <div className="h-5 w-5" />
                  </a>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-4">Product</h3>
              <ul className="space-y-3">
                <li>
                  <Link to="#features" className="text-gray-600 hover:text-blue-600 transition-colors">
                    Features
                  </Link>
                </li>
                <li>
                  <Link to="#templates" className="text-gray-600 hover:text-blue-600 transition-colors">
                    Templates
                  </Link>
                </li>
                <li>
                  <Link to="#pricing" className="text-gray-600 hover:text-blue-600 transition-colors">
                    Pricing
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-4">Resources</h3>
              <ul className="space-y-3">
                <li>
                  <Link to="#" className="text-gray-600 hover:text-blue-600 transition-colors">
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link to="#" className="text-gray-600 hover:text-blue-600 transition-colors">
                    Tutorials
                  </Link>
                </li>
                <li>
                  <Link to="#" className="text-gray-600 hover:text-blue-600 transition-colors">
                    Blog
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-4">Company</h3>
              <ul className="space-y-3">
                <li>
                  <Link to="#" className="text-gray-600 hover:text-blue-600 transition-colors">
                    About
                  </Link>
                </li>
                <li>
                  <Link to="#" className="text-gray-600 hover:text-blue-600 transition-colors">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link to="#" className="text-gray-600 hover:text-blue-600 transition-colors">
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t text-center text-gray-500">
            <p>&copy; {new Date().getFullYear()} WebCraft. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
