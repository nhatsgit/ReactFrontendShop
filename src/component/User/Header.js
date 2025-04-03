import SearchForm from "./SearchForm/SearchForm";
import { Link, useNavigate } from "react-router-dom";
import { routePaths } from "../../routes";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import { GetMyInfo } from "../../apiServices/AuthService";
import { notification } from "antd";
function Header() {
    const { auth, setAuth } = useContext(AuthContext);
    const [user, setUser] = useState({});
    const navigate = useNavigate();
    const HandleLogout = () => {

        localStorage.removeItem('ACCESS_TOKEN');
        setAuth({
            isAuthenticated: false,
            user: {
                username: ""
            }
        })
    }
    useEffect(() => {
        const fetchApi = async () => {
            try {
                const resUser = await GetMyInfo();
                setUser(resUser);
            } catch (error) {
                notification.info({ message: "Đã hết phiên đang nhập, vui lòng đăng nhập lại" });
                navigate("/login");
            }
        };
        if (auth.isAuthenticated) {
            fetchApi();
        }
    }, []);
    return (
        <header id="header">
            <div className="header_top">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-6">
                            <div className="contactinfo">
                                <ul className="nav nav-pills">

                                </ul>
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <div className="social-icons pull-right">
                                <ul className="nav navbar-nav">
                                    {/* <li style="margin-right: 20px;"><a href="https://www.facebook.com/profile.php?id=100048851781129"><img src="../myLayout/images/home/logofacebook.png" width={35} /></a></li>
                                <li style="margin-right: 20px;"><a href="https://zalo.me/0394778814"><img src="../myLayout/images/home/logozalo.png" width={35} /></a></li>
                                <li style="margin-right: 20px;"><a href="https://www.facebook.com/messages/t/100048851781129"><img src="../myLayout/images/home/logomessenger.png" width={35} /></a></li>  */}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="header-middle">
                <div className="container">
                    <div className="row">
                        <div className="logo pull-left">
                            <Link to="/" ><img src="images/home/react.png" alt="" width={70} /></Link>
                        </div>
                        <div className="col-sm-8">
                            <SearchForm />
                        </div>
                    </div>
                </div>
            </div>

            <div className="header-bottom">
                <div className="container">
                    <div className="row">
                        <div className="navbar-header">
                            <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                                <span className="sr-only">Toggle navigation</span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                            </button>
                        </div>
                        <div className="mainmenu pull-left">
                            <ul className="nav navbar-nav collapse navbar-collapse">
                                <li><Link to={routePaths.home}  ><i className="fa fa-home"></i>Trang Chủ</Link></li>
                                <li><Link to={routePaths.myorders}  ><i className="fa fa-list-alt"></i>Đơn Hàng</Link></li>
                                <li><Link to={routePaths.mycarts}  ><i className="fa fa-shopping-cart" ></i> Giỏ Hàng</Link></li>
                                <li><Link to={routePaths.account} ><i className="fa fa-user"></i> Tài Khoản</Link></li>
                            </ul>

                        </div>
                        <div className="mainmenu pull-right">

                            <ul className="nav navbar-nav collapse navbar-collapse">
                                {
                                    auth.isAuthenticated
                                        ?
                                        <>

                                            <li className="nav-item">
                                                <img
                                                    style={{ borderRadius: '50%' }}
                                                    width="20"
                                                    height="20"
                                                    src={`${process.env.REACT_APP_API_URL}${user.avatar}`}
                                                    alt="avatar"
                                                    onError={(e) => {
                                                        e.target.onerror = null;
                                                        e.target.src = "images/home/react.png";
                                                    }}
                                                />
                                            </li>
                                            <li className="nav-item">
                                                <Link to={`${routePaths.account}`} className="nav-link text-dark" id="login" > Hello {user.userName}</Link>
                                            </li>
                                            <li className="nav-item">
                                                <Link to="/" onClick={HandleLogout} className="nav-link text-dark" id="register" > Đăng Xuất</Link>
                                            </li></>
                                        :
                                        <>
                                            <li className="nav-item">
                                                <Link to="/login" className="nav-link text-dark" id="login" > Đăng Nhập</Link>
                                            </li>
                                            <li className="nav-item">
                                                <Link to="/register" className="nav-link text-dark" id="register" > Đăng Ký</Link>
                                            </li>
                                        </>
                                }

                            </ul>
                        </div>
                    </div>
                </div>
            </div>

        </header>
    );
}

export default Header;