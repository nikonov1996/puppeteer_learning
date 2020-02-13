import "@babel/polyfill";
const puppeteer = require("puppeteer");

const width = 1920;
const height = 1080;

module.exports = async function(visible){
// const browser;
  if(visible){
  return await puppeteer.launch({
    headless: false,
    slowMo: 80,
    defaultViewport: null,
    args: [`--window-size=${width},${height}`]
  });
}else{
  return await puppeteer.launch();
}
 // return browser;
}

