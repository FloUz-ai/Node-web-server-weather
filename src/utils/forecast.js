const request = require("request");

const forecast = (lat, long, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=8ca1601ddf83d1ca7723b055a649e5a4&query=" +
    lat +
    "," +
    long +
    "&units=m";

  request({ url, json: true }, (err, res) => {
    if (err) {
      callback("Unable to connect", undefined);
    } else if (res.body.err) {
      callback("Unable to get a result", undefined);
    } else {
      const { weather_descriptions, temperature, feelslike } = res.body.current;
      callback(
        undefined,
        weather_descriptions[0] +
          ". It is currently " +
          temperature +
          " degres.It feels like " +
          feelslike +
          " degres out. Cheers!"
      );
    }
  });
};

module.exports = forecast;
