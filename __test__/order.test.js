import "@babel/polyfill";
import "puppeteer";
import createBrowser from "../service/createBrowser";
import { ProductPage } from "../pages/ProductPage";
import { CartPage } from "../pages/CartPage";
import { OrderPage } from "../pages/OrderPage";
import { OrderResultPage } from "../pages/OrderResultPage";
import { tester_user } from "../service/users";
let log4js = require("log4js");
import scenario from "../service/order_scenario";
import products from "../service/products";

let logger = log4js.getLogger();
logger.level = "ALL";

let page;
let browser;
beforeAll(async () => {
  browser = await createBrowser({ visible: true });
  
});

describe.each(scenario)("Order's with scenario: %j", scenar => {
  let product_page;
  let cart_page;
  let order_page;
  let order_result_page;

  beforeEach(async () => {
    page = await browser.newPage();
    product_page = new ProductPage(page);
    cart_page = new CartPage(page);
    order_page = new OrderPage(page);
    order_result_page = new OrderResultPage(page);
  });

  test.each(products)(
    `Test for %s product`,
    async product => {
      await product_page.openProduct(product);
      await product_page.checkProductWasLoaded();
      const condition = await product_page.ifProductListPresent();
      if (condition) {
        logger.info(`Product list of ${product} is present`);
        let dataBeforeOrder = await product_page.getEachProductsParams();
        let orderNumbers = [];
        const length = await product_page.getListLength();
        for (let i = 1; i <= length; i++) {
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
        logger.warn(`Product ${product} hasn't list. Order was not created.`);
      }
    },
    3000000
  );

  afterAll(async () => {
    await page.close();
  });

});

afterAll(async () => {
  await browser.close();
});