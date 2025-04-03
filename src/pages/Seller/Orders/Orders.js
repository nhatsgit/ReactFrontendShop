import { useEffect, useState } from "react";
import styles from "../Seller.module.css"
import { GetAllOrders } from "../../../apiServices/Seller/OrderSellerServices";
import { useNavigate } from "react-router-dom";
import { routePaths } from "../../../routes";
import OrderListSeller from "../../../component/Seller/Order/OrderListSeller";
function Orders() {
    const [orders, setOrders] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPage, settotalPage] = useState(5)
    const [loading, setLoading] = useState(true);
    const [dateSearch, setDateSearch] = useState()
    const [currentDateSearch, setCurrentDateSearch] = useState()
    const navigate = useNavigate();
    useEffect(() => {
        const fetchApi = async () => {
            try {
                const res = await GetAllOrders(currentPage);

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
            const res = await GetAllOrders(pageNumber, currentDateSearch);
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
            }, 100);
        }
    }
    const HandleSearchOrders = async () => {
        try {
            const res = await GetAllOrders(1, dateSearch);
            window.scrollTo({
                top: 0,
                behavior: 'smooth',
            });

            setOrders(res.items)
            setCurrentPage(res.pageNumber)
            settotalPage(res.pageCount)
            setCurrentDateSearch(dateSearch)
            console.log(dateSearch)
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setTimeout(() => {
                setLoading(false);
            }, 100);
        }
    }

    if (loading) {
        return <center>
            <div>Đang cập nhật dữ liệu...</div>
        </center>;
    }
    return (
        <section style={{ width: "90%", margin: "auto", }}>

            <h1 style={{ textAlign: "center" }}>Tất cả đơn hàng của shop</h1>
            <section>
                <center>
                    <input type="date" value={dateSearch} onChange={(e) => { setDateSearch(e.target.value) }}></input>
                    <button onClick={HandleSearchOrders} >Lọc</button>
                </center>
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
}

export default Orders;