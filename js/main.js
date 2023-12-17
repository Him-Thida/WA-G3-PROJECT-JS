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
let formAddProduct = document.querySelector('form');
let addProduct = document.querySelector('#addProduct');
let tbody = document.querySelector('tbody');
let inputSearch = document.querySelector('#search');
let buttonDelete = document.querySelectorAll('.delete');
let navbar = document.querySelector('nav');
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
let showDetail = document.querySelector('.showDetail');
let idPro = document.querySelector('.idPro');
let nameProduct = document.querySelector('.namePro');
let descriptionPro = document.querySelector('.descriptionPro');
let categoryNamePro = document.querySelector('.categoryNamePro');
let quantityPro = document.querySelector('.quantityPro');
let pricePro = document.querySelector('.pricePro');
let grossPricePro = document.querySelector('.grossPricePro');
let closeBtn = document.querySelector('#close');
closeBtn.addEventListener('click', hideDetailProduct)
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
    showDetail.style.display = '';
    hide()
    for (let loop of data.product) {
        if (loop.name == namePro) {
            idPro.textContent = 'Product ID : ' + loop.id;
            nameProduct.textContent = 'Product Name : ' + loop.name;
            descriptionPro.textContent = 'Description : ' + loop.description;
            categoryNamePro.textContent = 'Category Name : ' + loop.category;
            quantityPro.textContent = 'Quantity : ' + loop.quantity;
            pricePro.textContent = 'Price : ' + loop.price;
            grossPricePro.textContent = 'Gross Price : ' + loop.grossPrice;
        }
    }

}

//==============Function close detail =============//
function hideDetailProduct() {
    showDetail.style.display = 'none';
    show()
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
    show()
    formAddProduct.style.display = 'none';
}

//==============Function For hide when add product, show detail   =============//
function hide() {
    aside_left.style.background = 'rgb(78, 76, 76)';
    document.body.style.backgroundColor = 'rgb(78, 76, 76)';
    navbar.style.backgroundColor = 'rgb(78, 76, 76)';
    addProduct.style.background = 'rgb(78, 76, 76)';
    addProduct.style.color = 'black';
    inputSearch.style.backgroundColor = 'rgb(78, 76,76)';
    categoryFilter.style.backgroundColor = 'rgb(78 , 76, 76)';
    let action = document.querySelectorAll('.icons-color');
    for (let act of action) {
        act.style.backgroundColor = 'rgb(78, 76,76)';
        act.parentElement.style.backgroundColor = 'rgb(78, 76,76)';
    }
}

//==============Function For show to default GUI   =============//
function show() {
    aside_left.style.background = '#fff';
    document.body.style.backgroundColor = '#fff';
    navbar.style.backgroundColor = '#fff';
    addProduct.style.background = 'orange';
    addProduct.style.color = '#fff';
    inputSearch.style.backgroundColor = '#fff';
    categoryFilter.style.backgroundColor = '#fff';
    let action = document.querySelectorAll('.icons-color');
    for (let act of action) {
        act.style.backgroundColor = 'orange';
        act.parentElement.style.backgroundColor = '#fff';
    }
}

//==============Function to Add product when click button add product   =============//
function addProductToList(e) {
    hide();
    formAddProduct.style.display = '';
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
        data.product.push(obj)
        saveLocalCategory()
        createTable()        
        formAddProduct.style.display = 'none';
        show()
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
};
//============== Call loadLocalCategory to local storage   =============//
loadLocalCategory();