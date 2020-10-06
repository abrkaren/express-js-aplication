const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

const commitsRoutes = require('./routes/commits');

const keys = require('./config/keys');
const app = express();

mongoose.connect(keys.mongoURI)
  .then(() => console.log('MongoDB connected.'))
  .catch(error => console.log(error));

app.use(require('morgan')('dev'));
app.use('/uploads', express.static('./_uploads'));
app.use('/assets', express.static('./assets'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(require('cors')());

app.use('/api/commits', commitsRoutes);

// C L I E N T
app.use(express.static('./client/dist/client'));

app.get('/*', function(request, response) {
    response.sendFile(path.join(__dirname,'/client/dist/client/index.html'));
});


module.exports = app;
