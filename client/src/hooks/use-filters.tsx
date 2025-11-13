import { useState, useEffect, useCallback } from "react";

interface Campaign {
  id: string;
  name: string;
}

interface AssetGroup {
  id: string;
  name: string;
}

export function useFilters() {
  const API_URL = "/api";

  const [clientName, setClientName] = useState("");
  const [startDate, setStartDate] = useState("2025-01-01");
  const [endDate, setEndDate] = useState("2025-07-31");

  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | undefined>();

  const [assetGroups, setAssetGroups] = useState<AssetGroup[]>([]);
  const [selectedAssetGroup, setSelectedAssetGroup] = useState<AssetGroup | undefined>();

  const [selectedCustomLabel, setSelectedCustomLabel] =
    useState("Alle Custom Labels");

  // 🚀 Fetch all filters (client name, campaigns, asset groups)
  const fetchInitialFilters = useCallback(async (force = false) => {
    try {
      // --- 1️⃣ Fetch campaigns ---
      const respCamps = await fetch(
        `${API_URL}/google-campaigns${force ? "?fetch=1" : ""}`,
        { credentials: "include" }
      );
      const jsonCamps = await respCamps.json();

      const campList: Campaign[] = Array.isArray(jsonCamps?.data)
        ? jsonCamps.data
        : [];

      // prepend "All campaigns" option
      const allCamps = [{ id: "all", name: "All Campaigns" }, ...campList];
      setCampaigns(allCamps);

      const firstCamp = campList[0];
      setSelectedCampaign(firstCamp);

      // --- 2️⃣ Fetch client name ---
      const respClient = await fetch(`${API_URL}/google-customer-name`, {
        credentials: "include",
      });
      const jsonClient = await respClient.json();
      setClientName(jsonClient?.data || "");

      // --- 3️⃣ Fetch asset groups ---
      if (firstCamp?.id) {
        const respAssets = await fetch(
          `${API_URL}/google-asset-groups?campaignId=${encodeURIComponent(
            firstCamp.id
          )}&startDate=${startDate}&endDate=${endDate}`,
          { credentials: "include" }
        );

        const jsonAssets = await respAssets.json();
        const groupList: AssetGroup[] = Array.isArray(jsonAssets?.data)
          ? jsonAssets.data
          : [];

        const allGroups = [{ id: "all", name: "All Asset Groups" }, ...groupList];
        setAssetGroups(allGroups);
        setSelectedAssetGroup(groupList[0]);
      }
    } catch (err) {
      console.error("Failed to fetch filters:", err);
    }
  }, [API_URL, startDate, endDate]);

  // Fetch on mount
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

    assetGroups,
    selectedAssetGroup,
    setSelectedAssetGroup,

    selectedCustomLabel,
    setSelectedCustomLabel,

    fetchInitialFilters,
  };
}
