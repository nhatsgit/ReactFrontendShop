import request from "../../utils/request";

export function GetAllOrders(currentPage, date) {
    return request.get('seller/Orders', {
        params: {
            pageNumber: currentPage,
            pageSize: 5,
            date: date
        }
    }).then((res) => {

        return res.data;
    }).catch((e) => {

        return null;
    })
}
export function GetNotConfirmOrders(currentPage) {
    return request.get('seller/Orders/NotConfirm', {
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
export function GetDeliveredOrders(currentPage) {
    return request.get('seller/Orders/Delivered', {
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
export function GetCanceledOrders(currentPage) {
    return request.get('seller/Orders/Canceled', {
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
export function GetRequestReturnOrders(currentPage) {
    return request.get('seller/Orders/RequestReturn', {
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
export function GetReturnedOrders(currentPage) {
    return request.get('seller/Orders/Returned', {
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
export function GetOrderSellerById(id) {
    return request.get(`seller/Orders/${id}`)
        .then((res) => {
            return res.data;
        }).catch((e) => {
            return null;
        })
}
export function UpdateStatus(id) {
    return request.post(`seller/Orders/UpdateStatus`, null, {
        params: {
            orderId: id
        }
    })
        .then((res) => {
            return res.data;
        }).catch((e) => {
            return null;
        })
}
