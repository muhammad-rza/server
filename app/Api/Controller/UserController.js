const BaseController = require(APP_ROOT_PATH + 'base/BaseController');
const UserModel  = require(API_MODEL_PATH + 'UserModel');

class UserController extends BaseController  {

    constructor() {

        //5af8590a9652501c20ac0a0b az
        //5af8590a9652501c20ac0a0c ru
        //5af8590a9652501c20ac0a0d en

        super();
        // console.log(this)

       

    }


    index(req,res,next){
        
        UserModel.find({
            email:'muhammadrza@mail.ru',
            password:'123456'

        } , (error , user) => {
            return res.send(user)
        });


    };
    store(req,res,next){
        return false;
        UserModel.insertUser(new UserModel({

            username:'muhammadrza',
            first_name:'Aslan',
            last_name:'Muhammadrza',
            birthday:Date.now(),
            gender:true,
            email:'muhammadrza@mail.ru',
            password:'123456',
            email_verification:true,
            status:true,
            last_login:null,

        }) , (error , user)=> {

            if(error) return res.send('u`ve error')
            if(user) return res.send(user)

        })

    }

}

module.exports = UserController;