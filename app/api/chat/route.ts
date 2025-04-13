import { GoogleGenerativeAI } from "@google/generative-ai"
import { NextResponse } from "next/server"

const apiKey = process.env.GOOGLE_AI_API_KEY
if (!apiKey) {
  throw new Error("GOOGLE_AI_API_KEY environment variable is not set")
}

console.log('API Key loaded:', apiKey ? 'Yes' : 'No')

const genAI = new GoogleGenerativeAI(apiKey)

export async function POST(req: Request) {
  try {
    const { message } = await req.json()

    // Get the generative model
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-pro",
      generationConfig: {
        temperature: 0.9,
        topK: 1,
        topP: 1,
        maxOutputTokens: 2048,
      },
    })

    console.log('Model configuration:', {
      model: "gemini-1.5-pro",
      apiKey: apiKey ? 'Present' : 'Missing'
    })

    // Create a prompt that focuses on poker
    const prompt = `You are a poker expert. Please provide advice and insights about poker strategy, rules, and gameplay. 
    If the question is not related to poker, politely decline to answer and explain that you are focused on poker-related topics.
    User's question: ${message}`

    const result = await model.generateContent(prompt)
    const response = await result.response
    const text = response.text()

    return NextResponse.json({ text })
  } catch (error) {
    console.error('Detailed Error:', error)
    return NextResponse.json(
      { error: 'Failed to generate response', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
} 