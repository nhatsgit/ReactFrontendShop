import request from "../../utils/request";

export function GetAllVouchers(currentPage) {
    return request.get('seller/Vouchers', {
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
export function GetExpiredVouchers(currentPage) {
    return request.get('seller/Vouchers/Expired', {
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
export function GetUnamountVouchers(currentPage) {
    return request.get('seller/Vouchers/Unamount', {
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
export function CreateVoucherSeller(voucher) {
    return request.post('seller/Vouchers', voucher)
        .then((res) => {

            return res.data;
        }).catch((e) => {

            return null;
        })
}
export function EditVoucherSeller(id, voucher) {
    return request.put(`seller/Vouchers/${id}`, voucher)
        .then((res) => {

            return res.data;
        }).catch((e) => {
            return null;
        })
}
export function GetVoucherSellerById(id) {
    return request.get(`seller/Vouchers/${id}`)
        .then((res) => {
            return res.data;
        }).catch((e) => {
            return null;
        })
}
export function EndVoucherSellerById(id) {
    return request.delete(`seller/Vouchers/${id}`)
        .then((res) => {
            return res.data;
        }).catch((e) => {
            return null;
        })
}