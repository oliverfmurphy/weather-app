var getUser = (id, callback) => {
  var user = {
    id: id,
    name: 'User1'
  };

  setTimeout(() => {
    callback(user);
  },3000);

  // callback(user);
};

// callback function is the function you want to call when that data comes back
// only works if you actually get the user data, data expected back as a parameter to the function
getUser(31, (userObject) => {
  console.log(userObject);
});
