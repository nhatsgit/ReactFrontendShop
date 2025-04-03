import { Link } from "react-router-dom";
import styles from "./SellerLayout.module.css";
import HeaderSeller from "./HeaderSeller";
import { routePaths } from "../../routes";
import { useState } from "react";
import '@fortawesome/fontawesome-free/css/all.min.css';

function SellerLayout({ children }) {
    const [openDropdowns, setOpenDropdowns] = useState({
        products: true,
        orders: true,
        vouchers: true,
        staff: true,
        analyze: true,
    });

    const toggleDropdown = (section) => {
        setOpenDropdowns((prev) => ({
            ...prev,
            [section]: !prev[section],
        }));
    };

    return (
        <>
            <HeaderSeller />

            <div className={styles.mainContent}>
                <div className={styles.leftNavbar}>
                    <ul className={styles.leftNavLinks}>
                        <li className={styles.navSection}><h4 onClick={() => toggleDropdown('products')}> <i className="fa fa-inbox"></i> Quản lý sản phẩm{' '} <i className={`fa-solid ${openDropdowns['products'] ? 'fa-caret-up' : 'fa-caret-down'}`}></i></h4>
                            {openDropdowns['products'] && (
                                <ul className={styles.subNavLinks}>
                                    <li><Link to={`${routePaths.products}`}>Sản phẩm đang bán</Link></li>
                                    <li><Link to={`${routePaths.hidden}`}>Sản phẩm đã ẩn</Link></li>
                                    <li><Link to={`${routePaths.out_of_stock}`}>Sản phẩm hết hàng</Link></li>
                                    <li><Link to={`${routePaths.add}`}>Thêm sản phẩm</Link></li>
                                </ul>
                            )}
                        </li>
                        <li className={styles.navSection}><h4 onClick={() => toggleDropdown('orders')}> <i className="fa fa-list-alt"></i> Quản lý đơn hàng{' '} <i className={`fa-solid ${openDropdowns['orders'] ? 'fa-caret-up' : 'fa-caret-down'}`}></i></h4>
                            {openDropdowns['orders'] && (
                                <ul className={styles.subNavLinks}>
                                    <li><Link to={`${routePaths.orders}`}>Tất cả</Link></li>
                                    <li><Link to={`${routePaths.pending}`}>Chờ xác nhận</Link></li>
                                    <li><Link to={`${routePaths.delivered}`}>Đã giao hàng</Link></li>
                                    <li><Link to={`${routePaths.cancalled}`}>Đơn hủy</Link></li>
                                    <li><Link to={`${routePaths.return_requested}`}>Yêu cầu trả hàng</Link></li>
                                    <li><Link to={`${routePaths.returned}`}>Đã trả hàng</Link></li>
                                </ul>
                            )}
                        </li>

                        <li className={styles.navSection}><h4 onClick={() => toggleDropdown('vouchers')}> <i className="fa fa-list-alt"></i> Quản lý Voucher{' '} <i className={`fa-solid ${openDropdowns['vouchers'] ? 'fa-caret-up' : 'fa-caret-down'}`}></i> </h4>
                            {openDropdowns['vouchers'] && (
                                <ul className={styles.subNavLinks}>
                                    <li><Link to={`${routePaths.voucher}`}>Tất cả</Link></li>
                                    <li><Link to={`${routePaths.voucherCreater}`}>Thêm Voucher</Link></li>
                                    <li><Link to={`${routePaths.voucherUnmount}`}>Đã dùng hết</Link></li>
                                    <li><Link to={`${routePaths.voucherExpired}`}>Đã hết hạn</Link></li>
                                </ul>
                            )}
                        </li>

                        <li className={styles.navSection}><h4 onClick={() => toggleDropdown('staff')}> <i className="fa fa-cog"></i> Quản lý Shop{' '} <i className={`fa-solid ${openDropdowns['staff'] ? 'fa-caret-up' : 'fa-caret-down'}`}></i> </h4>
                            {openDropdowns['staff'] && (
                                <ul className={styles.subNavLinks}>
                                    <li><Link to={`${routePaths.myShopDetails}`}>Thông tin shop</Link></li>
                                    <li><Link to={`${routePaths.staff}`}>Nhân viên</Link></li>
                                    <li><Link to={`${routePaths.addstaff}`}>Thêm nhân viên</Link></li>
                                </ul>
                            )}
                        </li>
                        <li className={styles.navSection}><h4 onClick={() => toggleDropdown('analyze')}><i className="fa fa-chart-simple"></i> Dữ liệu <i className={`fa-solid ${openDropdowns['analyze'] ? 'fa-caret-up' : 'fa-caret-down'}`}></i> </h4>
                            {openDropdowns['analyze'] && (
                                <ul className={styles.subNavLinks}>
                                    <li><Link to={`${routePaths.analyze}`}>Phân tích đơn hàng</Link></li>
                                    <li><Link to={`${routePaths.renueAnalyze}`}>Phân tích doanh thu</Link></li>
                                    <li><Link to={`${routePaths.productAnalyze}`}>Phân tích sản phẩm</Link></li>
                                </ul>
                            )}
                        </li>
                    </ul>
                </div>

                <div className={styles.childrenContent}>
                    {children}
                </div>
            </div>
        </>
    );
}

export default SellerLayout;