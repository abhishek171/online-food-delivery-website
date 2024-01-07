import React from 'react';
import '../../Css/pagination.css';

const PaginationControls = ({ currentPage, totalPages, onPageChange }) => {
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="dynamicPagination">
      <div className="paginationContent">
        {pageNumbers.map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={page === currentPage ? 'active' : 'inactive'}
          >
            {page}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PaginationControls;
