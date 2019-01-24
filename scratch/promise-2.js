const request = require('request');
const mapQuestAPI = 'http://www.mapquestapi.com/geocoding/v1/address?'
const mapQuestAPIKey = 'sGAqxROzDGYsAkr93OdfmPhwtMlIlFQb';

var geocodeAddress = (address) => {
  return new Promise((resolve, reject) => {
    var requestUrl = `${mapQuestAPI}key=${mapQuestAPIKey}&location=${address}`
    console.log('requestUrl', requestUrl);
    request({
      url: requestUrl,
      json: true
    }, (error, response, body) => {
      if (error) {
        console.log(error);
        reject('Error, unable to connect to ' + requestUrl);
      } else if (body.status === 'ZERO_RESULTS') {
        reject('Unable to find the address');
      } else if (body.status === 'OVER_QUERY_LIMIT') {
        reject('You have exceeded your daily request quota for this Google API.');
        // console.log('You have exceeded your daily request quota for this Google API.');
      } else if (body.info.statuscode === 0) {
      resolve({
          address: body.results[0].locations[0].street,
          latitude: body.results[0].locations[0].latLng.lat,
          longitude: body.results[0].locations[0].latLng.lng
        });
      }
    });

  });
};

geocodeAddress('19146').then((location) => {
  console.log(JSON.stringify(location, undefined, 2));
}, (errorMessage) => {
  console.log(errorMessage);
});
geocodeAddress('xyz').then((location) => {
  console.log(JSON.stringify(location, undefined, 2));
}, (errorMessage) => {
  console.log(errorMessage);
});
