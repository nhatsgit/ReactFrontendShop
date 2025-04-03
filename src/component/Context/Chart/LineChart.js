import React from "react";
import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import moment from "moment";

// Đăng ký các thành phần
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const LineChart = ({ data }) => {
    if (!data || data.length === 0) {
        return <div>Đang tải...</div>;
    }
    const dates = data.map((item) => moment(item.date).format("DD/MM/YYYY"));
    const quantities = data.map((item) => item.quantity);
    const chartData = {
        labels: dates,
        datasets: [
            {
                label: "Số đơn:",
                data: quantities,
                borderColor: "rgba(75, 192, 192, 1)",
                backgroundColor: "rgba(75, 192, 192, 0.2)",
                tension: 0.4,
                borderWidth: 2,
            },
        ],
    };

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
                    text: "Số đơn",
                },
            },
        },
    };

    return <Line data={chartData} options={options} />;
};

export default LineChart;