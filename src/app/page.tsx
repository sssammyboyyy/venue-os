import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Server, ShieldCheck, Zap } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md border-zinc-800 bg-zinc-900/50 backdrop-blur-xl">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl font-medium tracking-tight">Venue Engine</CardTitle>
            <Badge variant="outline" className="border-green-500/20 text-green-400 bg-green-500/10">
              Operational
            </Badge>
          </div>
          <CardDescription className="text-zinc-400">
            System Infrastructure Status
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">

            <div className="flex items-center justify-between p-3 rounded-lg bg-zinc-900 border border-zinc-800">
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-4 h-4 text-zinc-100" />
                <span className="text-sm text-zinc-300">Auth (Supabase)</span>
              </div>
              <div className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg bg-zinc-900 border border-zinc-800">
              <div className="flex items-center gap-3">
                <Zap className="w-4 h-4 text-zinc-100" />
                <span className="text-sm text-zinc-300">Runtime (Edge)</span>
              </div>
              <div className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg bg-zinc-900 border border-zinc-800">
              <div className="flex items-center gap-3">
                <Server className="w-4 h-4 text-zinc-100" />
                <span className="text-sm text-zinc-300">Database</span>
              </div>
              <div className="h-2 w-2 rounded-full bg-yellow-500 shadow-[0_0_8px_rgba(234,179,8,0.5)]" />
            </div>

          </div>

          <div className="pt-4">
            <Button className="w-full bg-zinc-100 text-zinc-900 hover:bg-zinc-200">
              Initialize System
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
