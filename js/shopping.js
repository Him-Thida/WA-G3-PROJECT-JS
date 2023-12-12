
function saveArrayObj() {
    localStorage.setItem('arrayObj', JSON.stringify(arrayObj));
}
function loadArrayObj() {
    JSON.parse(localStorage.getItem('productsData'));
}
const arrayObj =[
        { name: 'couple and family clother', stock: 100, price: '5$', categories: 'clothes', image: 'c1.jpg', discription: 'new product form cambodia that beautiful' },
        { name: 'couple and family clother', stock: 100, price: '5$', categories: 'clothes', image: 'c1.jpg', discription: 'new product form cambodia that beautiful' },
        { name: 'couple and family clother', stock: 100, price: '5$', categories: 'clothes', image: 'c1.jpg', discription: 'new product form cambodia that beautiful' },
        { name: 'couple and family clother', stock: 100, price: '5$', categories: 'clothes', image: 'c1.jpg', discription: 'new product form cambodia that beautiful' },
        { name: 'couple and family clother', stock: 100, price: '5$', categories: 'clothes', image: 'c1.jpg', discription: 'new product form cambodia that beautiful' },
        { name: 'couple and family clother', stock: 100, price: '5$', categories: 'clothes', image: 'c1.jpg', discription: 'new product form cambodia that beautiful' },
        { name: 'couple and family clother', stock: 100, price: '5$', categories: 'clothes', image: 'c1.jpg', discription: 'new product form cambodia that beautiful' },
        { name: 'couple and family clother', stock: 100, price: '5$', categories: 'clothes', image: 'c1.jpg', discription: 'new product form cambodia that beautiful' },
        { name: 'couple and family clother', stock: 100, price: '5$', categories: 'clothes', image: 'c1.jpg', discription: 'new product form cambodia that beautiful' },
        { name: 'couple and family clother', stock: 100, price: '5$', categories: 'clothes', image: 'c1.jpg', discription: 'new product form cambodia that beautiful' },
        { name: 'couple and family clother', stock: 100, price: '5$', categories: 'clothes', image: 'c1.jpg', discription: 'new product form cambodia that beautiful' }
]
function createCardObj(){
    for (let obj of arrayObj){
        createCard(obj)
        console.log(obj)
    }
}   
createCardObj()
function createCard(obj){
    let card = document.createElement('div');
    card.className = 'card';
    let image = document.createElement('img');
    image.src = obj.image;
    card.appendChild(image);
    let card_body = document.createElement('div');
    let span_title = document.createElement('span');
    let span_stock = document.createElement('span');
    let span_price = document.createElement('span');



    
}

saveArrayObj()
loadArrayObj()