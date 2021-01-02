/*
 * moleculer-matrix
 * Copyright (c) 2020 Georgi (https://github.com/gosha2602/moleculer-matrix)
 * MIT Licensed
 */

"use strict";
const HTTPClient = require("moleculer-http-client");
/**
 * Service mixin allowing Moleculer services to make matrix-synapse admin functions
 *
 * @name moleculer-matrix
 * @module Service
 */
module.exports = {
	name: "matrix",
	mixins: [HTTPClient],
	/**
	 * Default settings
	 */
	settings: {
		matrix: {
			serverPart: "mtx.pointprism.com",

			userId: process.env.MATRIX_USER_ID || "apiuser",
			password: process.env.MATRIX_USER_PASS || "2nfyxbr675",
			paths: {
				login: "_matrix/client/r0/login",
				addUser: "_synapse/admin/v2/users/",
				getUsers: "_synapse/admin/v2/users",
				userSessions: "_synapse/admin/v1/whois/",
				deactivate: "_synapse/admin/v1/deactivate/",
				resetPassword: "_synapse/admin/v1/reset_password/",
				roomsMemberships: "_synapse/admin/v1/users/",
				userDevices: "_synapse/admin/v2/users/",
				userPushers: "_synapse/admin/v1/users/"
			}
		},
		httpClient: {
			defaultOptions: {
				prefixUrl: "https://mtx.pointprism.com",
				token: undefined,
				handlers: [
					(options, next) => {
						// Authorization
						if (options.token && !options.headers.authorization) {
							options.headers.authorization = `Bearer ${options.token}`;
							console.log("auth");
						}

						return next(options);
					}
				]
			}
		}
	},

	/**
	 * Actions
	 */
	actions: {
		async test(ctx) {
			return await this.login();
		},
		/**
		 * Returns  local user accounts.
		 *
		 * @param {Number} from from record , default 0
		 * @param {Number} limit Limit records default 10
		 * @param {Boolean} guests allow list guest users
		 * @returns {Promise<Object>}
		 */
		getUsers: {
			params: {
				from: {
					type: "number",
					default: 0,
					convert: true,
					optional: true
				},
				limit: {
					type: "number",
					default: 10,
					convert: true,
					optional: true
				},
				guests: {
					type: "boolean",
					default: false,
					optional: true
				}
			},
			handler(ctx) {
				const params = ctx.params;
				return this._getUsers(params);
			}
		},
		/**
		 * Create or modify Account
		 * @param {String} user username example "user1"
		 * @param {String} password user password
		 * @param {Boolean} admin user is admin default false
		 * @param {String} displayname user display name, default username
		 * @returns {Promise<Object>} user object
		 */
		addUser: {
			params: {
				user: "string",
				password: { type: "string", optional: true },
				admin: { type: "boolean", optional: true, default: false },
				displayname: { type: "string", optional: true }
			},
			handler(ctx) {
				const params = ctx.params;
				return this._addUser(params);
			}
		},
		/**
		 * Query User Account
		 *  returns information about a specific user account.
		 * @param {String} user example "user1"
		 * @returns {Promise<Object>} user account
		 */
		getUser: {
			params: {
				user: "string"
			},
			handler(ctx) {
				const user = ctx.params.user;
				return this._getUser(user);
			}
		},
		/**
		 * Query current sessions for a user
		 * @param {String} user example "user1"
		 * @returns {Promise<Object>} information about the active sessions for a  user
		 * @see {@link https://matrix.org/docs/spec/client_server/r0.6.1#get-matrix-client-r0-admin-whois-userid|Matrix documentation}
		 */
		getUserSessions: {
			params: {
				user: "string"
			},
			handler(ctx) {
				const user = ctx.params.user;
				return this._getUserSessions(user);
			}
		},
		/**
		 * Deactivate Account
		 * This API deactivates an account. It removes active access tokens, resets the password, and deletes third-party IDs (to prevent the user requesting a password reset).
		 *
		 * It can also mark the user as GDPR-erased. This means messages sent by the user will still be visible by anyone that was in the room when these messages were sent, but hidden from users joining the room afterwards.
		 * @param {String} user example "user1"
		 * @param {boolean} [erase=false]
		 * @returns {Promise}
		 */
		deactivateUser: {
			params: {
				user: "string",
				erase: {
					type: "boolean",
					default: false,
					optional: true
				}
			},
			handler(ctx) {
				const user = ctx.params.user;
				const erase = ctx.params.erase;
				return this._deactivateUser(user, erase);
			}
		},
		/**
		 * Reset password
		 *
		 * @param {String} user example "user1"
		 * @param {String} newPassword new password
		 * @param {boolean}  [logout_devices=true]  logout user from all devices
		 * @returns {Promise}
		 */
		resetPassword: {
			params: {
				user: "string",
				newPassword: "string",
				logout_devices: {
					type: "boolean",
					default: true,
					optional: true
				}
			},
			handler(ctx) {
				const params = ctx.params;
				return this._resetPassword(params.user, params.newPassword, params.logout_devices);
			}
		},

		/**
		 * List room memberships of an user
		 * @param {String} user example "user1"
		 * @returns {Promise<Object>}
		 */
		getRoomsMemberships: {
			params: {
				user: "string"
			},
			handler(ctx) {
				const user = ctx.params.user;
				return this._getRoomsMemberships(user);
			}
		},
		/**
		 * List all users devices
		 * @param {String} user example "user1"
		 * @returns {Promise<Object>}
		 */
		getUserDevices: {
			params: {
				user: "string"
			},
			handler(ctx) {
				const user = ctx.params.user;
				return this._getUserDevices(user);
			}
		},

		/**
		 * Show a device.
		 * Gets information on a single device, by device_id for a specific user_id
		 * @param {String} user example "user1"
		 * @param {String} device user device_id
		 * @returns {Promise<Object>}
		 */
		getUserDevice: {
			params: {
				user: "string",
				device: "string"
			},
			handler(ctx) {
				const { user, device } = ctx.params;
				return this._getUserDevice(user, device);
			}
		},
		/**
		 * Gets information about all pushers for a specific user_id
		 * @param {String} user example "user1"
		 * @returns {Promise<Object>}
		 */

		getAllPushers: {
			params: {
				user: "string"
			},
			handler(ctx) {
				const user = ctx.params.user;
				return this._getAllPushers(user);
			}
		}
	},

	/**
	 * Methods
	 */
	methods: {
		_getUsers(params) {
			return this._matrixGet(this.settings.matrix.paths.getUsers, params);
		},
		_getUser(user) {
			const url = this.settings.matrix.paths.addUser + this.makeFullUserId(user);
			return this._matrixGet(url, {});
		},
		_getUserSessions(user) {
			const url = this.settings.matrix.paths.userSessions + this.makeFullUserId(user);
			return this._matrixGet(url, {});
		},
		_getUserDevices(user) {
			const url =
				this.settings.matrix.paths.userDevices + this.makeFullUserId(user) + "/devices";
			return this._matrixGet(url, {});
		},
		_getUserDevice(user, device) {
			const url =
				this.settings.matrix.paths.userDevices +
				this.makeFullUserId(user) +
				"/devices/" +
				device;
			return this._matrixGet(url, {});
		},
		_getRoomsMemberships(user) {
			const url =
				this.settings.matrix.paths.roomsMemberships +
				this.makeFullUserId(user) +
				"/joined_rooms";
			return this._matrixGet(url, {});
		},
		_getAllPushers(user) {
			const url =
				this.settings.matrix.paths.userPushers + this.makeFullUserId(user) + "/pushers";
			return this._matrixGet(url, {});
		},
		_deactivateUser(user, erase = false) {
			const url = this.settings.matrix.paths.deactivate + this.makeFullUserId(user);
			const params = { erase: erase };
			return this._matrixPost(url, params);
		},
		async _addUser(params) {
			const url = this.settings.matrix.paths.addUser + this.makeFullUserId(params.user);
			if (params.admin === undefined) params.admin = false;
			if (!params.displayname) params.displayname = params.user;
			params.deactivated = false;
			delete params.user;
			return await this._matrixPut(url, params);
		},
		_resetPassword(user, newPassword, logout_devices = true) {
			const url = this.settings.matrix.paths.resetPassword + this.makeFullUserId(user);
			const params = {
				new_password: newPassword,
				logout_devices: logout_devices
			};
			return this._matrixPost(url, params);
		},
		async _matrixPut(url, params) {
			const { body } = await this._put(url, {
				responseType: "json",
				json: params,
				token: this.dataAccess.access_token
			});

			return body;
		},
		async _matrixPost(url, params) {
			const { body } = await this._post(url, {
				responseType: "json",
				json: params,
				token: this.dataAccess.access_token
			});

			return body;
		},
		async _matrixGet(url, params = {}) {
			const { body } = await this._get(url, {
				responseType: "json",
				searchParams: params,
				token: this.dataAccess.access_token
			});

			return body;
		},
		async login() {
			const params = {
				identifier: {
					type: "m.id.user",
					user: this.settings.matrix.userId
				},
				password: this.settings.matrix.password,
				type: "m.login.password"
			};

			const { body } = await this._post(this.settings.matrix.paths.login, {
				responseType: "json",
				json: params
			});

			return body;
		},
		makeFullUserId(username) {
			return "@" + username + ":" + this.settings.matrix.serverPart;
		}
	},
	created() {},

	/**
	 * Service started lifecycle event handler
	 */
	async started() {
		this.dataAccess = await this.login();
		console.log("dataAccess", this.dataAccess);
		this.settings.httpClient.defaultOptions.token = this.dataAccess.access_token;
	},

	/**
	 * Service stopped lifecycle event handler
	 */
	stopped() {}
};
