
let product_list = document.querySelector('.product');
let searchInput = document.querySelector('#search');

searchInput.addEventListener('input', searchProduct)
//==============Save Data to localStorage=============//
function saveLocalCategory() {
    localStorage.setItem("data", JSON.stringify(data));
}
//==============Function Load data from localStorage=============//
function loadLocalCategory() {
    let loadProducts = JSON.parse(localStorage.getItem("data"));
    if (loadProducts != undefined) {
        data = loadProducts;
        createCard()
    } else {
        saveLocalCategory();
    }
}
let list_card;
//==============Function Create Card============//
function createCard(){
    list_card = document.createElement('div');
    list_card.classList.add('list-card');
    let storedata = data.product;
    for (let store of storedata){
        let card = document.createElement('div');
        card.className = 'card';
        let h4 = document.createElement('h4');
        h4.textContent = store.name;
        let spanOne = document.createElement('span');
        spanOne.textContent = store.quantity;
        let spanTwo = document.createElement('span');
        spanTwo.textContent = store.price;
        let button = document.createElement('button');
        button.textContent = 'ADD TO CARD';
        button.classList.add('addCard');
        card.appendChild(h4);
        card.appendChild(spanOne);
        card.appendChild(spanTwo);
        card.appendChild(button);
        list_card.appendChild(card);
    }
    product_list.appendChild(list_card)
}

//============ search prodcut =========//
function searchProduct(){
    let all_card = document.querySelectorAll('.card');
    for (let card of all_card){
        let name_product = card.children[0].textContent.toLowerCase();
        if (name_product.includes(searchInput.value.toLowerCase())){
            card.style.display = ''
        }else{
            card.style.display = 'none';
        }
    }
    for (let product of data.product){
        if (searchInput.value == product.id){
            for (let card of all_card){
                let name_product = card.children[0].textContent;
                if (product.name == name_product){
                    card.style.display = ''
                }else{
                    card.style.display = 'none';
                }
            }
        }
    }
}

let data = {
    product: [],
    productID: null,
    category: [],
    categoryID: null,
};
//============== Call loadLocalCategory to local storage   =============//
loadLocalCategory();