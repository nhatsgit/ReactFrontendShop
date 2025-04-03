import { useState } from "react";
import styles from "../Seller.module.css"
import { CreateStaff } from "../../../apiServices/Seller/StaffServices";
import { notification } from "antd";

function AddStaff() {
    const [staff, setStaff] = useState({
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
        setStaff((prevStaff) => ({
            ...prevStaff,
            [name]: value,
        }));
    };
    const HandleSubmit = async (e) => {
        e.preventDefault();
        try {
            const result = await CreateStaff(staff);
            console.log(result)
            if (result == null) {
                notification.error({
                    message: `tên tài khoản ${staff.userName} đã tồn tại trong hệ thống`
                })
            } else {
                notification.success({
                    message: `Đã thêm nhân viên ${staff.userName} vào shop của bạn`
                })
            }
        } catch (error) {
            alert("That bai");
            console.error(error);
        }
    }
    return (
        <div className={styles.container} style={{ textAlign: "left" }}>
            <div className={styles.main_content}>
                <h1>Thêm nhân viên</h1>
                <form onSubmit={HandleSubmit} >
                    <div className={styles.form_group}>
                        <label for="UserName">UserName</label>
                        <input className={styles.form_control} type="text" name="userName" value={staff.userName} onChange={handleInputChange} />
                        <span class="text-danger field-validation-valid" data-valmsg-for="UserName" data-valmsg-replace="true"></span>
                    </div>
                    <div className={styles.form_group}>
                        <label for="Password">Password</label>
                        <input className={styles.form_control} type="password" name="password" value={staff.password} onChange={handleInputChange} />
                        <span className={styles.text_danger} data-valmsg-for="Password" data-valmsg-replace="true"></span>
                    </div>
                    <div className={styles.form_group}>
                        <label for="PhoneNumber">PhoneNumber</label>
                        <input className={styles.form_control} type="tel" name="phoneNumber" value={staff.phoneNumber} onChange={handleInputChange} />
                        <span className={styles.text_danger} data-valmsg-for="PhoneNumber" data-valmsg-replace="true"></span>
                    </div>
                    <div className={styles.form_group}>
                        <label for="Email">Email</label>
                        <input className={styles.form_control} type="email" name="email" value={staff.email} onChange={handleInputChange} />
                        <span className={styles.text_danger} data-valmsg-for="Email" data-valmsg-replace="true"></span>
                    </div>
                    <div className={styles.form_group}>
                        <label for="FullName">FullName</label>
                        <input className={styles.form_control} type="text" name="fullName" value={staff.fullName} onChange={handleInputChange} />
                        <span className={styles.text_danger} data-valmsg-for="FullName" data-valmsg-replace="true"></span>
                    </div>

                    <div className={styles.form_group}>
                        <label for="Address">Address</label>
                        <input className={styles.form_control} type="text" name="address" value={staff.address} onChange={handleInputChange} />
                        <span className={styles.text_danger} data-valmsg-for="Address" data-valmsg-replace="true"></span>
                    </div>

                    <button type="submit" className={`${styles.btn} ${styles.btn_primary}`} >Register</button>
                    <input name="__RequestVerificationToken" type="hidden" value="" />

                </form>
            </div>
        </div>
    )
};
export default AddStaff;