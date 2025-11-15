import fetch from "node-fetch";
import { getAccessToken } from "../zzz_con_GAds.js";

const version = "21";

/**
 * Fetch all productItemId values from asset_group_listing_group_filter
 * for a given asset group.
 *
 * @param {string} clientId - Google Ads customer ID
 * @param {string} assetGroupId - The asset group ID to query
 * @returns {Promise<string[]>} Array of productItemId values
 */
export async function getListingGroupProductIds(
  clientId = "1635968127",
  assetGroupId
) {
  const accessToken = await getAccessToken();

  const url = `https://googleads.googleapis.com/v${version}/customers/${clientId}/googleAds:searchStream`;

  const query = `
    SELECT
      asset_group_listing_group_filter.resource_name,
      asset_group_listing_group_filter.parent_listing_group_filter,
      asset_group_listing_group_filter.type,
      asset_group_listing_group_filter.path,
      asset_group_listing_group_filter.case_value.product_custom_attribute.index,
      asset_group_listing_group_filter.case_value.product_custom_attribute.value,
      asset_group_listing_group_filter.case_value.product_item_id.value
    FROM asset_group_listing_group_filter
    WHERE asset_group_listing_group_filter.asset_group = 
      'customers/${clientId}/assetGroups/${assetGroupId}'
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
    const errText = await response.text();
    throw new Error(
      `Failed to fetch listing group filters: ${response.status} ${response.statusText}\n${errText}`
    );
  }

  const responseData = await response.json();

  // Flatten stream chunks
  const allResults = responseData.flatMap((chunk) => chunk.results || []);

  // Extract productItemId.value like your Apps Script version
  const productIds = allResults
    .map((x) => {
      try {
        const ag = x.assetGroupListingGroupFilter;

        if (ag.type === "UNIT_INCLUDED" && ag.caseValue) {
          const cv = ag.caseValue;

          if (cv.productItemId && cv.productItemId.value) {
            return cv.productItemId.value;
          }
        }
      } catch {
        return null;
      }
      return null;
    })
    .filter((v) => v != null);

  return productIds;
}
