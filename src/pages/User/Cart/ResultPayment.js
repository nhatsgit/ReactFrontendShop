import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { routePaths } from "../../../routes";

const ResultPayment = () => {
    const location = useLocation();
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        // Lấy các tham số từ URL
        const queryParams = new URLSearchParams(location.search);
        const vnp_Amount = queryParams.get("vnp_Amount");
        const vnp_BankCode = queryParams.get("vnp_BankCode");
        const vnp_CardType = queryParams.get("vnp_CardType");
        const vnp_OrderInfo = queryParams.get("vnp_OrderInfo");
        const vnp_PayDate = queryParams.get("vnp_PayDate");
        const vnp_ResponseCode = queryParams.get("vnp_ResponseCode");
        const vnp_TmnCode = queryParams.get("vnp_TmnCode");
        const vnp_TransactionNo = queryParams.get("vnp_TransactionNo");
        const vnp_TransactionStatus = queryParams.get("vnp_TransactionStatus");
        const vnp_TxnRef = queryParams.get("vnp_TxnRef");
        const vnp_SecureHash = queryParams.get("vnp_SecureHash");

        // In ra các tham số từ URL để kiểm tra
        console.log("vnp_Amount:", vnp_Amount);
        console.log("vnp_BankCode:", vnp_BankCode);
        console.log("vnp_CardType:", vnp_CardType);
        console.log("vnp_OrderInfo:", vnp_OrderInfo);
        console.log("vnp_PayDate:", vnp_PayDate);
        console.log("vnp_ResponseCode:", vnp_ResponseCode);
        console.log("vnp_TmnCode:", vnp_TmnCode);
        console.log("vnp_TransactionNo:", vnp_TransactionNo);
        console.log("vnp_TransactionStatus:", vnp_TransactionStatus);
        console.log("vnp_TxnRef:", vnp_TxnRef);
        console.log("vnp_SecureHash:", vnp_SecureHash);

        // Gọi API xác minh kết quả thanh toán
        const verifyPayment = async () => {
            try {
                const response = await axios.get(
                    `https://localhost:7233/api/ShoppingCart/return?vnp_Amount=${vnp_Amount}&vnp_BankCode=${vnp_BankCode}&vnp_CardType=${vnp_CardType}&vnp_OrderInfo=${encodeURIComponent(vnp_OrderInfo)}&vnp_PayDate=${vnp_PayDate}&vnp_ResponseCode=${vnp_ResponseCode}&vnp_TmnCode=${vnp_TmnCode}&vnp_TransactionNo=${vnp_TransactionNo}&vnp_TransactionStatus=${vnp_TransactionStatus}&vnp_TxnRef=${vnp_TxnRef}&vnp_SecureHash=${vnp_SecureHash}`
                );

                console.log("Payment verification response:", response.data);
                if (typeof response.data === 'number') {
                    navigate(`${routePaths.orderdetails}?id=${response.data}`)

                } else {
                    setMessage(response.data);
                }
            } catch (error) {
                console.error("Error verifying payment:", error);
                setMessage("Có lỗi xảy ra khi xác minh kết quả thanh toán.");
            }
        };

        verifyPayment();
    }, [location.search]);

    return (
        <div>
            <h1>Kết Quả Thanh Toán</h1>
            <p>{message}</p>
        </div>
    );
};

export default ResultPayment;
