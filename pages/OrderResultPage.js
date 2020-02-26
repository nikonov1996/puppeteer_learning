import "@babel/polyfill";
import "@babel/preset-env";
const { BasePage } = require("./BasePage");
const URL = require("../service/urls");

class OrderResultPage extends BasePage {
   
  async goto() {
    await this.page.goto("http://dev9.redramka.ru/shop/saleorder/238017");
  }

  

  async checkSuccess() {
    return await this.page.evaluate(() => {
      return document.querySelector("h2").innerText.includes("успешно");
    });
  }

  async getOrderNumber() {
    let url = await this.page.url();
    return url.split("/").pop();
  }

  async getInfoByOrderNumbers(from, to) {
    await this.page.goto(URL.DEV_ORDER_INFO_PAGE(from, to));
    await this.page.waitForSelector("body");
    const order_info = await this.page.evaluate(() => {
      return JSON.parse(document.querySelector("body").innerText);
    });

    let arr = [];
    for (const key in order_info) {
      if (order_info.hasOwnProperty(key)) {
        const element = order_info[key];
        const name = element.ITEMS[0].NAME;
        const manufacturer = element.ITEMS[0].MANUFACTURER;
        arr.push({ name, manufacturer });
      }
    }

    return arr;
  }

  async clearArrays(...arr) {
    arr.forEach(e => {
      e.length = 0;
    });
  }
}

module.exports = { OrderResultPage };
