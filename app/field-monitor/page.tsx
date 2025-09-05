"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Switch } from "@/components/ui/switch"
import {
  Satellite,
  Thermometer,
  Droplets,
  Zap,
  Wind,
  Eye,
  AlertTriangle,
  TrendingUp,
  Calendar,
  MapPin,
  Activity,
  Layers,
  RefreshCw,
} from "lucide-react"
import FieldMap from "@/components/field-map"

export default function FieldMonitorPage() {
  const [lastUpdated, setLastUpdated] = useState(new Date())
  const [autoRefresh, setAutoRefresh] = useState(true)

  const refreshData = () => {
    setLastUpdated(new Date())
  }

  const fieldData = [
    {
      id: "F-001",
      name: "North Field - Wheat",
      area: "12.5 acres",
      health: 85,
      moisture: 32,
      temperature: 28,
      ph: 6.8,
      status: "Healthy",
      lastIrrigation: "2 days ago",
      nextIrrigation: "Tomorrow",
    },
    {
      id: "F-002",
      name: "South Field - Rice",
      area: "8.3 acres",
      health: 92,
      moisture: 45,
      temperature: 26,
      ph: 7.2,
      status: "Excellent",
      lastIrrigation: "1 day ago",
      nextIrrigation: "3 days",
    },
    {
      id: "F-003",
      name: "East Field - Cotton",
      area: "15.2 acres",
      health: 68,
      moisture: 18,
      temperature: 31,
      ph: 6.5,
      status: "Needs Attention",
      lastIrrigation: "5 days ago",
      nextIrrigation: "Overdue",
    },
  ]

  const alerts = [
    { id: 1, type: "warning", message: "East Field moisture below optimal", time: "2 hours ago", field: "F-003" },
    { id: 2, type: "info", message: "Weather forecast: Rain expected tomorrow", time: "4 hours ago", field: "All" },
    { id: 3, type: "critical", message: "Sensor S-7 offline", time: "6 hours ago", field: "F-001" },
  ]

  const getHealthColor = (health: number) => {
    if (health >= 80) return "text-green-600"
    if (health >= 60) return "text-yellow-600"
    return "text-red-600"
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Excellent":
        return "bg-green-100 text-green-800"
      case "Healthy":
        return "bg-blue-100 text-blue-800"
      case "Needs Attention":
        return "bg-red-800 text-white"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-6">
      <header className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div>
          <h1 className="text-2xl font-semibold">Field Monitoring</h1>
          <p className="text-sm text-muted-foreground">
            Real-time satellite imagery and sensor data • Last updated: {lastUpdated.toLocaleTimeString()}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Switch checked={autoRefresh} onCheckedChange={setAutoRefresh} />
            <span className="text-sm">Auto-refresh</span>
          </div>
          <Button variant="outline" size="sm" onClick={refreshData}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Badge className="bg-green-100 text-green-800">
            <Activity className="h-3 w-3 mr-1" />
            Live Data
          </Badge>
        </div>
      </header>

      <div className="grid gap-6 lg:grid-cols-[1fr_400px]">
        <div className="space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Satellite className="h-5 w-5" />
                Interactive Field Map
              </CardTitle>
              <Badge variant="secondary" className="flex items-center gap-1">
                <Layers className="h-3 w-3" />
                Multi-layer View
              </Badge>
            </CardHeader>
            <CardContent>
              <FieldMap />
              <div className="mt-4 flex flex-wrap gap-2">
                <Badge variant="outline" className="text-xs">
                  <div className="h-2 w-2 bg-green-500 rounded-full mr-1"></div>
                  Healthy Fields
                </Badge>
                <Badge variant="outline" className="text-xs">
                  <div className="h-2 w-2 bg-yellow-500 rounded-full mr-1"></div>
                  Moderate Risk
                </Badge>
                <Badge variant="outline" className="text-xs">
                  <div className="h-2 w-2 bg-red-500 rounded-full mr-1"></div>
                  Needs Attention
                </Badge>
                <Badge variant="outline" className="text-xs">
                  <div className="h-2 w-2 bg-blue-500 rounded-full mr-1"></div>
                  Sensors Active
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Field Analytics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="overview">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="health">Health</TabsTrigger>
                  <TabsTrigger value="irrigation">Irrigation</TabsTrigger>
                  <TabsTrigger value="weather">Weather</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="mt-4">
                  <div className="grid gap-4 md:grid-cols-3">
                    {fieldData.map((field) => (
                      <Card key={field.id} className="border-l-4 border-l-primary">
                        <CardHeader className="pb-2">
                          <div className="flex items-center justify-between">
                            <CardTitle className="text-sm">{field.name}</CardTitle>
                            <Badge className={getStatusColor(field.status)} variant="secondary">
                              {field.status}
                            </Badge>
                          </div>
                          <p className="text-xs text-muted-foreground">{field.area}</p>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span>Health Score</span>
                              <span className={`font-medium ${getHealthColor(field.health)}`}>{field.health}%</span>
                            </div>
                            <Progress value={field.health} className="h-2" />
                          </div>
                          <div className="grid grid-cols-2 gap-2 text-xs">
                            <div className="flex items-center gap-1">
                              <Droplets className="h-3 w-3 text-blue-500" />
                              <span>{field.moisture}%</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Thermometer className="h-3 w-3 text-red-500" />
                              <span>{field.temperature}°C</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="health" className="mt-4">
                  <div className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm">NDVI Trends</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="h-32 bg-muted rounded flex items-center justify-center text-sm text-muted-foreground">
                            NDVI Chart Visualization
                          </div>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm">Stress Indicators</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Water Stress</span>
                            <Badge variant="secondary" className="text-xs">
                              Low
                            </Badge>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Nutrient Deficiency</span>
                            <Badge variant="secondary" className="text-xs">
                              Moderate
                            </Badge>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Pest Pressure</span>
                            <Badge variant="secondary" className="text-xs">
                              Low
                            </Badge>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="irrigation" className="mt-4">
                  <div className="space-y-4">
                    {fieldData.map((field) => (
                      <Card key={field.id}>
                        <CardContent className="pt-4">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium">{field.name}</h4>
                            <Badge variant={field.nextIrrigation === "Overdue" ? "destructive" : "secondary"}>
                              {field.nextIrrigation === "Overdue" ? "Overdue" : `Next: ${field.nextIrrigation}`}
                            </Badge>
                          </div>
                          <div className="grid grid-cols-3 gap-4 text-sm">
                            <div>
                              <p className="text-muted-foreground">Soil Moisture</p>
                              <p className="font-medium">{field.moisture}%</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">Last Irrigation</p>
                              <p className="font-medium">{field.lastIrrigation}</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">pH Level</p>
                              <p className="font-medium">{field.ph}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="weather" className="mt-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm flex items-center gap-2">
                          <Wind className="h-4 w-4" />
                          Current Conditions
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm">Temperature</span>
                          <span className="font-medium">29°C</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Humidity</span>
                          <span className="font-medium">68%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Wind Speed</span>
                          <span className="font-medium">12 km/h</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">UV Index</span>
                          <span className="font-medium">7 (High)</span>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          7-Day Forecast
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span>Today</span>
                            <span>29°C / 18°C ☀️</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Tomorrow</span>
                            <span>26°C / 16°C 🌧️</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Wednesday</span>
                            <span>28°C / 17°C ⛅</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        <aside className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                Active Alerts
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {alerts.map((alert) => (
                <div key={alert.id} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                  {alert.type === "critical" && <AlertTriangle className="h-4 w-4 text-red-500 mt-0.5" />}
                  {alert.type === "warning" && <AlertTriangle className="h-4 w-4 text-yellow-500 mt-0.5" />}
                  {alert.type === "info" && <Eye className="h-4 w-4 text-blue-500 mt-0.5" />}
                  <div className="flex-1">
                    <p className="text-sm font-medium">{alert.message}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-muted-foreground">{alert.time}</span>
                      <Badge variant="outline" className="text-xs">
                        {alert.field}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5" />
                Sensor Status
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { id: "S-001", type: "Soil Moisture", status: "Online", battery: 85, field: "North Field" },
                { id: "S-002", type: "Temperature", status: "Online", battery: 92, field: "South Field" },
                { id: "S-003", type: "pH Sensor", status: "Online", battery: 78, field: "East Field" },
                { id: "S-004", type: "Weather Station", status: "Offline", battery: 0, field: "Central" },
              ].map((sensor) => (
                <div key={sensor.id} className="flex items-center justify-between p-2 rounded border">
                  <div>
                    <p className="text-sm font-medium">{sensor.id}</p>
                    <p className="text-xs text-muted-foreground">{sensor.type}</p>
                  </div>
                  <div className="text-right">
                    <Badge
                      variant={sensor.status === "Online" ? "default" : "destructive"}
                      className="text-xs mb-1 bg-red-800 text-white"
                    >
                      {sensor.status}
                    </Badge>
                    <p className="text-xs text-muted-foreground">Battery: {sensor.battery}%</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start bg-transparent" size="sm">
                <Droplets className="h-4 w-4 mr-2" />
                Schedule Irrigation
              </Button>
              <Button variant="outline" className="w-full justify-start bg-transparent" size="sm">
                <Eye className="h-4 w-4 mr-2" />
                Generate Report
              </Button>
              <Button variant="outline" className="w-full justify-start bg-transparent" size="sm">
                <Satellite className="h-4 w-4 mr-2" />
                Request Satellite Scan
              </Button>
              <Button variant="outline" className="w-full justify-start bg-transparent" size="sm">
                <AlertTriangle className="h-4 w-4 mr-2" />
                Set Custom Alert
              </Button>
            </CardContent>
          </Card>
        </aside>
      </div>
    </section>
  )
}
