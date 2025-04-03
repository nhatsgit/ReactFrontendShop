import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { routePaths } from "../../routes";
import { EndVoucherAdminById, GetAminVouchers } from "../../apiServices/Admin/VoucherAdminServices";
import { Modal, notification } from "antd";

function Vouchers() {
    const [vouchers, setVouchers] = useState([]);
    useEffect(() => {
        const fetchApi = async () => {
            try {
                const res = await GetAminVouchers();
                setVouchers(res);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchApi();
    }, []);
    const HandleEndVoucher = async (voucherId) => {
        Modal.confirm({
            title: "Thay đổi trạng thái",
            content: "Bạn có thực sự muốn kết thúc mã giảm giá này?",
            okText: "Có",
            cancelText: "Không",
            onOk: async () => {
                try {
                    await EndVoucherAdminById(voucherId);
                    notification.success({
                        message: "Thành công",
                        description: "Thay đổi trạng thái thành công"
                    })

                } catch (error) {

                }
            },

        });
    }
    return (
        <>
            <div className="container mt-4">
                <nav style={{ textAlign: "left" }}>
                    <h1 style={{ fontSize: "40px" }}>Mã giảm giá của hệ thống</h1>
                    <Link to={routePaths.createVouchers} style={{ color: "blue", textDecoration: "underline" }}>Tạo mới</Link>
                </nav>
                <div className="table-responsive">
                    <table className="table table-bordered ">
                        <thead className="table-dark">
                            <tr>
                                <th>Mã Voucher</th>
                                <th>Phần Trăm Giảm</th>
                                <th>Giảm Tối Đa</th>
                                <th>Đơn Tối Thiểu</th>
                                <th>Ngày Bắt Đầu</th>
                                <th>Ngày Hết Hạn</th>
                                <th>Số Lượng Còn</th>
                                <th>Hành Động</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                vouchers.map((voucher, index) => {
                                    return <tr key={index}>
                                        <td>{voucher.voucherCode}</td>
                                        <td>{voucher.phanTramGiam}</td>
                                        <td>
                                            {voucher.giamToiDa > 0 && voucher.giamToiDa}
                                        </td>
                                        <td>
                                            {voucher.donToiThieu > 0 && voucher.donToiThieu}
                                        </td>
                                        <td>{voucher.ngayBatDau}</td>
                                        <td>{voucher.ngayHetHan}</td>
                                        <td>100</td>
                                        <td>
                                            <Link to={`${routePaths.editVouchers}?id=${voucher.voucherId}`} style={{ color: "blue", textDecoration: "underline" }}>
                                                Sửa
                                            </Link> |

                                            <button onClick={() => { HandleEndVoucher(voucher.voucherId) }} style={{ color: "blue", textDecoration: "underline" }}>
                                                Kết thúc
                                            </button>
                                        </td>
                                    </tr>
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>

        </>
    )
}
export default Vouchers;