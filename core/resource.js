//   Verb                           URI                            Action                                          Route Name

//   GET                            /examples                      index                                           examples.index

//   GET                            /examples/create               create                                          examples.create

//   POST                           /examples/store                store                                           examples.store

//   GET                            /examples/:example             show                                            example.show

//   GET                            /examples/:id/edit             edit                                            example.edit

//   PUT/PATCH                      /examples/:id                  update                                          example.update

//   DELETE                         /examples/:id                  destroy                                         example.destroy



// let resource_link = [
//
//     { verb: 'GET',    uri:  '/',           action: 'index',   name: 'index'   },
//     { verb: 'GET',    uri:  '/create',     action: 'create',  name: 'create'  },
//     { verb: 'POST',   uri:  '/store',      action: 'store',   name: 'store'   },
//     { verb: 'GET',    uri:  '/:id',        action: 'show',    name: 'show'    },
//     { verb: 'GET',    uri:  '/:id/edit',   action: 'edit',    name: 'edit'    },
//     { verb: 'PUT',    uri:  '/:id',        action: 'update',  name: 'update'  },
//     { verb: 'DELETE', uri:  '/:id',        action: 'destroy', name: 'destroy' },
//
// ];

let resource_link = [

    { verb: 'GET',    uri:  '/query',      action: 'search',  name: 'search'  },
    { verb: 'GET',    uri:  '/',           action: 'index',   name: 'index'   },
    { verb: 'POST',   uri:  '/',           action: 'store',   name: 'store'   },
    { verb: 'GET',    uri:  '/:id',        action: 'show',    name: 'show'    },
    { verb: 'PUT',    uri:  '/:id',        action: 'update',  name: 'update'  },
    { verb: 'DELETE', uri:  '/:id',        action: 'destroy', name: 'destroy' },


];


module.exports = function(router) {
    var module={};

    module.makeRoute = function(prefix ,controller, ...args){
        // console.log(controller)
        prefix = prefix.replace(/^\/|\/$/g, '');
        let share_link = resource_link.map((item , index) => {
            return  router[item.verb.toLowerCase()](`/${prefix}${item.uri}`,  ...args , controller[item.action] || function() {console.log('This methods does not exists')});
        });
        return share_link;
    }
    return module;


}