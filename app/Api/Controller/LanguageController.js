const BaseController = require(APP_ROOT_PATH + 'base/BaseController');
const LanguageModel  = require(API_MODEL_PATH + 'LanguageModel');

let userId = '5afb477501e26e255c099ac4';

class LanguageController extends BaseController  {

    constructor() {

        //5af8590a9652501c20ac0a0b az
        //5af8590a9652501c20ac0a0c ru
        //5af8590a9652501c20ac0a0d en

        super();
        // console.log(this)

       

    }


    index(req,res,next){

        LanguageModel.find({},(error,result)=> {
            if(error) return res.send({error})
            if(result) return res.send({result})
        });

    };
    store(req,res,next){

        return res.send('LanguageController');


        let languages = [
            {
                name:'az',
                status:true
            },
            {
                name:'ru',
                status:true
            },
            {
                name:'en',
                status:true
            }

        ] 

        LanguageModel.insertMany(languages,(error,result)=> {
            if(error) return res.send({error})
            if(result) return res.send({result})
        });

       

    }

}

module.exports = LanguageController;