import { useEffect, useState } from "react";
import styles from "../Seller.module.css";
import { GetBrands, GetCategories } from "../../../apiServices/ProductService";
import { CreateProduct } from "../../../apiServices/Seller/ProductSellerServices";
import ExcelForm from "../../../component/Seller/Product/ExcelForm";

function AddProduct() {
    const [product, setProduct] = useState({
        ProductId: 0,
        TenSp: "",
        AnhDaiDien: "",
        MoTa: "",
        ThongSo: "",
        GiaNhap: "",
        GiaBan: "",
        SoLuongCon: 0,
        PhanTramGiam: 0,
        DiemDanhGia: 0,
        DaAn: false,
        ProductCategoryId: 1,
        BrandId: 1,
        ShopId: 0,
    });
    const [mainImage, setMainImage] = useState(null);
    const [mainImagePreviewURL, setMainImagePreviewURL] = useState(null);
    const [additionalImages, setAdditionalImages] = useState([]);
    const [additionalImagePreviewsURL, setAdditionalImagePreviewsURL] = useState([]);
    const [brands, setBrands] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isAutoForm, setIsAutoForm] = useState(false);  // State để quản lý form

    useEffect(() => {
        const fetchApi = async () => {
            try {
                const resCategories = await GetCategories();
                const resBrands = await GetBrands();
                setCategories(resCategories);
                setBrands(resBrands);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchApi();
    }, []);

    if (loading) {
        return <div>Đang tải...</div>;
    }

    const HandleSubmit = async (e) => {
        e.preventDefault();
        try {
            const result = await CreateProduct(product, mainImage, additionalImages);
            alert("Product created successfully!");
            console.log(result);
        } catch (error) {
            alert("Failed to create product.");
            console.error(error);
        }
    };

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

    const toggleForm = (e) => {
        setIsAutoForm(e.target.value === "form2");
    };

    return (
        <div className={styles.container} style={{ textAlign: "left" }}>
            <div className={styles.main_content}>
                <input
                    style={{ width: "20px", height: "20px" }}
                    type="radio"
                    name="formSelector"
                    value="form1"
                    onChange={toggleForm}
                />
                Thêm thủ công
                <input
                    style={{ width: "20px", height: "20px" }}
                    type="radio"
                    name="formSelector"
                    value="form2"
                    onChange={toggleForm}
                />
                Thêm tự động
                <h2>Thêm Sản Phẩm</h2>
                <bt />

                {!isAutoForm && (
                    <form onSubmit={HandleSubmit}>
                        <div className={styles.form_group}>
                            <label className="control_label" htmlFor="TenSp">
                                TenSp
                            </label>
                            <input
                                className={styles.form_control}
                                type="text"
                                name="TenSp"
                                value={product.TenSp}
                                onChange={handleInputChange}
                            />
                            <span className="text_danger field_validation_valid"></span>
                        </div>
                        <div className={styles.form_group}>
                            <label className="control_label" htmlFor="MoTa">
                                MoTa
                            </label>
                            <input
                                className={styles.form_control}
                                type="text"
                                name="MoTa"
                                value={product.MoTa}
                                onChange={handleInputChange}
                            />
                            <span className="text_danger field_validation_valid"></span>
                        </div>
                        <div className={styles.form_group}>
                            <label className="control_label" htmlFor="ThongSo">
                                ThongSo
                            </label>
                            <input
                                className={styles.form_control}
                                type="text"
                                name="ThongSo"
                                value={product.ThongSo}
                                onChange={handleInputChange}
                            />
                            <span className="text_danger field_validation_valid"></span>
                        </div>
                        <div className={styles.form_group}>
                            <label className="control_label" htmlFor="GiaNhap">
                                GiaNhap
                            </label>
                            <input
                                className={styles.form_control}
                                type="number"
                                name="GiaNhap"
                                value={product.GiaNhap}
                                onChange={handleInputChange}
                            />
                            <span className="text_danger field_validation_valid"></span>
                        </div>
                        <div className={styles.form_group}>
                            <label className="control_label" htmlFor="GiaBan">
                                GiaBan
                            </label>
                            <input
                                className={styles.form_control}
                                type="number"
                                name="GiaBan"
                                value={product.GiaBan}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className={styles.form_group}>
                            <label className="control_label" htmlFor="SoLuongCon">
                                SoLuongCon
                            </label>
                            <input
                                className={styles.form_control}
                                type="number"
                                name="SoLuongCon"
                                value={product.SoLuongCon}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className={styles.form_group}>
                            <label className="control_label" htmlFor="PhanTramGiam">
                                PhanTramGiam
                            </label>
                            <input
                                className={styles.form_control}
                                type="number"
                                name="PhanTramGiam"
                                value={product.PhanTramGiam}
                                onChange={handleInputChange}
                            />
                            <span className="text_danger field_validation_valid"></span>
                        </div>
                        <div className={styles.form_group}>
                            <label className="control_label" htmlFor="ProductCategoryId">
                                ProductCategoryId
                            </label>
                            <select
                                className={styles.form_control}
                                name="ProductCategoryId"
                                value={product.ProductCategoryId}
                                onChange={handleInputChange}
                            >
                                {categories.map((category, index) => {
                                    return (
                                        <option key={index} value={category.productCategoryId}>
                                            {category.tenLoai}
                                        </option>
                                    );
                                })}
                            </select>
                        </div>
                        <div className={styles.form_group}>
                            <label className="control_label" htmlFor="BrandId">
                                BrandId
                            </label>
                            <select
                                className={styles.form_control}
                                name="BrandId"
                                value={product.BrandId}
                                onChange={handleInputChange}
                            >
                                <option value="1">XiaoMi</option>
                                {brands.map((brand, index) => {
                                    return (
                                        <option key={index} value={brand.brandId}>
                                            {brand.tenNhanHieu}
                                        </option>
                                    );
                                })}
                            </select>
                        </div>
                        <div className={styles.form_group}>
                            <label htmlFor="AnhDaiDien">Anh dai dien</label>
                            <input
                                type="file"
                                onChange={handleMainImageChange}
                                name="imageUrl"
                                className={styles.form_control}
                                id="imageInput"
                            />
                            <br />
                            {mainImagePreviewURL && (
                                <img
                                    src={mainImagePreviewURL}
                                    alt="Main Preview"
                                    style={{ width: "200px", marginTop: "10px" }}
                                />
                            )}
                        </div>
                        <div className={styles.form_group}>
                            <label htmlFor="Images">Product Image:</label>
                            <input
                                type="file"
                                onChange={handleAdditionalImagesChange}
                                id="files"
                                name="files"
                                multiple
                                accept="image/*"
                            />
                            {additionalImagePreviewsURL.map((preview, index) => (
                                <img
                                    key={index}
                                    src={preview}
                                    alt={`Additional Preview ${index}`}
                                    style={{ width: "100px" }}
                                />
                            ))}
                            <br />
                        </div>

                        <button
                            type="submit"
                            className={`${styles.btn_primary} ${styles.btn}`}
                        >
                            Add
                        </button>
                    </form>
                )}
                {isAutoForm && (
                    <ExcelForm></ExcelForm>
                )}
            </div>
        </div>
    );
}

export default AddProduct;
