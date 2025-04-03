import request from "../utils/request"

export function GetRandomProduct() {
    return request.get('Products/suggestionsToday', {
        params: {

        }
    }).then((res) => {
        return res.data;
    }).catch(() => {
        console.log("error")
        return null;
    })
}
export function GetRandom3Product() {
    return request.get('Products/sliderBar', {
        params: {

        }
    }).then((res) => {
        return res.data;
    }).catch(() => {
        console.log("error")
        return null;
    })
}
export function GetProductById(id) {
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
export function GetCategoryName(id) {
    return request.get(`Categories/${id}`, {
        params: {

        }
    }).then((res) => {
        return res.data.tenLoai;
    }).catch(() => {
        console.log("error")
        return null;
    })
}
export function GetBrandName(id) {
    return request.get(`Brands/${id}`, {
        params: {

        }
    }).then((res) => {
        return res.data.tenNhanHieu;
    }).catch(() => {
        console.log("error")
        return null;
    })
}
export function GetShop(id) {
    return request.get(`Shops/${id}`, {
        params: {

        }
    }).then((res) => {
        return res.data;
    }).catch(() => {
        console.log("error")
        return null;
    })
}
export function QueryProduct({
    keyword = null,
    categoryId = null,
    brandId = null,
    shopId = null,
    minPrice = null,
    maxPrice = null,
    pageNumber = 1,
    pageSize = 10 }) {
    return request.get('Products/query', {
        params: {
            keyword: keyword,
            categoryId: categoryId,
            brandId: brandId,
            shopId: shopId,
            minPrice: minPrice,
            maxPrice: maxPrice,
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
export function GetCategoriesFromQuery({
    keyword = null,
    brandId = null,
    shopId = null,
    minPrice = null,
    maxPrice = null }) {
    return request.get('Products/getCategoriesFromQuerry', {
        params: {
            keyword: keyword,
            brandId: brandId,
            shopId: shopId,
            minPrice: minPrice,
            maxPrice: maxPrice,
        }
    }).then((res) => {
        return res.data;
    }).catch(() => {
        console.log("error")
        return null;
    })
}
export function GetCategories() {
    return request.get(`Categories`, {
        params: {

        }
    }).then((res) => {
        return res.data;
    }).catch(() => {
        console.log("error")
        return null;
    })
}
export function GetBrands() {
    return request.get(`Brands`, {
        params: {

        }
    }).then((res) => {
        return res.data;
    }).catch(() => {
        console.log("error")
        return null;
    })
}

export function AddReviews({ noiDung, diem, productId, orderId, files }) {
    const formData = new FormData();
    formData.append('noiDung', noiDung);
    formData.append('diem', diem);
    formData.append('productId', productId);
    formData.append('orderId', orderId);

    if (files && files.length > 0) {
        files.forEach((file, index) => {
            formData.append('myFile', file);
        });
    }


    return request.post(`Reviews`, formData, {
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

export function GetProductReviews(productId) {
    return request.get(`Reviews/ProductReviews`, {
        params: {
            productId
        }
    }).then((res) => {
        return res.data;
    }).catch(() => {
        console.log("error")
        return null;
    })
}
export function SearchByImage({ image }) {
    const formData = new FormData();

    if (image) {
        formData.append("image", image);
    }

    return request.post(`Products/searchByImage`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        }
    })
        .then((res) => {
            return res.data;
        }).catch((res) => {

            return null;
        })

}