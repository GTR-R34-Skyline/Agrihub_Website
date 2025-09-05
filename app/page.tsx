import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import Image from "next/image"

export default function Page() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-10">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="text-balance text-3xl font-semibold md:text-5xl">Empowering Agriculture with AI & Community</h1>
        <p className="mt-4 text-muted-foreground">
          AgriHub connects farmers, agri-experts, and buyers to improve crop health, streamline trade, and share
          knowledge—built for both rural and urban professionals.
        </p>
        <div className="mt-6 flex items-center justify-center gap-3">
          <Link href="/dashboard">
            <Button
              className="bg-primary text-primary-foreground hover:opacity-90"
              size="lg"
              aria-label="Open Dashboard"
            >
              Open Dashboard
            </Button>
          </Link>
          <Link href="/marketplace">
            <Button variant="outline" size="lg" aria-label="Browse Marketplace">
              Browse Marketplace
            </Button>
          </Link>
        </div>
      </div>

      <div className="mt-12 relative h-64 w-full rounded-lg overflow-hidden">
        <Image src="/modern-smart-farming-with-ai-technology-and-green-.jpg" alt="Smart farming with AI technology" fill className="object-cover" />
      </div>

      <div className="mt-10 grid gap-4 md:grid-cols-3">
        <Card>
          <div className="relative h-32 w-full">
            <Image src="/ai-crop-analysis-and-plant-health-monitoring-techn.jpg" alt="AI Insights" fill className="object-cover rounded-t-lg" />
          </div>
          <CardContent className="p-6">
            <h3 className="font-medium">AI Insights</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Diagnose crop stress, predict pest risks, and optimize irrigation with AI.
            </p>
          </CardContent>
        </Card>
        <Card>
          <div className="relative h-32 w-full">
            <Image src="/agricultural-marketplace-with-fresh-produce-and-fa.jpg" alt="Marketplace" fill className="object-cover rounded-t-lg" />
          </div>
          <CardContent className="p-6">
            <h3 className="font-medium">Marketplace</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              List and sell produce with transparent pricing and reliable buyer ratings.
            </p>
          </CardContent>
        </Card>
        <Card>
          <div className="relative h-32 w-full">
            <Image src="/farmers-community-discussion-and-knowledge-sharing.jpg" alt="Community" fill className="object-cover rounded-t-lg" />
          </div>
          <CardContent className="p-6">
            <h3 className="font-medium">Community</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Ask questions, get expert advice, and share best practices across regions.
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="mt-16 grid gap-8 md:grid-cols-4 text-center">
        <div>
          <p className="text-3xl font-bold text-primary">10,000+</p>
          <p className="text-sm text-muted-foreground">Active Farmers</p>
        </div>
        <div>
          <p className="text-3xl font-bold text-primary">₹50L+</p>
          <p className="text-sm text-muted-foreground">Trade Volume</p>
        </div>
        <div>
          <p className="text-3xl font-bold text-primary">500+</p>
          <p className="text-sm text-muted-foreground">Expert Advisors</p>
        </div>
        <div>
          <p className="text-3xl font-bold text-primary">95%</p>
          <p className="text-sm text-muted-foreground">Success Rate</p>
        </div>
      </div>

      <div className="mt-16">
        <h2 className="text-center text-2xl font-semibold mb-8">What Our Users Say</h2>
        <div className="grid gap-6 md:grid-cols-3">
          <Card>
            <CardContent className="p-6">
              <p className="text-sm text-muted-foreground mb-4">
                "AgriHub's AI insights helped me increase my tomato yield by 30%. The community support is incredible!"
              </p>
              <div className="flex items-center gap-3">
                <div className="relative h-10 w-10 rounded-full overflow-hidden">
                  <Image src="/indian-farmer-portrait.jpg" alt="Farmer" fill className="object-cover" />
                </div>
                <div>
                  <p className="font-medium">Rajesh Kumar</p>
                  <p className="text-xs text-muted-foreground">Farmer, Punjab</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <p className="text-sm text-muted-foreground mb-4">
                "The marketplace made it easy to connect with quality suppliers. Fair pricing and reliable delivery."
              </p>
              <div className="flex items-center gap-3">
                <div className="relative h-10 w-10 rounded-full overflow-hidden">
                  <Image src="/indian-businesswoman-portrait.jpg" alt="Buyer" fill className="object-cover" />
                </div>
                <div>
                  <p className="font-medium">Priya Sharma</p>
                  <p className="text-xs text-muted-foreground">Buyer, Delhi</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <p className="text-sm text-muted-foreground mb-4">
                "As an expert, I can reach thousands of farmers and share my knowledge effectively through AgriHub."
              </p>
              <div className="flex items-center gap-3">
                <div className="relative h-10 w-10 rounded-full overflow-hidden">
                  <Image src="/agricultural-expert-scientist-portrait.jpg" alt="Expert" fill className="object-cover" />
                </div>
                <div>
                  <p className="font-medium">Dr. Suresh Patel</p>
                  <p className="text-xs text-muted-foreground">Agri Expert, Gujarat</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
