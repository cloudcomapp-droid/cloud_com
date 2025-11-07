import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  AreaChart,
  Area,
  RadarChart,
  Radar,
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { Trophy, Medal, Star, AlertTriangle, TrendingDown } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const revenueData = [
  { name: "Jan", revenue: 42000 },
  { name: "Feb", revenue: 38000 },
  { name: "Mrz", revenue: 46000 },
  { name: "Apr", revenue: 39000 },
  { name: "Mai", revenue: 52000 },
  { name: "Jun", revenue: 48000 },
  { name: "Jul", revenue: 51000 },
];

const categoryData = [
  { name: "Cash Cows", value: 250, color: "#10B981" },
  { name: "Poor Dogs", value: 300, color: "#F59E0B" },
  { name: "Hopeless", value: 150, color: "#EF4444" },
  { name: "Numb", value: 500, color: "#6B7280" },
  { name: "Silent", value: 5, color: "#9CA3AF" },
];

const roasData = [
  { subject: "Cash Cows", score: 7.0 },
  { subject: "Poor Dogs", score: 1.4 },
  { subject: "Hopeless", score: 0.6 },
  { subject: "Numb", score: 1.5 },
  { subject: "Silent", score: 0.0 },
];

const topCashCows = [
  { rank: 1, product: "Premium Smartphone X1", roas: 12.4, revenue: 45800, costs: 3690 },
  { rank: 2, product: "Gaming Laptop Pro", roas: 11.2, revenue: 38200, costs: 3410 },
  { rank: 3, product: "Wireless Headphones Elite", roas: 10.8, revenue: 28900, costs: 2675 },
  { rank: 4, product: "Smart Watch Series 5", roas: 9.6, revenue: 22400, costs: 2333 },
  { rank: 5, product: "4K Monitor Ultra", roas: 9.1, revenue: 19800, costs: 2175 },
  { rank: 6, product: "Bluetooth Speaker Max", roas: 8.9, revenue: 18600, costs: 2090 },
  { rank: 7, product: "Tablet Pro 12", roas: 8.5, revenue: 17200, costs: 2024 },
  { rank: 8, product: "Keyboard Mechanical", roas: 8.2, revenue: 15900, costs: 1939 },
  { rank: 9, product: "Camera DSLR Advanced", roas: 7.9, revenue: 14700, costs: 1861 },
  { rank: 10, product: "Power Bank Ultra", roas: 7.6, revenue: 13500, costs: 1776 }
];

const hopelessProducts = [
  { product: "Basic Phone Cover", roas: 0.2, revenue: 45, costs: 225, loss: -180 },
  { product: "Old Model Charger", roas: 0.3, revenue: 89, costs: 297, loss: -208 },
  { product: "Cheap Earbuds", roas: 0.4, revenue: 156, costs: 390, loss: -234 },
  { product: "Generic Mouse Pad", roas: 0.5, revenue: 203, costs: 406, loss: -203 },
  { product: "Simple USB Cable", roas: 0.6, revenue: 278, costs: 463, loss: -185 }
];

export default function DashboardCharts() {
  // Updated: Revenue per month Jan-Jul 2025 & Category pie chart
  return (
    <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 animate-fade-in">
      {/* Revenue Report - Full width on mobile, 2 cols on large */}
      <Card className="shadow-sm hover-scale md:col-span-2 lg:col-span-2 xl:col-span-2 bg-gradient-to-br from-card to-card/50 border-border/50">
        <CardHeader className="pb-4">
          <CardTitle className="text-base font-semibold text-foreground">Revenue Report</CardTitle>
          <p className="text-sm text-muted-foreground">
            Revenue trend
            <span className="ml-6">01.01.25 – 31.07.25</span>
          </p>
        </CardHeader>
        <CardContent>
          <div className="h-60">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={revenueData} margin={{ top: 20, right: 20, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" tickLine={false} axisLine={false} fontSize={12} />
                <YAxis stroke="hsl(var(--muted-foreground))" tickLine={false} axisLine={false} fontSize={12} />
                <Tooltip
                  cursor={{ fill: "hsl(var(--muted)/0.2)" }}
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                    fontSize: "12px"
                  }}
                  formatter={(value) => [`CHF ${value.toLocaleString()}`, "Umsatz"]}
                />
                <Bar dataKey="revenue" name="Umsatz" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Category Distribution */}
      <Card className="shadow-sm hover-scale bg-gradient-to-br from-card to-card/50 border-border/50">
        <CardHeader className="pb-4">
          <CardTitle className="text-base font-semibold text-foreground">Kategorienverteilung</CardTitle>
          <p className="text-sm text-muted-foreground">Anteile der Produktkategorien</p>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={0}
                  outerRadius={85}
                  paddingAngle={2}
                  dataKey="value"
                  label={({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
                    if (percent < 0.08) return null;
                    const RADIAN = Math.PI / 180;
                    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
                    const x = cx + radius * Math.cos(-midAngle * RADIAN);
                    const y = cy + radius * Math.sin(-midAngle * RADIAN);
                    return (
                      <text
                        x={x}
                        y={y}
                        fill="white"
                        textAnchor={x > cx ? 'start' : 'end'}
                        dominantBaseline="central"
                        fontSize="12"
                        fontWeight="bold"
                      >
                        {`${(percent * 100).toFixed(0)}%`}
                      </text>
                    );
                  }}
                  labelLine={false}
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                    fontSize: "12px"
                  }}
                  formatter={(value, name) => [`${value} Produkte`, name as string]}
                />
                <Legend
                  verticalAlign="bottom"
                  height={36}
                  iconType="circle"
                  wrapperStyle={{ fontSize: "11px" }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* ROAS by Category */}
      <Card className="shadow-sm hover-scale bg-gradient-to-br from-card to-card/50 border-border/50">
        <CardHeader className="pb-4">
          <CardTitle className="text-base font-semibold text-foreground">ROAS nach Kategorie</CardTitle>
          <p className="text-sm text-muted-foreground">Performance der Produktkategorien</p>
        </CardHeader>
        <CardContent>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={roasData} margin={{ top: 20, right: 30, bottom: 20, left: 30 }}>
                <PolarGrid stroke="hsl(var(--border))" opacity={0.3} />
                <PolarAngleAxis
                  dataKey="subject"
                  stroke="hsl(var(--foreground))"
                  fontSize={13}
                  fontWeight="500"
                  tick={{ fill: "hsl(var(--foreground))" }}
                />
                <PolarRadiusAxis
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={11}
                  tickCount={5}
                  domain={[0, 8]}
                  tick={{ fill: "hsl(var(--muted-foreground))" }}
                />
                <Radar
                  name="ROAS"
                  dataKey="score"
                  stroke="hsl(var(--primary))"
                  fill="hsl(var(--primary))"
                  fillOpacity={0.2}
                  strokeWidth={2}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Top 10 Cash Cows */}
      <Card className="shadow-sm hover-scale md:col-span-2 lg:col-span-2 xl:col-span-2 bg-gradient-to-br from-card to-card/50 border-border/50">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-yellow-500" />
            <CardTitle className="text-base font-semibold text-foreground">Top 10 Cash Cows</CardTitle>
          </div>
          <p className="text-sm text-muted-foreground">Beste Performance Produkte</p>
        </CardHeader>
        <CardContent>
          {/* Podium for Top 3 */}
          <div className="flex justify-center items-end gap-4 mb-6 pb-4 border-b border-border/50">
            {/* 2nd Place */}
            <div className="flex flex-col items-center">
              <Medal className="w-6 h-6 text-gray-400 mb-2" />
              <div className="bg-gray-200 dark:bg-gray-700 w-16 h-12 rounded-t flex items-center justify-center">
                <span className="text-xs font-bold">2</span>
              </div>
              <div className="text-xs text-center mt-1">
                <div className="font-medium truncate w-16">{topCashCows[1].product.split(' ')[0]}</div>
                <div className="text-muted-foreground">{topCashCows[1].roas}</div>
              </div>
            </div>

            {/* 1st Place */}
            <div className="flex flex-col items-center">
              <Trophy className="w-8 h-8 text-yellow-500 mb-2" />
              <div className="bg-yellow-200 dark:bg-yellow-700 w-20 h-16 rounded-t flex items-center justify-center">
                <span className="text-sm font-bold">1</span>
              </div>
              <div className="text-xs text-center mt-1">
                <div className="font-medium truncate w-20">{topCashCows[0].product.split(' ')[0]}</div>
                <div className="text-muted-foreground">{topCashCows[0].roas}</div>
              </div>
            </div>

            {/* 3rd Place */}
            <div className="flex flex-col items-center">
              <Star className="w-5 h-5 text-amber-600 mb-2" />
              <div className="bg-amber-200 dark:bg-amber-700 w-14 h-8 rounded-t flex items-center justify-center">
                <span className="text-xs font-bold">3</span>
              </div>
              <div className="text-xs text-center mt-1">
                <div className="font-medium truncate w-14">{topCashCows[2].product.split(' ')[0]}</div>
                <div className="text-muted-foreground">{topCashCows[2].roas}</div>
              </div>
            </div>
          </div>

          {/* Top 10 Table */}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">#</TableHead>
                <TableHead>Produkt</TableHead>
                <TableHead className="text-right">ROAS</TableHead>
                <TableHead className="text-right">Umsatz</TableHead>
                <TableHead className="text-right">Kosten</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {topCashCows.map((item) => (
                <TableRow key={item.rank}>
                  <TableCell className="font-medium">{item.rank}</TableCell>
                  <TableCell className="font-medium">{item.product}</TableCell>
                  <TableCell className="text-right text-green-600 font-semibold">{item.roas}</TableCell>
                  <TableCell className="text-right">CHF {item.revenue.toLocaleString()}</TableCell>
                  <TableCell className="text-right">CHF {item.costs.toLocaleString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Hopeless Products */}
      <Card className="shadow-sm hover-scale md:col-span-2 lg:col-span-2 xl:col-span-2 bg-gradient-to-br from-card to-card/50 border-border/50">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-red-500" />
            <CardTitle className="text-base font-semibold text-foreground">Ladenhüter</CardTitle>
          </div>
          <p className="text-sm text-muted-foreground">Hopeless - Produkte mit schlechter Performance</p>
        </CardHeader>
        <CardContent>
          {/* Worst Performers Display */}
          <div className="flex justify-center items-end gap-4 mb-6 pb-4 border-b border-border/50">
            {/* 2nd Worst */}
            <div className="flex flex-col items-center">
              <AlertTriangle className="w-6 h-6 text-orange-500 mb-2" />
              <div className="bg-orange-200 dark:bg-orange-800 w-16 h-12 rounded-t flex items-center justify-center border-2 border-orange-300 dark:border-orange-600">
                <span className="text-xs font-bold">2</span>
              </div>
              <div className="text-xs text-center mt-1">
                <div className="font-medium truncate w-16">{hopelessProducts[1].product.split(' ')[0]}</div>
                <div className="text-red-600 font-semibold">{hopelessProducts[1].roas}</div>
              </div>
            </div>

            {/* 1st Worst */}
            <div className="flex flex-col items-center">
              <TrendingDown className="w-8 h-8 text-red-500 mb-2" />
              <div className="bg-red-200 dark:bg-red-800 w-20 h-16 rounded-t flex items-center justify-center border-2 border-red-300 dark:border-red-600">
                <span className="text-sm font-bold">1</span>
              </div>
              <div className="text-xs text-center mt-1">
                <div className="font-medium truncate w-20">{hopelessProducts[0].product.split(' ')[0]}</div>
                <div className="text-red-600 font-semibold">{hopelessProducts[0].roas}</div>
              </div>
            </div>

            {/* 3rd Worst */}
            <div className="flex flex-col items-center">
              <AlertTriangle className="w-5 h-5 text-yellow-600 mb-2" />
              <div className="bg-yellow-200 dark:bg-yellow-800 w-14 h-8 rounded-t flex items-center justify-center border-2 border-yellow-300 dark:border-yellow-600">
                <span className="text-xs font-bold">3</span>
              </div>
              <div className="text-xs text-center mt-1">
                <div className="font-medium truncate w-14">{hopelessProducts[2].product.split(' ')[0]}</div>
                <div className="text-red-600 font-semibold">{hopelessProducts[2].roas}</div>
              </div>
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">
                  <TrendingDown className="w-4 h-4 text-red-500" />
                </TableHead>
                <TableHead>Produkt</TableHead>
                <TableHead className="text-right">ROAS</TableHead>
                <TableHead className="text-right">Umsatz</TableHead>
                <TableHead className="text-right">Kosten</TableHead>
                <TableHead className="text-right">Verlust</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {hopelessProducts.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <AlertTriangle className="w-4 h-4 text-red-500" />
                  </TableCell>
                  <TableCell className="font-medium">{item.product}</TableCell>
                  <TableCell className="text-right text-red-600 font-semibold">{item.roas}</TableCell>
                  <TableCell className="text-right">CHF {item.revenue}</TableCell>
                  <TableCell className="text-right">CHF {item.costs}</TableCell>
                  <TableCell className="text-right text-red-600 font-bold">CHF {item.loss}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
