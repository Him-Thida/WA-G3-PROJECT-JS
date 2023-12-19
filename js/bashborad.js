//==============Save Data to localStorage=============//
function saveLocalCategory() {
    localStorage.setItem("data", JSON.stringify(data));
}
//==============Function Load data from localStorage=============//
function loadLocalCategory() {
    let loadProducts = JSON.parse(localStorage.getItem("data"));
    if (loadProducts != undefined) {
        data = loadProducts;
    } else {
        saveLocalCategory();
    }
}
loadLocalCategory();
let inCome = document.querySelector('#income');
let category = document.querySelector('#category');
let stock = document.querySelector('#stock');
let sold = document.querySelector('#sold');
let tbody = document.querySelector('tbody');
inCome.textContent = data.bashboard.income + '$';
category.textContent = data.category.length;
stock.textContent = data.product.length;
sold.textContent = data.bashboard.sold;
let row;
let n = 0;
let mixValue = data.product[0].sold;
for (let p in data.product) {
    if (data.product[p].sold > mixValue) {
        mixValue = data.product[p].sold;
        row = data.product[p];
        for (let tr of tbody.children){
            console.log(tr)
        }
        let tr = document.createElement('tr');
        let tdID = document.createElement('td');
        let tdName = document.createElement('td');
        let tdCategory = document.createElement('td');
        let tdPrice = document.createElement('td');
        let tdAmount = document.createElement('td');
        tdID.textContent = row.id
        n = row.id;
        tdName.textContent = row.name;
        tdCategory.textContent = row.category;
        tdPrice.textContent = row.price;
        tdAmount.textContent = row.sold;
        tr.appendChild(tdID)
        tr.appendChild(tdName)
        tr.appendChild(tdCategory)
        tr.appendChild(tdPrice)
        tr.appendChild(tdAmount);
        tbody.appendChild(tr)
    }
}
