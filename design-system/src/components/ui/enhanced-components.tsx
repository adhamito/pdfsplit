import * as React from "react"
import { Button } from "./button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./card"

export function EnhancedLoginCard() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="login-bg w-full max-w-md p-8 rounded-2xl">
        <div className="logo mb-8 text-center">
          <h1 className="text-3xl font-bold text-white">Welcome Back</h1>
          <p className="text-white/80 mt-2">Sign in to your account</p>
        </div>
        
        <Card className="backdrop-blur-sm bg-white/10 border-white/20" animated>
          <CardHeader>
            <CardTitle className="text-white">Login</CardTitle>
            <CardDescription className="text-white/70">
              Enter your credentials to continue
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-white/90 text-sm font-medium">Email</label>
              <input 
                type="email" 
                className="w-full px-3 py-2 bg-white/20 border border-white/30 rounded-md text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50"
                placeholder="Enter your email"
              />
            </div>
            <div className="space-y-2">
              <label className="text-white/90 text-sm font-medium">Password</label>
              <input 
                type="password" 
                className="w-full px-3 py-2 bg-white/20 border border-white/30 rounded-md text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50"
                placeholder="Enter your password"
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-3">
            <Button className="w-full" animated>
              Sign In
            </Button>
            <Button variant="outline" className="w-full border-white/30 text-white hover:bg-white/10">
              Forgot Password?
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

export function AnimatedFeatureCards() {
  const features = [
    {
      title: "Fast Performance",
      description: "Optimized for speed and efficiency with modern web technologies.",
      icon: "🚀"
    },
    {
      title: "Beautiful Design",
      description: "Stunning UI components with smooth animations and transitions.",
      icon: "✨"
    },
    {
      title: "Easy Integration",
      description: "Simple to integrate with your existing projects and workflows.",
      icon: "🔧"
    }
  ]

  return (
    <div className="grid gap-6 md:grid-cols-3 p-6">
      {features.map((feature, index) => (
        <Card key={index} animated className="text-center">
          <CardHeader>
            <div className="text-4xl mb-4">{feature.icon}</div>
            <CardTitle>{feature.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>{feature.description}</CardDescription>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button size="sm" animated>
              Learn More
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

export function AnimatedCTASection() {
  return (
    <div className="text-center py-16 px-6">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-4xl font-bold mb-4">Ready to Get Started?</h2>
        <p className="text-lg text-muted-foreground mb-8">
          Experience the power of beautifully animated components in your next project.
        </p>
        <div className="flex gap-4 justify-center">
          <Button size="lg" animated>
            Get Started
          </Button>
          <Button size="lg" variant="outline">
            View Documentation
          </Button>
        </div>
      </div>
    </div>
  )
}