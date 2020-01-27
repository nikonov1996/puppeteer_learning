import "@babel/polyfill";
const faker = require("faker");
import "puppeteer";
import createBrowser  from '../service/createBrowser';
const { LoginPage } = require("../app_pages/login");
const { RegistPage } = require('../app_pages/regist');

const user = {
  firstname: faker.name.firstName(),
  lastname: faker.name.lastName(),
  email: faker.internet.email(),
  password: faker.random.words()
};

let page;
let browser;
beforeAll(async () => {
  browser = await createBrowser();
  page = await browser.newPage();
});

afterAll(async () => {
  await browser.close();
});

describe("Login page tests", () => {

  test("test 1", async () => {
    const login_page = new LoginPage(page);
    await login_page.navigate();
    await login_page.login(
      user.email,
      user.password
    );
    await login_page.gotoRegistPage();
    const regist_page = new RegistPage(page);

    expect(regist_page.URL()).toBe('https://www.facebook.com/r.php');
    
    await regist_page.fillRegistForm(
      user.email,
      user.firstname,
      user.lastname,
      user.password,
      '1996'
    );
    await regist_page.submitRegist();
    
  }, 100000);
});
