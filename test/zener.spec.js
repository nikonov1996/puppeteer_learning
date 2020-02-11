import "@babel/polyfill";
import "puppeteer";
const faker = require("faker");
import createBrowser from "../service/createBrowser";
const URL = require("../service/urls");
const { PRODUCT_PAGE, CART_PAGE, ORDER_PAGE } = require("../service/selectors");
const user = require('../service/users');

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

describe("zener tests", () => {
  test("product 1739 page test", async () => {
    await page.goto(URL.ZENER_PRODUCT_PAGE(1739));  // openProduct(); +
    await page.waitForSelector(PRODUCT_PAGE.PRODUCT_LIST, { timeout: 15000 }); //chooseProductFromList() +
    await page.click(PRODUCT_PAGE.SELECT_ELEMENT_FROM_PRODUCT_LIST(5));
    /* const pages = await browser.pages();
    const popup = pages[pages.length-1];
    await popup.waitForSelector(PRODUCT_PAGE.MODAL_POPUP);
    await popup.click(PRODUCT_PAGE.GO_TO_ORDER_BTN);*/
    await page.click(PRODUCT_PAGE.ADD_TO_CART_BTN); // addToCard() ++
    await page.waitForSelector(PRODUCT_PAGE.MODAL_POPUP); // 
    await page.click(PRODUCT_PAGE.GO_TO_ORDER_BTN);    // continueToCard() ++ // continiueShopping()+

    expect(page.url()).toBe("https://zener.ru/shop/cart/");

    await page.waitForSelector(CART_PAGE.ORDER_BTN, { timeout: 5000 }); //goToOrder()++
    await page.click(CART_PAGE.ORDER_BTN);

    expect(page.url()).toBe("https://zener.ru/shop/makeorder/");

    await page.waitForSelector(ORDER_PAGE.CONTACT_INFO.FULL_NAME_INPUT); // setFullname()++
    await page.click(ORDER_PAGE.CONTACT_INFO.FULL_NAME_INPUT);
    await page.type(ORDER_PAGE.CONTACT_INFO.FULL_NAME_INPUT, user.firstname);

    await page.waitForSelector(ORDER_PAGE.CONTACT_INFO.EMAIL_INPUT);  //setEmail()++
    await page.click(ORDER_PAGE.CONTACT_INFO.EMAIL_INPUT);
    await page.type(ORDER_PAGE.CONTACT_INFO.EMAIL_INPUT, user.email);

    await page.waitForSelector(ORDER_PAGE.CONTACT_INFO.PHONE_INPUT); //setPhone()++
    await page.click(ORDER_PAGE.CONTACT_INFO.PHONE_INPUT);
    await page.type(ORDER_PAGE.CONTACT_INFO.PHONE_INPUT, user.phone);

    /**Select city */
    await page.waitForSelector(ORDER_PAGE.DELIVERY_INFO.CITY_INPUT);   // setCity()++
    await page.click(ORDER_PAGE.DELIVERY_INFO.CITY_INPUT, { clickCount: 3 });
    await page.keyboard.press("Backspace");
    await page.type(ORDER_PAGE.DELIVERY_INFO.CITY_INPUT, "Томск");
    await page.waitForSelector(ORDER_PAGE.DELIVERY_INFO.CITY_LIST);
    await page.click(ORDER_PAGE.DELIVERY_INFO.CHOSE_CITY_FROM_LIST(1));

    /****  Self delivery ****/
    /*  await page.click(ORDER_PAGE.DELIVERY_INFO.SELF_DELIVERY_CHECK);  // chooseSelfDelivery()++

    await page.waitForSelector(ORDER_PAGE.DELIVERY_INFO.CHOSE_POINT_BTN);
    await page.click(ORDER_PAGE.DELIVERY_INFO.CHOSE_POINT_BTN);
    await page.waitForSelector(ORDER_PAGE.DELIVERY_INFO.MODAL_POPUP);
    await page.click(ORDER_PAGE.DELIVERY_INFO.SAVE_BTN);
     */
    /****Card payment ****/
    //  await page.click(ORDER_PAGE.PAYMENT_INFO.BANK_CARD_CHECK); // chooseBankCardPay()++

    /**** Courier delivery ****/
    await page.click(ORDER_PAGE.DELIVERY_INFO.CURIER_CHECK);  // chooseCurierDelivery()++

    await page.waitForSelector(ORDER_PAGE.DELIVERY_INFO.INDEX_INPUT);  // setIndex()+
    await page.click(ORDER_PAGE.DELIVERY_INFO.INDEX_INPUT);
    await page.type(ORDER_PAGE.DELIVERY_INFO.INDEX_INPUT, "123456");

    await page.click(ORDER_PAGE.DELIVERY_INFO.STREET_INPUT);  //setStreet()+
    await page.type(ORDER_PAGE.DELIVERY_INFO.STREET_INPUT, "Test Street");

    await page.click(ORDER_PAGE.DELIVERY_INFO.HOME_NUMBER_INPUT); // setHomeNum()+
    await page.type(ORDER_PAGE.DELIVERY_INFO.HOME_NUMBER_INPUT, "99");

    await page.click(ORDER_PAGE.DELIVERY_INFO.FLAT_NUMBER_INPUT); // setFlatNum()+
    await page.type(ORDER_PAGE.DELIVERY_INFO.FLAT_NUMBER_INPUT, "66");
    /*******/

    /**** Bill payment ****/
    await page.click(ORDER_PAGE.PAYMENT_INFO.BILL_CHECK);  // choseBillPay()++

    await page.waitForSelector(ORDER_PAGE.PAYMENT_INFO.ORGANIZATION_NAME_INPUT);  //setCompany()++
    await page.click(ORDER_PAGE.PAYMENT_INFO.ORGANIZATION_NAME_INPUT);
    await page.type(
      ORDER_PAGE.PAYMENT_INFO.ORGANIZATION_NAME_INPUT,
      "Test company"
    );

    await page.click(ORDER_PAGE.PAYMENT_INFO.INN_INPUT);  // setINN()++
    await page.type(ORDER_PAGE.PAYMENT_INFO.INN_INPUT, "9999999999");
  }, 60000);

  test.only("get data about order from api zener", async () => { //getInfoByOrderNumber()+
    let prod_data = [];
    let products = ["3501", "3502", "3505", "3507"];
    for (let i = 0; i < products.length; i++) {
      await page.goto(URL.ZENER_ORDER_INFO_PAGE(products[i]));
      await page.waitForSelector("body");
      const order_info = await page.evaluate(() => {
        return JSON.parse(document.querySelector("body").innerText);
      });

      const name = order_info[products[i]].ITEMS[0].NAME;
      const manufacturer = order_info[products[i]].ITEMS[0].MANUFACTURER;
      prod_data.push({ order: products[i], name, manufacturer });
    }
    console.log(prod_data);
  }, 16000);

  test.each(["D2D-1000", "RL107-N-2-4-AP", "2197", "1739"])(
    "test3",
    async product => {
      await page.goto(URL.ZENER_PRODUCT_PAGE(product));

      const initCached = await page.evaluate(() => {
        if (document.querySelector(".j-item-progressbar__container").style.display == "none") {
          return true;
        } else {
          return false;
        }
      });

      console.log(initCached);

      if (initCached == false) {
        console.log("no cache");
        await page.waitForSelector(".j-item-progressbar", {
          hidden: true,
          timeout: 30000
        });
        console.log("loading...");
      } else {
        console.log("it cached");

        const noList = await page.evaluate(() => {
          return document.querySelector(".j-noavail.no-avail").style.display;
        });
  
        if (noList == "none") {
          console.log("loaded");
          const productListLength = await page.evaluate(() => {
            return document.querySelectorAll("#j-avail-list > ul > li").length;
          });
  
          console.log(
            `Product '${product}' is cached, with list length[ ${productListLength}]`
          );
        } else {
          console.log("loaded");
          console.log(`Product '${product}' is cached, but without list`);
        }
      }

      
    },
    100000
  );

  test.only.each(["D2D-1000", "RL107-N-2-4-AP", "2197", "1739"])('test1',async(product)=>{
    await page.goto(URL.ZENER_PRODUCT_PAGE(product));

  },60000)
});
