const router = require('express').Router();

const resource = require(MAIN_ROOT_PATH + '/core/resource')(router);

const initLanguageController = require(API_CONTROLLER_PATH + '/LanguageController');

const LanguageController = new initLanguageController();

resource.makeRoute('/languages' ,LanguageController);

module.exports = router;
