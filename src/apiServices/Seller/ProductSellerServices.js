import request from "../../utils/request";

export function QueryProductCurrentShop({
    keyword = null,
    categoryId = null,
    brandId = null,
    minPrice = null,
    maxPrice = null,
    daAn = null,
    daHet = null,
    pageNumber = 1,
    pageSize = 10 }) {
    return request.get('seller/Products/query', {
        params: {
            keyword: keyword,
            categoryId: categoryId,
            brandId: brandId,
            minPrice: minPrice,
            maxPrice: maxPrice,
            daAn: daAn,
            daHet: daHet,
            pageNumber: pageNumber,
            pageSize: pageSize,
        }
    }).then((res) => {
        return res.data;
    }).catch(() => {
        console.log("error")
        return null;
    })
}
export function CreateProduct(product, mainImage, additionalImages) {
    const formData = new FormData();
    for (const key in product) {
        if (product[key] !== null && product[key] !== undefined) {
            formData.append(key, product[key]);
        }
    }
    if (mainImage) {
        formData.append("AnhDaiDien", mainImage);
    }
    if (additionalImages && additionalImages.length > 0) {
        additionalImages.forEach((image, index) => {
            formData.append(`listImages`, image);
        });
    }
    return request.post(`seller/Products`, formData)
        .then((res) => {
            return res.data;
        }).catch(() => {
            console.log("error")
            return null;
        })
}
export function HideProduct(productId) {

    return request.delete(`seller/Products/${productId}`)
        .then((res) => {
            return res.data;
        }).catch(() => {
            console.log("error")
            return null;
        })
}

export function GetProductSellerById(id) {
    return request.get(`seller/Products/${id}`, {
        params: {

        }
    }).then((res) => {
        return res.data;
    }).catch(() => {
        console.log("error")
        return null;
    })
}
export function GetProductImagesById(id) {
    return request.get(`Products/productImage/${id}`, {
        params: {

        }
    }).then((res) => {
        return res.data;
    }).catch(() => {
        console.log("error")
        return null;
    })
}
export function UpdateProduct(product, mainImage, additionalImages) {
    const formData = new FormData();
    for (const key in product) {
        if (product[key] !== null && product[key] !== undefined) {
            formData.append(key, product[key]);
        }
    }
    if (mainImage) {
        formData.append("AnhDaiDien", mainImage);
    }
    if (additionalImages && additionalImages.length > 0) {
        additionalImages.forEach((image, index) => {
            formData.append(`listImages`, image);
        });
    }
    return request.put(`seller/Products/${product.productId}`, formData, {
        params: {
            id: product.productId
        }
    })
        .then((res) => {
            return res.data;
        }).catch(() => {
            console.log("error")
            return null;
        })
}
export function AddProductsByExcel(file) {
    if (!file) {
        throw new Error("Vui lòng chọn file Excel.");
    }

    const formData = new FormData();
    formData.append("file", file);
    return request.post(`seller/Products/excelAdd`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        }
    })
        .then((res) => {
            return res.data;
        }).catch(() => {
            console.log("error")
            return null;
        })

}