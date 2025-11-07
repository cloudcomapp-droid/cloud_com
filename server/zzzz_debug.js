import { genRefreshToken_gads, getAccessToken, testGAdsConnection } from './zzz_con_GAds.js';
import { getCampaigns } from './data_fetching/campaigns.js';
import { getAssetGroups } from './data_fetching/asset_groups.js';

// genRefreshToken_gads();

// getAccessToken()
//   .then(token => console.log('Access token:', token))
//   .catch(err => console.error('Error getting access token:', err));

// testGAdsConnection('4693401961')
// testGAdsConnection()
//   .then(data => console.log(JSON.stringify(data, null, 2)))
//   .catch(console.error);


getCampaigns();
// getAssetGroups();