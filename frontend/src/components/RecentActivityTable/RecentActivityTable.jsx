import "./RecentActivityTable.css";

function RecentActivityTable() {
  return (
    <div className="activity-card">

      <h2>Recent Activity</h2>

      <table>

        <thead>
          <tr>
            <th>Time</th>
            <th>Event</th>
            <th>Student</th>
            <th>Confidence</th>
          </tr>
        </thead>

        <tbody>

          <tr>
            <td>10:05</td>
            <td>Face Recognized</td>
            <td>Rahul</td>
            <td>98.5%</td>
          </tr>

          <tr>
            <td>10:08</td>
            <td>Distracted</td>
            <td>Anjali</td>
            <td>89.1%</td>
          </tr>

          <tr>
            <td>10:10</td>
            <td>Phone Usage</td>
            <td>Aditya</td>
            <td>91.4%</td>
          </tr>

          <tr>
            <td>10:14</td>
            <td>Sleeping</td>
            <td>Priya</td>
            <td>93.2%</td>
          </tr>

        </tbody>

      </table>

    </div>
  );
}

export default RecentActivityTable;