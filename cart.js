class Cart {
    constructor(source, container = '.Busketonjs', containerMini = '.Busket') {
        this.source = source;
        this.container = container;
        this.containerMini = containerMini;
        this.countGoods = 0; // Общее кол-во товаров в корзине
        this.amount = 0; // Общая стоимость товаров в корзине
        this.cartItems = []; //Массив для хранения товаров
        this.flagTotal = false; //Признак добавления итогов в маленькой корзине (false - добавлять)
        this._init(this.source);
    }

    _render() {
        let $ProdectionDetailsHeader = $('<div/>', {
            class: 'ProdectionDetailsHeader'
        });

        let $span1 = $('<span/>', {
            class: 'PDHeader',
            text: 'Product Details'
        });

        let $span2 = $('<span/>', {
            class: 'PDHeader',
            text: 'unite Price'
        });

        let $span3 = $('<span/>', {
            class: 'PDHeader',
            text: 'Quantity'
        });

        let $span4 = $('<span/>', {
            class: 'PDHeader',
            text: 'shipping'
        });

        let $span5 = $('<span/>', {
            class: 'PDHeader',
            text: 'Subtotal'
        });

        let $span6 = $('<span/>', {
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

    _renderMini() {
        let $container = $('<div/>', {
            class: 'mega-flex-myaccount-busket total',
        });

        let $containerTotalPrice = $('<div/>', {
            class: 'Totalprice',
        });
        let $containerForm = $('<form/>', {
            class: 'Totalform',
            action: 'checkout.html',
        });

        $container.appendTo($(this.containerMini));
        $containerTotalPrice.appendTo($($container));
        $containerTotalPrice.append($(`<span class="Total">TOTAL</span>`));
        $containerTotalPrice.append($(`<span class="Price" id="basket-price">$${this.amount}</span>`));
        $containerForm.appendTo($($container));
        $containerForm.append($(`<button class="ButtonCheckout">Checkout</button>`));
        $container.append($(`<button class="ButtonGotocart">Go&nbsp;to&nbsp;cart</button>`));
        $('#basket-count').text(this.countGoods);
    }

    //функция очистки итогов в маленькой корзине (чтобы итоги были под товарами, когда их добавляем в корзину)
    _clearTotalMini() {
        $('.Totalprice').detach();
        $('.Totalform').detach();
        $('.ButtonCheckout').detach();
        $('.ButtonGotocart').detach();
        $('.total').detach();
    }

    _init(source) {
        this._render();
        fetch(source)
            .then(result => result.json())
            .then(data => {
                for (let product of data.contents) {
                    this.cartItems.push(product);
                    this._renderItem(product);
                    this._renderItemMini(product);
                }
                this.countGoods = data.countGoods;
                this.amount = data.amount;
                if (!this.flagTotal) {
                    this._renderMini();
                }
                this._renderSum();
                this._renderSumMini();
            });
    }

    _renderItem(product) {
        let $container = $('<div/>', {
            class: 'ProductinBusket',
            'data-product': product.id_product
        });
        let $containerUnit = $('<div/>', {
            class: 'ProductUnitinBusket',
        });
        let $containerNames = $('<div/>', {
            class: 'MyAccountBusketNames',
        });
        let $containerColor = $('<div/>', {
            class: 'Color',
        });
        let $containerSize = $('<div/>', {
            class: 'Size',
        });
        let $containerClose = $('<div/>', {
            class: 'ProductUnitClose',
        });

        $container.appendTo($(this.container));
        $containerUnit.appendTo($($container));
        $containerUnit.append($(`<img class="MyaccountImg" src=${product.src} alt=${product.alt}>`));
        $containerNames.appendTo($($containerUnit));
        $containerNames.append($(`<a class="BusketName" href="singlepage.html">${product.product_name}</a>`));
        $containerColor.appendTo($($containerNames));
        $containerColor.append($(`<span class="colorHD">Color:</span>`));
        $containerColor.append($(`<span class="colortxt">${product.color}</span>`));
        $containerSize.appendTo($($containerNames));
        $containerSize.append($(`<span class="SizeHD">Size:</span>`));
        $containerSize.append($(`<span class="Sizetxt">${product.size}</span>`));
        $container.append($(`<span class="ProductUnitPrice">$${product.price}</span>`));
        $container.append($(`<input class="ProductUnitKol" type="number" name="number" value="${product.quantity}" data-product="${product.id_product}">`));
        $container.append($(`<span class="ProductSheepPrice">FREE</span>`));
        $container.append($(`<span class="ProductUnitST">$${+product.price * +product.quantity}</span>`));
        $containerClose.appendTo($($container));
        $containerClose.append($(`<a href="#"><img class="CloseImg" src="img/closeButton.png" alt="stars" data-product="${product.id_product}"></a>`));
    }

    _renderItemMini(product) {
        let $container = $('<div/>', {
            class: 'mega-flex-myaccount-busket',
            'data-product': product.id_product
        });
        let $containerArticle = $('<div/>', {
            class: 'MyaccountBusket',
            'data-product': product.id_product
        });
        let $containerNames = $('<div/>', {
            class: 'MyAccountBusketNames',
        });
        let $containerNumberPrice = $('<div/>', {
            class: 'Number_Price',
        });
        let $containerTotalPrice = $('<div/>', {
            class: 'Totalprice',
        });


        $container.appendTo($(this.containerMini));
        $containerArticle.appendTo($($container));
        $containerArticle.append($(`<img class="MyaccountImg" src=${product.src} alt=${product.alt}>`));
        $containerNames.appendTo($($containerArticle));
        $containerNames.append($(`<span class="BusketName">${product.product_name}</span>`));
        $containerNames.append($(`<img class="StarsImg" src="img/stars-5.png" alt="stars">`));
        $containerNumberPrice.appendTo($($containerNames));
        $containerNumberPrice.append($(`<span class="number">${product.quantity}&nbsp;x </span>`));
        $containerNumberPrice.append($(`<span class="price">$${product.price}</span>`));
        $containerArticle.append($(`<img class="CloseImg" src="img/closeButton.png" alt="stars" data-product="${product.id_product}">`));
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

    _renderSum() {
        $('.SubtotalPrice').text(`$${this.amount}`);
        $('.GrandtotalPrice').text(`$${this.amount}`);
    }

    _renderSumMini() {
        $('#basket-price').text(`$${this.amount}`);

    }

    _updateCart(product) {
        let $containerUpdate = $(`[data-product=${product.id_product}]`);
        $containerUpdate.find('.ProductUnitKol').val(product.quantity);
        $containerUpdate.find('.ProductUnitST').text(`$${+product.price * +product.quantity}`);
    }

    _updateCartmini(product) {
        let $containerUpdate = $(`[data-product=${product.id_product}]`);
        $containerUpdate.find('.number').text(`${product.quantity} x `);
        $('#basket-count').text(this.countGoods);
    }


    addProduct(element) {
        let productId = +$(element).data('id');
        let find = this.cartItems.find(product => product.id_product === productId);
        if (find) {    //если уже есть такой товар в корзине
            find.quantity++;
            this.countGoods++;
            this.amount += find.price;
            this._updateCart(find);
            this._updateCartmini(find);
        } else {      //если нет такого товара в корзине
            let product = {
                id_product: productId,
                product_name: $(element).data('name'),
                price: +$(element).data('price'),
                src: $(element).data('src'),
                alt: $(element).data('alt'),
                color: "Red",
                "size": "XXL",
                quantity: 1
            };
            console.log(product);
            this.cartItems.push(product);
            console.log(this.cartItems);
            this.amount += product.price;
            this.countGoods += product.quantity;
            this._renderItemMini(product);
            this._clearTotalMini();
            this.flagTotal = true;
            this._renderMini();
        }
        this._renderSumMini();
    }


    remove(idProduct) {
        let productId = +idProduct;
        let find = this.cartItems.find(product => product.id_product === productId);
        if (find.quantity > 1) {
            find.quantity--;
            this.countGoods--;
            this._updateCartmini(find);
            this._updateCart(find);
        } else {
            this.cartItems.splice($.inArray(find, this.cartItems), 1); //splice(this.cartItems.IndexOf(find),1)
            $(`[data-product=${productId}]`).remove();
            this.countGoods--;
            $('#basket-count').text(this.countGoods);
        }
        this.amount -= find.price;
        this._renderSumMini();
        this._renderSum();
    }

    change(idProduct) {
        let productId = +idProduct;
        let find = this.cartItems.find(product => product.id_product === productId);
        let $containerUpdate = $(`[data-product=${find.id_product}]`);
        let $currentNumber = +$containerUpdate.find('.ProductUnitKol').val();  //текущее количество товара
        if ($currentNumber < find.quantity) {   //если текущее количество стало меньше предыдущего
            if (find.quantity > 1) {
                find.quantity--;
                this.countGoods--;
                this._updateCartmini(find);
                this._updateCart(find);
            } else {
                this.cartItems.splice($.inArray(find, this.cartItems), 1); //splice(this.cartItems.IndexOf(find),1)
                $(`[data-product=${productId}]`).remove();
                this.countGoods--;
                $('#basket-count').text(this.countGoods);
            }
            this.amount -= find.price;

        } else {                  //если текущее количество стало больше предыдущего
            find.quantity++;
            this.countGoods++;
            this.amount += find.price;
            this._updateCartmini(find);
            $containerUpdate.find('.ProductUnitST').text(`$${+find.price * $currentNumber}`);
        }
        this._renderSumMini();
        this._renderSum();
    }
}