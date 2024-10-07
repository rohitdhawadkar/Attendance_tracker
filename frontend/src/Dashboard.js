import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const Dashboard = () => {
  const attendanceData = {
    theory: 75,
    practical: 50,
    total: 65,
  };

  const data = {
    labels: ["Theory", "Practical", "Total"],
    datasets: [
      {
        label: "Attendance Percentage",
        data: [
          attendanceData.theory,
          attendanceData.practical,
          attendanceData.total,
        ],
        backgroundColor: ["#36A2EB", "#FF6384", "#FFCE56"],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
  };

  return (
    <div className="dashboard-container">
      <h2>Attendance Percentage</h2>
      <div
        className="attendance-chart"
        style={{ width: "300px", height: "300px" }}
      >
        <Doughnut data={data} options={options} />
      </div>
      <div className="attendance-details">
        <p>Theory Attendance: {attendanceData.theory}%</p>
        <p>Practical Attendance: {attendanceData.practical}%</p>
        <p>Total Attendance: {attendanceData.total}%</p>
      </div>
    </div>
  );
};

export default Dashboard;
