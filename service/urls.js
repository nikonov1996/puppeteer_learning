module.exports = {
  LOGIN_PAGE:'https://www.facebook.com/login/',
  REGIST_PAGE:'https://www.facebook.com/r.php',
  ZENER_PRODUCT_PAGE:(productName)=>{
    return  `https://zener.ru/shop/product/${productName}/`;
  },
  ZENER_ORDER_INFO_PAGE: (from, to)=>{
    return `https://zener.ru/rest/orders.php?ID_FROM=${from}&ID_TO=${to}`;
  },
  DEV_PRODUCT_PAGE:(productName)=>{
    return  `http://dev9.redramka.ru/shop/product/${productName}/`;
  },
  DEV_ORDER_INFO_PAGE: (from, to)=>{
    return `http://dev9.redramka.ru/rest/orders.php?ID_FROM=${from}&ID_TO=${to}`;
  }
}