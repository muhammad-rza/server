const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const VocabularyWordSchema = new Schema({

    vocabulary_id :ObjectId,
    word_id :[
        ObjectId  //first word is \from\ other one is \to\
    ],
    user_id:ObjectId,
    type:{
        type:Number,
        default:1,
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



const VocabularyWordModel = mongoose.model('VocabularyWord', VocabularyWordSchema);

module.exports = VocabularyWordModel;

module.exports.insertVocabularyWord = (VocabularyWordModel, callback) => {

    VocabularyWordModel.save(callback);
}