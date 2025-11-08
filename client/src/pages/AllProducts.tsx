import { useEffect, useState } from "react";
import { HeaderFilters } from "@/components/HeaderFilters";

const AllProducts = () => {
  const [tableData, setTableData] = useState([]);
  const [loadingFetch, setLoadingFetch] = useState(false);

  // filter states
  const [campaigns, setCampaigns] = useState<string[]>([]);
  const [selectedCampaign, setSelectedCampaign] = useState<string | undefined>(undefined);
  const [assetGroups, setAssetGroups] = useState<string[]>([]);
  const [selectedAssetGroup, setSelectedAssetGroup] = useState<string | undefined>();
  const [selectedCustomLabel, setSelectedCustomLabel] = useState("Alle Custom Labels");

  // chained initialization
  const fetchInitialFilters = async (force = false) => {
    try {
      const resp_camps = await fetch(
        `http://localhost:8080/google-campaigns${force ? "?fetch=1" : ""}`,
        { credentials: "include" }
      );
      const { method, data: campaigns } = await resp_camps.json();
      console.log(`==============`);
      console.log(`campaigns ${method}`);
      console.log(`data: ${campaigns}`);
      console.log(`----`);
      setCampaigns(["All Campaigns", ...campaigns]);
      const firstCamp = campaigns?.[0];
      console.log(`first campg: ${firstCamp}`);
      console.log(`==============`);
      setSelectedCampaign(firstCamp);

      // if (firstCamp) {
      //   const resp_agroups = await fetch(
      //     `http://localhost:5000/google-asset-groups?campaignId=${firstCamp}`,
      //     { credentials: "include" }
      //   );
      //   const { data: agroups } = await resp_agroups.json();
      //   setAssetGroups(["All Asset-Groups", ...agroups]);
      //   setSelectedAssetGroup(agroups?.[0]);
      // }
    } catch (err) {
      console.error("Failed to fetch filters:", err);
    }
  };

  useEffect(() => {
    document.title = "All Products – Google Ads Product Commander";
    fetchInitialFilters(false);
    fetchGoogleData(false);
  }, []);

  const fetchGoogleData = async (force = false) => {
    try {
      setLoadingFetch(true);
      const response = await fetch(
        `http://localhost:5000/google-data${force ? "?fetch=1" : ""}`,
        { credentials: "include" }
      );
      const { method, data: jsonData } = await response.json();
      // console.log("method:", method);
      setTableData(jsonData || []);
    } catch (err) {
      console.error("Failed to fetch data:", err);
    } finally {
      setLoadingFetch(false);
    }
  };

  return (
    <div className="min-h-screen bg-background py-10">
      <div className="container mx-auto px-8 space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">All Products</h1>
          <p className="text-lg text-muted-foreground">Detailed list of all your products</p>
        </div>

        {/* fetch button only */}
        <button
          onClick={() => {
            fetchInitialFilters(true);
            fetchGoogleData(true);
          }}
          className="px-4 py-2 bg-blue-500 text-white rounded"
          disabled={loadingFetch}
        >
          {loadingFetch ? "Fetching..." : "Fetch Data"}
        </button>

        {/* table */}
        <div className="overflow-x-auto">
          <div className="overflow-x-auto">
            <table className="min-w-full border border-border text-sm text-left text-foreground mt-4">
              <thead className="bg-muted/20">
                <tr>
                  <th className="border-b px-4 py-3">Camp ID</th>
                  <th className="border-b px-4 py-3">Camp Name</th>
                  <th className="border-b px-4 py-3">Prod ID</th>
                  <th className="border-b px-4 py-3">Prod Short</th>
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
                {tableData.map((row, i) => (
                  <tr
                    key={i}
                    className={`${i % 2 === 0 ? "bg-muted/10" : "bg-background"
                      } hover:bg-muted/30 transition-colors`}
                  >
                    <td className="border-b px-4 py-2">{row.campId}</td>
                    <td className="border-b px-4 py-2">{row.campName}</td>
                    <td className="border-b px-4 py-2">{row.prodId}</td>
                    <td className="border-b px-4 py-2">{row.prodShort}</td>
                    <td className="border-b px-4 py-2 text-right">{row.impress}</td>
                    <td className="border-b px-4 py-2 text-right">{row.clicks}</td>
                    <td className="border-b px-4 py-2 text-right">{row.ctr}</td>
                    <td className="border-b px-4 py-2 text-right">{row.convs}</td>
                    <td className="border-b px-4 py-2 text-right">{row.value}</td>
                    <td className="border-b px-4 py-2 text-right">{row.costs}</td>
                    <td className="border-b px-4 py-2 text-right">{row.roas}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllProducts;