//Setting initial environment for the application
var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000,
  mongoose = require('mongoose'),
  SensorScannerModel = require('./api/models/sensorScannerModel'),
  bodyParser = require('body-parser');

//Setting database params and connection 
mongoose.Promise = global.Promise;
const dbURI = "mongodb://dbAdmin:hell5150@boschchallengecluster-shard-00-00-8wpug.gcp.mongodb.net:27017,boschchallengecluster-shard-00-01-8wpug.gcp.mongodb.net:27017,boschchallengecluster-shard-00-02-8wpug.gcp.mongodb.net:27017/test?ssl=true&replicaSet=BoschChallengeCluster-shard-0&authSource=admin&retryWrites=true";
const options = {
  reconnectTries: Number.MAX_VALUE,
  poolSize: 10
};

mongoose.connect(dbURI, options).then(
  () => {
    console.log("Database connection established!");
  },
  err => {
    console.log("Error connecting Database instance due to: ", err);
  }
);

//Setting the routes witch will be exposed as API
var routes = require('./api/routes/sensorScannerRoutes');
routes(app);

//Setting the Apps conf.
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function(req, res) {
  res.status(404).send({url: req.originalUrl + ' not found'})
});

app.listen(port);

console.log('BoschChallenge RESTful API server started on: ' + port);
