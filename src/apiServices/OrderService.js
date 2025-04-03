import request from "../utils/request"

export function GetMyOrders(currentPage) {
    return request.get('Orders', {
        params: {
            pageNumber: currentPage,
            pageSize: 5
        }
    }).then((res) => {

        return res.data;
    }).catch((e) => {

        return null;
    })
}
export function GetOrderById(id) {
    return request.get(`Orders/${id}`)
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