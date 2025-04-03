import React, { useState } from "react";
import * as XLSX from "xlsx";
import styles from "../../../pages/Seller/Seller.module.css";
import { AddProductsByExcel } from "../../../apiServices/Seller/ProductSellerServices";
import { notification } from "antd";

function ExcelForm() {
    const [excelData, setExcelData] = useState([]); // Dữ liệu từ file Excel
    const [file, setFile] = useState(null); // Lưu file đã chọn

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        setFile(selectedFile); // Cập nhật file state

        if (selectedFile) {
            const reader = new FileReader();

            reader.onload = (e) => {
                const data = new Uint8Array(e.target.result);
                const workbook = XLSX.read(data, { type: "array" });

                // Lấy sheet đầu tiên
                const sheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[sheetName];

                // Chuyển đổi sheet thành JSON
                const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

                // Loại bỏ dòng tiêu đề (nếu có) và cập nhật state
                if (jsonData.length > 0) {
                    setExcelData(jsonData.slice(1)); // Bỏ dòng đầu tiên (tiêu đề)
                }
            };

            reader.readAsArrayBuffer(selectedFile);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault(); // Ngăn gửi form mặc định



        try {
            const response = await AddProductsByExcel(file);
            notification.success({ message: "Thêm sản phẩm thành công" });
        } catch (error) {
            notification.error({ message: "Thêm sản phẩm không thành công", description: "Đã xảy ra lỗi dữ liệu ở file excel" });

        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="file">Chọn file Excel:</label>
                <input
                    type="file"
                    name="file"
                    id="file"
                    className="form-control"
                    accept=".xlsx, .xls"
                    onChange={handleFileChange}
                />
            </div>

            {/* Hiển thị bảng dữ liệu Excel */}
            {excelData.length > 0 && (
                <table className="table table-bordered" id="previewTable">
                    <thead>
                        <tr>
                            <th>TenSp</th>
                            <th>AnhDaiDien</th>
                            <th>MoTa</th>
                            <th>ThongSo</th>
                            <th>GiaNhap</th>
                            <th>GiaBan</th>
                            <th>SoLuongCon</th>
                            <th>PhanTramGiam</th>
                            <th>ProductCategoryId</th>
                            <th>BrandId</th>
                        </tr>
                    </thead>
                    <tbody>
                        {excelData.map((row, index) => (
                            <tr key={index}>
                                {row.map((cell, cellIndex) =>
                                    cellIndex === 1 ? (
                                        <td key={cellIndex}>
                                            <img
                                                src={`${process.env.REACT_APP_API_URL}${cell}`}
                                                alt="AnhDaiDien"
                                                style={{
                                                    width: "50px",
                                                    height: "50px",
                                                    objectFit: "cover",
                                                }}
                                            />
                                        </td>
                                    ) : (
                                        <td key={cellIndex}>{cell}</td>
                                    )
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            <button
                type="submit"
                className={`${styles.btn_primary} ${styles.btn}`}
            >
                Thêm sản phẩm
            </button>
        </form>
    );
}

export default ExcelForm;
