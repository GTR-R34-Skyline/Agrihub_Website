"use client"

import { useState } from "react"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Star, MapPin, Calendar, Clock, Truck } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const produceItems = [
  { id: 1, name: "Organic Tomatoes", price: 180, unit: "kg", rating: 4.6, location: "Nashik, Maharashtra" },
  { id: 2, name: "Basmati Rice", price: 145, unit: "kg", rating: 4.8, location: "Karnal, Haryana" },
  { id: 3, name: "Arabica Coffee Beans", price: 680, unit: "kg", rating: 4.7, location: "Chikmagalur, Karnataka" },
  { id: 4, name: "Sunflower Seeds", price: 95, unit: "kg", rating: 4.3, location: "Rajkot, Gujarat" },
  { id: 5, name: "Yellow Maize", price: 72, unit: "kg", rating: 4.4, location: "Davangere, Karnataka" },
  { id: 6, name: "Mustard Oil (Cold Pressed)", price: 630, unit: "L", rating: 4.5, location: "Bharatpur, Rajasthan" },
]

const equipmentItems = [
  {
    id: 1,
    name: "John Deere Tractor 5050D",
    dailyRate: 2500,
    weeklyRate: 15000,
    monthlyRate: 45000,
    rating: 4.8,
    location: "Ludhiana, Punjab",
    availability: "Available",
    specifications: "50 HP, 4WD, Power Steering",
  },
  {
    id: 2,
    name: "Combine Harvester",
    dailyRate: 4000,
    weeklyRate: 25000,
    monthlyRate: 80000,
    rating: 4.6,
    location: "Hisar, Haryana",
    availability: "Available",
    specifications: "Self-propelled, 18ft cutting width",
  },
  {
    id: 3,
    name: "Rotary Tiller",
    dailyRate: 800,
    weeklyRate: 5000,
    monthlyRate: 18000,
    rating: 4.4,
    location: "Pune, Maharashtra",
    availability: "Booked until Dec 15",
    specifications: "6ft width, PTO driven",
  },
  {
    id: 4,
    name: "Seed Drill Machine",
    dailyRate: 1200,
    weeklyRate: 7500,
    monthlyRate: 25000,
    rating: 4.7,
    location: "Jaipur, Rajasthan",
    availability: "Available",
    specifications: "9-tyne, adjustable depth",
  },
  {
    id: 5,
    name: "Sprayer (Boom Type)",
    dailyRate: 1500,
    weeklyRate: 9000,
    monthlyRate: 30000,
    rating: 4.5,
    location: "Nashik, Maharashtra",
    availability: "Available",
    specifications: "500L tank, 12m boom width",
  },
  {
    id: 6,
    name: "Thresher Machine",
    dailyRate: 1800,
    weeklyRate: 11000,
    monthlyRate: 35000,
    rating: 4.3,
    location: "Meerut, Uttar Pradesh",
    availability: "Available",
    specifications: "Multi-crop, 8-10 HP required",
  },
]

function Stars({ value }: { value: number }) {
  const full = Math.floor(value)
  const half = value - full >= 0.5
  return (
    <div aria-label={`Rating ${value} out of 5`} className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => {
        const filled = i < full || (i === full && half)
        return (
          <Star key={i} className={filled ? "h-4 w-4 fill-current text-accent" : "h-4 w-4 text-muted-foreground"} />
        )
      })}
      <span className="ml-1 text-xs text-muted-foreground">{value.toFixed(1)}</span>
    </div>
  )
}

export default function MarketplacePage() {
  const [selectedRentalPeriod, setSelectedRentalPeriod] = useState<"daily" | "weekly" | "monthly">("daily")

  const getRentalPrice = (item: (typeof equipmentItems)[0]) => {
    switch (selectedRentalPeriod) {
      case "weekly":
        return item.weeklyRate
      case "monthly":
        return item.monthlyRate
      default:
        return item.dailyRate
    }
  }

  const getRentalUnit = () => {
    switch (selectedRentalPeriod) {
      case "weekly":
        return "week"
      case "monthly":
        return "month"
      default:
        return "day"
    }
  }

  return (
    <section className="mx-auto max-w-6xl px-4 py-6">
      <header className="flex flex-wrap items-baseline justify-between gap-3">
        <h1 className="text-2xl font-semibold">Marketplace</h1>
        <Badge className="bg-primary text-primary-foreground">Fresh Listings</Badge>
      </header>

      <Tabs defaultValue="produce" className="mt-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="produce" className="flex items-center gap-2">
            <Truck className="h-4 w-4" />
            Fresh Produce
          </TabsTrigger>
          <TabsTrigger value="equipment" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Equipment Rental
          </TabsTrigger>
        </TabsList>

        <TabsContent value="produce" className="mt-4">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {produceItems.map((item) => (
              <Card key={item.id} className="overflow-hidden">
                <div className="relative h-40 w-full">
                  <Image
                    src={`/abstract-geometric-shapes.png?height=160&width=300&query=${encodeURIComponent(`fresh ${item.name.toLowerCase()} agricultural product photo`)}`}
                    alt={item.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover"
                  />
                </div>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">{item.name}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="font-medium">
                      ₹{item.price} / {item.unit}
                    </p>
                    <Stars value={item.rating} />
                  </div>
                  <p className="flex items-center gap-1 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    {item.location}
                  </p>
                  <Button
                    className="w-full bg-primary text-primary-foreground hover:opacity-90"
                    aria-label={`Buy ${item.name}`}
                  >
                    View Details
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="equipment" className="mt-4">
          <div className="mb-4 flex items-center gap-3">
            <span className="text-sm font-medium">Rental Period:</span>
            <div className="flex gap-2">
              <Button
                variant={selectedRentalPeriod === "daily" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedRentalPeriod("daily")}
              >
                Daily
              </Button>
              <Button
                variant={selectedRentalPeriod === "weekly" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedRentalPeriod("weekly")}
              >
                Weekly
              </Button>
              <Button
                variant={selectedRentalPeriod === "monthly" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedRentalPeriod("monthly")}
              >
                Monthly
              </Button>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {equipmentItems.map((item) => (
              <Card key={item.id} className="overflow-hidden">
                <div className="relative h-40 w-full">
                  <Image
                    src={`/abstract-geometric-shapes.png?height=160&width=300&query=${encodeURIComponent(`${item.name.toLowerCase()} farming equipment agricultural machinery`)}`}
                    alt={item.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover"
                  />
                  <div className="absolute top-2 right-2">
                    <Badge
                      variant={item.availability === "Available" ? "default" : "secondary"}
                      className={item.availability === "Available" ? "bg-green-600 text-white" : ""}
                    >
                      {item.availability === "Available" ? "Available" : "Booked"}
                    </Badge>
                  </div>
                </div>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">{item.name}</CardTitle>
                  <p className="text-xs text-muted-foreground">{item.specifications}</p>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="font-medium">
                      ₹{getRentalPrice(item).toLocaleString()} / {getRentalUnit()}
                    </p>
                    <Stars value={item.rating} />
                  </div>
                  <p className="flex items-center gap-1 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    {item.location}
                  </p>
                  <div className="flex items-center gap-1 text-sm">
                    <Clock className="h-4 w-4" />
                    <span className={item.availability === "Available" ? "text-green-600" : "text-amber-600"}>
                      {item.availability}
                    </span>
                  </div>
                  <Button
                    className="w-full bg-primary text-primary-foreground hover:opacity-90"
                    disabled={item.availability !== "Available"}
                    aria-label={`Rent ${item.name}`}
                  >
                    {item.availability === "Available" ? "Book Now" : "View Details"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </section>
  )
}
