import "@babel/polyfill";
const puppeteer = require("puppeteer");

const width = 1920;
const height = 1080;

class LoginPage {
  constructor(){
    this.url = 'https://www.facebook.com/login/';
  }

  async open(){
    this.browser = await puppeteer.launch({
      headless: false,
      slowMo: 80,
      defaultViewport: null,
      args: [`--window-size=${width},${height}`]
    });
    this.page = await this.browser.newPage();
    await this.page.goto(this.url);
  }

  async close(){
    await this.page.close();
    await this.browser.close();
  }

  title(){
    return this.page.title();
  }

  async setEmail(email){
    
    await this.page.waitForSelector('input#email');
    await this.page.click('input#email');
    await this.page.type('input#email', email);
  }

  async setPassword(password){
    await this.page.waitForSelector('input#pass');
    await this.page.click('input#pass');
    await this.page.type('input#pass', password);
  }

  async submit(){
    await this.page.click('button#loginbutton');
  }

  async getPasswordText(){
    const result = await this.page.$eval('input#pass', el => el.innerText);
    return result;
  }


}

module.exports = { LoginPage };
