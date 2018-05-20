const BaseController = require(APP_ROOT_PATH + 'base/BaseController');
const WordModel  = require(API_MODEL_PATH + 'WordModel');
const LanguageModel  = require(API_MODEL_PATH + 'LanguageModel');
let apikey = 'trnsl.1.1.20180515T172247Z.3ad35736583d5524.566cb1e6502b7283bea33be2e693dcc655c287e6';
// var translate = require('yandex-translate')(apikey);
const translate = require('google-translate-api');
let userId = '5afb477501e26e255c099ac4';

class WordController extends BaseController  {

    constructor() {

        //5af8590a9652501c20ac0a0b az
        //5af8590a9652501c20ac0a0c ru
        //5af8590a9652501c20ac0a0d en

        super();
        

       

    }

    


    index(req,res,next){
        
        return WordModel.find({} , (error , words)=> {


                if(error) return res.send({error})
                else return res.send({words})

        })


        var body = req.body;

        body.lang = {
            from:'5af8590a9652501c20ac0a0b',
            to:'5af8590a9652501c20ac0a0d' 
        } //en
        
        body.text = 'hello';

        let newWord = {

        }

        LanguageModel.find({_id : { $in:[body.lang.from , body.lang.to] } } , (error , lang)=> {
            if(error) return res.send('you have error')
            else if(lang && lang.length === 2) {


            }
            else  return res.send('lnaguage does not exist'); 
        });

         

         

    };
    store(req,res,next){

        let {body} = req;

        return   translate(body.text, {from: body.from, to: body.to }).then(response => {
            res.send(response);
           
        }).catch(err => {
            res.send(err);
        });



        WordModel.insertWord(new WordModel(Word),(error,result)=> {
            if(error) return res.send({error:error})
            if(result) return res.send({result:result})
        });

    }

}

module.exports = WordController;



            //     translate.translate(body.text, { to: lang[0].name }, function(err, result) {

            //         if(err) return res.send({err})
            //         else return res.send(result)
     
            //   });