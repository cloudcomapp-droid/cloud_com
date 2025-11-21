import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeftIcon, AlertTriangle, Download } from "lucide-react";
import { Link, useOutletContext } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { exportToCSV } from "@/utils/csvExport";
import { Product } from "@/interfaces/interfaces";

type OutletCtx = {
  products: Product[];
  classificationRules: any;
};

export default function PoorDogs() {
  const { products, classificationRules } = useOutletContext<OutletCtx>();

  // RULE:
  // ROAS >= 1 && ROAS < poorDogRoas (ej: < 1.4)
  const poorDogsData = products
    ?.filter(
      (p) =>
        p.prod_roas >= classificationRules.poorDogRoasMin &&
        p.prod_roas < classificationRules.poorDogRoasMax
        ||
        (p.prod_roas >= classificationRules.poorDogRoasMax && p.prod_convs < classificationRules.poorDogConv)
    )
    .map((p) => ({ ...p }));

  const handleExportCSV = () => {
    exportToCSV(poorDogsData, "poor-dogs-products");
  };

  const totalRevenue = poorDogsData?.reduce((acc, p) => acc + (p.prod_value || 0), 0);
  const totalCosts = poorDogsData?.reduce((acc, p) => acc + (p.prod_costs || 0), 0);
  const avgRoas = (totalRevenue / (totalCosts || 1)).toFixed(2);

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
            <div className="p-2 bg-warning rounded-lg">
              <AlertTriangle className="h-6 w-6 text-warning-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold flex items-center gap-2">
                Poor Dogs
                <Badge variant="secondary" className="bg-warning/10 text-warning">
                  Needs Optimization
                </Badge>
              </h1>
              <p className="text-muted-foreground">
                Mid-performance products — potential to improve with optimizations.
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
              <div className="text-2xl font-bold text-warning">
                {poorDogsData?.length}
              </div>
              <div className="text-sm text-muted-foreground">Products</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold">
                {totalRevenue.toFixed(2)}
              </div>
              <div className="text-sm text-muted-foreground">Total Revenue</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold">
                {totalCosts.toFixed(2)}
              </div>
              <div className="text-sm text-muted-foreground">Total Costs</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-warning">
                {avgRoas}
              </div>
              <div className="text-sm text-muted-foreground">Average ROAS</div>
            </CardContent>
          </Card>
        </div>

        {/* TABLE */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-warning"></div>
                Poor Dogs – Detailed View
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
                    <th className="text-left py-3 px-4">ID</th>
                    <th className="text-left py-3 px-4">Product Name</th>
                    <th className="text-center py-3 px-4">Impressions</th>
                    <th className="text-center py-3 px-4">Clicks</th>
                    <th className="text-center py-3 px-4">CTR</th>
                    <th className="text-center py-3 px-4">Conv</th>
                    <th className="text-center py-3 px-4">Value</th>
                    <th className="text-center py-3 px-4">Costs</th>
                    <th className="text-center py-3 px-4">ROAS</th>
                  </tr>
                </thead>

                <tbody>
                  {poorDogsData?.map((p) => (
                    <tr
                      key={p.prod_id}
                      className="border-b border-border hover:bg-muted/50 transition-colors"
                    >
                      <td className="py-4 px-4 font-mono text-sm text-muted-foreground">
                        {p.prod_id}
                      </td>

                      <td className="py-4 px-4 font-medium">
                        {p.prod_name}
                      </td>

                      <td className="text-center py-4 px-4">
                        {p.prod_imprs}
                      </td>

                      <td className="text-center py-4 px-4">
                        {p.prod_clcks}
                      </td>

                      <td className="text-center py-4 px-4">
                        {(p.prod_ctr || 0).toFixed(2)}%
                      </td>

                      <td className="text-center py-4 px-4">
                        {(p.prod_convs || 0).toFixed(2)}
                      </td>

                      <td className="text-center py-4 px-4">
                        {(p.prod_value || 0).toFixed(2)}
                      </td>

                      <td className="text-center py-4 px-4">
                        {(p.prod_costs || 0).toFixed(2)}
                      </td>

                      <td className="text-center py-4 px-4">
                        <Badge variant="secondary" className="bg-warning/10 text-warning">
                          {p.prod_roas?.toFixed(2)}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>

              </table>
            </div>
          </CardContent>
        </Card>

        {/* RECOMMENDATIONS */}
        <Card className="border-l-4 border-l-warning">
          <CardHeader>
            <CardTitle className="text-warning">Optimization Tips</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              <li>• Run A/B tests for creatives</li>
              <li>• Improve product images and titles</li>
              <li>• Review targeting and budget allocation</li>
              <li>• Test alternative bidding strategies</li>
            </ul>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}
