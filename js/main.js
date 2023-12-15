//==============Save Data to localStorage=============//
function saveLocalCategory() {
    localStorage.setItem("data", JSON.stringify(data));
}
//==============Function Load data from localStorage=============//
function loadLocalCategory() {
    let loadProducts = JSON.parse(localStorage.getItem("data"));
    if (loadProducts != undefined) {
        data = loadProducts;
        completeFilterCategory()
        createTable()
    } else {
        saveLocalCategory();
    }
}
let categoryFilter = document.querySelector(".categories");
let formAddProduct = document.querySelector('form');
let addProduct = document.querySelector('#addProduct');
let tbody = document.querySelector('tbody');
let inputSearch = document.querySelector('input');
let rows = document.querySelectorAll('Table tbody tr');
let buttonDelte = document.querySelectorAll('.delete');
let navbar = document.querySelector('nav');
let aside_left = document.querySelector('.aside-left');
let saveProductData = document.querySelector('#save');
let selectOption = document.querySelector('.chooseCategory');
let nameInput = document.querySelector('.name');
let priceInput = document.querySelector('.price');
let grossInput = document.querySelector('.gross');
let quantityInput = document.querySelector('.quantity');
let descriptionInput = document.querySelector('.description');
categoryFilter.addEventListener('change', filterProductWithCategory);
inputSearch.addEventListener('input', searchText);
addProduct.addEventListener('click', addProductToList);
saveProductData.addEventListener('click', saveProduct)
function filterProductWithCategory() {
    for (let tr of tbody.children) {
        if (tr.children[2].textContent == categoryFilter.value) {
            tr.style.display = '';
        } else if (categoryFilter.value == 'All Category') {
            tr.style.display = '';
        }
        else {
            tr.style.display = 'none';
        }
    }
}

function completeFilterCategory() {
    let categoryName = data.category;
    for (let name of categoryName) {
        let option1 = document.createElement('option');
        let option2 = document.createElement('option');
        option1.textContent = name.category;
        option1.setAttribute('value', name.category);
        option2.textContent = name.category;
        option2.setAttribute('value', name.category);
        categoryFilter.appendChild(option1)
        selectOption.appendChild(option2)

    }
}

function deLete(event) {
    event.target.closest('tr').remove();
};

for (let btn of buttonDelte) {
    btn.addEventListener('click', deLete)
}

function searchText() {
    let searchText = inputSearch.value.toLowerCase();
    for (let row of rows) {
        let secondColumnText = row.children[1].textContent.toLowerCase();
        if (secondColumnText.includes(searchText)) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    };
};

function hide(){
    aside_left.style.background = 'rgb(78, 76, 76)';
    document.body.style.backgroundColor = 'rgb(78, 76, 76)';
    navbar.style.backgroundColor = 'rgb(78, 76, 76)';
}
function show(){
    aside_left.style.background = '#fff';
    document.body.style.backgroundColor = '#fff';
    navbar.style.backgroundColor = '#fff';
}
function addProductToList(e) {
    formAddProduct.style.display = '';
    hide()
}
function saveProduct(e) {
    e.preventDefault();
    let obj = {};
    if (nameInput.value && selectOption.value && quantityInput.value && priceInput.value !== '') {
        obj.name = nameInput.value;
        obj.category = selectOption.value;
        obj.quantity = quantityInput.value;
        obj.price = priceInput.value;
        obj.grossPrice = grossInput.value;
        obj.description = descriptionInput.value;
        data.product.push(obj)
        saveLocalCategory()
        let tr = document.createElement('tr');
        let tdId = document.createElement('td');
        let tdName = document.createElement('td');
        let tdCategory = document.createElement('td');
        let tdQuantity = document.createElement('td');
        let tdPrice = document.createElement('td');
        let tdGross = document.createElement('td');
        let tdDes = document.createElement('td');
        let tdAction = document.createElement("td");
        tdAction.className = "action";
        let delButton = document.createElement("button");
        let viewButton = document.createElement("button");
        let iconDel = document.createElement("i");
        let spanDel = document.createElement("span");
        let iconView = document.createElement("i");
        let spanView = document.createElement("span");
        viewButton.setAttribute("id", "detail");
        delButton.setAttribute("id", "delete");
        delButton.addEventListener("click", deLete);
        iconDel.className = "material-icons icons-color";
        iconView.className = "material-icons icons-color";
        iconDel.textContent = "delete";
        spanDel.textContent = "Delete";
        iconView.textContent = "create";
        spanView.textContent = "Detail";
        tdId.textContent = 1;
        tdName.textContent = nameInput.value;
        tdCategory.textContent = selectOption.value;
        tdQuantity.textContent = quantityInput.value;
        tdGross.textContent = grossInput.value;
        tdPrice.textContent = priceInput.value;
        tdDes.textContent = descriptionInput.value;
        delButton.appendChild(iconDel);
        delButton.appendChild(spanDel);
        viewButton.appendChild(iconView);
        viewButton.appendChild(spanView);
        tdAction.appendChild(delButton);
        tdAction.appendChild(viewButton);
        tr.appendChild(tdId);
        tr.appendChild(tdName);
        tr.appendChild(tdCategory);
        tr.appendChild(tdQuantity);
        tr.appendChild(tdPrice);
        tr.appendChild(tdAction);
        tbody.appendChild(tr)
    }
    formAddProduct.style.display = 'none';
    show()
    clearInput()
}
function createTable() {
    let store = data.product;
    for (let element of store) {
        let tr = document.createElement('tr');
        let tdId = document.createElement('td');
        let tdName = document.createElement('td');
        let tdCategory = document.createElement('td');
        let tdQuantity = document.createElement('td');
        let tdPrice = document.createElement('td');
        let tdGross = document.createElement('td');
        let tdDes = document.createElement('td');
        let tdAction = document.createElement("td");
        tdAction.className = "action";
        let delButton = document.createElement("button");
        let viewButton = document.createElement("button");
        let iconDel = document.createElement("i");
        let spanDel = document.createElement("span");
        let iconView = document.createElement("i");
        let spanView = document.createElement("span");
        viewButton.setAttribute("id", "detail");
        delButton.setAttribute("id", "delete");
        delButton.addEventListener("click", deLete);
        iconDel.className = "material-icons icons-color";
        iconView.className = "material-icons icons-color";
        iconDel.textContent = "delete";
        spanDel.textContent = "Delete";
        iconView.textContent = "create";
        spanView.textContent = "Detail";
        tdId.textContent = 1;
        tdName.textContent =element.name;
        tdCategory.textContent =element.category;
        tdQuantity.textContent =element.quantity;
        tdGross.textContent =element.grossPrice;
        tdPrice.textContent =element.price;
        tdDes.textContent =element.description;
        delButton.appendChild(iconDel);
        delButton.appendChild(spanDel);
        viewButton.appendChild(iconView);
        viewButton.appendChild(spanView);
        tdAction.appendChild(delButton);
        tdAction.appendChild(viewButton);
        tr.appendChild(tdId);
        tr.appendChild(tdName);
        tr.appendChild(tdCategory);
        tr.appendChild(tdQuantity);
        tr.appendChild(tdPrice);
        tr.appendChild(tdAction);
        tbody.appendChild(tr);
    }
}
function clearInput() {
    nameInput.value = '';
    selectOption.value = '';
    quantityInput.value = '';
    priceInput.value = '';
    grossInput.value = '';
    descriptionInput.value = ''
}
let data = {
    product: [],
    category: [],
    categoryID: null,
};
loadLocalCategory();