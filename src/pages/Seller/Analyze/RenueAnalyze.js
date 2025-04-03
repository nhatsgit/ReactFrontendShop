import { useEffect, useState } from "react";
import { GetRevenueAnalyze, GetRevenueChartData } from "../../../apiServices/Seller/AnalyzeServices";
import { FormatCurrency } from "../../../utils/FormatCurrency";
import BarChart from "../../../component/Context/Chart/BarChart";

function RenueAnalyze() {
    const [data, setData] = useState({});
    const [chartData, setChartData] = useState({});
    const [revenueMode, setRevenueMode] = useState(999);
    const [chartMode, setChartMode] = useState(999);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchApi = async () => {
            try {
                setLoading(true)
                const res = await GetRevenueAnalyze(revenueMode);
                setData(res)
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
    }, [revenueMode]);
    useEffect(() => {
        const fetchApi = async () => {
            try {
                setLoading(true)
                const res = await GetRevenueChartData(chartMode);
                setChartData(res)
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
    }, [chartMode]);

    if (loading) {
        return <div>Đang cập nhật dữ liệu...</div>;
    }
    return (
        <section style={{ width: "80%", margin: "auto", }}>
            <div style={{ display: "flex", alignItems: "center", height: "50px" }}>
                <h1>Doanh thu</h1>
                <select style={{ width: "200px" }} onChange={(e) => { setRevenueMode(e.target.value) }}>
                    <option value="999">Tất Cả</option>
                    <option value="0">Hôm nay</option>
                    <option value="1">Hôm qua</option>
                    <option value="7">Trong 7 ngày qua</option>
                    <option value="30">Trong 30 ngày qua</option>
                </select>
            </div>
            <h3 style={{ color: "blue" }} id="txtRevenue"> {FormatCurrency(data)}</h3>

            <div style={{ display: "flex", alignItems: "center", height: "50px" }}>
                <h1 style={{ marginRight: "10px" }}>Biểu Đồ Doanh Thu Theo Ngày</h1>
                <select id="model" style={{ width: "200px" }} onChange={(e) => { setChartMode(e.target.value) }}>
                    <option value="999">Tất Cả</option>
                    <option value="30">Trong 30 ngày qua</option>
                    <option value="365">Trong 365 ngày qua</option>
                </select>
            </div>
            {data ? <BarChart data={chartData} /> : <></>}
        </section>
    )
}
export default RenueAnalyze;