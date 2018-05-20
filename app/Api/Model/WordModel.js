const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const WordSchema = new Schema({
    text:{
        type:String,
        trim: true,
        uniqe:true
    },
    // lang_id:ObjectId,
    user_id:ObjectId,
    language:String,
    subject:{
        type:Array,
        default: null
    },
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



const WordModel = mongoose.model('Word', WordSchema);

module.exports = WordModel;

module.exports.getWord = (callback) => {

    WordModel.find(callback);
}
module.exports.updateOrInsert = (oldObj, newObj, callback) => {

    WordModel.update(oldObj, newObj, { upsert: true }, callback);
}

module.exports.insertWord = (WordModel, callback) => {

    WordModel.save(callback);
}

module.exports.updateWord = (query, update, options, callback) => {
    WordModel.findOneAndUpdate(query, update, options, callback);
};

module.exports.findOneWord = (id, callback) => {

    WordModel.findOne({ _id: id }, callback);
}

/*==========
 *  WARNING *
 * =======*/

module.exports.deleteById = (_id, callback) => {

    WordModel.remove({ _id } ,callback);
}


module.exports.deleteAllWord = (callback) => {

    WordModel.deleteMany(callback);
}