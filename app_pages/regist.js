import "@babel/polyfill";
const {REGIST_FORM} = require('../service/selectors');

class RegistPage {
  
  constructor(page){
   this.page = page;
  }

  URL(){
    return this.page.url();
  }

  async setFirstname(firstname) {
    await this.page.waitForSelector(REGIST_FORM.FIRSTNAME_INPUT);
    await this.page.click(REGIST_FORM.FIRSTNAME_INPUT);
    await this.page.type(REGIST_FORM.FIRSTNAME_INPUT, firstname);
  }

  async setLastname(lastname) {
    await this.page.click(REGIST_FORM.LASTNAME_INPUT);
    await this.page.type(REGIST_FORM.LASTNAME_INPUT, lastname);
  }

  async setEmail(email) {
    await this.page.click(REGIST_FORM.EMAIL_INPUT);
    await this.page.type(REGIST_FORM.EMAIL_INPUT, email);
    await this.page.waitForSelector(REGIST_FORM.EMAIL_CONFIRM);
    await this.page.click(REGIST_FORM.EMAIL_CONFIRM);
    await this.page.type(REGIST_FORM.EMAIL_CONFIRM, email);
  }

  async setPassword(password) {
    await this.page.click(REGIST_FORM.PASSWORD_INPUT);
    await this.page.type(REGIST_FORM.PASSWORD_INPUT, password);
  }

  async selectYear(year) {
    await this.page.select(REGIST_FORM.YEAR_SELECT, year);
  }

  async choseSex() {
    await this.page.click(REGIST_FORM.SEX_RADIO);
  }

  async submitRegist() {
    await this.page.click(REGIST_FORM.SUBMIT_BUTTON);
  }

  async fillRegistForm(email , firstname, lastname, password, year ){
    await this.setFirstname(firstname);
    await this.setLastname(lastname);
    await this.setEmail(email);
    await this.setPassword(password);
    await this.selectYear(year);
    await this.choseSex();
  }

}

module.exports = {RegistPage};
