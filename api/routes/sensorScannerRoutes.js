'use strict';

module.exports = function(app) {
	var scanner = require('../controllers/sensorScannerController');

	//Route to expose API to query scans
	app.route('/sensorScans').get(scanner.list_scans);
	
	//Route to expose API to create scans
	app.route('/sendSensorScan').post(scanner.create_scan);
};
