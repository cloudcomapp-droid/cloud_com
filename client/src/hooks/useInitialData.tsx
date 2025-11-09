import { useState, useCallback } from "react";

export function useInitialData() {
  const [campaigns, setCampaigns] = useState<string[]>([]);
  const [selectedCampaign, setSelectedCampaign] = useState<
    string | undefined
  >();
  const [assetGroups, setAssetGroups] = useState<string[]>([]);
  const [selectedAssetGroup, setSelectedAssetGroup] = useState<
    string | undefined
  >();
  const API_URL = "http://34.28.14.149:5000";
  const fetchInitialData = useCallback(async () => {
    // fetch campaigns
    const resCampaigns = await fetch(`${API_URL}/google-campaigns`, {
      credentials: "include",
    });
    const { data: campaignList } = await resCampaigns.json();
    setCampaigns(["All Campaigns", ...campaignList]);
    const firstCampaign = campaignList[0];
    setSelectedCampaign(firstCampaign);

    // fetch asset groups for that campaign
    if (firstCampaign) {
      const resGroups = await fetch(
        `${API_URL}/google-asset-groups?campaignId=${firstCampaign}`,
        { credentials: "include" }
      );
      const { data: groupList } = await resGroups.json();
      setAssetGroups(["All Asset-Groups", ...groupList]);
      setSelectedAssetGroup(groupList[0]);
    }
  }, []);

  return {
    campaigns,
    selectedCampaign,
    setSelectedCampaign,
    assetGroups,
    selectedAssetGroup,
    setSelectedAssetGroup,
    fetchInitialData,
  };
}
