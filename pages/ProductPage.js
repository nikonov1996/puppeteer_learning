import "@babel/polyfill";
const {PRODUCT_PAGE} = require("../service/selectors");
const {Base} = require('../pages/base');
const URL = require('../service/urls');

class ProductPage extends Base {

  async navigateTo(productName){
    await this.page.goto(URL.ZENER_PRODUCT_PAGE(productName));
  }

  async initProductList(){
    const btn_poZaprosu = await this.page.evaluate(()=>{
      return document.querySelector('.btn.btn--white');
    })
   
  }
  
  async selectElemFromProductList(elemNumber){
    await this.page.waitForSelector(PRODUCT_PAGE.PRODUCT_LIST, {timeout:15000});
    await this.page.click(PRODUCT_PAGE.SELECT_ELEMENT_FROM_PRODUCT_LIST(5));
  }

}