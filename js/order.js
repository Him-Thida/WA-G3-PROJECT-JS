
let product_list = document.querySelector('.product');
let searchInput = document.querySelector('#search');
let list_Checkout = document.querySelector('.list-Checkout');

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
        spanOne.textContent = 'In Stock : ' + store.quantity;
        let spanTwo = document.createElement('span');
        spanTwo.textContent = 'Price : ' + store.price;
        let button = document.createElement('button');
        button.textContent = 'ADD TO CARD';
        button.classList.add('addCard');
        button.addEventListener('click', addProductToCard);
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
//=============== Checkout Product ==========//
const checkout = () => {
    console.log('hello')
}
//=============== Add product to card ==========//
function deleteCheckout(event){
    event.target.closest('.list-item').remove();
    console.log('hello')
}
//=============== Add product to card ==========//
function addProductToCard(e){
    btn = e.target;
    e.target.removeEventListener('click',addProductToCard);
    e.target.addEventListener('click', checkout)
    let cart = e.target.closest('.card').children;
    let list_item = document.createElement('div');
    list_item.className = 'list-item'
    let pOne = document.createElement('p');
    pOne.textContent = cart[0].textContent;
    let pTwo = document.createElement('p');
    pTwo.textContent = '0';
    let iOne = document.createElement('i');
    iOne.className = 'material-icons';
    iOne.textContent = 'add_circle';
    let pThree = document.createElement('p');
    pThree.textContent = cart[2].textContent.replace('Price : ', '');
    let iTwo = document.createElement('i');
    iTwo.className = 'material-icons';
    iTwo.textContent = 'remove_circle';
    let iThree = document.createElement('i');
    iThree.className = 'material-icons delete';
    iThree.textContent = 'delete';
    list_item.appendChild(pOne)
    list_item.appendChild(iOne)
    list_item.appendChild(pTwo)
    list_item.appendChild(iTwo);
    list_item.appendChild(pThree);
    list_item.appendChild(iThree);
    list_Checkout.appendChild(list_item)
}

let data = {
    product: [],
    productID: null,
    category: [],
    categoryID: null,
};
//============== Call loadLocalCategory to local storage   =============//
loadLocalCategory();