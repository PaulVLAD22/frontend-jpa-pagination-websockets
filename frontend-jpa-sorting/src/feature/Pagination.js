import React from "react";

function Pagination({ currentPage, totalPages, onPageChange }) {
  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 0 && pageNumber <= totalPages) {
      onPageChange(pageNumber);
    }
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <button
          key={i}
          className={
            (Math.abs(i - currentPage - 1) <= 1 ? "" : "hidden ") +
            (i === currentPage + 1 ? "active" : "")
          }
          onClick={() => handlePageChange(i - 1)}
        >
          {i}
        </button>
      );
    }
    return pageNumbers;
  };

  return (
    <div className="flex-row-container">
      <div>
        <button
          disabled={currentPage === 0}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          Previous
        </button>
      </div>
      <div>{renderPageNumbers()}</div>
      <div>
        <button
          disabled={currentPage === totalPages - 1}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Pagination;
