import fetch from "node-fetch";
import { getAccessToken } from "../zzz_con_GAds.js";

/**
 * Fetch customer name for a given Google Ads client ID
 * @param {string} clientId - Google Ads client ID
 * @returns {Promise<string>} - Customer descriptive name
 */
export async function getCustomerName(clientId) {
  // default client (dev)
  if (!clientId) clientId = "4693401961";

  // recover access token
  const accessToken = await getAccessToken();

  // define request settings
  const url = `https://googleads.googleapis.com/v21/customers/${clientId}/googleAds:searchStream`;
  const query = `
    SELECT
      customer.descriptive_name
    FROM customer
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

  // fetch customer data
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error(`Failed to fetch customer name: ${response.status} ${response.statusText}`);
  }

  // parse response
  const responseData = await response.json();
  const clientName = responseData?.[0]?.results?.[0]?.customer?.descriptiveName || null;

  return clientName;
}
