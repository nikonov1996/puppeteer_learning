import "@babel/polyfill";
const {PRODUCT_PAGE} = require("../service/selectors");
const {BasePage} = require('./BasePage');
const URL = require('../service/urls');

class ProductPage extends BasePage {

  async openProduct(productName){
    await this.page.goto(URL.ZENER_PRODUCT_PAGE(productName));
  }
//todo нужна проверка на наличие списка,на ожидание его загрузки и тд
  async initProductList(){
    const btn_poZaprosu = await this.page.evaluate(()=>{
      return document.querySelector('.btn.btn--white');
    })
   
  }
  
  async selectElemFromProductList(elemNumber){
    await this.page.waitForSelector(PRODUCT_PAGE.PRODUCT_LIST, {timeout:15000});
    await this.page.click(PRODUCT_PAGE.SELECT_ELEMENT_FROM_PRODUCT_LIST(elemNumber));
  }

  async addToCart(){
    await this.page.click(PRODUCT_PAGE.ADD_TO_CART_BTN);
  }

  //in modal after addToCard clicked
  async continueToCard(){
    await this.page.waitForSelector(PRODUCT_PAGE.MODAL_POPUP); 
    await this.page.click(PRODUCT_PAGE.GO_TO_ORDER_BTN);
  }

  async continiueShopping(){
  //todo кнопка продолжить покупки
  }
 



}

module.exports = {ProductPage};