let product_list = document.querySelector(".product");
let searchInput = document.querySelector("#search");
let list_Checkout = document.querySelector(".list-Checkout");
let total = document.querySelector('#Total');
searchInput.addEventListener("input", searchProduct);
//==============Save Data to localStorage=============//
function saveLocalCategory() {
  localStorage.setItem("data", JSON.stringify(data));
}
//==============Function Load data from localStorage=============//
function loadLocalCategory() {
  let loadProducts = JSON.parse(localStorage.getItem("data"));
  if (loadProducts != undefined) {
    data = loadProducts;
    createCard();
  } else {
    saveLocalCategory();
  }
}
let list_card;
//==============Function Create Card============//
function createCard() {
  list_card = document.createElement("div");
  list_card.classList.add("list-card");
  let storeData = data.product;
  for (let store of storeData) {
    let card = document.createElement("div");
    card.className = "card";
    let h4 = document.createElement("h4");
    h4.textContent = store.name;
    let spanOne = document.createElement("span");
    spanOne.textContent = "In Stock : " + store.quantity;
    let spanTwo = document.createElement("span");
    spanTwo.textContent = "Price : " + store.price;
    let button = document.createElement("button");
    button.textContent = "ADD TO CARD";
    button.classList.add("addCard");
    button.addEventListener("click", addProductToCard);
    card.appendChild(h4);
    card.appendChild(spanOne);
    card.appendChild(spanTwo);
    card.appendChild(button);
    list_card.appendChild(card);
  }
  product_list.appendChild(list_card);
}
//============ search product =========//
function searchProduct() {
  let all_card = document.querySelectorAll(".card");
  for (let card of all_card) {
    let name_product = card.children[0].textContent.toLowerCase();
    if (name_product.includes(searchInput.value.toLowerCase())) {
      card.style.display = "";
    } else {
      card.style.display = "none";
    }
  }
  for (let product of data.product) {
    if (searchInput.value == product.id) {
      for (let card of all_card) {
        let name_product = card.children[0].textContent;
        if (product.name == name_product) {
          card.style.display = "";
        } else {
          card.style.display = "none";
        }
      }
    }
  }
}
//=============== Checkout Product ==========//
const checkout = (pricePro, quantityTotal, totalPro) => {
  let pri = parseInt(pricePro.textContent.replace('$',''));
  let qty = parseInt(quantityTotal.textContent);
  totalPro.textContent = pri * qty + '$';
  totalMoney()
};

//=============== Decrement value product ==========//
const decrementValue = (event) => {
  let quantityTotal = event.target.nextElementSibling;
  let pricePro = event.target.parentElement.nextElementSibling;
  let totalPro = pricePro.nextElementSibling;
  if (Number(quantityTotal.textContent) > 0) {
    quantityTotal.textContent = parseInt(quantityTotal.textContent) - 1;
    checkout(pricePro, quantityTotal, totalPro)
  }

};

//=============== increment value product ==========//
const incrementValue = (event) => {
  let quantityTotal = event.target.previousElementSibling;
  let pricePro = event.target.parentElement.nextElementSibling;
  let totalPro = pricePro.nextElementSibling;
  let namePro = quantityTotal.parentElement.parentElement.children[0].textContent;
  let list_item_card = document.querySelectorAll(".card");
  for (let item of list_item_card) {
    let stock = item.children[1].textContent.replace('In Stock : ', '');
    if (item.children[0].textContent == namePro){
      if (stock > Number(quantityTotal.textContent)){
        quantityTotal.textContent = Number(quantityTotal.textContent) + 1;
        checkout(pricePro, quantityTotal, totalPro)
      }
    }
  }
}
//=============== Sum Total Money  ==========//
const totalMoney = () =>{
let sum = 0;
  for (let list of list_Checkout.children){
    sum += parseInt(list.children[3].textContent.replace('$',''));
    total.textContent = sum + '$';
  }
}
// //=============== Delete Card checkout ==========//
function deleteCheckout(event) {
  event.target.closest(".list-item").remove();
}
//=============== Calculator Number ==========//

//=============== Add product to card ==========//
function addProductToCard(e) {
  let btn = e.target;
  btn.removeEventListener("click", addProductToCard);
  btn.addEventListener("click", checkout);
  let cart = e.target.closest(".card").children;
  let list_item = document.createElement("ul");
  list_item.className = "list-item";
  let liOne = document.createElement("li");
  liOne.textContent = cart[0].textContent;
  let liTwo = document.createElement("li");
  liTwo.id = "qty";
  let iOne = document.createElement("i");
  iOne.className = "material-icons";
  iOne.textContent = "remove_circle";
  iOne.addEventListener("click", decrementValue);
  let spanQty = document.createElement("span");
  spanQty.textContent = "0";
  let iTwo = document.createElement("i");
  iTwo.className = "material-icons";
  iTwo.textContent = "add_circle";
  iTwo.addEventListener("click", incrementValue);
  liTwo.appendChild(iOne);
  liTwo.appendChild(spanQty);
  liTwo.appendChild(iTwo);
  let liThree = document.createElement("li");
  liThree.textContent = cart[2].textContent.replace("Price : ", "");
  let liFour = document.createElement("li");
  liFour.textContent = "000$";
  liFive = document.createElement("li");
  let iThree = document.createElement("i");
  iThree.className = "material-icons delete";
  iThree.textContent = "delete";
  liFive.appendChild(iThree);
  iThree.addEventListener("click", function () {
    btn.removeEventListener("click", checkout);
    btn.addEventListener("click", addProductToCard);
    iThree.closest(".list-item").remove();
  });
  list_item.appendChild(liOne);
  list_item.appendChild(liTwo);
  list_item.appendChild(liThree);
  list_item.appendChild(liFour);
  list_item.appendChild(liFive);
  list_Checkout.appendChild(list_item);
}

let data = {
  product: [],
  productID: null,
  category: [],
  categoryID: null,
};
//============== Call loadLocalCategory to local storage   =============//
loadLocalCategory();
