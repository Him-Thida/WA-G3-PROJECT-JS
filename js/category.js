const table = document.querySelector('table');
let tbody = document.querySelector('tbody');
const aside_right = document.querySelector('.aside-right');
const form = document.querySelector('form')
const btnAdd = document.querySelector('#addProduct');
const savebtn = document.querySelector('#save-category');
const descirptionCategory = document.querySelector('#categoryDescription');
const nameCategory = document.querySelector('#categoryName');
btnAdd.addEventListener('click', addCategory);
savebtn.addEventListener('click', saveCategory);
const backBtn = document.querySelector('#back');
backBtn.addEventListener('click', backCategory);
let i = 0;
let run = false;
let NumberIDcategory = 0;
function clearForm() {
    nameCategory.value = '';
    descirptionCategory.value = '';
}
function backCategory(e){
    e.preventDefault()
    table.style.display = '';
    form.style.display = 'none';
}
function saveLocalCategory() {
    localStorage.setItem('data', JSON.stringify(data));
}
function loadLocalCategory() {
    let loadProducts = JSON.parse(localStorage.getItem('data'));
    if (loadProducts != undefined) {
        data = loadProducts
        createTablerow()
    }
    else {
        saveLocalCategory()
    }
}
function addCategory() {
    table.style.display = 'none';
    form.style.display = ''
}
function saveCategory(event) {
    table.style.display = ''
    form.style.display = 'none';
    NumberIDcategory += 1;
    event.preventDefault();
    let obj = {};
    obj.id = NumberIDcategory;
    obj.category = nameCategory.value;
    obj.description = descirptionCategory.value;
    data.category.push(obj)
    saveLocalCategory()
    clearForm()
    createTablerow()
}
function createTablerow() {
    let storeCategory = data.category;    
    for (let obj of storeCategory){
        let row = document.createElement('tr');
        let tdID = document.createElement('td');
        let tdName = document.createElement('td');
        tdID.textContent = obj.id;
        tdName.textContent = obj.category;
        let tdAction = document.createElement('td');
        tdAction.className = 'action';
        let delButton = document.createElement('button');
        let viewButton = document.createElement('button');
        let icondel =document.createElement('i');
        let spandel = document.createElement('span');
        let iconview =document.createElement('i');
        let spanview = document.createElement('span');
        viewButton.setAttribute('id', 'detail');
        delButton.setAttribute('id', 'delete');
        icondel.className = 'material-icons icons-color';
        iconview.className = 'material-icons icons-color';
        icondel.textContent = 'delete';
        spandel.textContent = 'Delete';
        iconview.textContent = 'create';
        spanview.textContent = 'Detail';
        delButton.appendChild(icondel);
        delButton.appendChild(spandel);
        viewButton.appendChild(iconview);
        viewButton.appendChild(spanview);
        tdAction.appendChild(delButton);
        tdAction.appendChild(viewButton);
        row.appendChild(tdID);
        row.appendChild(tdName);
        row.appendChild(tdAction);
        tbody.appendChild(row)
        run = true;
    }
}
let data = {
    product: [],
    category: [],
    categoryID: null
}
loadLocalCategory()