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
	MyService.settings.baseUrl = "https://mtx.pointprism.com/";
	MyService.settings.matrix.userId = "@admin:mtx.pointprism.com";
	MyService.settings.matrix.password = "7uperp@ssw0rd";
	MyService.settings.matrix.serverPart = "mtx.pointprism.com";
	const service = broker.createService(MyService);
	const user = "test2";
	const pusher = {
		app_display_name: "Pointprism",
		app_id: "com.pointprism.app.android",
		append: false,
		data: {
			format: "event_id_only",
			url: "https://mtx.pointprism.com/_matrix/push/v1/notify"
		},
		device_display_name: "Android",
		kind: "http",
		lang: "en",
		profile_tag: "test_user_xxyyzz",
		pushkey:
			"APA91bHPRgkF3JUikC4ENAHEeMrd41Zxv3hVZjC9KtT8OvPVGJ-hQMRKRrZuJAEcl7B338qju59zJMjw2DELjzEvxwYv7hH5Ynpc1ODQ0aT4U4OFEeco8ohsN5PjL1iC2dNtk2BAokeMCg2ZXKqpc8FXKmhX94kIxQ"
	};
	const room = {
		name: "Офис",
		roomAlias: "office70",
		admin: "test_user"
	};
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

	/*it("should return add user data", () => {
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

	it("addPusher", () => {
		return broker.call("matrix.addPusher", { user: user, pusher: pusher }).then(res => {
			expect(res).toBeDefined();
		});
	});


	it("createRoom", () => {
		return broker.call("matrix.createRoom", room).then(res => {
			console.log(res);
			expect(res).toBeDefined();
		});
	});

	it("addRoomMembership", () => {
		return broker
			.call("matrix.addRoomMembership", {
				user: "employee_vpgybz",
				roomId: "!xjDOpNQnEhPoIXPAYk:mtx.pointprism.com",
				roomAdmin: "test_user"
			})
			.then(res => {
				console.log(res);
				expect(res).toBeDefined();
			});
	});
	*/

	it("getRoomDetails", () => {
		return broker
			.call("matrix.getRoomDetails", { roomId: "!xjDOpNQnEhPoIXPAYk:mtx.pointprism.com" })
			.then(res => {
				console.log(res);
				expect(res).toBeDefined();
			});
	});
});
