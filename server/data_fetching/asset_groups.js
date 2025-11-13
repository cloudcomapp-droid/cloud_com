import fetch from "node-fetch";
import { getAccessToken } from "../zzz_con_GAds.js";

const version = "21";

/**
 * Fetch all asset groups for a given campaign and date range
 * @param {string} clientId - Google Ads client ID
 * @param {string} campaignId - campaign ID to filter asset groups
 * @param {string} [startDate] - optional start date (yyyy-MM-dd)
 * @param {string} [endDate] - optional end date (yyyy-MM-dd)
 */
export async function getAssetGroups(clientId = "1635968127", campaignId = "17662012260", startDate, endDate) {
  const accessToken = await getAccessToken();

  const url = `https://googleads.googleapis.com/v${version}/customers/${clientId}/googleAds:searchStream`;

  const query = `
    SELECT 
      asset_group.id, 
      asset_group.name, 
      asset_group.campaign 
    FROM asset_group 
    WHERE 
      asset_group.status = 'ENABLED' 
      AND asset_group.campaign = 'customers/${clientId}/campaigns/${campaignId}'
      ${startDate && endDate ? `AND segments.date BETWEEN '${startDate}' AND '${endDate}'` : ""}
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
    throw new Error(`Failed to fetch asset groups: ${response.status} ${response.statusText}\n${errText}`);
  }

  const responseData = await response.json();
  const assetsVec = responseData.flatMap(chunk => chunk.results || []);

  const seen = new Set();
  const assetGroups = [];

  for (const item of assetsVec) {
    try {
      const ag = item.assetGroup;
      const key = `${ag.name}**${ag.id}`;
      if (!seen.has(key)) {
        seen.add(key);
        assetGroups.push({
          id: ag.id,
          name: ag.name,
          campaign: ag.campaign,
        });
      }
    } catch {}
  }

  console.log(assetGroups);
  return assetGroups;
}
