const table = document.querySelector("table");
const tbody = document.querySelector("tbody");
const aside_right = document.querySelector(".aside-right");
const form = document.querySelector("form");
const formAddCategory = document.querySelector('#addCategory');
const btnAdd = document.querySelector("#addProduct");
const saveBtn = document.querySelector("#save-category");
const descriptionCategory = document.querySelector("#categoryDescription");
const nameCategory = document.querySelector("#categoryName");
const search = document.querySelector("#search");
const backBtn = document.querySelector("#back");
const detailCategory = document.querySelector('#catDetail');
const close = document.querySelector('#close');
close.addEventListener('click', closeDetail);
btnAdd.addEventListener("click", addCategory);
saveBtn.addEventListener("click", saveCategory);
backBtn.addEventListener("click", backCategory);
search.addEventListener("input", searchCategory);
let i = 0;
let NumberIDcategory = 0;
//================== Function close the product detail =============//
function closeDetail(e) {
  detailCategory.style.display = 'none';
}
//================== Function Detail about product ===============//
function showDetail(e) {
  detailCategory.style.display = '';
  let categoryInformation = e.target.closest('tr').children[1].textContent;
  let categoryListName = data.category;
  let id = document.querySelector('.id');
  let name = document.querySelector('.name');
  let des = document.querySelector('.description');
  for (let i of categoryListName) {
    if (categoryInformation == i.category) {
      id.textContent = 'Category Id : ' + i.id;
      name.textContent = 'Category Name : ' + i.category;
      des.textContent = 'Descirption : ' + i.description;
    }
  }
}
//==============Function for clear input=============//
function clearForm() {
  nameCategory.value = "";
  descriptionCategory.value = "";
}

//==============Function back to list of Category=============//
function backCategory(e) {
  e.preventDefault();
  formAddCategory.style.display = "none";
  clearForm();
}

//==============Save Data to localStorage=============//
function saveLocalCategory() {
  localStorage.setItem("data", JSON.stringify(data));
}

//==============Function Load data from localStorage=============//
function loadLocalCategory() {
  let loadProducts = JSON.parse(localStorage.getItem("data"));
  if (loadProducts != undefined) {
    data = loadProducts;
    createTablerow();
  } else {
    saveLocalCategory();
  }
}

//==============Function search Category=============//
function searchCategory() {
  for (let searchCat of tbody.children) {
    if (searchCat.children[1].textContent.toLowerCase().includes(search.value.toLowerCase())) {
      searchCat.style.display = "";
    } else {
      searchCat.style.display = "none";
    }
  }
}

//==============Function delete category=============//
function deleteCategory(e) {
  let listNameOfCategory = data.category;
  let nameOfCategory = e.target.closest('tr');
  for (let name of listNameOfCategory) {
    if (name.category == nameOfCategory.children[1].textContent) {
      nameOfCategory.remove()
      listNameOfCategory.pop();
      saveLocalCategory()
    }
  }
}

//==============Function add category=============//
function addCategory() {
  formAddCategory.style.display = "";
}

//================= Function To add category name and save to local storage ============//
function saveCategory(event) {
  event.preventDefault();
  formAddCategory.style.display = "none";
  let run = true;
  let i = 0;
  let listNameOfCategory = data.category;
  for (let name of listNameOfCategory) {
    if (nameCategory.value == name.category) {
      i += 1
    }
  }
  if (i > 0) {
    run = false;
  }
  if (run && nameCategory.value !== '' && descriptionCategory.value != '') {
    let storeId = data.categoryID;
    if (storeId == null) {
      storeId = 1;
      data.categoryID = storeId
    } else {
      storeId += 1
      data.categoryID = storeId
    }
    let obj = {};
    obj.id = data.categoryID;
    obj.category = nameCategory.value;
    obj.description = descriptionCategory.value;
    data.category.push(obj);
    saveLocalCategory();
    createTablerow()
    run = true;
    clearForm();
  }
}

//==============Function craete category list as table=============//
function createTablerow() {
  let storeCategory = data.category;
  tbody.innerHTML = '';
  for (let obj of storeCategory) {
    let row = document.createElement("tr");
    let tdID = document.createElement("td");
    let tdName = document.createElement("td");
    tdID.textContent = obj.id;
    tdName.textContent = obj.category;
    let tdAction = document.createElement("td");
    tdAction.className = "action";
    let delButton = document.createElement("button");
    let viewButton = document.createElement("button");
    let iconDel = document.createElement("i");
    let spanDel = document.createElement("span");
    let iconView = document.createElement("i");
    let spanView = document.createElement("span");
    viewButton.setAttribute("id", "detail");
    viewButton.addEventListener('click', showDetail);
    delButton.setAttribute("id", "delete");
    delButton.addEventListener("click", deleteCategory);
    iconDel.className = "material-icons icons-color";
    iconView.className = "material-icons icons-color";
    iconDel.textContent = "delete";
    spanDel.textContent = "Delete";
    iconView.textContent = "create";
    spanView.textContent = "Detail";
    delButton.appendChild(iconDel);
    delButton.appendChild(spanDel);
    viewButton.appendChild(iconView);
    viewButton.appendChild(spanView);
    tdAction.appendChild(delButton);
    tdAction.appendChild(viewButton);
    row.appendChild(tdID);
    row.appendChild(tdName);
    row.appendChild(tdAction);
    tbody.appendChild(row);
  }
}

let data = {
  product: [],
  productID: null,
  category: [],
  categoryID: null,
  bashBoard: { sold: 0, income: 0 }
};

//==============Function for load Data to localStorage=============//
loadLocalCategory();