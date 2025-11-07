import fetch from "node-fetch";
import { getAccessToken } from "../zzz_con_GAds.js";

/**
 * fetch products stats for the specified
 * {client, campaign, asset-group triple}
 * @param {string} clientId - Google Ads client ID
 * @param {string} campaignId - Campaign ID
 * @param {string} agroupId - Asset Group ID
 * @returns array of stats for the relevant products
 */
export async function getStatistics(clientId, campaignId, agroupId) {
  // dev
  if (clientId == undefined) {
    var clientId = "7963988053";
    var campaignId = "20850835867";
    var agroupId = "";
  }

  // recover access token
  const accessToken = await getAccessToken();

  // define request settings
  // const url = `https://googleads.googleapis.com/v21/customers/${clientId}/googleAds:searchStream`;
  campNames.forEach((aCampName, ic) => {
    const timeZone = SpreadsheetApp.getActive().getSpreadsheetTimeZone();
    const strDate = Utilities.formatDate(startingDate, timeZone, 'yyyy-MM-dd');
    const endDate = Utilities.formatDate(endDate, timeZone, 'yyyy-MM-dd');

    const query = `
      SELECT
        campaign.id, campaign.name, campaign.advertising_channel_type,
        segments.product_item_id, segments.product_title, metrics.impressions,
        metrics.clicks, metrics.ctr, metrics.conversions, metrics.conversions_value,
        metrics.cost_micros, segments.product_custom_attribute0,
        segments.product_custom_attribute1, segments.product_custom_attribute2,
        segments.product_custom_attribute3, segments.product_custom_attribute4,
        segments.product_feed_label
      FROM shopping_performance_view
      WHERE
        campaign.name = '${aCampName}' AND
        campaign.advertising_channel_type IN ('PERFORMANCE_MAX') AND
        segments.date BETWEEN '${strDate}' AND '${endDate}'
    `;

    const options_prod = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json; charset=UTF-8",
        "developer-token": "HYXVG-hk-XGQGks7ZxD6yw",
        "login-customer-id": "7576810724"
      },
      body: JSON.stringify({ query }),
    };

    // fetch campaigns list
    const response_prod = await fetch(url, options_prod);
  });
  // if (!response.ok) {
  //   throw new Error(`Failed to fetch campaigns: ${response.status} ${response.statusText}`);
  // }

  // // parse response as array of objects with results
  // const responseData = await response.json();
  // const campsVec = responseData[0]?.results || [];

  // // deduplicate by name + id
  // const seen = new Set();
  // const campaigns = [];

  // for (const item of campsVec) {
  //   const camp = item.campaign;
  //   const key = `${camp.name}**${camp.id}`;
  //   if (!seen.has(key)) {
  //     seen.add(key);
  //     campaigns.push({
  //       id: camp.id,
  //       name: camp.name,
  //       status: camp.status,
  //     });
  //   }
  // }
  // // console.log(campaigns);

  // return campaigns;
}