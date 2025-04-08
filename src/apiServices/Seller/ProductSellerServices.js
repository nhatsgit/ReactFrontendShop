import request from "../../utils/request";

export function QueryProductCurrentShop({
    keyword = null,
    categoryId = null,
    brandId = null,
    shopId = null,
    minPrice = null,
    maxPrice = null,
    pageNumber = 1,
    pageSize = 10 }) {
    return request.get('Products/queryForShop', {
        params: {
            keyword: keyword,
            categoryId: categoryId,
            brandId: brandId,
            shopId: shopId,
            minPrice: minPrice,
            maxPrice: maxPrice,
            page: pageNumber,
            pageSize: pageSize,
        }
    }).then((res) => {
        return res.data;
    }).catch(() => {
        console.log("error")
        return null;
    })
}
export function QueryProductDeleted({
    keyword = null,
    categoryId = null,
    brandId = null,
    shopId = null,
    minPrice = null,
    maxPrice = null,
    pageNumber = 1,
    pageSize = 10 }) {
    return request.get('Products/deleted', {
        params: {
            keyword: keyword,
            categoryId: categoryId,
            brandId: brandId,
            shopId: shopId,
            minPrice: minPrice,
            maxPrice: maxPrice,
            page: pageNumber,
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
            formData.append(`Images`, image);
        });
    }
    return request.post(`products`, formData)
        .then((res) => {
            return res.data;
        }).catch(() => {
            console.log("error")
            return null;
        })
}
export function HideProduct(productId) {

    return request.delete(`Products/${productId}`)
        .then((res) => {
            return res.data;
        }).catch(() => {
            console.log("error")
            return null;
        })
}

// export function GetProductSellerById(id) {
//     return request.get(`seller/Products/${id}`, {
//         params: {

//         }
//     }).then((res) => {
//         return res.data;
//     }).catch(() => {
//         console.log("error")
//         return null;
//     })
// }
export function GetProductSellerById(id) {
    return request.get(`Products/${id}`, {
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
    return request.put(`Products/${product._id}`, formData)
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