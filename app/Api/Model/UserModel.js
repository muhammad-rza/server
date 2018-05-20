const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const UserSchema = new Schema({
    first_name:String,
    last_name:String,
    username:String,
    email:String,
    birthday:Date,
    gender:Boolean,
    password:String,
    email_verification:{
        type:Boolean,
        default:false
    },
    last_login:Date,
    status: {
        type:Boolean,
        default:false,
    },
    created_at: {
        type: Date,
        default: Date.now()
    },
    updated_at: {
        type: Date,
        default: Date.now()
    },

});



const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;

module.exports.getUser = (callback) => {

    UserModel.find(callback);
}
module.exports.updateOrInsert = (oldObj, newObj, callback) => {

    UserModel.update(oldObj, newObj, { upsert: true }, callback);
}

module.exports.insertUser = (UserModel, callback) => {

    UserModel.save(callback);
}

module.exports.updateUser = (query, update, options, callback) => {
    UserModel.findOneAndUpdate(query, update, options, callback);
};

module.exports.findOneUser = (id, callback) => {

    UserModel.findOne({ _id: id }, callback);
}

/*==========
 *  WARNING *
 * =======*/

module.exports.deleteById = (_id, callback) => {

    UserModel.remove({ _id } ,callback);
}


module.exports.deleteAllUser = (callback) => {

    UserModel.deleteMany(callback);
}