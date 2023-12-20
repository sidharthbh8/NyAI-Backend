const { getJson } = require("serpapi");
require('dotenv').config();

const searchLawyersNearby = (latitude, longitude) => {
    return new Promise((resolve, reject) => {
      getJson({
        engine: "google_maps",
        q: "lawyers",
        ll: `@${latitude},${longitude},15.1z`,
        type: "search",
        api_key: process.env.SERP_API_KEY,
      }, (json) => {
        if (json.error) {
          reject(json.error);
        } else {
          resolve(json.local_results);
        }
      });
    });
  };
  
module.exports = { searchLawyersNearby };
