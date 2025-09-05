"use client"

import { useState } from "react"
import { Bar, BarChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Cloud, Sun, CloudRain } from "lucide-react"

const weather = [
  { day: "Mon", rain: 4, temp: 28, humidity: 65, condition: "cloudy" },
  { day: "Tue", rain: 0, temp: 32, humidity: 45, condition: "sunny" },
  { day: "Wed", rain: 2, temp: 29, humidity: 58, condition: "cloudy" },
  { day: "Thu", rain: 10, temp: 25, humidity: 78, condition: "rainy" },
  { day: "Fri", rain: 1, temp: 30, humidity: 52, condition: "sunny" },
  { day: "Sat", rain: 0, temp: 33, humidity: 42, condition: "sunny" },
  { day: "Sun", rain: 6, temp: 27, humidity: 72, condition: "rainy" },
]

export default function WeatherChart() {
  const [viewMode, setViewMode] = useState<"rain" | "temp" | "humidity">("rain")

  const getDataKey = () => viewMode
  const getTitle = () => {
    switch (viewMode) {
      case "rain":
        return "Weekly Rainfall (mm)"
      case "temp":
        return "Weekly Temperature (°C)"
      case "humidity":
        return "Weekly Humidity (%)"
    }
  }

  const getWeatherIcon = (condition: string) => {
    switch (condition) {
      case "sunny":
        return <Sun className="h-4 w-4 text-yellow-500" />
      case "cloudy":
        return <Cloud className="h-4 w-4 text-gray-500" />
      case "rainy":
        return <CloudRain className="h-4 w-4 text-blue-500" />
      default:
        return <Sun className="h-4 w-4" />
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>{getTitle()}</CardTitle>
          <Badge variant="secondary" className="text-xs">
            7-Day Forecast
          </Badge>
        </div>
        <div className="flex gap-2 mt-2">
          <Button variant={viewMode === "rain" ? "default" : "outline"} size="sm" onClick={() => setViewMode("rain")}>
            Rainfall
          </Button>
          <Button variant={viewMode === "temp" ? "default" : "outline"} size="sm" onClick={() => setViewMode("temp")}>
            Temperature
          </Button>
          <Button
            variant={viewMode === "humidity" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode("humidity")}
          >
            Humidity
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[260px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={weather} margin={{ left: 12, right: 12 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload
                    return (
                      <div className="bg-background border rounded-lg p-3 shadow-lg">
                        <div className="flex items-center gap-2 mb-2">
                          {getWeatherIcon(data.condition)}
                          <span className="font-medium">{label}</span>
                        </div>
                        <p className="text-sm">Rainfall: {data.rain}mm</p>
                        <p className="text-sm">Temperature: {data.temp}°C</p>
                        <p className="text-sm">Humidity: {data.humidity}%</p>
                      </div>
                    )
                  }
                  return null
                }}
              />
              <Bar
                dataKey={getDataKey()}
                fill={
                  viewMode === "rain"
                    ? "hsl(var(--chart-1))"
                    : viewMode === "temp"
                      ? "hsl(var(--chart-3))"
                      : "hsl(var(--chart-2))"
                }
                radius={4}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 grid grid-cols-7 gap-2">
          {weather.map((day) => (
            <div key={day.day} className="text-center">
              <div className="flex justify-center mb-1">{getWeatherIcon(day.condition)}</div>
              <p className="text-xs text-muted-foreground">{day.day}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
