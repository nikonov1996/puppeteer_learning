module.exports = {
  REGIST_FORM : {
    FIRSTNAME_INPUT: 'input[name=firstname]',
    LASTNAME_INPUT:'input[name=lastname]',
    EMAIL_INPUT: 'input[name=reg_email__]',
    EMAIL_CONFIRM: 'input[name=reg_email_confirmation__]',
    PASSWORD_INPUT:'input[name=reg_passwd__]',
    YEAR_SELECT:'select#year',
    DAY_NUM_SELECT:'',
    MONTH_SELECT:'',
    SEX_RADIO:'input[name=sex]',
    SUBMIT_BUTTON:'div._1lch button[name=websubmit]'
  },

  LOGIN_FORM : {
    EMAIL_INPUT:'input#email',
    PASSWORD_INPUT:'input#pass',
    LOGIN_BUTTON:'button#loginbutton',
    REGIST_PAGE_REDIRECT_LINK:'div.uiContextualLayer > div > div > a'
  },

  PRODUCT_PAGE : {
    SELECT_ELEMENT_FROM_PRODUCT_LIST: (num)=>{
      return `#j-avail-list li:nth-child(${num}) .checkbox`;
    },

    ADD_TO_CART_BTN : '.btn.add_to_cart.j-add_to_cart',
    PRODUCT_LIST : '#j-avail-list',
    MODAL_POPUP : '.mfp-content',
    GO_TO_ORDER_BTN : '.mfp-content .btns a.btn',
    CONTINUE_SHOPPING_BTN : '.mfp-content .btns .close-modal'
  },

  CART_PAGE : {
    ORDER_BTN : '.total button'
  }


  

}