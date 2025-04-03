import React from "react";
import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import moment from "moment";

// Đăng ký các thành phần
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const BarChart = ({ data }) => {
    if (!data || data.length === 0) {
        return <div>Đang tải...</div>;
    }

    // Tách dữ liệu từ `data`
    const dates = data.map((item) => moment(item.date).format("DD/MM/YYYY"));
    const revenue = data.map((item) => item.revenue);

    // Dữ liệu cho biểu đồ
    const chartData = {
        labels: dates,
        datasets: [
            {
                label: "Doanh thu:",
                data: revenue,
                backgroundColor: "rgba(75, 192, 192, 0.6)", // Màu nền cột
                borderColor: "rgba(75, 192, 192, 1)", // Màu viền cột
                borderWidth: 1, // Độ dày viền
            },
        ],
    };

    // Cấu hình biểu đồ
    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: true,
                position: "top",
            },
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: "Thời gian",
                },
            },
            y: {
                title: {
                    display: true,
                    text: "Doanh thu",
                },
            },
        },
    };

    return <Bar data={chartData} options={options} />;
};

export default BarChart;
