const PdfParse = require('pdf-parse');
const { createWorker } = require('tesseract.js');

const ocr = async (imageBuff) => {
    try {
        const worker = await createWorker('eng');
        const ret = await worker.recognize(imageBuff);
        const textExtracted = ret.data.text
        await worker.terminate();
        return textExtracted;
    } catch (e) {
        throw new Error('Error in ocr', e);
    }
}

const extractTextFromPDF = async (pdfBuffer) => {
    try {
      const data = await PdfParse(pdfBuffer);
      return data.text;
    } catch (error) {
      console.error('Error during PDF text extraction:', error);
      throw error;
    }
  };

module.exports = {ocr, extractTextFromPDF};