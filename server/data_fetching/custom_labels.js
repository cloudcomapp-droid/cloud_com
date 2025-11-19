import { getAccessToken } from "../zzz_con_GAds.js";

const version = "21";

export async function getClientCustomLabels(clientId) {
  // dev
  if (clientId == undefined) var clientId = "4693401961";

  // recover access token
  const accessToken = await getAccessToken();

  // define request settings
  const url = `https://googleads.googleapis.com/v${version}/customers/${clientId}/googleAds:searchStream`;
  const query = `
    SELECT 
      shopping_product.custom_attribute0, 
      shopping_product.custom_attribute1, 
      shopping_product.custom_attribute2, 
      shopping_product.custom_attribute3, 
      shopping_product.custom_attribute4, 
      shopping_product.language_code 
    FROM shopping_product 
    WHERE customer.id = ${clientId}
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

  // fetch product-level data
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error(`Failed to fetch custom labels: ${response.status} ${response.statusText}`);
  }

  // parse JSON stream result
  const responseData = await response.json();
  const chunks = responseData[0]?.results || [];

  // collect labels
  const allLabels = [];

  for (const item of chunks) {
    const p = item.shoppingProduct;
    if (!p) continue;

    allLabels.push(
      p.customAttribute0 && `${p.customAttribute0} -- INDEX0`,
      p.customAttribute1 && `${p.customAttribute1} -- INDEX1`,
      p.customAttribute2 && `${p.customAttribute2} -- INDEX2`,
      p.customAttribute3 && `${p.customAttribute3} -- INDEX3`,
      p.customAttribute4 && `${p.customAttribute4} -- INDEX4`
    );
  }

  // clean undefined and duplicates
  const uniqueLabels = Array.from(
    new Set(allLabels.filter(Boolean))
  );

  console.log(uniqueLabels);
  return uniqueLabels;
}
