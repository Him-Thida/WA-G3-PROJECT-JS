let product_list = document.querySelector(".product");
let searchInput = document.querySelector("#search");
let list_Checkout = document.querySelector(".list-Checkout");
let total = document.querySelector('#Total');
let payBtn = document.querySelector('#payMoney');
searchInput.addEventListener("input", searchProduct);
payBtn.addEventListener('click', payProduct);
let list_card;

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
function payProduct(event){
    console.log(event.target)
    event.preventDefault();
    let sold = data.bashBoard.sold;
    let storeTotal = data.bashBoard.income + Number(total.textContent.replace('$',''));
    data.bashBoard.income = storeTotal;
    saveLocalCategory();
    let addBtn = document.querySelectorAll('.addCard');
    for (let btn of addBtn){
        btn.addEventListener('click',addProductToCard)
    }
    for (let item of list_Checkout.children){
        let namePro = item.children[0].textContent;
        let qty = item.children[1].children[1].textContent;
        for (let pro of product_list.children[1].children){
            if (pro.children[0].textContent == namePro){
                let store = pro.children[1].textContent.replace('In Stock : ', '');
                let res = Number(store) - Number(qty);
                pro.children[1].textContent = 'In Stock : ' + res;
                for (let local of data.product){
                    if (local.name === namePro){
                        local.quantity = res;
                        local.sold = Number(local.sold) + Number(qty);
                        data.bashBoard.sold = Number(sold) + Number(qty);
                    }
                }
                saveLocalCategory()
            }
        }
    }
    total.textContent = 0 + '$';
    list_Checkout.innerHTML = '';
}

//=============== Checkout Product ==========//
let checkout = (pricePro, quantityTotal, totalPro) => {
    let pri = parseInt(pricePro.textContent.replace('$', ''));
    let qty = parseInt(quantityTotal.textContent);
    totalPro.textContent = pri * qty + '$';
    totalMoney();
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
        if (item.children[0].textContent == namePro) {
            if (stock > Number(quantityTotal.textContent)) {
                quantityTotal.textContent = Number(quantityTotal.textContent) + 1;
                checkout(pricePro, quantityTotal, totalPro)
            }
        }
    }
}
//=============== Sum Total Money  ==========//
const totalMoney = () => {
    let sum = 0;
    for (let list of list_Checkout.children) {
        sum += parseInt(list.children[3].textContent.replace('$', ''));
        total.textContent = sum + '$';
    }
}

//=============== Calculator Number ==========//
let calculator = (event) =>{
    let pro = event.target.closest('.card').children[0].textContent;
    let limitPro = event.target.closest('.card').children[1].textContent.replace('In Stock : ', '');
    let item = list_Checkout.children;
    for (let element of item){
        if (element.children[0].textContent == pro){
            let quantityTotal = element.children[1].children[1];
            let pricePro = element.children[2];
            let totalPro = element.children[3];
            if (Number(quantityTotal.textContent) < limitPro){
                quantityTotal.textContent = parseInt(quantityTotal.textContent) + 1;
                checkout(pricePro,quantityTotal, totalPro)
            }
        }
    }
}
//=============== Add product to card ==========//
function addProductToCard(e) {
    let btn = e.target;
    btn.removeEventListener("click", addProductToCard);
    btn.addEventListener("click", calculator);
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
        let resultlSum = iThree.parentElement.previousElementSibling.textContent.replace('$','');
        let getTotalPrice = total.textContent.replace('$','');
        total.textContent = Number(getTotalPrice) - Number(resultlSum) + '$'
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
    bashBoard : {sold : 0, income: 0}
};
//============== Call loadLocalCategory to local storage   =============//
loadLocalCategory();