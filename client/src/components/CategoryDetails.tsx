import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Download, ArrowUpDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

interface CategoryDetailsProps {
  category: string;
  onBack: () => void;
}

// Sample detailed product data
const generateProductData = (category: string) => {
  const products = [];
  const count = category === "Cash Cows" ? 250 : category === "Poor Dogs" ? 300 : category === "Hopeless" ? 150 : category === "Numb" ? 500 : 5;
  
  for (let i = 1; i <= Math.min(20, count); i++) {
    if (category === "Silent") {
      products.push({
        campaign: `Kampagne Silent ${i}`,
        productId: `PSI${String(i).padStart(4, '0')}`,
        productTitle: `Silent Produkt ${i}`,
        impressions: 0,
        clicks: 0,
        ctr: "0.00%",
        conversions: 0,
        value: 0,
        costs: 0,
        roas: 0.0
      });
    } else {
      const baseROAS = category === "Cash Cows" ? 7 : category === "Poor Dogs" ? 1.4 : category === "Hopeless" ? 0.6 : category === "Numb" ? 1.5 : 2.0;
      const variation = (Math.random() - 0.5) * 0.4;
      const roas = Math.max(0.1, baseROAS + variation);
      
      products.push({
        campaign: `Kampagne ${category.charAt(0)}${i}`,
        productId: `P${category.slice(0,2).toUpperCase()}${String(i).padStart(4, '0')}`,
        productTitle: `Produkt ${category} ${i} - Premium Edition`,
        impressions: Math.floor(Math.random() * 50000) + 10000,
        clicks: Math.floor(Math.random() * 2000) + 100,
        ctr: ((Math.random() * 3) + 1).toFixed(2) + "%",
        conversions: Math.floor(Math.random() * 100) + 5,
        value: Math.floor(Math.random() * 5000) + 500,
        costs: Math.floor(Math.random() * 2000) + 200,
        roas: roas
      });
    }
  }
  
  return products;
};

export default function CategoryDetails({ category, onBack }: CategoryDetailsProps) {
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' } | null>(null);
  const productData = generateProductData(category);

  const handleSort = (key: string) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedData = [...productData].sort((a, b) => {
    if (!sortConfig) return 0;
    
    const { key, direction } = sortConfig;
    let aValue: any = a[key as keyof typeof a];
    let bValue: any = b[key as keyof typeof b];
    
    // Handle numeric values
    if (key === 'impressions' || key === 'clicks' || key === 'conversions' || key === 'value' || key === 'costs' || key === 'roas') {
      aValue = typeof aValue === 'number' ? aValue : parseFloat(aValue.toString().replace(/[^\d.]/g, ''));
      bValue = typeof bValue === 'number' ? bValue : parseFloat(bValue.toString().replace(/[^\d.]/g, ''));
    }
    
    if (aValue < bValue) return direction === 'asc' ? -1 : 1;
    if (aValue > bValue) return direction === 'asc' ? 1 : -1;
    return 0;
  });

  const handleDownload = () => {
    const headers = ['Kampagnenname', 'Produkt ID', 'Produkt Titel', 'Impressionen', 'Clicks', 'CTR', 'Conversions', 'Value', 'Costs', 'ROAS'];
    const csvContent = [
      headers.join(','),
      ...sortedData.map(row => [
        row.campaign,
        row.productId,
        `"${row.productTitle}"`,
        row.impressions,
        row.clicks,
        row.ctr,
        row.conversions,
        `CHF ${row.value}`,
        `CHF ${row.costs}`,
        row.roas.toFixed(2)
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${category}_details.csv`;
    link.click();
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={onBack} className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Zurück zur Übersicht
          </Button>
          <div>
            <h2 className="text-2xl font-semibold text-foreground">{category} - Detailansicht</h2>
            <p className="text-muted-foreground">Produktliste mit Performance-Metriken</p>
          </div>
        </div>
        <Button onClick={handleDownload} className="flex items-center gap-2">
          <Download className="h-4 w-4" />
          CSV Download
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Produktdetails - {category}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead 
                    className="cursor-pointer hover:bg-muted/50"
                    onClick={() => handleSort('campaign')}
                  >
                    <div className="flex items-center gap-1">
                      Kampagnenname
                      <ArrowUpDown className="h-4 w-4" />
                    </div>
                  </TableHead>
                  <TableHead 
                    className="cursor-pointer hover:bg-muted/50"
                    onClick={() => handleSort('productId')}
                  >
                    <div className="flex items-center gap-1">
                      Produkt ID
                      <ArrowUpDown className="h-4 w-4" />
                    </div>
                  </TableHead>
                  <TableHead>Produkt Titel</TableHead>
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
                      Clicks
                      <ArrowUpDown className="h-4 w-4" />
                    </div>
                  </TableHead>
                  <TableHead className="text-right">CTR</TableHead>
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
                    key={row.productId}
                    className="animate-fade-in"
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    <TableCell className="font-medium">{row.campaign}</TableCell>
                    <TableCell>{row.productId}</TableCell>
                    <TableCell className="max-w-xs truncate">{row.productTitle}</TableCell>
                    <TableCell className="text-right">{row.impressions.toLocaleString('de-CH')}</TableCell>
                    <TableCell className="text-right">{row.clicks.toLocaleString('de-CH')}</TableCell>
                    <TableCell className="text-right">{row.ctr}</TableCell>
                    <TableCell className="text-right">{row.conversions.toLocaleString('de-CH')}</TableCell>
                     <TableCell className="text-right">CHF {row.value.toLocaleString('de-CH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</TableCell>
                     <TableCell className="text-right">CHF {row.costs.toLocaleString('de-CH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</TableCell>
                    <TableCell className="text-right">
                      <Badge variant={row.roas >= 3 ? "default" : row.roas >= 1 ? "secondary" : "destructive"}>
                        {row.roas.toFixed(2)}
                      </Badge>
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