import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";

function useFiltersContext() {
  return useOutletContext<{
    campaigns: any[];
    selectedCampaign: any;
    setSelectedCampaign: (c: any) => void;
    assetGroups: any[];
    selectedAssetGroup: any;
    setSelectedAssetGroup: (a: any) => void;
    selectedCustomLabel: string;
    setSelectedCustomLabel: (v: string) => void;
    fetchInitialFilters: (force?: boolean) => Promise<void>;
    products: any[];
  }>();
}

const AllProducts = () => {
  const {
    campaigns,
    selectedCampaign,
    setSelectedCampaign,
    assetGroups,
    selectedAssetGroup,
    setSelectedAssetGroup,
    selectedCustomLabel,
    setSelectedCustomLabel,
    fetchInitialFilters,
    products,
  } = useFiltersContext();

  const [tableData, setTableData] = useState([]);
  const [loadingFetch, setLoadingFetch] = useState(false);

  useEffect(() => {
    document.title = "All Products – Google Ads Product Commander";

    // Ya no usás tu fetch local sino el del contexto
    // fetchInitialFilters(false);

    // Si querés inicializar tabla:
    setTableData(products);
  }, []);

  return (
    <div className="min-h-screen bg-background py-10">
      <div className="container mx-auto px-8 space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">All Products</h1>
          <p className="text-lg text-muted-foreground">
            Detailed list of all your products
          </p>
        </div>

        <button
          onClick={() => fetchInitialFilters(true)}
          className="px-4 py-2 bg-blue-500 text-white rounded"
          disabled={loadingFetch}
        >
          {loadingFetch ? "Fetching..." : "Fetch Data"}
        </button>

        {/* table */}
        <div className="overflow-x-auto">
          <table className="min-w-full border border-border text-sm text-left text-foreground mt-4 table-auto">
            <thead className="bg-muted/20">
              <tr>
                <th className="border-b px-1 py-3 max-w-[150px] min-w-[100px]">Camp ID</th>
                <th className="border-b px-1 py-3 max-w-[150px] min-w-[100px]">Camp Name</th>
                <th className="border-b px-1 py-1 max-w-[150px] min-w-[100px]">Prod ID</th>
                <th className="border-b px-1 py-3 max-w-[150px] min-w-[100px]">Prod Name</th>
                <th className="border-b px-4 py-3 text-right">Impress</th>
                <th className="border-b px-4 py-3 text-right">Clicks</th>
                <th className="border-b px-4 py-3 text-right">CTR</th>
                <th className="border-b px-4 py-3 text-right">Convs</th>
                <th className="border-b px-4 py-3 text-right">Value</th>
                <th className="border-b px-4 py-3 text-right">Costs</th>
                <th className="border-b px-4 py-3 text-right">ROAS</th>
              </tr>
            </thead>
            <tbody>
              {products.map((row: any, i: number) => (
                <tr
                  key={i}
                  className={`${
                    i % 2 === 0 ? "bg-muted/10" : "bg-background"
                  } hover:bg-muted/30 transition-colors`}
                >
                  <td className="border-b px-1 py-2 max-w-[150px] min-w-[100px]">{row.camp_id}</td>
                  <td className="border-b px-1 py-2 max-w-[150px] min-w-[100px]">{row.camp_name}</td>
                  <td className="border-b px-1 py-1 max-w-[150px] min-w-[100px] whitespace-normal break-words">{row.prod_id}</td>
                  <td className="border-b px-1 py-2 max-w-[150px] min-w-[100px]">{row.prod_name}</td>

                  <td className="border-b px-4 py-2 text-right">
                    {row.prod_imprs}
                  </td>

                  <td className="border-b px-4 py-2 text-right">
                    {row.prod_clcks}
                  </td>

                  <td className="border-b px-4 py-2 text-right">
                    {row.prod_ctr != null ? `${row.prod_ctr.toFixed(2)}%` : "-"}
                  </td>

                  <td className="border-b px-4 py-2 text-right">
                    {row.prod_convs != null ? row.prod_convs.toFixed(2) : "-"}
                  </td>

                  <td className="border-b px-4 py-2 text-right">
                    {row.prod_value != null
                      ? `$${row.prod_value.toFixed(2)}`
                      : "$0.00"}
                  </td>

                  <td className="border-b px-4 py-2 text-right">
                    {row.prod_costs != null
                      ? `$${row.prod_costs.toFixed(2)}`
                      : "$0.00"}
                  </td>

                  <td className="border-b px-4 py-2 text-right">
                    {row.prod_value && row.prod_costs
                      ? (row.prod_value / row.prod_costs).toFixed(2)
                      : "0.00"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AllProducts;
