const table = document.querySelector("table");
let tbody = document.querySelector("tbody");
let aside_left = document.querySelector('.aside-left');
const aside_right = document.querySelector(".aside-right");
const form = document.querySelector("form");
const btnAdd = document.querySelector("#addProduct");
const saveBtn = document.querySelector("#save-category");
const descriptionCategory = document.querySelector("#categoryDescription");
const nameCategory = document.querySelector("#categoryName");
const search = document.querySelector("#search");
const backBtn = document.querySelector("#back");
let navbar = document.querySelector('nav');
const detailCategory = document.querySelector('.showDetail');
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
  e.target.parentElement.style.display = 'none';
  show()
}
//================== Function Detail about product ===============//
function showDetail(e) {
  hide()
  detailCategory.style.display = '';
  let categoryInformation = e.target.closest('tr').children[1].textContent;
  let categoryListName = data.category;
  let id = document.querySelector('.id');
  let name = document.querySelector('.name');
  let des = document.querySelector('.description');
  for (let i of categoryListName) {
    if (categoryInformation == i.category) {
      console.log(i)
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
  table.style.display = "";
  form.style.display = "none";
  show()
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


//======== Hide Element =======//
function hide() {
  aside_left.style.background = 'rgb(78, 76, 76)';
  document.body.style.backgroundColor = 'rgb(78, 76, 76)';
  navbar.style.backgroundColor = 'rgb(78, 76, 76)';
  btnAdd.style.backgroundColor = 'rgb(78, 76, 66)';
  btnAdd.style.color = '#000';
  search.style.background = 'rgb(78, 76, 66)';
  aside_left.setAttribute('style', 'box-shadow: 0px 0px 0px 0px');
  let action = document.querySelectorAll('.icons-color');
  for (let act of action) {
    act.style.backgroundColor = 'rgb(78, 76, 66)';
    act.parentElement.style.backgroundColor = 'rgb(78, 76, 66)';
  }

}
//============ Show Element ========//
function show() {
  aside_left.style.background = '#fff';
  document.body.style.backgroundColor = '#fff';
  navbar.style.backgroundColor = '#fff';
  btnAdd.style.color = '#fff';
  btnAdd.style.backgroundColor = 'orange';
  search.style.background = '#fff';
  aside_left.setAttribute('style', 'box-shadow: 0px 3px 2px 2px orange');
  let action = document.querySelectorAll('.icons-color');
  for (let act of action) {
    act.style.backgroundColor = 'orange';
    act.parentElement.style.backgroundColor = '#fff';
  }
}
//==============Function add category=============//
function addCategory() {
  form.style.display = "";
  hide()
}

//================= Function To add category name and save to local storage ============//
function saveCategory(event) {
  event.preventDefault();
  aside_left.style.background = '#fff'
  document.body.style.backgroundColor = '#fff';
  document.body.style.color = '#000';
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
  show()
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
  bashboard : {sold : 0, income: 0}
};
//==============Function for load Data to localStorage=============//
loadLocalCategory();