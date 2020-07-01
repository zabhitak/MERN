const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
require('./models/User');
require('./models/Survey');
require('./services/passport');
const authRoutes = require('./routes/authRoutes');
const billingRoutes = require('./routes/billingRoutes');
const surveyRoutes = require('./routes/surveyRoutes');
const keys = require('./config/keys');

mongoose.Promise = global.Promise;
mongoose.connect(keys.mongoURI,  {useNewUrlParser: true, useUnifiedTopology: true});


const app = express();

app.use(bodyParser.json());

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
billingRoutes(app);
surveyRoutes(app);


if(process.env.NODE_ENV === 'production'){
    // Express will serve up production assets
  // like our main.js file, or main.css file!
  app.use(express.static('client/build'));
  
    // Express will serve up the index.html file
  // if it doesn't recognize the route
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;
//if a port is given by heroku then okay otherwise use 5000 in development environment

app.listen(PORT);
