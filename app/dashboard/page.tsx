"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Bell, TrendingUp, AlertTriangle, CheckCircle, RefreshCw } from "lucide-react"
import CropHealthChart from "@/components/charts/crop-health-chart"
import WeatherChart from "@/components/charts/weather-chart"
import AIInsights from "@/components/charts/ai-insights"

export default function DashboardPage() {
  const [lastUpdated, setLastUpdated] = useState(new Date())
  const [notifications] = useState([
    { id: 1, message: "Field 3 requires irrigation", type: "warning", time: "2 hours ago" },
    { id: 2, message: "New market order received", type: "info", time: "4 hours ago" },
    { id: 3, message: "Weather alert: Heavy rain expected", type: "alert", time: "6 hours ago" },
  ])

  const refreshData = () => {
    setLastUpdated(new Date())
    // Simulate data refresh
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Dashboard</h1>
          <p className="text-sm text-muted-foreground">Last updated: {lastUpdated.toLocaleTimeString()}</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" onClick={refreshData}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <div className="relative">
            <Bell className="h-5 w-5 text-muted-foreground" />
            <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center text-xs">
              {notifications.length}
            </Badge>
          </div>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Recent Notifications
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {notifications.map((notification) => (
              <div key={notification.id} className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                {notification.type === "warning" && <AlertTriangle className="h-4 w-4 text-amber-500" />}
                {notification.type === "info" && <CheckCircle className="h-4 w-4 text-blue-500" />}
                {notification.type === "alert" && <AlertTriangle className="h-4 w-4 text-red-500" />}
                <div className="flex-1">
                  <p className="text-sm font-medium">{notification.message}</p>
                  <p className="text-xs text-muted-foreground">{notification.time}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Fields</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-amber-600">2 require attention</span>
            </p>
            <div className="mt-2 flex gap-1">
              <Badge variant="secondary" className="text-xs">
                Wheat: 5
              </Badge>
              <Badge variant="secondary" className="text-xs">
                Rice: 4
              </Badge>
              <Badge variant="secondary" className="text-xs">
                Cotton: 3
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Soil Moisture</CardTitle>
            <div className="h-2 w-8 bg-blue-200 rounded-full">
              <div className="h-2 w-3 bg-blue-500 rounded-full"></div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">32%</div>
            <p className="text-xs text-muted-foreground">Avg across fields</p>
            <div className="mt-2">
              <Badge variant={32 < 25 ? "destructive" : 32 > 60 ? "secondary" : "default"} className="text-xs">
                {32 < 25 ? "Low" : 32 > 60 ? "High" : "Optimal"}
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Market Orders</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">54</div>
            <p className="text-xs text-muted-foreground">Last 7 days</p>
            <div className="mt-2">
              <Badge className="text-xs bg-green-100 text-green-800">↗ +12% from last week</Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="md:col-span-2">
          <CropHealthChart />
        </div>
        <AIInsights />
      </div>

      <div>
        <WeatherChart />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 md:grid-cols-4">
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2 bg-transparent">
              <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                <TrendingUp className="h-4 w-4 text-blue-600" />
              </div>
              <span className="text-sm">View Analytics</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2 bg-transparent">
              <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                <CheckCircle className="h-4 w-4 text-green-600" />
              </div>
              <span className="text-sm">Schedule Irrigation</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2 bg-transparent">
              <div className="h-8 w-8 rounded-full bg-amber-100 flex items-center justify-center">
                <AlertTriangle className="h-4 w-4 text-amber-600" />
              </div>
              <span className="text-sm">Field Alerts</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2 bg-transparent">
              <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center">
                <Bell className="h-4 w-4 text-purple-600" />
              </div>
              <span className="text-sm">Market Updates</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
