const router = require('express').Router();

const resource = require(MAIN_ROOT_PATH + '/core/resource')(router);

const initExampleController = require(API_CONTROLLER_PATH + '/ExampleController');

const ExampleController = new initExampleController();


// router.get('/examples',   function() {
//     console.log('ok')
// } );

resource.makeRoute('/examples' ,ExampleController);





module.exports = router;


//   Verb                           URI                            Action                                          Route Name

//   GET                            /examples                      index                                           examples.index

//   GET                            /examples/create               create                                          examples.create

//   POST                           /examples/store                store                                           examples.store

//   GET                            /examples/:example             show                                            example.show

//   GET                            /examples/:id/edit             edit                                            example.edit

//   PUT/PATCH                      /examples/:id                  update                                          example.update

//   DELETE                         /examples/:id                  destroy                                         example.destroy