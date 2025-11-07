import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeftIcon, Volume2, Download } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { exportSilentToCSV, SilentProductData } from "@/utils/csvExport";

export default function Silent() {
  const silentData: SilentProductData[] = [
    {
      id: "SL001",
      produktname: "Vintage Calculator V1",
      status: "Inaktiv",
      impressionen: "0",
      klicks: "0",
      conversions: "0",
      ursache: "Kampagne pausiert"
    },
    {
      id: "SL002",
      produktname: "Old Smartphone Model",
      status: "Inaktiv",
      impressionen: "0",
      klicks: "0",
      conversions: "0",
      ursache: "Kein Budget"
    },
    {
      id: "SL003",
      produktname: "Discontinued Headset",
      status: "Inaktiv",
      impressionen: "0",
      klicks: "0",
      conversions: "0",
      ursache: "Produkt eingestellt"
    }
  ];

  const handleExportCSV = () => {
    exportSilentToCSV(silentData, 'silent-products');
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
            <div className="p-2 bg-muted-foreground rounded-lg">
              <Volume2 className="h-6 w-6 text-muted" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
                Silent
                <Badge variant="secondary" className="bg-muted/10 text-muted-foreground">
                  Keine Aktivität
                </Badge>
              </h1>
              <p className="text-muted-foreground">Produkte ohne messbare Performance - keine Impressionen, Klicks oder Conversions.</p>
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
              <div className="text-2xl font-bold text-muted-foreground">5</div>
              <div className="text-sm text-muted-foreground">Produkte</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-muted-foreground">0</div>
              <div className="text-sm text-muted-foreground">Impressionen</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-muted-foreground">0</div>
              <div className="text-sm text-muted-foreground">Klicks</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-muted-foreground">0</div>
              <div className="text-sm text-muted-foreground">Conversions</div>
            </CardContent>
          </Card>
        </div>

        {/* No Activity Alert */}
        <Card className="bg-muted/5 border-muted">
          <CardContent className="p-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-muted-foreground mb-2">🔇 Keine Aktivität</div>
              <div className="text-muted-foreground">Diese Produkte haben keine messbaren Daten generiert</div>
              <div className="text-sm text-muted-foreground mt-2">Überprüfung der Kampagnen-Setup erforderlich</div>
            </div>
          </CardContent>
        </Card>

        {/* Detailed Performance Table */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-muted-foreground"></div>
                Silent - Detailansicht
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
                    <th className="text-center py-3 px-4 font-medium text-muted-foreground">Status</th>
                    <th className="text-center py-3 px-4 font-medium text-muted-foreground">Impressionen</th>
                    <th className="text-center py-3 px-4 font-medium text-muted-foreground">Klicks</th>
                    <th className="text-center py-3 px-4 font-medium text-muted-foreground">Conversions</th>
                    <th className="text-center py-3 px-4 font-medium text-muted-foreground">Mögliche Ursache</th>
                  </tr>
                </thead>
                <tbody>
                  {silentData.map((product) => (
                    <tr key={product.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                      <td className="py-4 px-4 font-mono text-sm text-muted-foreground">{product.id}</td>
                      <td className="py-4 px-4 font-medium">{product.produktname}</td>
                      <td className="text-center py-4 px-4">
                        <Badge variant="outline" className="text-muted-foreground">{product.status}</Badge>
                      </td>
                      <td className="text-center py-4 px-4 text-muted-foreground">{product.impressionen}</td>
                      <td className="text-center py-4 px-4 text-muted-foreground">{product.klicks}</td>
                      <td className="text-center py-4 px-4 text-muted-foreground">{product.conversions}</td>
                      <td className="text-center py-4 px-4 text-xs text-muted-foreground">{product.ursache}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Action Items */}
        <Card className="border-l-4 border-l-muted-foreground">
          <CardHeader>
            <CardTitle className="text-muted-foreground">Maßnahmen für Silent-Produkte</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              <li>• 🔍 Kampagnen-Status überprüfen (pausiert, deaktiviert?)</li>
              <li>• 💰 Budget-Allokation kontrollieren</li>
              <li>• 🎯 Targeting-Einstellungen validieren</li>
              <li>• 📦 Produktverfügbarkeit prüfen</li>
              <li>• 🔄 Kampagnen reaktivieren oder archivieren</li>
              <li>• 📊 Bei Bedarf komplett neue Kampagnen erstellen</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}