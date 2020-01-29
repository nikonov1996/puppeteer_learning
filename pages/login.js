import "@babel/polyfill";
const { LOGIN_FORM } = require('../service/selectors');
const {Base} = require('../pages/base');
const URL = require('../service/urls');

class LoginPage extends Base{

  async navigate(){
    await this.page.goto(URL.LOGIN_PAGE);
  }

  async setEmail(email){
    
    await this.page.waitForSelector(LOGIN_FORM.EMAIL_INPUT);
    await this.page.click(LOGIN_FORM.EMAIL_INPUT);
    await this.page.type(LOGIN_FORM.EMAIL_INPUT, email);
  }

  async setPassword(password){
    await this.page.waitForSelector(LOGIN_FORM.PASSWORD_INPUT);
    await this.page.click(LOGIN_FORM.PASSWORD_INPUT);
    await this.page.type(LOGIN_FORM.PASSWORD_INPUT, password);
  }

  async submit(){
    await this.page.click(LOGIN_FORM.LOGIN_BUTTON);
  }

  async gotoRegistPage(){
    await this.page.hover(LOGIN_FORM.EMAIL_INPUT);
    await this.page.waitForSelector(LOGIN_FORM.REGIST_PAGE_REDIRECT_LINK);
    await this.page.click(LOGIN_FORM.REGIST_PAGE_REDIRECT_LINK);
  } 

  async login(email, password){
    await this.setEmail(email);
    await this.setPassword(password);
    await this.submit();
  }

}
module.exports = { LoginPage };
