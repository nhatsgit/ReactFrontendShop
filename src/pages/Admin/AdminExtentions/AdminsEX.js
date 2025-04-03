import { Link } from "react-router-dom";
import { routePaths } from "../../../routes";
import { useState } from "react";
import { notification } from "antd";
import { CreateStaff } from "../../../apiServices/Seller/StaffServices";
import { CreateShopOwner } from "../../../apiServices/Admin/ShopAdminServices";

function CreateStore() {
    const [account, setAccount] = useState({
        userName: "username",
        password: "",
        fullName: "",
        address: "",
        avatar: "avatar",
        email: "",
        phoneNumber: "",
    });
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setAccount((prevStaff) => ({
            ...prevStaff,
            [name]: value,
        }));
    };
    const HandleSubmit = async (e) => {
        e.preventDefault();
        try {
            const result = await CreateShopOwner(account);
            console.log(result)
            if (result == null) {
                notification.error({
                    message: `tên tài khoản ${account.userName} đã tồn tại trong hệ thống`
                })
            } else {
                notification.success({
                    message: `Đã thêm nhân viên ${account.userName} vào shop của bạn`
                })
            }
        } catch (error) {
            alert("That bai");
            console.error(error);
        }
    }
    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-8" style={{ textAlign: "left" }}>
                    <h1 className="mb-4" style={{ fontSize: "40px" }}>Tạo tài khoản chủ shop</h1>
                    <form onSubmit={HandleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="userName" className="form-label">User Name</label>
                            <input
                                type="text"
                                id="userName"
                                name="userName"
                                minLength={6}
                                value={account.userName} onChange={handleInputChange}
                                className="form-control"
                                style={{ width: "100%" }}
                                placeholder="Enter your username"
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                minLength={7}
                                value={account.password} onChange={handleInputChange}

                                className="form-control"
                                style={{ width: "100%" }}
                                placeholder="Enter your password"
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="phoneNumber" className="form-label">Phone Number</label>
                            <input
                                type="number"
                                id="phoneNumber"
                                name="phoneNumber"
                                value={account.phoneNumber} onChange={handleInputChange}
                                minLength={8}
                                className="form-control"
                                style={{ width: "100%" }}
                                placeholder="Enter your phone number"
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={account.email} onChange={handleInputChange}

                                className="form-control"
                                style={{ width: "100%" }}
                                placeholder="Enter your email"
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="fullName" className="form-label">Full Name</label>
                            <input
                                type="text"
                                id="fullName"
                                name="fullName"
                                value={account.fullName} onChange={handleInputChange}

                                className="form-control"
                                style={{ width: "100%" }}
                                placeholder="Enter your full name"
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="address" className="form-label">Address</label>
                            <input
                                type="text"
                                id="address"
                                name="address"
                                value={account.address} onChange={handleInputChange}

                                className="form-control"
                                style={{ width: "100%" }}
                                placeholder="Enter your address"
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-primary w-100">Register</button>
                    </form>
                </div>
            </div>
        </div>
    );
}





export { CreateStore };