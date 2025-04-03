import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { routePaths } from "../../routes";
import { BlockShop, GetShopOwner, ResetPasswordShop, UnBlockShop } from "../../apiServices/Admin/ShopAdminServices";

function Admin() {
  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reload, setReload] = useState(true);

  useEffect(() => {
    const fetchApi = async () => {
      try {
        const res = await GetShopOwner();

        setShops(res);

      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 500);
      }
    }
    fetchApi();
  }, [reload]);
  const HandleBlockShop = async (userId) => {
    try {
      await BlockShop(userId);
      alert("Thay đổi trạng thái thành công thành công")
      setReload(!reload)
    } catch (error) {

    }
  }
  const HandleUnBlockShop = async (userId) => {
    try {
      await UnBlockShop(userId);
      alert("Thay đổi trạng thái thành công thành công")
      setReload(!reload)
    } catch (error) {

    }
  }
  const HandleResetPassword = async (userId) => {
    try {
      await ResetPasswordShop(userId);
      alert("Reset password thành công")
      setReload(!reload)
    } catch (error) {

    }
  }

  if (loading) {
    return <center>
      <div>Đang cập nhật dữ liệu...</div>
    </center>;
  }
  return (
    <>
      <div className="container mt-4">
        <p className="text-end" style={{ textAlign: "left" }}>
          <h1 className="mb-4" style={{ fontSize: "40px" }}>Quản lý cửa hàng</h1>
          <Link to={routePaths.createStore} style={{ color: "blue", textDecoration: "underline" }}>Thêm tài khoản cửa hàng</Link>
        </p>
        <table className="table ">
          <thead>
            <tr >
              <th style={{ textAlign: "center" }}>UserName</th>
              <th style={{ textAlign: "center" }}>Chủ shop</th>
              <th style={{ textAlign: "center" }}>Email</th>
              <th style={{ textAlign: "center" }}>Tên Shop</th>
              <th style={{ textAlign: "center" }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {
              shops.map((shop, index) => {
                return <tr key={index}>
                  <td>{shop.userName}</td>
                  <td>{shop.fullName}</td>
                  <td>{shop.email}</td>
                  <td>{shop.myShop.tenCuaHang}</td>
                  <td className="text-center">
                    <div className="d-flex justify-content-center gap-2">
                      <Link to={`${routePaths.detailsStore}?id=${shop.id}`} className="btn btn-warning" >
                        Chi tiết shop
                      </Link>
                      <button onClick={() => { HandleResetPassword(shop.id) }} className="btn btn-info">
                        Reset Password
                      </button>
                      {
                        shop.myShop.biChan ? <button onClick={() => { HandleUnBlockShop(shop.id) }} className="btn btn-success">
                          Unblock Shop
                        </button> : <button onClick={() => { HandleBlockShop(shop.id) }} className="btn btn-danger">
                          Block Shop
                        </button>
                      }
                    </div>
                  </td>
                </tr>
              })
            }
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Admin;
