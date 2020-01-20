module.exports = function LoginForm(page) {
  this.fillEmail = async email => {
    await page.waitForSelector('input#email');
    await page.click('input#email');
    await page.type('input#email', email);
  };

  this.fillPassword = async password =>{
    await page.waitForSelector('input#pass');
    await page.click('input#pass');
    await page.type('input#pass', password);
  }

  this.submitEnter = async ()=>{
    await page.click('button#loginbutton');
  }

  this.goLoginPage = async ()=>{
    await page.goto('https://www.facebook.com/login/')
  }
};
