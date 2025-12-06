import { useEffect, useRef } from "react";
import { Chart } from "chart.js/auto";

export const Hourly = ({ hourlyData }) => {
    const chartRef = useRef(null);
    const canvasRef = useRef(null);

    useEffect(() => {
        if (!hourlyData) return;
        if (chartRef.current) chartRef.current.destroy();

        const ctx = canvasRef.current.getContext("2d");

        chartRef.current = new Chart(ctx, {
            type: "line",
            data: {
                labels: hourlyData.map(d => d.time),
                datasets: [
                    {
                        label: "Temperature (°C)",
                        data: hourlyData.map(d => d.temp),  // <-- FIX
                        borderWidth: 3,
                        spanGaps: true,
                        tension: 0.4,
                        borderColor: "orange",
                        backgroundColor: "rgba(255,165,0,0.25)",
                        pointRadius: 3,
                        pointBackgroundColor: "orange",
                    },
                ],
            },
            options: {
                responsive: true,
                plugins: {
                    legend: { display: false }
                },
                scales: {
                    y: { beginAtZero: false }
                }
            }
        });

        return () => chartRef.current?.destroy();
    }, [hourlyData]);

    return (
        <div className="container"
            style={{
                marginTop: "80px",
                background: "#e8e8e8",
                borderRadius: "20px",
                padding: "20px"
            }}
        >
            <h4 style={{ marginBottom: "10px" }}>Hourly forecast</h4>
            <canvas ref={canvasRef} height="150"></canvas>
        </div>
    );
};
