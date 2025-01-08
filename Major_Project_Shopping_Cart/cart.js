// getting data from local storage

let cart = JSON.parse(localStorage.getItem('cart')) || []

// function to display cart items

function displayCart() {
    const cartItemsContainer = document.getElementById('cart-items')
    const totalAmount = document.getElementById('total-amount')
    cartItemsContainer.innerHTML = ''
    let total = 0;

    cart.forEach((item, index) => {
        total += item.price * item.quantity;
        let listItem = document.createElement('li');
        listItem.innerHTML = `${item.name}-$${item.price}x${item.quantity}
     <button onclick="updateQuantity(${index},'increase')" >+</button>
     <button onclick="updateQuantity(${index},'decrease')" >-</button>
     <button onclick="removeFromCart(${index})" >Remove</button>`;
        cartItemsContainer.appendChild(listItem)
    })
    totalAmount.textContent = total.toFixed(2);
    //   save items to cart
    localStorage.setItem('cart', JSON.stringify(cart))
}

// add to cart

function addToCart(id, name, price) {
    const exisistingItemIndex = cart.findIndex(item => item.id === id);

    if (exisistingItemIndex >= 0) {
        cart[exisistingItemIndex].quantity += 1;
    }
    else {
        cart.push({ id, name, price, quantity: 1 })
    }
    displayCart()
}

// update quantity

function updateQuantity(index, action) {
    if (action === 'increase') {
        cart[index].quantity += 1;
    }
    else if (action === 'decrease') {
        cart[index].quantity = Math.max(1, cart[index].quantity - 1)
        // cart[index].quantity -= 1;

    }
    displayCart()
}

// remove quantity

function removeFromCart(index) {
    cart.splice(index, 1);
    displayCart();
}

// show the receipt


function showReceipt() {
    const receiptContent = document.getElementById('receipt-content')
    const receiptTotal = document.getElementById('receipt-total')
    let total = 0;

    // initially receipt is empty
    receiptContent.innerHTML = '';

    // generate receipt items
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        const itemElement = document.createElement('p');
        itemElement.innerHTML = `${item.name}-$${item.price}X${item.quantity}=$${itemTotal.toFixed(2)}`
        receiptContent.appendChild(itemElement);
    })

    //  set total in receipt
    receiptTotal.textContent = total.toFixed(2)

    // display modal
    document.getElementById('receipt-modal').style.display = 'block';
}

// close receipt modal
function closeReceipt() {
    document.getElementById('receipt-modal').style.display = 'none'
}



// handle checkout

function checkOut() {
    if (cart.length === 0) {
        alert("your cart is empty!");
        return;
    }
    showReceipt()
}

// confirm checkout ,clear cart,hide modal

function confirmCheckOut() {
    alert("thank u for shopping ! visit again 😊 ");
    // clear cart
    cart = [];
    localStorage.removeItem('cart');
    displayCart();
    closeReceipt();
}