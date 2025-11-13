import { useState, useEffect, useCallback } from "react";

export function useFilters() {
  const API_URL = "/api";
  const [clientName, setClientName] = useState<string>("");
  const [startDate, setStartDate] = useState("2025-01-01");
  const [endDate, setEndDate] = useState("2025-07-31");
  const [campaigns, setCampaigns] = useState<string[]>([]);
  const [selectedCampaign, setSelectedCampaign] = useState<
    string | undefined
  >();
  const [assetGroups, setAssetGroups] = useState<string[]>([]);
  const [selectedAssetGroup, setSelectedAssetGroup] = useState<
    string | undefined
  >();
  const [selectedCustomLabel, setSelectedCustomLabel] =
    useState<string>("Alle Custom Labels");

  const fetchInitialFilters = useCallback(async (force = false) => {
    try {
      const respCamps = await fetch(
        `${API_URL}/google-campaigns${force ? "?fetch=1" : ""}`,
        { credentials: "include" }
      );
      const jsonCamps = await respCamps.json();

      // support { data: [...] } or direct array
      const campList = Array.isArray(jsonCamps?.data)
        ? jsonCamps.data
        : Array.isArray(jsonCamps)
        ? jsonCamps
        : [];

      setCampaigns(["Alle Kampagnen", ...campList]);
      const firstCamp = campList?.[0];
      setSelectedCampaign(firstCamp);

      if (firstCamp) {
        // Placeholder hasta que el backend esté listo
        const groupList = ["Asset Group 1", "Asset Group 2", "Asset Group 3"];
        setAssetGroups(["Alle Asset-Gruppen", ...groupList]);
        setSelectedAssetGroup(groupList?.[0]);
      }
    } catch (err) {
      console.error("Failed to fetch filters:", err);
    }
  }, []);

  // fetch filters on mount
  useEffect(() => {
    fetchInitialFilters(false);
  }, [fetchInitialFilters]);

  return {
    campaigns,
    selectedCampaign,
    setSelectedCampaign,
    assetGroups,
    selectedAssetGroup,
    setSelectedAssetGroup,
    selectedCustomLabel,
    setSelectedCustomLabel,
    fetchInitialFilters,
    startDate,
    endDate,
    setStartDate,
    setEndDate,
    clientName,
  };
}
