import type React from "react"
import DashboardSidebar from "@/components/dashboard-sidebar"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 px-4 py-6 md:grid-cols-[240px_1fr]">
      <aside className="md:sticky md:top-[72px] md:h-[calc(100dvh-96px)]">
        <DashboardSidebar />
      </aside>
      <div>{children}</div>
    </div>
  )
}
