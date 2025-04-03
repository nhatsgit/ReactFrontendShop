import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GetRequestReturnOrders } from "../../../apiServices/Seller/OrderSellerServices";
import { routePaths } from "../../../routes";
import OrderListSeller from "../../../component/Seller/Order/OrderListSeller";
function RequestReturnedOrder() {
    const [orders, setOrders] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPage, settotalPage] = useState(5)
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchApi = async () => {
            try {
                const res = await GetRequestReturnOrders(currentPage);

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
            const res = await GetRequestReturnOrders(pageNumber);
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
        return <center>
            <div>Đang cập nhật dữ liệu...</div>
        </center>;
    }
    return (
        <section style={{ width: "90%", margin: "auto", }}>
            <h1 style={{ textAlign: "center" }}>Đơn hàng yêu cầu trả hàng</h1>
            <section>
                {orders ? <>
                    <OrderListSeller orderList={orders}></OrderListSeller>
                    <hr />
                    <center>
                        <ul className="pagination">
                            {Array.from({ length: totalPage }, (_, index) => (
                                <li key={index} className={index === currentPage - 1 ? "active" : ""} onClick={() => HandleSelectPage(index + 1)}>
                                    <a className="page-link">{index + 1}</a>
                                </li>
                            ))}
                        </ul>
                    </center>
                </> : <h1>Không có</h1>}
            </section>
        </section>);
};
export default RequestReturnedOrder;