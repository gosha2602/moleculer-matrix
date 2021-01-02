"use strict";

let { ServiceBroker } = require("moleculer");
let MyService = require("../../index");

// Create broker
let broker = new ServiceBroker({
	logger: console
});

// Load my service
broker.createService(MyService);

// Start server
broker.start().then(() => {
	// Call action
	broker
		.call("matrix.addUser", { user: "cheeky_monkey", password: "260275" })
		.then(broker.logger.info)
		.catch(broker.logger.error);
});
