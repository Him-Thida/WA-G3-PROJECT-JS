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

inCome.textContent = data.income +'$';
category.textContent = data.category.length;
