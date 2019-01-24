const request = require('request');

const baseGoogleAPI = 'https://maps.googleapis.com/maps/api/geocode/json?'
const baseMapQuestAPI = 'http://www.mapquestapi.com/geocoding/v1/address?'
const googleGeocodeAPIKey = 'AIzaSyDBfxJk-whrdMs4zK3fco3-zGku0ruesF4';
const mapQuestGeocodeAPIKey = 'qBDY5DY7Xl3O4TXeuIFEZepJhx9SuD0q';

var geocodeAddress = (service, address, useKeyYN, callback) => {
  var encodedAddress = encodeURIComponent(address);
  var useKeyBoo = false;

  if (useKeyYN === 'yes' || useKeyYN === 'y') {
    useKeyBoo = true;
  }

  console.log('service: ', service);
  console.log('encodedAddress: ', encodedAddress);
  console.log('address: ', address);
  console.log('useKeyYN: ', useKeyYN);
  console.log('useKeyBoo: ', useKeyBoo);

  var myService = service.toUpperCase();

  if (myService === 'GOOGLE' || myService === 'G') {
    var requestUrl = baseGoogleAPI + 'address=' + encodedAddress;
    // ternary operator, an operator that takes three arguments
    if (useKeyBoo) {
      var requestUrl = requestUrl + '&key=' + googleGeocodeAPIKey;
    }

    console.log('Calling: ', requestUrl);

    // url: 'https://maps.googleapis.com/maps/api/geocode/json?address=1301%20lombard%20street%20philadephia&key=AIzaSyDBfxJk-whrdMs4zK3fco3-zGku0ruesF4',
    // url: 'https://maps.googleapis.com/maps/api/geocode/json?address=1301%20lombard%20street%20philadephia&key=AIzaSyDBfxJk-whrdMs4zK3fco3-zGku0ruesF4',
    // url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${googleGeocodeAPIKey}`,
    // json: true // tells the request that the reponse will be in json and convert it to a json object
    request({
      url: requestUrl,
      json: true
    }, (error, response, body) => {
      if (error) {
        callback('Error, unable to connect to ' + requestUrl);
        // console.log('Error, unable to connect to', requestUrl);
        // console.log('error: ', error);
      } else if (body.status === 'ZERO_RESULTS') {
        callback('Unable to find the address');
        // console.log('Unable to find the address');
      } else if (body.status === 'OVER_QUERY_LIMIT') {
        callback('You have exceeded your daily request quota for this Google API.');
        // console.log('You have exceeded your daily request quota for this Google API.');
      } else if (body.status === 'OK') {
        //console.log(body);
        // 2nd option is to filter out properties, 3rd argument determines how many lines to use for indentation
        // pretty print the data
        //console.log(JSON.stringify(body, undefined, 2));
        //console.log(JSON.stringify(response, undefined, 2));
        //console.log(JSON.stringify(error, undefined, 2));
        // access the first item in the results array followed by formatted address
        callback(undefined, {
          address: body.results[0].formatted_address,
          latitude: body.results[0].geometry.location.lat,
          longitude: body.results[0].geometry.location.lng
        });
        // console.log(`Address: ${body.results[0].formatted_address}`);
        // console.log(`Longitude: ${body.results[0].geometry.location.lat}`);
        // console.log(`Latitude: ${body.results[0].geometry.location.lng}`);
      } else {
        console.log(body);
      }
    });

  } else if (myService === 'MAPQUEST' || myService === 'M') {
    var requestUrl = baseMapQuestAPI + 'location=' + encodedAddress;

    if (useKeyBoo) {
      requestUrl = requestUrl + '&key=' + mapQuestGeocodeAPIKey;
    }

    console.log('Calling: ', requestUrl);

    // http://www.mapquestapi.com/geocoding/v1/address?key=qBDY5DY7Xl3O4TXeuIFEZepJhx9SuD0q&location=1301%20lombard%20street
    request({
      url: requestUrl,
      json: true
    }, (error, response, body) => {
      if (error) {
        console.log(error);
        callback('Error, unable to connect to ' + requestUrl);
      } else if (body.status === 'ZERO_RESULTS') {
        callback('Unable to find the address');
      } else if (body.status === 'OVER_QUERY_LIMIT') {
        callback('You have exceeded your daily request quota for this Google API.');
        // console.log('You have exceeded your daily request quota for this Google API.');
      } else if (body.info.statuscode === 0) {
      callback(undefined, {
          address: body.results[0].locations[0].street,
          latitude: body.results[0].locations[0].latLng.lat,
          longitude: body.results[0].locations[0].latLng.lng
        });
      }
    });

  }

};

module.exports.geocodeAddress = geocodeAddress;
