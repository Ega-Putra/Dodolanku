import { product } from "../data/product.js"
import { cart } from "../data/cart.js"

function ratingCount(num) {
    let stars = ''
    for (let i=0;i<num;i++) {
        stars += '★'
    }
    return stars
};

function renderProduct(){
    let renderer = ``
    product.forEach((product) => {
        renderer += `
        <div class="product-container">
            <div class="product-top">
                <img src="${product.image}" class="product-image">
            </div>
            <div class="product-bot">
                <div class="product-name">${product.name}</div>
                <div class="product-rating">${ratingCount(product.rating)}</div>
                <div class="product-price">Rp${product.price.toLocaleString('id-ID')}</div>
                <button class="product-button" data-id="${product.id}">+ Keranjang</button>
            </div>
        </div>
        `
    })
    document.querySelector('.catalog-container').innerHTML = renderer

    document.querySelectorAll('.product-button').forEach((button) => {
        button.addEventListener('click',() => {
            addToCart(parseInt(button.dataset.id))
        })
    })
}

function renderCartCount(){
    let totalItem = 0
    cart.forEach((cart) => {
        totalItem += cart.quantity
    })
    document.querySelector('.cart-counter').innerHTML = totalItem
}

function addToCart(idbutton){
    let sama;
    cart.forEach((item) => {
        if(idbutton===item.id){
            sama = item
        }    
    })
    if(sama){
        sama.quantity += 1
    } else {
        cart.push({
            id: idbutton,
            quantity: 1
        }
        )
    }
    renderCartCount()
    localStorage.setItem('cart',JSON.stringify(cart))
}

renderProduct()
renderCartCount()