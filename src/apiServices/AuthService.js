import request from "../utils/request"

export function LoginRequest(userName, password) {
    const requestBody = { username: userName, password }
    return request.post('auth/login', requestBody)
        .then((res) => {
            return res.data;
        }).catch((e) => {
            console.log(e)
            return null;
        })
}
export function UserRegister({ userName, password, fullName, address, email, phoneNumber, avatarImage }) {
    const requestBody = { username: userName, password, fullName, address, email, phoneNumber }
    return request.post('auth/signUp', requestBody)
        .then((res) => {
            return res.data;
        }).catch((e) => {
            console.log(e)
            return null;
        })
}
export function GetMyInfo() {
    return request.get(`auth/me`)
        .then((res) => {
            return res.data;
        }).catch(() => {
            console.log("error")
            return null;
        })
}
// export function UserRegister({ userName, password, fullName, address, email, phoneNumber, avatarImage }) {
//     const formData = new FormData();
//     formData.append('username', userName);
//     formData.append('password', password);
//     formData.append('fullName', fullName);
//     formData.append('address', address);
//     formData.append('email', email);
//     formData.append('phoneNumber', phoneNumber);
//     formData.append('avatar', 'null');
//     if (avatarImage) {
//         formData.append("avatarImage", avatarImage);
//     }

//     return request.post(`auth/signUp`, formData, {
//         headers: {
//             'Content-Type': 'multipart/form-data',
//         }
//     })
//         .then((res) => {
//             return res.data;
//         }).catch((res) => {
//             console.log("error:", res.response.data)
//             return res.response.data;
//         })

// }
export function UpdateUserInfo({ userName, fullName, address, email, phoneNumber, avatarImage }) {
    const formData = new FormData();
    formData.append('userName', userName);
    formData.append('fullName', fullName);
    formData.append('address', address);
    formData.append('email', email);
    formData.append('phoneNumber', phoneNumber);
    formData.append('avatar', 'null');
    if (avatarImage) {
        formData.append("avatarImage", avatarImage);
    }

    return request.put(`Account/edit`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        }
    })
        .then((res) => {
            return res.data;
        }).catch((res) => {
            console.log("error:", res.response.data)
            return res.response.data;
        })

}
export function ChangePassword({ oldPassword, newPassword }) {
    const requestBody = { oldPassword, newPassword }
    return request.post('Account/changePassword', requestBody)
        .then((res) => {
            return res.data;
        }).catch((e) => {
            console.log(e);
            return null;
        })
}