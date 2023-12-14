const table = document.querySelector("table");
let tbody = document.querySelector("tbody");
let aside_left = document.querySelector('.aside-left');
const aside_right = document.querySelector(".aside-right");
const form = document.querySelector("form");
const btnAdd = document.querySelector("#addProduct");
const saveBtn = document.querySelector("#save-category");
const descirptionCategory = document.querySelector("#categoryDescription");
const nameCategory = document.querySelector("#categoryName");
const search = document.querySelector("#search");
const backBtn = document.querySelector("#back");
btnAdd.addEventListener("click", addCategory);
saveBtn.addEventListener("click", saveCategory);
backBtn.addEventListener("click", backCategory);
search.addEventListener("input", searchCategory);
let i = 0;
let NumberIDcategory = 0;
//==============Function for clear input=============//
function clearForm() {
  nameCategory.value = "";
  descirptionCategory.value = "";
}

//==============Function back to list of Category=============//
function backCategory(e) {
  e.preventDefault();
  table.style.display = "";
  form.style.display = "none";
  aside_left.style.background = '#fff'
  document.body.style.backgroundColor = '#fff';
  document.body.style.color = '#000';
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
  form.style.display = "";
  aside_left.style.background = 'rgb(78, 76, 76)';
  document.body.style.backgroundColor = 'rgb(78, 76, 76)';
  document.body.style.color = '#fff';
  // document.body.style.position = 'fixed';
}
function saveCategory(event) {
  aside_left.style.background = '#fff'
  document.body.style.backgroundColor = '#fff';
  document.body.style.color = '#000';
  event.preventDefault();
  form.style.display = "none";
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
  if (run) {
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
    obj.description = descirptionCategory.value;
    data.category.push(obj);
    saveLocalCategory();
    let row = document.createElement("tr");
    let tdID = document.createElement("td");
    let tdName = document.createElement("td");
    tdID.textContent = obj.id;
    tdName.textContent = obj.category;
    let tdAction = document.createElement("td");
    tdAction.className = "action";
    let delButton = document.createElement("button");
    let viewButton = document.createElement("button");
    let icondel = document.createElement("i");
    let spandel = document.createElement("span");
    let iconview = document.createElement("i");
    let spanview = document.createElement("span");
    viewButton.setAttribute("id", "detail");
    delButton.setAttribute("id", "delete");
    delButton.addEventListener("click", deleteCategory);
    icondel.className = "material-icons icons-color";
    iconview.className = "material-icons icons-color";
    icondel.textContent = "delete";
    spandel.textContent = "Delete";
    iconview.textContent = "create";
    spanview.textContent = "Detail";
    delButton.appendChild(icondel);
    delButton.appendChild(spandel);
    viewButton.appendChild(iconview);
    viewButton.appendChild(spanview);
    tdAction.appendChild(delButton);
    tdAction.appendChild(viewButton);
    row.appendChild(tdID);
    row.appendChild(tdName);
    row.appendChild(tdAction);
    tbody.appendChild(row);
    run = true;
    clearForm();
  }
}
//==============Function craete category list as table=============//
function createTablerow() {
  let storeCategory = data.category;
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
    let icondel = document.createElement("i");
    let spandel = document.createElement("span");
    let iconview = document.createElement("i");
    let spanview = document.createElement("span");
    viewButton.setAttribute("id", "detail");
    delButton.setAttribute("id", "delete");
    delButton.addEventListener("click", deleteCategory);
    icondel.className = "material-icons icons-color";
    iconview.className = "material-icons icons-color";
    icondel.textContent = "delete";
    spandel.textContent = "Delete";
    iconview.textContent = "create";
    spanview.textContent = "Detail";
    delButton.appendChild(icondel);
    delButton.appendChild(spandel);
    viewButton.appendChild(iconview);
    viewButton.appendChild(spanview);
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
  category: [],
  categoryID: null,
};
//==============Function for load Data to localStorage=============//
loadLocalCategory();