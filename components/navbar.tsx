"use client"

import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"

const navItems = [
  { href: "/", label: "Home" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/marketplace", label: "Marketplace" },
  { href: "/community", label: "Community" },
  { href: "/field-monitor", label: "Field Monitor" },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  return (
    <header className="sticky top-0 z-40 border-b [background-color:hsl(var(--color-background))]">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-2" aria-label="AgriHub Home">
          <div className="h-6 w-6 rounded-sm bg-primary" aria-hidden="true" />
          <span className="font-semibold">AgriHub</span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex" aria-label="Main navigation">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="text-sm text-muted-foreground hover:text-foreground">
              {item.label}
            </Link>
          ))}
          <div className="ml-2 flex items-center gap-2">
            <Link href="/login">
              <Button variant="ghost" size="sm" aria-label="Login">
                Login
              </Button>
            </Link>
            <Link href="/signup">
              <Button size="sm" className="bg-primary text-primary-foreground hover:opacity-90" aria-label="Sign up">
                Sign Up
              </Button>
            </Link>
          </div>
        </nav>

        <div className="md:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" aria-label="Open menu">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-64">
              <SheetHeader>
                <SheetTitle>AgriHub</SheetTitle>
              </SheetHeader>
              <div className="mt-4 flex flex-col gap-3" role="menu" aria-label="Mobile navigation">
                {navItems.map((item) => (
                  <Link key={item.href} href={item.href} onClick={() => setOpen(false)} className="text-sm">
                    {item.label}
                  </Link>
                ))}
                <div className="mt-2 flex items-center gap-2">
                  <Link href="/login" onClick={() => setOpen(false)}>
                    <Button variant="ghost" size="sm">
                      Login
                    </Button>
                  </Link>
                  <Link href="/signup" onClick={() => setOpen(false)}>
                    <Button size="sm" className="bg-primary text-primary-foreground hover:opacity-90">
                      Sign Up
                    </Button>
                  </Link>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
