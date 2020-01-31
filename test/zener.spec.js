import "@babel/polyfill";
import "puppeteer";
const faker = require("faker");
import createBrowser from "../service/createBrowser";
const URL = require('../service/urls');
const {PRODUCT_PAGE , CART_PAGE, ORDER_PAGE} = require("../service/selectors");

const user = {
  firstname: faker.name.firstName(),
  lastname: faker.name.lastName(),
  email: faker.internet.email(),
  phone: faker.phone.phoneNumber()
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

describe("zener tests", async () => {
  test("product 1739 page test", async () => {
    await page.goto(URL.ZENER_PRODUCT_PAGE(1739));
    await page.waitForSelector(PRODUCT_PAGE.PRODUCT_LIST, {timeout:15000});
    await page.click(PRODUCT_PAGE.SELECT_ELEMENT_FROM_PRODUCT_LIST(5));
   /* const pages = await browser.pages();
    const popup = pages[pages.length-1];
    await popup.waitForSelector(PRODUCT_PAGE.MODAL_POPUP);
    await popup.click(PRODUCT_PAGE.GO_TO_ORDER_BTN);*/
    await page.click(PRODUCT_PAGE.ADD_TO_CART_BTN);
    await page.waitForSelector(PRODUCT_PAGE.MODAL_POPUP);
    await page.click(PRODUCT_PAGE.GO_TO_ORDER_BTN);
    expect(page.url()).toBe('https://zener.ru/shop/cart/');
    await page.waitForSelector(CART_PAGE.ORDER_BTN, {timeout:5000});
    await page.click(CART_PAGE.ORDER_BTN);
    expect(page.url()).toBe('https://zener.ru/shop/makeorder/');
    await page.waitForSelector(ORDER_PAGE.CONTACT_INFO.FULL_NAME_INPUT);
    await page.click(ORDER_PAGE.CONTACT_INFO.FULL_NAME_INPUT);
    await page.type(ORDER_PAGE.CONTACT_INFO.FULL_NAME_INPUT, user.firstname );
    await page.waitForSelector(ORDER_PAGE.CONTACT_INFO.EMAIL_INPUT);
    await page.click(ORDER_PAGE.CONTACT_INFO.EMAIL_INPUT);
    await page.type(ORDER_PAGE.CONTACT_INFO.EMAIL_INPUT, user.email);
    await page.waitForSelector(ORDER_PAGE.CONTACT_INFO.PHONE_INPUT);
    await page.click(ORDER_PAGE.CONTACT_INFO.PHONE_INPUT);
    await page.type(ORDER_PAGE.CONTACT_INFO.PHONE_INPUT, user.phone);
    await page.waitForSelector(ORDER_PAGE.DELIVERY_INFO.CITY_INPUT);
    await page.click(ORDER_PAGE.DELIVERY_INFO.CITY_INPUT, {clickCount: 3});
    await page.keyboard.press('Backspace');
    await page.type(ORDER_PAGE.DELIVERY_INFO.CITY_INPUT, 'Томск');
    await page.waitForSelector(ORDER_PAGE.DELIVERY_INFO.CITY_LIST);
    await page.click(ORDER_PAGE.DELIVERY_INFO.CHOSE_CITY_FROM_LIST(1));
    await page.click(ORDER_PAGE.DELIVERY_INFO.SELF_DELIVERY_CHECK);
    await page.waitForSelector(ORDER_PAGE.DELIVERY_INFO.CHOSE_POINT_BTN);
    await page.click(ORDER_PAGE.DELIVERY_INFO.CHOSE_POINT_BTN);
    await page.waitForSelector(ORDER_PAGE.DELIVERY_INFO.MODAL_POPUP);
    await page.click(ORDER_PAGE.DELIVERY_INFO.SAVE_BTN);
    await page.click(ORDER_PAGE.PAYMENT_INFO.BANK_CARD_CHECK);
    
  }, 60000);

  test.only('get data about order from api zener', async()=>{
    let prod_data = [];
    let products = ['3501','3502','3505','3507']
    for (let i = 0; i < products.length; i++) {
      await page.goto(URL.ZENER_ORDER_INFO_PAGE(products[i]));
      await page.waitForSelector('body');
      const order_info =  await page.evaluate(()=>{
        return JSON.parse(document.querySelector('body').innerText);
      })
    
        const name = order_info[products[i]].ITEMS[0].NAME;
        const manufacturer = order_info[products[i]].ITEMS[0].MANUFACTURER;
        prod_data.push({order:products[i], name, manufacturer});
    }
    console.log(prod_data);
  },16000)
});
