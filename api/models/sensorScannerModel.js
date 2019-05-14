'use strict';

var mongoose = require('mongoose');
var extendSchema = require('mongoose-extend-schema');

// Define Geolocation Schema
const GeoLocationSchema = new mongoose.Schema({
  type: {
      type: String,
      default: 'Point'
  },
  coordinates: {
      type: [Number],
      index: '2dsphere'
  }
});

// Define basic struct for sensor scan
const BasicSensorScannerSchema = new mongoose.Schema({
  sensorId: {
    type: String,
    required: 'Enter the sensor id'
  },
  temperature: {
    type: Number, 
    required: 'Enter the temperature'
  },
  scanDate: {
    type: Date,
    default: Date.now
  },
});

// Define simple struct for sensor scan
//Should be used to facility web services use
const ServiceSensorScannerSchema = extendSchema(BasicSensorScannerSchema, {
  latitude: {
    type: Number, 
    required: 'Enter the latitude'
  },
  longitude: {
    type: Number, 
    required: 'Enter the longitude'
  }
});

// Define struct for sensor scan, used to store in database
const SensorScannerSchema = extendSchema(BasicSensorScannerSchema, {
  geometry: {
    type: GeoLocationSchema,
    required: 'Enter the location'
  }
});

module.exports = mongoose.model('ServiceSensorScanner', ServiceSensorScannerSchema);
module.exports = mongoose.model('SensorScanner', SensorScannerSchema);