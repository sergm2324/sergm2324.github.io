"use strict";

$(document).ready(function () {
  //Корзина
  var cart = new Cart('getCart.json'); //Добавление товара в маленькую корзину

  $('.ProductBlocks').on('click', '.parent-add', function (e) {
    cart.addProduct(e.target);
  }); //Удаление товара в маленькой корзине

  $('.HeaderRight').on('click', '.CloseImg', function (e) {
    e.preventDefault();
    cart.remove(e.target.dataset.product);
  });
  var $busketonJs = $('.Busketonjs'); //Удаление товара в большой корзине на странице shoppingcart

  $busketonJs.on('click', '.CloseImg', function (e) {
    e.preventDefault();
    cart.remove(e.target.dataset.product);
  }); //Изменение количества товара в большой корзине на странице shoppingcart

  $busketonJs.on('input', function (e) {
    cart.change(e.target.dataset.product);
  }); //Feedback

  var feed = new Feedback('feedback.json'); // $('#cart').on('click', '.delBtn', e=>{})
});