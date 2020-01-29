import "@babel/polyfill";
import "puppeteer";
import createBrowser from "../service/createBrowser";
const {PRODUCT_PAGE , CART_PAGE} = require("../service/selectors");

let page;
let browser;

beforeAll(async () => {
  browser = await createBrowser();
  page = await browser.newPage();
});

afterAll(async () => {
  //await browser.close();
});

describe("zener tests", async () => {
  test("product 1739 page test", async () => {
    await page.goto("https://zener.ru/shop/product/1739/");
    await page.click(PRODUCT_PAGE.SELECT_ELEMENT_FROM_PRODUCT_LIST(5));
   /* const pages = await browser.pages();
    const popup = pages[pages.length-1];
    await popup.waitForSelector(PRODUCT_PAGE.MODAL_POPUP);
    await popup.click(PRODUCT_PAGE.GO_TO_ORDER_BTN);*/
    await page.click(PRODUCT_PAGE.ADD_TO_CART_BTN);
    await page.waitForSelector(PRODUCT_PAGE.MODAL_POPUP);
    await page.click(PRODUCT_PAGE.GO_TO_ORDER_BTN);
    console.log(page.url());
    await page.click(CART_PAGE.ORDER_BTN);
    console.log(page.url());

  }, 60000);
});
