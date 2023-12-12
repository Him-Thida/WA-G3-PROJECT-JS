let addProduct = document.querySelector('#addProduct');
addProduct.addEventListener('click', createProduct)
// console.log(addProduct)
// function saveArrayObj() {
//     localStorage.setItem('arrayObj', JSON.stringify(arrayObj));
// }
// function loadArrayObj() {
//     JSON.parse(localStorage.getItem('productsData'));
// }
// function createCardObj(){
//     for (let obj of arrayObj){
//         createCard(obj)
//         console.log(obj)
//     }
// }   
// createCardObj()
// function createCard(obj){
//     let card = document.createElement('div');
//     card.className = 'card';
//     let image = document.createElement('img');
//     image.src = obj.image;
//     card.appendChild(image);
    
// }
function createProduct(){
    let table = document.querySelector('table');
    table.remove()
    
}

// saveArrayObj()
// loadArrayObj()