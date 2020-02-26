import "@babel/polyfill";
import "@babel/preset-env";
let puppeteer = require("puppeteer");

module.exports = async function({visible}){
  if(visible){
  return await puppeteer.launch({
    headless: false,
    slowMo: 80,
    defaultViewport: null
  });
}else{
  return await puppeteer.launch();
}
}

