import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { BarChart3, TrendingUp, Activity, ArrowDownRight, ArrowUpRight, ShoppingCart, Wallet, Gauge, AlertTriangle, XCircle, Volume2 } from "lucide-react";

export default function Performance() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary rounded-lg">
              <Gauge className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Performance Overview</h1>
              <p className="text-muted-foreground">Detailed analysis of key performance indicators and metrics.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Performance Categories Table */}
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-primary" />
              Performance-Übersicht
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">Kategorie</th>
                    <th className="text-center py-3 px-4 font-medium text-muted-foreground">Anzahl Produkte</th>
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
                  <tr className="border-b border-border hover:bg-muted/50 transition-colors">
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-primary"></div>
                        <span className="font-medium text-foreground">Alle</span>
                      </div>
                    </td>
                    <td className="text-center py-4 px-4 text-foreground">1.500</td>
                    <td className="text-center py-4 px-4 text-foreground">2.350.000</td>
                    <td className="text-center py-4 px-4 text-foreground">45.000</td>
                    <td className="text-center py-4 px-4 text-foreground">1.91%</td>
                    <td className="text-center py-4 px-4 text-foreground">4.200</td>
                    <td className="text-center py-4 px-4 text-foreground">CHF 420.000</td>
                    <td className="text-center py-4 px-4 text-foreground">CHF 105.000</td>
                    <td className="text-center py-4 px-4">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-sm font-medium bg-primary text-primary-foreground">
                        4.0
                      </span>
                    </td>
                  </tr>
                  
                  <tr className="border-b border-border hover:bg-muted/50 transition-colors cursor-pointer" onClick={() => window.location.href = '/performance/cash-cows'}>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-success" />
                        <span className="font-medium text-success hover:underline">Cash Cows</span>
                      </div>
                    </td>
                    <td className="text-center py-4 px-4 text-foreground">250</td>
                    <td className="text-center py-4 px-4 text-foreground">900.000</td>
                    <td className="text-center py-4 px-4 text-foreground">22.000</td>
                    <td className="text-center py-4 px-4 text-foreground">2.44%</td>
                    <td className="text-center py-4 px-4 text-foreground">2.800</td>
                    <td className="text-center py-4 px-4 text-foreground">CHF 280.000</td>
                    <td className="text-center py-4 px-4 text-foreground">CHF 40.000</td>
                    <td className="text-center py-4 px-4">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-sm font-medium bg-success text-success-foreground">
                        7.0
                      </span>
                    </td>
                  </tr>

                  <tr className="border-b border-border hover:bg-muted/50 transition-colors cursor-pointer" onClick={() => window.location.href = '/performance/poor-dogs'}>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4 text-warning" />
                        <span className="font-medium text-warning hover:underline">Poor Dogs</span>
                      </div>
                    </td>
                    <td className="text-center py-4 px-4 text-foreground">300</td>
                    <td className="text-center py-4 px-4 text-foreground">600.000</td>
                    <td className="text-center py-4 px-4 text-foreground">9.000</td>
                    <td className="text-center py-4 px-4 text-foreground">1.50%</td>
                    <td className="text-center py-4 px-4 text-foreground">700</td>
                    <td className="text-center py-4 px-4 text-foreground">CHF 35.000</td>
                    <td className="text-center py-4 px-4 text-foreground">CHF 25.000</td>
                    <td className="text-center py-4 px-4">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-sm font-medium bg-warning text-warning-foreground">
                        1.4
                      </span>
                    </td>
                  </tr>

                  <tr className="border-b border-border hover:bg-muted/50 transition-colors cursor-pointer" onClick={() => window.location.href = '/performance/hopeless'}>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <XCircle className="w-4 h-4 text-destructive" />
                        <span className="font-medium text-destructive hover:underline">Hopeless</span>
                      </div>
                    </td>
                    <td className="text-center py-4 px-4 text-foreground">150</td>
                    <td className="text-center py-4 px-4 text-foreground">300.000</td>
                    <td className="text-center py-4 px-4 text-foreground">5.000</td>
                    <td className="text-center py-4 px-4 text-foreground">1.67%</td>
                    <td className="text-center py-4 px-4 text-foreground">300</td>
                    <td className="text-center py-4 px-4 text-foreground">CHF 9.000</td>
                    <td className="text-center py-4 px-4 text-foreground">CHF 15.000</td>
                    <td className="text-center py-4 px-4">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-sm font-medium bg-destructive text-destructive-foreground">
                        0.6
                      </span>
                    </td>
                  </tr>

                  <tr className="border-b border-border hover:bg-muted/50 transition-colors cursor-pointer" onClick={() => window.location.href = '/performance/numb'}>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <BarChart3 className="w-4 h-4 text-muted-foreground" />
                        <span className="font-medium text-muted-foreground hover:underline">Numb </span>
                      </div>
                    </td>
                    <td className="text-center py-4 px-4 text-foreground">500</td>
                    <td className="text-center py-4 px-4 text-foreground">400.000</td>
                    <td className="text-center py-4 px-4 text-foreground">6.000</td>
                    <td className="text-center py-4 px-4 text-foreground">1.50%</td>
                    <td className="text-center py-4 px-4 text-foreground">300</td>
                    <td className="text-center py-4 px-4 text-foreground">CHF 12.000</td>
                    <td className="text-center py-4 px-4 text-foreground">CHF 8.000</td>
                    <td className="text-center py-4 px-4">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-sm font-medium bg-warning text-warning-foreground">
                        1.5
                      </span>
                    </td>
                  </tr>

                  <tr className="hover:bg-muted/50 transition-colors cursor-pointer" onClick={() => window.location.href = '/performance/silent'}>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <Volume2 className="w-4 h-4 text-muted-foreground" />
                        <span className="font-medium text-muted-foreground hover:underline">Silent</span>
                      </div>
                    </td>
                    <td className="text-center py-4 px-4 text-foreground">5</td>
                    <td className="text-center py-4 px-4 text-foreground">0</td>
                    <td className="text-center py-4 px-4 text-foreground">0</td>
                    <td className="text-center py-4 px-4 text-foreground">0.00%</td>
                    <td className="text-center py-4 px-4 text-foreground">0</td>
                    <td className="text-center py-4 px-4 text-foreground">CHF 0</td>
                    <td className="text-center py-4 px-4 text-foreground">CHF 0</td>
                    <td className="text-center py-4 px-4">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-sm font-medium bg-destructive text-destructive-foreground">
                        0.0
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Footer */}
      <div className="border-t bg-muted/30 mt-16">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <Gauge className="h-4 w-4" />
            <span>Performance-Daten sind Beispielwerte</span>
          </div>
        </div>
      </div>
    </div>
  );
}