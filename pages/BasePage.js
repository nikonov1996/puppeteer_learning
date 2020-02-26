import "@babel/polyfill";
import "@babel/preset-env";
class BasePage{
  
  constructor(page){
    this.page = page;
  }
}

module.exports = {BasePage};