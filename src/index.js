/*
 * moleculer-matrix
 * Copyright (c) 2020 Georgi (https://github.com/gosha2602/moleculer-matrix)
 * MIT Licensed
 */

"use strict";

const _ = require("lodash");
const axios = require("axios");
const qs = require("qs");

const MoleculerError = require("moleculer").Errors.MoleculerServerError;

const METHODS = ["get", "put", "post", "delete", "patch", "options", "head", "request"];

class MoleculerAxiosError extends MoleculerError {}

const RESPONDERS = {
	full: res => res,
	data: res => res.data,
	headers: res => res.headers,
	status: res => res.status,
	ok: res => res.status < 400
};

/**
 *  @reference typedef Context from `moleculer`
 *
 */

/**
 * Service mixin allowing Moleculer services to make matrix-synapse admin functions
 *
 * @module moleculer-matrix
 */

module.exports = {
	name: "matrix",
	mixins: [],
	/**
	 * Default settings
	 */
	settings: {
		matrix: {
			serverPart: process.env.MATRIX_SERVER_PART,

			userId: process.env.MATRIX_USER_ID,
			password: process.env.MATRIX_USER_PASS,
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
		baseUrl: process.env.MATRIX_SERVER_URL,
		axios: {
			expose: null,
			responder: "full",
			config: {
				paramsSerializer: function (params) {
					return qs.stringify(params, { arrayFormat: "brackets" });
				}
			},
			logging: {
				level: "info"
				// request: {
				// 	include: ["url", "method"]
				// },
				// response: {
				// 	include: ["config.url", "status", "statusText"]
				// }
			}
		}
	},

	/**
	 * Actions
	 *
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
		 *
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
		},

		getRoomDetails: {
			params: {
				roomId: "string"
			},
			handler(ctx) {
				return this._getRoomDetails(ctx.params.roomId);
			}
		},

		/**
		 * This endpoint allows the creation of pushers for  user .
		 * @param {string} user short user name
		 * @param {object} pusher pusher object
		 * @example  <caption>pusher</caption>
		 * {
		 *	"app_display_name": "Mat Rix",
		 *	"app_id": "com.example.app.ios",
		 *	"append": false,
		 *	"data": {
		 *			"format": "event_id_only",
		 *			"url": "https://push-gateway.location.here/_matrix/push/v1/notify"
		 *			},
		 *	"device_display_name": "iPhone 9",
		 *	"kind": "http",
		 *	"lang": "en",
		 *	"profile_tag": "xxyyzz",
		 * 	"pushkey": "APA91bHPRgkF3JUikC4ENAHEeMrd41Zxv3hVZjC9KtT8OvPVGJ-hQMRKRrZuJAEcl7B338qju59zJMjw2DELjzEvxwYv7hH5Ynpc1ODQ0aT4U4OFEeco8ohsN5PjL1iC2dNtk2BAokeMCg2ZXKqpc8FXKmhX94kIxQ"
		 *  }
		 */

		addPusher: {
			params: {
				user: "string",
				pusher: { type: "object" }
			},
			async handler(ctx) {
				const params = ctx.params;
				const { access_token } = await this.loginAsUser(params.user);
				return await this._addPusher(access_token, params.pusher);
			}
		},
		/**
		 * Create room
		 * @param {string} admin room owner (team)
		 * @param {string} roomAlias roomAlias
		 * @param {string} name room name
		 * @param {string} [preset=private_chat] room preset
		 * @returns {{room_id:string}} RoomObject Information about the newly created room.
		 * @example     {"room_id": "!sefiuhWgwghwWgh:example.com"}
		 */
		createRoom: {
			params: {
				admin: "string",
				roomAlias: "string",
				name: "string",
				preset: { type: "string", optional: true, default: "private_chat" }
			},
			handler(ctx) {
				return this._createRoom(ctx.params);
			}
		},
		/**
		 *  addRoomMembership - invite user join to room
		 * @param {string} roomId  matrix roomId
		 * @param {string} user invited username
		 * @param {string} roomAdmin room owner (admin) username
		 * @returns {Promise}
		 */
		addRoomMembership: {
			params: {
				roomId: "string",
				user: "string",
				roomAdmin: "string"
			},
			handler(ctx) {
				const params = ctx.params;
				return this._addRoomMembership(params);
			}
		},
		getRoomIdByAlias: {
			params: {
				alias: "string"
			},
			handler(ctx) {
				console.log(ctx.params);
				const { alias, user } = ctx.params;
				return this._getRoomIdByAlias(alias);
			}
		}
	},

	/**
	 * Methods	 *
	 */
	methods: {
		/**
		 * getUsers method
		 * @param {Object} params
		 * @returns {Promise}
		 * @private
		 */
		_getUsers(params) {
			return this._matrixGet(this.settings.matrix.paths.getUsers, params);
		},

		/**
		 * getUser method
		 * @param {string} user
		 * @returns {Promise}
		 */

		_getUser(user) {
			const url = this.settings.matrix.paths.addUser + this.makeFullUserId(user);
			return this._matrixGet(url, {});
		},

		/**
		 * getUserSessions
		 * @param {string} user
		 * @returns {Promise}
		 */
		_getUserSessions(user) {
			const url = this.settings.matrix.paths.userSessions + this.makeFullUserId(user);
			return this._matrixGet(url, {});
		},

		/**
		 * getUserDevices
		 * @param {string} user
		 * @returns {Promise}
		 */
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
		/**
		 * Gets a list of all room_id that a specific user_id is member.
		 * @param {string} user
		 * @returns {Promise<Object>}
		 * @example
		 * {
		 * joined_rooms: [
		 *     "!DuGcnbhHGaSZQoNQR:matrix.org",
		 *       "!ZtSaPCawyWtxfWiIy:matrix.org"
		 *     ],
		 * total: 2
		 *  }
		 */
		_getRoomsMemberships(user) {
			const url =
				this.settings.matrix.paths.roomsMemberships +
				this.makeFullUserId(user) +
				"/joined_rooms";
			return this._matrixGet(url, {});
		},
		_getRoomDetails(roomId) {
			const url = `_synapse/admin/v1/rooms/${roomId}`;

			return this._matrixGet(url, {});
		},

		/**
		 * Requests that the server resolve a room alias to a room ID.
		 * @param {string} alias room alias
		 * @param {string} user user name for loginAsUser
		 */
		_getRoomIdByAlias(alias) {
			const url = `_matrix/client/r0/directory/room/%23${alias}`;
			return this._matrixGet(url, {});
			//	return this._getAsUser(url, user, {});
		},

		/**
		 * Get all pushers
		 * @param {string} user
		 * @returns {Promise}
		 */
		_getAllPushers(user) {
			const url =
				this.settings.matrix.paths.userPushers + this.makeFullUserId(user) + "/pushers";
			return this._matrixGet(url, {});
		},
		async _addPusher(accessToken, pusher) {
			const auth = `Bearer ${accessToken}`;
			const params = {
				pusher: pusher
			};
			const config = {
				url: this.settings.baseUrl + "_matrix/client/r0/pushers/set",
				method: "POST",
				data: pusher,
				headers: { authorization: auth }
			};
			return await this.axios(config);
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
		/**
		 * Create room
		 * @param  params {object}
		 * @param params.name {string} - room name
		 * @param params.preset {string} - room preset use `private_chat`
		 * @param params.roomAlias {string} - room alias
		 * @param params.admin {string} - room admin username
		 *
		 * @returns {Promise}
		 * @fulfil {Object}
		 * @example { room_id: "!sefiuhWgwghwWgh:example.com"}
		 */
		async _createRoom(params) {
			const room = {
				creation_content: {
					"m.federate": false
				},
				name: params.name,
				preset: params.preset,
				room_alias_name: params.roomAlias
			};
			/* const { access_token } = await this.loginAsUser(params.admin);
			const auth = `Bearer ${access_token}`;
			const config = {
				url: this.settings.baseUrl + "_matrix/client/r0/createRoom",
				method: "POST",
				data: room,
				headers: { authorization: auth }
			};
			const { data } = await this.axios(config);
			*/
			return this._postAsUser("_matrix/client/r0/createRoom", params.admin, room);
		},
		/**
		 * _addRoomMembership send invite  from roomAdmin to user for join in room
		 * @param {Object} params
		 * @param {string} params.roomAdmin
		 * @param {string} params.user
		 * @param {string} params.roomId
		 * @returns {Promise}
		 */
		async _addRoomMembership(params) {
			const { roomAdmin, user, roomId } = params;
			const url = `${this.settings.baseUrl}_matrix/client/r0/rooms/${roomId}/invite`;
			const postData = { user_id: this.makeFullUserId(user) };
			const { access_token } = await this.loginAsUser(roomAdmin);
			const auth = `Bearer ${access_token}`;

			const config = {
				url: url,
				method: "POST",
				data: postData,
				headers: { authorization: auth }
			};
			const { data } = await this.axios(config);
			return data;
		},
		async _matrixPut(url, params) {
			const { data } = await this._put(url, {
				responseType: "json",
				json: params,
				token: this.dataAccess.access_token
			});

			return data;
		},
		async _matrixPost(url, params) {
			const { data } = await this._post(url, {
				responseType: "json",
				json: params,
				token: this.dataAccess.access_token
			});

			return data;
		},
		async _matrixGet(url, params = {}) {
			const { data } = await this._get(url, {
				responseType: "json",
				searchParams: params,
				token: this.dataAccess.access_token
			});

			return data;
		},
		async _postAsUser(url, user, params) {
			const { access_token } = await this.loginAsUser(user);
			const dataParams = {
				responseType: "json",
				token: access_token,
				json: params
			};
			const { data } = await this._post(url, dataParams);
			return data;
		},

		async _getAsUser(url, user, params) {
			const { access_token } = await this.loginAsUser(user);
			const dataParams = {
				responseType: "json",
				token: access_token,
				searchParams: params
			};
			const { data } = await this._get(url, dataParams);
			return data;
		},
		/**
		 * Login
		 * @returns {Promise}
		 */
		async login() {
			const params = {
				identifier: {
					type: "m.id.user",
					user: this.settings.matrix.userId
				},
				password: this.settings.matrix.password,
				type: "m.login.password"
			};
			const config = {
				url: this.settings.baseUrl + this.settings.matrix.paths.login,
				method: "POST",
				data: params
			};
			const { data } = await this.axios(config);

			return data;
		},
		/**
		 * Login as a user.
		 * Get an access token that can be used to authenticate as that user. Useful for when admins wish to do actions on behalf of a user.
		 * @param user {string} `username`
		 * @returns {Promise}
		 * @fulfil {{access_token: string}}
		 * @example { access_token: "<opaque_access_token_string>"}
		 */
		async loginAsUser(user) {
			const url = "_synapse/admin/v1/users/" + this.makeFullUserId(user) + "/login";

			const data = await this._matrixPost(url, {});

			return data;
		},
		makeFullUserId(username) {
			if (username.charAt(0) !== "@")
				return "@" + username + ":" + this.settings.matrix.serverPart;
			else return username;
		},
		_get(url, params) {
			const auth = params.token ? `Bearer ${params.token}` : "";
			const config = {
				url: this.settings.baseUrl + url,
				method: "GET",
				params: params.searchParams,
				headers: { authorization: auth }
			};
			return this.axios(config);
		},
		_post(url, params) {
			const auth = params.token ? `Bearer ${params.token}` : "";
			const config = {
				url: this.settings.baseUrl + url,
				method: "POST",
				data: params.json,
				headers: { authorization: auth }
			};
			return this.axios(config);
		},

		_put(url, params) {
			const auth = params.token ? `Bearer ${params.token}` : "";
			const config = {
				url: this.settings.baseUrl + url,
				method: "PUT",
				data: params.json,
				headers: { authorization: auth }
			};
			return this.axios(config);
		},
		_createAxios() {
			const { config, responder, expose, logging } = this.schema.settings.axios;

			config.baseUrl = this.schema.settings.baseUrl;
			this.axios = axios.create(config);

			this.$responder = _.isFunction(responder)
				? this.schema.settings.axios.responder
				: RESPONDERS[responder];

			// TODO: crap logging
			if (logging && logging.level in this.logger) {
				this.axios.interceptors.request.use(config => {
					// TODO get uri method of axios is broken
					this.logger[logging.level](
						`=> ${config.method.toUpperCase()} ${this.axios.getUri(config)}`
					);
					return config;
				});

				this.axios.interceptors.response.use(response => {
					this.logger[logging.level](
						`<= ${response.status} - ${response.statusText} ${this.axios.getUri(
							response.config
						)}`
					);
					return response;
				});

				this.axios.interceptors.response.use(null, err => {
					if (err.response) {
						// The request was made and the server responded with a status code
						// that falls out of the range of 2xx
						this.logger.error(
							`Received error response: ${err.response.status} - ${err.response.statusText}`,
							err.response.data
						);
					} else if (err.request) {
						// The request was made but no response was received
						this.logger.error("No response received", err.message);
					} else {
						// Something happened in setting up the request that triggered an Error
						this.logger.error("Error creating request", err.message);
					}
					return this.Promise.reject(
						new MoleculerAxiosError(err.message, 500, "HTTP_REQUEST_ERROR")
					);
				});
			}
		}
	},
	created() {},

	/**
	 * Service started lifecycle event handler
	 */
	async started() {
		this._createAxios();
		this.dataAccess = await this.login();
	},

	/**
	 * Service stopped lifecycle event handler
	 */
	stopped() {}
};
