const yargs = require('yargs');
const axios = require('axios');

const baseMapQuestAPI = 'http://www.mapquestapi.com/geocoding/v1/address?'
const mapQuestGeocodeAPIKey = 'qBDY5DY7Xl3O4TXeuIFEZepJhx9SuD0q';
const baseDarkskyAPI = 'https://api.darksky.net/forecast';
const darkskyAPIKey = 'b8835661e2ed93003116cb874dcb5a43';

const argv = yargs
  .options({
    a: {
      demand: true,
      alias: 'address',
      describe: 'Address to fetch the weather for',
      // tells yargs to always parse the a (address) arguement as a string and not a number or a boolean
      string: true
    },
  })
  .help()
  // set h as the alias for help
  .alias('help', 'h')
  .argv;

  var encodedAddress = encodeURIComponent(argv.address);
  var requestUrl = `${baseMapQuestAPI}key=${mapQuestGeocodeAPIKey}&location=${encodedAddress}`;
  // axios knows to expect JSON data returned, and also returns a promise
  axios.get(requestUrl).then((response) => {
    // throw an error if the status property is different
    // ZERO_RESULTS is from the google api not mapquest but showing it here for illustration
    if (response.data.status === 'ZERO_RESULTS') {
      throw new Error('Unable to find the address.');
    }
    var lat = response.data.results[0].locations[0].latLng.lat;
    var lng = response.data.results[0].locations[0].latLng.lng;
    var weatherRequestUrl = `${baseDarkskyAPI}/${darkskyAPIKey}/${lat},${lng}`
    console.log(response.data);
    // console.log(response.data.results[0]);
    // console.log(response.data.results[0].locations[0]);
    // console.log(response.data.results[0].locations[0].street);
    console.log(response.data);
    return axios.get(weatherRequestUrl);
  }).then((response) => {
    var temp = response.data.currently.temperature;
    var humidity = response.data.currently.humidity;
    console.log(`It is currently ${temp}. Humidity is ${humidity}.`);
  }).catch((e) => {
    if (e.code === 'ENOTFOUND') {
      console.log('Unable to connect to api servers.');
    } else {
      console.log(e);
      console.log(e.message); // if the error code is not ENOTFOUND print the error message to the screen (is it always the one set above in throw new error?
    }
  });
