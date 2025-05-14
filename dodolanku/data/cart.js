export const cart = JSON.parse(localStorage.getItem('cart'))||[
    {
        id: 111,
        quantity: 1
    },
    {
        id: 112,
        quantity: 1
    }
]