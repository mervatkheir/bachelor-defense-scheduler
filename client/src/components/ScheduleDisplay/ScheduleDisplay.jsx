import React, { useState, useMemo } from "react";
import "./ScheduleDisplay.css";
import ScheduleTable from "../ScheduleTable/ScheduleTable";
import Pagination from "../Pagination/Pagination";
import SearchBar from "../SearchBar/SearchBar";
import { useSelector } from "react-redux";

function ScheduleDisplay() {
  const fileManagement = useSelector((state) => state.fileManagement);
  const schedules = useSelector(
    (state) => state.schedules.schedules[fileManagement.selectedFile] || []
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [schedulesPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "" });

  const sortedFilteredSchedules = useMemo(() => {
    let sortableItems = schedules.filter(
      (schedule) =>
        schedule.studentNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        schedule.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        schedule.topic.toLowerCase().includes(searchTerm.toLowerCase()) ||
        schedule.external.toLowerCase().includes(searchTerm.toLowerCase()) ||
        schedule.internal.toLowerCase().includes(searchTerm.toLowerCase()) ||
        schedule.room.toLowerCase().includes(searchTerm.toLowerCase())
    );
    if (sortConfig.key !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [schedules, searchTerm, sortConfig]);

  const indexOfLastSchedule = currentPage * schedulesPerPage;
  const indexOfFirstSchedule = indexOfLastSchedule - schedulesPerPage;
  const currentSchedules = sortedFilteredSchedules.slice(
    indexOfFirstSchedule,
    indexOfLastSchedule
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const requestSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  return (
    <div className="scheduleDisplay">
      <h2>Defense Schedule for {fileManagement.selectedFile}</h2>
      <SearchBar onSearch={setSearchTerm} />
      <ScheduleTable
        schedules={currentSchedules}
        requestSort={requestSort}
        sortConfig={sortConfig}
      />
      <Pagination
        currentPage={currentPage}
        itemsPerPage={schedulesPerPage}
        totalItems={sortedFilteredSchedules.length}
        paginate={paginate}
      />
    </div>
  );
}

export default ScheduleDisplay;
