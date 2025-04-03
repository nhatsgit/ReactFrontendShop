import { useEffect, useState } from "react";
import * as OrderService from "../../../apiServices/OrderService";
import { FormatCurrency } from "../../../utils/FormatCurrency";
import styles from './Orders.module.css'
import { useNavigate } from "react-router-dom";
import { routePaths } from "../../../routes";
import { formatDate } from "../../../utils/FormatDate";
function MyOrders() {
    const [orders, setOrders] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPage, settotalPage] = useState(5)
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchApi = async () => {
            try {
                const res = await OrderService.GetMyOrders(currentPage);

                setOrders(res.items)
                setCurrentPage(res.pageNumber)
                settotalPage(res.pageCount)

            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setTimeout(() => {
                    setLoading(false);
                }, 500);
            }
        }
        fetchApi();
    }, []);
    const HandleSelectPage = async (pageNumber) => {
        try {
            const res = await OrderService.GetMyOrders(pageNumber);
            window.scrollTo({
                top: 0,
                behavior: 'smooth',
            });

            setOrders(res.items)
            setCurrentPage(res.pageNumber)
            settotalPage(res.pageCount)
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setTimeout(() => {
                setLoading(false);
            }, 500);
        }
    }
    const HandleOnClickDetail = (orderId) => {


        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });

        navigate(`${routePaths.orderdetails}?id=${orderId}`)

    }
    if (loading) {
        return <div>Đang cập nhật dữ liệu...</div>;
    }
    return (
        <>
            <section>
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12 padding-right">
                            <h1 style={{ textAlign: "center" }}>Đơn hàng của tôi</h1>
                            {
                                orders.map((order, index) => {
                                    return <div className="container sum" style={{ border: "2px solid black" }} key={index}>
                                        <div className="second p-3">
                                            <strong>Ngày đặt: {formatDate(order.orderDate)}</strong>
                                            {order.orderDetails.map((orderDetail, index) => {
                                                return <div className={`row product py-2 ${styles.orderDetail}`} key={index}>
                                                    <div className="col-md-6 d-flex">
                                                        <div className="images">
                                                            <img src={`https://localhost:7233${orderDetail.product.anhDaiDien}`} alt="" />
                                                        </div>
                                                        <div className="context ml-3">
                                                            <p>{orderDetail.product.tenSp}</p>

                                                        </div>
                                                    </div>
                                                    <div className="col-md-6 text-right">
                                                        <h5 className="text-dark">
                                                            Đơn giá: {FormatCurrency(orderDetail.price)}
                                                        </h5>
                                                        <h5 className="text-dark">
                                                            Số lượng: {orderDetail.quantity}
                                                        </h5>
                                                    </div>
                                                </div>
                                            })}


                                        </div>
                                        <div className="row third py-3" style={{ borderTop: "1px solid grey", width: "99%" }}>
                                            <div className="col-md-6">
                                                <h4 style={{ color: "blue" }}>{order.orderStatus?.tenTrangThai || "Đơn hàng lỗi"}</h4>
                                            </div>
                                            <div className="col-md-6 text-right">
                                                <h3 style={{ color: "blue" }}>
                                                    <span>Thành tiền:</span>{FormatCurrency(order.totalPrice)}
                                                </h3>

                                                <button type="button" onClick={() => HandleOnClickDetail(order.orderId)} className="btn btn-fefault cart">
                                                    <a

                                                        style={{ color: "white" }}
                                                        onMouseOver={(event) => (event.target.style.color = 'black')}
                                                        onMouseOut={(event) => (event.target.style.color = 'white')}
                                                    >
                                                        Xem chi tiết
                                                    </a>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                })
                            }
                            <br></br>
                            <ul className="pagination">
                                {Array.from({ length: totalPage }, (_, index) => (
                                    <li key={index} className={index === currentPage - 1 ? "active" : ""} onClick={() => HandleSelectPage(index + 1)}>
                                        <a className="page-link">{index + 1}</a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

        </>
    );
}

export default MyOrders;