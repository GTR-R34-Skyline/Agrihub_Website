"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

const items = [
  { href: "/dashboard", label: "Overview" },
  { href: "/field-monitor", label: "Fields & Map" },
  { href: "/community", label: "Community" },
  { href: "/marketplace", label: "Marketplace" },
]

export default function DashboardSidebar() {
  const pathname = usePathname()
  return (
    <nav aria-label="Dashboard tools" className="rounded-lg border p-3">
      <p className="px-2 text-sm font-medium text-muted-foreground">Tools</p>
      <ul className="mt-2 space-y-1">
        {items.map((item) => {
          const active = pathname === item.href
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className={cn(
                  "block rounded-md px-2 py-2 text-sm",
                  active ? "bg-primary text-primary-foreground" : "hover:bg-muted",
                )}
                aria-current={active ? "page" : undefined}
              >
                {item.label}
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
