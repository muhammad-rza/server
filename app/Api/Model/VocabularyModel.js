const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const VocabularySchema = new Schema({
    name:String,
    description:String,
    user_id:ObjectId,
    languages: [
        { type: ObjectId }
    ],
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



const VocabularyModel = mongoose.model('Vocabulary', VocabularySchema);

module.exports = VocabularyModel;

module.exports.getVocabulary = (callback) => {

    VocabularyModel.find(callback);
}
module.exports.updateOrInsert = (oldObj, newObj, callback) => {

    VocabularyModel.update(oldObj, newObj, { upsert: true }, callback);
}

module.exports.insertVocabulary = (VocabularyModel, callback) => {

    VocabularyModel.save(callback);
}

module.exports.updateVocabulary = (query, update, options, callback) => {
    VocabularyModel.findOneAndUpdate(query, update, options, callback);
};

module.exports.findOneVocabulary = (id, callback) => {

    VocabularyModel.findOne({ _id: id }, callback);
}

/*==========
 *  WARNING *
 * =======*/

module.exports.deleteById = (_id, callback) => {

    VocabularyModel.remove({ _id } ,callback);
}


module.exports.deleteAllVocabulary = (callback) => {

    VocabularyModel.deleteMany(callback);
}