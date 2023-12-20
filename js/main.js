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

//============== Get element from html =============//
let categoryFilter = document.querySelector(".categories");
let form = document.querySelector('#add_product');
let addProduct = document.querySelector('#addProduct');
let tbody = document.querySelector('tbody');
let inputSearch = document.querySelector('#search');
let buttonDelete = document.querySelectorAll('.delete');
let aside_left = document.querySelector('.aside-left');
let saveProductData = document.querySelector('#save');
let selectOption = document.querySelector('.chooseCategory');
let nameInput = document.querySelector('.name');
let priceInput = document.querySelector('.price');
let grossInput = document.querySelector('.gross');
let quantityInput = document.querySelector('.quantity');
let descriptionInput = document.querySelector('.description');
let backBtn = document.querySelector('#back');
let okBtn = document.querySelector('#ok');
let alert = document.querySelector('.alert');
console.log(alert)
let showDetail = document.querySelector('#showDetail');
let idPro = document.querySelector('#idPro');
let nameProduct = document.querySelector('#namePro');
let descriptionPro = document.querySelector('#descriptionPro');
let categoryNamePro = document.querySelector('#categoryNamePro');
let quantityPro = document.querySelector('#quantityPro');
let pricePro = document.querySelector('#pricePro');
let grossPricePro = document.querySelector('#grossPricePro');
let cancal = document.querySelector('#cancal');
cancal.addEventListener('click', hideDetailProduct)
okBtn.addEventListener('click', okAlert);
backBtn.addEventListener('click', back)
categoryFilter.addEventListener('change', filterProductWithCategory);
inputSearch.addEventListener('input', searchText);
addProduct.addEventListener('click', addProductToList);
saveProductData.addEventListener('click', saveProduct);

//============== Add eventlistener to btn delete =============//
for (let btn of buttonDelete) {
    btn.addEventListener('click', deLete)
}

//==============Function search category with filter =============//
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

//==============Function Auto complete category form local storage =============//
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
//==============Function Delete product name =============//
function deLete(e) {
    let nameDelete = e.target.closest('tr').children[1].textContent;
    for (let obj of data.product) {
        if (obj.name == nameDelete) {
            data.product.pop(obj);
            e.target.closest('tr').remove();
            saveLocalCategory();
        }
    }
};

//==============Function detail product name =============//
function detail(e) {
    let namePro = e.target.closest('tr').children[1].textContent;
    for (let loop of data.product) {
        if (loop.name == namePro) {
            idPro.innerHTML = 'Product ID : ' + loop.id;
            nameProduct.innerHTML = 'Product Name : ' + loop.name;
            descriptionPro.innerHTML = 'Description : ' + loop.description;
            categoryNamePro.innerHTML = 'Category Name : ' + loop.category;
            quantityPro.innerHTML = 'Quantity : ' + loop.quantity;
            pricePro.innerHTML = 'Price : ' + loop.price;
            grossPricePro.innerHTML = 'Gross Price : ' + loop.grossPrice;
        }
    }
    showDetail.style.display = '';
}

//==============Function close detail =============//
function hideDetailProduct(event) {
    showDetail.style.display = 'none';
}

//==============Function search product name =============//
function searchText() {
    let searchText = inputSearch.value.toLowerCase();
    for (let row of tbody.children) {
        let secondColumnText = row.children[1].textContent.toLowerCase();
        if (secondColumnText.includes(searchText)) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    };
};

//==============Function Back from add product =============//
function back(e) {
    e.preventDefault();
    form.style.display = 'none';
}

//==============Function to Add product when click button add product   =============//
function addProductToList() {
    form.style.display = '';
}

//==============Function For save and create table with click on button save =============//
function saveProduct(e) {
    e.preventDefault();
    let store = data.productID;
    if (data.productID == null) {
        store = 1;
        data.productID = store;
    } else {
        store += 1
        data.productID = store;
    }
    let obj = {};
    if (nameInput.value && selectOption.value && quantityInput.value && priceInput.value && grossInput.value && descriptionInput.value !== '') {
        obj.id = store;
        obj.name = nameInput.value;
        obj.category = selectOption.value;
        obj.quantity = quantityInput.value;
        obj.price = priceInput.value + '$';
        obj.grossPrice = grossInput.value + '$';
        obj.description = descriptionInput.value;
        obj.sold = 0;
        data.product.push(obj)
        saveLocalCategory()
        createTable()
        form.style.display = 'none';
        clearInput()
    } else {
        alert.style.display = '';

    }
}

//==============Function For Hide alert when click Ok button=============//
function okAlert(e) {
    e.target.parentElement.style.display = 'none';
}

//==============Function For Create Table  =============//
function createTable() {
    let store = data.product;
    tbody.innerHTML = '';
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
        viewButton.addEventListener('click', detail);
        iconDel.className = "material-icons icons-color";
        iconView.className = "material-icons icons-color";
        iconDel.textContent = "delete";
        spanDel.textContent = "Delete";
        iconView.textContent = "create";
        spanView.textContent = "Detail";
        tdId.textContent = element.id;
        tdName.textContent = element.name;
        tdCategory.textContent = element.category;
        tdQuantity.textContent = element.quantity;
        tdPrice.textContent = element.price;
        tdDes.textContent = element.description;
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

//==============Function For Clear Input=============//
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
    productID: null,
    category: [],
    categoryID: null,
    bashBoard: { sold: 0, income: 0 }
};
//============== Call loadLocalCategory to local storage   =============//
loadLocalCategory();