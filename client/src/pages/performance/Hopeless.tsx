import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeftIcon, XCircle, Download } from "lucide-react";
import { Link, useOutletContext } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { exportToCSV } from "@/utils/csvExport";
import { Product } from "@/interfaces/interfaces";

type OutletCtx = {
  products: Product[];
  classificationRules: any;
};

export default function Hopeless() {
  const { products, classificationRules } = useOutletContext<OutletCtx>();

  const hopelessData = products
    ?.filter(
      (p) =>
        p.prod_roas < classificationRules.poorDogRoas && 
        p.prod_costs >= classificationRules.hopelessCost
    )
    .map((p) => ({ ...p }));

  const handleExportCSV = () => {
    exportToCSV(hopelessData, "hopeless-products");
  };

  const totalRevenue = hopelessData?.reduce((acc, p) => acc + (p.prod_value || 0), 0);
  const totalCosts = hopelessData?.reduce((acc, p) => acc + (p.prod_costs || 0), 0);
  const avgRoas = (totalRevenue / (totalCosts || 1)).toFixed(2);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
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
            <div className="p-2 bg-destructive rounded-lg">
              <XCircle className="h-6 w-6 text-destructive-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold flex items-center gap-2">
                Hopeless
                <Badge variant="secondary" className="bg-destructive/10 text-destructive">
                  Burning Budget
                </Badge>
              </h1>
              <p className="text-muted-foreground">
                Products with very poor performance — these are burning budget.
              </p>
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
              <div className="text-2xl font-bold text-destructive">{hopelessData?.length}</div>
              <div className="text-sm text-muted-foreground">Products</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold">{totalRevenue.toFixed(2)}</div>
              <div className="text-sm text-muted-foreground">Total Revenue</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-destructive">
                {totalCosts.toFixed(2)}
              </div>
              <div className="text-sm text-muted-foreground">Total Costs</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-destructive">{avgRoas}</div>
              <div className="text-sm text-muted-foreground">Average ROAS</div>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Table */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-destructive"></div>
                Hopeless – Detailed View
              </CardTitle>

              <Button onClick={handleExportCSV} variant="outline" size="sm" className="gap-2">
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
                    <th className="text-center py-3 px-4 font-medium text-muted-foreground">ID</th>
                    <th className="text-center py-3 px-4 font-medium text-muted-foreground">Product Name</th>
                    <th className="text-center py-3 px-4 font-medium text-muted-foreground">Impressions</th>
                    <th className="text-center py-3 px-4 font-medium text-muted-foreground">Clicks</th>
                    <th className="text-center py-3 px-4 font-medium text-muted-foreground">CTR</th>
                    <th className="text-center py-3 px-4 font-medium text-muted-foreground">Conversions</th>
                    <th className="text-center py-3 px-4 font-medium text-muted-foreground">Value</th>
                    <th className="text-center py-3 px-4 font-medium text-muted-foreground">Costs</th>
                    <th className="text-center py-3 px-4 font-medium text-muted-foreground">ROAS</th>
                  </tr>
                </thead>

                <tbody>
                  {hopelessData?.map((product) => (
                    <tr
                      key={product.prod_id}
                      className="border-b border-border hover:bg-muted/50 transition-colors"
                    >
                      <td className="text-center py-4 px-4">
                        {product.prod_id}
                      </td>

                      <td className="text-center py-4 px-4">{product.prod_name}</td>

                      <td className="text-center py-4 px-4">{product.prod_imprs}</td>

                      <td className="text-center py-4 px-4">{product.prod_clcks}</td>

                      <td className="text-center py-4 px-4">
                        {product.prod_ctr?.toFixed(2)}%
                      </td>

                      <td className="text-center py-4 px-4">
                        {product.prod_convs?.toFixed(2)}
                      </td>

                      <td className="text-center py-4 px-4">
                        {product.prod_value?.toFixed(2)}
                      </td>

                      <td className="text-center py-4 px-4">
                        {product.prod_costs?.toFixed(2)}
                      </td>

                      <td className="text-center py-4 px-4">
                        <Badge variant="destructive">
                          {product.prod_roas?.toFixed(2)}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Recommendations */}
        <Card className="border-l-4 border-l-destructive">
          <CardHeader>
            <CardTitle className="text-destructive">Immediate Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              <li>• Stop ads for these products immediately</li>
              <li>• Redirect budget to Cash Cows</li>
              <li>• Review product pricing or remove from catalog</li>
              <li>• Optimize listings or replace products entirely</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
