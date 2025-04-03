import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { GetProductSellerById, UpdateProduct } from "../../../../apiServices/Seller/ProductSellerServices";
import { GetBrands, GetCategories } from "../../../../apiServices/ProductService";
import { routePaths } from "../../../../routes";

function EditProduct() {
    const query = new URLSearchParams(useLocation().search);
    const id = query.get('id');
    const navigate = useNavigate();
    const [product, setProduct] = useState({})
    const [loading, setLoading] = useState(true);
    const [brands, setBrands] = useState([]);
    const [categories, setCategories] = useState([]);
    const [mainImage, setMainImage] = useState(null);
    const [mainImagePreviewURL, setMainImagePreviewURL] = useState(null);
    const [additionalImages, setAdditionalImages] = useState([]);
    const [additionalImagePreviewsURL, setAdditionalImagePreviewsURL] = useState([]);

    useEffect(() => {
        const FetchProduct = async () => {
            try {
                const res = await GetProductSellerById(id)
                setProduct(res);
                const resCategories = await GetCategories();
                const resBrands = await GetBrands();
                setCategories(resCategories);
                setBrands(resBrands);
                setMainImagePreviewURL(`${process.env.REACT_APP_API_URL}${res.anhDaiDien}`)
                setAdditionalImagePreviewsURL(
                    res.productImages.map((image, index) => {
                        return `${process.env.REACT_APP_API_URL}${image.url}`
                    })
                )
            } catch (error) {
                console.error("Error fetching order data:", error);
            } finally {
                setTimeout(() => {
                    setLoading(false);
                }, 300);
            }
        }
        FetchProduct()
    }, [id]);
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProduct((prevProduct) => ({
            ...prevProduct,
            [name]: value,
        }));
    };
    const handleMainImageChange = (e) => {
        const file = e.target.files[0];
        setMainImage(file);
        if (file) {
            const previewUrl = URL.createObjectURL(file);
            setMainImagePreviewURL(previewUrl);
        }
    };

    const handleAdditionalImagesChange = (e) => {
        const files = Array.from(e.target.files);
        setAdditionalImages(files);
        const previews = files.map((file) => URL.createObjectURL(file));
        setAdditionalImagePreviewsURL(previews);
    };
    const HandleSubmit = async (e) => {
        e.preventDefault();
        try {
            const result = await UpdateProduct(product, mainImage, additionalImages);
            alert("Cập nhật thành công!");
            console.log(result);
            navigate(`${routePaths.detailProduct}?id=${product.productId}`)
        } catch (error) {
            alert("Đã xảy ra lỗi");
            console.error(error);
        }
    };
    if (loading) {
        return <div>Đang cập nhật dữ liệu...</div>;
    }
    return (
        <div>
            <h1 style={{ fontSize: "30px" }}>Edit</h1>
            <h4>Product</h4>
            <hr />
            <form encType="multipart/form-data" onSubmit={HandleSubmit}>
                <div className="form-group text-danger">
                </div>
                <input type="hidden" name="ProductId" />
                <div className="form-group">
                    <label htmlFor="TenSp" className="control-label">TenSp</label>
                    <input name="tenSp" className="form-control" value={product.tenSp} onChange={handleInputChange} />
                    <span className="text-danger"></span>
                </div>
                <div className="form-group">
                    <label htmlFor="MoTa" className="control-label">MoTa</label>
                    <input name="moTa" className="form-control" value={product.moTa} onChange={handleInputChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="ThongSo" className="control-label">ThongSo</label>
                    <input name="thongSo" className="form-control" value={product.thongSo} onChange={handleInputChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="GiaNhap" className="control-label">GiaNhap</label>
                    <input name="giaNhap" className="form-control" type="number" min={1000} value={product.giaNhap} onChange={handleInputChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="GiaBan" className="control-label">GiaBan</label>
                    <input name="giaBan" className="form-control" type="number" min={1000} value={product.giaBan} onChange={handleInputChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="SoLuongCon" className="control-label">SoLuongCon</label>
                    <input name="soLuongCon" className="form-control" type="number" min={0} value={product.soLuongCon} onChange={handleInputChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="PhanTramGiam" className="control-label">PhanTramGiam</label>
                    <input name="phanTramGiam" className="form-control" type="number" min={0} max={99} value={product.phanTramGiam} onChange={handleInputChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="ProductCategoryId" className="control-label">ProductCategoryId</label>
                    <select name="productCategoryId" value={product.productCategoryId} onChange={handleInputChange} className="form-control">
                        {categories.map((category, index) => {
                            return (
                                <option key={index} value={category.productCategoryId}>
                                    {category.tenLoai}
                                </option>
                            );
                        })}
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="BrandId" className="control-label">BrandId</label>
                    <select name="brandId" className="form-control" value={product.brandId} onChange={handleInputChange}  >
                        {brands.map((brand, index) => {
                            return (
                                <option key={index} value={brand.brandId}>
                                    {brand.tenNhanHieu}
                                </option>
                            );
                        })}
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="AnhDaiDien">Product Image</label>
                    <input type="file" name="imageUrl" className="form-control" id="imageInput" onChange={handleMainImageChange} />
                    <br />
                    {mainImagePreviewURL && (
                        <img
                            src={mainImagePreviewURL}
                            alt="Main Preview"
                            style={{ width: "200px", marginTop: "10px" }}
                        />
                    )}
                </div>
                <div className="form-group">
                    <label htmlFor="Images">Image Description</label>
                    <button type="button" className="btn btn-secondary" onClick={() => document.getElementById("files").click()} >
                        Choose Files
                    </button>
                    <input onChange={handleAdditionalImagesChange} type="file" name="files" id="files" multiple accept="image/*" className="form-control" style={{ display: "none" }} />
                    <div id="preview">


                        {additionalImagePreviewsURL.map((preview, index) => (
                            <img
                                key={index}
                                src={preview}
                                alt={`Additional Preview ${index}`}
                                style={{ width: "100px" }}
                            />
                        ))}
                    </div>
                </div>
                <div className="form-group">
                    <button type="submit" className="btn btn-primary">Save</button>
                </div>
            </form>
            <div>
                <a href="/seller/product" style={{ textDecoration: "underline", color: "blue" }}>Back to List</a>
            </div>
        </div>
    );
}

export default EditProduct;
