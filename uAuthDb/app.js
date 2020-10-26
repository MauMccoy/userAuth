/*
  libraries used: express bcrypt body-parser nodemon

*/
// require express
const express = require('express');
const app = express();
// require bcrypt library
const bcrypt = require('bcrypt');
// accept json
app.use(express.json());
/*
  user array instead of database for testing purposes
*/
const users = [];
/*
  routes
*/
app.get('/users',(req,res)=>{
  res.json(users)
})
/*
  step 1 create salt

  step 2 use salt with password
          to create a hashed password
*/
// bcrypt salt
const saltRounds = 10
const password = 'DFGh5546*%^__90'

bcrypt
  .genSalt(saltRounds)
  .then(salt =>{
    console.log(`Salt: ${salt}`);
    return bcrypt.hash(password, salt);
  })
  .then(hash =>{
    console.log(`Hash: ${hash}`);
    // Store hash in yout password DB.
  })
  .then(res => {
    console.log(res);
  })
  .catch(err => console.error(err.message));

app.post('/users/login', async(req,res)=>{
  const user = users.find(user => user.name = req.body.name)
  if (user === null) {
    return res.status(400).send('cannot find user')
  }
  try {
    bcrypt.compare(req.body.password, user.password)
  } catch {
    res.status(500).send()
  }
})
// start server
app.listen(3000,()=>{
  // console.log('server running');
})
