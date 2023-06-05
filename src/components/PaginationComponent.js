import React from "react";
import { Pagination } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import queryString from "query-string";

function createPaginationUrl(page) {
  const query = queryString.parse(window.location.search);
  query.page = page;
  return `?${queryString.stringify(query)}`;
}

function PaginationComponent(props) {
  const { totalItems, itemsPerPage, currentPage, onPageChange } = props;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const location = useLocation();
  const navigate = useNavigate();

  const handlePageChange = (page) => {
    const url = createPaginationUrl(page);
    onPageChange(page);
    navigate(`${location.pathname}${url}`);
  };

  const getPageNumbers = () => {
    const pageNumbers = [];
    const query = queryString.parse(location.search);
    const page = parseInt(query.page) || 1;

    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || (i >= page - 2 && i <= page + 2)) {
        pageNumbers.push(
          <Pagination.Item
            key={i}
            active={i === page}
            onClick={() => handlePageChange(i)}
          >
            {i}
          </Pagination.Item>
        );
      }
    }
    return pageNumbers;
  };

  return (
    <Pagination>
      <Pagination.Prev
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      />
      {getPageNumbers()}
      <Pagination.Next
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      />
    </Pagination>
  );
}

export default PaginationComponent;
export { createPaginationUrl };
