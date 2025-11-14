import { useState, useEffect, useCallback } from "react";

interface Campaign {
  id: string;
  name: string;
}

interface AssetGroup {
  id: string;
  name: string;
  campaign?: string;
}

interface Product {
  camp_id: string;
  camp_name: string;
  camp_type: string;
  prod_id: string;
  prod_name: string;
  prod_imprs: number;
  prod_clcks: number;
  prod_ctr: number;
  prod_convs: number;
  prod_value: number;
  prod_costs: number;
}

export function useFilters() {
  const API_URL = "/api";
  const initialClientId = "4693401961";
  const [clientId, setClientId] = useState(initialClientId);

  const [clientName, setClientName] = useState("");
  const [startDate, setStartDate] = useState("2025-01-01");
  const [endDate, setEndDate] = useState("2025-07-31");

  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [selectedCampaign, setSelectedCampaign] = useState<
    Campaign | undefined
  >();

  const [assetGroups, setAssetGroups] = useState<AssetGroup[]>([]);
  const [filteredAssetGroups, setFilteredAssetGroups] = useState<AssetGroup[]>(
    []
  );
  const [selectedAssetGroup, setSelectedAssetGroup] = useState<
    AssetGroup | undefined
  >();

  const [customLabels, setCustomLabels] = useState<string[]>([]);
  const [selectedCustomLabel, setSelectedCustomLabel] =
    useState("All Custom Labels");

  const [products, setProducts] = useState<Product[]>([]);

  // 🔹 Fetch productos (manual o desde init)
  const fetchProducts = useCallback(
    async (force = false) => {
      try {
        const respProducts = await fetch(
          `${API_URL}/google-shopping-products?clientId=${encodeURIComponent(
            clientId
          )}&campaignId=${encodeURIComponent(
            selectedCampaign?.id || "17662012260"
          )}&startDate=${startDate}&endDate=${endDate}${
            force ? "&fetch=1" : ""
          }`,
          { credentials: "include" }
        );

        const json = await respProducts.json();
        const productsList: Product[] = Array.isArray(json?.data)
          ? json.data
          : [];
        console.log("products:", productsList);
        setProducts(productsList);
      } catch (err) {
        console.error("Failed to fetch products:", err);
      }
    },
    [API_URL, clientId, selectedCampaign, startDate, endDate]
  );

  // 🔹 Fetch inicial (campañas, cliente, asset groups, labels, productos)
  const fetchInitialFilters = useCallback(async (force = false) => {
    try {
      // --- 1️⃣ Fetch campaigns ---
      const respCamps = await fetch(
        `${API_URL}/google-campaigns?clientId=${encodeURIComponent(clientId)}${
          force ? "&fetch=1" : ""
        }`,
        { credentials: "include" }
      );
      const jsonCamps = await respCamps.json();
      const campList: Campaign[] = Array.isArray(jsonCamps?.data)
        ? jsonCamps.data
        : [];

      const allCamps = [{ id: "all", name: "All Campaigns" }, ...campList];
      setCampaigns(allCamps);
      setSelectedCampaign(campList[0]);

      // --- 2️⃣ Fetch client name ---
      const respClient = await fetch(
        `${API_URL}/google-customer-name?clientId=${encodeURIComponent(
          clientId
        )}&${force ? "fetch=1" : ""}`,
        { credentials: "include" }
      );
      const jsonClient = await respClient.json();
      setClientName(jsonClient?.data || "");

      // --- 3️⃣ Fetch all asset groups ---
      if (campList.length > 0) {
        const allGroups: AssetGroup[] = [];

        for (const campaign of campList) {
          const respAssets = await fetch(
            `${API_URL}/google-asset-groups?campaignId=${encodeURIComponent(
              campaign.id
            )}&clientId=${encodeURIComponent(
              clientId
            )}${force ? "&fetch=1" : ""}`,
            { credentials: "include" }
          );

          const jsonAssets = await respAssets.json();
          const groups: AssetGroup[] = Array.isArray(jsonAssets?.data)
            ? jsonAssets.data
            : [];

          for (const g of groups) {
            if (!allGroups.some((x) => x.id === g.id)) {
              allGroups.push(g);
            }
          }
        }

        setAssetGroups(allGroups);

        const filtered =
          allGroups.filter((g) => g.campaign?.includes(campList[0]?.id)) || [];
        const finalGroups = [
          { id: "all", name: "All Asset Groups" },
          ...filtered,
        ];
        setFilteredAssetGroups(finalGroups);
        setSelectedAssetGroup(finalGroups[0]);
      }

      // --- 4️⃣ Fetch Custom Labels ---
      const respLabels = await fetch(
        `${API_URL}/google-custom-labels?clientId=${encodeURIComponent(
          clientId
        )}${force ? "&fetch=1" : ""}`,
        { credentials: "include" }
      );
      const jsonLabels = await respLabels.json();
      const labels: string[] = Array.isArray(jsonLabels?.data)
        ? jsonLabels.data
        : [];

      const allLabels = ["All Custom Labels", ...labels];
      setCustomLabels(allLabels);
      setSelectedCustomLabel(allLabels[0]);

      // --- 5️⃣ Fetch Products ---
      //await fetchProducts(force);
    } catch (err) {
      console.error("Failed to fetch filters:", err);
    }
  }, []);

  // 🔹 Refiltra asset groups cuando cambia la campaña
  useEffect(() => {
    if (!selectedCampaign || selectedCampaign.id === "all") {
      const all = [{ id: "all", name: "All Asset Groups" }, ...assetGroups];
      setFilteredAssetGroups(all);
    } else {
      const filtered = assetGroups.filter((g) =>
        g.campaign?.includes(selectedCampaign.id)
      );
      const finalGroups = [
        { id: "all", name: "All Asset Groups" },
        ...filtered,
      ];
      setFilteredAssetGroups(finalGroups);
      setSelectedAssetGroup(finalGroups[0]);
    }
  }, [selectedCampaign, assetGroups]);

  const searchClientById = useCallback(
    async (id: string) => {
      try {
        const respClient = await fetch(
          `${API_URL}/google-customer-name?clientId=${encodeURIComponent(
            id
          )}`,
          { credentials: "include" }
        );
        const jsonClient = await respClient.json();
        setClientName(jsonClient?.data || "");
      } catch (err) {
        console.error("Failed to search client by ID:", err);
      }
    },
    []
  );

  // 🔹 Fetch inicial
  useEffect(() => {
    fetchInitialFilters(true);
  }, []);

  return {
    clientName,
    startDate,
    endDate,
    setStartDate,
    setEndDate,

    campaigns,
    selectedCampaign,
    setSelectedCampaign,

    assetGroups: filteredAssetGroups,
    selectedAssetGroup,
    setSelectedAssetGroup,

    customLabels,
    selectedCustomLabel,
    setSelectedCustomLabel,

    products,
    setProducts,
    fetchProducts,
    fetchInitialFilters,
    searchClientById,
    clientId
  };
}
