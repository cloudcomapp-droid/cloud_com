import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { TrendingUp, TrendingDown, DollarSign, Target, ArrowUpDown, Download } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import CategoryDetails from "@/components/CategoryDetails";

const tableData = [
  {
    category: "Alle",
    categoryColor: "primary",
    count: 1500,
    impressions: "2'350'000",
    clicks: "45'000",
    ctr: "1.91%",
    conversions: 4200,
    value: "CHF 420'000",
    costs: "CHF 105'000",
    roas: 4.0
  },
  {
    category: "Cash Cows",
    categoryColor: "cash-cow",
    count: 250,
    impressions: "900'000",
    clicks: "22'000",
    ctr: "2.44%",
    conversions: 2800,
    value: "CHF 280'000",
    costs: "CHF 40'000",
    roas: 7.0
  },
  {
    category: "Poor Dogs",
    categoryColor: "poor-dog",
    count: 300,
    impressions: "600'000",
    clicks: "9'000",
    ctr: "1.50%",
    conversions: 700,
    value: "CHF 35'000",
    costs: "CHF 25'000",
    roas: 1.4
  },
  {
    category: "Hopeless",
    categoryColor: "hopeless",
    count: 150,
    impressions: "300'000",
    clicks: "5'000",
    ctr: "1.67%",
    conversions: 300,
    value: "CHF 9'000",
    costs: "CHF 15'000",
    roas: 0.6
  },
  {
    category: "Numb",
    categoryColor: "numb",
    count: 500,
    impressions: "400'000",
    clicks: "6'000",
    ctr: "1.50%",
    conversions: 300,
    value: "CHF 12'000",
    costs: "CHF 8'000",
    roas: 1.5
  },
  {
    category: "Silent",
    categoryColor: "silent",
    count: 5,
    impressions: "0",
    clicks: "0",
    ctr: "0.00%",
    conversions: 0,
    value: "CHF 0",
    costs: "CHF 0",
    roas: 0.0
  }
];

const barChartData = tableData.slice(1).map(item => ({
  name: item.category,
  roas: item.roas,
  value: parseInt(item.value.replace(/[^\d]/g, '')),
  fill: `hsl(var(--${item.categoryColor}))`
}));

const pieChartData = tableData.slice(1).map(item => ({
  name: item.category,
  value: item.count,
  fill: `hsl(var(--${item.categoryColor}))`
}));

export default function ResultsOverview() {
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' } | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  const handleSort = (key: string) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedData = [...tableData].sort((a, b) => {
    if (!sortConfig) return 0;
    
    const { key, direction } = sortConfig;
    let aValue: any = a[key as keyof typeof a];
    let bValue: any = b[key as keyof typeof b];
    
    // Handle numeric values
    if (key === 'count' || key === 'conversions' || key === 'roas') {
      aValue = typeof aValue === 'number' ? aValue : parseFloat(aValue.toString().replace(/[^\d.]/g, ''));
      bValue = typeof bValue === 'number' ? bValue : parseFloat(bValue.toString().replace(/[^\d.]/g, ''));
    }
    
    // Handle formatted numbers like impressions, clicks
    if (key === 'impressions' || key === 'clicks') {
      aValue = parseInt(aValue.toString().replace(/[^\d]/g, ''));
      bValue = parseInt(bValue.toString().replace(/[^\d]/g, ''));
    }
    
    // Handle currency values
    if (key === 'value' || key === 'costs') {
      aValue = parseInt(aValue.toString().replace(/[^\d]/g, ''));
      bValue = parseInt(bValue.toString().replace(/[^\d]/g, ''));
    }
    
    // Handle CTR percentage
    if (key === 'ctr') {
      aValue = parseFloat(aValue.toString().replace('%', ''));
      bValue = parseFloat(bValue.toString().replace('%', ''));
    }
    
    if (aValue < bValue) return direction === 'asc' ? -1 : 1;
    if (aValue > bValue) return direction === 'asc' ? 1 : -1;
    return 0;
  });

  // Find the highest ROAS
  const highestROAS = Math.max(...tableData.map(item => item.roas));

  if (selectedCategory) {
    return <CategoryDetails category={selectedCategory} onBack={() => setSelectedCategory(null)} />;
  }
  return (
    <div className="space-y-6">
      {/* Force refresh - v2 */}
      <div>
        <h2 className="text-2xl font-semibold text-foreground mb-2">Dein Analyse-Ergebnis</h2>
        <p className="text-muted-foreground">Sieh auf einen Blick, welche Kategorien Gewinn bringen – und wo dein Budget verloren geht.</p>
      </div>

      {/* Performance Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Performance-Übersicht
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead 
                    className="cursor-pointer hover:bg-muted/50"
                    onClick={() => handleSort('category')}
                  >
                    <div className="flex items-center gap-1">
                      Kategorie
                      <ArrowUpDown className="h-4 w-4" />
                    </div>
                  </TableHead>
                  <TableHead 
                    className="text-right cursor-pointer hover:bg-muted/50"
                    onClick={() => handleSort('count')}
                  >
                    <div className="flex items-center justify-end gap-1">
                      Anzahl Produkte
                      <ArrowUpDown className="h-4 w-4" />
                    </div>
                  </TableHead>
                  <TableHead 
                    className="text-right cursor-pointer hover:bg-muted/50"
                    onClick={() => handleSort('impressions')}
                  >
                    <div className="flex items-center justify-end gap-1">
                      Impressionen
                      <ArrowUpDown className="h-4 w-4" />
                    </div>
                  </TableHead>
                  <TableHead 
                    className="text-right cursor-pointer hover:bg-muted/50"
                    onClick={() => handleSort('clicks')}
                  >
                    <div className="flex items-center justify-end gap-1">
                      Klicks
                      <ArrowUpDown className="h-4 w-4" />
                    </div>
                  </TableHead>
                  <TableHead 
                    className="text-right cursor-pointer hover:bg-muted/50"
                    onClick={() => handleSort('ctr')}
                  >
                    <div className="flex items-center justify-end gap-1">
                      CTR
                      <ArrowUpDown className="h-4 w-4" />
                    </div>
                  </TableHead>
                  <TableHead 
                    className="text-right cursor-pointer hover:bg-muted/50"
                    onClick={() => handleSort('conversions')}
                  >
                    <div className="flex items-center justify-end gap-1">
                      Conversions
                      <ArrowUpDown className="h-4 w-4" />
                    </div>
                  </TableHead>
                  <TableHead 
                    className="text-right cursor-pointer hover:bg-muted/50"
                    onClick={() => handleSort('value')}
                  >
                    <div className="flex items-center justify-end gap-1">
                      Value
                      <ArrowUpDown className="h-4 w-4" />
                    </div>
                  </TableHead>
                  <TableHead 
                    className="text-right cursor-pointer hover:bg-muted/50"
                    onClick={() => handleSort('costs')}
                  >
                    <div className="flex items-center justify-end gap-1">
                      Costs
                      <ArrowUpDown className="h-4 w-4" />
                    </div>
                  </TableHead>
                  <TableHead 
                    className="text-right cursor-pointer hover:bg-muted/50"
                    onClick={() => handleSort('roas')}
                  >
                    <div className="flex items-center justify-end gap-1">
                      ROAS
                      <ArrowUpDown className="h-4 w-4" />
                    </div>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedData.map((row, index) => (
                  <TableRow 
                    key={row.category} 
                    className={`${row.category === "Alle" ? "font-semibold bg-muted/50" : ""} animate-fade-in`}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-3 h-3 rounded-full animate-pulse"
                          style={{ backgroundColor: `hsl(var(--${row.categoryColor}))` }}
                        />
                        {row.category === "Alle" ? (
                          <span>{row.category}</span>
                        ) : (
                          <button 
                            onClick={() => setSelectedCategory(row.category)}
                            className="text-left hover:underline text-primary hover:text-primary-hover"
                          >
                            {row.category}
                          </button>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">{row.count.toLocaleString('de-CH')}</TableCell>
                    <TableCell className="text-right">{row.impressions}</TableCell>
                    <TableCell className="text-right">{row.clicks}</TableCell>
                    <TableCell className="text-right">{row.ctr}</TableCell>
                    <TableCell className="text-right">{row.conversions.toLocaleString('de-CH')}</TableCell>
                    <TableCell className="text-right">{row.value}</TableCell>
                    <TableCell className="text-right">{row.costs}</TableCell>
                    <TableCell className="text-right">
                      <Badge 
                        variant={row.roas >= 3 ? "default" : row.roas >= 1 ? "secondary" : "destructive"}
                        className={row.roas === highestROAS && row.roas > 0 ? "bg-success text-success-foreground" : ""}
                      >
                        {row.roas.toFixed(1)}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              ROAS nach Kategorien
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={barChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                <YAxis />
                <Tooltip 
                  formatter={(value, name) => [
                    name === 'roas' ? `${value}x` : `CHF ${value.toLocaleString('de-CH')}`,
                    name === 'roas' ? 'ROAS' : 'Value'
                  ]}
                />
                <Bar 
                  dataKey="roas" 
                  radius={[4, 4, 0, 0]} 
                  className="animate-fade-in"
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingDown className="h-5 w-5" />
              Produktverteilung
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieChartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  dataKey="value"
                  className="animate-scale-in"
                >
                  {pieChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value} Produkte`, 'Anzahl']} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}