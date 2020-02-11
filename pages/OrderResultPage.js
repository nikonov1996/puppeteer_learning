import "@babel/polyfill";
const {PRODUCT_PAGE} = require("../service/selectors");
const {BasePage} = require('./BasePage');
const URL = require('../service/urls');

class OrderResultPage extends BasePage {
  async getInfoByOrderNumber(){};

}

module.exports = {OrderResultPage};


