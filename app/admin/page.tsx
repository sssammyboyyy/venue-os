"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, Users, DollarSign, Activity, Calendar, ArrowUpRight } from "lucide-react"
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { venueConfig } from "@/lib/venue-config" // Import Config

// FAKE DATA
const data = [
  { name: "Mon", total: 1200 },
  { name: "Tue", total: 1850 },
  { name: "Wed", total: 1600 },
  { name: "Thu", total: 2100 },
  { name: "Fri", total: 2850 },
  { name: "Sat", total: 3200 },
  { name: "Sun", total: 2600 },
]

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-transparent p-6 md:p-8">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight font-serif">Command Center</h1>
          <p className="text-gray-400 text-sm">Real-time Revenue Operations</p>
        </div>
        <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-green-900/20 border border-green-900/50">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                <span className="text-xs font-mono text-green-500">SYSTEM ONLINE</span>
            </div>
        </div>
      </div>

      {/* KPI GRID */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {[
            // Dynamically using venueConfig.currency here
            { label: "Total Revenue", val: `${venueConfig.currency} 18,420`, icon: DollarSign, trend: "+14%", color: "text-primary" },
            { label: "Slot Utilization", val: "87.4%", icon: Activity, trend: "28 slots left", color: "text-blue-400" },
            { label: "Active Bookings", val: "142", icon: Calendar, trend: "+32 this week", color: "text-purple-400" },
            { label: "LTV / Customer", val: `${venueConfig.currency} 345`, icon: Users, trend: "Lifetime Value", color: "text-orange-400" }
        ].map((item, i) => (
            <Card key={i} className="border-white/5 bg-white/5 backdrop-blur-md">
                <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-xs text-gray-500 uppercase tracking-widest font-semibold">{item.label}</p>
                            <h3 className="text-2xl font-bold text-white mt-2 font-mono">{item.val}</h3>
                        </div>
                        <div className={`p-2 rounded-lg bg-white/5 ${item.color}`}>
                            <item.icon className="w-5 h-5" />
                        </div>
                    </div>
                    <div className="mt-4 flex items-center text-xs text-gray-400">
                        {item.label === "Total Revenue" && <ArrowUpRight className="w-3 h-3 mr-1 text-green-500" />}
                        <span className={item.label === "Total Revenue" ? "text-green-500" : ""}>{item.trend}</span>
                    </div>
                </CardContent>
            </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* REVENUE CHART */}
        <Card className="lg:col-span-2 border-white/5 bg-white/5 backdrop-blur-md">
            <CardHeader>
                <CardTitle className="text-sm font-medium text-gray-400 uppercase tracking-wider">Weekly Performance</CardTitle>
            </CardHeader>
            <CardContent className="pl-0">
                <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={data}>
                            <defs>
                                <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                                </linearGradient>
                            </defs>
                            <XAxis 
                                dataKey="name" 
                                stroke="#525252" 
                                fontSize={12} 
                                tickLine={false} 
                                axisLine={false} 
                            />
                            <YAxis 
                                stroke="#525252" 
                                fontSize={12} 
                                tickLine={false} 
                                axisLine={false} 
                                tickFormatter={(value) => `${venueConfig.currency}${value/1000}k`} 
                            />
                            <Tooltip 
                                contentStyle={{ backgroundColor: '#171717', border: '1px solid #333', borderRadius: '8px' }}
                                itemStyle={{ color: '#fff' }}
                            />
                            <Area 
                                type="monotone" 
                                dataKey="total" 
                                stroke="#10b981" 
                                strokeWidth={2} 
                                fillOpacity={1} 
                                fill="url(#colorTotal)" 
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>

        {/* LIVE FEED */}
        <Card className="border-white/5 bg-white/5 backdrop-blur-md">
            <CardHeader>
                <CardTitle className="text-sm font-medium text-gray-400 uppercase tracking-wider">Real-Time Feed</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-6">
                    {[
                        { text: "New Booking: 4-Ball", sub: `${venueConfig.currency}50 Deposit Paid`, time: "2m ago", color: "bg-green-500" },
                        { text: "Reminder Sent", sub: "John Doe (Tomorrow 09:00)", time: "5m ago", color: "bg-blue-500" },
                        { text: "Rainy Day Protocol", sub: "Auto-Filled Slot: 16:00", time: "12m ago", color: "bg-purple-500" },
                        { text: "Payment Verified", sub: "Sarah Smith", time: "15m ago", color: "bg-green-500" },
                        { text: "New Review", sub: "5 Stars on Google", time: "32m ago", color: "bg-yellow-500" },
                    ].map((item, i) => (
                        <div key={i} className="flex gap-4">
                            <div className="relative mt-1">
                                <div className={`h-2 w-2 rounded-full ${item.color} shadow-[0_0_10px_currentColor]`} />
                                <div className="absolute top-3 left-1 w-[1px] h-8 bg-white/10" />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-white">{item.text}</p>
                                <p className="text-xs text-gray-500">{item.sub}</p>
                            </div>
                            <span className="ml-auto text-xs text-gray-600 font-mono">{item.time}</span>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
      </div>
    </div>
  )
}