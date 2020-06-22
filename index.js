const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
require('./models/User');
require('./services/passport');
const authRoutes = require('./routes/authRoutes');
const keys = require('./config/keys');


mongoose.connect(keys.mongoURI);


const app = express();

app.use(
    cookieSession({
        //max age is 30 days time of existence in miliseconds
        maxAge: 30*24*60*60*1000,
        keys: [keys.cookieKey]
    })
);

app.use(passport.initialize());
app.use(passport.session());

authRoutes(app);


const PORT = process.env.PORT || 5000;
//if a port is given by heroku then okay otherwise use 5000 in development environment

app.listen(PORT);
