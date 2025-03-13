import { ArrowLeft } from "lucide-react";
import portfolio from "../assets/portfolio.jpg";
import commerce from "../assets/E-Commerce.jpg";
import business from "../assets/Business Website.jpeg";
import blog from "../assets/Blog.jpg";
import landingPage from "../assets/landingpage.jpg";
import restaurant from "../assets/restaurant.jpg";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link } from "react-router-dom";

export default function TemplatesPage() {
  const templates = [
    {
      id: "portfolio",
      name: "Personal Portfolio",
      description:
        "Showcase your work and skills with this modern portfolio template.",
      image: portfolio,
      category: "Personal",
    },
    {
      id: "ecommerce",
      name: "E-commerce Store",
      description:
        "Sell products online with this complete e-commerce template.",
      image: commerce,
      category: "Business",
    },
    {
      id: "business",
      name: "Business Website",
      description:
        "Present your business professionally with this corporate template.",
      image: business,
      category: "Business",
    },
    {
      id: "blog",
      name: "Blog",
      description:
        "Share your thoughts and ideas with this clean blog template.",
      image: blog,
      category: "Content",
    },
    {
      id: "landing",
      name: "Landing Page",
      description:
        "Promote your product or service with this conversion-focused landing page.",
      image: landingPage,
      category: "Marketing",
    },
    {
      id: "restaurant",
      name: "Restaurant",
      description:
        "Showcase your menu and location with this restaurant template.",
      image: restaurant,
      category: "Business",
    },
  ];

  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="p-5 flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Link to="/dashboard" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              <span className="font-medium">Back to Dashboard</span>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1 p-5 py-10">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Templates</h1>
            <p className="text-muted-foreground">
              Choose a template to get started quickly
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">All Categories</Button>
            <Button variant="outline">Personal</Button>
            <Button variant="outline">Business</Button>
            <Button variant="outline">Marketing</Button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {templates.map((template) => (
            <Card key={template.id} className="overflow-hidden">
              <div className="aspect-video overflow-hidden">
                <img
                  src={template.image || "/placeholder.svg"}
                  alt={template.name}
                  className="w-full h-full object-cover transition-transform hover:scale-105"
                />
              </div>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>{template.name}</CardTitle>
                  <span className="text-xs bg-muted px-2 py-1 rounded-full">
                    {template.category}
                  </span>
                </div>
                <CardDescription>{template.description}</CardDescription>
              </CardHeader>
              <CardFooter className="flex justify-between">
                <Link to={`/templates/${template.id}`}>
                  <Button variant="outline">Preview</Button>
                </Link>
                <Link to={`/editor/${template.id}`}>
                  <Button>Use Template</Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
