const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const LanguageSchema = new Schema({
    name:String,
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



const LanguageModel = mongoose.model('Language', LanguageSchema);

module.exports = LanguageModel;

module.exports.getLanguage = (callback) => {

    LanguageModel.find(callback);
}
module.exports.updateOrInsert = (oldObj, newObj, callback) => {

    LanguageModel.update(oldObj, newObj, { upsert: true }, callback);
}

module.exports.insertLanguage = (LanguageModel, callback) => {

    LanguageModel.save(callback);
}

module.exports.updateLanguage = (query, update, options, callback) => {
    LanguageModel.findOneAndUpdate(query, update, options, callback);
};

module.exports.findOneLanguage = (id, callback) => {

    LanguageModel.findOne({ _id: id }, callback);
}

/*==========
 *  WARNING *
 * =======*/

module.exports.deleteById = (_id, callback) => {

    LanguageModel.remove({ _id } ,callback);
}


module.exports.deleteAllLanguage = (callback) => {

    LanguageModel.deleteMany(callback);
}