import request from "../../utils/request";

export function GetShopDetail() {
    return request.get(`seller/Shops`)
        .then((res) => {
            return res.data;
        }).catch(() => {
            console.log("error")
            return null;
        })
}
export function UpdateShop(product, mainImage, backgroundImage) {
    const formData = new FormData();
    for (const key in product) {
        if (product[key] !== null && product[key] !== undefined) {
            formData.append(key, product[key]);
        }
    }
    if (mainImage) {
        formData.append("imageAvatar", mainImage);
    }
    if (backgroundImage) {
        formData.append("imageBackground", backgroundImage);
    }

    return request.put(`seller/Shops/edit`, formData)
        .then((res) => {
            return res.data;
        }).catch(() => {
            console.log("error")
            return null;
        })
}
export function GetShopCategories() {
    return request.get(`Shops/category`, {
        params: {

        }
    }).then((res) => {
        return res.data;
    }).catch(() => {
        console.log("error")
        return null;
    })
}