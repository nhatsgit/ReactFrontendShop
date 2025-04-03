import { useEffect, useState } from "react";
import { GetProductSellerById } from "../../../../apiServices/Seller/ProductSellerServices";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { routePaths } from "../../../../routes";

function DetailProduct() {
    const query = new URLSearchParams(useLocation().search);
    const id = query.get('id');
    const navigate = useNavigate();
    const [product, setProduct] = useState({})
    const [loading, setLoading] = useState(true);



    useEffect(() => {
        const FetchProduct = async () => {
            try {
                const res = await GetProductSellerById(id)
                setProduct(res);


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
    if (loading) {
        return <div>Đang cập nhật dữ liệu...</div>;
    }
    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-8" style={{ textAlign: "left" }}>
                    <h1 className="mb-4" style={{ fontSize: "40px" }}>Chi tiết<br />Sản phẩm</h1>
                    <hr />
                    <div className="card shadow-sm p-4">
                        <dl className="row">
                            <dt className="col-sm-3 mb-3 fw-bold">ID:</dt>
                            <dd className="col-sm-9 mb-3">{product.productId}</dd>
                            <dt className="col-sm-3 mb-3 fw-bold">Tên sản phẩm:</dt>
                            <dd className="col-sm-9 mb-3">{product.tenSp}</dd>
                            <dt className="col-sm-3 mb-3 fw-bold">Trạng thái:</dt>
                            <dd className="col-sm-9 mb-3">{product.daAn ? "Đã ẩn" : "Đang bán"}</dd>

                            <dt className="col-sm-3 mb-3 fw-bold">Ảnh đại diện:</dt>
                            <dd className="col-sm-9 mb-3">
                                <img src={`${process.env.REACT_APP_API_URL}${product.anhDaiDien}`}
                                    alt="Anhdaidien" width={150} height={150}>
                                </img>
                            </dd>

                            <dt className="col-sm-3 mb-3 fw-bold">Mô tả:</dt>
                            <dd className="col-sm-9 mb-3">{product.moTa}</dd>

                            <dt className="col-sm-3 mb-3 fw-bold">Thông số:</dt>
                            <dd className="col-sm-9 mb-3">{product.thongSo}</dd>

                            <dt className="col-sm-3 mb-3 fw-bold">Giá nhập:</dt>
                            <dd className="col-sm-9 mb-3">{product.giaNhap}</dd>

                            <dt className="col-sm-3 mb-3 fw-bold">Giá bán:</dt>
                            <dd className="col-sm-9 mb-3">{product.giaBan}</dd>

                            <dt className="col-sm-3 mb-3 fw-bold">Số lượng còn:</dt>
                            <dd className="col-sm-9 mb-3">{product.soLuongCon}</dd>

                            <dt className="col-sm-3 mb-3 fw-bold">Phần Trăm Giảm:</dt>
                            <dd className="col-sm-9 mb-3">{product.phanTramGiam}</dd>

                            <dt className="col-sm-3 mb-3 fw-bold">Loại :</dt>
                            <dd className="col-sm-9 mb-3">{product.productCategory.tenLoai}</dd>

                            <dt className="col-sm-3 mb-3 fw-bold">Nhãn hiệu:</dt>
                            <dd className="col-sm-9 mb-3">{product.brand.tenNhanHieu}</dd>

                            <dt className="col-sm-3 mb-3 fw-bold">Ảnh mô tả:</dt>
                            <dd className="col-sm-9 mb-3">
                                {
                                    product.productImages.map((image, index) => {
                                        return <img key={index} src={`${process.env.REACT_APP_API_URL}${image.url}`} alt="Anhdaidien" width={50} height={50}></img>
                                    })
                                }

                            </dd>
                        </dl>

                    </div>

                    <div className=" mt-4">
                        <Link to={`${routePaths.editProduct}?id=${product.productId}`} style={{ textDecoration: "underline", color: "blue" }}>Edit</Link> |
                        <a onClick={() => navigate(-1)} style={{ textDecoration: "underline", color: "blue", cursor: "pointer" }}>Back to List</a>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default DetailProduct;