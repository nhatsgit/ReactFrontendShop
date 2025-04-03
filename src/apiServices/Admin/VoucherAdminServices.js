import request from "../../utils/request";

export function GetAminVouchers() {
    return request.get(`admin/Vouchers`).then((res) => {
        return res.data;
    }).catch(() => {
        console.log("error")
        return null;
    })
}
export function CreateVoucherAdmin(voucher) {
    return request.post('admin/Vouchers', voucher)
        .then((res) => {

            return res.data;
        }).catch((e) => {

            return null;
        })
}
export function EditVoucherAdmin(id, voucher) {
    return request.put(`admin/Vouchers/${id}`, voucher)
        .then((res) => {

            return res.data;
        }).catch((e) => {
            return null;
        })
}
export function GetVoucherAdminById(id) {
    return request.get(`admin/Vouchers/${id}`)
        .then((res) => {
            return res.data;
        }).catch((e) => {
            return null;
        })
}
export function EndVoucherAdminById(id) {
    return request.delete(`admin/Vouchers/${id}`)
        .then((res) => {
            return res.data;
        }).catch((e) => {
            return null;
        })
}