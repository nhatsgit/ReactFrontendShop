import { useEffect, useState } from "react";
import { GetProductCategoryChartData, GetTopRevenueProducts, GetTopSaleProducts } from "../../../apiServices/Seller/AnalyzeServices";
import { FormatCurrency } from "../../../utils/FormatCurrency";
import PieChart from "../../../component/Context/Chart/PieChart";

function ProductAnalyze() {
  const [topSaleProducts, setTopSaleProducts] = useState({});
  const [topRevenueProducts, setTopRevenueProducts] = useState({});
  const [chartData, setChartData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApi = async () => {
      try {
        const _topSaleProducts = await GetTopSaleProducts();
        setTopSaleProducts(_topSaleProducts)
        const _topRevenueProducts = await GetTopRevenueProducts();
        setTopRevenueProducts(_topRevenueProducts)
        const _chartData = await GetProductCategoryChartData();
        setChartData(_chartData)
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      finally {
        setTimeout(() => {
          setLoading(false);
        }, 300);
      }
    }
    fetchApi();
  }, []);
  if (loading) {
    return <div>Đang cập nhật dữ liệu...</div>;
  }
  return (
    <div>
      <h1> Biểu đồ sản phẩm theo loại</h1>
      {chartData ? <PieChart data={chartData} /> : <></>}

      <h1>Top Bán Chạy</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Tên</th>
            <th>Ảnh</th>
            <th>Số lượng đã đặt</th>
            <th>Giá</th>
            <th>Phần trăm giảm</th>
            <th>Số lượng còn</th>
            <th>Điểm Đánh Giá</th>
          </tr>
        </thead>
        <tbody>
          {
            topSaleProducts.map((product, index) => {
              return <tr key={index}>
                <td>{product.tenSp}</td>
                <td>
                  <img src={`${process.env.REACT_APP_API_URL}${product.anhDaiDien}`} alt="Anhdaidien" width="60" height="60" />
                </td>
                <td>
                  <p style={{ color: "blue" }}>{product.soLuongBan}</p>
                </td>
                <td>{FormatCurrency(product.giaBan)}</td>
                <td>{product.phanTramGiam}</td>
                <td>{product.soLuongCon}</td>
                <td>{product.diemDanhGia}</td>
              </tr>
            })
          }
        </tbody>
      </table>

      <h1>Top Doanh Thu</h1>
      <table className="table">
        <thead>

          <tr>
            <th>Tên</th>
            <th>Ảnh</th>
            <th>Doanh Thu</th>
            <th>Giá</th>
            <th>Phần trăm giảm</th>
            <th>Số lượng còn</th>
            <th>Điểm Đánh Giá</th>
          </tr>
        </thead>
        <tbody>
          {
            topRevenueProducts.map((product, index) => {
              return <tr key={index}>
                <td>{product.tenSp}</td>
                <td>
                  <img src={`${process.env.REACT_APP_API_URL}${product.anhDaiDien}`} alt="TenSp" width="60" height="60" />
                </td>
                <td>
                  <p style={{ color: "blue" }}>
                    {FormatCurrency(product.doanhThu)}
                  </p>
                </td>
                <td>{FormatCurrency(product.giaBan)}</td>
                <td>{product.phanTramGiam}</td>
                <td>{product.soLuongCon}</td>
                <td>{product.diemDanhGia}</td>
              </tr>
            })
          }

        </tbody>
      </table>
    </div>
  );
};
export default ProductAnalyze;