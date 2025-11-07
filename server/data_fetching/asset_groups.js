import fetch from "node-fetch";
import { getAccessToken } from "../zzz_con_GAds.js";

/**
 * fetch all asset groups for a given campaign and date range
 * @param {string} clientId - Google Ads client ID
 * @param {string} campaignId - campaign ID to filter asset groups
 * @returns array of asset groups with id and name
 */
export async function getAssetGroups(clientId, campaignId) {
    // dev
    if (clientId == undefined) {
        var clientId = "1635968127";
        var campaignId = "17662012260";
    }

    // recover access token
    const accessToken = await getAccessToken();

    // define request settings
    const url = `https://googleads.googleapis.com/v21/customers/${clientId}/googleAds:searchStream`;
    const query = `
      SELECT 
        asset_group.id, 
        asset_group.name, 
        asset_group.campaign 
      FROM asset_group 
      WHERE 
        asset_group.status = 'ENABLED' 
        AND asset_group.campaign = 'customers/${clientId}/campaigns/${campaignId}'
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

    // fetch asset groups list
    const response = await fetch(url, options);
    if (!response.ok) {
        throw new Error(`Failed to fetch asset groups: ${response.status} ${response.statusText}`);
    }

    // parse response
    const responseData = await response.json();
    const assetsVec = responseData[0]?.results || [];

    // normalize
    const seen = new Set();
    const assetGroups = [];

    for (const item of assetsVec) {
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
    }
    console.log(assetGroups);

    return assetGroups;
}