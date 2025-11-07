import fetch from "node-fetch";
import { getAccessToken } from "../zzz_con_GAds.js";

/**
 * fetch all campaigns for a given client
 * @param {string} clientId - Google Ads client ID
 * @returns array of campaigns with id and name
 */
export async function getCampaigns(clientId) {
  // dev
  if (clientId == undefined) var clientId = "4693401961";

  // recover access token
  const accessToken = await getAccessToken();

  // define request settings
  const url = `https://googleads.googleapis.com/v21/customers/${clientId}/googleAds:searchStream`;
  const query = `
    SELECT 
      campaign.id, 
      campaign.name, 
      campaign.network_settings.target_content_network, 
      campaign.advertising_channel_type, 
      campaign.status 
    FROM campaign  
    WHERE campaign.advertising_channel_type IN ('PERFORMANCE_MAX')
  `;
  const options = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json; charset=UTF-8",
      "developer-token": "HYXVG-hk-XGQGks7ZxD6yw",
      "login-customer-id": "7576810724"
    },
    body: JSON.stringify({ query })
  };

  // fetch campaigns list
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error(`Failed to fetch campaigns: ${response.status} ${response.statusText}`);
  }

  // parse response as array of objects with results
  const responseData = await response.json();
  const campsVec = responseData[0]?.results || [];

  // deduplicate by name + id
  const seen = new Set();
  const campaigns = [];

  for (const item of campsVec) {
    const camp = item.campaign;
    const key = `${camp.name}**${camp.id}`;
    if (!seen.has(key)) {
      seen.add(key);
      campaigns.push({
        id: camp.id,
        name: camp.name,
        status: camp.status,
      });
    }
  }
  // console.log(campaigns);

  return campaigns;
}