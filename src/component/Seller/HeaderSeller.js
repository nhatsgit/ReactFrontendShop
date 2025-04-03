import { useContext, useEffect, useState } from "react";
import { routePaths } from "../../routes";
import styles from "./SellerLayout.module.css";
import { Link } from "react-router-dom";
import { GetShopDetail } from "../../apiServices/Seller/ShopServices";
import { AuthContext } from "../Context/AuthContext";
import { color } from "chart.js/helpers";

function HeaderSeller() {
    const [shopData, setShopData] = useState({});

    useEffect(() => {
        const fetchApi = async () => {
            try {
                const shop = await GetShopDetail();
                setShopData(shop);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchApi();
    }, []);

    const { auth, setAuth } = useContext(AuthContext);
    const HandleLogout = () => {
        localStorage.removeItem('ACCESS_TOKEN');
        setAuth({
            isAuthenticated: false,
            user: {
                username: ""
            }
        });
    };

    if (!shopData) {
        return <div>Đang tải thông tin cửa hàng...</div>;
    }

    return (
        <>
            <div className={styles.header}>
                <div className={styles.headerContainer}>
                    <div>
                        <nav style={{ display: "flex" }}>
                            <div>
                                <h1 className={styles.shopTitle}>Trang Bán Hàng</h1>
                                <Link to={'/'}>Về trang chủ</Link>
                            </div>
                            <div>
                                <div className={styles.nav1}>
                                    <ul className={styles.navbarNav}>
                                        <div className={styles.overlay}></div>

                                        <div
                                            className={styles.rectangle}
                                            style={{ backgroundImage: `url('${process.env.REACT_APP_API_URL}${shopData.anhBia}')`, }}>
                                            <img
                                                className={styles.circle}
                                                src={`${process.env.REACT_APP_API_URL}${shopData.anhDaiDien}`}
                                                alt="Avatar"
                                            />
                                        </div>


                                        <div className={styles.content}>
                                            <h4>{shopData.tenCuaHang}</h4>
                                        </div>
                                    </ul>
                                </div></div>
                        </nav>
                    </div>



                    {shopData.biChan &&
                        <div style={{ color: "red", fontSize: "20px" }}>
                            Shop của bạn bị Block do vi phạm chính sách<br /> sản phẩm của Shop không còn được hiển thị trên hệ thống<br /> Vui lòng đến với trụ sở để giải quyết
                        </div>}
                    <div className={styles.nav2}>
                        <span>Người bán hàng: {auth.user.username}</span>
                        <a href={routePaths.account}>Quản lý tài khoản</a>
                        <Link to="/" onClick={HandleLogout}>Đăng xuất</Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default HeaderSeller;
