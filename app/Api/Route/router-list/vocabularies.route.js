const router = require('express').Router();

const resource = require(MAIN_ROOT_PATH + '/core/resource')(router);

const initVocabularyController = require(API_CONTROLLER_PATH + '/VocabularyController');

const VocabularyController = new initVocabularyController();

resource.makeRoute('/vocabularies' ,VocabularyController);

router.post('/vocabularies/word' ,VocabularyController.addNewWordToVoc);

module.exports = router;
