import React from "react";
import { TextField, Button } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import "./FilterControls.css";

function FilterControls() {
  const [filter, setFilter] = React.useState("");

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const applyFilter = () => {
    console.log("Filtering schedule by:", filter);
  };

  return (
    <div className="filterControls">
      <TextField
        label="Filter by Examiner or Student"
        variant="outlined"
        size="small"
        value={filter}
        onChange={handleFilterChange}
        style={{ width: "50%" }}
      />
      <Button
        variant="contained"
        onClick={applyFilter}
        startIcon={<SearchIcon />}
      >
        Apply Filter
      </Button>
    </div>
  );
}

export default FilterControls;
