import "./AttendanceChart.css";

function AttendanceChart() {
  return (
    <div className="chart-card">

      <h3>Attendance Trend</h3>

      <div className="chart-placeholder">

        <div className="bar monday"></div>
        <div className="bar tuesday"></div>
        <div className="bar wednesday"></div>
        <div className="bar thursday"></div>
        <div className="bar friday"></div>

      </div>

      <div className="days">
        <span>Mon</span>
        <span>Tue</span>
        <span>Wed</span>
        <span>Thu</span>
        <span>Fri</span>
      </div>

    </div>
  );
}

export default AttendanceChart;