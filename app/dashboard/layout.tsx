import type React from "react"
import { DashboardNav } from "@/components/dashboard-nav"
import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      <DashboardNav />
      <main className="lg:pl-64 pt-16 lg:pt-0">{children}</main>
    </div>
  )
}
