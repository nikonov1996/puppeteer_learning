import "@babel/polyfill";
import "puppeteer";
import createBrowser from "../service/createBrowser";
const { ProductPage } = require("../pages/ProductPage");
const { CartPage } = require("../pages/CartPage");
const { OrderPage } = require("../pages/OrderPage");
const { OrderResultPage } = require("../pages/OrderResultPage");
const { tester_user } = require("../service/users");
let log4js = require("log4js");
let scenario = require("../service/order_scenario");
let products = require("../service/products");

//let logger = log4js.getLogger();
let page;
let browser;
beforeAll(async () => {
  browser = await createBrowser({ visible: true }); // parametr visible: true or false, false it's headless mode
  page = await browser.newPage();
});

afterAll(async () => {
  await browser.close();
});

describe.each(scenario)("Order's with scenario: %j", scenar => {
 // logger.info(`Order with scenario ${scenar} is starting`);
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

  test.each(products)(
    `Test for %s product`,
    async product => {
      // logger.info(`Creating order with product: ${product}`);
      await product_page.openProduct(product);
      await product_page.checkProductWasLoaded();
      const condition = await product_page.ifProductListPresent();
      if (condition) {
        // logger.info(`Product list of ${product} is present`);
        let dataBeforeOrder = await product_page.getEachProductsParams();
        let orderNumbers = [];
        const length = await product_page.getListLength();
        for (let i = 1; i <= 1; i++) {
          await product_page.openProduct(product);
          await product_page.checkProductWasLoaded();
          await product_page.selectElemFromProductList(i);
          await product_page.addToCart();
          await product_page.continueToCard();
          await cart_page.goToOrder();
          await order_page.fillOrderForm(tester_user, scenar);
          await order_result_page.waitSuccessPage();
          expect(await order_result_page.checkSuccess()).toBe(true);
          orderNumbers.push(await order_result_page.getOrderNumber());
        }
        let dataAfterOrder = await order_result_page.getInfoByOrderNumbers(
          orderNumbers[0],
          orderNumbers[orderNumbers.length - 1]
        );
        expect(dataAfterOrder).toEqual(dataBeforeOrder);
        await order_result_page.clearArrays(
          dataAfterOrder,
          dataBeforeOrder,
          orderNumbers
        );
      } else {
       // logger.warn(`Product ${product} hasn't list. Order was not created.`);
      }
    },
    300000
  );
});
