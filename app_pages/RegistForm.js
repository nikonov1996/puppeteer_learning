module.exports = function RegistForm(page) {
  this.init = async () => {
    await page.waitForSelector("[id=registration_container]");
  };

  this.fillEmail = async email => {
    await page.click("input[name=reg_email__]");
    await page.type("input[name=reg_email__]", email);
    await page.waitForSelector("input[name=reg_email_confirmation__]");
    await page.click("input[name=reg_email_confirmation__]");
    await page.type("input[name=reg_email_confirmation__]", email);
  };

  this.fillFirstName = async firstname => {
    await page.click("input[name=firstname]");
    await page.type("input[name=firstname]", firstname);
  };

  this.fillLastName = async lastname => {
    await page.click("input[name=lastname]");
    await page.type("input[name=lastname]", lastname);
  };

  this.fillPassword = async password => {
    await page.click("input[name=reg_passwd__]");
    await page.type("input[name=reg_passwd__]", password);
  };

  this.choseSex = async () => {
    await page.click("input[name=sex]");
  };

  this.submitRegist = async () => {
    await page.click("div._1lch button[name=websubmit]");
  };
};
