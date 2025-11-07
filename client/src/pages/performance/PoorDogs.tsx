import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeftIcon, AlertTriangle, Download } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { exportToCSV, ProductData } from "@/utils/csvExport";

export default function PoorDogs() {
  const poorDogsData: ProductData[] = [
    {
      id: "PD001",
      produktname: "Basic Tablet Model",
      impressionen: "80'000",
      klicks: "1'200",
      ctr: "1.50%",
      conversions: "85",
      value: "CHF 8'500",
      costs: "CHF 6'200",
      roas: "1.4"
    },
    {
      id: "PD002",
      produktname: "Standard Wireless Mouse",
      impressionen: "60'000",
      klicks: "900",
      ctr: "1.50%",
      conversions: "65",
      value: "CHF 6'500",
      costs: "CHF 4'800",
      roas: "1.4"
    },
    {
      id: "PD003",
      produktname: "Budget Smartphone",
      impressionen: "70'000",
      klicks: "1'050",
      ctr: "1.50%",
      conversions: "75",
      value: "CHF 7'500",
      costs: "CHF 5'500",
      roas: "1.4"
    }
  ];

  const handleExportCSV = () => {
    exportToCSV(poorDogsData, 'poor-dogs-products');
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
            <div className="p-2 bg-warning rounded-lg">
              <AlertTriangle className="h-6 w-6 text-warning-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
                Poor Dogs
                <Badge variant="secondary" className="bg-warning/10 text-warning">
                  Optimierungsbedarf
                </Badge>
              </h1>
              <p className="text-muted-foreground">Produkte mit mäßiger Performance - Potential zur Verbesserung vorhanden.</p>
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
              <div className="text-2xl font-bold text-warning">300</div>
              <div className="text-sm text-muted-foreground">Produkte</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-foreground">CHF 35'000</div>
              <div className="text-sm text-muted-foreground">Gesamtumsatz</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-foreground">CHF 25'000</div>
              <div className="text-sm text-muted-foreground">Gesamtkosten</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-warning">1.4</div>
              <div className="text-sm text-muted-foreground">Durchschnittliche ROAS</div>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Performance Table */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-warning"></div>
                Poor Dogs - Detailansicht
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
                  {poorDogsData.map((product) => (
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

        {/* Recommendations */}
        <Card className="border-l-4 border-l-warning">
          <CardHeader>
            <CardTitle className="text-warning">Optimierungsempfehlungen für Poor Dogs</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              <li>• A/B-Tests für Anzeigentexte und Bilder durchführen</li>
              <li>• Keyword-Strategie überarbeiten</li>
              <li>• Landing Pages optimieren</li>
              <li>• Zielgruppen-Targeting verfeinern</li>
              <li>• Budget temporär reduzieren und Optimierungen testen</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}