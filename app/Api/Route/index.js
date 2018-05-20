const router = require('express').Router();



router.use('/',require(API_ROUTE_PATH + 'router-list'));



module.exports = router;