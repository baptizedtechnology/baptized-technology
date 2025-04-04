"use client"

import { useState } from "react"
import { Search, Loader2, ChevronDown } from "lucide-react"
import { Input } from "@/components/ui/input"
import { ChatbotCard } from "@/components/chatbot-card"
import { LoginDialog } from "@/components/auth/login-dialog"
import { useAuth } from "@/components/auth/auth-provider"
import WaterBackground from "@/components/water-background"
import { chatbotConfigs } from "@/lib/chatbot/config";

const chatbots = Object.values(chatbotConfigs).map(config => ({
  title: config.title,
  description: config.description,
  icon: config.icon,
  category: config.category,
  href: `/chatbots/${config.id}`,
  gradient: config.gradient,
  iconColor: config.iconColor,
  comingSoon: config.comingSoon,
}));

export default function SolutionsPage() {
  const { user, loading } = useAuth()
  const [searchQuery, setSearchQuery] = useState("")

  const filteredChatbots = chatbots.filter(
    (chatbot) =>
      chatbot.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      chatbot.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      chatbot.category.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="container max-w-7xl py-12 sm:py-20">
      <WaterBackground/>
      <div className="space-y-2 text-center mb-8 sm:mb-16">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">Smart Tools for Curious Minds & Hungry Hearts</h1>
        <p className="text-muted-foreground text-base sm:text-lg">
          The best Christian thinkers, in your pocket—curated, summarized, and ready to explore.
        </p>
      </div>

      {/* Login prompt - hidden on mobile */}
      <div className="hidden sm:block">
        {loading ? (
          <div className="max-w-md mx-auto mb-8 p-4 bg-background/80 backdrop-blur-sm rounded-xl border border-border/50 shadow-lg">
            <div className="flex justify-center items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              <p className="text-sm text-muted-foreground">Checking authentication...</p>
            </div>
          </div>
        ) : !user ? (
          <div className="max-w-md mx-auto mb-8 p-4 bg-background/80 backdrop-blur-sm rounded-xl border border-border/50 shadow-lg">
            <div className="flex flex-col items-center text-center">
              <p className="text-sm text-muted-foreground mb-3">Want to save your chat history and preferences?</p>
              <LoginDialog />
            </div>
          </div>
        ) : (
          <div className="max-w-md mx-auto mb-8 p-4 bg-emerald-500/10 backdrop-blur-sm rounded-xl border border-emerald-500/20 shadow-lg">
            <div className="flex flex-col items-center text-center">
              <p className="text-sm text-muted-foreground">
                Logged in as {user.email}. Your chat history will be saved.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Search Bar */}
      <div className="relative max-w-md mx-auto mb-8 sm:mb-12">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5" />
          <Input
            type="search"
            placeholder="Search chatbots..."
            className="pl-12 h-12 bg-white/90 dark:bg-slate-900/90 focus:border-blue-500 focus:ring-blue-500/20"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Mobile scroll indicator */}
      <div className="sm:hidden flex flex-col items-center gap-2 mb-8">
        <p className="text-sm text-muted-foreground">Scroll down to see the chatbot lineup</p>
        <div className="animate-bounce rounded-full bg-background/80 backdrop-blur-sm p-2 shadow-xl">
          <ChevronDown className="h-6 w-6 text-primary" />
        </div>
      </div>

      {/* Grid of Chatbots */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredChatbots.map((chatbot) => (
          <ChatbotCard key={chatbot.title} {...chatbot} />
        ))}
      </div>
    </div>
  )
}