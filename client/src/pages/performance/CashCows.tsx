import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeftIcon, TrendingUp, Download } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { exportToCSV, ProductData } from "@/utils/csvExport";
import { useOutletContext } from "react-router-dom";
import { Product } from "@/interfaces/interfaces";

type OutletCtx = {
  campaigns: any[];
  selectedCampaign: any;
  setSelectedCampaign: (v: any) => void;
  assetGroups: any[];
  selectedAssetGroup: any;
  setSelectedAssetGroup: (v: any) => void;
  selectedCustomLabel: string;
  setSelectedCustomLabel: (v: string) => void;
  fetchInitialFilters: (force?: boolean) => void;
  products: any[];
  classificationRules: any;
};

export default function CashCows() {
  const { products } = useOutletContext<OutletCtx>();

  const rules = useOutletContext<OutletCtx>().classificationRules;

  const cashCowsData = products
    ?.filter(
      (p) =>
        p.prod_roas >= rules.cashCowRoas && p.prod_convs >= rules.cashCowConv
    )
    .map((p) => ({ ...p }));

  const handleExportCSV = () => {
    exportToCSV(cashCowsData, "cash-cows-products");
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
                Back to Performance Overview
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
                <Badge
                  variant="secondary"
                  className="bg-success/10 text-success"
                >
                  Best Performance
                </Badge>
              </h1>
              <p className="text-muted-foreground">
                Highly profitable products with outstanding ROAS performance.
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
              <div className="text-2xl font-bold text-success">
                {cashCowsData?.length}
              </div>
              <div className="text-sm text-muted-foreground">Products</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-foreground">
                {cashCowsData
                  ?.reduce((acc, p) => acc + (p.prod_value || 0), 0)
                  .toFixed(2)}
              </div>
              <div className="text-sm text-muted-foreground">Total Revenue</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-foreground">
                {cashCowsData
                  ?.reduce((acc, p) => acc + (p.prod_costs || 0), 0)
                  .toFixed(2)}
              </div>
              <div className="text-sm text-muted-foreground">Total Costs</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-success">
                {" "}
                {(
                  cashCowsData.reduce(
                    (acc, p) => acc + (p.prod_value || 0),
                    0
                  ) /
                  (cashCowsData.reduce(
                    (acc, p) => acc + (p.prod_costs || 0),
                    0
                  ) || 1)
                ).toFixed(1)}{" "}
              </div>
              <div className="text-sm text-muted-foreground">Average ROAS</div>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Performance Table */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-success"></div>
                Cash Cows – Detailed View
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
                    <th className="text-center px-1 py-3 max-w-[150px] min-w-[100px] font-medium text-muted-foreground">
                      ID
                    </th>
                    <th className="text-center px-1 py-3 max-w-[150px] min-w-[100px] font-medium text-muted-foreground">
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
                  {cashCowsData?.map((product) => (
                    <tr
                      key={product.prod_id}
                      className="border-b border-border hover:bg-muted/50 transition-colors"
                    >
                      <td className="border-b px-1 py-3 max-w-[150px] min-w-[100px] break-words whitespace-normal text-center">
                        {product.prod_id}
                      </td>
                      <td className="border-b px-1 py-3 break-words max-w-[150px] min-w-[100px] whitespace-normal text-center">
                        {product.prod_name}
                      </td>
                      <td className="text-center py-4 px-4">
                        {product.prod_imprs}
                      </td>
                      <td className="text-center py-4 px-4">
                        {product.prod_clcks}
                      </td>
                      <td className="text-center py-4 px-4">
                        {product.prod_ctr.toFixed(2)}%
                      </td>
                      <td className="text-center py-4 px-4">
                        {product.prod_convs.toFixed(2)}
                      </td>
                      <td className="text-center py-4 px-4">
                        ${product.prod_value.toFixed(2)}
                      </td>
                      <td className="text-center py-4 px-4">
                        ${product.prod_costs.toFixed(2)}
                      </td>
                      <td className="text-center py-4 px-4">
                        <Badge
                          variant="secondary"
                          className="bg-success text-success-foreground"
                        >
                          {product.prod_roas.toFixed(2)}
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
        <Card className="border-l-4 border-l-success">
          <CardHeader>
            <CardTitle className="text-success">
              Recommendations for Cash Cows
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              <li>• Increase budget to generate more traffic</li>
              <li>• Identify and promote similar products</li>
              <li>• Implement cross-selling strategies</li>
              <li>• Apply these success strategies to other categories</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
