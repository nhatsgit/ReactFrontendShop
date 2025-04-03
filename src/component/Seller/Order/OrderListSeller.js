import { Link, useNavigate } from "react-router-dom";
import styles from "../../../pages/Seller/Seller.module.css"
import { FormatCurrency } from "../../../utils/FormatCurrency";
import { formatDate } from "../../../utils/FormatDate";
import { routePaths } from "../../../routes";

function OrderListSeller({ orderList }) {
    const navigate = useNavigate();
    if (!orderList || orderList.length === 0) {
        return <center><div>Không có...</div></center>;
    }

    return (
        <>
            {
                orderList.map((order, index) => {
                    return <div key={index} className={styles.container} style={{ border: "2px solid black" }}>
                        <strong>Ngày đặt:{formatDate(order.orderDate)}</strong>
                        {
                            order.orderDetails.map((orderDetail, index) => {
                                return <div key={index} className={`${styles.row} ${styles.product} ${styles.py_2}`} >
                                    <div className={`${styles.col_md_6} ${styles.d_flex}`}>
                                        <div className="images">
                                            <img src={`https://localhost:7233${orderDetail.product.anhDaiDien}`} height={75} alt="" />
                                        </div>
                                        <div className={`${styles.context} ${styles.ml3}`}>
                                            <p>{orderDetail.product.tenSp}</p>
                                            x {orderDetail.quantity}
                                        </div>
                                    </div>
                                    <div className={`${styles.col_md_6} ${styles.text_right}`}>
                                        <h4 className={`${styles.text_dark}`}>{FormatCurrency(orderDetail.price)}</h4>
                                    </div>
                                </div>
                            })
                        }

                        <div className={`${styles.row} ${styles.third} ${styles.py_3}`} style={{ borderTop: "1px solid grey", width: "99%" }}>
                            <div className={`${styles.col_md_6}`}>
                                <h4 style={{ color: "blue" }}>{order.orderStatus?.tenTrangThai || "Đơn hàng lỗi"}<p></p>
                                </h4></div>
                            <div className={`${styles.col_md_6} ${styles.text_right}`}>
                                <h3 style={{ color: "blue" }}><span>Thành tiền:</span>{FormatCurrency(order.totalPrice)}</h3>
                                <button className={`${styles.btn} ${styles.btn_primary}`} ><Link to={`${routePaths.orderSellerDetails}?id=${order.orderId}`} className={styles.link} >Xem chi tiết</Link></button>
                            </div>
                        </div>
                    </div>
                })
            }
        </>
    );
}

export default OrderListSeller;