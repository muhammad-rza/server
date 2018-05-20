const router = require('express').Router();

const resource = require(MAIN_ROOT_PATH + '/core/resource')(router);

const initWordController = require(API_CONTROLLER_PATH + '/WordController');

const WordController = new initWordController();

resource.makeRoute('/words' ,WordController);

module.exports = router;
