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

export function useFilters() {
  const API_URL = "/api";
  const clientId = "4693401961";

  const [clientName, setClientName] = useState("");
  const [startDate, setStartDate] = useState("2025-01-01");
  const [endDate, setEndDate] = useState("2025-07-31");

  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | undefined>();

  const [assetGroups, setAssetGroups] = useState<AssetGroup[]>([]);
  const [filteredAssetGroups, setFilteredAssetGroups] = useState<AssetGroup[]>([]);
  const [selectedAssetGroup, setSelectedAssetGroup] = useState<AssetGroup | undefined>();

  const [customLabels, setCustomLabels] = useState<string[]>([]);
  const [selectedCustomLabel, setSelectedCustomLabel] = useState("All Custom Labels");

  // 🔹 Fetch all filters (campaigns, client name, asset groups, labels)
  const fetchInitialFilters = useCallback(async (force = false) => {
    try {
      // --- 1️⃣ Fetch campaigns ---
      const respCamps = await fetch(
        `${API_URL}/google-campaigns?clientId=${encodeURIComponent(clientId)}${force ? "&fetch=1" : ""}`,
        { credentials: "include" }
      );
      const jsonCamps = await respCamps.json();
      const campList: Campaign[] = Array.isArray(jsonCamps?.data) ? jsonCamps.data : [];

      const allCamps = [{ id: "all", name: "All Campaigns" }, ...campList];
      setCampaigns(allCamps);
      setSelectedCampaign(campList[0]);

      // --- 2️⃣ Fetch client name ---
      const respClient = await fetch(
        `${API_URL}/google-customer-name?clientId=${encodeURIComponent(clientId)}`,
        { credentials: "include" }
      );
      const jsonClient = await respClient.json();
      setClientName(jsonClient?.data || "");

      // --- 3️⃣ Fetch all asset groups (for all campaigns) ---
      if (campList.length > 0) {
        const allGroups: AssetGroup[] = [];

        for (const campaign of campList) {
          const respAssets = await fetch(
            `${API_URL}/google-asset-groups?campaignId=${encodeURIComponent(
              campaign.id
            )}&startDate=${startDate}&endDate=${endDate}&clientId=${encodeURIComponent(clientId)}&fetch=1`,
            { credentials: "include" }
          );

          const jsonAssets = await respAssets.json();
          const groups: AssetGroup[] = Array.isArray(jsonAssets?.data) ? jsonAssets.data : [];

          for (const g of groups) {
            if (!allGroups.some((x) => x.id === g.id)) {
              allGroups.push(g);
            }
          }
        }

        setAssetGroups(allGroups);

        // Filtrar los que pertenecen a la primera campaña seleccionada
        const filtered =
          allGroups.filter((g) =>
            g.campaign?.includes(campList[0]?.id)
          ) || [];

        const finalGroups = [{ id: "all", name: "All Asset Groups" }, ...filtered];
        setFilteredAssetGroups(finalGroups);
        setSelectedAssetGroup(finalGroups[0]);
      }

      // --- 4️⃣ Fetch Custom Labels ---
      const respLabels = await fetch(
        `${API_URL}/google-custom-labels?clientId=${encodeURIComponent(clientId)}&fetch=1`,
        { credentials: "include" }
      );
      const jsonLabels = await respLabels.json();
      const labels: string[] = Array.isArray(jsonLabels?.data) ? jsonLabels.data : [];

      const allLabels = ["All Custom Labels", ...labels];
      setCustomLabels(allLabels);
      setSelectedCustomLabel(allLabels[0]);
    } catch (err) {
      console.error("Failed to fetch filters:", err);
    }
  }, [API_URL, startDate, endDate]);

  // 🔹 Refiltra cuando cambia la campaña seleccionada
  useEffect(() => {
    if (!selectedCampaign || selectedCampaign.id === "all") {
      const all = [{ id: "all", name: "All Asset Groups" }, ...assetGroups];
      setFilteredAssetGroups(all);
    } else {
      const filtered = assetGroups.filter((g) =>
        g.campaign?.includes(selectedCampaign.id)
      );
      const finalGroups = [{ id: "all", name: "All Asset Groups" }, ...filtered];
      setFilteredAssetGroups(finalGroups);
      setSelectedAssetGroup(finalGroups[0]);
    }
  }, [selectedCampaign, assetGroups]);

  useEffect(() => {
    fetchInitialFilters(false);
  }, [fetchInitialFilters]);

  return {
    clientName,
    startDate,
    endDate,
    setStartDate,
    setEndDate,

    campaigns,
    selectedCampaign,
    setSelectedCampaign,

    assetGroups: filteredAssetGroups, // ← ahora el front recibe solo los filtrados
    selectedAssetGroup,
    setSelectedAssetGroup,

    customLabels,
    selectedCustomLabel,
    setSelectedCustomLabel,

    fetchInitialFilters,
  };
}
