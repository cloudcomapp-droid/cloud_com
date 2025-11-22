import { Navigate, useOutletContext } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart3,
  TrendingUp,
  AlertTriangle,
  XCircle,
  Volume2,
  Gauge,
} from "lucide-react";
import classifyProducts from "@/utils/clasifyProducts";
import { Product } from "@/interfaces/interfaces";
import { useNavigate } from "react-router-dom";

type OutletCtx = {
  products: Product[];
  classificationRules: any;
};

export default function Performance() {
  const { products, classificationRules } = useOutletContext<OutletCtx>();

  const { silentData, cashCowsData, poorDogsData, hopelessData, numbData } =
    classifyProducts(products, classificationRules);

  // ------------------------------------------
  // AGGREGATOR: Sum metrics for each category
  // ------------------------------------------
  const getMetrics = (items: Product[]) => {
    const totals = items.reduce(
      (acc, item) => {
        acc.impressions += item.prod_imprs || 0;
        acc.clicks += item.prod_clcks || 0;
        acc.conversions += item.prod_convs || 0;
        acc.value += item.prod_value || 0;
        acc.costs += item.prod_costs || 0;
        return acc;
      },
      {
        impressions: 0,
        clicks: 0,
        conversions: 0,
        value: 0,
        costs: 0,
      }
    );

    const ctr =
      totals.impressions > 0
        ? ((totals.clicks / totals.impressions) * 100).toFixed(2)
        : "0.00";

    const roas =
      totals.costs > 0 ? (totals.value / totals.costs).toFixed(2) : "0.0";

    return {
      products: items.length,
      impressions: totals.impressions,
      clicks: totals.clicks,
      ctr,
      conversions: totals.conversions,
      value: totals.value,
      costs: totals.costs,
      roas,
    };
  };

  const all = getMetrics(products);
  const cashCows = getMetrics(cashCowsData);
  const poorDogs = getMetrics(poorDogsData);
  const hopeless = getMetrics(hopelessData);
  const numb = getMetrics(numbData);
  const silent = getMetrics(silentData);

  const navigate = useNavigate();

  const row = (label, icon, color, data, href, bg) => (
    <tr
      className="border-b border-border hover:bg-muted/50 transition-colors cursor-pointer"
      onClick={() => navigate(href)}
    >
      <td className="py-4 px-4">
        <div className="flex items-center gap-2">
          {icon}
          <span className={`font-medium ${color} hover:underline`}>
            {label}
          </span>
        </div>
      </td>

      <td className="text-center py-4 px-4 text-foreground">{data.products}</td>
      <td className="text-center py-4 px-4 text-foreground">
        {data.impressions}
      </td>
      <td className="text-center py-4 px-4 text-foreground">{data.clicks}</td>
      <td className="text-center py-4 px-4 text-foreground">{data.ctr}%</td>
      <td className="text-center py-4 px-4 text-foreground">
        {data.conversions.toFixed(2)}
      </td>
      <td className="text-center py-4 px-4 text-foreground">
        $ {data.value.toFixed(2)}
      </td>
      <td className="text-center py-4 px-4 text-foreground">
        $ {data.costs.toFixed(2)}
      </td>
      <td className="text-center py-4 px-4">
        <span
          className={`inline-flex items-center px-2 py-1 rounded-full text-sm font-medium ${bg}`}
        >
          {Number(data?.roas).toFixed(2)}
        </span>
      </td>
    </tr>
  );

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
              <h1 className="text-2xl font-bold text-foreground">
                Performance Overview
              </h1>
              <p className="text-muted-foreground">
                Detailed analysis of key performance indicators and metrics.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-primary" />
              Performance Overview
            </CardTitle>
          </CardHeader>

          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">
                      Category
                    </th>
                    <th className="text-center py-3 px-4 font-medium text-muted-foreground">
                      Products
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
                  {/* ALL */}
                  {row(
                    "All",
                    <div className="w-3 h-3 rounded-full bg-primary"></div>,
                    "text-foreground",
                    all,
                    "/performance/all-products",
                    "bg-primary text-success-foreground"
                  )}

                  {/* CASH COWS */}
                  {row(
                    "Cash Cows",
                    <TrendingUp className="w-4 h-4 text-success" />,
                    "text-success",
                    cashCows,
                    "/performance/cash-cows",
                    "bg-success text-success-foreground"
                  )}

                  {/* POOR DOGS */}
                  {row(
                    "Poor Dogs",
                    <AlertTriangle className="w-4 h-4 text-warning" />,
                    "text-warning",
                    poorDogs,
                    "/performance/poor-dogs",
                    "bg-warning text-warning-foreground"
                  )}

                  {/* HOPELESS */}
                  {row(
                    "Hopeless",
                    <XCircle className="w-4 h-4 text-destructive" />,
                    "text-destructive",
                    hopeless,
                    "/performance/hopeless",
                    "bg-destructive text-destructive-foreground"
                  )}

                  {/* NUMB */}
                  {row(
                    "Numb",
                    <BarChart3 className="w-4 h-4 text-muted-foreground" />,
                    "text-muted-foreground",
                    numb,
                    "/performance/numb",
                    "bg-gray-500 text-warning-foreground"
                  )}

                  {/* SILENT */}
                  {row(
                    "Silent",
                    <Volume2 className="w-4 h-4 text-muted-foreground" />,
                    "text-muted-foreground",
                    silent,
                    "/performance/silent",
                    "bg-gray-500 text-destructive-foreground"
                  )}
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
            <span>Performance data displayed dynamically</span>
          </div>
        </div>
      </div>
    </div>
  );
}
