import React from "react";
import "./ScheduleTable.css";

const ScheduleTable = ({ schedules, requestSort, sortConfig }) => {
  return (
    <table className="schedule-table">
      <thead>
        <tr>
          {[
            "studentNo",
            "studentName",
            "topic",
            "external",
            "internal",
            "date",
            "time",
            "room",
          ].map((key) => (
            <th key={key} onClick={() => requestSort(key)}>
              {key.charAt(0).toUpperCase() + key.slice(1)}{" "}
              {sortConfig.key === key
                ? sortConfig.direction === "ascending"
                  ? " 🔼"
                  : " 🔽"
                : null}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {schedules.map((schedule, index) => (
          <tr key={index}>
            <td>{schedule.studentNo}</td>
            <td>{schedule.studentName}</td>
            <td>{schedule.topic}</td>
            <td>{schedule.external}</td>
            <td>{schedule.internal}</td>
            <td>{schedule.date}</td>
            <td>{schedule.time}</td>
            <td>{schedule.room}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ScheduleTable;
