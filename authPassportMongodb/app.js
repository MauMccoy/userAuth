const express = require('express')
const session = require('express-session')
const mongoose = require('mongoose')
const MongoStore = require('connect-mongo')(session)

const passport = require('./passport/setup')
const auth = require('./routes/auth')

const app = express()
const MONGO_URI = 'mongodb://127.0.0.1:27017/user'

app.use(express.static('public'))
app.set('view-engine', 'ejs')

//          //
// Database //
//          //
mongoose
    .connect(MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(console.log(`MongoDB connected ${MONGO_URI}`))
    .catch(err => console.log(err))
//M         //
// iddlewar //
//         e//
app.use(express.json())
app.use(express.urlencoded({ extended: false })) //extended: false denies nested payloads

// EXPRESS  //
//          // the error happened here!!
//  SESSION //
app.use(
  session({
    secret: 'this must be a mistery',
    resave: false,
    saveUninitialized: true,
    store: new MongoStore({ mongooseConnection: mongoose.connection})
  })
)

//PASSPORT  //
//          //
//MIDDLEWARE//
app.use(passport.initialize())
app.use(passport.session())

//C          //
// ONTROLLE //
//         R//

//          //
//  ROUTES  //
//          //

/*
  GET request 4 /
*/
app.get('/', (req,res) => {
  res.render('index.ejs')
})
/*
  GET request 4 login
*/
app.get('/login', (req, res) => {
  res.render('login.ejs')
})
/*
  GET request 4 login
*/
app.get('/register', (req, res) => {
  res.render('register.ejs')
})

// logout
app.delete('/logout', (req, res) => {
  req.logOut()
  res.redirect('/login')
})
//  START   //
//          //
//  SERVER  //
app.listen(3000, () => console.log('server running'))
