import { cart } from "../data/cart.js";
import { product } from "../data/product.js";

function renderProduct(){
    let rendererProduct = ``
    let rendererSummary = ``
    let totalPrice = 0;
    let totalItem = 0;
    cart.forEach((cart) => {
        // product //
        let sama;
        product.forEach((product) => {
            if(cart.id === product.id)
                sama = product
        })
        rendererProduct += `
        <div class="product-container">
            <div class="product-left">
                <img src="${sama.image}" class="product-image">
            </div>
            <div class="product-right">
                <div class="product-top">
                    <div class="product-name">${sama.name}</div>
                </div>
                <div class="product-mid">
                    <div class="product-information">no-box</div>
                </div>
                <div class="product-bot">
                    <div class="quantity">
                        <div class="quantity-left">
                            <button class="quantity-button minus" data-id="${cart.id}">-</button>
                            <div class="quantity-count">${cart.quantity}</div>
                            <button class="quantity-button add" data-id="${cart.id}">+</button>
                        </div>
                        <div class="quantity-right">
                            <button class="delete-button" data-id="${cart.id}">
                                <img src="image/delete.png" class="delete-image">
                            </button>
                        </div>
                    </div>
                    <div class="product-price">Rp${(cart.quantity*sama.price).toLocaleString('id-ID')}</div>
                </div>
            </div>
        </div>
        `
        // summary //
        
        totalItem += cart.quantity
        
        totalPrice += cart.quantity*sama.price
    })
    rendererSummary += `
        <div class="summary-top">
            <div class="summary-title">Ringkasan Belanja</div>
            <div class="summary-inform">
                <div class="summary-inform-left">
                    <div class="item-total">Item (${totalItem}):</div>
                    <div class="tax-total">Tax (10%):</div>
                </div>
                <div class="summary-inform-right">
                    <div class="item-total-price">Rp${totalPrice.toLocaleString('id-ID')}</div>
                    <div class="tax-total-price">Rp${(totalPrice*10/100).toLocaleString('id-ID')}</div>
                </div>
            </div>
        </div>
        <div class="summary-bot">
            <div class="summary-total">
                <div class="summary-total-left">Total</div>
                <div class="summary-total-right">Rp${((totalPrice*10/100)+totalPrice).toLocaleString('id-ID')}</div>
            </div>
            <button class="order-button">Buat Order</button>
        </div> 
        `
    document.querySelector('.summary').innerHTML = rendererSummary
    document.querySelector('.cart-container').innerHTML = rendererProduct
    document.querySelectorAll('.minus').forEach((button) => {
        button.addEventListener('click',() => {
            updateQuantity(parseInt(button.dataset.id),-1)
        })
    })
    document.querySelectorAll('.add').forEach((button) => {
        button.addEventListener('click',() => {
            updateQuantity(parseInt(button.dataset.id),1)
        })
    })
    document.querySelectorAll('.delete-button').forEach((button) => {
        button.addEventListener('click',() => {
            updateQuantity(parseInt(button.dataset.id),0)
        })
    })
}

renderProduct()

function updateQuantity(idbutton,num) {
    let sama;
    let ind;
    cart.forEach((item,index) => {
        if(idbutton===item.id){
            sama = item
            ind = index
        }
    })
    if(sama&&num===0){
        sama.quantity = num
    }else if(sama){
        sama.quantity += num
    }
    if(sama.quantity===0){
        cart.splice(ind,1)
    }
    localStorage.setItem('cart',JSON.stringify(cart))
    renderProduct()
    console.log(cart)
}