const yargs = require('yargs');
const _ = require('lodash');

const geocode = require('./geocode/geocode');
const weatherapi = require('./weatherapi/weatherapi');

var myLat;
var myLong;

const argv = yargs
  .options({
    s: {
      demand: true,
      alias: 'service',
      describe: 'Service to fetch weather from (MapQuest or Google)',
      // tells yargs to always parse the a (address) arguement as a string and not a number or a boolean
      string: true
    },
    a: {
      demand: true,
      alias: 'address',
      describe: 'Address to fetch the weather for',
      // tells yargs to always parse the a (address) arguement as a string and not a number or a boolean
      string: true
    },
    k: {
      demand: true,
      alias: 'key',
      describe: 'yes: use the api key, no: do not use the api key (needed due to google api call restrictions).',
      // tells yargs to always parse the a (address) arguement as a string and not a number or a boolean
      string: true
    }
  })
  .help()
  // set h as the alias for help
  .alias('help', 'h')
  .argv;

console.log(argv);
console.log(argv.a);
console.log(argv.address);

// without callback
// geocode.geocodeAddress(argv.a, argv.k);
// with callback as an arrow function, the callback gets called after the requerst comes back
// errorMessage is a string, results will contain the address, the longitude and the latitude
// only one of errorMessage and results will be available at a time
geocode.geocodeAddress(argv.s, argv.a, argv.k, (errorMessage, results) => {
  if (errorMessage) {
    console.log(errorMessage);
  } else {
    // pretty print the results object
    // undefined as second parameter skips over filtering function which we do not need
    console.log(JSON.stringify(results, undefined, 2));
    myLat = results.latitude;
    myLong = results.longitude;
    console.log('myLat', myLat, 'myLong', myLong);

    weatherapi.getWeather(myLat, myLong, (errorMessage, weatherResults) => {
      if (errorMessage) {
        console.log(errorMessage);
      } else {
        // pretty print the results object
        // undefined as second parameter skips over filtering function which we do not need
        console.log(JSON.stringify(weatherResults, undefined, 2));
        console.log(`It is currently ${weatherResults.temperature}. Humidity: ${weatherResults.humidity}.`);
      }
    });

  }
});
