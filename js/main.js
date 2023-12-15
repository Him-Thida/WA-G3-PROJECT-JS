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
categoryFilter.addEventListener('change', filterProductWithCategory)
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

let data = {
  product: [],
  category: [],
  categoryID: null,
};
loadLocalCategory();
