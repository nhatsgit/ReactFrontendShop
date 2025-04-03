import React, { useContext } from 'react';
import { routePaths } from '../../routes';
import { Link } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';

function HeaderAdmin() {
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
    <header id="header" style={{ borderBottom: "1px solid #333" }}>
      <div>
        <div className="container">
          <div className="d-flex justify-content-between align-items-center w-100">
            <h1 style={{ float: 'left', marginRight: "20px" }}>Admin</h1>

            <div className="row w-100">
              <div className="mainmenu pull-left">
                <ul className="nav navbar-nav collapse navbar-collapse" style={{ marginTop: "20px" }}>
                  <li><Link to={routePaths.Admin}>Cửa hàng</Link></li>
                  <li><Link to={routePaths.Brands}>Thương hiệu</Link></li>
                  <li><Link to={routePaths.productcategory}>Danh mục</Link></li>
                  <li><Link to={routePaths.vouchers}>Mã giảm giá</Link></li>
                  {/* <li><a href='/StoreAdmin'>Cửa hàng</a></li>
                  <li><a href='/Brands'>Thương hiệu</a></li>
                  <li><a href='/ProductCategory'>Danh mục</a></li>
                  <li><a href='/Vouchers'>Mã giảm giá</a></li> */}
                </ul>
              </div>
              <div className="mainmenu pull-right">
                <ul className="nav navbar-nav collapse navbar-collapse" style={{ marginTop: "20px" }}>
                  <li className="nav-item">
                    <p className="text-dark" id="login" > Hello: admin</p>
                  </li>
                  <li className="nav-item">
                    <a href='/account' className="nav-link text-dark" > Quản lý tài khoản</a>
                  </li>
                  <li className="nav-item">
                    <Link to='/' onClick={HandleLogout} className="nav-link text-dark"> Đăng Xuất</Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default HeaderAdmin;
