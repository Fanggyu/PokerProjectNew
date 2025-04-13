'use client'

import { useState } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'

export default function TestGemini() {
  const [response, setResponse] = useState<string>('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string>('')
  const [question, setQuestion] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: question,
        }),
      })

      if (!res.ok) {
        throw new Error('API request failed')
      }

      const data = await res.json()
      setResponse(data.text)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-4 border rounded-lg shadow-sm">
      <h2 className="text-xl font-bold mb-4">Ask me anything</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Type your question here..."
          className="w-full"
        />
        <Button
          type="submit"
          disabled={loading}
          className="w-full"
        >
          {loading ? 'Thinking...' : 'Ask'}
        </Button>
      </form>
      
      {error && (
        <div className="mt-4 p-2 bg-red-100 text-red-700 rounded">
          Error: {error}
        </div>
      )}
      
      {response && (
        <div className="mt-4 p-4 bg-white/90 text-black rounded-lg border border-gold-500">
          <h3 className="font-semibold mb-2 text-gold-500">Answer:</h3>
          <p className="text-gray-800">{response}</p>
        </div>
      )}
    </div>
  )
} 