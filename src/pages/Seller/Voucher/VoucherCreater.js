import React, { useState } from "react";
import { CreateVoucherSeller } from "../../../apiServices/Seller/VoucherServices";
import { cleanData } from "../../../utils/CleanDataPayLoad";
import { useNavigate } from "react-router-dom";
import { routePaths } from "../../../routes";

function VoucherCreater() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    VoucherCode: "",
    PhanTramGiam: "",
    GiamToiDa: "",
    DonToiThieu: "",
    NgayBatDau: "",
    NgayHetHan: "",
    SoLuongCon: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const voucher = cleanData(formData)
    await CreateVoucherSeller(voucher);
    navigate(routePaths.voucher)
  };

  return (
    <div>
      <h1>Create</h1>
      <h4>Voucher</h4>
      <hr />
      <div className="row">
        <div className="col-md-4">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="VoucherCode">Mã giảm giá</label>
              <input
                name="VoucherCode"
                value={formData.VoucherCode}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="PhanTramGiam">Phần trăm giảm</label>
              <input
                type="number"
                name="PhanTramGiam"
                value={formData.PhanTramGiam}
                onChange={handleChange}
                className="form-control"
                required

              />
            </div>
            <div className="form-group">
              <label htmlFor="GiamToiDa">Giảm tối đa</label>
              <input
                type="number"

                name="GiamToiDa"
                value={formData.GiamToiDa}
                onChange={handleChange}
                className="form-control"
                min={1000}

              />
            </div>
            <div className="form-group">
              <label htmlFor="DonToiThieu">Đơn tối thiểu</label>
              <input
                type="number"

                name="DonToiThieu"
                value={formData.DonToiThieu}
                onChange={handleChange}
                className="form-control"
                min={1000}
              />
            </div>
            <div className="form-group">
              <label htmlFor="NgayBatDau">Ngày bắt đầu</label>
              <input
                type="date"
                name="NgayBatDau"
                value={formData.NgayBatDau}
                onChange={handleChange}
                className="form-control"
                required

              />
            </div>
            <div className="form-group">
              <label htmlFor="NgayHetHan">Ngày hết hạn</label>
              <input
                type="date"
                name="NgayHetHan"
                value={formData.NgayHetHan}
                onChange={handleChange}
                className="form-control"
                required

              />
            </div>
            <div className="form-group">
              <label htmlFor="SoLuongCon">Số lượng còn</label>
              <input
                type="number"

                name="SoLuongCon"
                value={formData.SoLuongCon}
                onChange={handleChange}
                className="form-control"
                required
                min={1}
              />
            </div>

            <div className="form-group">
              <button type="submit" className="btn btn-primary" style={{ marginTop: "0" }}>
                Create
              </button>
              <a href="/Voucher">
                <button type="button" className="btn btn-secondary">Back to List</button>
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default VoucherCreater;
