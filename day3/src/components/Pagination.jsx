import React from "react";
import "./Pagination.css";

function Pagination({ setPage, page, numberOfPages }) {
  return (
    <div className="pagination">
      <button disabled={page === 0} onClick={() => setPage((prev) => prev - 1)}>
        Prev
      </button>
      <button
        disabled={page === numberOfPages}
        onClick={() => setPage((prev) => prev + 1)}
      >
        Next
      </button>
    </div>
  );
}

export default Pagination;
