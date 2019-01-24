const request = require('request');

const baseDarkskyAPI = 'https://api.darksky.net/forecast';
const darkskyAPIKey = 'b8835661e2ed93003116cb874dcb5a43';

var getWeather = (lat, lng, callback) => {

  // b8835661e2ed93003116cb874dcb5a43
  // https://api.darksky.net/forecast/[key]/[latitude],[longitude]
  // https://api.darksky.net/forecast/b8835661e2ed93003116cb874dcb5a43/51.512027,-0.085618
  // var weatherRequestUrl = baseDarkskyAPI + '/' + darkskyAPIKey + '/' + lat + ',' + lng;
  var weatherRequestUrl = `${baseDarkskyAPI}/${darkskyAPIKey}/${lat},${lng}`
  console.log('weatherRequestUrl', weatherRequestUrl);
  request({
    url: weatherRequestUrl,
    json: true
  }, (error, response, body) => {
    if (error) {
      console.log(body.status);
      callback('Error, unable to connect to ' + weatherRequestUrl);
    } else if (response.statusCode === 400 || response.statusCode === 403 || response.statusCode === 404) {
      console.log('response.statusCode', response.statusCode);
      callback('Error, http response code ' + response.statusCode);
    } else if (!error && response.statusCode === 200) {
      console.log('response.statusCode', response.statusCode);
      callback(undefined, {
        temperature: body.currently.temperature,
        humidity: body.currently.humidity
      });
      // console.log(`Address: ${body.results[0].formatted_address}`);
      // console.log(`Longitude: ${body.results[0].geometry.location.lat}`);
      // console.log(`Latitude: ${body.results[0].geometry.location.lng}`);
    }
  });
};

module.exports.getWeather = getWeather;
