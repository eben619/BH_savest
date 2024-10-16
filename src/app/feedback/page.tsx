'use client'

import { useState } from 'react'
import Header from '@/app/components/Header'
import Footer from '@/app/components/Footer'
import { Button } from "@/app/components/ui/button"
import { Input } from "@/app/components/ui/input"
import { Textarea } from "@/app/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card"
import WordPullUp from "@/app/components/ui/word-pull-up"
import GridPattern from "@/app/components/ui/animated-grid-pattern"

export default function FeedbackPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [feedback, setFeedback] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the feedback to your backend
    console.log('Feedback submitted:', { name, email, feedback })
    // Reset form fields
    setName('')
    setEmail('')
    setFeedback('')
    // You might want to show a success message to the user here
  }

  return (
    <div className="min-h-screen flex flex-col relative">
      <Header />
      <GridPattern
        width={40}
        height={40}
        className="absolute inset-0 z-0 text-gray-300 dark:text-gray-800"
        strokeDasharray="8 4"
      />
      <main className="flex-grow flex flex-col items-center justify-center py-12 relative z-10">
        <div className="text-center mb-8">
          <WordPullUp words="Your Feedback Matters" className="mb-2" />
          <p className="text-xl text-gray-600 dark:text-gray-400">Help us improve your BlockHolder experience</p>
        </div>
        <Card className="w-full max-w-md mx-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Share Your Thoughts</CardTitle>
            <CardDescription>We value your input. Please share your thoughts and suggestions with us.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-1">Name</label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="feedback" className="block text-sm font-medium mb-1">Feedback</label>
                <Textarea
                  id="feedback"
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  required
                  rows={5}
                />
              </div>
              <Button type="submit" className="w-full">Submit Feedback</Button>
            </form>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  )
}
