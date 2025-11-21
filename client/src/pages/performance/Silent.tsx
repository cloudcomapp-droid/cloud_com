import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeftIcon, Volume2, Download } from "lucide-react";
import { Link, useOutletContext } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { exportSilentToCSV } from "@/utils/csvExport";
import { Product } from "@/interfaces/interfaces";

type OutletCtx = {
  products: Product[];
  classificationRules: any;
};

export default function Silent() {
  const { products, classificationRules } = useOutletContext<OutletCtx>();

  // RULE: Silent = no impressions, no clicks, no convs
  const silentData = products
    ?.filter(
      (p) => p.prod_roas === 0 && p.prod_costs === 0 && p.prod_imprs === 0
    )
    .map((p) => ({ ...p }));

  const handleExportCSV = () => {
    exportSilentToCSV(silentData, "silent-products");
  };

  const totalImpressions = silentData?.reduce(
    (acc, p) => acc + (p.prod_imprs || 0),
    0
  );
  const totalClicks = silentData?.reduce(
    (acc, p) => acc + (p.prod_clcks || 0),
    0
  );
  const totalConversions = silentData?.reduce(
    (acc, p) => acc + (p.prod_convs || 0),
    0
  );

  return (
    <div className="min-h-screen bg-background">
      {/* HEADER */}
      <div className="border-b bg-card">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-4 mb-4">
            <Link to="/performance">
              <Button variant="ghost" size="sm">
                <ArrowLeftIcon className="h-4 w-4 mr-2" />
                Back to Performance Overview
              </Button>
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2 bg-muted rounded-lg">
              <Volume2 className="h-6 w-6 text-muted-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold flex items-center gap-2">
                Silent
                <Badge variant="secondary" className="bg-muted/10 text-muted-foreground">
                  No Activity
                </Badge>
              </h1>
              <p className="text-muted-foreground">
                Products generating no measurable activity — no impressions, clicks, or conversions.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="container mx-auto px-4 py-8 space-y-6">

        {/* SUMMARY */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold">
                {silentData?.length}
              </div>
              <div className="text-sm text-muted-foreground">Products</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold">{totalImpressions}</div>
              <div className="text-sm text-muted-foreground">Impressions</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold">{totalClicks}</div>
              <div className="text-sm text-muted-foreground">Clicks</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold">{totalConversions}</div>
              <div className="text-sm text-muted-foreground">Conversions</div>
            </CardContent>
          </Card>
        </div>

        {/* ALERT */}
        <Card className="bg-muted/5 border-muted">
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-muted-foreground mb-2">🔇 No Activity</div>
            <p className="text-muted-foreground">These products have generated zero measurable data.</p>
            <p className="text-sm text-muted-foreground mt-2">
              Review your campaign setup and product availability.
            </p>
          </CardContent>
        </Card>

        {/* TABLE */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-muted-foreground" />
                Silent – Detailed View
              </CardTitle>

              <Button
                onClick={handleExportCSV}
                variant="outline"
                size="sm"
                className="gap-2"
              >
                <Download className="h-4 w-4" />
                Export CSV
              </Button>
            </div>
          </CardHeader>

          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="px-4 py-3 text-left">ID</th>
                    <th className="px-4 py-3 text-left">Product Name</th>
                    <th className="px-4 py-3 text-center">Impressions</th>
                    <th className="px-4 py-3 text-center">Clicks</th>
                    <th className="px-4 py-3 text-center">Conversions</th>
                    <th className="px-4 py-3 text-center">Possible Cause</th>
                  </tr>
                </thead>

                <tbody>
                  {silentData?.map((p) => (
                    <tr
                      key={p.prod_id}
                      className="border-b border-border hover:bg-muted/50 transition-colors"
                    >
                      <td className="px-4 py-4 font-mono text-muted-foreground">{p.prod_id}</td>

                      <td className="px-4 py-4 font-medium">{p.prod_name}</td>

                      <td className="px-4 py-4 text-center text-muted-foreground">{p.prod_imprs}</td>

                      <td className="px-4 py-4 text-center text-muted-foreground">{p.prod_clcks}</td>

                      <td className="px-4 py-4 text-center text-muted-foreground">{p.prod_convs}</td>

                      <td className="px-4 py-4 text-center text-xs text-muted-foreground">
{/*                         {
                          p.prod_campaign_status === "paused"
                            ? "Campaign paused"
                            : p.prod_budget === 0
                            ? "No budget"
                            : "No activity detected"
                        } */}No activity detected
                      </td>
                    </tr>
                  ))}
                </tbody>

              </table>
            </div>
          </CardContent>
        </Card>

        {/* ACTIONS */}
        <Card className="border-l-4 border-l-muted-foreground">
          <CardHeader>
            <CardTitle className="text-muted-foreground">Recommended Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              <li>• Check campaign status (paused or disabled)</li>
              <li>• Validate budget allocation</li>
              <li>• Review targeting settings</li>
              <li>• Ensure product availability</li>
              <li>• Reactivate or archive silent campaigns</li>
              <li>• Create new campaigns if necessary</li>
            </ul>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}
