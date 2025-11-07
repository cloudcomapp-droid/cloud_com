import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { FileText, TrendingUp, DollarSign } from "lucide-react";

// Sample asset groups data
const assetGroupsData = [
  {
    name: "Premium Smartphones",
    clicks: 45678,
    impressions: 892345,
    conversions: 1234,
    revenue: 78500,
    roas: 4.2,
    costs: 18690,
  },
  {
    name: "Gaming Laptops",
    clicks: 32145,
    impressions: 654321,
    conversions: 876,
    revenue: 65200,
    roas: 3.8,
    costs: 17160,
  },
  {
    name: "Wireless Audio",
    clicks: 28934,
    impressions: 543210,
    conversions: 698,
    revenue: 42300,
    roas: 3.1,
    costs: 13645,
  },
  {
    name: "Smart Watches",
    clicks: 23567,
    impressions: 456789,
    conversions: 445,
    revenue: 28900,
    roas: 2.8,
    costs: 10320,
  },
  {
    name: "4K Monitors",
    clicks: 19823,
    impressions: 398765,
    conversions: 334,
    revenue: 22100,
    roas: 2.5,
    costs: 8840,
  },
];

// Sample revenue data for each asset group over Jan-Jul
const revenueDataByGroup = {
  "Premium Smartphones": [
    { name: "Jan", value: 9800 },
    { name: "Feb", value: 10200 },
    { name: "Mrz", value: 11500 },
    { name: "Apr", value: 10800 },
    { name: "Mai", value: 12300 },
    { name: "Jun", value: 11900 },
    { name: "Jul", value: 12000 },
  ],
  "Gaming Laptops": [
    { name: "Jan", value: 8200 },
    { name: "Feb", value: 8800 },
    { name: "Mrz", value: 9100 },
    { name: "Apr", value: 9600 },
    { name: "Mai", value: 10200 },
    { name: "Jun", value: 9800 },
    { name: "Jul", value: 9500 },
  ],
  "Wireless Audio": [
    { name: "Jan", value: 5400 },
    { name: "Feb", value: 5800 },
    { name: "Mrz", value: 6200 },
    { name: "Apr", value: 5900 },
    { name: "Mai", value: 6500 },
    { name: "Jun", value: 6300 },
    { name: "Jul", value: 6100 },
  ],
  "Smart Watches": [
    { name: "Jan", value: 3800 },
    { name: "Feb", value: 4100 },
    { name: "Mrz", value: 4300 },
    { name: "Apr", value: 4000 },
    { name: "Mai", value: 4400 },
    { name: "Jun", value: 4200 },
    { name: "Jul", value: 4100 },
  ],
  "4K Monitors": [
    { name: "Jan", value: 2900 },
    { name: "Feb", value: 3100 },
    { name: "Mrz", value: 3300 },
    { name: "Apr", value: 3200 },
    { name: "Mai", value: 3400 },
    { name: "Jun", value: 3300 },
    { name: "Jul", value: 2900 },
  ],
};

// Sample cost data for each asset group over Jan-Jul
const costDataByGroup = {
  "Premium Smartphones": [
    { name: "Jan", value: 2300 },
    { name: "Feb", value: 2500 },
    { name: "Mrz", value: 2800 },
    { name: "Apr", value: 2600 },
    { name: "Mai", value: 2900 },
    { name: "Jun", value: 2750 },
    { name: "Jul", value: 2840 },
  ],
  "Gaming Laptops": [
    { name: "Jan", value: 2100 },
    { name: "Feb", value: 2300 },
    { name: "Mrz", value: 2400 },
    { name: "Apr", value: 2500 },
    { name: "Mai", value: 2650 },
    { name: "Jun", value: 2560 },
    { name: "Jul", value: 2650 },
  ],
  "Wireless Audio": [
    { name: "Jan", value: 1700 },
    { name: "Feb", value: 1850 },
    { name: "Mrz", value: 2000 },
    { name: "Apr", value: 1900 },
    { name: "Mai", value: 2100 },
    { name: "Jun", value: 2045 },
    { name: "Jul", value: 2050 },
  ],
  "Smart Watches": [
    { name: "Jan", value: 1300 },
    { name: "Feb", value: 1420 },
    { name: "Mrz", value: 1500 },
    { name: "Apr", value: 1450 },
    { name: "Mai", value: 1600 },
    { name: "Jun", value: 1550 },
    { name: "Jul", value: 1500 },
  ],
  "4K Monitors": [
    { name: "Jan", value: 1150 },
    { name: "Feb", value: 1220 },
    { name: "Mrz", value: 1300 },
    { name: "Apr", value: 1280 },
    { name: "Mai", value: 1350 },
    { name: "Jun", value: 1320 },
    { name: "Jul", value: 1220 },
  ],
};

const colors = ["#3B82F6", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6"];

export default function AssetGroups() {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <FileText className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-2xl font-bold text-foreground">Asset Gruppen</h1>
          <p className="text-muted-foreground">Performance-Übersicht der Asset Gruppen für den Zeitraum 01.01. - 31.07.</p>
        </div>
      </div>

      {/* Performance Table */}
      <Card className="shadow-sm hover-scale bg-gradient-to-br from-card to-card/50 border-border/50">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg font-semibold text-foreground">Asset Gruppen Performance</CardTitle>
          <p className="text-sm text-muted-foreground">Übersicht der wichtigsten Leistungskennzahlen</p>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="font-semibold">Name der Asset Gruppe</TableHead>
                  <TableHead className="text-right font-semibold">Klicks</TableHead>
                  <TableHead className="text-right font-semibold">Impressionen</TableHead>
                  <TableHead className="text-right font-semibold">Conversions</TableHead>
                  <TableHead className="text-right font-semibold">Umsatz</TableHead>
                  <TableHead className="text-right font-semibold">ROAS</TableHead>
                  <TableHead className="text-right font-semibold">Kosten</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {assetGroupsData.map((group, index) => (
                  <TableRow key={group.name} className="hover:bg-muted/50">
                    <TableCell className="font-medium">{group.name}</TableCell>
                    <TableCell className="text-right">{group.clicks.toLocaleString()}</TableCell>
                    <TableCell className="text-right">{group.impressions.toLocaleString()}</TableCell>
                    <TableCell className="text-right">{group.conversions.toLocaleString()}</TableCell>
                    <TableCell className="text-right font-semibold text-green-600">
                      CHF {group.revenue.toLocaleString()}
                    </TableCell>
                    <TableCell className="text-right font-semibold text-blue-600">
                      {group.roas}x
                    </TableCell>
                    <TableCell className="text-right font-semibold text-red-600">
                      CHF {group.costs.toLocaleString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Revenue and Cost Trends Charts */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Revenue Trends Chart */}
        <Card className="shadow-sm hover-scale bg-gradient-to-br from-card to-card/50 border-border/50">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-green-500" />
              <CardTitle className="text-base font-semibold text-foreground">Umsatzverlauf pro Asset Gruppe</CardTitle>
            </div>
            <p className="text-sm text-muted-foreground">Entwicklung des Umsatzes über den Zeitraum</p>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
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
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                      fontSize: "12px"
                    }}
                    formatter={(value, name) => [`CHF ${value.toLocaleString()}`, name as string]}
                  />
                  {Object.entries(revenueDataByGroup).map(([groupName, data], index) => (
                    <Line
                      key={groupName}
                      data={data}
                      type="monotone"
                      dataKey="value"
                      stroke={colors[index]}
                      strokeWidth={2}
                      name={groupName}
                      dot={{ fill: colors[index], strokeWidth: 2, r: 3 }}
                      activeDot={{ r: 4, stroke: colors[index], strokeWidth: 2, fill: colors[index] }}
                    />
                  ))}
                </LineChart>
              </ResponsiveContainer>
            </div>
            {/* Legend */}
            <div className="flex flex-wrap gap-4 mt-4 text-xs">
              {Object.keys(revenueDataByGroup).map((groupName, index) => (
                <div key={groupName} className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: colors[index] }}
                  />
                  <span className="text-muted-foreground">{groupName}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Cost Trends Chart */}
        <Card className="shadow-sm hover-scale bg-gradient-to-br from-card to-card/50 border-border/50">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-red-500" />
              <CardTitle className="text-base font-semibold text-foreground">Kostenverlauf pro Asset Gruppe</CardTitle>
            </div>
            <p className="text-sm text-muted-foreground">Entwicklung der Kosten über den Zeitraum</p>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
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
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                      fontSize: "12px"
                    }}
                    formatter={(value, name) => [`CHF ${value.toLocaleString()}`, name as string]}
                  />
                  {Object.entries(costDataByGroup).map(([groupName, data], index) => (
                    <Line
                      key={groupName}
                      data={data}
                      type="monotone"
                      dataKey="value"
                      stroke={colors[index]}
                      strokeWidth={2}
                      name={groupName}
                      dot={{ fill: colors[index], strokeWidth: 2, r: 3 }}
                      activeDot={{ r: 4, stroke: colors[index], strokeWidth: 2, fill: colors[index] }}
                    />
                  ))}
                </LineChart>
              </ResponsiveContainer>
            </div>
            {/* Legend */}
            <div className="flex flex-wrap gap-4 mt-4 text-xs">
              {Object.keys(costDataByGroup).map((groupName, index) => (
                <div key={groupName} className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: colors[index] }}
                  />
                  <span className="text-muted-foreground">{groupName}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}