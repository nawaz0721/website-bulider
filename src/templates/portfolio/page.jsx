import { ArrowLeft, Github, Twitter, Linkedin, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import profile from "../../assets/profile.png"
import business from "../../assets/Business Website.jpeg"

export default function PortfolioTemplate() {
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
            <Link to="/editor/new?template=portfolio">
              <Button>Use This Template</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Portfolio Template */}
      <div className="flex-1 overflow-auto">
        <div className="min-h-screen flex flex-col">
          {/* Portfolio Header */}
          <header className="border-b">
            <div className="p-5 flex h-16 items-center justify-between py-4">
              <div className="font-bold text-xl">John Doe</div>
              <nav className="flex items-center gap-6">
                <Link to="#about" className="text-sm font-medium hover:text-primary">
                  About
                </Link>
                <Link to="#projects" className="text-sm font-medium hover:text-primary">
                  Projects
                </Link>
                <Link to="#contact" className="text-sm font-medium hover:text-primary">
                  Contact
                </Link>
              </nav>
            </div>
          </header>

          {/* Hero Section */}
          <section className="p-5 py-24 md:py-32">
            <div className="grid gap-10 md:grid-cols-2 md:gap-16">
              <div className="flex flex-col justify-center space-y-4">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">Hi, I'm John Doe</h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  A passionate frontend developer specializing in creating beautiful and functional web experiences.
                </p>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button>View My Work</Button>
                  <Button variant="outline">Contact Me</Button>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative h-[350px] w-[350px] rounded-full bg-muted/30 border overflow-hidden">
                  <img src={profile} alt="John Doe" className="object-cover" />
                </div>
              </div>
            </div>
          </section>

          {/* About Section */}
          <section id="about" className="p-5 py-16 md:py-24 bg-muted/30">
            <div className="grid gap-10 md:grid-cols-2 md:gap-16">
              <div>
                <h2 className="text-3xl font-bold tracking-tighter mb-6">About Me</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    I'm a frontend developer with 5 years of experience building modern web applications. I specialize
                    in React, Next.js, and TypeScript.
                  </p>
                  <p>
                    My journey in web development started when I built my first website at the age of 16. Since then,
                    I've been passionate about creating intuitive and performant user interfaces.
                  </p>
                  <p>When I'm not coding, you can find me hiking, reading, or experimenting with new technologies.</p>
                </div>
              </div>
              <div>
                <h2 className="text-3xl font-bold tracking-tighter mb-6">Skills</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <h3 className="font-medium">Frontend</h3>
                    <ul className="space-y-1 text-muted-foreground">
                      <li>React / Next.js</li>
                      <li>JavaScript</li>
                      <li>Tailwind CSS</li>
                      <li>HTML / CSS</li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-medium">Backend</h3>
                    <ul className="space-y-1 text-muted-foreground">
                      <li>Node.js</li>
                      <li>Express</li>
                      <li>MongoDB</li>
                      <li>PostgreSQL</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Projects Section */}
          <section id="projects" className="p-5 py-16 md:py-24">
            <h2 className="text-3xl font-bold tracking-tighter mb-10 text-center">My Projects</h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="group overflow-hidden rounded-lg border bg-background shadow-sm transition-all hover:shadow-md"
                >
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={business}
                      alt={`Project ${i}`}
                      className="h-full w-full object-cover transition-transform group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold">Project {i}</h3>
                    <p className="mt-2 text-muted-foreground">
                      A brief description of project {i} and the technologies used to build it.
                    </p>
                    <div className="mt-4 flex gap-2">
                      <Button size="sm" variant="outline">
                        View Demo
                      </Button>
                      <Button size="sm" variant="outline">
                        Source Code
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Contact Section */}
          <section id="contact" className="p-5 py-16 md:py-24 bg-muted/30">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tighter mb-6">Get In Touch</h2>
              <p className="mb-8 text-muted-foreground">
                I'm currently open to new opportunities. Whether you have a question or just want to say hi, I'll try my
                best to get back to you!
              </p>
              <div className="flex justify-center gap-4 mb-8">
                <Button size="icon" variant="outline">
                  <Github className="h-5 w-5" />
                </Button>
                <Button size="icon" variant="outline">
                  <Linkedin className="h-5 w-5" />
                </Button>
                <Button size="icon" variant="outline">
                  <Twitter className="h-5 w-5" />
                </Button>
                <Button size="icon" variant="outline">
                  <Mail className="h-5 w-5" />
                </Button>
              </div>
              <Button size="lg">Send Me an Email</Button>
            </div>
          </section>

          {/* Footer */}
          <footer className="border-t py-6">
            <div className="p-5 flex flex-col items-center justify-between gap-4 md:flex-row">
              <p className="text-center text-sm text-muted-foreground">
                © {new Date().getFullYear()} John Doe. All rights reserved.
              </p>
              <div className="flex gap-4">
                <Link to="#" className="text-sm text-muted-foreground hover:text-foreground">
                  Privacy Policy
                </Link>
                <Link to="#" className="text-sm text-muted-foreground hover:text-foreground">
                  Terms of Service
                </Link>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  )
}

