import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Layout, Plus } from 'lucide-react'
import DashboardHeader from '@/components/dashboard-header'
import { Link } from 'react-router-dom'

const templates = [
  {
    id: 'portfolio',
    name: 'Portfolio',
    description: 'Perfect for showcasing your work and skills',
    image: '/placeholder.svg?height=200&width=300',
  },
  {
    id: 'ecommerce',
    name: 'E-commerce',
    description: 'Ideal for online stores and product catalogs',
    image: '/placeholder.svg?height=200&width=300',
  },
  {
    id: 'business',
    name: 'Business',
    description: 'Professional layout for company websites',
    image: '/placeholder.svg?height=200&width=300',
  },
]

const projects = [
  {
    id: 'project-1',
    name: 'My Portfolio',
    template: 'Portfolio',
    lastEdited: '2 days ago',
    image: '/placeholder.svg?height=200&width=300',
  },
]

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState('projects')
  
  return (
    <div className="min-h-screen flex flex-col">
      <DashboardHeader />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="text-muted-foreground">Manage your websites and templates</p>
          </div>
          <Button className="gap-2">
            <Plus className="h-4 w-4" /> New Project
          </Button>
        </div>
        
        <div className="flex border-b mb-6">
          <button
            className={`px-4 py-2 font-medium ${
              activeTab === 'projects' 
                ? 'text-primary border-b-2 border-primary' 
                : 'text-muted-foreground hover:text-foreground'
            }`}
            onClick={() => setActiveTab('projects')}
          >
            My Projects
          </button>
          <button
            className={`px-4 py-2 font-medium ${
              activeTab === 'templates' 
                ? 'text-primary border-b-2 border-primary' 
                : 'text-muted-foreground hover:text-foreground'
            }`}
            onClick={() => setActiveTab('templates')}
          >
            Templates
          </button>
        </div>
        
        {activeTab === 'projects' ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map(project => (
              <Card key={project.id}>
                <CardHeader className="p-0">
                  <div className="aspect-video w-full overflow-hidden rounded-t-lg">
                    <img
                      src={project.image || "/placeholder.svg"}
                      alt={project.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                </CardHeader>
                <CardContent className="p-4">
                  <CardTitle>{project.name}</CardTitle>
                  <CardDescription>
                    Template: {project.template} • Last edited: {project.lastEdited}
                  </CardDescription>
                </CardContent>
                <CardFooter className="p-4 pt-0 flex justify-between">
                  <Button variant="outline" size="sm">Preview</Button>
                  <Link to={`/editor/${project.id}`}>
                    <Button size="sm">Edit</Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
            
            <Card className="flex flex-col items-center justify-center p-6 border-dashed">
              <div className="rounded-full bg-primary/10 p-3 mb-4">
                <Plus className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-medium mb-2">Create New Project</h3>
              <p className="text-center text-muted-foreground mb-4">
                Start from scratch or use a template
              </p>
              <Button>Get Started</Button>
            </Card>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {templates.map(template => (
              <Card key={template.id}>
                <CardHeader className="p-0">
                  <div className="aspect-video w-full overflow-hidden rounded-t-lg">
                    <img
                      src={template.image || "/placeholder.svg"}
                      alt={template.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                </CardHeader>
                <CardContent className="p-4">
                  <CardTitle>{template.name}</CardTitle>
                  <CardDescription>{template.description}</CardDescription>
                </CardContent>
                <CardFooter className="p-4 pt-0 flex justify-between">
                  <Button variant="outline" size="sm">Preview</Button>
                  <Button size="sm">Use Template</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}