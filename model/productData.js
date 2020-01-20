import "@babel/polyfill";
import puppeteer from "puppeteer";

module.exports = async function ProductList(page) {
 // const browser = await puppeteer.launch({ headless: true });
 this.takeParams = async(productName)=>{
  await page.goto(`http://dev9.redramka.ru/shop/product/${productName}/`);
  await page.waitForSelector(".hold-avail__list");

  const data = await page.evaluate(() => {
    let prodData = [];
    const listProd = document.querySelectorAll(".hold-avail__list li input");
    listProd.forEach(element => {
      const manufacturer = element.getAttribute("data-manufacturer");
      const name = element.getAttribute("data-name");
      prodData.push({ manufacturer, name });
    });
    return prodData;
  });
  return data;
 }; 
 
 
};
