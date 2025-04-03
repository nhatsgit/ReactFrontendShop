import request from "../../utils/request";

export function GetShopOwner() {
    return request.get(`admin/Shops`).then((res) => {
        return res.data;
    }).catch(() => {
        console.log("error")
        return null;
    })
}
export function GetShopOwnerDetails(id) {
    return request.get(`admin/Shops/${id}`, {
        params: {

        }
    }).then((res) => {
        return res.data;
    }).catch(() => {
        console.log("error")
        return null;
    })
}
export function BlockShop(userId) {
    return request.post(`admin/Shops/block`, null, {
        params: {
            userId: userId
        }
    }).then((res) => {
        return res.data;
    }).catch(() => {
        console.log("error")
        return null;
    })
}
export function UnBlockShop(userId) {
    return request.post(`admin/Shops/unblock`, null, {
        params: {
            userId: userId
        }
    }).then((res) => {
        return res.data;
    }).catch(() => {
        console.log("error")
        return null;
    })
}
export function ResetPasswordShop(userId) {
    return request.post(`admin/Shops/resetPass`, null, {
        params: {
            userId: userId
        }
    }).then((res) => {
        return res.data;
    }).catch(() => {
        console.log("error")
        return null;
    })
}
export function CreateShopOwner(account) {
    return request.post('admin/Shops', account)
        .then((res) => {

            return res.data;
        }).catch((e) => {

            return null;
        })
}
