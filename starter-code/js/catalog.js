/* global Product, Cart */

'use strict';

// Set up an empty cart for use on this page.
var cart = new Cart([]);

// On screen load, we call this method to put all of the busmall options
// (the things in the Product.allProducts array) into the drop down list.
function populateForm() {

  //✔ TODO: Add an <option> tag inside the form's select for each product
  var selectElement = document.getElementById('items');
  for (var i in Product.allProducts) {
    var optionElement = document.createElement('option');
    //using index might be easier for this for lookup.  Assuming the array never changes
    optionElement.setAttribute('value', Product.allProducts[i].name);
    var textElement = document.createTextNode(Product.allProducts[i].name);
    optionElement.appendChild(textElement);
    selectElement.appendChild(optionElement);
  }
  var inputElement = document.getElementById('quantity');
  inputElement.setAttribute('min', 1);
  inputElement.setAttribute('max', 1000);
  inputElement.setAttribute('value', 1);
}

// When someone submits the form, we need to add the selected item to the cart
// object, save the whole thing back to local storage and update the screen
// so that it shows the # of items in the cart and a quick preview of the cart itself.
function handleSubmit(event) {

  //✔ TODO: Prevent the page from reloading
  event.preventDefault();

  // Do all the things ...
  addSelectedItemToCart();
  cart.saveToLocalStorage();
  updateCounter();
  updateCartPreview();

}

//✔ TODO: Add the selected item and quantity to the cart
function addSelectedItemToCart() {
  //✔ TODO: suss out the item picked from the select list
  //✔ TODO: get the quantity
  //✔ TODO: using those, add one item to the Cart
  // Get Item
  var selectItems = document.getElementById('items');
  var itemSelected = selectItems.options[selectItems.selectedIndex].value;
  // Get Quantity
  var itemQuantity = Number(document.getElementById('quantity').value);
  // Add item to cart
  //check to see if we already have the item
  let itemInCart = false;
  let cartSize = cart.items.length;
  for(let i = 0; i < cartSize; i++){
    if(cart.items[i].product === itemSelected)
    {
      cart.items[i].quantity += itemQuantity;
      itemInCart = true;
    }
  }
  if(!itemInCart){
    cart.addItem(itemSelected, itemQuantity);
  }
  //maybe clear values when its been added?
  console.log(cart);
}

//✔ TODO: Update the cart count in the header nav with the number of items in the Cart
function updateCounter() {
  let totalItems = 0;
  let cartSize = cart.items.length;
  for(let i = 0; i < cartSize; i++){
    totalItems += cart.items[i].quantity;
  }
  document.getElementById('itemCount').textContent = totalItems;
}

//✔  TODO: As you add items into the cart, show them (item & quantity) in the cart preview div
function updateCartPreview() {
  //✔ TODO: Get the item and quantity from the form
  // Get Item
  var selectItems = document.getElementById('items');
  var itemSelected = selectItems.options[selectItems.selectedIndex].value;
  // Get Quantity
  var itemQuantity = Number(document.getElementById('quantity').value);

  // TODO: Add a new element to the cartContents div with that information
  var cartContentsDiv = document.getElementById('cartContents');
  var ulElement = document.querySelector('#cartContents ul');
  var liElement;

  if (ulElement !== null) {
    console.log('ulElement', ulElement);
  } else {
    console.log('lets create it since it doesnt exist');
    ulElement = document.createElement('ul');
    cartContentsDiv.appendChild(ulElement);
  }
  // TODO: maybe toss in the image somewhere in here
  //new element for item name
  liElement = document.createElement('li');
  var spanItemSelected = document.createElement('span');
  spanItemSelected.textContent = itemSelected;
  liElement.appendChild(spanItemSelected);

  //new element for quantity
  var spanItemQuantity = document.createElement('span');
  spanItemQuantity.textContent = itemQuantity;
  liElement.appendChild(spanItemQuantity);

  ulElement.appendChild(liElement);
}

// Set up the "submit" event listener on the form.
// This is the trigger for the app. When a user "submits" the form, it will
// Call that handleSubmit method above and kick off the whole process
var catalogForm = document.getElementById('catalog');
catalogForm.addEventListener('submit', handleSubmit);

// Before anything else of value can happen, we need to fill in the select
// drop down list in the form.
populateForm();
