'use strict';

//Using GeoJSON.js fo attend then GeoJSON Specification (RFC 7946)
var GeoJSON = require('geojson');
var mongoose = require('mongoose'),

//Model that represents the Sensor Data Scan 
SensorScanner = mongoose.model('SensorScanner');

//Method that return all realized scans 
exports.list_scans = function(req, res) {
  SensorScanner.find({}, function(err, scan) {
    if (err)
      res.send(err);
    res.json(scan);
  }).select("_id sensorId temperature geometry");
};

//Method to create scan 
exports.create_scan = function(req, res) {
  //Create the scan
  var new_scan = new SensorScanner({
    sensorId : req.body.sensorId,
    temperature : req.body.temperature,
    scanDate : req.body.scanDate,
    geometry : {coordinates: new Array(req.body.latitude, req.body.longitude)}
  });

  //Save scan into database
  new_scan.save(function(err, scan) {
    if (err)
      res.send(err);
    res.json({
      message: "Scan created successfully.",
      result: {scan} });
  });
};
