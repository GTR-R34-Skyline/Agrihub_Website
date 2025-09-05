"use client"

import { useState } from "react"
import { Line, LineChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const data = [
  { date: "Apr", ndvi: 0.42, field1: 0.38, field2: 0.45, field3: 0.41 },
  { date: "May", ndvi: 0.48, field1: 0.44, field2: 0.52, field3: 0.47 },
  { date: "Jun", ndvi: 0.55, field1: 0.51, field2: 0.58, field3: 0.56 },
  { date: "Jul", ndvi: 0.61, field1: 0.58, field2: 0.65, field3: 0.6 },
  { date: "Aug", ndvi: 0.58, field1: 0.55, field2: 0.62, field3: 0.57 },
  { date: "Sep", ndvi: 0.64, field1: 0.61, field2: 0.68, field3: 0.63 },
]

export default function CropHealthChart() {
  const [selectedField, setSelectedField] = useState("all")

  const getDataKey = () => {
    switch (selectedField) {
      case "field1":
        return "field1"
      case "field2":
        return "field2"
      case "field3":
        return "field3"
      default:
        return "ndvi"
    }
  }

  const getFieldName = () => {
    switch (selectedField) {
      case "field1":
        return "Field 1 (Wheat)"
      case "field2":
        return "Field 2 (Rice)"
      case "field3":
        return "Field 3 (Cotton)"
      default:
        return "All Fields Average"
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Crop Health (NDVI)</CardTitle>
          <Badge variant="secondary" className="text-xs">
            <div className="h-2 w-2 bg-green-500 rounded-full mr-1 animate-pulse"></div>
            Live Data
          </Badge>
        </div>
        <div className="flex gap-2 mt-2">
          <Button
            variant={selectedField === "all" ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedField("all")}
          >
            All Fields
          </Button>
          <Button
            variant={selectedField === "field1" ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedField("field1")}
          >
            Field 1
          </Button>
          <Button
            variant={selectedField === "field2" ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedField("field2")}
          >
            Field 2
          </Button>
          <Button
            variant={selectedField === "field3" ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedField("field3")}
          >
            Field 3
          </Button>
        </div>
        <p className="text-sm text-muted-foreground">{getFieldName()}</p>
      </CardHeader>
      <CardContent>
        <ChartContainer
          className="h-[260px]"
          config={{
            ndvi: { label: "NDVI", color: "hsl(var(--chart-1))" },
            field1: { label: "Field 1", color: "hsl(var(--chart-2))" },
            field2: { label: "Field 2", color: "hsl(var(--chart-3))" },
            field3: { label: "Field 3", color: "hsl(var(--chart-4))" },
          }}
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ left: 12, right: 12 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis domain={[0, 1]} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Line
                type="monotone"
                dataKey={getDataKey()}
                name={getFieldName()}
                stroke={`var(--color-${getDataKey()})`}
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
