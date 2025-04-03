import { useEffect, useState } from "react";
import * as OrderService from "../../../apiServices/OrderService";
import { FormatCurrency } from "../../../utils/FormatCurrency";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { formatDate } from "../../../utils/FormatDate";
import { Modal, notification } from "antd";
import { routePaths } from "../../../routes";
import { addToCart } from "../../../apiServices/ShopingCartService";
import ProductReviewModal from "../../../component/Context/Modal/ProductReviewModal";

function OrderDetails() {
    const query = new URLSearchParams(useLocation().search);
    const id = query.get('id');
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [reload, setReload] = useState(true)
    const navigate = useNavigate();

    useEffect(() => {
        const fetchApi = async () => {
            try {
                const orderRes = await OrderService.GetOrderById(id);
                setOrder(orderRes);
            } catch (error) {
                console.error("Error fetching order data:", error);
            } finally {
                setTimeout(() => {
                    setLoading(false);
                }, 500);
            }
        };
        fetchApi();
    }, [reload]);
    const HandleCancelOrder = async (orderId) => {
        Modal.confirm({
            title: "Hủy đơn",
            content: "Bạn có thực sự muốn hủy đơn này?",
            okText: "Có",
            cancelText: "Không",
            onOk: async () => {
                try {
                    await OrderService.CancelOrder(orderId)
                    notification.success({
                        message: "Thành công",
                        description: "Hủy đơn thành công"
                    })
                    setReload(!reload);

                } catch (error) {

                }
            },

        });

    }
    const HandleGiveBackOrder = async (orderId) => {
        Modal.confirm({
            title: "Yêu cầu trả hàng",
            content: "Bạn có thực sự muốn trả lại đơn này?",
            okText: "Có",
            cancelText: "Không",
            onOk: async () => {
                try {
                    await OrderService.GiveBackOrder(orderId)
                    notification.success({
                        message: "Thành công",
                        description: "Trả lại thành công, nhân viên sẽ đến lấy lại hàng và hoàn tiền khi được xác nhận"
                    })
                    setReload(!reload);

                } catch (error) {

                }
            },

        });

    }

    if (loading) {
        return <div>Đang cập nhật dữ liệu...</div>;
    }

    return (
        <>
            <section id="cart_items">
                <div className="container">

                    <h1>Thông tin đơn hàng</h1>

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

                                            <Link to={`${routePaths.productDetails}?id=${orderDetail.product.productId}`}><img src={`https://localhost:7233${orderDetail.product.anhDaiDien}`} alt="" width="120" height="100" /></Link>
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
                                        <td>

                                            {order.orderStatus.orderStatusId >= 5 ?
                                                <>
                                                    {orderDetail.isReview != true ?
                                                        <ProductReviewModal productId={orderDetail.product.productId} orderId={order.orderId}></ProductReviewModal>
                                                        : null}

                                                    <button type="button" className="btn btn-fefault cart">
                                                        <Link style={{ color: "white" }}
                                                            onMouseOver={(e) => (e.currentTarget.style.color = "black")}
                                                            onMouseOut={(e) => (e.currentTarget.style.color = "white")} to={`${routePaths.productDetails}?id=${orderDetail.product.productId}`}>Mua Lại</Link>

                                                    </button>
                                                </>

                                                : null}



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
                                <h3>{FormatCurrency(order.totalPrice)}</h3>
                            </dd>
                        </dl>

                        {
                            order.orderStatus?.orderStatusId <= 2 && <button onClick={() => { HandleCancelOrder(order.orderId) }} className="btn btn-danger">Hủy đơn</button>
                        }
                        {
                            order.orderStatus?.orderStatusId == 5 && <button onClick={() => { HandleGiveBackOrder(order.orderId) }} className="btn btn-danger">Yêu cầu trả hàng</button>
                        }






                    </div>
                </div>

            </section>
        </>
    );
}

export default OrderDetails;