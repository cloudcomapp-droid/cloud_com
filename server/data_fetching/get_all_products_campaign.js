import fetch from "node-fetch";
import { getAccessToken } from "../zzz_con_GAds.js";

const version = "21";

/**
 * Fetch shopping products (Performance Max) for a given campaign and date range
 * @param {string} clientId - Google Ads client ID
 * @param {string} campaignId - campaign ID to filter
 * @param {string} startDate - yyyy-MM-dd
 * @param {string} endDate - yyyy-MM-dd
 */
export async function getShoppingProducts(clientId, campaignId, startDate, endDate) {
  const accessToken = await getAccessToken();

  const url = `https://googleads.googleapis.com/v${version}/customers/${clientId}/googleAds:searchStream`;

  const query = `
    SELECT 
      campaign.id, 
      campaign.name, 
      campaign.advertising_channel_type, 
      segments.product_item_id, 
      segments.product_title, 
      metrics.impressions, 
      metrics.clicks, 
      metrics.ctr, 
      metrics.conversions, 
      metrics.conversions_value, 
      metrics.cost_micros, 
      segments.product_custom_attribute0, 
      segments.product_custom_attribute1, 
      segments.product_custom_attribute2, 
      segments.product_custom_attribute3, 
      segments.product_custom_attribute4, 
      segments.product_feed_label 
    FROM shopping_performance_view 
    WHERE 
      campaign.id = ${campaignId}
      AND campaign.advertising_channel_type IN ('PERFORMANCE_MAX')
      AND segments.date BETWEEN '${startDate}' AND '${endDate}'
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
    throw new Error(`Failed to fetch shopping products: ${response.status} ${response.statusText}\n${errText}`);
  }

  const responseData = await response.json();
  const results = responseData.flatMap(chunk => chunk.results || []);

  // Parse and clean
  const products = results.map(item => {
    const camp = item.campaign;
    const seg = item.segments;
    const met = item.metrics;

    if (!camp || !seg || !met) return null;

    return {
      camp_id: camp.id,
      camp_name: camp.name,
      camp_type: camp.advertisingChannelType,
      prod_id: seg.productItemId,
      prod_name: seg.productTitle || "Title not returned in GAds API fetch",
      prod_imprs: +met.impressions || 0,
      prod_clcks: +met.clicks || 0,
      prod_ctr: isNaN(+met.ctr) ? 0 : +met.ctr,
      prod_convs: +met.conversions || 0,
      prod_value: +met.conversionsValue || 0,
      prod_costs: +met.costMicros / 1e6 || 0, // convert from micros
    };
  }).filter(Boolean);

  return products;
}
