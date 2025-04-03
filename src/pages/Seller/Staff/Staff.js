import { useEffect, useState } from "react";
import styles from "../Seller.module.css"
import { DisableStaff, GetStaff, ResetPasswordStaff } from "../../../apiServices/Seller/StaffServices";
import { Modal, notification } from "antd";

function Staff() {
    const [staffs, setStaffs] = useState([]);
    const [reloadKey, setReloadKey] = useState(0);
    useEffect(() => {
        const fetchApi = async () => {
            try {
                const resStaffs = await GetStaff()
                setStaffs(resStaffs)
            } catch (error) {
                console.error("Error fetching data:", error);
            }
            finally {
            }
        }
        fetchApi();
    }, [reloadKey]);
    const HandleResetPassword = async (userName) => {
        Modal.confirm({
            title: userName,
            content: "Bạn có thực sự muốn reset mật khẩu của nhân viên?",
            okText: "Có",
            cancelText: "Không",
            onOk: async () => {
                try {
                    await ResetPasswordStaff(userName);
                    notification.success({
                        message: "Thành công",
                        description: "Reset password thành công"
                    })
                } catch (error) {

                }
            },

        });


    }
    const HandleDisableStaff = async (userName) => {
        Modal.confirm({
            title: "Xóa nhân viên " + userName,
            content: "Bạn có thực sự muốn xóa nhân viên này?",
            okText: "Có",
            cancelText: "Không",
            onOk: async () => {
                try {
                    await DisableStaff(userName);
                    notification.success({
                        message: "Thành công",
                        description: "Xóa nhân viên thành công"
                    })
                    setReloadKey(prevKey => prevKey + 1);
                } catch (error) {

                }
            },

        });

    }
    return (
        <div className={styles.container}>
            <div className={styles.main_content}>

                {/* <hr /> */}
                <h1>Nhân viên của shop</h1>
                <table className={styles.table} style={{ width: "100%" }}>
                    <thead>
                        <tr>
                            <th>UserName</th>
                            <th>FullName</th>
                            <th>Email</th>
                            <th>

                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            staffs.map((staff, index) => {
                                return <tr key={index}>
                                    <td>{staff.userName}</td>
                                    <td>{staff.fullName}</td>
                                    <td>{staff.email}</td>
                                    <td style={{ display: "flex", justifyContent: "space-around" }}>
                                        <button onClick={() => { HandleDisableStaff(staff.userName) }} className={` ${styles.btn} ${styles.btn_danger}`}>Xóa nhân viên</button>
                                        <button onClick={() => { HandleResetPassword(staff.userName) }} className={`${styles.btn} ${styles.btn_primary}`}>Reset Password</button>
                                    </td>
                                </tr>
                            })
                        }

                    </tbody>
                </table>


            </div>
        </div>
    )
};

export default Staff;