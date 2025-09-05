"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import RoleSelector, { type Role } from "@/components/role-selector"
import Link from "next/link"

export default function LoginPage() {
  const [role, setRole] = useState<Role>("Farmer")
  return (
    <section className="mx-auto max-w-md px-4 py-10">
      <Card>
        <CardHeader>
          <CardTitle>Login</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium">
              Email
            </label>
            <Input id="email" type="email" placeholder="you@example.com" autoComplete="email" />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium">
              Password
            </label>
            <Input id="password" type="password" autoComplete="current-password" />
          </div>
          <div>
            <p className="mb-2 text-sm font-medium">Role</p>
            <RoleSelector value={role} onChange={setRole} />
          </div>
          <Button className="w-full bg-primary text-primary-foreground hover:opacity-90" aria-label="Login">
            Continue
          </Button>
          <p className="text-center text-sm text-muted-foreground">
            New here?{" "}
            <Link href="/signup" className="underline">
              Create an account
            </Link>
          </p>
        </CardContent>
      </Card>
    </section>
  )
}
