import { useCallback } from 'react'
import { TaxInput } from '@/app/types/tax'
import useAIResponseStream from './useAIResponseStream'

interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
  created_at: number
}

interface UseTaxAIStreamHandlerOptions {
  messages: ChatMessage[]
  setMessages: (messages: ChatMessage[] | ((prev: ChatMessage[]) => ChatMessage[])) => void
  setIsStreaming: (isStreaming: boolean) => void
  setError: (error: string | null) => void
  taxData?: TaxInput
  backendUrl?: string
}

const useTaxAIStreamHandler = ({
  messages,
  setMessages,
  setIsStreaming,
  setError,
  taxData,
  backendUrl = process.env.NEXT_PUBLIC_TAX_AI_BACKEND_URL || 'http://localhost:7777'
}: UseTaxAIStreamHandlerOptions) => {
  const { streamResponse } = useAIResponseStream()

  const handleStreamResponse = useCallback(
    async (input: string) => {
      setIsStreaming(true)
      setError(null)

      // Add user message
      setMessages((prev) => [
        ...prev,
        {
          role: 'user',
          content: input,
          created_at: Math.floor(Date.now() / 1000)
        }
      ])

      // Add empty assistant message for streaming
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: '',
          created_at: Math.floor(Date.now() / 1000) + 1
        }
      ])

      let lastContent = ''

      try {
        // Use Next.js API route as proxy, or call backend directly
        const useProxy = process.env.NEXT_PUBLIC_USE_TAX_AI_PROXY !== 'false'
        const apiUrl = useProxy
          ? '/api/tax-ai'  // Use Next.js proxy route
          : `${backendUrl}/agents/tax-agent/runs`  // Call backend directly

        const formData = new FormData()
        formData.append('message', input)
        formData.append('stream', 'true')
        if (taxData) {
          formData.append('tax_data', JSON.stringify(taxData))
        }

        await streamResponse({
          apiUrl,
          requestBody: formData,
          onChunk: (chunk: Record<string, unknown>) => {
            // Handle different event types from OS backend
            const event = chunk.event as string

            if (event === 'RunContent' || event === 'TeamRunContent') {
              setMessages((prevMessages) => {
                const newMessages = [...prevMessages]
                const lastMessage = newMessages[newMessages.length - 1]
                if (
                  lastMessage &&
                  lastMessage.role === 'assistant' &&
                  typeof chunk.content === 'string'
                ) {
                  // Only append new content (avoid duplicates)
                  const uniqueContent = chunk.content.replace(lastContent, '')
                  lastMessage.content += uniqueContent
                  lastContent = chunk.content
                }
                return newMessages
              })
            } else if (event === 'RunCompleted' || event === 'TeamRunCompleted') {
              setMessages((prevMessages) => {
                const newMessages = prevMessages.map((message, index) => {
                  if (
                    index === prevMessages.length - 1 &&
                    message.role === 'assistant'
                  ) {
                    let updatedContent: string
                    if (typeof chunk.content === 'string') {
                      updatedContent = chunk.content
                    } else {
                      try {
                        updatedContent = JSON.stringify(chunk.content)
                      } catch {
                        updatedContent = 'Error parsing response'
                      }
                    }
                    return {
                      ...message,
                      content: updatedContent
                    }
                  }
                  return message
                })
                return newMessages
              })
            } else if (event === 'RunError' || event === 'TeamRunError') {
              setError(
                (chunk.content as string) || 'Error during run'
              )
              setMessages((prevMessages) => {
                const newMessages = [...prevMessages]
                const lastMessage = newMessages[newMessages.length - 1]
                if (lastMessage && lastMessage.role === 'assistant') {
                  lastMessage.content = 'Error: ' + ((chunk.content as string) || 'Unknown error')
                }
                return newMessages
              })
            }
          },
          onError: (error) => {
            setError(error.message)
            setMessages((prevMessages) => {
              const newMessages = [...prevMessages]
              const lastMessage = newMessages[newMessages.length - 1]
              if (lastMessage && lastMessage.role === 'assistant') {
                lastMessage.content = `Error: ${error.message}`
              }
              return newMessages
            })
          },
          onComplete: () => {
            setIsStreaming(false)
          }
        })
      } catch (error) {
        setError(error instanceof Error ? error.message : String(error))
        setIsStreaming(false)
      }
    },
    [streamResponse, setMessages, setIsStreaming, setError, taxData, backendUrl]
  )

  return { handleStreamResponse }
}

export default useTaxAIStreamHandler
