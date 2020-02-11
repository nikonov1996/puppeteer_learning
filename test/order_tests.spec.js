import "@babel/polyfill";
import "puppeteer";
import createBrowser from "../service/createBrowser";
const { ProductPage } = require("../pages/ProductPage");
const { CartPage } = require("../pages/CartPage");
const { OrderPage } = require("../pages/OrderPage");
//const {OrderResultPage} = require('../pages/OrderResultPage');
const { tester_user } = require("../service/users");
let scenario = require("../service/order_scenario");
let products = require("../service/products");

let page;
let browser;
beforeAll(async () => {
  browser = await createBrowser();
  page = await browser.newPage();
});

afterAll(async () => {
  await browser.close();
});

describe.each(products)(`Tests for %s product`, product => {
  let product_page;
  let cart_page;
  let order_page;
  // let order_result_page;
  
  beforeEach(async () => {
    product_page = new ProductPage(page);
    cart_page = new CartPage(page);
    order_page = new OrderPage(page);
    // order_result_page = new OrderResultPage(page);
  });

  test.each(scenario)(
    "Orders with payment and delivery info: %j",
    async scenar => {
      await product_page.openProduct(product);
      await product_page.selectElemFromProductList(1);
      await product_page.addToCart();
      await product_page.continueToCard();
      await cart_page.goToOrder();
      await order_page.fillOrderForm(tester_user, scenar);
      expect(true).toBe(true);
    },
    100000
  );
});
