var asyncAdd = (a, b) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (typeof a === 'number' && typeof b === 'number') {
        resolve (a + b);
      } else {
        reject('Arguements must be numbers');
      }
    }, 1500);
  });
};

// first success, second is the error case
// when written like this, the promise chain thinks we will have cleaned up the error if there is a problm with the first Promise
asyncAdd(5, 7).then((res) => {
  console.log('Result: ', res);
  // promise chaining
  return asyncAdd(res, 33);
}, (errorMessage) => {
  console.log('Error message: ', errorMessage);
}).then((res) => { // success handler
  console.log('Should be 45', res);
}, (errorMessage) => { // error handler
  console.log(errorMessage);
});

// catch promise method
asyncAdd(5, 7).then((res) => {
  console.log('Result: ', res);
  // promise chaining
  return asyncAdd(res, 33);
}).then((res) => { // success handler
  console.log('Should be 45', res);
}).catch((errorMessage) => { // specify one error handler
  console.log(errorMessage);
});

// can only send only one parameter with resolve or reject, so if you want to second
// multiple parameters you need to send an object
// can only resolve or reject a promise once
// a promise is considered settled when it is accepted or rejected, it is pending otherwise
var somePromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    // can only resolve or reject a promise once
    resolve('It worked.');
    reject('It didnt work.');
  }, 2500);
});

// the second argument lets us handle errors in the promise
somePromise.then((message) => {
  console.log('Success: ', message);
}, (errorMessage) => {
  console.log('Error: ', errorMessage);
});
