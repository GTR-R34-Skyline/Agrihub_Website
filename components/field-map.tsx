"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

type Sensor = {
  id: string
  lat: number
  lng: number
  metric: string
  value: number
  unit: string
  status: "online" | "offline" | "warning"
  batteryLevel: number
  lastUpdate: string
}

type Field = {
  id: string
  name: string
  coordinates: [number, number][]
  health: number
  crop: string
  area: number
}

const sensors: Sensor[] = [
  {
    id: "S-001",
    lat: 19.997,
    lng: 73.789,
    metric: "Soil Moisture",
    value: 28,
    unit: "%",
    status: "online",
    batteryLevel: 85,
    lastUpdate: "2 min ago",
  },
  {
    id: "S-002",
    lat: 20.007,
    lng: 73.799,
    metric: "Soil Moisture",
    value: 36,
    unit: "%",
    status: "online",
    batteryLevel: 92,
    lastUpdate: "1 min ago",
  },
  {
    id: "S-003",
    lat: 19.987,
    lng: 73.779,
    metric: "pH Level",
    value: 6.8,
    unit: "",
    status: "warning",
    batteryLevel: 45,
    lastUpdate: "15 min ago",
  },
  {
    id: "S-004",
    lat: 20.012,
    lng: 73.785,
    metric: "Temperature",
    value: 28.5,
    unit: "°C",
    status: "online",
    batteryLevel: 78,
    lastUpdate: "30 sec ago",
  },
  {
    id: "S-005",
    lat: 19.992,
    lng: 73.795,
    metric: "NPK Sensor",
    value: 245,
    unit: "ppm",
    status: "offline",
    batteryLevel: 0,
    lastUpdate: "2 hours ago",
  },
]

const fields: Field[] = [
  {
    id: "F-001",
    name: "North Field - Wheat",
    coordinates: [
      [19.995, 73.785],
      [20.005, 73.785],
      [20.005, 73.795],
      [19.995, 73.795],
    ],
    health: 85,
    crop: "Wheat",
    area: 12.5,
  },
  {
    id: "F-002",
    name: "South Field - Rice",
    coordinates: [
      [19.985, 73.79],
      [19.995, 73.79],
      [19.995, 73.8],
      [19.985, 73.8],
    ],
    health: 92,
    crop: "Rice",
    area: 8.3,
  },
  {
    id: "F-003",
    name: "East Field - Cotton",
    coordinates: [
      [20.0, 73.8],
      [20.015, 73.8],
      [20.015, 73.81],
      [20.0, 73.81],
    ],
    health: 68,
    crop: "Cotton",
    area: 15.2,
  },
]

export default function FieldMap() {
  const [selectedSensor, setSelectedSensor] = useState<string | null>(null)
  const [showFields, setShowFields] = useState(true)
  const [showSensors, setShowSensors] = useState(true)
  const [showHeatmap, setShowHeatmap] = useState(false)
  const [mapLayer, setMapLayer] = useState<"streets" | "satellite" | "terrain">("satellite")

  const getSensorColor = (sensor: Sensor) => {
    switch (sensor.status) {
      case "online":
        return "bg-green-500"
      case "warning":
        return "bg-yellow-500"
      case "offline":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const getFieldColor = (health: number) => {
    if (health >= 80) return "border-green-500 bg-green-500/20"
    if (health >= 60) return "border-yellow-500 bg-yellow-500/20"
    return "border-red-500 bg-red-500/20"
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        <Button variant={showFields ? "default" : "outline"} size="sm" onClick={() => setShowFields(!showFields)}>
          Field Boundaries
        </Button>
        <Button variant={showSensors ? "default" : "outline"} size="sm" onClick={() => setShowSensors(!showSensors)}>
          Sensors
        </Button>
        <Button variant={showHeatmap ? "default" : "outline"} size="sm" onClick={() => setShowHeatmap(!showHeatmap)}>
          Health Heatmap
        </Button>
      </div>

      <div className="flex gap-2 mb-4">
        <Button
          variant={mapLayer === "streets" ? "default" : "outline"}
          size="sm"
          onClick={() => setMapLayer("streets")}
        >
          Streets
        </Button>
        <Button
          variant={mapLayer === "satellite" ? "default" : "outline"}
          size="sm"
          onClick={() => setMapLayer("satellite")}
        >
          Satellite
        </Button>
        <Button
          variant={mapLayer === "terrain" ? "default" : "outline"}
          size="sm"
          onClick={() => setMapLayer("terrain")}
        >
          Terrain
        </Button>
      </div>

      <div className="overflow-hidden rounded-lg border">
        <div
          className="h-[500px] w-full relative"
          style={{
            backgroundImage:
              mapLayer === "satellite"
                ? "url('/satellite-view-of-agricultural-fields-from-above.jpg')"
                : mapLayer === "terrain"
                  ? "url('/topographic-terrain-map-with-elevation-lines.jpg')"
                  : "url('/street-map-with-roads-and-landmarks.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          aria-label="Advanced field monitoring map"
        >
          {/* Map overlay with interactive elements */}
          <div className="absolute inset-0 bg-black/10">
            {/* Field boundaries */}
            {showFields &&
              fields.map((field, index) => (
                <div
                  key={field.id}
                  className={`absolute border-2 rounded ${getFieldColor(field.health)} cursor-pointer transition-all hover:bg-opacity-40`}
                  style={{
                    left: `${20 + index * 25}%`,
                    top: `${30 + index * 15}%`,
                    width: `${15 + index * 5}%`,
                    height: `${20 + index * 3}%`,
                  }}
                  onClick={() => {
                    alert(
                      `Field: ${field.name}\nCrop: ${field.crop}\nHealth: ${field.health}%\nArea: ${field.area} acres`,
                    )
                  }}
                >
                  <div className="absolute -top-6 left-0 text-xs font-medium text-white bg-black/70 px-2 py-1 rounded">
                    {field.name}
                  </div>
                </div>
              ))}

            {/* Sensor markers */}
            {showSensors &&
              sensors.map((sensor, index) => (
                <div
                  key={sensor.id}
                  className={`absolute w-4 h-4 rounded-full border-2 border-white cursor-pointer transition-all hover:scale-125 ${getSensorColor(sensor)} ${
                    selectedSensor === sensor.id ? "scale-150 ring-2 ring-white" : ""
                  }`}
                  style={{
                    left: `${25 + index * 20}%`,
                    top: `${40 + index * 10}%`,
                  }}
                  onClick={() => setSelectedSensor(sensor.id === selectedSensor ? null : sensor.id)}
                  title={`Sensor ${sensor.id} - ${sensor.metric}: ${sensor.value}${sensor.unit}`}
                />
              ))}

            {/* Legend */}
            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-3 rounded-lg shadow-lg">
              <h4 className="font-medium text-sm mb-2">Map Layers</h4>
              <div className="space-y-1 text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded"></div>
                  <span>Healthy Fields</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-yellow-500 rounded"></div>
                  <span>Moderate Risk</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded"></div>
                  <span>Needs Attention</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span>Active Sensors</span>
                </div>
              </div>
            </div>

            {/* Zoom controls */}
            <div className="absolute bottom-4 right-4 flex flex-col gap-1">
              <Button variant="secondary" size="sm" className="w-8 h-8 p-0">
                +
              </Button>
              <Button variant="secondary" size="sm" className="w-8 h-8 p-0">
                -
              </Button>
            </div>
          </div>
        </div>
      </div>

      {selectedSensor && (
        <div className="p-4 bg-muted rounded-lg">
          <h4 className="font-medium mb-2">Sensor {selectedSensor} - Real-time Data</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            {sensors
              .filter((s) => s.id === selectedSensor)
              .map((sensor) => (
                <div key={sensor.id} className="space-y-1">
                  <p className="text-muted-foreground">Current Reading</p>
                  <p className="text-xl font-bold text-primary">
                    {sensor.value}
                    {sensor.unit}
                  </p>
                  <p className="text-xs text-muted-foreground">Updated {sensor.lastUpdate}</p>
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span>Status:</span>
                      <Badge
                        variant="secondary"
                        className={`text-xs ${
                          sensor.status === "online"
                            ? "bg-green-100 text-green-800"
                            : sensor.status === "warning"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-800 text-white"
                        }`}
                      >
                        {sensor.status}
                      </Badge>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span>Battery:</span>
                      <span
                        className={`font-medium ${
                          sensor.batteryLevel > 50
                            ? "text-green-600"
                            : sensor.batteryLevel > 20
                              ? "text-yellow-600"
                              : "text-red-600"
                        }`}
                      >
                        {sensor.batteryLevel}%
                      </span>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  )
}
