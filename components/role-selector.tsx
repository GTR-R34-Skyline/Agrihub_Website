"use client"

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

export type Role = "Farmer" | "Buyer" | "Expert" | "Admin"

export default function RoleSelector({
  value,
  onChange,
}: {
  value: Role
  onChange: (r: Role) => void
}) {
  const roles: Role[] = ["Farmer", "Buyer", "Expert", "Admin"]
  return (
    <RadioGroup value={value} onValueChange={(v) => onChange(v as Role)} className="grid grid-cols-2 gap-3">
      {roles.map((role) => (
        <div key={role} className="flex items-center space-x-2 rounded-md border p-3">
          <RadioGroupItem id={role} value={role} />
          <Label htmlFor={role}>{role}</Label>
        </div>
      ))}
    </RadioGroup>
  )
}
