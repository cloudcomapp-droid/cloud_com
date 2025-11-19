import { AssetGroup, Campaign, Product } from "@/interfaces/interfaces";
import { mergeProducts } from "@/utils/mergeProducts";
import { useState, useEffect, useCallback } from "react";

export function useFilters() {
  const API_URL = "/api";
  const initialClientId = "4693401961";
  const initialCampaignId = "22556496600";
  const initialAssetGroupId = "6576572641";
  const [clientId, setClientId] = useState(initialClientId);

  const [clientName, setClientName] = useState("");
  const [startDate, setStartDate] = useState("2025-01-01");
  const [endDate, setEndDate] = useState("2025-10-31");

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
  const [productsAssetGroupIds, setProductsAssetGroupIds] = useState<string[]>(
    []
  );
  const [productsByCustomLabel, setProductsByCustomLabel] = useState<any[]>([]);

  // 🔹 Fetch productos (manual o desde init)
  const fetchProductsCampaing = useCallback(
    async (force = false, campaignId = initialCampaignId) => {
      try {
        const respProducts = await fetch(
          `${API_URL}/google-shopping-products?clientId=${encodeURIComponent(
            clientId
          )}&campaignId=${encodeURIComponent(
            campaignId
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
        return productsList;
      } catch (err) {
        console.error("Failed to fetch products:", err);
      }
    },
    [API_URL, clientId, selectedCampaign, startDate, endDate]
  );

  // --- 2️⃣ Fetch products by asset group (NUEVO) ---
  const fetchProductsAssetGroup = useCallback(
    async (force = false, assetGroupId = initialAssetGroupId) => {
      if (!assetGroupId || assetGroupId === "all") {
        console.warn("No asset group selected or selected = ALL");
        return;
      }

      try {
        const resp = await fetch(
          `${API_URL}/google-listing-group-products?clientId=${encodeURIComponent(
            clientId
          )}&assetGroupId=${encodeURIComponent(assetGroupId)}${
            force ? "&fetch=1" : ""
          }`,
          { credentials: "include" }
        );

        const json = await resp.json();
        const ids: string[] = Array.isArray(json?.data) ? json.data : [];

        console.log("AssetGroup Product IDs:", ids);

        setProductsAssetGroupIds(ids);
        return ids;
      } catch (err) {
        console.error("❌ Failed to fetch asset group products:", err);
      }
    },
    [API_URL, clientId, selectedAssetGroup]
  );

  const fetchProductsCustomLabels = useCallback(
    async (
      force = false,
      campID: string = selectedCampaign?.id || initialCampaignId,
      customLabel: string = selectedCustomLabel
    ) => {
      if (!campID || campID === "all") {
        console.warn("❌ No valid campaign selected");
        return;
      }

      if (!customLabel || customLabel === "All Custom Labels") {
        console.warn("⚠ Custom label is ALL or empty");
        return;
      }

      // ---- PARSE CUSTOM LABEL ----
      // ejemplo: geräte***INDEX1
      const [labelNameRaw, indexRaw] = customLabel.split("***");

      if (!labelNameRaw || !indexRaw) {
        console.error("❌ Invalid custom label format");
        return;
      }

      const labelName = labelNameRaw.trim(); // "geräte"

      // obtener número del index
      // INDEX1 → 1
      const indexNum = Number(indexRaw.replace("INDEX", "").trim());

      if (isNaN(indexNum)) {
        console.error("❌ Could not extract index number from custom label");
        return;
      }

      try {
        const url = `${API_URL}/google-products-campaign-labels?clientId=${encodeURIComponent(
          clientId
        )}&campID=${encodeURIComponent(
          campID
        )}&indexToFetch=${indexNum}&selCustLbl=${encodeURIComponent(
          labelName
        )}${force ? "&fetch=1" : ""}`;

        const resp = await fetch(url, { credentials: "include" });
        const json = await resp.json();

        const data = json?.data?.matchedItems || [];
        const dataWithDuplicates = json?.data?.allItems || [];

        setProductsByCustomLabel(data);
        return { data, dataWithDuplicates };
      } catch (err) {
        console.error("❌ Failed to fetch custom label products:", err);
      }
    },
    [API_URL, clientId, selectedCampaign, selectedCustomLabel]
  );

  const fetchClientName = useCallback(
    async (id: string) => {
      try {
        const respClient = await fetch(
          `${API_URL}/google-customer-name?clientId=${encodeURIComponent(id)}`,
          { credentials: "include" }
        );
        const jsonClient = await respClient.json();
        setClientName(jsonClient?.data || "");
      } catch (err) {
        console.error("Failed to search client by ID:", err);
      }
    },
    [API_URL]
  );

  const fetchCampaignsFromClient = useCallback(
    async (id: string) => {
      try {
        const respCamps = await fetch(
          `${API_URL}/google-campaigns?clientId=${encodeURIComponent(id)}`,
          { credentials: "include" }
        );
        const jsonCamps = await respCamps.json();
        const campList: Campaign[] = Array.isArray(jsonCamps?.data)
          ? jsonCamps.data
          : [];
        const allCamps = [{ id: "all", name: "All Campaigns" }, ...campList];
        setCampaigns(allCamps);
        setSelectedCampaign(campList[0]);
        return campList;
      } catch (err) {
        console.error("Failed to fetch campaigns:", err);
      }
    },
    [API_URL]
  );

  const fetchAssetGroupsFromCampaign = useCallback(
    async (campaignId: string, clientId: string, force = false) => {
      try {
        const respAssets = await fetch(
          `${API_URL}/google-asset-groups?campaignId=${encodeURIComponent(
            campaignId
          )}&clientId=${encodeURIComponent(clientId)}${
            force ? "&fetch=1" : ""
          }`,
          { credentials: "include" }
        );
        return respAssets;
      } catch (err) {
        console.error("Failed to fetch asset groups:", err);
      }
    },
    [API_URL]
  );

  const fetchCustomLabels = useCallback(
    async (clientId: string, force = false) => {
      try {
        const respLabels = await fetch(
          `${API_URL}/google-custom-labels?clientId=${encodeURIComponent(
            clientId
          )}${force ? "&fetch=1" : ""}`,
          { credentials: "include" }
        );
        return respLabels;
      } catch (err) {
        console.error("Failed to fetch custom labels:", err);
      }
    },
    [API_URL]
  );

  // 🔹 Fetch inicial (campañas, cliente, asset groups, labels, productos)
  const fetchInitialFilters = useCallback(async (force = false) => {
    const debug = false;
    try {
      // --- 1️⃣ Fetch campaigns ---
      const campList = await fetchCampaignsFromClient(clientId);
      setSelectedCampaign(campList?.find((c) => c.id === initialCampaignId));

      // --- 2️⃣ Fetch client name ---
      await fetchClientName(clientId);

      // --- 3️⃣ Fetch all asset groups ---
      if (campList.length > 0) {
        const allGroups: AssetGroup[] = [];

        for (const campaign of campList) {
          const respAssets = await fetchAssetGroupsFromCampaign(
            campaign.id,
            clientId,
            force
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
        setSelectedAssetGroup(
          finalGroups.find((g) => g.id === initialAssetGroupId)
        );
      }

      // --- 4️⃣ Fetch Custom Labels ---
      const respLabels = await fetchCustomLabels(clientId, force);
      const jsonLabels = await respLabels.json();
      const labels: string[] = Array.isArray(jsonLabels?.data)
        ? jsonLabels.data
        : [];

      const allLabels = ["All Custom Labels", ...labels];
      setCustomLabels(allLabels);
      setSelectedCustomLabel(allLabels[1]);

      // --- 5️⃣ Fetch Products  ---

      // 5.1 Fetch all products for the initial campaign
      const productsCampaing = await fetchProductsCampaing(
        force,
        initialCampaignId
      );

      //5.2 Fetch products by asset group
      const productsAssetGroup = await fetchProductsAssetGroup(
        force,
        initialAssetGroupId
      );

      // 5.3 Fetch products by custom label
      const productsByLabel = await fetchProductsCustomLabels(
        force,
        initialCampaignId,
        allLabels[1]
      );

      // 6️⃣ Order products

      const productsMerged = mergeProducts(
        productsCampaing || [],
        productsAssetGroup || [],
        productsByLabel?.data || []
      );

      setProducts(productsMerged);
      if (debug) console.log("Merged products:", productsMerged);
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
      setSelectedAssetGroup(
        finalGroups.find((g) => g.id === initialAssetGroupId) ?? finalGroups[0]
      );
    }
  }, [selectedCampaign, assetGroups]);

  const searchClientById = useCallback(async (id: string) => {
    try {
      const respClient = await fetch(
        `${API_URL}/google-customer-name?clientId=${encodeURIComponent(id)}`,
        { credentials: "include" }
      );
      const jsonClient = await respClient.json();
      setClientName(jsonClient?.data || "");
    } catch (err) {
      console.error("Failed to search client by ID:", err);
    }
  }, []);

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
    fetchInitialFilters,
    searchClientById,
    clientId,
  };
}
