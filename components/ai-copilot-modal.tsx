'use client'

import { useState, useEffect, useRef } from 'react'
import { Sparkles, Send, X, Bot, User, Key, Check, AlertCircle, RefreshCw, ChevronRight } from 'lucide-react'
import type { CopilotResponse } from '@/lib/ai-provider'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  providerUsed?: 'gemini' | 'openai' | 'fallback'
  model?: string
  suggestedActions?: string[]
}

const DEFAULT_PROMPT_CHIPS = [
  'Why is Whitefield ranked #1 urgency (88)?',
  'Connect the signals behind the Chiller 2 thermal spike',
  'How do we reduce dairy spoilage by 25%?',
  'What should the Whitefield manager do at 08:30 AM?',
]

export default function AiCopilotModal({
  isOpen,
  onClose,
  initialPrompt,
  onSelectAction,
}: {
  isOpen: boolean
  onClose: () => void
  initialPrompt?: string
  onSelectAction?: (actionText: string) => void
}) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content:
        '👋 Welcome to **GrocerAI Real-Time Operations Copilot**!\n\nI connect cross-domain operational telemetry (procurement orders, rainfall radar, algorithmic markdown triggers, and cold-chain IoT sensors) to explain root causes and recommend actionable interventions.\n\nYou can also plug in your **Google Gemini** or **OpenAI** API key below for live cloud reasoning.',
      providerUsed: 'fallback',
      model: 'grocerAI-decision-kernel-v2',
      suggestedActions: [
        'Diagnose Whitefield critical hazards',
        'Analyze 14-day network wastage',
        'Verify Chiller 2 IoT status',
      ],
    },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [showKeySettings, setShowKeySettings] = useState(false)
  const [apiKey, setApiKey] = useState('')
  const [provider, setProvider] = useState<'gemini' | 'openai'>('gemini')
  const [savedNotice, setSavedNotice] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const storedKey = localStorage.getItem('grocerai_api_key')
    const storedProvider = localStorage.getItem('grocerai_provider') as 'gemini' | 'openai' | null
    if (storedKey) setApiKey(storedKey)
    if (storedProvider) setProvider(storedProvider)
  }, [])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  useEffect(() => {
    if (initialPrompt && isOpen) {
      handleSend(initialPrompt)
    }
  }, [initialPrompt, isOpen])

  const saveSettings = () => {
    if (apiKey) {
      localStorage.setItem('grocerai_api_key', apiKey.trim())
    } else {
      localStorage.removeItem('grocerai_api_key')
    }
    localStorage.setItem('grocerai_provider', provider)
    setSavedNotice(true)
    setTimeout(() => {
      setSavedNotice(false)
      setShowKeySettings(false)
    }, 1200)
  }

  const handleSend = async (textToSend?: string) => {
    const query = (textToSend || input).trim()
    if (!query || loading) return

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: query,
    }

    setMessages((prev) => [...prev, userMsg])
    if (!textToSend) setInput('')
    setLoading(true)

    try {
      const res = await fetch('/api/ai/copilot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: query,
          apiKey: apiKey.trim() || undefined,
          provider,
          contextType: 'operations',
        }),
      })

      if (!res.ok) {
        throw new Error('Failed to fetch AI response')
      }

      const data: CopilotResponse = await res.json()

      const assistantMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.answer,
        providerUsed: data.providerUsed,
        model: data.model,
        suggestedActions: data.suggestedActions,
      }

      setMessages((prev) => [...prev, assistantMsg])
    } catch (err: any) {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: `⚠️ Error contacting AI: ${err.message}. Please check your connection or API key.`,
          providerUsed: 'fallback',
        },
      ])
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end bg-black/40 backdrop-blur-xs transition-opacity">
      <div className="flex h-full w-full max-w-[540px] flex-col border-l border-[#d8e6d2] bg-[#fbfdfa] shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#e1ede0] bg-white px-5 py-4">
          <div className="flex items-center gap-2.5">
            <div className="flex size-9 items-center justify-center rounded-xl bg-[#164e3b] text-white shadow-xs">
              <Sparkles className="size-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-[15px] font-bold text-[#143d31]">GrocerAI Copilot</h3>
                <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[9px] font-bold text-emerald-800">
                  REAL-TIME
                </span>
              </div>
              <p className="text-[11px] text-muted-foreground">Connected cross-signal retail intelligence</p>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setShowKeySettings(!showKeySettings)}
              className="flex items-center gap-1.5 rounded-lg border border-border/80 px-2.5 py-1 text-[11px] font-semibold text-[#1e5843] hover:bg-[#edf5e9]"
              title="Configure Gemini or OpenAI API Key"
            >
              <Key className="size-3.5" />
              <span>{apiKey ? 'Key Connected' : 'Plugin Key'}</span>
            </button>
            <button
              onClick={onClose}
              className="rounded-lg p-1.5 text-muted-foreground hover:bg-slate-100 hover:text-foreground"
            >
              <X className="size-5" />
            </button>
          </div>
        </div>

        {/* API Key Modal / Drawer Bar */}
        {showKeySettings && (
          <div className="border-b border-[#d8e6d2] bg-[#eef7ec] p-4 text-xs">
            <div className="flex items-center justify-between font-bold text-[#143d31]">
              <span className="flex items-center gap-1.5">
                <Key className="size-4 text-[#267e58]" /> Connect Live Cloud LLM
              </span>
              <span className="text-[10px] text-muted-foreground font-normal">Optional</span>
            </div>
            <p className="mt-1 text-[11px] leading-4 text-[#2f5c4a]">
              Paste your free **Google Gemini** or **OpenAI** API key to enable live generation. If left empty, GrocerAI automatically uses our high-speed local operational decision engine.
            </p>
            <div className="mt-3 grid grid-cols-2 gap-2">
              <button
                onClick={() => setProvider('gemini')}
                className={`rounded-lg py-1.5 text-[11px] font-bold transition-colors ${
                  provider === 'gemini'
                    ? 'bg-[#164e3b] text-white'
                    : 'border border-border/80 bg-white text-muted-foreground'
                }`}
              >
                Google Gemini (Recommended)
              </button>
              <button
                onClick={() => setProvider('openai')}
                className={`rounded-lg py-1.5 text-[11px] font-bold transition-colors ${
                  provider === 'openai'
                    ? 'bg-[#164e3b] text-white'
                    : 'border border-border/80 bg-white text-muted-foreground'
                }`}
              >
                OpenAI (GPT-4o)
              </button>
            </div>
            <div className="mt-2.5 flex gap-2">
              <input
                type="password"
                placeholder={provider === 'gemini' ? 'AIzaSy... (Gemini API Key)' : 'sk-... (OpenAI API Key)'}
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="flex-1 rounded-xl border border-border/90 bg-white px-3 py-1.5 text-xs outline-none focus:border-[#267e58]"
              />
              <button
                onClick={saveSettings}
                className="rounded-xl bg-[#164e3b] px-3.5 py-1.5 font-bold text-white hover:bg-[#124031]"
              >
                {savedNotice ? <Check className="size-4 text-emerald-300" /> : 'Save'}
              </button>
            </div>
          </div>
        )}

        {/* Messages List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex gap-3 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {m.role === 'assistant' && (
                <div className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-[#dcefd5] text-[#164e3b]">
                  <Bot className="size-4" />
                </div>
              )}
              <div
                className={`max-w-[85%] rounded-2xl p-3.5 text-xs leading-5 shadow-2xs ${
                  m.role === 'user'
                    ? 'bg-[#164e3b] text-white font-medium rounded-br-xs'
                    : 'bg-white border border-[#e1ede0] text-slate-800 rounded-bl-xs'
                }`}
              >
                {m.role === 'assistant' && m.model && (
                  <div className="mb-2 flex items-center justify-between gap-2 border-b border-slate-100 pb-1.5">
                    <span className="text-[10px] font-bold text-[#23684d]">
                      {m.providerUsed === 'gemini'
                        ? '⚡ Live Google Gemini 1.5 Flash'
                        : m.providerUsed === 'openai'
                          ? '⚡ Live OpenAI GPT-4o'
                          : '⚡ GrocerAI Neural Reasoning'}
                    </span>
                    <span className="rounded-md bg-slate-100 px-1.5 py-0.5 text-[9px] font-semibold text-slate-500">
                      {m.model}
                    </span>
                  </div>
                )}

                <div className="whitespace-pre-wrap">{m.content}</div>

                {m.suggestedActions && m.suggestedActions.length > 0 && (
                  <div className="mt-3 pt-2.5 border-t border-slate-100 space-y-1.5">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                      Action Recommendations:
                    </p>
                    <div className="flex flex-col gap-1">
                      {m.suggestedActions.map((action, i) => (
                        <button
                          key={i}
                          onClick={() => {
                            if (onSelectAction) onSelectAction(action)
                            handleSend(`Execute recommendation: "${action}"`)
                          }}
                          className="flex items-center justify-between rounded-lg bg-[#f2f8ef] px-2.5 py-1.5 text-left text-[11px] font-semibold text-[#1a553f] hover:bg-[#e4f2de] transition-colors"
                        >
                          <span>{action}</span>
                          <ChevronRight className="size-3 text-muted-foreground" />
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              {m.role === 'user' && (
                <div className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-slate-200 text-slate-700">
                  <User className="size-4" />
                </div>
              )}
            </div>
          ))}

          {loading && (
            <div className="flex gap-3 justify-start">
              <div className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-[#dcefd5] text-[#164e3b]">
                <Bot className="size-4" />
              </div>
              <div className="rounded-2xl rounded-bl-xs border border-[#e1ede0] bg-white p-3.5 text-xs text-muted-foreground flex items-center gap-2">
                <RefreshCw className="size-3.5 animate-spin text-[#164e3b]" />
                <span>Synthesizing multi-signal causality & predicting outcomes...</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Prompt Chips */}
        <div className="border-t border-[#e1ede0] bg-white/70 p-2.5">
          <p className="px-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
            Suggested Operational Inquiries:
          </p>
          <div className="mt-1.5 flex gap-1.5 overflow-x-auto pb-1">
            {DEFAULT_PROMPT_CHIPS.map((chip) => (
              <button
                key={chip}
                onClick={() => handleSend(chip)}
                className="whitespace-nowrap rounded-lg border border-[#d8e6d2] bg-white px-2.5 py-1 text-[10px] font-medium text-[#25614a] hover:bg-[#eef7ec] transition-colors"
              >
                {chip}
              </button>
            ))}
          </div>
        </div>

        {/* Input Bar */}
        <div className="border-t border-[#e1ede0] bg-white p-3">
          <form
            onSubmit={(e) => {
              e.preventDefault()
              handleSend()
            }}
            className="flex items-center gap-2"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask anything about stores, spoilage, or action simulations..."
              className="flex-1 rounded-xl border border-border/80 bg-[#f7faf5] px-3.5 py-2.5 text-xs outline-none focus:border-[#164e3b] focus:bg-white transition-colors"
            />
            <button
              type="submit"
              disabled={!input.trim() || loading}
              className="flex size-9 items-center justify-center rounded-xl bg-[#164e3b] text-white hover:bg-[#124031] disabled:opacity-40 transition-opacity"
            >
              <Send className="size-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
