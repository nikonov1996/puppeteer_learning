import "@babel/polyfill";
const puppeteer = require("puppeteer");

const width = 1920;
const height = 1080;

module.exports = async function(){
  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 80,
    defaultViewport: null,
    args: [`--window-size=${width},${height}`]
  });
  
  return browser;
}

