<a name="module_moleculer-matrix"></a>

## moleculer-matrix
Service mixin allowing Moleculer services to make matrix-synapse admin functions


* [moleculer-matrix](#module_moleculer-matrix)
    * [.settings](#module_moleculer-matrix.settings)
    * [.actions](#module_moleculer-matrix.actions)
        * [.getUsers](#module_moleculer-matrix.actions.getUsers) ⇒ <code>Promise.&lt;Object&gt;</code>
        * [.addUser](#module_moleculer-matrix.actions.addUser) ⇒ <code>Promise.&lt;Object&gt;</code>
        * [.getUser](#module_moleculer-matrix.actions.getUser) ⇒ <code>Promise.&lt;Object&gt;</code>
        * [.getUserSessions](#module_moleculer-matrix.actions.getUserSessions) ⇒ <code>Promise.&lt;Object&gt;</code>
        * [.deactivateUser](#module_moleculer-matrix.actions.deactivateUser) ⇒ <code>Promise</code>
        * [.resetPassword](#module_moleculer-matrix.actions.resetPassword) ⇒ <code>Promise</code>
        * [.getRoomsMemberships](#module_moleculer-matrix.actions.getRoomsMemberships) ⇒ <code>Promise.&lt;Object&gt;</code>
        * [.getUserDevices](#module_moleculer-matrix.actions.getUserDevices) ⇒ <code>Promise.&lt;Object&gt;</code>
        * [.getUserDevice](#module_moleculer-matrix.actions.getUserDevice) ⇒ <code>Promise.&lt;Object&gt;</code>
        * [.getAllPushers](#module_moleculer-matrix.actions.getAllPushers) ⇒ <code>Promise.&lt;Object&gt;</code>
        * [.addPusher](#module_moleculer-matrix.actions.addPusher)
        * [.createRoom](#module_moleculer-matrix.actions.createRoom) ⇒ <code>Object</code>
        * [.addRoomMembership](#module_moleculer-matrix.actions.addRoomMembership) ⇒ <code>Promise</code>
    * [.methods](#module_moleculer-matrix.methods)
        * [._getUser(user)](#module_moleculer-matrix.methods._getUser) ⇒ <code>Promise</code>
        * [._getUserSessions(user)](#module_moleculer-matrix.methods._getUserSessions) ⇒ <code>Promise</code>
        * [._getUserDevices(user)](#module_moleculer-matrix.methods._getUserDevices) ⇒ <code>Promise</code>
        * [._getRoomsMemberships(user)](#module_moleculer-matrix.methods._getRoomsMemberships) ⇒ <code>Promise.&lt;Object&gt;</code>
        * [._createRoom(params)](#module_moleculer-matrix.methods._createRoom) ⇒ <code>Promise</code>
        * [._addRoomMembership(params)](#module_moleculer-matrix.methods._addRoomMembership) ⇒ <code>Promise</code>
        * [.login()](#module_moleculer-matrix.methods.login) ⇒ <code>Promise</code>
        * [.loginAsUser(user)](#module_moleculer-matrix.methods.loginAsUser) ⇒ <code>Promise</code>
    * [.started()](#module_moleculer-matrix.started)
    * [.stopped()](#module_moleculer-matrix.stopped)

<a name="module_moleculer-matrix.settings"></a>

### moleculer-matrix.settings
Default settings

**Kind**: static property of [<code>moleculer-matrix</code>](#module_moleculer-matrix)  
<a name="module_moleculer-matrix.actions"></a>

### moleculer-matrix.actions
Actions

**Kind**: static property of [<code>moleculer-matrix</code>](#module_moleculer-matrix)  

* [.actions](#module_moleculer-matrix.actions)
    * [.getUsers](#module_moleculer-matrix.actions.getUsers) ⇒ <code>Promise.&lt;Object&gt;</code>
    * [.addUser](#module_moleculer-matrix.actions.addUser) ⇒ <code>Promise.&lt;Object&gt;</code>
    * [.getUser](#module_moleculer-matrix.actions.getUser) ⇒ <code>Promise.&lt;Object&gt;</code>
    * [.getUserSessions](#module_moleculer-matrix.actions.getUserSessions) ⇒ <code>Promise.&lt;Object&gt;</code>
    * [.deactivateUser](#module_moleculer-matrix.actions.deactivateUser) ⇒ <code>Promise</code>
    * [.resetPassword](#module_moleculer-matrix.actions.resetPassword) ⇒ <code>Promise</code>
    * [.getRoomsMemberships](#module_moleculer-matrix.actions.getRoomsMemberships) ⇒ <code>Promise.&lt;Object&gt;</code>
    * [.getUserDevices](#module_moleculer-matrix.actions.getUserDevices) ⇒ <code>Promise.&lt;Object&gt;</code>
    * [.getUserDevice](#module_moleculer-matrix.actions.getUserDevice) ⇒ <code>Promise.&lt;Object&gt;</code>
    * [.getAllPushers](#module_moleculer-matrix.actions.getAllPushers) ⇒ <code>Promise.&lt;Object&gt;</code>
    * [.addPusher](#module_moleculer-matrix.actions.addPusher)
    * [.createRoom](#module_moleculer-matrix.actions.createRoom) ⇒ <code>Object</code>
    * [.addRoomMembership](#module_moleculer-matrix.actions.addRoomMembership) ⇒ <code>Promise</code>

<a name="module_moleculer-matrix.actions.getUsers"></a>

#### actions.getUsers ⇒ <code>Promise.&lt;Object&gt;</code>
Returns  local user accounts.

**Kind**: static property of [<code>actions</code>](#module_moleculer-matrix.actions)  

| Param | Type | Description |
| --- | --- | --- |
| from | <code>Number</code> | from record , default 0 |
| limit | <code>Number</code> | Limit records default 10 |
| guests | <code>Boolean</code> | allow list guest users |

<a name="module_moleculer-matrix.actions.addUser"></a>

#### actions.addUser ⇒ <code>Promise.&lt;Object&gt;</code>
Create or modify Account

**Kind**: static property of [<code>actions</code>](#module_moleculer-matrix.actions)  
**Returns**: <code>Promise.&lt;Object&gt;</code> - user object  

| Param | Type | Description |
| --- | --- | --- |
| user | <code>String</code> | username example "user1" |
| password | <code>String</code> | user password |
| admin | <code>Boolean</code> | user is admin default false |
| displayname | <code>String</code> | user display name, default username |

<a name="module_moleculer-matrix.actions.getUser"></a>

#### actions.getUser ⇒ <code>Promise.&lt;Object&gt;</code>
Query User Account
 returns information about a specific user account.

**Kind**: static property of [<code>actions</code>](#module_moleculer-matrix.actions)  
**Returns**: <code>Promise.&lt;Object&gt;</code> - user account  

| Param | Type | Description |
| --- | --- | --- |
| user | <code>String</code> | example "user1" |

<a name="module_moleculer-matrix.actions.getUserSessions"></a>

#### actions.getUserSessions ⇒ <code>Promise.&lt;Object&gt;</code>
Query current sessions for a user

**Kind**: static property of [<code>actions</code>](#module_moleculer-matrix.actions)  
**Returns**: <code>Promise.&lt;Object&gt;</code> - information about the active sessions for a  user  
**See**: [Matrix documentation](https://matrix.org/docs/spec/client_server/r0.6.1#get-matrix-client-r0-admin-whois-userid)  

| Param | Type | Description |
| --- | --- | --- |
| user | <code>String</code> | example "user1" |

<a name="module_moleculer-matrix.actions.deactivateUser"></a>

#### actions.deactivateUser ⇒ <code>Promise</code>
Deactivate Account
This API deactivates an account. It removes active access tokens, resets the password, and deletes third-party IDs (to prevent the user requesting a password reset).

It can also mark the user as GDPR-erased. This means messages sent by the user will still be visible by anyone that was in the room when these messages were sent, but hidden from users joining the room afterwards.

**Kind**: static property of [<code>actions</code>](#module_moleculer-matrix.actions)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| user | <code>String</code> |  | example "user1" |
| [erase] | <code>boolean</code> | <code>false</code> |  |

<a name="module_moleculer-matrix.actions.resetPassword"></a>

#### actions.resetPassword ⇒ <code>Promise</code>
Reset password

**Kind**: static property of [<code>actions</code>](#module_moleculer-matrix.actions)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| user | <code>String</code> |  | example "user1" |
| newPassword | <code>String</code> |  | new password |
| [logout_devices] | <code>boolean</code> | <code>true</code> | logout user from all devices |

<a name="module_moleculer-matrix.actions.getRoomsMemberships"></a>

#### actions.getRoomsMemberships ⇒ <code>Promise.&lt;Object&gt;</code>
List room memberships of an user

**Kind**: static property of [<code>actions</code>](#module_moleculer-matrix.actions)  

| Param | Type | Description |
| --- | --- | --- |
| user | <code>String</code> | example "user1" |

<a name="module_moleculer-matrix.actions.getUserDevices"></a>

#### actions.getUserDevices ⇒ <code>Promise.&lt;Object&gt;</code>
List all users devices

**Kind**: static property of [<code>actions</code>](#module_moleculer-matrix.actions)  

| Param | Type | Description |
| --- | --- | --- |
| user | <code>String</code> | example "user1" |

<a name="module_moleculer-matrix.actions.getUserDevice"></a>

#### actions.getUserDevice ⇒ <code>Promise.&lt;Object&gt;</code>
Show a device.
Gets information on a single device, by device_id for a specific user_id

**Kind**: static property of [<code>actions</code>](#module_moleculer-matrix.actions)  

| Param | Type | Description |
| --- | --- | --- |
| user | <code>String</code> | example "user1" |
| device | <code>String</code> | user device_id |

<a name="module_moleculer-matrix.actions.getAllPushers"></a>

#### actions.getAllPushers ⇒ <code>Promise.&lt;Object&gt;</code>
Gets information about all pushers for a specific user_id

**Kind**: static property of [<code>actions</code>](#module_moleculer-matrix.actions)  

| Param | Type | Description |
| --- | --- | --- |
| user | <code>String</code> | example "user1" |

<a name="module_moleculer-matrix.actions.addPusher"></a>

#### actions.addPusher
This endpoint allows the creation of pushers for  user .

**Kind**: static property of [<code>actions</code>](#module_moleculer-matrix.actions)  

| Param | Type | Description |
| --- | --- | --- |
| user | <code>string</code> | short user name |
| pusher | <code>object</code> | pusher object |

**Example** *(pusher)*  
```js
{
	"app_display_name": "Mat Rix",
	"app_id": "com.example.app.ios",
	"append": false,
	"data": {
			"format": "event_id_only",
			"url": "https://push-gateway.location.here/_matrix/push/v1/notify"
			},
	"device_display_name": "iPhone 9",
	"kind": "http",
	"lang": "en",
	"profile_tag": "xxyyzz",
	"pushkey": "APA91bHPRgkF3JUikC4ENAHEeMrd41Zxv3hVZjC9KtT8OvPVGJ-hQMRKRrZuJAEcl7B338qju59zJMjw2DELjzEvxwYv7hH5Ynpc1ODQ0aT4U4OFEeco8ohsN5PjL1iC2dNtk2BAokeMCg2ZXKqpc8FXKmhX94kIxQ"
 }
```
<a name="module_moleculer-matrix.actions.createRoom"></a>

#### actions.createRoom ⇒ <code>Object</code>
Create room

**Kind**: static property of [<code>actions</code>](#module_moleculer-matrix.actions)  
**Returns**: <code>Object</code> - RoomObject Information about the newly created room.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| admin | <code>string</code> |  | room owner (team) |
| roomAlias | <code>string</code> |  | roomAlias |
| name | <code>string</code> |  | room name |
| [preset] | <code>string</code> | <code>&quot;private_chat&quot;</code> | room preset |

**Example**  
```js
{"room_id": "!sefiuhWgwghwWgh:example.com"}
```
<a name="module_moleculer-matrix.actions.addRoomMembership"></a>

#### actions.addRoomMembership ⇒ <code>Promise</code>
addRoomMembership - invite user join to room

**Kind**: static property of [<code>actions</code>](#module_moleculer-matrix.actions)  

| Param | Type | Description |
| --- | --- | --- |
| roomId | <code>string</code> | matrix roomId |
| user | <code>string</code> | invited username |
| roomAdmin | <code>string</code> | room owner (admin) username |

<a name="module_moleculer-matrix.methods"></a>

### moleculer-matrix.methods
Methods	 *

**Kind**: static property of [<code>moleculer-matrix</code>](#module_moleculer-matrix)  

* [.methods](#module_moleculer-matrix.methods)
    * [._getUser(user)](#module_moleculer-matrix.methods._getUser) ⇒ <code>Promise</code>
    * [._getUserSessions(user)](#module_moleculer-matrix.methods._getUserSessions) ⇒ <code>Promise</code>
    * [._getUserDevices(user)](#module_moleculer-matrix.methods._getUserDevices) ⇒ <code>Promise</code>
    * [._getRoomsMemberships(user)](#module_moleculer-matrix.methods._getRoomsMemberships) ⇒ <code>Promise.&lt;Object&gt;</code>
    * [._createRoom(params)](#module_moleculer-matrix.methods._createRoom) ⇒ <code>Promise</code>
    * [._addRoomMembership(params)](#module_moleculer-matrix.methods._addRoomMembership) ⇒ <code>Promise</code>
    * [.login()](#module_moleculer-matrix.methods.login) ⇒ <code>Promise</code>
    * [.loginAsUser(user)](#module_moleculer-matrix.methods.loginAsUser) ⇒ <code>Promise</code>

<a name="module_moleculer-matrix.methods._getUser"></a>

#### methods.\_getUser(user) ⇒ <code>Promise</code>
getUser method

**Kind**: static method of [<code>methods</code>](#module_moleculer-matrix.methods)  

| Param | Type |
| --- | --- |
| user | <code>string</code> | 

<a name="module_moleculer-matrix.methods._getUserSessions"></a>

#### methods.\_getUserSessions(user) ⇒ <code>Promise</code>
getUserSessions

**Kind**: static method of [<code>methods</code>](#module_moleculer-matrix.methods)  

| Param | Type |
| --- | --- |
| user | <code>string</code> | 

<a name="module_moleculer-matrix.methods._getUserDevices"></a>

#### methods.\_getUserDevices(user) ⇒ <code>Promise</code>
getUserDevices

**Kind**: static method of [<code>methods</code>](#module_moleculer-matrix.methods)  

| Param | Type |
| --- | --- |
| user | <code>string</code> | 

<a name="module_moleculer-matrix.methods._getRoomsMemberships"></a>

#### methods.\_getRoomsMemberships(user) ⇒ <code>Promise.&lt;Object&gt;</code>
Gets a list of all room_id that a specific user_id is member.

**Kind**: static method of [<code>methods</code>](#module_moleculer-matrix.methods)  

| Param | Type |
| --- | --- |
| user | <code>string</code> | 

**Example**  
```js
{
joined_rooms: [
    "!DuGcnbhHGaSZQoNQR:matrix.org",
      "!ZtSaPCawyWtxfWiIy:matrix.org"
    ],
total: 2
 }
```
<a name="module_moleculer-matrix.methods._createRoom"></a>

#### methods.\_createRoom(params) ⇒ <code>Promise</code>
Create room

**Kind**: static method of [<code>methods</code>](#module_moleculer-matrix.methods)  
**Fulfil**: <code>Object</code>  

| Param | Type | Description |
| --- | --- | --- |
| params | <code>object</code> |  |
| params.name | <code>string</code> | room name |
| params.preset | <code>string</code> | room preset use `private_chat` |
| params.roomAlias | <code>string</code> | room alias |
| params.admin | <code>string</code> | room admin username |

**Example**  
```js
{ room_id: "!sefiuhWgwghwWgh:example.com"}
```
<a name="module_moleculer-matrix.methods._addRoomMembership"></a>

#### methods.\_addRoomMembership(params) ⇒ <code>Promise</code>
_addRoomMembership send invite  from roomAdmin to user for join in room

**Kind**: static method of [<code>methods</code>](#module_moleculer-matrix.methods)  

| Param | Type |
| --- | --- |
| params | <code>Object</code> | 
| params.roomAdmin | <code>string</code> | 
| params.user | <code>string</code> | 
| params.roomId | <code>string</code> | 

<a name="module_moleculer-matrix.methods.login"></a>

#### methods.login() ⇒ <code>Promise</code>
Login

**Kind**: static method of [<code>methods</code>](#module_moleculer-matrix.methods)  
<a name="module_moleculer-matrix.methods.loginAsUser"></a>

#### methods.loginAsUser(user) ⇒ <code>Promise</code>
Login as a user.
Get an access token that can be used to authenticate as that user. Useful for when admins wish to do actions on behalf of a user.

**Kind**: static method of [<code>methods</code>](#module_moleculer-matrix.methods)  
**Fulfil**: <code>{access\_token: string</code>}  

| Param | Type | Description |
| --- | --- | --- |
| user | <code>string</code> | `username` |

**Example**  
```js
{ access_token: "<opaque_access_token_string>"}
```
<a name="module_moleculer-matrix.started"></a>

### moleculer-matrix.started()
Service started lifecycle event handler

**Kind**: static method of [<code>moleculer-matrix</code>](#module_moleculer-matrix)  
<a name="module_moleculer-matrix.stopped"></a>

### moleculer-matrix.stopped()
Service stopped lifecycle event handler

**Kind**: static method of [<code>moleculer-matrix</code>](#module_moleculer-matrix)  
