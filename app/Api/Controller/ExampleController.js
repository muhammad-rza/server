const BaseController = require(APP_ROOT_PATH + 'base/BaseController');


class ExampleController extends BaseController  {

    constructor() {


        super();
        // console.log(this)

    }


    index(req,res,next){

       return res.send('ExampleController')

    };
    store(req,res,next){

        return res.send('ExampleController')

    }

}

module.exports = ExampleController;