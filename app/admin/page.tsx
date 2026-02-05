"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, Users, DollarSign, Activity, Calendar, ArrowUpRight, Zap, AlertCircle } from "lucide-react"
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { venueConfig, formatCurrency } from "@/lib/venue-config"

const data = [
  { name: "Mon", total: 1200 },
  { name: "Tue", total: 1850 },
  { name: "Wed", total: 1600 },
  { name: "Thu", total: 2100 },
  { name: "Fri", total: 3850 },
  { name: "Sat", total: 4200 },
  { name: "Sun", total: 3600 },
]

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-[#020202] p-6 md:p-8 font-sans text-slate-200">
      
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4 border-b border-white/5 pb-6">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight font-serif">Command Center</h1>
          <p className="text-slate-500 text-sm mt-1 font-mono uppercase tracking-wider">Real-time Revenue Operations • {venueConfig.timezone}</p>
        </div>
        <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-900/20 border border-emerald-900/50">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="text-xs font-mono text-emerald-500 font-bold tracking-wider">SYSTEM ONLINE</span>
            </div>
        </div>
      </div>

      {/* KPI GRID */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {[
            { label: "Total Revenue (7d)", val: formatCurrency(18420), icon: DollarSign, trend: "+14% vs last week", color: "text-emerald-400", bg: "bg-emerald-500/10" },
            { label: "Slot Utilization", val: "87.4%", icon: Activity, trend: "High Demand", color: "text-blue-400", bg: "bg-blue-500/10" },
            { label: "Active Bookings", val: "142", icon: Calendar, trend: "+32 incoming", color: "text-purple-400", bg: "bg-purple-500/10" },
            { label: "Rev / Available Hour", val: formatCurrency(72), icon: Zap, trend: "Above Target", color: "text-amber-400", bg: "bg-amber-500/10" }
        ].map((item, i) => (
            <Card key={i} className="border-white/10 bg-[#09090b] backdrop-blur-md hover:border-white/20 transition-colors">
                <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold font-mono">{item.label}</p>
                            <h3 className="text-2xl font-serif text-white mt-2 tracking-tight">{item.val}</h3>
                        </div>
                        <div className={`p-2 rounded-lg ${item.bg} ${item.color}`}>
                            <item.icon className="w-5 h-5" />
                        </div>
                    </div>
                    <div className="mt-4 flex items-center text-xs text-slate-400 font-mono">
                        {item.label.includes("Revenue") ? <ArrowUpRight className="w-3 h-3 mr-1 text-emerald-500" /> : null}
                        <span className={item.label.includes("Revenue") ? "text-emerald-500 font-medium" : ""}>{item.trend}</span>
                    </div>
                </CardContent>
            </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* CHART */}
        <Card className="lg:col-span-2 border-white/10 bg-[#09090b] backdrop-blur-md">
            <CardHeader className="border-b border-white/5">
                <CardTitle className="text-sm font-medium text-slate-400 uppercase tracking-wider flex items-center gap-2 font-mono">
                  <TrendingUp className="w-4 h-4" />
                  Revenue Performance
                </CardTitle>
            </CardHeader>
            <CardContent className="pl-0 pt-6">
                <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={data}>
                            <defs>
                                <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                                </linearGradient>
                            </defs>
                            <XAxis dataKey="name" stroke="#525252" fontSize={12} tickLine={false} axisLine={false} />
                            <YAxis stroke="#525252" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value/1000}k`} />
                            <Tooltip contentStyle={{ backgroundColor: '#09090b', border: '1px solid #27272a', borderRadius: '8px', color: '#fff' }} itemStyle={{ color: '#10b981' }} />
                            <Area type="monotone" dataKey="total" stroke="#10b981" strokeWidth={2} fillOpacity={1} fill="url(#colorTotal)" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>

        {/* FEED */}
        <Card className="border-white/10 bg-[#09090b] backdrop-blur-md">
            <CardHeader className="border-b border-white/5">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-sm font-medium text-slate-400 uppercase tracking-wider flex items-center gap-2 font-mono">
                    <Activity className="w-4 h-4" />
                    Live Operations
                  </CardTitle>
                  <Badge className="bg-blue-500/10 text-blue-400 border-none text-[10px] font-mono">n8n Linked</Badge>
                </div>
            </CardHeader>
            <CardContent className="pt-6">
                <div className="space-y-6">
                    {[
                        { text: "New Booking: 4-Ball", sub: `${formatCurrency(60)} Deposit Captured`, time: "2m ago", color: "bg-emerald-500" },
                        { text: "Automation Triggered", sub: "Rainy Day Protocol -> Waitlist Emailed", time: "12m ago", color: "bg-purple-500" },
                        { text: "Payment Failed", sub: "User: Mike R. (Retrying...)", time: "14m ago", color: "bg-red-500" },
                        { text: "Reminder Sent", sub: "SMS -> Sarah J. (Tomorrow 09:00)", time: "15m ago", color: "bg-blue-500" },
                    ].map((item, i) => (
                        <div key={i} className="flex gap-4 group">
                            <div className="relative mt-1">
                                <div className={`h-2 w-2 rounded-full ${item.color} shadow-[0_0_8px_currentColor] group-hover:scale-125 transition-transform`} />
                                <div className="absolute top-3 left-1 w-[1px] h-8 bg-white/5" />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-slate-200">{item.text}</p>
                                <p className="text-xs text-slate-500 font-mono">{item.sub}</p>
                            </div>
                            <span className="ml-auto text-[10px] text-slate-600 font-mono pt-1">{item.time}</span>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
      </div>
    </div>
  )
}