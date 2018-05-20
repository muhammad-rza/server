const BaseController = require(APP_ROOT_PATH + 'base/BaseController');
const VocabularyModel = require(API_MODEL_PATH + 'VocabularyModel');
// const LanguageModel  = require(API_MODEL_PATH + 'LanguageModel');
const WordModel = require(API_MODEL_PATH + 'WordModel');
const VocabularyWordModel = require(API_MODEL_PATH + 'VocabularyWordModel');
const CustomErrorHandler = require(MAIN_ROOT_PATH + '/lib/CustomErrorHandler');
const translate = require('google-translate-api');

let user_id = '5afb477501e26e255c099ac4';

class VocabularyController extends BaseController {

    constructor() {

        //5af8590a9652501c20ac0a0b az
        //5af8590a9652501c20ac0a0c ru
        //5af8590a9652501c20ac0a0d en

        super();
        // console.log(this)



    }


    index(req, res, next) {

        VocabularyModel.find({}, (error, result) => {
            if (error) return res.send({ error })
            if (result) return res.send({ result: result })
        });

    };

    show(req, res) {
        let __n = 1;
        VocabularyWordModel.find({
            vocabulary_id: req.params.id,
            user_id
        }, (error, vocabulary) => {

            if (error) return res.send({ error })
            else if (vocabulary.length > 0) {
                let newObj = {};
                // newObj.words = [];
                VocabularyModel.findOne({ _id: vocabulary[0].vocabulary_id }, { name: 1, description: 1 }, (error, result) => {
                    newObj.vocabulary = result.toObject();
                    newObj.vocabulary.words = {};
                    // let newWord = {};
                    newObj.vocabulary.words['waiting'] = [];
                    newObj.vocabulary.words['done'] = [];
                    newObj.vocabulary.words['deleted'] = [];
                    newObj.vocabulary.words['favorite'] = [];
                    newObj.vocabulary.words['repeat'] = [];
                    // return res.send(result);
                    vocabulary.map((voc, vocIndex) => {

                        WordModel.find({ _id: { $in: voc.word_id } }, { text: 1, language: 1, subject: 1 }, (error, words) => {

                            if (error) return res.send({ error });

                            else {

                                let newWord = {};


                                if (voc.type == 1) {
                                    newWord[words[0].language] = words[0];
                                    newWord[words[1].language] = words[1];
                                    newObj.vocabulary.words['waiting'].push(newWord);

                                } else if (voc.type == 2) {
                                    newWord[words[0].language] = words[0];
                                    newWord[words[1].language] = words[1];
                                    newObj.vocabulary.words['done'].push(newWord);
                                }
                                else if (voc.type == 3) {
                                    newWord[words[0].language] = words[0];
                                    newWord[words[1].language] = words[1];
                                    newObj.vocabulary.words['deleted'].push(newWord);
                                }
                                else if (voc.type == 4) {
                                    nnewWord[words[0].language] = words[0];
                                    newWord[words[1].language] = words[1];
                                    newObj.vocabulary.words['favorite'].push(newWord);
                                }
                                else if (voc.type == 5) {
                                    newWord[words[0].language] = words[0];
                                    newWord[words[1].language] = words[1];
                                    newObj.vocabulary.words['repeat'].push(newWord);
                                }

                                // newObj.vocabulary.words.push(newWord);

                                // newWord.type = voc.type;

                                // return res.send({l:vocabulary.length});
                                // console.log(__n === vocabulary.length);
                                // __n++;

                                if (__n === vocabulary.length) {
                                    return res.send(newObj);
                                }

                                __n++;
                            }

                        })

                    });
                })
            }
            else {
                return res.send({ message: 'Sorry, nothing to display here :(' })
            }

        })


    }

    store(req, res, next) {

        var vocabulary = {
            _id: "5b002ba758ac9b1e0c2dddcc",
            name: 'Learn English',
            description: 'Learn English as me',
            user_id: '5afb477501e26e255c099ac4',
            languages: [
                '5af8590a9652501c20ac0a0d',
                '5af8590a9652501c20ac0a0b',
            ],
            status: true,
        }



        VocabularyModel.insertVocabulary(new VocabularyModel(vocabulary), (error, result) => {
            if (error) return res.send({ error: error })
            if (result) return res.send({ result: result })
        });

    }

    addNewWordToVoc(req, res) {


        let { body } = req;

        let from_word, to_word;

        body.user_id = user_id;

        let CustomError = new CustomErrorHandler();

        if (!body.text.trim().length > 0) {
            return res.status(422).json({ message: 'This field is required' })
        }





        return translate(body.text, { from: body.language.from, to: body.language.to }).then(response => {

            if (body.text == response.text) {
                return res.status(422).json({ message: 'Same words' })
            }

            WordModel.findOne({ text: body.text }, (error, fromLang) => {
                if (error) { return res.status(500).json({ error: 'Something is wrong :(' }) }

                if (fromLang) {
                    from_word = fromLang;

                } else if (fromLang) {
                    from_word = fromLang;

                    WordModel.findOne({ text: response.text }, (error, toLang) => {
                        if (error) { return res.status(500).json({ error: 'Something is wrong :(' }) }

                        if (toLang) {
                            to_word = toLang;
                            this.createVocabularyWord(body, from_word, to_word, (error, success) => {

                                if (error) { return res.status(500).json({ error: 'Something is wrong :(' }) }

                                else if (success) {

                                    return res.send(this.sendNewVocabularyObject(body, success, from_word, to_word))
                                }


                            })
                        }
                        else {
                            this.createToWord(body, response, (error, toLang) => {
                                if (error) { return res.status(500).json({ error: 'Something is wrong :(' }) }

                                else if (toLang) {
                                    to_word = toLang;
                                    this.createVocabularyWord(body, from_word, to_word, (error, success) => {

                                        if (error) { return res.status(500).json({ error: 'Something is wrong :(' }) }

                                        else if (success) {

                                            return res.send(this.sendNewVocabularyObject(body, success, from_word, to_word))
                                        }


                                    })

                                }
                            })
                        }

                    })




                } else {
                    this.createFromWord(body, (error, fromLang) => {

                        if (error) { return res.status(500).json({ error: 'Something is wrong :(' }) }
                        else if (fromLang) {
                            from_word = fromLang;

                            WordModel.findOne({ text: response.text }, (error, toLang) => {
                                if (error) { return res.status(500).json({ error: 'Something is wrong :(' }) }

                                if (toLang) {
                                    to_word = toLang;
                                    this.createVocabularyWord(body, from_word, to_word, (error, success) => {

                                        if (error) { return res.status(500).json({ error: 'Something is wrong :(' }) }

                                        else if (success) {

                                            return res.send(this.sendNewVocabularyObject(body, success, from_word, to_word))
                                        }


                                    })
                                }
                                else {
                                    this.createToWord(body, response, (error, toLang) => {
                                        if (error) { return res.status(500).json({ error: 'Something is wrong :(' }) }

                                        else if (toLang) {
                                            to_word = toLang;
                                            this.createVocabularyWord(body, from_word, to_word, (error, success) => {

                                                if (error) { return res.status(500).json({ error: 'Something is wrong :(' }) }

                                                else if (success) {

                                                    return res.send(this.sendNewVocabularyObject(body, success, from_word, to_word))
                                                }


                                            })

                                        }
                                    })
                                }

                            })




                        }

                    })
                }

            })






        }).catch(err => {
            res.send(err.message);
        });

    }

    createFromWord(body, callback) {


        return WordModel.insertWord(new WordModel({
            text: body.text,
            language: body.language.from,
            status: true,
            user_id: body.user_id
        }), callback)

    }
    createToWord(body, response, callback) {
        return WordModel.insertWord(new WordModel({
            text: response.text,
            language: body.language.to,
            status: true,
            user_id: body.user_id
        }), callback)

    }
    createVocabularyWord(body, from_word, to_word, callback) {
        return VocabularyWordModel.insertVocabularyWord(new VocabularyWordModel({
            vocabulary_id: body.vocabulary_id,
            word_id: [
                from_word._id,
                to_word._id,
            ],
            user_id: body.user_id
        }), callback)
    }

    sendNewVocabularyObject(body, success, from_word, to_word) {
        var newVocabularyObject = {};
        newVocabularyObject = success.toObject();
        newVocabularyObject[body.language.from] = from_word;
        newVocabularyObject[body.language.to] = to_word;

        return newVocabularyObject;
    }




}

module.exports = VocabularyController;


// WordModel.findOne({text:body.text},(error,word)=> {
//     if (error) { return res.status(500).json({ error: 'Something is wrong :(' }) }


// })