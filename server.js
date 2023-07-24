const express=require('express')
const app=express()
const mongoose=require('mongoose')
const passport = require('passport')
const session = require('express-session')
const MongoStore = require('connect-mongo')
const flash = require('express-flash')
const methodOverride = require("method-override");
const logger = require('morgan')
const connectDB=require('./config/database')
const marketRoutes=require('./routes/market')
const homeRoutes=require('./routes/home')
const cartRoutes=require('./routes/cart')
require('dotenv').config({path:'./config/.env'})

// Passport config
require('./config/passport')(passport)

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(logger('dev'))
app.use(flash())

//Use forms for put / delete
app.use(methodOverride("_method"));

connectDB()

// Sessions
app.use(
    session({
      secret: 'keyboard cat',
      resave: false,
      saveUninitialized: false,
      store: MongoStore.create({ mongoUrl: process.env.DB_STRING }),
    })
  )

// Passport middleware
app.use(passport.initialize())
app.use(passport.session())

app.use('/',homeRoutes)
app.use('/marketMain',marketRoutes)
app.use('/marketMainCart',cartRoutes)

app.listen(process.env.PORT||PORT,()=>{
    console.log(`Connected to Server...`)
})