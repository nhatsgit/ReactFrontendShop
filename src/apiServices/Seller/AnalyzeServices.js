import request from "../../utils/request";

export function GetOrderAnalyze(mode) {
    return request.get('seller/Analyze/OrderAnalyze', {
        params: {
            mode: mode
        }
    })
        .then((res) => {

            return res.data;
        }).catch((e) => {

            return null;
        })
}
export function GetOrderChartData(mode) {
    return request.get('seller/Analyze/OrderChartData', {
        params: {
            mode: mode
        }
    })
        .then((res) => {

            return res.data;
        }).catch((e) => {

            return null;
        })
}
export function GetRevenueAnalyze(mode) {
    return request.get('seller/Analyze/RevenueAnalyze', {
        params: {
            mode: mode
        }
    })
        .then((res) => {

            return res.data;
        }).catch((e) => {

            return null;
        })
}
export function GetRevenueChartData(mode) {
    return request.get('seller/Analyze/RevenueChartData', {
        params: {
            mode: mode
        }
    })
        .then((res) => {

            return res.data;
        }).catch((e) => {

            return null;
        })
}
export function GetTopSaleProducts() {
    return request.get('seller/Analyze/TopSaleProducts')
        .then((res) => {

            return res.data;
        }).catch((e) => {

            return null;
        })
}
export function GetTopRevenueProducts() {
    return request.get('seller/Analyze/TopRevenueProducts')
        .then((res) => {

            return res.data;
        }).catch((e) => {

            return null;
        })
}
export function GetProductCategoryChartData() {
    return request.get('seller/Analyze/ProductCategoryChartData')
        .then((res) => {

            return res.data;
        }).catch((e) => {

            return null;
        })
}