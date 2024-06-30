import React from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import ScheduleIcon from "@mui/icons-material/Schedule";
import FilterListIcon from "@mui/icons-material/FilterList";
import MenuIcon from "@mui/icons-material/Menu";
import {
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import "./DashboardSidebar.css";
import { Link } from "react-router-dom";

function DashboardSidebar({ isOpen, setIsOpen }) {
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className={`dashboardSidebar ${isOpen ? "" : "closed"}`}>
        <IconButton className="menuButton" onClick={toggleSidebar}>
          <MenuIcon style={{ color: "white" }} />
        </IconButton>
        <List>
          <ListItemButton LinkComponent={Link} to="/">
            <ListItemIcon>
              <DashboardIcon style={{ color: "white" }} />
            </ListItemIcon>
            <ListItemText primary="Dashboard" style={{ color: "white" }} />
          </ListItemButton>

          <ListItemButton LinkComponent={Link} to="/upload">
            <ListItemIcon>
              <UploadFileIcon style={{ color: "white" }} />
            </ListItemIcon>
            <ListItemText primary="Upload CSV" style={{ color: "white" }} />
          </ListItemButton>

          <ListItemButton LinkComponent={Link} to="/schedule">
            <ListItemIcon>
              <ScheduleIcon style={{ color: "white" }} />
            </ListItemIcon>
            <ListItemText primary="Schedule" style={{ color: "white" }} />
          </ListItemButton>

          <ListItemButton LinkComponent={Link} to="/filters">
            <ListItemIcon>
              <FilterListIcon style={{ color: "white" }} />
            </ListItemIcon>
            <ListItemText primary="Filters" style={{ color: "white" }} />
          </ListItemButton>
        </List>
      </div>
    </>
  );
}

export default DashboardSidebar;
