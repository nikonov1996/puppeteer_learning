import "@babel/polyfill";
const faker = require("faker");
import "puppeteer";
import createBrowser  from '../service/createBrowser';
const { LoginPage } = require("../pages/login");
const { RegistPage } = require('../pages/regist');

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
  let login_page;
  let regist_page;
  beforeEach(async()=>{
   login_page = new LoginPage(page);
   regist_page = new RegistPage(page);
  })

  test("If login with wrong account, user can go to regist page and registrate", async () => {
  //  const login_page = new LoginPage(page);
  //  const regist_page = new RegistPage(page);
    await login_page.navigate();
    await login_page.login(
      user.email,
      user.password
    );
    await login_page.gotoRegistPage();
    

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
