import "@babel/polyfill";
const {CART_PAGE} = require("../service/selectors");
const {BasePage} = require('./BasePage');


class CartPage extends BasePage {

async goToOrder(){
  await this.page.waitForSelector(CART_PAGE.ORDER_BTN, { timeout: 5000 }); 
  await this.page.click(CART_PAGE.ORDER_BTN);
}
}
module.exports = {CartPage};

