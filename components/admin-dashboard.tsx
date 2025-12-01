"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, Users, DollarSign, Activity, Calendar } from "lucide-react"

export function AdminDashboard() {
  return (
    <div className="min-h-screen bg-background p-8">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Command Center</h1>
          <p className="text-gray-400">Live Revenue Operations</p>
        </div>
        <div className="flex gap-3">
            <Badge className="bg-green-500/10 text-green-500 border-green-500/20 px-4 py-2 animate-pulse">
                SYSTEM ACTIVE
            </Badge>
        </div>
      </div>

      {/* KPI GRID */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        <Card className="border-l-4 border-l-primary bg-white/5">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-400 uppercase tracking-wider">Total Revenue</p>
                <h3 className="text-3xl font-bold text-white mt-2">R 184,200</h3>
              </div>
              <div className="p-2 bg-primary/20 rounded-lg">
                <DollarSign className="text-primary w-6 h-6" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-green-400 text-sm">
              <TrendingUp className="w-4 h-4 mr-1" />
              <span>+14% vs last month</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-secondary bg-white/5">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-400 uppercase tracking-wider">Slot Utilization</p>
                <h3 className="text-3xl font-bold text-white mt-2">87.4%</h3>
              </div>
              <div className="p-2 bg-secondary/20 rounded-lg">
                <Activity className="text-secondary w-6 h-6" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-gray-400 text-sm">
              <span>28 slots remaining today</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-blue-500 bg-white/5">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-400 uppercase tracking-wider">Active Bookings</p>
                <h3 className="text-3xl font-bold text-white mt-2">142</h3>
              </div>
              <div className="p-2 bg-blue-500/20 rounded-lg">
                <Calendar className="text-blue-500 w-6 h-6" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-green-400 text-sm">
              <TrendingUp className="w-4 h-4 mr-1" />
              <span>+32 this week</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500 bg-white/5">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-400 uppercase tracking-wider">LTV / Customer</p>
                <h3 className="text-3xl font-bold text-white mt-2">R 3,450</h3>
              </div>
              <div className="p-2 bg-purple-500/20 rounded-lg">
                <Users className="text-purple-500 w-6 h-6" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-gray-400 text-sm">
              <span>Lifetime Value</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* FAKE LIST */}
      <Card className="bg-white/5 border-white/10">
        <CardHeader>
            <CardTitle>Real-Time Feed</CardTitle>
        </CardHeader>
        <CardContent>
            <div className="space-y-4">
                {[
                    { text: "New Booking: 4-Ball @ 14:00 (R600 Deposit Paid)", time: "2 min ago", color: "text-green-400" },
                    { text: "Reminder Sent: John Doe (Tomorrow 09:00)", time: "5 min ago", color: "text-blue-400" },
                    { text: "System Auto-Filled Slot: 16:00 (Rainy Day Protocol)", time: "12 min ago", color: "text-purple-400" },
                    { text: "Payment Verified: Sarah Smith", time: "15 min ago", color: "text-green-400" },
                ].map((item, i) => (
                    <div key={i} className="flex justify-between items-center border-b border-white/5 pb-4 last:border-0">
                        <div className="flex items-center gap-3">
                            <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                            <span className={`font-mono text-sm ${item.color}`}>{item.text}</span>
                        </div>
                        <span className="text-xs text-gray-500">{item.time}</span>
                    </div>
                ))}
            </div>
        </CardContent>
      </Card>
    </div>
  )
}