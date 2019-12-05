import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import session from 'express-session';
import mongoose from 'mongoose';
import passport from './config/ppConfig';

const app = express();
app.use(express.static(__dirname + '/../client/build')); // For heroku deployment
app.use(express.urlencoded({ extended: false}))
app.use(express.json())
app.set('view engine', 'ejs')

// Mongoose connection string typed as string or it will be mad
mongoose.connect(process.env.MONGODB_URI as string)
const db = mongoose.connection // Uses implicit typing
db.once('open', function() {
  console.log('Connected to MongoDB somewhere')
});
db.on('error', function(err) {
  console.log(err)
});

// Configure Session - before passport
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true
}));

// Include passport - after session
app.use(passport.initialize());
app.use(passport.session());


import auth from './routes/auth';
app.use('/auth', auth)

import api from './routes/api';
app.use('/api', api)

app.get('*', (req, res) => {
  res.sendFile(__dirname + "/../client/build/index.html");
});

app.listen(process.env.PORT || 3002);
