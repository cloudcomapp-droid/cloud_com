import fetch from "node-fetch";
import { getAccessToken } from "../zzz_con_GAds.js";

/**
 * Fetch products of a PMax campaign grouped by custom labels.
 */
export async function getProductsCampaignLabels(
  clientId,
  campID,
  indexToFetch,
  selCustLbl
) {
  if (!clientId) clientId = "4693401961";

  const accessToken = await getAccessToken();

  const url = `https://googleads.googleapis.com/v21/customers/${clientId}/googleAds:searchStream`;

  const query = `
    SELECT 
      shopping_product.issues,
      shopping_product.item_id,
      shopping_product.title,
      shopping_product.custom_attribute0,
      shopping_product.custom_attribute1,
      shopping_product.custom_attribute2,
      shopping_product.custom_attribute3,
      shopping_product.custom_attribute4
    FROM shopping_product
    WHERE campaign.id = ${campID}
  `;

  const options = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json; charset=UTF-8",
      "developer-token": "HYXVG-hk-XGQGks7ZxD6yw",
      "login-customer-id": "7576810724",
    },
    body: JSON.stringify({ query }),
  };

  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error(
      `Failed to fetch product data: ${response.status} ${response.statusText}`
    );
  }

  const chunks = await response.json();

  // Arrays
  const allItems = [];
  const todayIds = [];
  const todayTitles = [];

  for (const chunk of chunks) {
    if (!chunk.results) continue;

    for (const row of chunk.results) {
      const prod = row.shoppingProduct;
      if (!prod) continue;

      const itemId = prod.itemId;
      const title = prod.title;

      const attrs = [
        prod.customAttribute0,
        prod.customAttribute1,
        prod.customAttribute2,
        prod.customAttribute3,
        prod.customAttribute4,
      ];

      // SAVE ALL ITEMS
      allItems.push({ itemId, title, attrs });

      // CASE: "all" → means: match ALL PRODUCTS
      if (selCustLbl === "all") {
        // Build title with attributes
        const cleanedAttrs = attrs.filter((x) => x && x.trim() !== "");
        const finalTitle =
          cleanedAttrs.length > 0
            ? `${title};${cleanedAttrs.join(";")}`
            : title;

        todayIds.push(itemId);
        todayTitles.push(finalTitle);

        continue;
      }

      // NORMAL CASE → filter by single label
      const label = attrs[indexToFetch];
      if (label === selCustLbl) {
        todayIds.push(itemId);
        todayTitles.push(title);
      }
    }
  }

  // Deduplicate allItems by itemId
  const uniqueAllItems = Array.from(
    new Map(allItems.map((i) => [i.itemId, i])).values()
  );

  // Dedupe matched IDs
  const uniqueTodayIds = [...new Set(todayIds)];
  const uniqueTodayTitles = uniqueTodayIds.map((id) => {
    const idx = todayIds.indexOf(id);
    return todayTitles[idx] || "";
  });

  return {
    allItems,
    uniqueAllItems,
    matchedItems: uniqueTodayIds.map((id, i) => ({
      itemId: id,
      title: uniqueTodayTitles[i],
    })),
  };
}
