import React from "react";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

const SampleNextArrow = ({ onClick }) => {
  return (
    <div
      className="slick-next"
      onClick={onClick}
      style={{ display: "block", fontSize: "30px" }}
    >
      <NavigateNextIcon />
    </div>
  );
};

export default SampleNextArrow;
