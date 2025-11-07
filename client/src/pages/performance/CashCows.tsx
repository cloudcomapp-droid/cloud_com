import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeftIcon, TrendingUp, Download } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { exportToCSV, ProductData } from "@/utils/csvExport";

export default function CashCows() {
  const cashCowsData: ProductData[] = [
    {
      id: "CC001",
      produktname: "Premium Smartphone XY",
      impressionen: "150'000",
      klicks: "3'500",
      ctr: "2.33%",
      conversions: "420",
      value: "CHF 42'000",
      costs: "CHF 5'000",
      roas: "8.4"
    },
    {
      id: "CC002",
      produktname: "Laptop Pro Series",
      impressionen: "120'000",
      klicks: "2'800",
      ctr: "2.50%",
      conversions: "380",
      value: "CHF 38'000",
      costs: "CHF 4'800",
      roas: "7.9"
    },
    {
      id: "CC003",
      produktname: "Designer Headphones",
      impressionen: "90'000",
      klicks: "2'200",
      ctr: "2.44%",
      conversions: "280",
      value: "CHF 28'000",
      costs: "CHF 3'500",
      roas: "8.0"
    }
  ];

  const handleExportCSV = () => {
    exportToCSV(cashCowsData, 'cash-cows-products');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-4 mb-4">
            <Link to="/performance">
              <Button variant="ghost" size="sm">
                <ArrowLeftIcon className="h-4 w-4 mr-2" />
                Zurück zu Performance-Übersicht
              </Button>
            </Link>
          </div>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-success rounded-lg">
              <TrendingUp className="h-6 w-6 text-success-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
                Cash Cows
                <Badge variant="secondary" className="bg-success/10 text-success">
                  Beste Performance
                </Badge>
              </h1>
              <p className="text-muted-foreground">Hochprofitable Produkte mit ausgezeichneter ROAS-Performance.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Category Details */}
      <div className="container mx-auto px-4 py-8 space-y-6">
        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-success">250</div>
              <div className="text-sm text-muted-foreground">Produkte</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-foreground">CHF 280'000</div>
              <div className="text-sm text-muted-foreground">Gesamtumsatz</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-foreground">CHF 40'000</div>
              <div className="text-sm text-muted-foreground">Gesamtkosten</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-success">7.0</div>
              <div className="text-sm text-muted-foreground">Durchschnittliche ROAS</div>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Performance Table */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-success"></div>
                Cash Cows - Detailansicht
              </CardTitle>
              <Button onClick={handleExportCSV} variant="outline" size="sm" className="gap-2">
                <Download className="h-4 w-4" />
                CSV Export
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">ID</th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">Produktname</th>
                    <th className="text-center py-3 px-4 font-medium text-muted-foreground">Impressionen</th>
                    <th className="text-center py-3 px-4 font-medium text-muted-foreground">Klicks</th>
                    <th className="text-center py-3 px-4 font-medium text-muted-foreground">CTR</th>
                    <th className="text-center py-3 px-4 font-medium text-muted-foreground">Conversions</th>
                    <th className="text-center py-3 px-4 font-medium text-muted-foreground">Value</th>
                    <th className="text-center py-3 px-4 font-medium text-muted-foreground">Costs</th>
                    <th className="text-center py-3 px-4 font-medium text-muted-foreground">ROAS</th>
                  </tr>
                </thead>
                <tbody>
                  {cashCowsData.map((product) => (
                    <tr key={product.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                      <td className="py-4 px-4 font-mono text-sm text-muted-foreground">{product.id}</td>
                      <td className="py-4 px-4 font-medium">{product.produktname}</td>
                      <td className="text-center py-4 px-4">{product.impressionen}</td>
                      <td className="text-center py-4 px-4">{product.klicks}</td>
                      <td className="text-center py-4 px-4">{product.ctr}</td>
                      <td className="text-center py-4 px-4">{product.conversions}</td>
                      <td className="text-center py-4 px-4">{product.value}</td>
                      <td className="text-center py-4 px-4">{product.costs}</td>
                      <td className="text-center py-4 px-4">
                        <Badge variant="secondary" className="bg-success/10 text-success">{product.roas}</Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Recommendations */}
        <Card className="border-l-4 border-l-success">
          <CardHeader>
            <CardTitle className="text-success">Empfehlungen für Cash Cows</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              <li>• Budget erhöhen, um noch mehr Traffic zu generieren</li>
              <li>• Ähnliche Produkte identifizieren und bewerben</li>
              <li>• Cross-Selling-Strategien implementieren</li>
              <li>• Diese Erfolgsstrategien auf andere Kategorien anwenden</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}