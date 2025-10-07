"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { LayoutDashboard, Bot, FileText, BarChart3, Settings, LogOut, Menu, X } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { useState } from "react"
import Image from "next/image"

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/agents", label: "My Agents", icon: Bot },
  { href: "/dashboard/content", label: "Content Library", icon: FileText },
  { href: "/dashboard/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
]

export function DashboardNav() {
  const pathname = usePathname()
  const router = useRouter()
  const supabase = createClient()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push("/")
  }

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 border-r border-slate-800/50 bg-slate-950/80 backdrop-blur-xl">
        <div className="flex flex-col flex-1 min-h-0">
          {/* Logo */}
          <div className="flex items-center h-16 px-6 border-b border-slate-800/50">
            <Link href="/">
              <Image src="/logo.png" alt="AvyraXAi" width={180} height={40} className="h-8 w-auto" />
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                    isActive ? "bg-cyan-500/10 text-cyan-400" : "text-slate-400 hover:text-white hover:bg-slate-800/50",
                  )}
                >
                  <Icon className="h-5 w-5" />
                  {item.label}
                </Link>
              )
            })}
          </nav>

          {/* Sign Out */}
          <div className="p-4 border-t border-slate-800/50">
            <Button
              onClick={handleSignOut}
              variant="ghost"
              className="w-full justify-start text-slate-400 hover:text-white hover:bg-slate-800/50"
            >
              <LogOut className="mr-3 h-5 w-5" />
              Sign Out
            </Button>
          </div>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 flex items-center justify-between h-16 px-6 border-b border-slate-800/50 bg-slate-950/80 backdrop-blur-xl">
        <Link href="/dashboard">
          <Image src="/logo.png" alt="AvyraXAi" width={180} height={40} className="h-8 w-auto" />
        </Link>
        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-slate-300">
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-slate-950/95 backdrop-blur-xl pt-16">
          <nav className="px-4 py-6 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                    isActive ? "bg-cyan-500/10 text-cyan-400" : "text-slate-400 hover:text-white hover:bg-slate-800/50",
                  )}
                >
                  <Icon className="h-5 w-5" />
                  {item.label}
                </Link>
              )
            })}
            <Button
              onClick={handleSignOut}
              variant="ghost"
              className="w-full justify-start text-slate-400 hover:text-white hover:bg-slate-800/50 mt-4"
            >
              <LogOut className="mr-3 h-5 w-5" />
              Sign Out
            </Button>
          </nav>
        </div>
      )}
    </>
  )
}
