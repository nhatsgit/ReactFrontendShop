import request from "../utils/request";

export function GetProvinces() {
    return request.get(`Address/GetProvinces`, {
        params: {

        }
    }).then((res) => {
        return res.data;
    }).catch(() => {
        console.log("error")
        return null;
    })
}
export function GetDistricts(provinceId) {
    return request.get(`Address/GetDistrictsByProvince`, {
        params: {
            provinceId: provinceId
        }
    }).then((res) => {
        return res.data;
    }).catch(() => {
        console.log("error")
        return null;
    })
}
export function GetWards(districtId) {
    return request.get(`Address/GetWardsByDistrict`, {
        params: {
            districtId: districtId
        }
    }).then((res) => {
        return res.data;
    }).catch(() => {
        console.log("error")
        return null;
    })
}