import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeftIcon, BarChart3, Download } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { exportToCSV, ProductData } from "@/utils/csvExport";

export default function Numb() {
  const numbData: ProductData[] = [
    {
      id: "NB001",
      produktname: "Standard Keyboard",
      impressionen: "50'000",
      klicks: "750",
      ctr: "1.50%",
      conversions: "38",
      value: "CHF 1'900",
      costs: "CHF 1'300",
      roas: "1.5"
    },
    {
      id: "NB002",
      produktname: "Office Chair Basic",
      impressionen: "45'000",
      klicks: "675",
      ctr: "1.50%",
      conversions: "34",
      value: "CHF 1'700",
      costs: "CHF 1'150",
      roas: "1.5"
    },
    {
      id: "NB003",
      produktname: "USB Drive 32GB",
      impressionen: "40'000",
      klicks: "600",
      ctr: "1.50%",
      conversions: "30",
      value: "CHF 1'500",
      costs: "CHF 1'000",
      roas: "1.5"
    }
  ];

  const handleExportCSV = () => {
    exportToCSV(numbData, 'numb-products');
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
            <div className="p-2 bg-muted rounded-lg">
              <BarChart3 className="h-6 w-6 text-muted-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
                Numb
                <Badge variant="secondary" className="bg-muted/10 text-muted-foreground">
                  Neutrale Performance
                </Badge>
              </h1>
              <p className="text-muted-foreground">Produkte mit durchschnittlicher Performance - weder besonders gut noch schlecht.</p>
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
              <div className="text-2xl font-bold text-muted-foreground">500</div>
              <div className="text-sm text-muted-foreground">Produkte</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-foreground">CHF 12'000</div>
              <div className="text-sm text-muted-foreground">Gesamtumsatz</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-foreground">CHF 8'000</div>
              <div className="text-sm text-muted-foreground">Gesamtkosten</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-warning">1.5</div>
              <div className="text-sm text-muted-foreground">Durchschnittliche ROAS</div>
            </CardContent>
          </Card>
        </div>

        {/* Break-even Analysis */}
        <Card className="bg-muted/5">
          <CardContent className="p-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-foreground mb-2">CHF +4'000</div>
              <div className="text-muted-foreground">Monatlicher Gewinn (Break-even Level)</div>
              <div className="text-sm text-muted-foreground mt-2">📊 Potential zur Optimierung vorhanden</div>
            </div>
          </CardContent>
        </Card>

        {/* Detailed Performance Table */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-muted"></div>
                Numb - Detailansicht
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
                  {numbData.map((product) => (
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
                        <Badge variant="secondary" className="bg-warning/10 text-warning">{product.roas}</Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Optimization Potential */}
        <Card className="border-l-4 border-l-muted">
          <CardHeader>
            <CardTitle className="text-muted-foreground">Optimierungspotential für Numb-Produkte</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              <li>• 📈 Kleinere Optimierungen können große Wirkung haben</li>
              <li>• 🎯 Zielgruppen-Targeting verfeinern</li>
              <li>• 💡 Kreative Assets testen</li>
              <li>• 📊 Conversion-Rate-Optimierung durchführen</li>
              <li>• ⚖️ Budget-Allokation überprüfen</li>
              <li>• 🔄 Saisonale Trends beobachten</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}