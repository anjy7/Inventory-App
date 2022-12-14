  const dotenv = require('dotenv')
  dotenv.config({path:"./.env"})

  const express = require('express')
  const app = express()
  const bodyParser = require('body-parser') 
  const mongoose = require('mongoose')
  
  const indexRouter = require('./routes/index')
  const authorRouter = require('./routes/authors')
  
  app.set('view engine', 'ejs')
  app.set('views', __dirname + '/views')
  app.use(express.static('public'))
  app.use(bodyParser.urlencoded({ limit: '10mb', extended: false }))
  
  const DB = process.env.DATABASE_URL;  

  mongoose
    .connect(DB, {
      usenewurlparser: true,
      useunifiedtopology: true,
    })
    .then(() => {
      console.log("Successfully connected ");
    })
    .catch((error) => {
      console.log(`can not connect to database, ${error}`);
    });
  
  app.use('/', indexRouter)
  app.use('/authors', authorRouter)
  
  app.listen(process.env.PORT || 3000)