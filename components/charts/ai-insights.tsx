"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Brain, TrendingUp, Droplets, Bug, RefreshCw } from "lucide-react"

export default function AIInsights() {
  const [refreshing, setRefreshing] = useState(false)
  const [insights] = useState([
    {
      title: "Pest Risk: Low",
      detail: "No significant pest pressure detected this week. Continue monitoring.",
      tone: "good",
      icon: Bug,
      confidence: 94,
    },
    {
      title: "Irrigation Recommendation",
      detail: "Apply 12–18 mm over next 48 hours for optimal soil moisture in Fields 1-3.",
      tone: "neutral",
      icon: Droplets,
      confidence: 87,
    },
    {
      title: "Yield Projection",
      detail: "Expected +6% yield increase vs last season based on current NDVI trends.",
      tone: "good",
      icon: TrendingUp,
      confidence: 91,
    },
  ])

  const refreshInsights = async () => {
    setRefreshing(true)
    // Simulate API call
    setTimeout(() => setRefreshing(false), 2000)
  }

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return "text-green-600"
    if (confidence >= 80) return "text-yellow-600"
    return "text-red-600"
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5" />
            AI Insights
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={refreshInsights} disabled={refreshing}>
            <RefreshCw className={`h-4 w-4 ${refreshing ? "animate-spin" : ""}`} />
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="text-xs">
            <div className="h-2 w-2 bg-green-500 rounded-full mr-1 animate-pulse"></div>
            AI Active
          </Badge>
          <span className="text-xs text-muted-foreground">Last analysis: 5 min ago</span>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {insights.map((insight, i) => {
          const IconComponent = insight.icon
          return (
            <div key={i} className="rounded-md border p-3 hover:bg-muted/50 transition-colors cursor-pointer">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <IconComponent className="h-4 w-4 text-muted-foreground" />
                  <p className="font-medium">{insight.title}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-xs font-medium ${getConfidenceColor(insight.confidence)}`}>
                    {insight.confidence}%
                  </span>
                  <Badge variant="secondary" className={insight.tone === "good" ? "text-primary" : ""}>
                    AI
                  </Badge>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">{insight.detail}</p>
              <div className="mt-2 flex gap-2">
                <Button variant="ghost" size="sm" className="h-6 text-xs">
                  View Details
                </Button>
                <Button variant="ghost" size="sm" className="h-6 text-xs">
                  Apply Suggestion
                </Button>
              </div>
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}
