import "@babel/polyfill";
class Base{
  
  constructor(page){
    this.page = page;
  }
  
  URL(){
    return this.page.url();
  }

  title(){
    return this.page.title();
  }
}

module.exports = {Base};