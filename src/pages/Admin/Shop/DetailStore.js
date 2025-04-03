import { useEffect, useState } from "react";
import { GetShopOwnerDetails } from "../../../apiServices/Admin/ShopAdminServices";
import { useLocation } from "react-router-dom";
import { formatDate } from "../../../utils/FormatDate";

function DetailStore() {
    const query = new URLSearchParams(useLocation().search);
    const shopId = query.get('id');
    const [shopData, setShopData] = useState({});

    useEffect(() => {
        const fetchApi = async () => {
            try {
                const shop = await GetShopOwnerDetails(shopId);
                setShopData(shop);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchApi();
    }, [shopId]);

    if (!shopData) {
        return <div>Đang tải thông tin cửa hàng...</div>;
    }


    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-8" style={{ textAlign: "left" }}>
                    <h1 className="mb-4">Thông tin cửa hàng</h1>

                    <div className="card shadow-sm p-4">
                        <hr />
                        <dl className="row">
                            <dt className="col-sm-3 mb-3 fw-bold">Tên cửa hàng:</dt>
                            <dd className="col-sm-9 mb-3">{shopData.myShop.tenCuaHang}</dd>

                            <dt className="col-sm-3 mb-3 fw-bold">Địa chỉ:</dt>
                            <dd className="col-sm-9 mb-3">{shopData.myShop.diaChi}</dd>

                            <dt className="col-sm-3 mb-3 fw-bold">Liên hệ:</dt>
                            <dd className="col-sm-9 mb-3">{shopData.myShop.lienHe}</dd>

                            <dt className="col-sm-3 mb-3 fw-bold">Email:</dt>
                            <dd className="col-sm-9 mb-3">{shopData.email}</dd>

                            <dt className="col-sm-3 mb-3 fw-bold">Số điện thoại:</dt>
                            <dd className="col-sm-9 mb-3">{shopData.phoneNumber}</dd>

                            <dt className="col-sm-3 mb-3 fw-bold">Ảnh đại diện:</dt>
                            <dd className="col-sm-9 mb-3">
                                <img
                                    width="100"
                                    height="100"
                                    className="rounded-circle border"
                                    src={`${process.env.REACT_APP_API_URL}${shopData.myShop.anhDaiDien}`}
                                    alt="Profile"
                                />
                            </dd>

                            <dt className="col-sm-3 mb-3 fw-bold">Ảnh nền:</dt>
                            <dd className="col-sm-9 mb-3">
                                <img
                                    width="300"
                                    height="100"
                                    className="rounded border"
                                    src={`${process.env.REACT_APP_API_URL}${shopData.myShop.anhBia}`}
                                    alt="Cover"
                                />
                            </dd>

                            <dt className="col-sm-3 mb-3 fw-bold">Ngày tạo:</dt>
                            <dd className="col-sm-9 mb-3">{formatDate(shopData.myShop.ngayTao)}</dd>

                            <dt className="col-sm-3 mb-3 fw-bold">Mô tả:</dt>
                            <dd className="col-sm-9 mb-3">{shopData.myShop.moTa}</dd>


                        </dl>

                    </div>

                    <div className=" mt-4">
                        <a href="/Admin" style={{ textDecoration: "underline", color: "blue" }}>Back to List</a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DetailStore;