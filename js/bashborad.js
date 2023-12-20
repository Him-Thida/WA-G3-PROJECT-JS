//============== Save Data to localStorage =============//
function saveLocalCategory() {
    localStorage.setItem("data", JSON.stringify(data));
}

//============== Function Load data from localStorage =============//
function loadLocalCategory() {
    let loadProducts = JSON.parse(localStorage.getItem("data"));
    if (loadProducts != undefined) {
        data = loadProducts;
    } else {
        saveLocalCategory();
    }
}

let data = {
    product: [],
    productID: null,
    category: [],
    categoryID: null,
    bashBoard : {sold : 0, income: 0}
};
loadLocalCategory();
let inCome = document.querySelector('#income');
let category = document.querySelector('#category');
let stock = document.querySelector('#stock');
let sold = document.querySelector('#sold');
let tbody = document.querySelector('tbody');
inCome.textContent = data.bashBoard.income + '$';
category.textContent = data.category.length;
sold.textContent = data.bashBoard.sold;
let sum = 0;

//========= Count all prodcut in stock ======//
for (let sto of data.product) {
    sum += Number(sto.quantity);
}
stock.textContent = sum;
let row;
let n = 0;
let index = 0;
let mixValue = Number(data.product[0].sold);

//======== Find top one produt =======//
for (let p in data.product) {
    if (Number(data.product[p].sold) > mixValue) {
        mixValue = data.product[p].sold;
        index = p;

    }
}
row = data.product[index];
console.log(top)
let tr = document.createElement('tr');
let tdID = document.createElement('td');
let tdName = document.createElement('td');
let tdCategory = document.createElement('td');
let tdPrice = document.createElement('td');
let tdAmount = document.createElement('td');
tdID.textContent = row.id
n = row.id;
tdName.textContent = row.id;
tdCategory.textContent = row.category;
tdPrice.textContent = row.price;
tdAmount.textContent = row.sold;
tr.appendChild(tdID)
tr.appendChild(tdName)
tr.appendChild(tdCategory)
tr.appendChild(tdPrice)
tr.appendChild(tdAmount);
tbody.appendChild(tr)
