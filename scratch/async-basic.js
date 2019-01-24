console.log('Starting app');

setTimeout(() => {
  console.log('inside of callback');
},2000); // registering a callback to fire in 2 seconds

setTimeout(() => {
  console.log('zero second callback');
},0); // registering a callback to fire in 2 seconds

console.log('Finishing up');
