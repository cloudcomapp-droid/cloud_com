import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeftIcon, Download } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useOutletContext } from "react-router-dom";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

const AllProducts = () => {
  const {
    products,
  } = useOutletContext<any>();

  // -------------------------
  // PAGINATION STATE
  // -------------------------
  const [pageSize, setPageSize] = useState(200);
  const [page, setPage] = useState(1);

  const totalPages = Math.ceil(products.length / pageSize);

  const paginatedProducts = useMemo(() => {
    const start = (page - 1) * pageSize;
    return products.slice(start, start + pageSize);
  }, [products, page, pageSize]);

  // Reset page if pagesize changes
  const handlePageSizeChange = (value: string) => {
    setPageSize(Number(value));
    setPage(1);
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
                Back to Performance
              </Button>
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/20 rounded-lg">
              <Badge className="bg-primary text-primary-foreground">All</Badge>
            </div>

            <div>
              <h1 className="text-2xl font-bold flex items-center gap-2">
                All Products
              </h1>
              <p className="text-muted-foreground">
                Full list of your Google Ads products with performance data
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-10 space-y-8">

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card><CardContent className="p-4">
            <div className="text-3xl font-bold">{products.length}</div>
            <div className="text-muted-foreground text-sm">Total Products</div>
          </CardContent></Card>

          <Card><CardContent className="p-4">
            <div className="text-3xl font-bold">
              {products.reduce((acc, p) => acc + (p.prod_value || 0), 0).toFixed(2)}
            </div>
            <div className="text-muted-foreground text-sm">Total Value</div>
          </CardContent></Card>

          <Card><CardContent className="p-4">
            <div className="text-3xl font-bold">
              {products.reduce((acc, p) => acc + (p.prod_costs || 0), 0).toFixed(2)}
            </div>
            <div className="text-muted-foreground text-sm">Total Costs</div>
          </CardContent></Card>

          <Card><CardContent className="p-4">
            <div className="text-3xl font-bold">
              {(
                products.reduce((acc, p) => acc + (p.prod_value || 0), 0) /
                (products.reduce((acc, p) => acc + (p.prod_costs || 0), 0) || 1)
              ).toFixed(1)}
            </div>
            <div className="text-muted-foreground text-sm">Avg ROAS</div>
          </CardContent></Card>
        </div>

        {/* Table */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>All Products – Detail View</CardTitle>

              <Button variant="outline" size="sm" className="gap-2">
                <Download className="h-4 w-4" />
                CSV Export
              </Button>
            </div>
          </CardHeader>

          <CardContent>
            {/* PAGE SIZE SELECT */}
            <div className="flex items-center justify-end mb-4 gap-2">
              <span className="text-sm text-muted-foreground">Rows per page:</span>

              <Select
                onValueChange={handlePageSizeChange}
                defaultValue={"200"}
              >
                <SelectTrigger className="w-[120px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="100">100</SelectItem>
                  <SelectItem value="200">200</SelectItem>
                  <SelectItem value="300">300</SelectItem>
                  <SelectItem value="400">400</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="">
              <table className="w-full border-collapse table-auto">
                <thead className="sticky top-36 bg-card z-20 shadow-sm">
                  <tr className="border-b border-border text-muted-foreground text-sm">
                    <th className="border-b px-1 py-3 max-w-[150px] min-w-[100px]" >Camp ID</th>
                    <th className="border-b px-1 py-3 max-w-[150px] min-w-[100px]">Camp Name</th>
                    <th className="border-b px-1 py-1 max-w-[150px] min-w-[100px]">Prod ID</th>
                    <th className="border-b px-1 py-3 max-w-[150px] min-w-[100px]">Prod Name</th>
                    <th className="px-4 py-3 text-center">Impr</th>
                    <th className="px-4 py-3 text-center">Clicks</th>
                    <th className="px-4 py-3 text-center">CTR</th>
                    <th className="px-4 py-3 text-center">Convs</th>
                    <th className="px-4 py-3 text-center">Value</th>
                    <th className="px-4 py-3 text-center">Costs</th>
                    <th className="px-4 py-3 text-center">ROAS</th>
                  </tr>
                </thead>

                <tbody>
                  {paginatedProducts.map((row: any, i: number) => (
                    <tr
                      key={i}
                      className="border-b border-border hover:bg-muted/50 transition-colors"
                    >
                      <td className="border-b px-1 py-3 max-w-[150px] min-w-[100px]">{row.camp_id}</td>
                      <td className="border-b px-1 py-3 max-w-[150px] min-w-[100px]">{row.camp_name}</td>
                      <td className="border-b px-1 py-1 font-mono text-sm break-words max-w-[150px] min-w-[100px] whitespace-normal">
                        {row.prod_id}
                      </td>
                      <td className="border-b px-1 py-3 max-w-[150px] min-w-[100px]">{row.prod_name}</td>
                      <td className="text-center px-4 py-3">{row.prod_imprs}</td>
                      <td className="text-center px-4 py-3">{row.prod_clcks}</td>
                      <td className="text-center px-4 py-3">
                        {row.prod_ctr != null ? `${row.prod_ctr.toFixed(2)}%` : "-"}
                      </td>
                      <td className="text-center px-4 py-3">
                        {row.prod_convs != null ? row.prod_convs.toFixed(2) : "-"}
                      </td>
                      <td className="text-center px-4 py-3">
                        {row.prod_value?.toFixed(2) ?? "0.00"}
                      </td>
                      <td className="text-center px-4 py-3">
                        {row.prod_costs?.toFixed(2) ?? "0.00"}
                      </td>
                      <td className="text-center px-4 py-3">
                        <Badge variant="secondary" className="bg-primary/10 text-primary">
                          {row.prod_value && row.prod_costs
                            ? (row.prod_value / row.prod_costs).toFixed(2)
                            : "0.00"}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* PAGINATION BUTTONS */}
            <div className="flex justify-between items-center mt-6">

              <span className="text-sm text-muted-foreground">
                Page {page} of {totalPages}
              </span>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={page === 1}
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                >
                  Previous
                </Button>

                <Button
                  variant="outline"
                  size="sm"
                  disabled={page === totalPages}
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                >
                  Next
                </Button>
              </div>

            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  );
};

export default AllProducts;
