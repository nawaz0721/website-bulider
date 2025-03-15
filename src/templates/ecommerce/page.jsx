import { ArrowLeft, ShoppingCart, Search, User, Heart, Menu } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Link } from "react-router-dom"

export default function EcommerceTemplate() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Template Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="p-5 flex h-14 items-center justify-between">
          <Link to="/templates" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            <span className="font-medium">Back to Templates</span>
          </Link>
          <div className="flex items-center gap-4">
            <Button>Use This Template</Button>
          </div>
        </div>
      </header>

      {/* E-commerce Template */}
      <div className="flex-1 overflow-auto">
        <div className="min-h-screen flex flex-col">
          {/* E-commerce Header */}
          <header className="border-b">
            <div className="p-5 py-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="icon" className="md:hidden">
                    <Menu className="h-5 w-5" />
                  </Button>
                  <Link to="#" className="text-2xl font-bold">
                    ShopNow
                  </Link>
                </div>
                <div className="hidden md:flex items-center gap-6">
                  <Link to="#" className="text-sm font-medium hover:text-primary">
                    Home
                  </Link>
                  <Link to="#" className="text-sm font-medium hover:text-primary">
                    Shop
                  </Link>
                  <Link to="#" className="text-sm font-medium hover:text-primary">
                    Categories
                  </Link>
                  <Link to="#" className="text-sm font-medium hover:text-primary">
                    About
                  </Link>
                  <Link to="#" className="text-sm font-medium hover:text-primary">
                    Contact
                  </Link>
                </div>
                <div className="flex items-center gap-4">
                  <Button variant="ghost" size="icon">
                    <Search className="h-5 w-5" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <User className="h-5 w-5" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Heart className="h-5 w-5" />
                  </Button>
                  <Button variant="ghost" size="icon" className="relative">
                    <ShoppingCart className="h-5 w-5" />
                    <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center text-xs">
                      3
                    </Badge>
                  </Button>
                </div>
              </div>
              <div className="flex items-center gap-4 mb-2">
                <div className="relative w-full">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input placeholder="Search for products..." className="pl-10" />
                </div>
              </div>
            </div>
          </header>

          {/* Hero Banner */}
          <section className="bg-muted/30">
            <div className="p-5 py-12 md:py-24">
              <div className="grid gap-8 md:grid-cols-2 md:gap-12 items-center">
                <div>
                  <Badge className="mb-4">New Collection</Badge>
                  <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl mb-4">Summer Sale Up to 50% Off</h1>
                  <p className="text-muted-foreground text-lg mb-6">
                    Discover our new summer collection and enjoy exclusive discounts on selected items.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button size="lg">Shop Now</Button>
                    <Button size="lg" variant="outline">
                      Learn More
                    </Button>
                  </div>
                </div>
                <div className="flex justify-center">
                  <div className="relative h-[350px] w-full rounded-lg overflow-hidden">
                    <img
                      src="/placeholder.svg?height=350&width=500"
                      alt="Summer collection"
                      className="object-cover h-full w-full"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Categories */}
          <section className="p-5 py-12">
            <h2 className="text-2xl font-bold mb-8">Shop by Category</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {["Men", "Women", "Accessories", "Footwear"].map((category) => (
                <div key={category} className="group relative overflow-hidden rounded-lg">
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={`/placeholder.svg?height=300&width=300&text=${category}`}
                      alt={category}
                      className="h-full w-full object-cover transition-transform group-hover:scale-105"
                    />
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                    <h3 className="text-xl font-bold text-white">{category}</h3>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Featured Products */}
          <section className="p-5 py-12">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold">Featured Products</h2>
              <Link to="#" className="text-sm font-medium text-primary hover:underline">
                View All
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <Card key={i} className="overflow-hidden">
                  <div className="relative aspect-square overflow-hidden">
                    <img
                      src={`/placeholder.svg?height=300&width=300&text=Product+${i}`}
                      alt={`Product ${i}`}
                      className="h-full w-full object-cover transition-transform hover:scale-105"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute right-2 top-2 rounded-full bg-white/80 hover:bg-white"
                    >
                      <Heart className="h-4 w-4" />
                    </Button>
                  </div>
                  <CardContent className="p-4">
                    <div className="text-sm text-muted-foreground mb-1">Category</div>
                    <h3 className="font-medium mb-1">Product Name {i}</h3>
                    <div className="flex items-center justify-between">
                      <div className="font-bold">$99.99</div>
                      <div className="text-sm line-through text-muted-foreground">$129.99</div>
                    </div>
                  </CardContent>
                  <CardFooter className="p-4 pt-0">
                    <Button className="w-full">Add to Cart</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </section>

          {/* Special Offer */}
          <section className="bg-muted/30 py-12">
            <div className="p-5">
              <div className="grid gap-8 md:grid-cols-2 items-center">
                <div>
                  <Badge className="mb-4">Limited Time</Badge>
                  <h2 className="text-3xl font-bold tracking-tighter mb-4">Special Offer</h2>
                  <p className="text-muted-foreground mb-6">
                    Get 20% off on all accessories when you buy any clothing item. Use code SPECIAL20 at checkout.
                  </p>
                  <Button>Shop Now</Button>
                </div>
                <div className="flex justify-center">
                  <div className="relative h-[250px] w-full rounded-lg overflow-hidden">
                    <img
                      src="/placeholder.svg?height=250&width=500&text=Special+Offer"
                      alt="Special offer"
                      className="object-cover h-full w-full"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* New Arrivals */}
          <section className="p-5 py-12">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold">New Arrivals</h2>
              <Link to="#" className="text-sm font-medium text-primary hover:underline">
                View All
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[5, 6, 7, 8].map((i) => (
                <Card key={i} className="overflow-hidden">
                  <div className="relative aspect-square overflow-hidden">
                    <img
                      src={`/placeholder.svg?height=300&width=300&text=Product+${i}`}
                      alt={`Product ${i}`}
                      className="h-full w-full object-cover transition-transform hover:scale-105"
                    />
                    <Badge className="absolute left-2 top-2">New</Badge>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute right-2 top-2 rounded-full bg-white/80 hover:bg-white"
                    >
                      <Heart className="h-4 w-4" />
                    </Button>
                  </div>
                  <CardContent className="p-4">
                    <div className="text-sm text-muted-foreground mb-1">Category</div>
                    <h3 className="font-medium mb-1">Product Name {i}</h3>
                    <div className="font-bold">$79.99</div>
                  </CardContent>
                  <CardFooter className="p-4 pt-0">
                    <Button className="w-full">Add to Cart</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </section>

          {/* Newsletter */}
          <section className="bg-primary text-primary-foreground py-12">
            <div className="p-5">
              <div className="mx-auto max-w-2xl text-center">
                <h2 className="text-2xl font-bold mb-4">Subscribe to Our Newsletter</h2>
                <p className="mb-6">Stay updated with our latest offers, new arrivals, and exclusive discounts.</p>
                <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                  <Input placeholder="Enter your email" className="bg-primary-foreground text-foreground" />
                  <Button variant="secondary">Subscribe</Button>
                </div>
              </div>
            </div>
          </section>

          {/* Footer */}
          <footer className="border-t py-12 bg-muted/30">
            <div className="p-5">
              <div className="grid gap-8 md:grid-cols-4">
                <div>
                  <h3 className="text-lg font-bold mb-4">ShopNow</h3>
                  <p className="text-muted-foreground mb-4">Your one-stop destination for all your fashion needs.</p>
                  <div className="flex gap-4">
                    <Button variant="ghost" size="icon">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-5 w-5"
                      >
                        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                      </svg>
                    </Button>
                    <Button variant="ghost" size="icon">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-5 w-5"
                      >
                        <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
                      </svg>
                    </Button>
                    <Button variant="ghost" size="icon">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-5 w-5"
                      >
                        <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                      </svg>
                    </Button>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-4">Shop</h3>
                  <ul className="space-y-2">
                    <li>
                      <Link to="#" className="text-muted-foreground hover:text-foreground">
                        Men
                      </Link>
                    </li>
                    <li>
                      <Link to="#" className="text-muted-foreground hover:text-foreground">
                        Women
                      </Link>
                    </li>
                    <li>
                      <Link to="#" className="text-muted-foreground hover:text-foreground">
                        Accessories
                      </Link>
                    </li>
                    <li>
                      <Link to="#" className="text-muted-foreground hover:text-foreground">
                        Footwear
                      </Link>
                    </li>
                    <li>
                      <Link to="#" className="text-muted-foreground hover:text-foreground">
                        New Arrivals
                      </Link>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-4">Help</h3>
                  <ul className="space-y-2">
                    <li>
                      <Link to="#" className="text-muted-foreground hover:text-foreground">
                        Customer Service
                      </Link>
                    </li>
                    <li>
                      <Link to="#" className="text-muted-foreground hover:text-foreground">
                        My Account
                      </Link>
                    </li>
                    <li>
                      <Link to="#" className="text-muted-foreground hover:text-foreground">
                        Find a Store
                      </Link>
                    </li>
                    <li>
                      <Link to="#" className="text-muted-foreground hover:text-foreground">
                        Shipping & Returns
                      </Link>
                    </li>
                    <li>
                      <Link to="#" className="text-muted-foreground hover:text-foreground">
                        FAQs
                      </Link>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-4">Contact</h3>
                  <address className="not-italic text-muted-foreground space-y-2">
                    <p>123 Fashion Street</p>
                    <p>New York, NY 10001</p>
                    <p>Email: info@shopnow.com</p>
                    <p>Phone: (123) 456-7890</p>
                  </address>
                </div>
              </div>
              <div className="mt-10 border-t pt-6 text-center text-sm text-muted-foreground">
                &copy; {new Date().getFullYear()} ShopNow. All rights reserved.
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  )
}

