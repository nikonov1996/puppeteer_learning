import "@babel/polyfill";
import puppeteer from "puppeteer";
const prodData = require( "../model/productData");

let page;
let browser;
const width = 1920;
const height = 1080;





beforeAll(async () => {
  browser = await puppeteer.launch({
    headless: false,
    slowMo: 80,
    args: [`--window-size=${width},${height}`]
  });
  page = await browser.newPage();
  await page.setViewport({ width, height });
 // await page.goto("https://www.google.com/");
});
afterAll(() => {
  browser.close();
});

prodData().then(async (value)=>{
  for (let i = 0; i < value.length; i++) {
    test(`test${value[i].name}`, () => {
      console.log(value[i])
      //const productName = '1739'
     // await page.goto(`http://dev9.redramka.ru/shop/product/${productName}/`);
     // await page.waitForSelector(".hold-avail__list");
    }, 16000);
    
  }
  
})

 
  

