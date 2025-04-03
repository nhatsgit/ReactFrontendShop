import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { routePaths } from "../../../routes";
import { GetAllVouchers } from "../../../apiServices/Seller/VoucherServices";
import VoucherListSeller from "../../../component/Seller/Voucher/VoucherList";


const Voucher = () => {
  const [vouchers, setVouchers] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPage, settotalPage] = useState(5)
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchApi = async () => {
      try {
        const res = await GetAllVouchers(currentPage);

        setVouchers(res.items)
        setCurrentPage(res.pageNumber)
        settotalPage(res.pageCount)

      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 500);
      }
    }
    fetchApi();
  }, []);
  const HandleSelectPage = async (pageNumber) => {
    try {
      const res = await GetAllVouchers(pageNumber);
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });

      setVouchers(res.items)
      setCurrentPage(res.pageNumber)
      settotalPage(res.pageCount)
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
  }

  if (loading) {
    return <center>
      <div>Đang cập nhật dữ liệu...</div>
    </center>;
  }
  return (
    <div>
      <h1>Mã giảm giá của shop</h1>
      <a href="/VoucherCreater"><button className="btn btn-primary">Tạo mới</button></a>
      {vouchers ? <>
        <VoucherListSeller voucherList={vouchers}></VoucherListSeller>
        <hr />
        <center>
          <ul className="pagination">
            {Array.from({ length: totalPage }, (_, index) => (
              <li key={index} className={index === currentPage - 1 ? "active" : ""} onClick={() => HandleSelectPage(index + 1)}>
                <a className="page-link">{index + 1}</a>
              </li>
            ))}
          </ul>
        </center>
      </> : <h1>Không có</h1>}
    </div>
  );
};

export default Voucher;
