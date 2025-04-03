import request from "../../utils/request";

export function GetStaff() {
    return request.get('seller/Staff')
        .then((res) => {

            return res.data;
        }).catch((e) => {

            return null;
        })
}
export function CreateStaff(staff) {
    return request.post('seller/Staff', staff)
        .then((res) => {

            return res.data;
        }).catch((e) => {

            return null;
        })
}
export function ResetPasswordStaff(userName) {
    return request.post(`seller/Staff/ResetPassword`, null, {
        params: {
            userName: userName
        }
    }).then((res) => {
        return res.data;
    }).catch(() => {
        console.log("error")
        return null;
    })
}
export function DisableStaff(userName) {
    return request.post(`seller/Staff/DisableStaff`, null, {
        params: {
            userName: userName
        }
    }).then((res) => {
        return res.data;
    }).catch(() => {
        console.log("error")
        return null;
    })
}