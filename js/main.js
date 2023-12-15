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
  } else {
    saveLocalCategory();
  }
}
let categoryFilter = document.querySelector(".categories");
let addProduct = document.querySelector('#addProduct');
let tbody = document.querySelector('tbody');
let inputSearch = document.querySelector('input');
let rows = document.querySelectorAll('Table tbody tr');
let buttonDelte=document.querySelectorAll('.delete');
categoryFilter.addEventListener('change', filterProductWithCategory)
inputSearch.addEventListener('input', searchText);
function filterProductWithCategory(){
    for (let tr of tbody.children){
        if (tr.children[2].textContent == categoryFilter.value){
            tr.style.display = '';
        }else if(categoryFilter.value == 'All Category'){
            tr.style.display = '';
        }
        else{
            tr.style.display = 'none';
        }
    }
}
function completeFilterCategory(){
    let categoryName = data.category;
    for (let name of categoryName){
        let option = document.createElement('option');
        option.textContent = name.category;
        option.setAttribute('value', name.category);
        categoryFilter.appendChild(option)
    }
}
function deLete(event) {
    event.target.closest('tr').remove();
};
for (let btn of buttonDelte){
    btn.addEventListener('click', deLete)
}
function searchText(){
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
let data = {
  product: [],
  category: [],
  categoryID: null,
};
loadLocalCategory();