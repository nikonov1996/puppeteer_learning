import "@babel/polyfill";
import faker from "faker";
import puppeteer from "puppeteer";
const RegistForm = require("../app_pages/RegistForm");

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

beforeAll(async () => {
  browser = await puppeteer.launch({
    headless: false,
    slowMo: 80,
    args: [`--window-size=${width},${height}`]
  });
  page = await browser.newPage();
  await page.setViewport({ width, height });
});
afterAll(() => {
  browser.close();
});

describe("Registration form tests", () => {
  test.each(["Почта", "Картинки"])(
    "test content on Google page",
    async text => {
      await page.goto("https://www.google.com/");
      const result = await page.evaluate(
        () =>
          document.querySelector(
            "#gbw > div > div > div.gb_9d.gb_i.gb_yg.gb_pg"
          ).textContent
      );
      expect(result).toContain(text);
      //await page.close();
    },
    60000
  );

  test("assert that <title> is correct", async () => {
    await page.goto(APP);
    const title = await page.$eval("title", el => el.innerText);
    expect(title).toBe("Facebook — Выполните вход или зарегистрируйтесь");
  }, 16000);

  test("user can registrate used this form", async () => {
    const regist_form = new RegistForm(page);
    await regist_form.init();

    await regist_form.fillFirstName(user.firstname);
    await regist_form.fillLastName(user.lastname);
    await regist_form.fillEmail(user.email);
    await regist_form.fillPassword(user.password);
    await regist_form.choseSex();
    await regist_form.submitRegist();

    const pages = await browser.pages();
    const popup = pages[pages.length - 1];
    await popup.waitForSelector("h3#u_0_2");
    const result = await popup.$eval("h3#u_0_2", el => el.innerText);
    expect(result).toBe("Подтвердите свой день рождения");
  }, 60000);
});
