"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Cart =
/*#__PURE__*/
function () {
  function Cart(source) {
    var container = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '.Busketonjs';
    var containerMini = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '.Busket';

    _classCallCheck(this, Cart);

    this.source = source;
    this.container = container;
    this.containerMini = containerMini;
    this.countGoods = 0; // Общее кол-во товаров в корзине

    this.amount = 0; // Общая стоимость товаров в корзине

    this.cartItems = []; //Массив для хранения товаров

    this.flagTotal = false; //Признак добавления итогов в маленькой корзине (false - добавлять)

    this._init(this.source);
  }

  _createClass(Cart, [{
    key: "_render",
    value: function _render() {
      var $ProdectionDetailsHeader = $('<div/>', {
        class: 'ProdectionDetailsHeader'
      });
      var $span1 = $('<span/>', {
        class: 'PDHeader',
        text: 'Product Details'
      });
      var $span2 = $('<span/>', {
        class: 'PDHeader',
        text: 'unite Price'
      });
      var $span3 = $('<span/>', {
        class: 'PDHeader',
        text: 'Quantity'
      });
      var $span4 = $('<span/>', {
        class: 'PDHeader',
        text: 'shipping'
      });
      var $span5 = $('<span/>', {
        class: 'PDHeader',
        text: 'Subtotal'
      });
      var $span6 = $('<span/>', {
        class: 'PDHeader',
        text: 'ACTION'
      });
      $ProdectionDetailsHeader.appendTo($(this.container));
      $span1.appendTo($($ProdectionDetailsHeader));
      $span2.appendTo($($ProdectionDetailsHeader));
      $span3.appendTo($($ProdectionDetailsHeader));
      $span4.appendTo($($ProdectionDetailsHeader));
      $span5.appendTo($($ProdectionDetailsHeader));
      $span6.appendTo($($ProdectionDetailsHeader));
    }
  }, {
    key: "_renderMini",
    value: function _renderMini() {
      var $container = $('<div/>', {
        class: 'mega-flex-myaccount-busket total'
      });
      var $containerTotalPrice = $('<div/>', {
        class: 'Totalprice'
      });
      var $containerForm = $('<form/>', {
        class: 'Totalform',
        action: 'checkout.html'
      });
      $container.appendTo($(this.containerMini));
      $containerTotalPrice.appendTo($($container));
      $containerTotalPrice.append($("<span class=\"Total\">TOTAL</span>"));
      $containerTotalPrice.append($("<span class=\"Price\" id=\"basket-price\">$".concat(this.amount, "</span>")));
      $containerForm.appendTo($($container));
      $containerForm.append($("<button class=\"ButtonCheckout\">Checkout</button>"));
      $container.append($("<button class=\"ButtonGotocart\">Go&nbsp;to&nbsp;cart</button>"));
      $('#basket-count').text(this.countGoods);
    } //функция очистки итогов в маленькой корзине (чтобы итоги были под товарами, когда их добавляем в корзину)

  }, {
    key: "_clearTotalMini",
    value: function _clearTotalMini() {
      $('.Totalprice').detach();
      $('.Totalform').detach();
      $('.ButtonCheckout').detach();
      $('.ButtonGotocart').detach();
      $('.total').detach();
    }
  }, {
    key: "_init",
    value: function _init(source) {
      var _this = this;

      this._render();

      if (!localStorage.getItem('mycart')) {
        fetch(source).then(function (result) {
          return result.json();
        }).then(function (data) {
          var _iteratorNormalCompletion = true;
          var _didIteratorError = false;
          var _iteratorError = undefined;

          try {
            for (var _iterator = data.contents[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              var product = _step.value;

              _this.cartItems.push(product);

              _this._renderItem(product);

              _this._renderItemMini(product);
            }
          } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion && _iterator.return != null) {
                _iterator.return();
              }
            } finally {
              if (_didIteratorError) {
                throw _iteratorError;
              }
            }
          }

          _this.countGoods = data.countGoods;
          _this.amount = data.amount;

          if (!_this.flagTotal) {
            _this._renderMini();
          }

          _this._renderSum();

          _this._renderSumMini();

          localStorage.setItem('mycart', JSON.stringify(_this.cartItems));
          localStorage.setItem('amount', JSON.stringify(_this.amount));
          localStorage.setItem('countGoods', JSON.stringify(_this.countGoods));
        });
      } else {
        this.cartItems = JSON.parse(localStorage.getItem('mycart'));
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
          for (var _iterator2 = this.cartItems[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var product = _step2.value;

            this._renderItem(product);

            this._renderItemMini(product);
          }
        } catch (err) {
          _didIteratorError2 = true;
          _iteratorError2 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
              _iterator2.return();
            }
          } finally {
            if (_didIteratorError2) {
              throw _iteratorError2;
            }
          }
        }

        this.amount = JSON.parse(localStorage.getItem('amount'));
        this.countGoods = JSON.parse(localStorage.getItem('countGoods'));

        if (!this.flagTotal) {
          this._renderMini();
        }

        this._renderSum();
      }
    }
  }, {
    key: "_renderItem",
    value: function _renderItem(product) {
      var $container = $('<div/>', {
        class: 'ProductinBusket',
        'data-product': product.id_product
      });
      var $containerUnit = $('<div/>', {
        class: 'ProductUnitinBusket'
      });
      var $containerNames = $('<div/>', {
        class: 'MyAccountBusketNames'
      });
      var $containerColor = $('<div/>', {
        class: 'Color'
      });
      var $containerSize = $('<div/>', {
        class: 'Size'
      });
      var $containerClose = $('<div/>', {
        class: 'ProductUnitClose'
      });
      $container.appendTo($(this.container));
      $containerUnit.appendTo($($container));
      $containerUnit.append($("<img class=\"MyaccountImg\" src=".concat(product.src, " alt=").concat(product.alt, ">")));
      $containerNames.appendTo($($containerUnit));
      $containerNames.append($("<a class=\"BusketName\" href=\"singlepage.html\">".concat(product.product_name, "</a>")));
      $containerColor.appendTo($($containerNames));
      $containerColor.append($("<span class=\"colorHD\">Color:</span>"));
      $containerColor.append($("<span class=\"colortxt\">".concat(product.color, "</span>")));
      $containerSize.appendTo($($containerNames));
      $containerSize.append($("<span class=\"SizeHD\">Size:</span>"));
      $containerSize.append($("<span class=\"Sizetxt\">".concat(product.size, "</span>")));
      $container.append($("<span class=\"ProductUnitPrice\">$".concat(product.price, "</span>")));
      $container.append($("<input class=\"ProductUnitKol\" type=\"number\" name=\"number\" value=\"".concat(product.quantity, "\" data-product=\"").concat(product.id_product, "\">")));
      $container.append($("<span class=\"ProductSheepPrice\">FREE</span>"));
      $container.append($("<span class=\"ProductUnitST\">$".concat(+product.price * +product.quantity, "</span>")));
      $containerClose.appendTo($($container));
      $containerClose.append($("<a href=\"#\"><img class=\"CloseImg\" src=\"img/closeButton.png\" alt=\"stars\" data-product=\"".concat(product.id_product, "\"></a>")));
    }
  }, {
    key: "_renderItemMini",
    value: function _renderItemMini(product) {
      var $container = $('<div/>', {
        class: 'mega-flex-myaccount-busket',
        'data-product': product.id_product
      });
      var $containerArticle = $('<div/>', {
        class: 'MyaccountBusket',
        'data-product': product.id_product
      });
      var $containerNames = $('<div/>', {
        class: 'MyAccountBusketNames'
      });
      var $containerNumberPrice = $('<div/>', {
        class: 'Number_Price'
      });
      var $containerTotalPrice = $('<div/>', {
        class: 'Totalprice'
      });
      $container.appendTo($(this.containerMini));
      $containerArticle.appendTo($($container));
      $containerArticle.append($("<img class=\"MyaccountImg\" src=".concat(product.src, " alt=").concat(product.alt, ">")));
      $containerNames.appendTo($($containerArticle));
      $containerNames.append($("<span class=\"BusketName\">".concat(product.product_name, "</span>")));
      $containerNames.append($("<img class=\"StarsImg\" src=\"img/stars-5.png\" alt=\"stars\">"));
      $containerNumberPrice.appendTo($($containerNames));
      $containerNumberPrice.append($("<span class=\"number\">".concat(product.quantity, "&nbsp;x </span>")));
      $containerNumberPrice.append($("<span class=\"price\">$".concat(product.price, "</span>")));
      $containerArticle.append($("<img class=\"CloseImg\" src=\"img/closeButton.png\" alt=\"stars\" data-product=\"".concat(product.id_product, "\">")));
      $('#basket-count').text(this.countGoods);
      /*
              <div class="mega-flex-myaccount-busket">
                  <article class="MyaccountBusket">
                      <img class="MyaccountImg" src="img/Layer_43.jpg" alt="busket">
                      <div class="MyAccountBusketNames">
                          <span class="BusketName">Rebox Zane</span>
                          <img class="StarsImg" src="img/stars-5.png" alt="stars">
                          <div class="Number_Price">
                              <span class="number">1&nbsp;x</span>
                              <span class="number">$250</span>
                          </div>
                      </div>
                      <img class="CloseImg" src="img/closeButton.png" alt="stars">
                  </article>
                  <div class="Totalprice">
                      <span class="Total">TOTAL</span>
                      <span class="Price" id="basket-price">$550.00</span>
                  </div>
                  <form action="checkout.html">
                      <button class="ButtonCheckout">Checkout</button>
                  </form>
                  <button class="ButtonGotocart">Go&nbsp;to&nbsp;cart</button>
              </div>
       */
    }
  }, {
    key: "_renderSum",
    value: function _renderSum() {
      $('.SubtotalPrice').text("$".concat(this.amount));
      $('.GrandtotalPrice').text("$".concat(this.amount));
    }
  }, {
    key: "_renderSumMini",
    value: function _renderSumMini() {
      $('#basket-price').text("$".concat(this.amount));
    }
  }, {
    key: "_updateCart",
    value: function _updateCart(product) {
      var $containerUpdate = $("[data-product=".concat(product.id_product, "]"));
      $containerUpdate.find('.ProductUnitKol').val(product.quantity);
      $containerUpdate.find('.ProductUnitST').text("$".concat(+product.price * +product.quantity));
    }
  }, {
    key: "_updateCartmini",
    value: function _updateCartmini(product) {
      var $containerUpdate = $("[data-product=".concat(product.id_product, "]"));
      $containerUpdate.find('.number').text("".concat(product.quantity, " x "));
      $('#basket-count').text(this.countGoods);
    }
  }, {
    key: "addProduct",
    value: function addProduct(element) {
      var productId = +$(element).data('id');
      var find = this.cartItems.find(function (product) {
        return product.id_product === productId;
      });

      if (find) {
        //если уже есть такой товар в корзине
        find.quantity++;
        this.countGoods++;
        this.amount += find.price;

        this._updateCart(find);

        this._updateCartmini(find);
      } else {
        //если нет такого товара в корзине
        var product = {
          id_product: productId,
          product_name: $(element).data('name'),
          price: +$(element).data('price'),
          src: $(element).data('src'),
          alt: $(element).data('alt'),
          color: "Red",
          "size": "XXL",
          quantity: 1
        };
        this.cartItems.push(product);
        console.log(this.cartItems);
        this.amount += product.price;
        this.countGoods += product.quantity;

        this._renderItemMini(product);

        this._clearTotalMini();

        this.flagTotal = true;

        this._renderMini();
      }

      localStorage.setItem('mycart', JSON.stringify(this.cartItems));
      localStorage.setItem('amount', JSON.stringify(this.amount));
      localStorage.setItem('countGoods', JSON.stringify(this.countGoods));

      this._renderSumMini();
    }
  }, {
    key: "remove",
    value: function remove(idProduct) {
      var productId = +idProduct;
      var find = this.cartItems.find(function (product) {
        return product.id_product === productId;
      });

      if (find.quantity > 1) {
        find.quantity--;
        this.countGoods--;

        this._updateCartmini(find);

        this._updateCart(find);
      } else {
        this.cartItems.splice($.inArray(find, this.cartItems), 1); //splice(this.cartItems.IndexOf(find),1)

        $("[data-product=".concat(productId, "]")).remove();
        this.countGoods--;
        $('#basket-count').text(this.countGoods);
      }

      this.amount -= find.price;
      localStorage.setItem('mycart', JSON.stringify(this.cartItems));
      localStorage.setItem('amount', JSON.stringify(this.amount));
      localStorage.setItem('countGoods', JSON.stringify(this.countGoods));

      this._renderSumMini();

      this._renderSum();
    }
  }, {
    key: "change",
    value: function change(idProduct) {
      var productId = +idProduct;
      var find = this.cartItems.find(function (product) {
        return product.id_product === productId;
      });
      var $containerUpdate = $("[data-product=".concat(find.id_product, "]"));
      var $currentNumber = +$containerUpdate.find('.ProductUnitKol').val(); //текущее количество товара

      if ($currentNumber < find.quantity) {
        //если текущее количество стало меньше предыдущего
        if (find.quantity > 1) {
          find.quantity--;
          this.countGoods--;

          this._updateCartmini(find);

          this._updateCart(find);
        } else {
          this.cartItems.splice($.inArray(find, this.cartItems), 1); //splice(this.cartItems.IndexOf(find),1)

          $("[data-product=".concat(productId, "]")).remove();
          this.countGoods--;
          $('#basket-count').text(this.countGoods);
        }

        this.amount -= find.price;
      } else {
        //если текущее количество стало больше предыдущего
        find.quantity++;
        this.countGoods++;
        this.amount += find.price;

        this._updateCartmini(find);

        $containerUpdate.find('.ProductUnitST').text("$".concat(+find.price * $currentNumber));
      }

      localStorage.setItem('mycart', JSON.stringify(this.cartItems));
      localStorage.setItem('amount', JSON.stringify(this.amount));
      localStorage.setItem('countGoods', JSON.stringify(this.countGoods));

      this._renderSumMini();

      this._renderSum();
    }
  }]);

  return Cart;
}();