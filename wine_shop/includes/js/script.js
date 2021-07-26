const product_json = [{
    id:'1',
    name:'Domaine Serene 1',
    price:'6',
    catagory:'drinks'
},
{
    id:'2',
    name:'Domaine Serene 2',
    price:'6',
    catagory:'drinks'
},
{
    id:'3',
    name:'Domaine Serene 3',
    price:'6',
    catagory:'drinks'
},
{
    id:'3',
    name:'Domaine Serene 1',
    price:'6',
    catagory:'food'
},
{
    id:'4',
    name:'Domaine Serene 2',
    price:'6',
    catagory:'food'
},
{
    id:'5',
    name:'Domaine Serene 3',
    price:'6',
    catagory:'food'
},
{
    id:'6',
    name:'Domaine Serene 12',
    price:'6',
    catagory:'dessert'
},
{
    id:'7',
    name:'Domaine Serene 11',
    price:'6',
    catagory:'dessert'
},
{
    id:'8',
    name:'Domaine Serene',
    price:'6',
    catagory:'dessert'
}];

window.addEventListener('DOMContentLoaded', () => {

    const bill_section = document.getElementById('bill-section');
    const toggle_split = document.getElementById('toggle-split');
    const toggle_bill = document.getElementById('toggle-bill');

    // Toggle Split
    toggle_split.addEventListener('click',function(){
        this.classList.toggle('active');
    });

    // Toggle bill in mobile
    toggle_bill.addEventListener('click',function(){
        bill_section.classList.toggle('active');
    })

    Products.setup();
    Billing.setup();

    const switcher = document.querySelector('ul.switch-product-tab');

    switcher.querySelector('li.drinks-tab').addEventListener('click', (e) => changeTab(e, 'drinks'))
    switcher.querySelector('li.food-tab').addEventListener('click', (e) => changeTab(e, 'food'))
    switcher.querySelector('li.dessert-tab').addEventListener('click', (e) => changeTab(e, 'dessert'))


    const products = new Products();

    products.render();
});

const changeTab = (event, whichTab) => {

    [...document.querySelectorAll('.tab-section .tab-content')].map(x => x.classList.remove('active'));
    [...document.querySelectorAll('ul.switch-product-tab li')].map(x => x.classList.remove('active'));

    event.currentTarget.classList.add('active');

    switch(whichTab) {

        case 'drinks':
            return Products.drinksContainer.classList.add('active');
        
        case 'food':
            return Products.foodContainer.classList.add('active');
            
        case 'dessert':
            return Products.desertContainer.classList.add('active');

        default: 
            return Products.drinksContainer.classList.add('active');
    }
}

class Products extends Map {

    constructor() {

        super();

        this.billings = new Billing(this);

        this.selectedProducts = new Map();
        
        this.fetch();
    }

    static setup() {

        const tabSection = document.querySelector('.tab-section');

        Products.drinksContainer = tabSection.querySelector('#drinks');
        Products.foodContainer = tabSection.querySelector('#food');
        Products.desertContainer = tabSection.querySelector('#desert');
    }

    /* This method performs the api call to fetch the data. But in this usecase we are taking data from a static json. */
    fetch() {

        const response = product_json;

        this.process(response);
    }

    /* This method process the data in a  */
    process(response) {

        const products = new Map();

        for(const data of response) {

            if(!products.get(data.catagory)) {
                this.selectedProducts.set(data.catagory, new Set());
                products.set(data.catagory, []);
            }

            products.get(data.catagory).push(data);
        }

        this.billings.update();
        this.clear();

        for(const [key, value] of products) {

            this.set(key, new Lists(value, this))
        }
    }

    render() {

        Products.drinksContainer.textContent = null;
        Products.foodContainer.textContent = null;
        Products.desertContainer.textContent = null;
        

        for(const [key, value] of this) {

            if(key == 'drinks') {
                Products.drinksContainer.appendChild(value.container);
            }
            else if(key == 'food') {
                Products.foodContainer.appendChild(value.container);
            }
            else if(key == 'dessert') {
                Products.desertContainer.appendChild(value.container);
            }
        }
    }
}

class Lists extends Set {

    constructor(items, products) {

        super();

        this.products = products;

        for(const item of items) {

            this.add(new List(item, this));
        }
    }

    get container() {

        if(this.containerElement) {
            return this.containerElement;
        }

        const container = this.containerElement = document.createDocumentFragment();

        container.appendChild(this.customSelect);
        container.appendChild(this.listContainer);

        return container;
    }

    render() {

        const container = this.listContainer;
        container.innerHTML = ``;

        for(const item of this) {

            container.appendChild(item.container);
        }

        if(!this.size) {

            container.innerHTML = `<div class="NA">No listings found in this category</div>`;
        }
    }

    get listContainer() {

        if(this.listContainerElement) {

            return this.listContainerElement;
        }

        const container = this.listContainerElement = document.createElement('div');
        container.classList.add('product-tiles-container');

        this.render();

        return container;
    }

    get customSelect() {

        if(this.customSelectElement) {
            return this.customSelectElement;
        }

        const container = this.customSelectElement = document.createElement('div');
        container.classList.add('custom-select');

        container.innerHTML = `
            <select name="" id="">
                <option>Wine</option>
                <option>Wine</option>
                <option>Wine</option>
            </select>
        `;

        return container;
    }
}

class List {

    constructor(item, lists) {

        Object.assign(this, item);

        this.lists = lists;
        this.quantity = 0;
    }

    get container() {

        if(this.containerElement) {
            return this.containerElement
        }

        const container = this.containerElement = document.createElement('div');
        container.classList.add('product-tile');

        container.innerHTML = ` 
            <div class="product-img">
                <img src="./images/wine.png" alt="Product" />
            </div>
            <div class="details">
                <div class="name-price">
                    <h4 class="name">${this.name}</h4>
                    <span class="price">$${this.price}</span>
                </div>
                <div class="counter">
                    <button class="subtract">-</button>
                    <input type="number" value="${this.quantity}" class="num" />
                    <button class="add">+</button>
                </div>
            </div>
        `;

        const counter = container.querySelector('.counter');

        counter.querySelector('.subtract').addEventListener('click', () => {
            
            this.quantity--;

            if(this.quantity <= 0) {
                this.quantity = 0;
                this.lists.products.selectedProducts.get(this.catagory).delete(this);
            }
            else {
                this.lists.products.selectedProducts.get(this.catagory).add(this);
            }

            this.bill = this.quantity;
            this.lists.products.billings.update();
            this.render();
        });

        counter.querySelector('.add').addEventListener('click', () => {
            
            this.quantity++

            this.bill = this.quantity;
            this.lists.products.selectedProducts.get(this.catagory).add(this);
            this.lists.products.billings.update();
            this.render();
        });

        return container;
    }

    get total() {

        return this.quantity * this.price;
    }

    get bill() {

        if(this.billContainerElement) {
            return this.billContainerElement;
        }

        const container = this.billContainerElement = document.createElement('li');

        container.innerHTML = `
            <span class="product-name">${this.name}</span>
            <span class="price-quantity">
                <span class="price">$${this.price}</span>
                <span>x</span>
                <span class="quantity">${this.quantity}</span>
            </span>
            <span class="total">$${this.total}</span>
        `;

        return container;
    }

    set bill(value) {

        const bill = this.bill;

        bill.querySelector('.quantity').textContent = value;
        bill.querySelector('.total').textContent = '$' + this.total;
    }

    render() {

        const container = this.container;

        container.querySelector('.details input').value = this.quantity;
    }
}

class Billing {

    static setup() {

        Billing.payButton = document.querySelector('.pay-button button');
        Billing.subtotal = document.querySelector('.subtotal');
        Billing.mainContainer = document.querySelector('.product-pay-container .product-for-buy');
    }

    constructor(product) {

        this.product = product;
        this.bills = [];
    }

    update() {

        this.bills = [];

        for(const [cat, product] of this.product.selectedProducts) {

            this.bills.push(new Bill(cat, product, this))
        }

        this.render();
    }

    render() {

        Billing.mainContainer.textContent = null;

        let total = 0;

        for(const bill of this.bills) {

            total += bill.total;
            
            Billing.mainContainer.appendChild(bill.container);
        }

        if(!this.bills.length) {
            Billing.mainContainer.innerHTML = `<div class="NA"> No items Selected</div>`;
        }

        Billing.subtotal.textContent = '$' + total;
        Billing.payButton.textContent = 'PAY $' + total;
    }
}

class Bill {

    constructor(category, product, billing) {

        this.category = category;
        this.items = product;
        this.billing = billing;
    }

    get container() {

        if(this.containerElement) {
            return this.containerElement;
        }

        const container = this.containerElement = document.createElement('div');
        container.classList.add('product-price-details');

        container.innerHTML = `
            <div class="top-row">
                <span class="cat-name">${this.category}</span>
                <span class="cat-total">$${this.total}</span>
            </div>
            <ul class="product-pricing">
            </ul>
        `;

        this.render();

        return container;
    }

    render() {

        const ul = this.container.querySelector('ul')

        for(const item of this.items) {

            ul.appendChild(item.bill);
        }

        if(!this.items.size) {
            ul.innerHTML = `<li><span class="NA">Nothing selected in ${this.category} category</li>`;
        }
    }

    get total() {

        let total = 0;

        for(const item of this.items) {
            total += item.total;
        }

        return total;
    }
}