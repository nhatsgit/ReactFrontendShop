import React, { useState } from "react";
import { FormatCurrency } from "../../../utils/FormatCurrency";

const VoucherModal = ({ vouchers = [], totalPrice = 0, setVoucherId }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedVoucher, setSelectedVoucher] = useState(null);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleSelectVoucher = (voucher) => {
        setVoucherId(voucher.voucherId)
        setSelectedVoucher(voucher);
        handleCloseModal();
    };
    const handleCancelVoucher = () => {
        setVoucherId("1")
        setSelectedVoucher(null);
    };

    const calculateDiscount = () => {
        if (!selectedVoucher) return 0;
        const { phanTramGiam, giamToiDa } = selectedVoucher;
        const discount = (totalPrice * phanTramGiam) / 100;
        if (giamToiDa > 0) {
            return Math.min(discount, giamToiDa);
        }
        return discount;
    };

    const discountedTotal = totalPrice - calculateDiscount();

    return (
        <div>
            <div style={{ paddingLeft: "1em" }}>
                <button
                    style={{ background: "none", border: "1px solid red", color: "red" }}
                    onClick={handleOpenModal}
                    type="button"
                >
                    Chọn mã giảm giá
                </button>
                <br />
                {selectedVoucher &&
                    <div>
                        <strong style={{ color: "red" }}>
                            {`Mã ${selectedVoucher.voucherCode} giảm ${selectedVoucher.phanTramGiam}%${selectedVoucher.donToiThieu > 0 ? ` đơn tối thiểu: ${FormatCurrency(selectedVoucher.donToiThieu)}` : ''}${selectedVoucher.giamToiDa > 0 ? ` giảm tối đa: ${FormatCurrency(selectedVoucher.giamToiDa)}` : ''}`
                            }
                        </strong>
                        <button type="button" onClick={handleCancelVoucher} style={{ background: "none", border: "1px solid red", color: "blue" }}>Hủy</button>
                    </div>
                }
            </div>
            <div id="voucherInfo"></div>
            {isModalOpen && (
                <div className="modal" style={{ display: "block" }}>
                    <div className="modal-content">
                        <span className="close" onClick={handleCloseModal}>
                            &times;
                        </span>
                        <div className="voucherContainer">
                            <b>Chọn Voucher Giảm Giá</b>
                            <br />
                            <br />
                            <div className="scrollable-voucher">
                                {vouchers.map((voucher) => (
                                    <div
                                        key={voucher.voucherId}
                                        className="voucher"

                                    >
                                        <div className="Box1">
                                            <h2>{voucher.phanTramGiam}%</h2>
                                            <p>{voucher.voucherCode}</p>
                                        </div>
                                        <div className="Box2" style={{
                                            backgroundColor:
                                                totalPrice <= voucher.donToiThieu && "lightgray",
                                        }}>
                                            <ul>
                                                <li>
                                                    Đơn tối thiểu: {voucher.donToiThieu > 0 ? FormatCurrency(voucher.donToiThieu) : "Mọi đơn hàng"}
                                                </li>
                                                {voucher.giamToiDa > 0 && (
                                                    <li>Giảm tối đa: {FormatCurrency(voucher.giamToiDa)}</li>
                                                )}
                                                <li>Số lượng còn: {voucher.soLuongCon}</li>
                                            </ul>
                                            {totalPrice >= voucher.donToiThieu && (
                                                <button
                                                    style={{ marginLeft: "auto", background: "none", border: "1px solid blue", color: "blue" }}
                                                    onClick={() => handleSelectVoucher(voucher)}
                                                >
                                                    Chọn
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>

                        </div>
                    </div>
                </div>
            )}
            <div style={{ paddingLeft: "1em" }}>
                <label>Chi tiết thanh toán</label>
                <p>Tổng đơn hàng: {FormatCurrency(totalPrice)}</p>
                <p id="percentDiscount">Giảm giá đơn hàng: -{FormatCurrency(calculateDiscount())}</p>
                <h3 style={{ color: "red" }} id="totalOrderPrice">Tổng thanh toán: {FormatCurrency(discountedTotal)}</h3>
            </div>
        </div>
    );
};
export default VoucherModal;
// Mock data for testing

