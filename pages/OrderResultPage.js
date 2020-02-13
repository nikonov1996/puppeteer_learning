import "@babel/polyfill";
const { PRODUCT_PAGE } = require("../service/selectors");
const { BasePage } = require("./BasePage");
const URL = require("../service/urls");

class OrderResultPage extends BasePage {
  async goto() {
    await this.page.goto("http://dev9.redramka.ru/shop/saleorder/238017");
  }

  async checkSuccess() { //todo можно проверить по тайтлу
    await this.page.waitForSelector(".basket-text h2");
    return await this.page.evaluate(() => {
      return document.querySelector(".basket-text h2").innerText.includes("успешно");
    });
  }

  async getOrderNumber() {
    //взять url разбить на части по "/" взять последнюю часть это и будет номер
    let url = await this.URL();
    return url.split("/").pop();
  }

  async getInfoByOrderNumbers(from, to) {
    await this.page.goto(URL.ZENER_ORDER_INFO_PAGE(from, to));
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
    // return order_info;
  }
}

module.exports = { OrderResultPage };
