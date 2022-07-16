const request = require("request");

const geocode = (address, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?access_token=pk.eyJ1IjoiZmxvcmlhbmJvdWR6b3Vtb3UiLCJhIjoiY2w1ZmtscTkzMWJ3bDNsb2VyYWtsdGE4NyJ9.GUbkkZWckHvMNsw-cmolEA&limit=1";

  request({ url, json: true }, (error, response) => {
    if (error) {
      callback("Unable to connect", undefined);
    } else if (response.body.features.length === 0) {
      callback("Unable to find a result", undefined);
    } else {
      const { center, place_name } = response.body.features[0];
      callback(undefined, {
        latitude: center[1],
        longitude: center[0],
        location: place_name,
      });
    }
  });
};

module.exports = geocode;
