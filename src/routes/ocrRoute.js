const express = require('express')
const router = new express.Router()
const multer = require('multer')
const {ocr, extractTextFromPDF } = require('../utils/tesseract')
const { processTextWithNLP } = require('../utils/textToNlp')
const { translateAndSpeak } = require('../utils/regtts')
var sendingthistext
const storage = multer.memoryStorage()
const upload = multer({
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png|pdf|JPG|PNG|JPEG)$/)) {
            return cb(new Error('Please upload an image (jpg, jpeg, or png) or PDF file only'))
        }
        cb(undefined, true)
    }, 
    storage:storage
})
router.post('/extracttextfromimage', upload.single('document'),async (req, res) => {
    try {
        if(!req.file){
            return res.status(400).send('error: No file uploaded')
        }
        // const textExtracted = await ocr(req.file.buffer)
        let text;
        if (req.file.originalname.endsWith('.pdf')) {
          text = await extractTextFromPDF(req.file.buffer);
        } else {
          text = await ocr(req.file.buffer);
        }
        console.log(typeof text);
        const nlpResult = await processTextWithNLP(text);
        sendingthistext = nlpResult
        if (nlpResult.error) {
            return res.status(422).json({ error: nlpResult.error }); // Handle 422 status code from NLP API
        }
        console.log(text);
        res.send({nlpResult})
    } catch (e) {
        console.log(e);
        res.status(500).send('Internal Server Error')
    }
})

router.post('/texttospeech', async (req, res) => {      
    try {
        const text = `Rent Agreement s made on tis 2023-12-20 by Alankar Dutas/o R. N. Dutta(Addres) E-4 643, Greater Kailash-02Herinatte calc th Leszor/ Or, Party Of th frst partanoNyaa Artificial Intelligence, trough ts proposed directordanardhan Sin. cal Lessee Tenan, Paty of the second par. That the expression of the tem, Lessor Our and th Lessee tenant shall mean and include and include thei lal eisSuccessors, assigns representatives, and that the Lessor /Owner ithe owner and in possession of the properyNoB-3/118 Delhi and has agreed to et out the ne office Room, one Tet  has agreed.`
        console.log(text);
        translateAndSpeak(text, (error, { translatedText, audioBuffer }) => {
            if (error) {
                res.status(500).send('Internal Server Error')
            } else {
                res.send(translatedText);
            }
        });
    } catch (e) {
        console.log(e);
        res.status(500).send('Internal Server Error')
    }
})

module.exports = router