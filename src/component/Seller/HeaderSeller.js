import { useContext, useEffect, useState } from "react";
import { routePaths } from "../../routes";
import styles from "./SellerLayout.module.css";
import { Link } from "react-router-dom";
import { GetShopDetail } from "../../apiServices/Seller/ShopServices";
import { AuthContext } from "../Context/AuthContext";
import { color } from "chart.js/helpers";

function HeaderSeller() {


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




                                        <div className={styles.content}>
                                            <h4>Quản lý shop</h4>
                                        </div>
                                    </ul>
                                </div></div>
                        </nav>
                    </div>




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
