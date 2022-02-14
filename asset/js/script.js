// Check Doc state and Load Js after all the HTML has loaded
if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', pageReady)
} else {
    pageReady()
};

// Test HTML connection
const ready = 'js script ready';
console.log(ready);

// Add event Listeners when the page is loaded
function pageReady() {
    
    // Add new season item to cart listener
    const addNewSeasonBtn = document.getElementsByClassName('shop-item-btn');
    for (let i=0; i<addNewSeasonBtn.length; i++) {
        let button = addNewSeasonBtn[i];
        button.addEventListener('click', addNewSeasonItemToCart)
    }

    // Remove item from cart listener
    let removeCartItemBtn = document.getElementsByClassName("btn-danger");
    for (let i=0; i<removeCartItemBtn.length; i++) {
        let button = removeCartItemBtn[i];
        button.addEventListener('click', function(event) {
            let buttonClick = event.target
            buttonClick.parentElement.parentElement.remove()
        updateCartTotal()
        })
    }
};
setInterval(pageReady, 500)

// Propmpt for user name and bind to DOM
const userName = prompt('Enter your name:')
const userEntry = document.getElementById('user-entry').innerText = `Hi ${userName}!`

// Array of shop item objects
const shopItemsArray = [
    {title: "Black T-Shirt", imgSrc: "./asset/images/blackShirt.jpeg", imgAlt: "black tshirt", description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Obcaecati iusto ducimus consectetur.", price: 24.99},
    {title: "Green T-Shirt", imgSrc: "./asset/images/greenShirt.jpeg", imgAlt: "green tshirt", description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Obcaecati iusto ducimus consectetur.", price: 29.99},
    {title: "White T-Shirt", imgSrc: "./asset/images/whiteShirt.jpeg", imgAlt: "white tshirt", description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Obcaecati iusto ducimus consectetur.", price: 29.99},
    {title: "Blue Dress Shirt", imgSrc: "./asset/images/blueDressShirt.jpeg", imgAlt: "Blue Dress shirt", description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Obcaecati iusto ducimus consectetur.",  price: 49.99}
];

// Call function on array to populate shop items
populateShop(shopItemsArray)

// Populate shop from array function
function populateShop(data){
    const shopItems = document.querySelector('.shop-items');

    for (let i=0; i<shopItemsArray.length;i++){
       let shopItemHTML =  `
            <div class="col d-block my-3 mx-1 w-auto m-auto shop-item">
               <span class="shop-item-title">${data[i].title}</span>
               <br>
               <img class="shop-item-image" src=${data[i].imgSrc} alt=${data[i].imgAlt}>
               <div class="shop-item-details">
                   <p class="shop-item-description w-50">${data[i].description}</p>
                   <span class="shop-item-price">$${data[i].price}</span>
                   <input type="number" class="shop-quantity-input" value="1">
                   <br>
                   <button class="btn btn-primary shop-item-btn" id="addToCart" type="button">Add to cart</button>
               </div>
           </div>
           `;  
        shopItems.innerHTML += shopItemHTML;
        };
        // Beautiful iteration code 
};

// DOM Time element
const timeElement = document.getElementById('time');

// Function for time
function tickingTime() {
    let timeNow = new Date();
    return (timeElement.innerText = `${timeNow.getHours()}:${timeNow.getMinutes()}:${timeNow.getSeconds()}`);
  }

  // DISPLAY TIME
tickingTime();
setInterval(tickingTime, 1000);

// Attempting Validation of input quantity
function invalidQuantity(event) {
    let input = event.target;
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;
    }
    updateCartTotal()
}

function addNewSeasonItemToCart(event) {
    let button = event.target;
    let shopItem = button.parentElement.parentElement;
    let title = shopItem.getElementsByClassName('shop-item-title')[0].innerText;
    let description = shopItem.getElementsByClassName('shop-item-description')[0].innerText;
    let price = shopItem.getElementsByClassName('shop-item-price')[0].innerText;
    let imgSrc = shopItem.getElementsByClassName('shop-item-image')[0].src;
    console.log(title, description, price, imgSrc);
    addItemToCart(title, description, price, imgSrc);
    updateCartTotal();
}

function addItemToCart(title, description, price, imgSrc) {
    let newCartItem = document.createElement('div');
    let cartItems = document.getElementsByClassName('cart-items')[0];
    let cartItemNames = cartItems.getElementsByClassName('cart-item-title');
    for (let i = 0; i < cartItemNames.length; i++) {
        if (cartItemNames[i] == title) {
            alert('Hey {shopper}! This item is already in your cart.')
            return
        }
    };
    let newCartItemHtml = `
            <div class="column cart-item new-cart-item">
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
    newCartItem.innerHTML = newCartItemHtml;
    cartItems.append(newCartItem);
}

function updateCartTotal() {
    const cartTotalPrice = document.getElementsByClassName('cart-total-price')
    let cartItemContainer = document.getElementsByClassName('cart-items')[0];
    let cartRows = cartItemContainer.getElementsByClassName('cart-item');
    let total = 0;

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

// Functionality of Confirm purchase btn NEED TO ADD FUNCTIONALITY FOR ZERO (0) ITEM VALIDATION
const confirmationBtn = document.querySelector('.btn-purchase');
confirmationBtn.addEventListener('click', function(){
alert(`Thanks ${userName}! Your order for ${document.querySelector('.cart-total-price').innerText} was confirmed at ${tickingTime()}`);
console.log('Wrap this in a modal (Total price and time of confirmation.)')
})

// Oops code
function sozBud() {
    alert(`Sorry ${userName}, i dont have the right functionality yet! Please make a selection from the shop :) `)
}

// Bit of a hack to update cart total as the buttons always have to be listening after load.. very confused
updateCartTotal()
setInterval(updateCartTotal, 500)
