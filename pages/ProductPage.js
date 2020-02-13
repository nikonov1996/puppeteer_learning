import "@babel/polyfill";
const { PRODUCT_PAGE } = require("../service/selectors");
const { BasePage } = require("./BasePage");
const URL = require("../service/urls");

class ProductPage extends BasePage {
  async openProduct(productName) {
    await this.page.goto(URL.ZENER_PRODUCT_PAGE(productName));
  }

  async selectElemFromProductList(elemNumber) {
    await this.page.waitForSelector(PRODUCT_PAGE.PRODUCT_LIST, {
      timeout: 15000
    });
    await this.page.click(
      PRODUCT_PAGE.SELECT_ELEMENT_FROM_PRODUCT_LIST(elemNumber)
    );
  }

  async addToCart() {
    await this.page.click(PRODUCT_PAGE.ADD_TO_CART_BTN);
  }

  //in modal after addToCard clicked
  async continueToCard() {
    await this.page.waitForSelector(PRODUCT_PAGE.MODAL_POPUP);
    await this.page.click(PRODUCT_PAGE.GO_TO_ORDER_BTN);
  }

  async continiueShopping() {
    //todo кнопка продолжить покупки
  }

  async getEachProductsParams() {
    await this.page.waitForSelector("#j-avail-list", { timeout: 10000 });

    return await this.page.evaluate(() => {
      let prodData = [];
      const listProd = document.querySelectorAll("#j-avail-list ul li input");
      listProd.forEach(element => {
        const manufacturer = element.getAttribute("data-manufacturer");
        const name = element.getAttribute("data-name");
        prodData.push({ name, manufacturer });
      });
      return prodData;
    });
  }

  async checkProductWasLoaded() {
    const rightTitle = await this.page.evaluate(() => {
      return (
        document.title.includes("шт") && !document.title.includes("купить")
      );
    });
    if (rightTitle) {
      await this.page.waitForSelector(".j-item-progressbar", {
        hidden: true,
        timeout: 30000
      });
    }
  }

  async ifProductListPresent() {
    return await this.page.evaluate(() => {
      return (
        document.title.includes("шт") || !document.title.includes("запрос")
      );
    });
  }

  async getListLength(){
    return await this.page.evaluate(() => {
      return document.querySelectorAll('#j-avail-list li').length;
    });
  }
}

module.exports = { ProductPage };
