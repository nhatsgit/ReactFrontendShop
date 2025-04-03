import React from 'react';
import { useEffect, useState } from "react";
import { GetShopCategories, GetShopDetail, UpdateShop } from "../../../apiServices/Seller/ShopServices";
import { formatDate } from '../../../utils/FormatDate';
import AddressSelector from '../../../component/Context/Address/AddressSelector';

function ShopDetail() {
    const [shopData, setShopData] = useState({});
    const [avatar, setAvatar] = useState(null);
    const [avatarPreview, setAvatarPreview] = useState(null);
    const [background, setBackground] = useState(null);
    const [backgroundPreview, setBackgroundPreview] = useState(null);
    const [categories, setCategories] = useState([]);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [address, setAddress] = useState("");



    useEffect(() => {
        const fetchApi = async () => {
            try {
                const shop = await GetShopDetail();
                const resCategories = await GetShopCategories();
                setAddress(shop.diaChi)
                setCategories(resCategories);
                setShopData(shop);
                setAvatarPreview(`${process.env.REACT_APP_API_URL}${shop.anhDaiDien}`)
                setBackgroundPreview(`${process.env.REACT_APP_API_URL}${shop.anhBia}`)
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchApi();
    }, []);

    if (!shopData) {
        return <div>Đang tải thông tin cửa hàng...</div>;
    }
    const handleInputChange = (e) => {
        console.log("change")
        const { name, value } = e.target;
        setShopData((prevShop) => ({
            ...prevShop,
            [name]: value,
        }));
    };
    const handleAddressChange = (address) => {
        setAddress(address)
        setShopData((prevShop) => ({
            ...prevShop,
            diaChi: address,
        }));
    };
    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        setAvatar(file);
        if (file) {
            const previewUrl = URL.createObjectURL(file);
            setAvatarPreview(previewUrl);
        }
    };

    const handleBackgroundChange = (e) => {
        const file = e.target.files[0];
        setBackground(file);
        if (file) {
            const previewUrl = URL.createObjectURL(file);
            setBackgroundPreview(previewUrl);
        }
    };
    const openPopup = () => {
        setIsPopupOpen(true);
    };

    const closePopup = () => {
        setIsPopupOpen(false);
    };
    const HandleSubmit = async (e) => {
        e.preventDefault();
        try {
            const result = await UpdateShop(shopData, avatar, background);
            alert("Cập nhật thành công!");
        } catch (error) {
            alert("Đã xảy ra lỗi");
            console.error(error);
        }
    };

    return (
        <div style={{ maxWidth: "800px", margin: "20px auto", padding: "20px" }}>

            <h1 align="center">Thiết lập thông tin cửa hàng</h1>


            <form onSubmit={HandleSubmit}>
                <div className="row justify-content-center">
                    <div className="col-md-4">
                        <div className="form-group">
                            <label className="control-label"><strong>Tên Cửa Hàng</strong></label>
                            <input name="tenCuaHang" onChange={handleInputChange} value={shopData.tenCuaHang} className="form-control" />
                        </div>
                        <div className="form-group">
                            <label className="control-label"><strong>Địa chỉ</strong></label>
                            <textarea className="form-control" style={{ height: "100px" }} name="diaChi" id="address" type="text" value={address} readOnly></textarea>
                        </div>
                        {isPopupOpen && (
                            <AddressSelector onClose={closePopup} setAddress={handleAddressChange} ></AddressSelector>
                        )}
                        {!isPopupOpen && (
                            <button type="button" id="btnpopup" onClick={openPopup}>
                                Chọn địa chỉ khác
                            </button>
                        )}
                        <div className="form-group">
                            <label className="control-label"><strong>Liên Hệ</strong></label>
                            <textarea name="lienHe" onChange={handleInputChange} value={shopData.lienHe} className="form-control" />
                        </div>
                        <div className="form-group">
                            <label className="control-label"><strong>Mô Tả Shop</strong></label>
                            <textarea name="moTa" onChange={handleInputChange} value={shopData.moTa} className="form-control" />
                        </div>
                        <div className="form-group">
                            <label className="control-label"><strong>Loại Shop</strong></label>
                            <select name="shopCategoryId" onChange={handleInputChange} value={shopData.shopCategoryId}>
                                {categories.map((category, index) => {
                                    return (
                                        <option key={index} value={category.shopCategoryId}>
                                            {category.tenLoai}
                                        </option>
                                    );
                                })}
                            </select>
                        </div>
                        <div className="form-group">
                            <label className="control-label"><strong>Ngày Tạo</strong></label>
                            <p className="form-control-static">{formatDate(shopData.ngayTao)}</p>
                        </div>
                    </div>
                    <div className="col-md-4 text-center">
                        <div className="form-group" align="center">
                            <label><strong>Ảnh Đại Diện</strong></label><br></br>
                            <input
                                type="file"
                                name="imageAvatar"
                                className="form-control"
                                id="imageAvatar"
                                style={{ display: "none" }}
                                onChange={handleAvatarChange}
                            />
                            <img
                                src={avatarPreview || `${process.env.REACT_APP_API_URL}${shopData.anhDaiDien}`}
                                alt="Avatar"
                                style={{ width: "100px", height: "100px", borderRadius: "50%" }}
                            />
                            <button
                                type="button"
                                onClick={() => document.getElementById("imageAvatar").click()}
                                className="btn btn-secondary"
                            >
                                Chọn Ảnh Đại Diện
                            </button>
                        </div>
                        <div className="form-group" align="center">
                            <label><strong>Ảnh Bìa</strong></label>
                            <input
                                type="file"
                                name="imageBackground"
                                className="form-control"
                                id="imageBackground"
                                style={{ display: "none" }}
                                onChange={handleBackgroundChange}
                            />
                            <img
                                src={backgroundPreview || `${process.env.REACT_APP_API_URL}${shopData.anhBia}`}
                                alt="Background"
                                style={{ height: "200px" }}
                            />
                            <button
                                type="button"
                                onClick={() => document.getElementById("imageBackground").click()}
                                className="btn btn-secondary"
                            >
                                Chọn Ảnh Bìa
                            </button>
                        </div>
                    </div>
                </div>
                <div className="form-group" align="center">
                    <input type="submit" value="Lưu" className="btn btn-primary" />
                </div>
            </form>
        </div>
    );
}

export default ShopDetail;
