import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeftIcon, XCircle, Download } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { exportToCSV, ProductData } from "@/utils/csvExport";

export default function Hopeless() {
  const hopelessData: ProductData[] = [
    {
      id: "HL001",
      produktname: "Outdated Phone Case",
      impressionen: "45'000",
      klicks: "750",
      ctr: "1.67%",
      conversions: "15",
      value: "CHF 1'500",
      costs: "CHF 2'500",
      roas: "0.6"
    },
    {
      id: "HL002",
      produktname: "Legacy Charger",
      impressionen: "40'000",
      klicks: "668",
      ctr: "1.67%",
      conversions: "12",
      value: "CHF 1'200",
      costs: "CHF 2'000",
      roas: "0.6"
    },
    {
      id: "HL003",
      produktname: "Basic Calculator",
      impressionen: "35'000",
      klicks: "584",
      ctr: "1.67%",
      conversions: "10",
      value: "CHF 1'000",
      costs: "CHF 1'800",
      roas: "0.6"
    }
  ];

  const handleExportCSV = () => {
    exportToCSV(hopelessData, 'hopeless-products');
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
            <div className="p-2 bg-destructive rounded-lg">
              <XCircle className="h-6 w-6 text-destructive-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
                Hopeless
                <Badge variant="secondary" className="bg-destructive/10 text-destructive">
                  Budget verbrennen
                </Badge>
              </h1>
              <p className="text-muted-foreground">Produkte mit sehr schlechter Performance - Budget wird verbrannt.</p>
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
              <div className="text-2xl font-bold text-destructive">150</div>
              <div className="text-sm text-muted-foreground">Produkte</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-foreground">CHF 9'000</div>
              <div className="text-sm text-muted-foreground">Gesamtumsatz</div>
            </CardContent>
          </Card>
          <Card className="border-destructive/20">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-destructive">CHF 15'000</div>
              <div className="text-sm text-muted-foreground">Gesamtkosten</div>
            </CardContent>
          </Card>
          <Card className="border-destructive/20">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-destructive">0.6</div>
              <div className="text-sm text-muted-foreground">Durchschnittliche ROAS</div>
            </CardContent>
          </Card>
        </div>

        {/* Loss Highlight */}
        <Card className="bg-destructive/5 border-destructive/20">
          <CardContent className="p-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-destructive mb-2">CHF -6'000</div>
              <div className="text-muted-foreground">Monatlicher Verlust durch diese Kategorie</div>
              <div className="text-sm text-destructive mt-2">💰 Einsparpotenzial: CHF 15'000 pro Monat</div>
            </div>
          </CardContent>
        </Card>

        {/* Detailed Performance Table */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-destructive"></div>
                Hopeless - Detailansicht
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
                  {hopelessData.map((product) => (
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
                        <Badge variant="destructive">{product.roas}</Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Critical Actions */}
        <Card className="border-l-4 border-l-destructive">
          <CardHeader>
            <CardTitle className="text-destructive">Sofortige Maßnahmen erforderlich</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              <li>• 🛑 Kampagnen für diese Produkte sofort pausieren</li>
              <li>• 💰 Monatliche Ersparnis: CHF 15'000</li>
              <li>• 📊 Budget auf Cash Cows umleiten</li>
              <li>• 🔄 Produkte komplett überarbeiten oder aus Sortiment nehmen</li>
              <li>• 📈 Gesparte Mittel in profitable Kategorien investieren</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}