const router = require('express').Router();

const resource = require(MAIN_ROOT_PATH + '/core/resource')(router);

const initUserController = require(API_CONTROLLER_PATH + '/UserController');

const UserController = new initUserController();

resource.makeRoute('/users' ,UserController);

module.exports = router;
