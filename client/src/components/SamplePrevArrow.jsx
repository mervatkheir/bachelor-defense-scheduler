import React from "react";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";

const SamplePrevArrow = ({ onClick }) => {
  return (
    <div
      className="slick-prev"
      onClick={onClick}
      style={{ display: "block", fontSize: "30px" }}
    >
      <NavigateBeforeIcon />
    </div>
  );
};

export default SamplePrevArrow;
