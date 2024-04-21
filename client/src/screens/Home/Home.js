import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import ScheduleDisplay from "../../components/ScheduleDisplay/ScheduleDisplay";
import FilterControls from "../../components/FilterControls/FilterControls";
import DashboardSidebar from "../../components/DashboardSidebar/DashboardSidebar";
import "./Home.css";
import UploadCSV from "../UploadCSV/UploadCSV";
import Dashboard from "../Dashboard/Dashboard";

function Home(props) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="home">
      <DashboardSidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      <main
        className={`homeMain ${
          isSidebarOpen ? "sidebar-open" : "sidebar-closed"
        }`}
      >
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/upload" element={<UploadCSV />} />
          <Route path="/schedule" element={<ScheduleDisplay />} />
          <Route path="/filters" element={<FilterControls />} />
        </Routes>
      </main>
    </div>
  );
}

export default Home;
