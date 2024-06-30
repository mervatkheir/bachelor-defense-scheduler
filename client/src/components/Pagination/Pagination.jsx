import React, { useState } from "react";
import "./Pagination.css";

function Pagination({ currentPage, itemsPerPage, totalItems, paginate }) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const [inputPage, setInputPage] = useState(currentPage.toString());

  const handleInputChange = (e) => {
    setInputPage(e.target.value);
  };

  const adjustPage = (input) => {
    let pageNumber = parseInt(input, 10);
    pageNumber = isNaN(pageNumber) ? currentPage : pageNumber;
    pageNumber = Math.max(1, Math.min(pageNumber, totalPages));
    paginate(pageNumber);
    setInputPage(pageNumber.toString());
  };

  return (
    <div className="pagination">
      <button
        onClick={() => adjustPage(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </button>
      <input
        type="text"
        value={inputPage}
        onChange={handleInputChange}
        onBlur={() => adjustPage(inputPage)}
        onKeyPress={(e) => e.key === "Enter" && adjustPage(inputPage)}
        className="page-input"
      />
      <span> of {totalPages}</span>
      <button
        onClick={() => adjustPage(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
}

export default Pagination;
