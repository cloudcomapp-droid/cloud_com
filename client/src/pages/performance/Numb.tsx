import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeftIcon, BarChart3, Download } from "lucide-react";
import { Link, useOutletContext } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { exportToCSV } from "@/utils/csvExport";
import { Product } from "@/interfaces/interfaces";

type OutletCtx = {
  products: Product[];
  classificationRules: any;
};

export default function Numb() {
  const { products, classificationRules } = useOutletContext<OutletCtx>();

  // --- FILTER NUMB PRODUCTS ---
  const numbData = products
    ?.filter(
      (p) =>
        p.prod_roas < classificationRules.numbRoas &&
        p.prod_roas >= 0 &&
        p.prod_costs < classificationRules.numbCosts &&
        p.prod_costs >= 0 &&
        p.prod_imprs > 0
    )
    .map((p) => ({ ...p }));

  const handleExportCSV = () => {
    exportToCSV(numbData, "numb-products");
  };

  // --- SUMMARY STATS ---
  const totalRevenue = numbData?.reduce(
    (acc, p) => acc + (p.prod_value || 0),
    0
  );
  const totalCosts = numbData?.reduce((acc, p) => acc + (p.prod_costs || 0), 0);
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
            <div className="p-2 bg-muted rounded-lg">
              <BarChart3 className="h-6 w-6 text-muted-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold flex items-center gap-2">
                Numb
                <Badge
                  variant="secondary"
                  className="bg-muted/10 text-muted-foreground"
                >
                  Neutral Performance
                </Badge>
              </h1>
              <p className="text-muted-foreground">
                Products with average performance — neither strong nor weak.
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
              <div className="text-2xl font-bold text-muted-foreground">
                {numbData?.length}
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
              <div className="text-2xl font-bold text-foreground">
                {totalCosts.toFixed(2)}
              </div>
              <div className="text-sm text-muted-foreground">Total Costs</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-warning">{avgRoas}</div>
              <div className="text-sm text-muted-foreground">Average ROAS</div>
            </CardContent>
          </Card>
        </div>

        {/* Break-even / Neutral Insight */}
        <Card className="bg-muted/5">
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold mb-2">
              {(totalRevenue - totalCosts).toFixed(2)}
            </div>
            <div className="text-muted-foreground">
              Net Result (Neutral Zone)
            </div>
            <div className="text-sm text-muted-foreground mt-2">
              📊 These products have optimization potential
            </div>
          </CardContent>
        </Card>

        {/* Detailed Table */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-muted"></div>
                Numb – Detailed View
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
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">
                      ID
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">
                      Product Name
                    </th>
                    <th className="text-center py-3 px-4 font-medium text-muted-foreground">
                      Impressions
                    </th>
                    <th className="text-center py-3 px-4 font-medium text-muted-foreground">
                      Clicks
                    </th>
                    <th className="text-center py-3 px-4 font-medium text-muted-foreground">
                      CTR
                    </th>
                    <th className="text-center py-3 px-4 font-medium text-muted-foreground">
                      Conversions
                    </th>
                    <th className="text-center py-3 px-4 font-medium text-muted-foreground">
                      Value
                    </th>
                    <th className="text-center py-3 px-4 font-medium text-muted-foreground">
                      Costs
                    </th>
                    <th className="text-center py-3 px-4 font-medium text-muted-foreground">
                      ROAS
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {numbData?.map((product) => (
                    <tr
                      key={product.prod_id}
                      className="border-b border-border hover:bg-muted/50 transition-colors"
                    >
                      <td className="py-4 px-4 font-mono text-sm text-muted-foreground">
                        {product.prod_id}
                      </td>

                      <td className="py-4 px-4 font-medium">
                        {product.prod_name}
                      </td>

                      <td className="text-center py-4 px-4">
                        {product.prod_imprs}
                      </td>

                      <td className="text-center py-4 px-4">
                        {product.prod_clcks}
                      </td>

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
                        <Badge
                          variant="secondary"
                          className="bg-warning/10 text-warning"
                        >
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

        {/* Optimization Tips */}
        <Card className="border-l-4 border-l-muted">
          <CardHeader>
            <CardTitle className="text-muted-foreground">
              Optimization Opportunities
            </CardTitle>
          </CardHeader>

          <CardContent>
            <ul className="space-y-2 text-sm">
              <li>• Slight adjustments can have major impact</li>
              <li>• Improve targeting to lift conversions</li>
              <li>• Test new creative assets</li>
              <li>• Check stock visibility and seasonality</li>
              <li>• Evaluate budget allocation</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
