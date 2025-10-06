import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { User, Building2, Save } from "lucide-react"

export default async function SettingsPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Get user profile
  const { data: profile } = await supabase.from("profiles").select("*").eq("id", user!.id).single()

  return (
    <div className="p-6 lg:p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Settings</h1>
          <p className="text-slate-400">Manage your account and preferences</p>
        </div>

        {/* Profile Settings */}
        <Card className="border-slate-800/50 bg-slate-900/50 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-xl text-white flex items-center gap-2">
              <User className="h-5 w-5 text-cyan-400" />
              Profile Information
            </CardTitle>
            <CardDescription className="text-slate-400">Update your personal information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="fullName" className="text-slate-300">
                Full Name
              </Label>
              <Input
                id="fullName"
                type="text"
                defaultValue={profile?.full_name || ""}
                className="border-slate-700 bg-slate-800/50 text-white"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email" className="text-slate-300">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                defaultValue={user?.email || ""}
                disabled
                className="border-slate-700 bg-slate-800/30 text-slate-400"
              />
              <p className="text-xs text-slate-500">Email cannot be changed</p>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="company" className="text-slate-300">
                Company
              </Label>
              <Input
                id="company"
                type="text"
                defaultValue={profile?.company || ""}
                className="border-slate-700 bg-slate-800/50 text-white"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="role" className="text-slate-300">
                Role
              </Label>
              <Input
                id="role"
                type="text"
                defaultValue={profile?.role || ""}
                className="border-slate-700 bg-slate-800/50 text-white"
              />
            </div>
            <Button className="bg-cyan-500 hover:bg-cyan-600 text-slate-900 font-semibold">
              <Save className="mr-2 h-4 w-4" />
              Save Changes
            </Button>
          </CardContent>
        </Card>

        {/* Account Settings */}
        <Card className="border-slate-800/50 bg-slate-900/50 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-xl text-white flex items-center gap-2">
              <Building2 className="h-5 w-5 text-purple-400" />
              Account Settings
            </CardTitle>
            <CardDescription className="text-slate-400">Manage your account preferences</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b border-slate-800">
              <div>
                <p className="text-sm font-medium text-white">Email Notifications</p>
                <p className="text-xs text-slate-400">Receive updates about your agents and content</p>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="border-slate-700 text-slate-300 hover:bg-slate-800 bg-transparent"
              >
                Configure
              </Button>
            </div>
            <div className="flex items-center justify-between py-3 border-b border-slate-800">
              <div>
                <p className="text-sm font-medium text-white">API Access</p>
                <p className="text-xs text-slate-400">Manage your API keys and integrations</p>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="border-slate-700 text-slate-300 hover:bg-slate-800 bg-transparent"
              >
                Manage
              </Button>
            </div>
            <div className="flex items-center justify-between py-3">
              <div>
                <p className="text-sm font-medium text-white">Subscription</p>
                <p className="text-xs text-slate-400">View and manage your subscription plan</p>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="border-slate-700 text-slate-300 hover:bg-slate-800 bg-transparent"
              >
                View Plan
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Danger Zone */}
        <Card className="border-red-500/20 bg-slate-900/50 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-xl text-red-400">Danger Zone</CardTitle>
            <CardDescription className="text-slate-400">Irreversible account actions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-white">Delete Account</p>
                <p className="text-xs text-slate-400">Permanently delete your account and all data</p>
              </div>
              <Button variant="outline" className="border-red-500/20 text-red-400 hover:bg-red-500/10 bg-transparent">
                Delete Account
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
