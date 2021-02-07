"use strict";

const { ServiceBroker } = require("moleculer");
const MyService = require("../../src");

describe("Test MyService", () => {
	const OLD_ENV = process.env;

	beforeEach(() => {
		jest.resetModules(); // Most important - it clears the cache
		process.env = { ...OLD_ENV }; // Make a copy
	});

	const broker = new ServiceBroker();
	const service = broker.createService(MyService);
	const user = "test_user";
	beforeAll(() => broker.start());
	afterAll(() => broker.stop());

	it("should be created", () => {
		expect(service).toBeDefined();
	});

	/*it("should return with login data", () => {
		return broker.call("matrix.test").then(res => {
			expect(res).toBeDefined();
		});
	});*/

	it("should return add user data", () => {
		return broker.call("matrix.addUser", { user: user, password: "123456qwert" }).then(res => {
			expect(res).toBeDefined();
		});
	});

	it("getUsers", () => {
		return broker.call("matrix.getUsers", { from: 0, limit: 10 }).then(res => {
			expect(res).toBeDefined();
		});
	});

	it("getUser", () => {
		return broker.call("matrix.getUser", { user: user }).then(res => {
			expect(res).toBeDefined();
		});
	});

	it("getUserSessions", () => {
		return broker.call("matrix.getUserSessions", { user: user }).then(res => {
			expect(res).toBeDefined();
		});
	});

	it("getRoomsMemberships", () => {
		return broker.call("matrix.getRoomsMemberships", { user: user }).then(res => {
			expect(res).toBeDefined();
		});
	});
	it("getUserDevices", () => {
		return broker.call("matrix.getUserDevices", { user: user }).then(res => {
			expect(res).toBeDefined();
		});
	});
	it("getAllPushers", () => {
		return broker.call("matrix.getAllPushers", { user: user }).then(res => {
			expect(res).toBeDefined();
		});
	});
});
