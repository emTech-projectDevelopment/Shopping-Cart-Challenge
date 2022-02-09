const ready = 'js ready';

console.log(ready);

if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', pageReady)
} else {
    pageReady()
};

function pageReady() {
    var removeCartItemBtn = document.getElementsByClassName("btn-danger");

    for (let i=0; i<removeCartItemBtn.length; i++) {
        var button = removeCartItemBtn[i];
        button.addEventListener('click', function(event) {
            var buttonClick = event.target
            buttonClick.parentElement.parentElement.remove()
        updateCartTotal()
        })
    }


    const addNewSeasonBtn = document.getElementsByClassName('shop-item-btn');
    for (let i=0; i<addNewSeasonBtn.length; i++) {
        var button = addNewSeasonBtn[i];
        button.addEventListener('click', addNewSeasonToCart)
    }
}

function invalidQuantity(event) {
    var input = event.target;
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;
    }
    updateCartTotal()
}

function addNewSeasonToCart(event) {
    let button = event.target;
    let shopItem = button.parentElement.parentElement;
    let title = shopItem.getElementsByClassName('shop-item-title')[0].innerText;
    let description = shopItem.getElementsByClassName('shop-item-description')[0].innerText;
    let price = shopItem.getElementsByClassName('shop-item-price')[0].innerText;
    let imgSrc = shopItem.getElementsByClassName('shop-item-image')[0].src;
    console.log(title, price, imgSrc)
    addItemToCart(title, description, price, imgSrc)
}

function addItemToCart(title, description, price, imgSrc) {
    let newCartItem = document.createElement('div');
    let cartItems = document.getElementsByClassName('cart-items')[0];
    let newCartItemHtml = `
    <div class="column cart-item">
                <img class="cart-item-image" src=${imgSrc} alt="shirt">
                <div class="cart-description">
                    <span class="cart-item-title">${title}</span>
                    <p class="cart-item-description">${description}</p>
                </div>
                <div class="cart-options">
                    <span class="cart-price">${price}</span>
                    <input type="number" class="cart-quantity-input" value="1">
                    <button class="btn btn-danger" type="button">Remove</button>
                </div>
            </div>
            <br>
    `;
    newCartItem.innerText = newCartItemHtml;
    cartItems.append(newCartItem);
}

function updateCartTotal() {
    const cartTotalPrice = document.getElementsByClassName('cart-total-price')
    var cartItemContainer = document.getElementsByClassName('cart-items')[0];
    var cartRows = cartItemContainer.getElementsByClassName('cart-item');
    var total = 0;

    for (let j=0; j<cartRows.length; j++) {
        let cartRow = cartRows[j];
        let priceElement = cartRow.getElementsByClassName('cart-price')[0];
        let quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0];
        let priceAsNumber = parseFloat(priceElement.innerText.replace('$', ''));
        let quantityValue = quantityElement.value;
        total = total + (priceAsNumber * quantityValue)
    }
    
    cartTotalPrice[0].innerText = '$'+ total;
}

updateCartTotal()
setInterval(updateCartTotal, 500)