"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Search,
  ThumbsUp,
  ThumbsDown,
  MessageCircle,
  Eye,
  Clock,
  TrendingUp,
  Users,
  Award,
  Filter,
  Plus,
} from "lucide-react"

type Thread = {
  id: number
  title: string
  author: string
  authorRole: "Farmer" | "Expert" | "Buyer" | "Admin"
  tags: string[]
  content: string
  replies: number
  views: number
  upvotes: number
  downvotes: number
  timeAgo: string
  isAnswered: boolean
  category: string
}

const initialThreads: Thread[] = [
  {
    id: 1,
    title: "How to identify early blight in tomatoes?",
    author: "Ravi Kumar",
    authorRole: "Farmer",
    tags: ["Tomato", "Disease", "Diagnosis"],
    content:
      "I'm seeing brown spots with yellow halos on my tomato leaves. The spots are about 1cm in diameter and seem to be spreading. Is this early blight? What should I do?",
    replies: 12,
    views: 245,
    upvotes: 18,
    downvotes: 2,
    timeAgo: "2 hours ago",
    isAnswered: true,
    category: "Plant Health",
  },
  {
    id: 2,
    title: "Best irrigation schedule for sandy soil in wheat cultivation",
    author: "Dr. Elena Sharma",
    authorRole: "Expert",
    tags: ["Irrigation", "Soil", "Wheat"],
    content:
      "Looking for recommendations on irrigation frequency and duration for wheat in sandy loam soil. Current moisture retention is poor.",
    replies: 8,
    views: 156,
    upvotes: 24,
    downvotes: 0,
    timeAgo: "5 hours ago",
    isAnswered: true,
    category: "Irrigation",
  },
  {
    id: 3,
    title: "Fair market price for Grade A basmati rice?",
    author: "Amir Hassan",
    authorRole: "Buyer",
    tags: ["Pricing", "Rice", "Market"],
    content: "What's the current market rate for Grade A basmati in Karnal region? Looking to purchase 50 tons.",
    replies: 15,
    views: 389,
    upvotes: 12,
    downvotes: 1,
    timeAgo: "1 day ago",
    isAnswered: false,
    category: "Market Prices",
  },
  {
    id: 4,
    title: "Organic certification process - need guidance",
    author: "Priya Patel",
    authorRole: "Farmer",
    tags: ["Organic", "Certification", "Process"],
    content:
      "Starting organic farming transition. Can someone guide me through the certification process and timeline?",
    replies: 6,
    views: 123,
    upvotes: 9,
    downvotes: 0,
    timeAgo: "2 days ago",
    isAnswered: false,
    category: "Certification",
  },
]

const categories = [
  "All",
  "Plant Health",
  "Irrigation",
  "Market Prices",
  "Certification",
  "Equipment",
  "Seeds",
  "Weather",
]

export default function CommunityPage() {
  const [threads, setThreads] = useState<Thread[]>(initialThreads)
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("General")
  const [searchQuery, setSearchQuery] = useState("")
  const [filterCategory, setFilterCategory] = useState("All")
  const [sortBy, setSortBy] = useState("recent")
  const [activeTab, setActiveTab] = useState("all")

  function submitThread() {
    if (!title.trim()) return
    const newThread: Thread = {
      id: Date.now(),
      title,
      author: "You",
      authorRole: "Farmer",
      tags: [selectedCategory],
      content,
      replies: 0,
      views: 0,
      upvotes: 0,
      downvotes: 0,
      timeAgo: "Just now",
      isAnswered: false,
      category: selectedCategory,
    }
    setThreads([newThread, ...threads])
    setTitle("")
    setContent("")
  }

  function voteThread(threadId: number, voteType: "up" | "down") {
    setThreads(
      threads.map((thread) => {
        if (thread.id === threadId) {
          return {
            ...thread,
            upvotes: voteType === "up" ? thread.upvotes + 1 : thread.upvotes,
            downvotes: voteType === "down" ? thread.downvotes + 1 : thread.downvotes,
          }
        }
        return thread
      }),
    )
  }

  const filteredThreads = threads
    .filter((thread) => {
      const matchesSearch =
        thread.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        thread.content.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesCategory = filterCategory === "All" || thread.category === filterCategory
      const matchesTab =
        activeTab === "all" ||
        (activeTab === "answered" && thread.isAnswered) ||
        (activeTab === "unanswered" && !thread.isAnswered)
      return matchesSearch && matchesCategory && matchesTab
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "popular":
          return b.upvotes - b.downvotes - (a.upvotes - a.downvotes)
        case "views":
          return b.views - a.views
        case "replies":
          return b.replies - a.replies
        default:
          return b.id - a.id // recent first
      }
    })

  const getRoleColor = (role: string) => {
    switch (role) {
      case "Expert":
        return "bg-blue-100 text-blue-800"
      case "Admin":
        return "bg-purple-100 text-purple-800"
      case "Buyer":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "Expert":
        return <Award className="h-3 w-3" />
      case "Admin":
        return <Users className="h-3 w-3" />
      default:
        return null
    }
  }

  return (
    <section className="mx-auto max-w-6xl px-4 py-6">
      <header className="flex flex-wrap items-baseline justify-between gap-3 mb-6">
        <div>
          <h1 className="text-2xl font-semibold">Community Forum</h1>
          <p className="text-sm text-muted-foreground">Share knowledge, ask questions, and help others grow.</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="secondary">{threads.length} discussions</Badge>
          <Badge variant="secondary">{threads.reduce((acc, t) => acc + t.replies, 0)} replies</Badge>
        </div>
      </header>

      <div className="mb-6 space-y-4">
        <div className="flex flex-wrap gap-3">
          <div className="relative flex-1 min-w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search discussions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={filterCategory} onValueChange={setFilterCategory}>
            <SelectTrigger className="w-48">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="recent">Recent</SelectItem>
              <SelectItem value="popular">Popular</SelectItem>
              <SelectItem value="views">Most Viewed</SelectItem>
              <SelectItem value="replies">Most Replies</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        <div className="space-y-4">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="all">All Discussions</TabsTrigger>
              <TabsTrigger value="unanswered">Unanswered</TabsTrigger>
              <TabsTrigger value="answered">Answered</TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab} className="mt-4 space-y-3">
              {filteredThreads.map((thread) => (
                <Card key={thread.id} className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <CardTitle className="text-lg hover:text-primary transition-colors">{thread.title}</CardTitle>
                          {thread.isAnswered && (
                            <Badge className="bg-green-100 text-green-800 text-xs">✓ Answered</Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-3 text-sm text-muted-foreground">
                          <div className="flex items-center gap-2">
                            <Avatar className="h-6 w-6">
                              <AvatarImage
                                src={`/abstract-geometric-shapes.png?height=24&width=24&query=${encodeURIComponent(`${thread.author} profile photo`)}`}
                              />
                              <AvatarFallback>
                                {thread.author
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <span className="font-medium">{thread.author}</span>
                            <Badge className={`text-xs ${getRoleColor(thread.authorRole)}`}>
                              {getRoleIcon(thread.authorRole)}
                              <span className="ml-1">{thread.authorRole}</span>
                            </Badge>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {thread.timeAgo}
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        {thread.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{thread.content}</p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 px-2"
                            onClick={() => voteThread(thread.id, "up")}
                          >
                            <ThumbsUp className="h-3 w-3 mr-1" />
                            {thread.upvotes}
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 px-2"
                            onClick={() => voteThread(thread.id, "down")}
                          >
                            <ThumbsDown className="h-3 w-3 mr-1" />
                            {thread.downvotes}
                          </Button>
                        </div>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <MessageCircle className="h-3 w-3" />
                          {thread.replies} replies
                        </div>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Eye className="h-3 w-3" />
                          {thread.views} views
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        View Discussion
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
          </Tabs>
        </div>

        <aside className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Community Stats
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Total Discussions</span>
                <span className="font-medium">{threads.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Total Replies</span>
                <span className="font-medium">{threads.reduce((acc, t) => acc + t.replies, 0)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Active Today</span>
                <span className="font-medium">24</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Experts Online</span>
                <span className="font-medium text-green-600">12</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="h-5 w-5" />
                Start a Discussion
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2" htmlFor="title">
                  Title
                </label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Write a clear, descriptive title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2" htmlFor="category">
                  Category
                </label>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.slice(1).map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2" htmlFor="content">
                  Details
                </label>
                <Textarea
                  id="content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Include crop, location, and specific question"
                  rows={6}
                />
              </div>

              <Button
                onClick={submitThread}
                className="w-full bg-primary text-primary-foreground hover:opacity-90"
                aria-label="Post thread"
              >
                Post Discussion
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Top Contributors</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { name: "Dr. Suresh Patel", role: "Expert", points: 1250 },
                { name: "Rajesh Kumar", role: "Farmer", points: 890 },
                { name: "Priya Sharma", role: "Buyer", points: 650 },
              ].map((user, i) => (
                <div key={i} className="flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage
                      src={`/abstract-geometric-shapes.png?height=32&width=32&query=${encodeURIComponent(`${user.name} profile photo`)}`}
                    />
                    <AvatarFallback>
                      {user.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{user.name}</p>
                    <p className="text-xs text-muted-foreground">{user.role}</p>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {user.points} pts
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </aside>
      </div>
    </section>
  )
}
