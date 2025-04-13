"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"

interface Message {
  role: "user" | "assistant"
  content: string
}

export function ChatBox() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage = input.trim()
    setInput("")
    setMessages(prev => [...prev, { role: "user", content: userMessage }])
    setIsLoading(true)

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: userMessage }),
      })

      if (!response.ok) throw new Error("Failed to get response")

      const data = await response.json()
      setMessages(prev => [...prev, { role: "assistant", content: data.response }])
    } catch (error) {
      console.error("Error:", error)
      setMessages(prev => [...prev, { 
        role: "assistant", 
        content: "Sorry, I encountered an error. Please try again." 
      }])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="casino-card p-4">
      <h2 className="text-xl font-semibold mb-4 text-gold-500">Poker Assistant</h2>
      <div className="flex flex-col h-[400px]">
        <ScrollArea ref={scrollAreaRef} className="flex-1 mb-4 p-4 bg-black/50 rounded-lg">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`mb-4 ${
                message.role === "user" ? "text-right" : "text-left"
              }`}
            >
              <div
                className={`inline-block p-3 rounded-lg ${
                  message.role === "user"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-700 text-gold-500"
                }`}
              >
                {message.content}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="text-center text-gold-500">
              Thinking...
            </div>
          )}
        </ScrollArea>
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask me anything about poker..."
            className="flex-1 bg-black/50 border-gold-500 text-white"
          />
          <Button 
            type="submit" 
            disabled={isLoading}
            className="bg-gold-500 text-black hover:bg-gold-600"
          >
            Send
          </Button>
        </form>
      </div>
    </div>
  )
} 