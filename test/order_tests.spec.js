import "@babel/polyfill";
import "puppeteer";
import createBrowser from "../service/createBrowser";
const { ProductPage } = require("../pages/ProductPage");
const { CartPage } = require("../pages/CartPage");
const { OrderPage } = require("../pages/OrderPage");
const {OrderResultPage} = require('../pages/OrderResultPage');
const { tester_user } = require("../service/users");
let scenario = require("../service/order_scenario");
let products = require("../service/products");

let page;
let browser;
beforeAll(async () => {
  browser = await createBrowser(true); // parametr visible: true or false, false it's headless mode  
  page = await browser.newPage();
});

afterAll(async () => {
  await browser.close();
});

describe.each(products)(`Tests for %s product`, product => {
  let product_page;
  let cart_page;
  let order_page;
  let order_result_page;
  
  beforeEach(async () => {
    product_page = new ProductPage(page);
    cart_page = new CartPage(page);
    order_page = new OrderPage(page);
    order_result_page = new OrderResultPage(page);
  });

  test.each(scenario)(
    "Order's info: %j",
    async scenar => {
      await product_page.openProduct(product);
      await product_page.checkProductWasLoaded();
      

      //  let arr = await product_page.getEachProductsParams();
      //  console.log(arr);
      //  await page.waitForSelector(".j-item-progressbar", {
      //   hidden: true,
      //   timeout: 30000
      // });
      
      // await product_page.selectElemFromProductList(1);
      // await product_page.addToCart();
      // await product_page.continueToCard();
      // await cart_page.goToOrder();
      // await order_page.fillOrderForm(tester_user, scenar);
      // expect(true).toBe(true);

      // await order_result_page.goto();
      // expect(await order_result_page.checkSuccess()).toBe(true);
      // let num = await order_result_page.getOrderNumber();
      
     // let arrtest = [ { name: 'D2D-1000', manufacturer: 'Omron' } ]; // массив для теста сравнения
       let info = await order_result_page.getInfoByOrderNumbers(3501, 3501);
       expect(info).toEqual(arrtest);
      

    },
    100000 );
});
