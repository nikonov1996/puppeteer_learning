module.exports = {
  LOGIN_PAGE:'https://www.facebook.com/login/',
  REGIST_PAGE:'https://www.facebook.com/r.php',
  ZENER_PRODUCT_PAGE:(name)=>{
    return  `https://zener.ru/shop/product/${name}/`;
  },
  ZENER_ORDER_INFO_PAGE: (num)=>{
    return `https://zener.ru/rest/orders.php?ID_FROM=${num}&ID_TO=${num}`;
  }
}