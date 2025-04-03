import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { cleanData } from "../../../utils/CleanDataPayLoad";
import { routePaths } from "../../../routes";
import { CreateVoucherAdmin, EditVoucherAdmin, GetVoucherAdminById } from "../../../apiServices/Admin/VoucherAdminServices";
import { FormatCurrency } from "../../../utils/FormatCurrency";

function CreateVouchers() {
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
        await CreateVoucherAdmin(voucher);
        navigate(routePaths.vouchers)
    };

    return (
        <div className="container my-4" style={{ textAlign: "left" }}>
            <h1 className="title" style={{ fontSize: "40px" }}>Edit<br /> Voucher</h1>
            <hr />
            <div className="row justify-content-center">
                <div className="col-md-6">

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


function EditVouchers() {
    const query = new URLSearchParams(useLocation().search);
    const id = query.get('id');
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate()
    const [voucherData, setVoucherData] = useState({

    });
    useEffect(() => {
        const FetchProduct = async () => {
            try {
                const res = await GetVoucherAdminById(id);
                const formattedData = {
                    ...res,
                    ngayBatDau: res.ngayBatDau ? res.ngayBatDau.split("T")[0] : "",
                    ngayHetHan: res.ngayHetHan ? res.ngayHetHan.split("T")[0] : "",
                };
                setVoucherData(formattedData)
            } catch (error) {
                console.error("Error fetching order data:", error);
            } finally {
                setTimeout(() => {
                    setLoading(false);
                }, 300);
            }
        }
        FetchProduct()

    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setVoucherData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const voucher = cleanData(voucherData);
            const result = await EditVoucherAdmin(voucherData.voucherId, voucher);
            alert("Cập nhật thành công!");
            console.log(result);
            navigate(routePaths.vouchers)
        } catch (error) {
            alert("Đã xảy ra lỗi");
            console.error(error);
        }

    };
    if (loading) {
        return <div>Đang cập nhật dữ liệu...</div>;
    }
    return (
        <div className="container my-4" style={{ textAlign: "left" }}>
            <h1 className="title" style={{ fontSize: "40px" }}>
                Edit <br /> Voucher
            </h1>
            <hr />
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="VoucherCode" className="form-label">
                                Mã giảm giá
                            </label>
                            <input
                                type="text"
                                id="voucherCode"
                                name="voucherCode"
                                value={voucherData.voucherCode}
                                onChange={handleChange}
                                className="form-control"
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="PhanTramGiam" className="form-label">
                                Phần trăm giảm
                            </label>
                            <input
                                type="number"
                                id="phanTramGiam"
                                name="phanTramGiam"
                                value={voucherData.phanTramGiam}
                                onChange={handleChange}
                                className="form-control"
                                min={1}
                                max={99}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="GiamToiDa" className="form-label">
                                Giảm tối đa
                            </label>
                            <input
                                type="number"
                                id="giamToiDa"
                                name="giamToiDa"
                                value={voucherData.giamToiDa}
                                onChange={handleChange}
                                className="form-control"
                                min={1000}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="DonToiThieu" className="form-label">
                                Đơn tối thiểu
                            </label>
                            <input
                                type="number"
                                id="donToiThieu"
                                name="donToiThieu"
                                value={voucherData.donToiThieu}
                                onChange={handleChange}
                                className="form-control"
                                min={1000}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="NgayBatDau" className="form-label">
                                Ngày bắt đầu
                            </label>
                            <input
                                type="date"
                                id="ngayBatDau"
                                name="ngayBatDau"
                                value={voucherData.ngayBatDau}
                                onChange={handleChange}
                                className="form-control"
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="NgayHetHan" className="form-label">
                                Ngày hết hạn
                            </label>
                            <input
                                type="date"
                                id="ngayHetHan"
                                name="ngayHetHan"
                                value={voucherData.ngayHetHan}
                                onChange={handleChange}
                                className="form-control" required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="SoLuongCon" className="form-label">
                                Số lượng còn
                            </label>
                            <input
                                type="number"
                                id="soLuongCon"
                                name="soLuongCon"
                                value={voucherData.soLuongCon}
                                onChange={handleChange}
                                className="form-control"
                                required
                            />
                        </div>

                        <div className="d-flex justify-content-between">
                            <button type="submit" className="btn btn-primary">
                                Save
                            </button>
                            <div style={{ margin: "15px 0" }}>
                                <a href="/Voucher" style={{ textDecoration: "underline", color: "blue" }}>
                                    Back to List
                                </a>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

function DetailsVouchers() {
    const query = new URLSearchParams(useLocation().search);
    const id = query.get('id');
    const [loading, setLoading] = useState(true);

    const [voucherData, setVoucherData] = useState({

    });
    useEffect(() => {
        const FetchProduct = async () => {
            try {
                const res = await GetVoucherAdminById(id);

                setVoucherData(res)
            } catch (error) {
                console.error("Error fetching order data:", error);
            } finally {
                setTimeout(() => {
                    setLoading(false);
                }, 300);
            }
        }
        FetchProduct()

    }, [id]);
    if (loading) {
        return <div>Đang cập nhật dữ liệu...</div>;
    }
    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-8" style={{ textAlign: "left" }}>
                    <h1 className="mb-4" style={{ fontSize: "40px" }}>Details<br />Voucher</h1>

                    <div className="card shadow-sm p-4">
                        <hr />
                        <dl className="row">
                            <dt className="col-sm-3 mb-3 fw-bold">Mã giảm giá:</dt>
                            <dd className="col-sm-9 mb-3">{voucherData.voucherCode}</dd>

                            <dt className="col-sm-3 mb-3 fw-bold">Phần trăm giảm:</dt>
                            <dd className="col-sm-9 mb-3">{voucherData.phanTramGiam}</dd>

                            <dt className="col-sm-3 mb-3 fw-bold">Giảm tối đa:</dt>
                            <dd className="col-sm-9 mb-3">{voucherData.giamToiDa > 0 ? FormatCurrency(voucherData.giamToiDa) : "không giới hạn"}</dd>

                            <dt className="col-sm-3 mb-3 fw-bold">Đơn tối thiểu:</dt>
                            <dd className="col-sm-9 mb-3">{voucherData.donToiThieu > 0 ? FormatCurrency(voucherData.donToiThieu) : "không giới hạn"}</dd>

                            <dt className="col-sm-3 mb-3 fw-bold">Ngày bắt đầu:</dt>
                            <dd className="col-sm-9 mb-3">{voucherData.ngayBatDau || "không có"}</dd>

                            <dt className="col-sm-3 mb-3 fw-bold">Ngày hết hạn:</dt>
                            <dd className="col-sm-9 mb-3">{voucherData.ngayHetHan || "không có"}</dd>

                            <dt className="col-sm-3 mb-3 fw-bold">Số lượng còn:</dt>
                            <dd className="col-sm-9 mb-3">{voucherData.soLuongCon}</dd>


                        </dl>

                    </div>

                    <div className=" mt-4">
                        <Link to={`${routePaths.EditVoucher}?id=${voucherData.voucherId}`}><button className="btn btn-info" style={{ marginTop: 0 }}>Sửa</button></Link>

                    </div>
                </div>
            </div>
        </div>
    );
}

function DeleteVouchers() {
    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-8" style={{ textAlign: "left" }}>
                    <h1 className="mb-4" style={{ fontSize: "40px" }}>Delete <br />Are you sure you want to delete this? <br />Voucher</h1>
                    <hr />
                    <form>
                        <dl className="row">
                            <dt className="col-sm-3 mb-3 fw-bold">Mã giảm giá:</dt>
                            <dd className="col-sm-9 mb-3">VoucherCode</dd>

                            <dt className="col-sm-3 mb-3 fw-bold">Phần trăm giảm:</dt>
                            <dd className="col-sm-9 mb-3">PhanTramGiam</dd>

                            <dt className="col-sm-3 mb-3 fw-bold">Giảm tối đa:</dt>
                            <dd className="col-sm-9 mb-3">GiamToiDa</dd>

                            <dt className="col-sm-3 mb-3 fw-bold">Đơn tối thiểu:</dt>
                            <dd className="col-sm-9 mb-3">GiamToiThieu</dd>

                            <dt className="col-sm-3 mb-3 fw-bold">Ngày bắt đầu:</dt>
                            <dd className="col-sm-9 mb-3">NgayBatDau</dd>

                            <dt className="col-sm-3 mb-3 fw-bold">Ngày hết hạn:</dt>
                            <dd className="col-sm-9 mb-3">NgayHetHan</dd>

                            <dt className="col-sm-3 mb-3 fw-bold">Số lượng còn:</dt>
                            <dd className="col-sm-9 mb-3">SoLuongCon</dd>

                            <dt className="col-sm-3 mb-3 fw-bold">Danh mục voucher:</dt>
                            <dd className="col-sm-9 mb-3">VoucherCategory</dd>
                        </dl>
                        <div style={{ marginTop: "10px" }}>
                            <a href="/ProductCategory" className="btn btn-danger" >Delete</a> |
                            <a href="/ProductCategory" style={{ textDecoration: "underline", color: "blue" }}>Back to List</a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export { CreateVouchers, EditVouchers, DetailsVouchers, DeleteVouchers };