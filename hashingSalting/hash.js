// npm packages
const bcrypt = require("bcrypt");

// globals
const password = "secret";
const saltRounds = 16;

bcrypt
  .hash(password, saltRounds)
  .then(hashedPassword => {
    console.log("hash", hashedPassword);
    return hashedPassword; // notice that all of these methods are asynchronous!
  })
  .then(hash => {
    return bcrypt.compare(password, hash); // what does this method return?
  })
  .then(res => {
    console.log("match", res);
  });
