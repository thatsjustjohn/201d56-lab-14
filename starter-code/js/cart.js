/* global Cart */
'use strict';

// Create an event listener so that when the delete link is clicked, the removeItemFromCart method is invoked.
var table = document.getElementById('cart');
table.addEventListener('click', removeItemFromCart);
var cart;

function loadCart() {
  var cartItems = JSON.parse(localStorage.getItem('cart')) || [];
  cart = new Cart(cartItems);
}

// Make magic happen --- re-pull the Cart, clear out the screen and re-draw it
function renderCart() {
  loadCart();
  clearCart();
  showCart();
}

//✔  TODO: Remove all of the rows (tr) in the cart table (tbody)
function clearCart() {
  var tableBody = table.getElementsByTagName('tbody');
  // TODO: Id like to remove the children but this works.(not as efficient)
  tableBody[0].innerHTML = '';
}

//✔ TODO: Fill in the <tr>'s under the <tbody> for each item in the cart
function showCart() {
  //✔ TODO: Find the table body
  var tableBody = table.getElementsByTagName('tbody');
  console.log(tableBody);
  //✔ TODO: Iterate over the items in the cart
  let cartSize = cart.items.length;
  for(let i = 0; i < cartSize; i++){
    //✔ TODO: Create a TR
    let tableRowElement = document.createElement('tr');
    tableRowElement.setAttribute('id',`${cart.items[i].product}`,0);
    //✔ TODO: Create a TD for the delete link, quantity,  and the item
    // Create TDs
    let tableDElement = document.createElement('td');
    //✔ TODO: CHANGE DELETE TO LINK?
    tableDElement.innerText = 'X';
    tableRowElement.appendChild(tableDElement);
    // Crete new TD element for quanitity
    tableDElement = document.createElement('td');
    tableDElement.innerText = `${cart.items[i].quantity}`;
    tableRowElement.appendChild(tableDElement);
    // Crete new TD element for product
    tableDElement = document.createElement('td');
    tableDElement.innerText = `${cart.items[i].product}`;
    tableRowElement.appendChild(tableDElement);
    //✔ TODO: Add the TR to the TBODY and each of the TD's to the TR
    tableBody[0].appendChild(tableRowElement);
  }
}

function removeItemFromCart(event) {
  //✔ TODO: When a delete link is clicked, use cart.removeItem to remove the correct item
  let itemToRemove = event.path[1].id;
  console.log(itemToRemove);
  //✔ TODO: Remove item
  cart.removeItem(itemToRemove);
  //✔ TODO: Save the cart back to local storage
  cart.saveToLocalStorage();
  //✔ TODO: Re-draw the cart table
  renderCart();

}

// This will initialize the page and draw the cart on screen
renderCart();
