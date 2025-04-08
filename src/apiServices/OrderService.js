import request from "../utils/request"

export function GetMyOrders() {
    return request.get('order/getAllOrderByUser', {

    }).then((res) => {

        return res.data;
    }).catch((e) => {

        return null;
    })
}
export function GetOrderById(id) {
    return request.get(`order/getMyOrderByOrderId/${id}`)
        .then((res) => {
            return res.data;
        }).catch((e) => {
            return null;
        })
}
export function CancelOrder(orderId) {
    return request.post(`Orders/Cancel`, null, {
        params: {
            id: orderId
        }
    }).then((res) => {
        return res.data;
    }).catch(() => {
        console.log("error")
        return null;
    })
}
export function GiveBackOrder(orderId) {
    return request.post(`Orders/GiveBack`, null, {
        params: {
            id: orderId
        }
    }).then((res) => {
        return res.data;
    }).catch(() => {
        console.log("error")
        return null;
    })
}