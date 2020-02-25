module.exports = {
  PRODUCT_PAGE: {
    SELECT_ELEMENT_FROM_PRODUCT_LIST: num => {
      return `#j-avail-list li:nth-child(${num}) .checkbox`;
    },

    ADD_TO_CART_BTN: ".btn.add_to_cart.j-add_to_cart",
    PRODUCT_LIST: "#j-avail-list > ul > li",
    MODAL_POPUP: ".mfp-content",
    GO_TO_ORDER_BTN: ".mfp-content .btns a.btn",
    CONTINUE_SHOPPING_BTN: ".mfp-content .btns .close-modal"
  },

  CART_PAGE: {
    ORDER_BTN: ".total button"
  },

  ORDER_PAGE: {
    CONTACT_INFO: {
      FULL_NAME_INPUT: "input[name=full_name]",
      EMAIL_INPUT: "input[name=email]",
      PHONE_INPUT: ".ind input[name=phone]"
    },
    DELIVERY_INFO: {
      CITY_INPUT: "#order_city",
      CITY_LIST: "#ui-id-1",
      CHOSE_CITY_FROM_LIST: num => {
        return `#ui-id-1 li:nth-child(${num})`;
      },
      CURIER_CHECK: ".check-delivery-courier .checkbox",
      INDEX_INPUT: "div.contact-information__el--index input",
      STREET_INPUT: "input[name=street]",
      HOME_NUMBER_INPUT: "input[name=house]",
      FLAT_NUMBER_INPUT: "input[name=room]",
      SELF_DELIVERY_CHECK: ".check-delivery-self .checkbox",
      CHOSE_POINT_BTN: ".hold-name a", //??
      CHANGE_POINT_BTN: ".hold-name a",
      MODAL_POPUP: "#modal-map-select",
      SAVE_BTN: "#modal-map-select .btns div:nth-child(2)",
      CANCEL_BTN: "#modal-map-select .btns div:nth-child(1)"
    },
    PAYMENT_INFO: {
      BANK_CARD_CHECK: ".sq-checks .check-payment-card .checkbox",
      BILL_CHECK: ".sq-checks .check-payment-jur .checkbox",
      ORGANIZATION_NAME_INPUT: "input[name=orgname]",
      INN_INPUT: "input[name=inn]"
    },
    COMMENTS_INPUT: ".input.placeholder textarea",
    SUBMIT_BUTTON: '.total button'
  }
};
