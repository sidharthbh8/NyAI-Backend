const puppeteer = require('puppeteer');
const text = `Hello, this is a filler text lorem ipsum dolor sit amet consectetur adipiscing elit.`
async function translateAndSpeak(text, callback) {

    const browser = await puppeteer.launch({
        headless: false, // Run in headless mode
        args: ['--window-size=10,10', '--disable-gpu'],
      });
  const page = await browser.newPage();

  try {
    // Navigate to the Google Translate page
    await page.goto(`https://translate.google.co.in/?sl=en&tl=bn&text=${text}&op=translate`);
    await page.waitForSelector('#yDmH0d > c-wiz > div > div.ToWKne > c-wiz > div.OlSOob > c-wiz > div.ccvoYb.EjH7wc > div.AxqVh > div.OPPzxe > c-wiz.sciAJc > div > div.usGWQd > div > div.lRu31 > span.HwtZe > span > span');

    // Get the translated text
    let element = await page.$('#yDmH0d > c-wiz > div > div.ToWKne > c-wiz > div.OlSOob > c-wiz > div.ccvoYb.EjH7wc > div.AxqVh > div.OPPzxe > c-wiz.sciAJc > div > div.usGWQd > div > div.lRu31 > span.HwtZe > span > span');
    let translatedText = await page.evaluate(el => el.innerText, element);

    // Click on the speaker icon
    await page.waitForSelector('#yDmH0d > c-wiz > div > div.ToWKne > c-wiz > div.OlSOob > c-wiz > div.ccvoYb.EjH7wc > div.AxqVh > div.OPPzxe > c-wiz.sciAJc > div > div.usGWQd > div > div.VO9ucd > div.aJIq1d > div.m0Qfkd > span > button');
    await page.click('#yDmH0d > c-wiz > div > div.ToWKne > c-wiz > div.OlSOob > c-wiz > div.ccvoYb.EjH7wc > div.AxqVh > div.OPPzxe > c-wiz.sciAJc > div > div.usGWQd > div > div.VO9ucd > div.aJIq1d > div.m0Qfkd > span > button');

    // Capture the audio data (replace with the actual audio buffer retrieval)
    const audioBuffer = await page.screenshot({ encoding: 'binary' });
    callback(null, { translatedText, audioBuffer });
  } catch (error) {
    // Invoke the callback function with the error if any
    callback(error, null);
  }
}

module.exports = { translateAndSpeak };
