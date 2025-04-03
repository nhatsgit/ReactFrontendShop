import React from "react";
import { Pie } from "react-chartjs-2";
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
} from "chart.js";

// Đăng ký các thành phần
ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ data }) => {
    if (!data || !data.labels || !data.data) {
        return <div>Đang tải...</div>;
    }

    const quantities = data.data;
    const totalQuantity = quantities.reduce((sum, value) => sum + value, 0);
    const percentages = quantities.map(
        (value) => ((value / totalQuantity) * 100).toFixed(2) + "%"
    );

    const backgroundColors = [
        "red",
        "blue",
        "yellow",
        "green",
        "orange",
        "purple",
        "pink",
        "cyan",
        "magenta",
        "lime",
    ];
    const hoverColors = [
        "darkred",
        "darkblue",
        "darkyellow",
        "darkgreen",
        "darkorange",
        "darkpurple",
        "darkpink",
        "darkcyan",
        "darkmagenta",
        "darklime",
    ];

    // Dữ liệu biểu đồ
    const chartData = {
        labels: data.labels,
        datasets: [
            {
                data: quantities,
                backgroundColor: backgroundColors.slice(0, data.labels.length),
                hoverBackgroundColor: hoverColors.slice(0, data.labels.length),
            },
        ],
    };

    // Cấu hình biểu đồ
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "left",
            },
            tooltip: {
                callbacks: {
                    label: function (context) {
                        const label = context.label || "";
                        const value = context.raw || 0;
                        const percentage = (
                            (value / totalQuantity) *
                            100
                        ).toFixed(2);
                        return `${label}: ${percentage}% (${value})`;
                    },
                },
            },
        },
    };

    return <div style={{ width: "300px", height: "300px", margin: "0 auto" }}>
        <Pie data={chartData} options={options} />
    </div>;
};

export default PieChart;