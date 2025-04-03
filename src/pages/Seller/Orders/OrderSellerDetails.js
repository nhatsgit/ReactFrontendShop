import { useEffect, useState } from "react";
import { FormatCurrency } from "../../../utils/FormatCurrency";
import { useLocation } from "react-router-dom";
import { formatDate } from "../../../utils/FormatDate";
import { GetOrderById } from "../../../apiServices/OrderService";
import { GetOrderSellerById, UpdateStatus } from "../../../apiServices/Seller/OrderSellerServices";

function OrderSellerDetails() {
    const query = new URLSearchParams(useLocation().search);
    const id = query.get('id');
    const [order, setOrder] = useState(null); // Chờ dữ liệu có từ API
    const [loading, setLoading] = useState(true);
    const fetchApi = async () => {
        try {
            const orderRes = await GetOrderSellerById(id);
            setOrder(orderRes);
        } catch (error) {
            console.error("Error fetching order data:", error);
        } finally {
            setTimeout(() => {
                setLoading(false);
            }, 500);
        }
    };
    useEffect(() => {
        fetchApi();
    }, []);

    if (loading) {
        return <div>Đang cập nhật dữ liệu...</div>;
    }
    const HandleUpdateStatus = async () => {
        try {
            const orderRes = await UpdateStatus(id);
        } catch (error) {
            console.error("Error fetching order data:", error);
        } finally {
            fetchApi();
        }
    };
    return (
        <>
            <section id="cart_items">
                <div className="container">

                    <h1>Thông tin đơn hàng</h1>

                    <p style={{ color: "darkblue", fontSize: "15px" }}>
                        {`${order.orderStatus?.tenTrangThai} ` || 'Lỗi...'}
                        {order.orderStatus?.orderStatusId < 5 ? (
                            <button style={{ backgroundColor: "transparent", color: "blue", border: "2px solid blue" }} onClick={HandleUpdateStatus}>Cập nhật trạng thái</button>
                        ) : order.orderStatus?.orderStatusId === 9 ? (
                            <button style={{ backgroundColor: "transparent", color: "blue", border: "2px solid blue" }} onClick={HandleUpdateStatus}>Cập nhật trạng thái</button>
                        ) : order.orderStatus?.orderStatusId === 10 ? (
                            <button style={{ backgroundColor: "transparent", color: "blue", border: "2px solid blue" }} onClick={HandleUpdateStatus}>Cập nhật trạng thái</button>
                        ) : null}

                    </p>
                    <div className="table-responsive cart_info">
                        <table className="table table-condensed">
                            <thead>
                                <tr className="cart_menu">
                                    <td className="image" style={{ width: "200px" }}>Ảnh</td>
                                    <td className="description">Tên sản phẩm</td>
                                    <td className="price">Đơn giá</td>
                                    <td className="quantity">Số lượng mua</td>
                                    <td className="total">Thành tiền</td>
                                    <td></td>
                                </tr>
                            </thead>
                            <tbody>
                                {order.orderDetails.map((orderDetail, index) => {
                                    return <tr key={index}>
                                        <td className="cart_product" style={{ width: "200px" }}>
                                            <a ><img src={`https://localhost:7233${orderDetail.product.anhDaiDien}`} alt="" width="60" height="50" /></a>
                                        </td>
                                        <td className="cart_description">
                                            <h4><a >{orderDetail.product.tenSp}</a></h4>
                                            <p>Web ID: 232</p>
                                        </td>
                                        <td className="cart_price">
                                            <p>{FormatCurrency(orderDetail.price)}</p>
                                        </td>
                                        <td className="cart_price">
                                            <p>x{orderDetail.quantity}</p>
                                        </td>
                                        <td className="cart_total" id="cartTotal">
                                            <p className="cart_total_price" id="totalPrice">{FormatCurrency(orderDetail.price * orderDetail.quantity)}</p>
                                        </td>


                                    </tr>
                                })}




                            </tbody>
                        </table>
                    </div>
                    <div style={{ paddingLeft: "1em", textAlign: "left" }}>
                        <dl className="row">
                            <dt className="col-sm-3">
                                Thời Gian Đặt:
                            </dt>
                            <dd className="col-sm-9">
                                {formatDate(order.orderDate)}
                            </dd>

                            <dt className="col-sm-3">
                                Địa Chỉ Giao Hàng:
                            </dt>
                            <dd className="col-sm-9">
                                {order.shippingAddress}
                            </dd>
                            <dt className="col-sm-3">
                                Số điện thoại:
                            </dt>
                            <dd className="col-sm-9">
                                {order.user.phoneNumber}
                            </dd>
                            <dt className="col-sm-3">
                                Tên người nhận:
                            </dt>
                            <dd className="col-sm-9">
                                {order.user.fullName}
                            </dd>
                            <dt className="col-sm-3">
                                Ghi Chú:
                            </dt>
                            <dd className="col-sm-9">
                                {order.notes}
                            </dd>
                            <dt className="col-sm-3">
                                Trạng Thái Đơn Hàng:
                            </dt>
                            <dd className="col-sm-9">
                                {order.orderStatus?.tenTrangThai || 'Loading...'}
                            </dd>
                            <dt className="col-sm-3">
                                Phương Thức Thanh Toán:
                            </dt>
                            <dd className="col-sm-9">
                                {order.payment?.tenLoai || 'Loading...'}
                            </dd>
                            <dt className="col-sm-3">
                                Mã Giảm Giá:
                            </dt>


                            <dd className="col-sm-9">
                                {order.voucher?.phanTramGiam === 0 ? (
                                    "Không có"
                                ) : (
                                    <>
                                        {order.voucher?.voucherCode}: giảm {order.voucher?.phanTramGiam}% tổng đơn hàng
                                        {order.voucher?.donToiThieu > 0 && (
                                            <> , đơn tối thiểu {FormatCurrency(order.voucher?.donToiThieu || 0)} </>
                                        )}
                                        {order.voucher?.giamToiDa > 0 && (
                                            <> , giảm tối đa {FormatCurrency(order.voucher?.giamToiDa || 0)} </>
                                        )}
                                    </>
                                )}
                            </dd>



                            <dt className="col-sm-3">
                                <h3>Tổng Đơn Hàng:</h3>
                            </dt>
                            <dd className="col-sm-9">
                                <h3 style={{ color: "darkblue" }}>{FormatCurrency(order.totalPrice)}</h3>
                            </dd>
                        </dl>


                    </div>
                </div>

            </section>
        </>
    );
}

export default OrderSellerDetails;