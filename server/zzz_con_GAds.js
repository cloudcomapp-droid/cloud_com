// ############################################################
// Google Ads API integration using OAuth2
// ############################################################

// ============================================================
// Import required libraries
// ------------------------------------------------------------
import { OAuth2Client } from "google-auth-library"; // Google OAuth2 client
import fetch from "node-fetch"; // For making HTTP requests
import readline from "readline"; // For reading input from console
// ============================================================

// ============================================================
// General settings
// ------------------------------------------------------------
// Amidn's (cloudWEB) Google API credentials
const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const REDIRECT_URI = "http://localhost:5000/auth/google/callback";

// OAuth2 client initialized with admin credentials
const oAuth2Client = new OAuth2Client(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);

// Scopes required by Google Ads API
const SCOPES = ["https://www.googleapis.com/auth/adwords"];
// ============================================================

// ############################################################
// Step 1: Generate refresh token
// ############################################################
// ============================================================
// Function to generate a refresh token via OAuth2 flow
// (run this function once to get the refresh token)
// ------------------------------------------------------------
async function genRefreshToken_gads() {
  // Generate an authorization URL
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: "offline", // very important: requests a refresh token
    scope: SCOPES,
    prompt: "consent", // ensures refresh token is returned
  });
  console.log("1️⃣  Go to this URL in your browser and authorize the app:");
  console.log(authUrl);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  // Recover Google Ads' authorization code from user input and
  // exchange it for access and refresh tokens
  // print the tokens to console
  rl.question(
    "\n2️⃣  Paste the code from the browser here (or the URL you were rediected to if easier): ",
    async (code_url) => {
      try {
        let code = code_url;
        if (code_url.includes("http://")) {
          code = new URL(code_url).searchParams.get("code");
        }
        const { tokens } = await oAuth2Client.getToken(code);
        console.log(
          `\n✅  Here's your refresh token: ${tokens.refresh_token}\n`
        );
        // console.log('Access Token (temporary):', tokens.access_token);
        rl.close();
      } catch (err) {
        console.error("Error retrieving tokens:", err);
        rl.close();
      }
    }
  );
}
// ============================================================

// The refresh token obtained from the OAuth2 flow
// Update this value after running the function above
const REFRESH_TOKEN = process.env.GOOGLE_REFRESH_TOKEN;

// Attach the refresh token to the OAuth2 client
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });
// ############################################################

// ############################################################
// Step 2: Validate connection using simple API call
// ############################################################
// ============================================================
// Function to get a fresh access token using the refresh token
// ------------------------------------------------------------
async function getAccessToken() {
  try {
    const token = await oAuth2Client.getAccessToken();
    console.log("✅  Access token obtenido exitosamente:");
    return token.token;
  } catch (error) {
    console.error(
      "⚠️ Refresh token probablemente inválido o expirado:",
      error.message
    );
  }
}
// ============================================================

// ============================================================
// Test function to verify Google Ads API connection
// (fetches customer name for given clientId)
// ------------------------------------------------------------
async function testGAdsConnection(clientId) {
  // dev
  if (clientId == undefined) var clientId = "4693401961";

  // recover access token
  const accessToken = await getAccessToken();

  // define request settings
  const url = `https://googleads.googleapis.com/v21/customers/${clientId}/googleAds:searchStream`;
  const options = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
      "developer-token": "HYXVG-hk-XGQGks7ZxD6yw",
      "login-customer-id": "7576810724",
    },
    body: JSON.stringify({
      query: "SELECT customer.descriptive_name FROM customer",
    }),
  };

  // make the request
  const response = await fetch(url, options);

  // process and log the response
  const data = await response.json();
  console.log(JSON.stringify(data, null, 2));

  // return fetched data
  return data;
}
// ============================================================
// ############################################################

// ============================================================
// Export functions for external use
// ------------------------------------------------------------
export { genRefreshToken_gads, getAccessToken, testGAdsConnection };
// ============================================================
