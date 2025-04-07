import request from "../utils/request";

export function GetShoppingCarts() {
    return request.get('/cart', {
        params: {

        }
    }).then((res) => {
        return res.data;
    }).catch((e) => {

        return null;
    })
}

export function addToCart(productId, quantity) {
    const requestBody = { productId, quantity }
    return request.post(`cart/addToCart`, requestBody)
        .then((res) => {
            return res.data;
        }).catch(() => {
            console.log("error")
            return null;
        })
}
export function updateCartItem(productId, quantity) {
    const requestBody = { productId, quantity }
    return request.post(`ShoppingCart/updateCartItem`, requestBody)
        .then((res) => {
            return res.data;
        }).catch((e) => {
            console.log(e)
            return null;
        })
}
export function deleteCartItem(cartItemId) {
    return request.delete(`cartDetail/${cartItemId}`)
        .then((res) => {
            return res.data;
        }).catch((e) => {
            console.log(e)
            return null;
        })
}
export function GetVouchersCanUse(shopId) {
    return request.get('Vouchers', {
        params: {
            shopId: shopId
        }
    }).then((res) => {

        return res.data;
    }).catch((e) => {

        return null;
    })
}
export function CheckOutCart({ shoppingCartId, shippingAddress, notes, voucherId, paymentId }) {
    const requestBody = { shippingAddress, notes, voucherId, paymentId }
    return request.post('ShoppingCart/checkOut', requestBody, {
        params: {
            shoppingCartId: shoppingCartId
        }
    }).then((res) => {

        return res.data;
    }).catch((e) => {

        return null;
    })
}

