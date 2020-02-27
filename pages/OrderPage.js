import "@babel/polyfill";
import "@babel/preset-env";
const { ORDER_PAGE } = require("../service/selectors");
const { BasePage } = require("./BasePage");

class OrderPage extends BasePage {
  /*** Userinfo block ***/
  async setFullname(fullname) {
    await this.page.waitForSelector(ORDER_PAGE.CONTACT_INFO.FULL_NAME_INPUT);
    await this.page.focus(ORDER_PAGE.CONTACT_INFO.FULL_NAME_INPUT);
    await this.page.type(ORDER_PAGE.CONTACT_INFO.FULL_NAME_INPUT, fullname);
  }

  async setEmail(email) {
    await this.page.click(ORDER_PAGE.CONTACT_INFO.EMAIL_INPUT, {
      clickCount: 3
    });
    await this.page.keyboard.press("Backspace");
    await this.page.waitForSelector(ORDER_PAGE.CONTACT_INFO.EMAIL_INPUT);
    await this.page.focus(ORDER_PAGE.CONTACT_INFO.EMAIL_INPUT);
    await this.page.type(ORDER_PAGE.CONTACT_INFO.EMAIL_INPUT, email);
  }

  async setPhone(phone) {
    await this.page.click(ORDER_PAGE.CONTACT_INFO.PHONE_INPUT, {
      clickCount: 3
    });
    await this.page.keyboard.press("Backspace");
    await this.page.waitForSelector(ORDER_PAGE.CONTACT_INFO.PHONE_INPUT);
    await this.page.focus(ORDER_PAGE.CONTACT_INFO.PHONE_INPUT);
    await this.page.type(ORDER_PAGE.CONTACT_INFO.PHONE_INPUT, phone);
  }

  /*** Delivery block ***/

  async setCity(city) {
    //  await this.page.waitForSelector(ORDER_PAGE.DELIVERY_INFO.CITY_INPUT);
    await this.page.click(ORDER_PAGE.DELIVERY_INFO.CITY_INPUT, {
      clickCount: 3
    });
    await this.page.keyboard.press("Backspace");
    await this.page.type(ORDER_PAGE.DELIVERY_INFO.CITY_INPUT, city);
    await this.page.waitForSelector(ORDER_PAGE.DELIVERY_INFO.CITY_LIST);
    await this.page.keyboard.press("ArrowDown");
    await this.page.keyboard.press("Enter");
  }

  /** Self delivery **/

  async chooseSelfDelivery() {
    await this.page.click(ORDER_PAGE.DELIVERY_INFO.SELF_DELIVERY_CHECK);
    await this.page.waitForSelector(ORDER_PAGE.DELIVERY_INFO.CHOSE_POINT_BTN);
    await this.page.click(ORDER_PAGE.DELIVERY_INFO.CHOSE_POINT_BTN);
    await this.page.waitForSelector(ORDER_PAGE.DELIVERY_INFO.MODAL_POPUP);
    await this.page.click(ORDER_PAGE.DELIVERY_INFO.SAVE_BTN);
  }

  /** Courier delivery **/
  async chooseCurierDelivery() {
    await this.page.focus(ORDER_PAGE.DELIVERY_INFO.CURIER_CHECK);
    await this.page.click(ORDER_PAGE.DELIVERY_INFO.CURIER_CHECK);
    await this.page.waitForSelector(ORDER_PAGE.DELIVERY_INFO.INDEX_INPUT, {
      timeout: 2000
    });
  }

  async setIndex(index) {
    await this.page.focus(ORDER_PAGE.DELIVERY_INFO.INDEX_INPUT);
    await this.page.waitForSelector(ORDER_PAGE.DELIVERY_INFO.INDEX_INPUT, {
      timeout: 5000
    });
    await this.page.evaluate(() => {
      document.querySelector(
        "div.check-delivery-courier .inputs .contact-information__el--index div.input input"
      ).value = "";
    });
    await this.page.focus(ORDER_PAGE.DELIVERY_INFO.INDEX_INPUT);
    await this.page.type(ORDER_PAGE.DELIVERY_INFO.INDEX_INPUT, index);
  }

  async setStreet(street) {
    await this.page.focus(ORDER_PAGE.DELIVERY_INFO.STREET_INPUT);
    await this.page.type(ORDER_PAGE.DELIVERY_INFO.STREET_INPUT, street);
  }

  async setHomeNum(homeNum) {
    await this.page.focus(ORDER_PAGE.DELIVERY_INFO.HOME_NUMBER_INPUT);
    await this.page.type(ORDER_PAGE.DELIVERY_INFO.HOME_NUMBER_INPUT, homeNum);
  }

  async setFlatNum(flatNum) {
    await this.page.focus(ORDER_PAGE.DELIVERY_INFO.FLAT_NUMBER_INPUT);
    await this.page.type(ORDER_PAGE.DELIVERY_INFO.FLAT_NUMBER_INPUT, flatNum);
  }

  /*** Payment block ***/

  /** Bank card payment */
  async chooseBankCardPay() {
    await this.page.click(ORDER_PAGE.PAYMENT_INFO.BANK_CARD_CHECK);
  }

  /** Bill payment*/

  async chooseBillPay() {
    await this.page.click(ORDER_PAGE.PAYMENT_INFO.BILL_CHECK);
  }
  async setCompany(company) {
    await this.page.waitForSelector(
      ORDER_PAGE.PAYMENT_INFO.ORGANIZATION_NAME_INPUT
    );
    await this.page.focus(ORDER_PAGE.PAYMENT_INFO.ORGANIZATION_NAME_INPUT);
    await this.page.type(
      ORDER_PAGE.PAYMENT_INFO.ORGANIZATION_NAME_INPUT,
      company
    );
  }
  async setINN(inn) {
    // await this.page.waitForSelector(ORDER_PAGE.PAYMENT_INFO.INN_INPUT);
    await this.page.focus(ORDER_PAGE.PAYMENT_INFO.INN_INPUT);
    await this.page.type(ORDER_PAGE.PAYMENT_INFO.INN_INPUT, inn);
  }

  async setComment(comment) {
    await this.page.type(ORDER_PAGE.COMMENTS_INPUT, comment);
  }

  async submit() {
    // await this.page.waitFor(1300);
    await this.page.click(ORDER_PAGE.SUBMIT_BUTTON);
  }

  async fillOrderForm(user, scenario) {
    await this.setFullname(user.fullname);
    await this.setEmail(user.email);
    await this.setPhone(user.phone);
    await this.setCity(user.city);

    if (scenario.delivery == "courier") {
      await this.chooseCurierDelivery();
      await this.setIndex(user.index);
      await this.setStreet(user.street);
      await this.setHomeNum(user.home);
      await this.setFlatNum(user.flat);
    } else {
      await this.chooseSelfDelivery();
    }

    if (scenario.payment == "bill") {
      await this.chooseBillPay();
      await this.setCompany(user.company);
      await this.setINN(user.inn);
    } else {
      await this.chooseBankCardPay();
    }
    await this.setComment("THIS IS TEST ORDER!!! SORRY!");
    await this.submit();
  }

  async isOrderCorrect() {
    return await this.page.evaluate(() => {
      return !document
        .querySelector("p.j-total-errors")
        .textContent.includes("Проверьте правильность заполнения полей");
    });
  }

  async waitSuccessPage() {
    await this.page.waitForSelector(".basket h2", {
      timeout: 120000
    });
  }
}
module.exports = { OrderPage };
