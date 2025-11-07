import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ShoppingCart, TrendingUp, DollarSign, Target } from "lucide-react";

// Top 10 products with highest costs
const highestCostProducts = [
  { rank: 1, name: "Premium Gaming Laptop RTX 4090", costs: 8450, impressions: 125000, clicks: 3200 },
  { rank: 2, name: "Professional DSLR Camera Kit", costs: 7890, impressions: 98000, clicks: 2890 },
  { rank: 3, name: "Ultra Premium Smartphone 512GB", costs: 7320, impressions: 156000, clicks: 4100 },
  { rank: 4, name: "High-End Workstation Monitor 32\"", costs: 6880, impressions: 87000, clicks: 2340 },
  { rank: 5, name: "Professional Audio Interface", costs: 6450, impressions: 76000, clicks: 2100 },
  { rank: 6, name: "Gaming Console Bundle Deluxe", costs: 6120, impressions: 112000, clicks: 3450 },
  { rank: 7, name: "Premium Wireless Headphones", costs: 5890, impressions: 94000, clicks: 2780 },
  { rank: 8, name: "High-Performance SSD 4TB", costs: 5650, impressions: 68000, clicks: 1890 },
  { rank: 9, name: "Smart Home Security System", costs: 5320, impressions: 85000, clicks: 2560 },
  { rank: 10, name: "Professional Tablet Pro 12.9\"", costs: 5100, impressions: 79000, clicks: 2230 },
];

// Top 10 products with most conversions
const mostConversionsProducts = [
  { rank: 1, name: "Wireless Bluetooth Earbuds", conversions: 2340, conversionRate: 8.2, clicks: 28500 },
  { rank: 2, name: "Smartphone Screen Protector", conversions: 2120, conversionRate: 7.8, clicks: 27180 },
  { rank: 3, name: "USB-C Fast Charging Cable", conversions: 1980, conversionRate: 9.1, clicks: 21760 },
  { rank: 4, name: "Portable Power Bank 20000mAh", conversions: 1850, conversionRate: 6.9, clicks: 26810 },
  { rank: 5, name: "Wireless Phone Charger", conversions: 1720, conversionRate: 7.3, clicks: 23560 },
  { rank: 6, name: "Bluetooth Speaker Compact", conversions: 1650, conversionRate: 6.2, clicks: 26610 },
  { rank: 7, name: "Gaming Mouse RGB", conversions: 1580, conversionRate: 8.9, clicks: 17750 },
  { rank: 8, name: "Mechanical Keyboard", conversions: 1520, conversionRate: 7.1, clicks: 21410 },
  { rank: 9, name: "Webcam HD 1080p", conversions: 1460, conversionRate: 6.8, clicks: 21470 },
  { rank: 10, name: "Phone Case Protective", conversions: 1390, conversionRate: 8.7, clicks: 15980 },
];

// Top 10 products with highest revenue
const highestRevenueProducts = [
  { rank: 1, name: "Premium Gaming Laptop RTX 4090", revenue: 142500, roas: 16.9, costs: 8450 },
  { rank: 2, name: "Ultra Premium Smartphone 512GB", revenue: 128900, roas: 17.6, costs: 7320 },
  { rank: 3, name: "Professional DSLR Camera Kit", revenue: 118200, roas: 15.0, costs: 7890 },
  { rank: 4, name: "Gaming Console Bundle Deluxe", revenue: 95600, roas: 15.6, costs: 6120 },
  { rank: 5, name: "High-End Workstation Monitor 32\"", revenue: 89400, roas: 13.0, costs: 6880 },
  { rank: 6, name: "Premium Wireless Headphones", revenue: 78900, roas: 13.4, costs: 5890 },
  { rank: 7, name: "Professional Audio Interface", revenue: 72300, roas: 11.2, costs: 6450 },
  { rank: 8, name: "Smart Home Security System", revenue: 68500, roas: 12.9, costs: 5320 },
  { rank: 9, name: "Professional Tablet Pro 12.9\"", revenue: 65200, roas: 12.8, costs: 5100 },
  { rank: 10, name: "High-Performance SSD 4TB", revenue: 61800, roas: 10.9, costs: 5650 },
];

export default function Products() {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <ShoppingCart className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-2xl font-bold text-foreground">Produkte</h1>
          <p className="text-muted-foreground">Top-Performance Übersichten für den Zeitraum 01.01. - 31.07.</p>
        </div>
      </div>

      {/* Top 10 Products with Highest Costs */}
      <Card className="shadow-sm hover-scale bg-gradient-to-br from-card to-card/50 border-border/50">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-red-500" />
            <CardTitle className="text-lg font-semibold text-foreground">10 Produkte mit den höchsten Kosten</CardTitle>
          </div>
          <p className="text-sm text-muted-foreground">Produkte mit den grössten Werbeausgaben</p>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12 font-semibold">#</TableHead>
                  <TableHead className="font-semibold">Produktname</TableHead>
                  <TableHead className="text-right font-semibold">Kosten</TableHead>
                  <TableHead className="text-right font-semibold">Impressionen</TableHead>
                  <TableHead className="text-right font-semibold">Klicks</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {highestCostProducts.map((product) => (
                  <TableRow key={product.rank} className="hover:bg-muted/50">
                    <TableCell className="font-medium">{product.rank}</TableCell>
                    <TableCell className="font-medium">{product.name}</TableCell>
                    <TableCell className="text-right font-semibold text-red-600">
                      CHF {product.costs.toLocaleString()}
                    </TableCell>
                    <TableCell className="text-right">{product.impressions.toLocaleString()}</TableCell>
                    <TableCell className="text-right">{product.clicks.toLocaleString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Top 10 Products with Most Conversions */}
      <Card className="shadow-sm hover-scale bg-gradient-to-br from-card to-card/50 border-border/50">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-2">
            <Target className="h-5 w-5 text-green-500" />
            <CardTitle className="text-lg font-semibold text-foreground">10 Produkte mit den meisten Conversions</CardTitle>
          </div>
          <p className="text-sm text-muted-foreground">Produkte mit der höchsten Anzahl an Conversions</p>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12 font-semibold">#</TableHead>
                  <TableHead className="font-semibold">Produktname</TableHead>
                  <TableHead className="text-right font-semibold">Conversions</TableHead>
                  <TableHead className="text-right font-semibold">Conversion Rate</TableHead>
                  <TableHead className="text-right font-semibold">Klicks</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mostConversionsProducts.map((product) => (
                  <TableRow key={product.rank} className="hover:bg-muted/50">
                    <TableCell className="font-medium">{product.rank}</TableCell>
                    <TableCell className="font-medium">{product.name}</TableCell>
                    <TableCell className="text-right font-semibold text-green-600">
                      {product.conversions.toLocaleString()}
                    </TableCell>
                    <TableCell className="text-right font-semibold text-blue-600">
                      {product.conversionRate}%
                    </TableCell>
                    <TableCell className="text-right">{product.clicks.toLocaleString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Top 10 Products with Highest Revenue */}
      <Card className="shadow-sm hover-scale bg-gradient-to-br from-card to-card/50 border-border/50">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-blue-500" />
            <CardTitle className="text-lg font-semibold text-foreground">10 Produkte mit dem grössten Umsatz</CardTitle>
          </div>
          <p className="text-sm text-muted-foreground">Produkte mit dem höchsten generierten Umsatz</p>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12 font-semibold">#</TableHead>
                  <TableHead className="font-semibold">Produktname</TableHead>
                  <TableHead className="text-right font-semibold">Umsatz</TableHead>
                  <TableHead className="text-right font-semibold">ROAS</TableHead>
                  <TableHead className="text-right font-semibold">Kosten</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {highestRevenueProducts.map((product) => (
                  <TableRow key={product.rank} className="hover:bg-muted/50">
                    <TableCell className="font-medium">{product.rank}</TableCell>
                    <TableCell className="font-medium">{product.name}</TableCell>
                    <TableCell className="text-right font-semibold text-green-600">
                      CHF {product.revenue.toLocaleString()}
                    </TableCell>
                    <TableCell className="text-right font-semibold text-blue-600">
                      {product.roas}x
                    </TableCell>
                    <TableCell className="text-right font-semibold text-red-600">
                      CHF {product.costs.toLocaleString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}