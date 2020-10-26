const express = require('express')
const mongoose = require('mongoose')
const app = express()
/*
---------------WORKSPACE------------------
*/

/*
---------WORKSPACE-----ENDS---------------
*/
/*
---------------DATABASE-------------------
*/
// create mongo DATABASE
mongoose.connect('mongodb://127.0.0.1:27017/user', //mongo url
                 { useNewUrlParser: true, useUnifiedTopology: true }
                )

//parse JSON without getting any errors inside Express
.then( () => console.log('database connected'))//The first line allows us to use form data
.catch( err => console.log(err))
/*
---------------MIDDLEWARE-----------------
*/
app.use(express.urlencoded({ extended: true}))
app.use(express.json())
/*
---------------CONTROLLERS----------------
*/
const UserControl = require('./controllers/userControl')
/*
---------------ROUTES---------------------
*/
app.post('/api/user/create', UserControl.create)
app.post('/api/user/update', UserControl.update)
app.get('/api/user/retrieve', UserControl.retrieve)
app.delete('/api/user/delete', UserControl.delete)
/*
---------------START SERVER---------------
*/
app.listen(3000, () => console.log('server running on port:3000'))
