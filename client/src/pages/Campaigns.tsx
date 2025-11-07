import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart,
  Bar,
} from "recharts";
import { Target, TrendingUp, DollarSign, Users } from "lucide-react";

// Sample data for 1.1. - 31.7. period
const costData = [
  { name: "Jan", value: 12500 },
  { name: "Feb", value: 13200 },
  { name: "Mrz", value: 11800 },
  { name: "Apr", value: 14100 },
  { name: "Mai", value: 13600 },
  { name: "Jun", value: 15200 },
  { name: "Jul", value: 14800 },
];

const revenueData = [
  { name: "Jan", value: 42000 },
  { name: "Feb", value: 38000 },
  { name: "Mrz", value: 46000 },
  { name: "Apr", value: 39000 },
  { name: "Mai", value: 52000 },
  { name: "Jun", value: 48000 },
  { name: "Jul", value: 51000 },
];

const roasData = [
  { name: "Jan", value: 3.36 },
  { name: "Feb", value: 2.88 },
  { name: "Mrz", value: 3.90 },
  { name: "Apr", value: 2.77 },
  { name: "Mai", value: 3.82 },
  { name: "Jun", value: 3.16 },
  { name: "Jul", value: 3.45 },
];

const cpaData = [
  { name: "Jan", value: 42.5 },
  { name: "Feb", value: 38.2 },
  { name: "Mrz", value: 35.8 },
  { name: "Apr", value: 41.3 },
  { name: "Mai", value: 39.7 },
  { name: "Jun", value: 44.2 },
  { name: "Jul", value: 37.9 },
];

export default function Campaigns() {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <Target className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-2xl font-bold text-foreground">Kampagnen Analytics</h1>
          <p className="text-muted-foreground">Performance-Übersicht für den Zeitraum 01.01. - 31.07.</p>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Cost Trend Line Chart */}
        <Card className="shadow-sm hover-scale bg-gradient-to-br from-card to-card/50 border-border/50">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-red-500" />
              <CardTitle className="text-base font-semibold text-foreground">Kostenverlauf</CardTitle>
            </div>
            <p className="text-sm text-muted-foreground">Entwicklung der Werbekosten über den Zeitraum</p>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={costData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                  <XAxis 
                    dataKey="name" 
                    stroke="hsl(var(--muted-foreground))" 
                    tickLine={false} 
                    axisLine={false} 
                    fontSize={12} 
                  />
                  <YAxis 
                    stroke="hsl(var(--muted-foreground))" 
                    tickLine={false} 
                    axisLine={false} 
                    fontSize={12}
                    tickFormatter={(value) => `CHF ${(value / 1000).toFixed(1)}k`}
                  />
                  <Tooltip 
                    cursor={{ stroke: "hsl(var(--primary))", strokeWidth: 1 }}
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                      fontSize: "12px"
                    }}
                    formatter={(value) => [`CHF ${value.toLocaleString()}`, "Kosten"]}
                  />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#EF4444"
                    strokeWidth={3}
                    dot={{ fill: "#EF4444", strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6, stroke: "#EF4444", strokeWidth: 2, fill: "#EF4444" }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Revenue Trend Line Chart */}
        <Card className="shadow-sm hover-scale bg-gradient-to-br from-card to-card/50 border-border/50">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-green-500" />
              <CardTitle className="text-base font-semibold text-foreground">Umsatzverlauf</CardTitle>
            </div>
            <p className="text-sm text-muted-foreground">Entwicklung des Umsatzes über den Zeitraum</p>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={revenueData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                  <XAxis 
                    dataKey="name" 
                    stroke="hsl(var(--muted-foreground))" 
                    tickLine={false} 
                    axisLine={false} 
                    fontSize={12} 
                  />
                  <YAxis 
                    stroke="hsl(var(--muted-foreground))" 
                    tickLine={false} 
                    axisLine={false} 
                    fontSize={12}
                    tickFormatter={(value) => `CHF ${(value / 1000).toFixed(0)}k`}
                  />
                  <Tooltip 
                    cursor={{ stroke: "hsl(var(--primary))", strokeWidth: 1 }}
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                      fontSize: "12px"
                    }}
                    formatter={(value) => [`CHF ${value.toLocaleString()}`, "Umsatz"]}
                  />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#10B981"
                    strokeWidth={3}
                    dot={{ fill: "#10B981", strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6, stroke: "#10B981", strokeWidth: 2, fill: "#10B981" }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* ROAS Bar Chart */}
        <Card className="shadow-sm hover-scale bg-gradient-to-br from-card to-card/50 border-border/50">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-2">
              <Target className="h-5 w-5 text-blue-500" />
              <CardTitle className="text-base font-semibold text-foreground">ROAS Entwicklung</CardTitle>
            </div>
            <p className="text-sm text-muted-foreground">Return on Ad Spend über den Zeitraum</p>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={roasData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                  <XAxis 
                    dataKey="name" 
                    stroke="hsl(var(--muted-foreground))" 
                    tickLine={false} 
                    axisLine={false} 
                    fontSize={12} 
                  />
                  <YAxis 
                    stroke="hsl(var(--muted-foreground))" 
                    tickLine={false} 
                    axisLine={false} 
                    fontSize={12}
                    domain={[0, 5]}
                  />
                  <Tooltip 
                    cursor={{ fill: "hsl(var(--muted)/0.2)" }}
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                      fontSize: "12px"
                    }}
                    formatter={(value) => [`${value}x`, "ROAS"]}
                  />
                  <Bar 
                    dataKey="value" 
                    name="ROAS" 
                    fill="#3B82F6" 
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* CPA Bar Chart */}
        <Card className="shadow-sm hover-scale bg-gradient-to-br from-card to-card/50 border-border/50">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-purple-500" />
              <CardTitle className="text-base font-semibold text-foreground">CPA Entwicklung</CardTitle>
            </div>
            <p className="text-sm text-muted-foreground">Cost per Acquisition über den Zeitraum</p>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={cpaData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                  <XAxis 
                    dataKey="name" 
                    stroke="hsl(var(--muted-foreground))" 
                    tickLine={false} 
                    axisLine={false} 
                    fontSize={12} 
                  />
                  <YAxis 
                    stroke="hsl(var(--muted-foreground))" 
                    tickLine={false} 
                    axisLine={false} 
                    fontSize={12}
                    tickFormatter={(value) => `CHF ${value}`}
                  />
                  <Tooltip 
                    cursor={{ fill: "hsl(var(--muted)/0.2)" }}
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                      fontSize: "12px"
                    }}
                    formatter={(value) => [`CHF ${value}`, "CPA"]}
                  />
                  <Bar 
                    dataKey="value" 
                    name="CPA" 
                    fill="#8B5CF6" 
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}