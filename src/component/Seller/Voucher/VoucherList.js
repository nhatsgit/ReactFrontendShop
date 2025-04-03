import { Link, useNavigate } from "react-router-dom";
import styles from "../../../pages/Seller/Seller.module.css"
import { FormatCurrency } from "../../../utils/FormatCurrency";
import { formatDate } from "../../../utils/FormatDate";
import { routePaths } from "../../../routes";
import { Modal, notification } from "antd";
import { EndVoucherSellerById } from "../../../apiServices/Seller/VoucherServices";

function VoucherListSeller({ voucherList }) {
    const navigate = useNavigate();
    if (!voucherList || voucherList.length === 0) {
        return <center><div>Không có...</div></center>;
    }
    const HandleEndVoucher = async (voucherId) => {
        Modal.confirm({
            title: "Thay đổi trạng thái",
            content: "Bạn có thực sự muốn kết thúc mã giảm giá này?",
            okText: "Có",
            cancelText: "Không",
            onOk: async () => {
                try {
                    await EndVoucherSellerById(voucherId);
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
            {

                <table className="table">
                    <thead>
                        <tr>
                            <th>Mã giảm giá</th>
                            <th>Phần trăm giảm</th>
                            <th>Giảm tối đa</th>
                            <th>Đơn tối thiểu</th>
                            <th>Ngày bắt đầu</th>
                            <th>Ngày hết hạn</th>
                            <th>Số lượng còn</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            voucherList.map((voucher, index) => {
                                return <tr key={index}>
                                    <td>{voucher.voucherCode}</td>
                                    <td>{voucher.phanTramGiam}%</td>
                                    <td>{voucher.giamToiDa > 0 ? FormatCurrency(voucher.giamToiDa) : "Không giới hạn"}</td>
                                    <td>{voucher.donToiThieu > 0 ? FormatCurrency(voucher.donToiThieu) : "Không giới hạn"}</td>
                                    <td>{formatDate(voucher.ngayBatDau)}</td>
                                    <td>{formatDate(voucher.ngayHetHan)}</td>
                                    <td>{voucher.soLuongCon}</td>
                                    <td style={{ display: "flex" }}>
                                        <Link to={`${routePaths.EditVoucher}?id=${voucher.voucherId}`}><button className="btn btn-info" style={{ marginTop: 0 }}>Sửa</button></Link>
                                        <Link to={`${routePaths.DetailsVoucherSeller}?id=${voucher.voucherId}`}><button className="btn btn-success">Chi Tiết</button></Link>
                                        <button onClick={() => { HandleEndVoucher(voucher.voucherId) }} className="btn btn-danger">Kết thúc</button>
                                    </td>
                                </tr>
                            })
                        }
                    </tbody>
                </table>
            }
        </>
    );
}

export default VoucherListSeller;