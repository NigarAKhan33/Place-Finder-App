// 1 for Server Build, 2 for Localhost Development
const apiLocationType: number = 1;

// connecting api url
let api_url;

if (apiLocationType == 1) {
  // api_url = '';
} else if (apiLocationType == 2) {
  // api_url = '';
}
//
export const APP_CONFIG = {
  APP_VERSION: '1.0.0',
  API_URL: api_url,
};
