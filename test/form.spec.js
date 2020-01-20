import "@babel/polyfill";
const faker = require("faker");
const puppeteer = require("puppeteer");


const APP = "https://www.facebook.com/";
const user = {
  firstname: faker.name.firstName(),
  lastname: faker.name.lastName(),
  email: faker.internet.email(),
  password: faker.random.words()
};

let page;
let browser;
const width = 1920;
const height = 1080;

const RegistForm = require("../app_pages/regist_form");
const LoginForm = require('../app_pages/log_in');


beforeAll(async () => {
  browser = await puppeteer.launch({
    headless: false,
    slowMo: 80,
    defaultViewport: null,
    args: [`--window-size=${width},${height}`]
  });
  page = await browser.newPage();
  await page.setViewport({ width, height });
  
    
});
afterAll(() => {
  browser.close();
});

describe("Registration form tests", () => {
  
  let login_form =  LoginForm(page);
  let regist_form = RegistForm(page);

  test("assert that <title> is correct", async () => {
    await page.goto(APP);
    const title = await page.$eval("title", el => el.innerText);
    expect(title).toBe("Facebook — Выполните вход или зарегистрируйтесь");
  }, 16000);

  test("user can registrate used this form", async () => {
    await regist_form.init();
    await regist_form.fillFirstName(user.firstname);
    await regist_form.fillLastName(user.lastname);
    await regist_form.fillEmail(user.email);
    await regist_form.fillPassword(user.password);
    await regist_form.choseYear('1996');
    await regist_form.choseSex();
    await regist_form.submitRegist();

    await page.waitFor('h2.uiHeaderTitle');
    const result = await page.$eval('h2.uiHeaderTitle', el => el.innerText);
    expect(result).toBe('Введите код из эл. письма');

  }, 60000);

  test('user cant login with wrong password and email', async ()=>{
    //await login_form.goLoginPage();
    await page.goto('https://www.facebook.com/login/');
    await login_form.fillEmail(user.email);
    await login_form.fillPassword(user.password);
    await login_form.submitEnter();

    const result = await page.$eval('input#pass', el => el.innerText);
    expect(result).toBe('');

  }, 16000)
});
